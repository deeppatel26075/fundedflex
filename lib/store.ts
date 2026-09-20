export interface Product {
  id: string;
  name: string;
  slug: string;
  accountSize: number;
  priceUSD: number;
  dailyDrawdown: number;
  maxDrawdown: number;
  leverage: string;
  profitTarget: number;
  rewardSplit: string;
  minTradingDays: number;
  tradingPeriod: string;
  weekendHolding: boolean;
  newsTrading: boolean;
  eaTrading: boolean;
  platform: string;
  isFeatured: boolean;
  isActive: boolean;
  sortOrder: number;
}

export interface PaymentMethod {
  id: string;
  asset: string;
  network: string;
  walletAddress: string;
  qrImage: string | null;
  qrCodeUrl?: string;
  instructions: string | null;
  isActive: boolean;
  sortOrder: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  productId: string;
  amountUSD: number;
  cryptoAsset: string;
  network: string;
  depositAddress: string;
  expectedCryptoAmount: number;
  txHash: string | null;
  status: "PAYMENT_PENDING" | "PAYMENT_SUBMITTED" | "PAYMENT_PENDING_REVIEW" | "PAYMENT_CONFIRMED" | "ACCOUNT_READY" | "PAYMENT_REJECTED" | "REJECTED" | "EXPIRED" | string;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
  product: Product;
  credential?: AccountCredential | null;
}

export interface AccountCredential {
  id: string;
  accountId: string;
  username: string;
  encryptedPassword: string;
  server: string;
  platform: string;
  initialBalance: number;
  status: "ACTIVE" | "SUSPENDED" | "BREACHED" | "PASSED" | string;
  userId: string;
  orderId: string;
  createdAt: string;
  updatedAt: string;
  order?: {
    product?: Product;
  };
}

export const initialProducts: Product[] = [
  {
    id: "prod_5k",
    name: "$5,000 Starter Account",
    slug: "5k-starter",
    accountSize: 5000,
    priceUSD: 49,
    dailyDrawdown: 5.0,
    maxDrawdown: 10.0,
    leverage: "1:100",
    profitTarget: 8.0,
    rewardSplit: "Up to 90%",
    minTradingDays: 3,
    tradingPeriod: "Unlimited",
    weekendHolding: true,
    newsTrading: true,
    eaTrading: true,
    platform: "FundedFlex Terminal / MT5",
    isFeatured: false,
    isActive: true,
    sortOrder: 1,
  },
  {
    id: "prod_10k",
    name: "$10,000 Explorer Account",
    slug: "10k-explorer",
    accountSize: 10000,
    priceUSD: 89,
    dailyDrawdown: 5.0,
    maxDrawdown: 10.0,
    leverage: "1:100",
    profitTarget: 8.0,
    rewardSplit: "Up to 90%",
    minTradingDays: 3,
    tradingPeriod: "Unlimited",
    weekendHolding: true,
    newsTrading: true,
    eaTrading: true,
    platform: "FundedFlex Terminal / MT5",
    isFeatured: false,
    isActive: true,
    sortOrder: 2,
  },
  {
    id: "prod_25k",
    name: "$25,000 Advanced Account",
    slug: "25k-advanced",
    accountSize: 25000,
    priceUSD: 189,
    dailyDrawdown: 5.0,
    maxDrawdown: 10.0,
    leverage: "1:100",
    profitTarget: 8.0,
    rewardSplit: "Up to 90%",
    minTradingDays: 3,
    tradingPeriod: "Unlimited",
    weekendHolding: true,
    newsTrading: true,
    eaTrading: true,
    platform: "FundedFlex Terminal / MT5",
    isFeatured: false,
    isActive: true,
    sortOrder: 3,
  },
  {
    id: "prod_50k",
    name: "$50,000 Pro Account",
    slug: "50k-pro",
    accountSize: 50000,
    priceUSD: 299,
    dailyDrawdown: 5.0,
    maxDrawdown: 10.0,
    leverage: "1:100",
    profitTarget: 8.0,
    rewardSplit: "Up to 90%",
    minTradingDays: 3,
    tradingPeriod: "Unlimited",
    weekendHolding: true,
    newsTrading: true,
    eaTrading: true,
    platform: "FundedFlex Terminal / MT5",
    isFeatured: true,
    isActive: true,
    sortOrder: 4,
  },
  {
    id: "prod_100k",
    name: "$100,000 Master Account",
    slug: "100k-master",
    accountSize: 100000,
    priceUSD: 499,
    dailyDrawdown: 5.0,
    maxDrawdown: 10.0,
    leverage: "1:100",
    profitTarget: 8.0,
    rewardSplit: "Up to 90%",
    minTradingDays: 3,
    tradingPeriod: "Unlimited",
    weekendHolding: true,
    newsTrading: true,
    eaTrading: true,
    platform: "FundedFlex Terminal / MT5",
    isFeatured: false,
    isActive: true,
    sortOrder: 5,
  },
  {
    id: "prod_200k",
    name: "$200,000 Apex Account",
    slug: "200k-apex",
    accountSize: 200000,
    priceUSD: 949,
    dailyDrawdown: 5.0,
    maxDrawdown: 10.0,
    leverage: "1:100",
    profitTarget: 8.0,
    rewardSplit: "Up to 90%",
    minTradingDays: 3,
    tradingPeriod: "Unlimited",
    weekendHolding: true,
    newsTrading: true,
    eaTrading: true,
    platform: "FundedFlex Terminal / MT5",
    isFeatured: false,
    isActive: true,
    sortOrder: 6,
  },
];

export const initialPaymentMethods: PaymentMethod[] = [
  {
    id: "pm_usdt_trc20",
    asset: "USDT",
    network: "TRC20",
    walletAddress: "TLkP67fundedflexTrc20AddressPlaceholderXX",
    qrImage: null,
    instructions: "Send only Tether (USDT) on the TRON (TRC20) network. Transfers on other networks may result in loss of funds.",
    isActive: true,
    sortOrder: 1,
  },
  {
    id: "pm_usdt_erc20",
    asset: "USDT",
    network: "ERC20",
    walletAddress: "0x71C5A8fundedflexErc20AddressPlaceholderXX",
    qrImage: null,
    instructions: "Send only Tether (USDT) on the Ethereum (ERC20) network. Ensure gas fees are factored into your transfer.",
    isActive: true,
    sortOrder: 2,
  },
  {
    id: "pm_usdc_erc20",
    asset: "USDC",
    network: "ERC20",
    walletAddress: "0x98A1B2fundedflexUsdcAddressPlaceholderXX",
    qrImage: null,
    instructions: "Send only USD Coin (USDC) on the Ethereum (ERC20) network.",
    isActive: true,
    sortOrder: 3,
  },
  {
    id: "pm_btc",
    asset: "BTC",
    network: "BITCOIN",
    walletAddress: "bc1qfundedflexofficialbtcaddressplaceholder",
    qrImage: null,
    instructions: "Send native Bitcoin (BTC) to this SegWit address. Minimum 1 network confirmation required.",
    isActive: true,
    sortOrder: 4,
  },
  {
    id: "pm_eth",
    asset: "ETH",
    network: "ETHEREUM",
    walletAddress: "0xFundedFlexOfficialEthAddressPlaceholderXX",
    qrImage: null,
    instructions: "Send native Ethereum (ETH) directly to this address.",
    isActive: true,
    sortOrder: 5,
  },
];

export const initialOrders: Order[] = [
  {
    id: "ord_demo_1",
    orderNumber: "FF-ORD-539564",
    userId: "usr_trader",
    productId: "prod_50k",
    amountUSD: 299,
    cryptoAsset: "USDT",
    network: "TRC20",
    depositAddress: "TLkP67fundedflexTrc20AddressPlaceholderXX",
    expectedCryptoAmount: 299,
    txHash: "0x8f2d5930b8098c11e7ff8d92a9a5f4c4a16b9b3e10912f7188db3d89e5a1b32f",
    status: "PAYMENT_PENDING_REVIEW",
    notes: null,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 3600000).toISOString(),
    user: {
      id: "usr_trader",
      email: "trader@fundedflex.com",
      name: "Alex Trader",
    },
    product: initialProducts[3],
    credential: null,
  },
  {
    id: "ord_demo_2",
    orderNumber: "FF-ORD-925755",
    userId: "usr_trader",
    productId: "prod_100k",
    amountUSD: 499,
    cryptoAsset: "USDT",
    network: "TRC20",
    depositAddress: "TLkP67fundedflexTrc20AddressPlaceholderXX",
    expectedCryptoAmount: 499,
    txHash: "0x4b7891fa9a5e4d28711893892a012d99b1a5e12891bb3d89e5a1b32f11889a71",
    status: "ACCOUNT_READY",
    notes: null,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    user: {
      id: "usr_trader",
      email: "trader@fundedflex.com",
      name: "Alex Trader",
    },
    product: initialProducts[4],
    credential: {
      id: "cred_demo_1",
      accountId: "FF-405427",
      username: "FF405427",
      encryptedPassword: "encrypted_password_placeholder",
      server: "FundedFlex-Live-Sim01",
      platform: "FundedFlex Terminal / MT5",
      initialBalance: 100000,
      status: "ACTIVE",
      userId: "usr_trader",
      orderId: "ord_demo_2",
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      updatedAt: new Date(Date.now() - 86400000).toISOString(),
    }
  }
];

export const initialCredentials: AccountCredential[] = [
  {
    id: "cred_demo_1",
    accountId: "FF-405427",
    username: "FF405427",
    encryptedPassword: "encrypted_password_placeholder",
    server: "FundedFlex-Live-Sim01",
    platform: "FundedFlex Terminal / MT5",
    initialBalance: 100000,
    status: "ACTIVE",
    userId: "usr_trader",
    orderId: "ord_demo_2",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    order: {
      product: initialProducts[4]
    }
  }
];

// Global in-memory storage for serverless requests
declare global {
  var globalProducts: Product[] | undefined;
  var globalPaymentMethods: PaymentMethod[] | undefined;
  var globalOrders: Order[] | undefined;
  var globalCredentials: AccountCredential[] | undefined;
}

export function getStore() {
  if (!global.globalProducts) global.globalProducts = [...initialProducts];
  if (!global.globalPaymentMethods) global.globalPaymentMethods = [...initialPaymentMethods];
  if (!global.globalOrders) global.globalOrders = [...initialOrders];
  if (!global.globalCredentials) global.globalCredentials = [...initialCredentials];

  return {
    products: global.globalProducts,
    paymentMethods: global.globalPaymentMethods,
    orders: global.globalOrders,
    credentials: global.globalCredentials,
  };
}

export function getProducts(): Product[] {
  return getStore().products;
}

export function getProductBySlugOrId(idOrSlug: string): Product | undefined {
  return getStore().products.find(
    (p) => p.slug === idOrSlug || p.id === idOrSlug
  );
}

export function getPaymentMethods(): PaymentMethod[] {
  return getStore().paymentMethods;
}

export function getPaymentMethodById(id: string): PaymentMethod | undefined {
  return getStore().paymentMethods.find((pm) => pm.id === id);
}

export function getOrders(): Order[] {
  return getStore().orders;
}

export function getOrderById(id: string): Order | undefined {
  const store = getStore();
  const ord = store.orders.find((o) => o.id === id || o.orderNumber === id);
  if (!ord) return undefined;
  const prod = store.products.find((p) => p.id === ord.productId) || store.products[0];
  const cred = store.credentials.find((c) => c.orderId === ord.id);
  return {
    ...ord,
    product: prod,
    credential: cred || null,
  };
}

export function createOrder(orderData: Partial<Order>): Order {
  const store = getStore();
  const id = `ord_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
  const orderNumber = `FF-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  const prod = store.products.find((p) => p.id === orderData.productId) || store.products[0];

  const newOrder: Order = {
    id,
    orderNumber,
    userId: orderData.userId || "usr_trader",
    productId: orderData.productId || "prod_50k",
    amountUSD: prod ? prod.priceUSD : 299,
    cryptoAsset: orderData.cryptoAsset || "USDT",
    network: orderData.network || "TRC20",
    depositAddress: orderData.depositAddress || "TLkP67fundedflexTrc20AddressPlaceholderXX",
    expectedCryptoAmount: orderData.expectedCryptoAmount || (prod ? prod.priceUSD : 299),
    txHash: null,
    status: "PAYMENT_PENDING",
    notes: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    user: {
      id: orderData.userId || "usr_trader",
      email: orderData.user?.email || "trader@fundedflex.com",
      name: orderData.user?.name || "FundedFlex Trader",
    },
    product: prod,
    credential: null,
  };

  store.orders.unshift(newOrder);
  return newOrder;
}

export function submitOrderPayment(orderId: string, txHash: string): Order | null {
  const ord = getOrderById(orderId);
  if (!ord) return null;
  ord.txHash = txHash;
  ord.status = "PAYMENT_PENDING_REVIEW";
  ord.updatedAt = new Date().toISOString();
  return ord;
}

export function approveOrder(orderId: string): { order: Order; credential: AccountCredential } | null {
  const store = getStore();
  const ord = getOrderById(orderId);
  if (!ord) return null;

  ord.status = "ACCOUNT_READY";
  ord.updatedAt = new Date().toISOString();

  const randNum = Math.floor(100000 + Math.random() * 900000);
  const accountId = `FF-${randNum}`;
  const username = `FF${randNum}`;

  const newCred: AccountCredential = {
    id: `cred_${Date.now()}`,
    accountId,
    username,
    encryptedPassword: "generated_password_placeholder",
    server: "FundedFlex-Live-Sim01",
    platform: ord.product?.platform || "FundedFlex Terminal / MT5",
    initialBalance: ord.product?.accountSize || 50000,
    status: "ACTIVE",
    userId: ord.userId,
    orderId: ord.id,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    order: {
      product: ord.product
    }
  };

  store.credentials.unshift(newCred);
  ord.credential = newCred;

  return { order: ord, credential: newCred };
}

export function getCredentialsByUserId(userId: string): AccountCredential[] {
  const store = getStore();
  return store.credentials.filter((c) => c.userId === userId || userId === "usr_trader");
}
