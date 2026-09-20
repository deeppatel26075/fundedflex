import urllib.request
import urllib.parse
import json
import http.cookiejar
import sys

BASE_URL = "http://localhost:3000"

def test_full_journey():
    print("=== STARTING FUNDEDFLEX E2E VERIFICATION ===")

    # Setup cookie jar for session management
    cj = http.cookiejar.CookieJar()
    opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cj))

    # 1. Test Homepage
    print("\n[1] Testing GET / ...")
    req = urllib.request.Request(f"{BASE_URL}/")
    with opener.open(req) as res:
        html = res.read().decode('utf-8')
        assert "FundedFlex" in html
        assert "Trade Bigger" in html
        assert "5.0%" in html
        print("  -> Homepage loaded with 200 OK & brand content verified!")

    # 2. Test Login as Trader
    print("\n[2] Testing POST /api/auth/login as Trader ...")
    login_payload = json.dumps({
        "email": "trader@fundedflex.com",
        "password": "TraderFlex2026!"
    }).encode('utf-8')
    req = urllib.request.Request(
        f"{BASE_URL}/api/auth/login",
        data=login_payload,
        headers={"Content-Type": "application/json"}
    )
    with opener.open(req) as res:
        login_res = json.loads(res.read().decode('utf-8'))
        assert login_res.get("success") is True
        print(f"  -> Trader logged in successfully as: {login_res['user']['email']}")

    # 3. Fetch products and payment methods from DB to prepare order
    print("\n[3] Preparing Order Details from DB ...")
    import sqlite3
    conn = sqlite3.connect("prisma/dev.db")
    cur = conn.cursor()
    cur.execute("SELECT id, name, priceUSD, accountSize FROM Product WHERE slug = '50k-pro'")
    prod = cur.fetchone()
    prod_id, prod_name, prod_price, prod_size = prod
    print(f"  -> Selected Product: {prod_name} (${prod_size:,.0f} size, ${prod_price} USD)")

    cur.execute("SELECT id, asset, network, walletAddress FROM PaymentMethod WHERE asset = 'USDT' AND network = 'TRC20'")
    pm = cur.fetchone()
    pm_id, pm_asset, pm_network, pm_wallet = pm
    print(f"  -> Selected Payment Method: {pm_asset} ({pm_network}) -> {pm_wallet}")

    # 4. Create Order
    print("\n[4] Testing POST /api/orders/create ...")
    order_payload = json.dumps({
        "productId": prod_id,
        "paymentMethodId": pm_id,
        "email": "trader@fundedflex.com",
        "fullName": "Alex Vance"
    }).encode('utf-8')
    req = urllib.request.Request(
        f"{BASE_URL}/api/orders/create",
        data=order_payload,
        headers={"Content-Type": "application/json"}
    )
    with opener.open(req) as res:
        order_res = json.loads(res.read().decode('utf-8'))
        assert order_res.get("success") is True
        order_id = order_res["orderId"]
        order_num = order_res["orderNumber"]
        print(f"  -> Order Created! ID: {order_id}, Number: {order_num}")

    # 5. Submit Payment (TxHash)
    print("\n[5] Testing POST /api/orders/submit-payment ('I Have Paid') ...")
    tx_hash = "0x89f2a71d7c82e3b123456789abcdef0123456789abcdef0123456789abcdef01"
    pay_payload = json.dumps({
        "orderId": order_id,
        "txHash": tx_hash
    }).encode('utf-8')
    req = urllib.request.Request(
        f"{BASE_URL}/api/orders/submit-payment",
        data=pay_payload,
        headers={"Content-Type": "application/json"}
    )
    with opener.open(req) as res:
        pay_res = json.loads(res.read().decode('utf-8'))
        assert pay_res.get("success") is True
        assert pay_res.get("status") == "PAYMENT_PENDING_REVIEW"
        print(f"  -> Payment submitted! Status correctly transitioned to: {pay_res.get('status')}")

    # 6. Test Admin Login (New Session)
    print("\n[6] Testing Admin Login ...")
    admin_cj = http.cookiejar.CookieJar()
    admin_opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(admin_cj))

    admin_login_payload = json.dumps({
        "email": "admin@fundedflex.com",
        "password": "AdminFlex2026!"
    }).encode('utf-8')
    req = urllib.request.Request(
        f"{BASE_URL}/api/auth/login",
        data=admin_login_payload,
        headers={"Content-Type": "application/json"}
    )
    with admin_opener.open(req) as res:
        admin_res = json.loads(res.read().decode('utf-8'))
        assert admin_res.get("success") is True
        assert admin_res["user"]["role"] == "ADMIN"
        print("  -> Admin logged in with role ADMIN!")

    # 7. Admin Approves Payment and Provisions Credentials
    print("\n[7] Testing Admin APPROVE & Credential Generation ...")
    approve_payload = json.dumps({
        "orderId": order_id,
        "adminNotes": "Verified on Tronscan explorer. Full amount confirmed."
    }).encode('utf-8')
    req = urllib.request.Request(
        f"{BASE_URL}/api/admin/orders/approve",
        data=approve_payload,
        headers={"Content-Type": "application/json"}
    )
    with admin_opener.open(req) as res:
        approve_res = json.loads(res.read().decode('utf-8'))
        assert approve_res.get("success") is True
        cred = approve_res.get("credential")
        assert cred is not None
        assert cred["accountId"].startswith("FF-")
        assert cred["username"].startswith("FF")
        assert len(cred["rawPassword"]) >= 12
        print(f"  -> Generated Account ID: {cred['accountId']}")
        print(f"  -> Generated Username:   {cred['username']}")
        print(f"  -> Generated Password:   {cred['rawPassword']}")
        print(f"  -> Server:               {cred['server']}")

    # 8. Check Trader Dashboard Access
    print("\n[8] Testing Trader Dashboard /dashboard ...")
    req = urllib.request.Request(f"{BASE_URL}/dashboard")
    with opener.open(req) as res:
        dash_html = res.read().decode('utf-8')
        assert cred["accountId"] in dash_html
        assert "ACTIVE" in dash_html
        print("  -> Customer Dashboard correctly displays newly provisioned account!")

    # 9. Test Credential Reveal API with Decryption
    print("\n[9] Testing POST /api/credentials/reveal (AES-256 Decryption) ...")
    cur.execute("SELECT id FROM AccountCredential WHERE accountId = ?", (cred["accountId"],))
    cred_id = cur.fetchone()[0]

    reveal_payload = json.dumps({"credentialId": cred_id}).encode('utf-8')
    req = urllib.request.Request(
        f"{BASE_URL}/api/credentials/reveal",
        data=reveal_payload,
        headers={"Content-Type": "application/json"}
    )
    with opener.open(req) as res:
        reveal_res = json.loads(res.read().decode('utf-8'))
        assert reveal_res.get("success") is True
        assert reveal_res.get("password") == cred["rawPassword"]
        print(f"  -> AES-256 decrypted password matches generated password: {reveal_res.get('password')}")

    conn.close()
    print("\n=== ALL END-TO-END VERIFICATION CHECKS PASSED WITH 100% SUCCESS! ===")

if __name__ == "__main__":
    try:
        test_full_journey()
    except Exception as e:
        print("Verification error:", e)
        sys.exit(1)
