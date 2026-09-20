"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import QRCode from "qrcode";
import {
  Copy,
  Check,
  ShieldCheck,
  Zap,
  AlertCircle,
  Loader2,
  Clock,
  ArrowRight,
  Info,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  slug: string;
  accountSize: number;
  priceUSD: number;
  dailyDrawdown: number;
  maxDrawdown: number;
  leverage: string;
}

interface PaymentMethod {
  id: string;
  asset: string;
  network: string;
  walletAddress: string;
  qrImage: string | null;
  instructions: string | null;
}

interface CheckoutClientProps {
  products: Product[];
  paymentMethods: PaymentMethod[];
  defaultProduct: Product;
  initialUser: {
    id: string;
    email: string;
    name: string;
  } | null;
}

export default function CheckoutClient({
  products,
  paymentMethods,
  defaultProduct,
  initialUser,
}: CheckoutClientProps) {
  const router = useRouter();

  // Selected states
  const [selectedProduct, setSelectedProduct] = useState<Product>(defaultProduct);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(
    paymentMethods[0] || null
  );

  // Customer info
  const [fullName, setFullName] = useState(initialUser?.name || "");
  const [email, setEmail] = useState(initialUser?.email || "");

  // Order & Payment state
  const [orderId, setOrderId] = useState<string | null>(null);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [txHash, setTxHash] = useState("");
  const [step, setStep] = useState<"DETAILS" | "PAYMENT" | "SUBMITTED">("DETAILS");

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [copiedAmount, setCopiedAmount] = useState(false);

  // Calculate crypto payment amount
  const getExpectedAmount = () => {
    if (!selectedMethod) return selectedProduct.priceUSD.toString();
    if (selectedMethod.asset === "BTC") {
      return (selectedProduct.priceUSD / 65000).toFixed(6);
    }
    if (selectedMethod.asset === "ETH") {
      return (selectedProduct.priceUSD / 2650).toFixed(5);
    }
    return selectedProduct.priceUSD.toFixed(2);
  };

  // Generate QR code when payment method or expected amount changes
  useEffect(() => {
    if (selectedMethod?.walletAddress) {
      QRCode.toDataURL(selectedMethod.walletAddress, {
        width: 280,
        margin: 1.5,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      })
        .then((url) => setQrDataUrl(url))
        .catch((err) => console.error("QR Code generation error:", err));
    }
  }, [selectedMethod]);

  const handleCopy = (text: string, type: "address" | "amount") => {
    navigator.clipboard.writeText(text);
    if (type === "address") {
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2000);
    } else {
      setCopiedAmount(true);
      setTimeout(() => setCopiedAmount(false), 2000);
    }
  };

  // 1. Initialize Order in DB
  const handleProceedToPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !fullName) {
      setError("Please fill in your full name and email address.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: selectedProduct.id,
          paymentMethodId: selectedMethod.id,
          email,
          fullName,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create order");
      }

      setOrderId(data.orderId);
      setOrderNumber(data.orderNumber);
      setStep("PAYMENT");
    } catch (err: any) {
      setError(err.message || "Failed to generate payment instructions");
    } finally {
      setLoading(false);
    }
  };

  // 2. Submit Transaction Hash ("I Have Paid")
  const handleSubmitPaymentProof = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!txHash.trim()) {
      setError("Please enter your blockchain transaction hash or payment reference.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/orders/submit-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          txHash: txHash.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit transaction reference");
      }

      setStep("SUBMITTED");
    } catch (err: any) {
      setError(err.message || "Error submitting payment confirmation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* LEFT COLUMN: Order Configuration & Details */}
      <div className="lg:col-span-7 space-y-6">
        {step === "DETAILS" && (
          <div className="rounded-2xl bg-[#090D0F] border border-white/10 p-6 sm:p-8 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#F59E0B] text-black font-extrabold text-xs flex items-center justify-center">
                1
              </span>
              Trader Details & Account Selection
            </h2>

            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2 mb-6">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleProceedToPayment} className="space-y-6">
              {/* Account Tier Selector */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                  Select Account Size
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {products.map((p) => {
                    const isSelected = p.id === selectedProduct.id;
                    return (
                      <button
                        type="button"
                        key={p.id}
                        onClick={() => setSelectedProduct(p)}
                        className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all ${
                          isSelected
                            ? "bg-[#F59E0B] text-black shadow-glow-gold-sm scale-[1.02]"
                            : "bg-[#050707] border border-white/10 text-zinc-300 hover:text-white hover:border-white/20"
                        }`}
                      >
                        ${(p.accountSize / 1000).toFixed(0)}K
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Personal Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Alex Vance"
                    className="w-full px-4 py-3 rounded-xl bg-[#050707] border border-white/10 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-[#F59E0B] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#050707] border border-white/10 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-[#F59E0B] transition-colors"
                  />
                </div>
              </div>

              {/* Supported Crypto Asset Selector */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                  Choose Payment Cryptocurrency
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {paymentMethods.map((method) => {
                    const isSelected = selectedMethod?.id === method.id;
                    return (
                      <button
                        type="button"
                        key={method.id}
                        onClick={() => setSelectedMethod(method)}
                        className={`p-3 rounded-xl text-left border transition-all ${
                          isSelected
                            ? "bg-[#F59E0B]/10 border-[#F59E0B] text-white shadow-glow-gold-sm"
                            : "bg-[#050707] border-white/10 text-zinc-400 hover:text-white hover:border-white/20"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-white">
                            {method.asset}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-zinc-300 font-mono">
                            {method.network}
                          </span>
                        </div>
                        <span className="text-[11px] text-zinc-500 mt-1 block">
                          Instant on-chain transfer
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-black font-extrabold text-sm shadow-glow-gold transition-all disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Generating Secure Invoice...</span>
                  </>
                ) : (
                  <>
                    <span>Proceed to Crypto Payment</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* STEP 2: PAYMENT SCREEN */}
        {step === "PAYMENT" && (
          <div className="rounded-2xl bg-[#090D0F] border border-white/10 p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#F59E0B] text-black font-extrabold text-xs flex items-center justify-center">
                  2
                </span>
                <h2 className="text-xl font-bold text-white">
                  Send Cryptocurrency
                </h2>
              </div>
              <span className="text-xs font-mono text-zinc-400">
                Order #{orderNumber}
              </span>
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* QR Code and Address Card */}
            <div className="p-6 rounded-2xl bg-[#050707] border border-white/10 flex flex-col sm:flex-row items-center gap-6">
              {/* QR Image */}
              <div className="p-3 bg-white rounded-xl shadow-lg flex-shrink-0">
                {qrDataUrl ? (
                  <img
                    src={qrDataUrl}
                    alt="Crypto Payment QR Code"
                    width={180}
                    height={180}
                    className="rounded-lg"
                  />
                ) : (
                  <div className="w-[180px] h-[180px] flex items-center justify-center text-zinc-600 text-xs">
                    Loading QR...
                  </div>
                )}
              </div>

              {/* Payment Details */}
              <div className="w-full space-y-4">
                <div>
                  <span className="text-xs text-zinc-400 block">
                    Exact Amount to Send:
                  </span>
                  <div className="flex items-center justify-between gap-2 mt-1">
                    <span className="text-2xl font-extrabold text-[#F59E0B] font-mono">
                      {getExpectedAmount()} {selectedMethod?.asset}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(getExpectedAmount(), "amount")}
                      className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-zinc-300 font-medium flex items-center gap-1.5 border border-white/10 transition-colors"
                    >
                      {copiedAmount ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#F59E0B]" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <span className="text-[11px] text-zinc-500">
                    Network: <strong className="text-white">{selectedMethod?.network}</strong>
                  </span>
                </div>

                <div>
                  <span className="text-xs text-zinc-400 block">
                    Recipient Wallet Address:
                  </span>
                  <div className="flex items-center justify-between gap-2 mt-1 p-2.5 rounded-xl bg-zinc-900/90 border border-white/10">
                    <span className="text-xs font-mono text-zinc-200 truncate select-all">
                      {selectedMethod?.walletAddress}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(selectedMethod?.walletAddress || "", "address")}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors flex-shrink-0"
                    >
                      {copiedAddress ? (
                        <Check className="w-4 h-4 text-[#F59E0B]" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {selectedMethod?.instructions && (
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px] flex items-start gap-2">
                    <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>{selectedMethod.instructions}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Submission Form */}
            <form onSubmit={handleSubmitPaymentProof} className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Blockchain Transaction Hash (TxID)
                </label>
                <input
                  type="text"
                  required
                  value={txHash}
                  onChange={(e) => setTxHash(e.target.value)}
                  placeholder="Paste transaction hash e.g. 0x82f93a... or Tronscan hash"
                  className="w-full px-4 py-3 rounded-xl bg-[#050707] border border-white/10 text-white font-mono text-xs placeholder-zinc-600 focus:outline-none focus:border-[#F59E0B] transition-colors"
                />
                <span className="text-[11px] text-zinc-500 mt-1 block">
                  Found in your withdrawal receipt or wallet history.
                </span>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-3">
                <Clock className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <p className="text-xs text-zinc-400">
                  Clicking <strong>&ldquo;I Have Paid&rdquo;</strong> submits your transaction for administrative review. Account credentials are provisioned once verified.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-black font-extrabold text-sm shadow-glow-gold transition-all disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting Reference...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-5 h-5" />
                    <span>I Have Paid</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* STEP 3: SUBMISSION COMPLETE / UNDER REVIEW */}
        {step === "SUBMITTED" && (
          <div className="rounded-2xl bg-[#090D0F] border border-white/10 p-8 text-center space-y-6 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-[#F59E0B] flex items-center justify-center mx-auto shadow-glow-gold-sm">
              <Clock className="w-8 h-8 animate-pulse" />
            </div>

            <div>
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20">
                PAYMENT PENDING REVIEW
              </span>
              <h2 className="text-2xl font-extrabold text-white mt-3">
                Payment Submitted Successfully
              </h2>
              <p className="text-xs text-zinc-400 max-w-md mx-auto mt-2 leading-relaxed">
                Your transaction hash has been registered with Order #{orderNumber}. Our operations desk is reviewing the blockchain transfer.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#050707] border border-white/5 max-w-md mx-auto text-left text-xs space-y-2">
              <div className="flex justify-between text-zinc-400">
                <span>Account Package:</span>
                <span className="text-white font-medium">{selectedProduct.name}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Expected Amount:</span>
                <span className="text-[#F59E0B] font-mono font-medium">
                  {getExpectedAmount()} {selectedMethod?.asset}
                </span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Network:</span>
                <span className="text-white font-mono">{selectedMethod?.network}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Submitted TxHash:</span>
                <span className="text-zinc-300 font-mono truncate max-w-[180px]">
                  {txHash}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <button
                type="button"
                onClick={() => router.push(`/payment/${orderId}`)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#F59E0B] text-black font-bold text-xs shadow-glow-gold-sm hover:bg-[#D97706] transition-all"
              >
                Track Live Order Status →
              </button>
              <button
                type="button"
                onClick={() => router.push("/dashboard")}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium text-xs border border-white/10 transition-colors"
              >
                Go to Trader Dashboard
              </button>
            </div>
          </div>
        )}
      </div>

      {/* RIGHT COLUMN: Order Summary Card */}
      <div className="lg:col-span-5 rounded-2xl bg-[#080B0C] border border-white/10 p-6 sm:p-8 space-y-6 shadow-xl sticky top-28">
        <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center justify-between">
          <span>Order Summary</span>
          <span className="text-xs text-[#F59E0B] font-normal lowercase">
            simulated tier
          </span>
        </h3>

        <div className="p-4 rounded-xl bg-[#050707] border border-white/5 space-y-3">
          <div className="flex justify-between items-baseline">
            <span className="text-sm font-extrabold text-white">
              {selectedProduct.name}
            </span>
            <span className="text-lg font-bold text-white font-mono">
              ${selectedProduct.priceUSD}
            </span>
          </div>
          <p className="text-xs text-zinc-400">
            Simulated capital size: ${selectedProduct.accountSize.toLocaleString()} USD
          </p>
        </div>

        {/* Challenge Specs */}
        <div className="space-y-2 text-xs border-y border-white/5 py-4">
          <div className="flex justify-between text-zinc-400">
            <span>Daily Drawdown Limit:</span>
            <span className="text-white font-medium">{selectedProduct.dailyDrawdown}%</span>
          </div>
          <div className="flex justify-between text-zinc-400">
            <span>Max Overall Drawdown:</span>
            <span className="text-white font-medium">{selectedProduct.maxDrawdown}%</span>
          </div>
          <div className="flex justify-between text-zinc-400">
            <span>Account Leverage:</span>
            <span className="text-white font-medium">{selectedProduct.leverage}</span>
          </div>
          <div className="flex justify-between text-zinc-400">
            <span>Payment Method:</span>
            <span className="text-[#F59E0B] font-bold">
              Crypto Only ({selectedMethod?.asset} {selectedMethod?.network})
            </span>
          </div>
          <div className="flex justify-between text-zinc-400">
            <span>Recurring Fees:</span>
            <span className="text-white font-medium">$0 (One-Time Evaluation)</span>
          </div>
        </div>

        {/* Security Pillars */}
        <div className="space-y-2 text-[11px] text-zinc-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#F59E0B]" />
            <span>Strict manual on-chain review for complete security</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#F59E0B]" />
            <span>Automated credential generation upon approval</span>
          </div>
        </div>
      </div>
    </div>
  );
}
