import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  CreditCard,
  LockKeyhole,
  ShieldCheck,
  Smartphone,
  Building2,
  WalletCards,
  Info,
  ReceiptText,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router";

import BuyerHeader from "../../components/BuyerHeader";

const TRANSACTION = {
  contractId: "GC-CON-92841",

  buyer: {
    name: "FreshMart Foods",
    location: "Patna, Bihar",
  },

  farmer: {
    name: "Rajesh Kumar",
    location: "Muzaffarpur, Bihar",
  },

  produce: {
    name: "Premium Sharbati Wheat",
    quantity: 40,
    unit: "quintal",
    pricePerUnit: 2860,
  },

  logistics: 4200,
  qualityHoldRate: 0.5,
};

function formatINR(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation();

  const qualityHold =
    location.state?.qualityHold ??
    Math.round(
      TRANSACTION.produce.quantity *
        TRANSACTION.produce.pricePerUnit *
        (TRANSACTION.qualityHoldRate / 100)
    );

  const produceValue =
    TRANSACTION.produce.quantity * TRANSACTION.produce.pricePerUnit;

  const logistics = location.state?.freight ?? TRANSACTION.logistics;

  const totalAmount = produceValue + logistics + qualityHold;

  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [accepted, setAccepted] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePayment = () => {
    if (!accepted || processing) return;

    setProcessing(true);

    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
    }, 1200);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#F7F9F7] text-slate-900">
        <BuyerHeader search="" onSearchChange={() => {}} />

        <main className="mx-auto flex min-h-[calc(100vh-80px)] max-w-3xl items-center justify-center px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12"
          >
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <CheckCircle2 size={42} />
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-600">
              Transaction initiated
            </p>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
              Payment request created
            </h1>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500">
              Your payment workflow has been initiated for this GreenCart
              transaction. The shipment can now move to tracking.
            </p>

            <div className="mx-auto mt-8 max-w-md rounded-2xl bg-slate-50 p-5 text-left">
              <div className="flex justify-between border-b border-slate-200 pb-3">
                <span className="text-sm text-slate-500">
                  Transaction ID
                </span>

                <span className="font-mono text-sm font-semibold text-slate-800">
                  GC-TXN-92841
                </span>
              </div>

              <div className="flex justify-between pt-3">
                <span className="text-sm text-slate-500">
                  Amount
                </span>

                <span className="text-sm font-semibold text-slate-900">
                  {formatINR(totalAmount)}
                </span>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                onClick={() =>
                  navigate("/buyer/orders")
                }
                className="h-12 rounded-xl border border-slate-200 px-6 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                View Orders
              </button>

              <button
                onClick={() =>
                  navigate("/buyer/tracking", {
                    state: {
                      contractId: TRANSACTION.contractId,
                      transactionId: "GC-TXN-92841",
                    },
                  })
                }
                className="flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-700 to-emerald-600 px-6 text-sm font-semibold text-white shadow-lg shadow-emerald-900/15 transition hover:from-emerald-800 hover:to-emerald-700"
              >
                Track Shipment
                <ArrowRight size={17} />
              </button>
            </div>

            <p className="mt-7 text-[11px] leading-5 text-slate-400">
              Prototype only — no real payment has been processed.
            </p>
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F9F7] text-slate-900">
      <BuyerHeader search="" onSearchChange={() => {}} />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate("/buyer/logistics")}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-emerald-700"
        >
          <ArrowLeft size={16} />
          Back to Logistics
        </button>

        {/* HEADER */}
        <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
              <CreditCard size={14} />
              STEP 5 OF 6
            </div>

            <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Complete transaction
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Review the complete transaction amount and choose how you want
              to initiate payment.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
              Contract
            </p>

            <p className="mt-1 font-mono text-sm font-semibold text-slate-800">
              {TRANSACTION.contractId}
            </p>
          </div>
        </div>

        {/* PROGRESS */}
        <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
            {[
              ["Offer", true],
              ["Contract", true],
              ["Quality Hold", true],
              ["Logistics", true],
              ["Payment", true],
              ["Tracking", false],
            ].map(([label, done], index) => (
              <div key={label} className="flex items-center gap-2">
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                    done
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {done ? (
                    <CheckCircle2 size={14} />
                  ) : (
                    index + 1
                  )}
                </div>

                <span
                  className={`hidden text-xs font-medium sm:block ${
                    done ? "text-slate-800" : "text-slate-400"
                  }`}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          {/* LEFT */}
          <div className="space-y-6">
            {/* PAYMENT METHODS */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5">
                <h2 className="text-lg font-semibold text-slate-950">
                  Payment method
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Choose your preferred payment method.
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => setPaymentMethod("upi")}
                  className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${
                    paymentMethod === "upi"
                      ? "border-emerald-300 bg-emerald-50/60"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                      paymentMethod === "upi"
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    <Smartphone size={20} />
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-900">
                      UPI
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Google Pay, PhonePe, Paytm and other UPI apps
                    </p>
                  </div>

                  <div
                    className={`h-4 w-4 rounded-full border-2 ${
                      paymentMethod === "upi"
                        ? "border-emerald-600 bg-emerald-600"
                        : "border-slate-300"
                    }`}
                  />
                </button>

                <button
                  onClick={() => setPaymentMethod("bank")}
                  className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${
                    paymentMethod === "bank"
                      ? "border-emerald-300 bg-emerald-50/60"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                      paymentMethod === "bank"
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    <Building2 size={20} />
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-900">
                      Bank Transfer
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      NEFT / RTGS for business procurement
                    </p>
                  </div>

                  <div
                    className={`h-4 w-4 rounded-full border-2 ${
                      paymentMethod === "bank"
                        ? "border-emerald-600 bg-emerald-600"
                        : "border-slate-300"
                    }`}
                  />
                </button>

                <button
                  onClick={() => setPaymentMethod("wallet")}
                  className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${
                    paymentMethod === "wallet"
                      ? "border-emerald-300 bg-emerald-50/60"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                      paymentMethod === "wallet"
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    <WalletCards size={20} />
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-900">
                      Business Wallet
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Use your GreenCart procurement wallet balance
                    </p>
                  </div>

                  <div
                    className={`h-4 w-4 rounded-full border-2 ${
                      paymentMethod === "wallet"
                        ? "border-emerald-600 bg-emerald-600"
                        : "border-slate-300"
                    }`}
                  />
                </button>
              </div>
            </section>

            {/* TRANSACTION PROTECTION */}
            <section className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-6">
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white">
                  <ShieldCheck size={21} />
                </div>

                <div>
                  <h3 className="font-semibold text-emerald-950">
                    Transaction protection
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-emerald-900/70">
                    Your transaction is linked to the digital contract,
                    quality hold and shipment tracking workflow.
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl bg-white/80 p-3">
                  <LockKeyhole
                    size={16}
                    className="text-emerald-700"
                  />

                  <p className="mt-2 text-xs font-semibold text-slate-800">
                    Contract linked
                  </p>
                </div>

                <div className="rounded-xl bg-white/80 p-3">
                  <ShieldCheck
                    size={16}
                    className="text-emerald-700"
                  />

                  <p className="mt-2 text-xs font-semibold text-slate-800">
                    Quality protected
                  </p>
                </div>

                <div className="rounded-xl bg-white/80 p-3">
                  <ReceiptText
                    size={16}
                    className="text-emerald-700"
                  />

                  <p className="mt-2 text-xs font-semibold text-slate-800">
                    Digital record
                  </p>
                </div>
              </div>
            </section>

            {/* CONFIRMATION */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-950">
                Confirm transaction
              </h2>

              <label className="mt-5 flex cursor-pointer gap-3">
                <input
                  type="checkbox"
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                  className="mt-1 h-4 w-4 accent-emerald-600"
                />

                <span className="text-sm leading-6 text-slate-600">
                  I confirm that I have reviewed the digital contract,
                  produce quantity, agreed price, quality terms, logistics
                  estimate and transaction amount.
                </span>
              </label>

              <div className="mt-5 rounded-xl bg-slate-50 p-4">
                <div className="flex gap-3">
                  <Info
                    size={17}
                    className="mt-0.5 shrink-0 text-slate-500"
                  />

                  <p className="text-xs leading-5 text-slate-500">
                    This GreenCart prototype does not connect to a real
                    payment gateway. Clicking the button creates a simulated
                    transaction confirmation only.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT SUMMARY */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                  Payment summary
                </p>

                <h2 className="mt-2 text-xl font-semibold text-slate-950">
                  {TRANSACTION.produce.name}
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  {TRANSACTION.produce.quantity}{" "}
                  {TRANSACTION.produce.unit} ·{" "}
                  {TRANSACTION.farmer.name}
                </p>
              </div>

              <div className="space-y-4 border-b border-slate-100 pb-5">
                <div className="flex justify-between gap-4">
                  <span className="text-sm text-slate-500">
                    Produce value
                  </span>

                  <span className="text-sm font-medium text-slate-900">
                    {formatINR(produceValue)}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-sm text-slate-500">
                    Logistics
                  </span>

                  <span className="text-sm font-medium text-slate-900">
                    {formatINR(logistics)}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-sm text-slate-500">
                    Quality hold
                  </span>

                  <span className="text-sm font-medium text-slate-900">
                    {formatINR(qualityHold)}
                  </span>
                </div>
              </div>

              <div className="py-5">
                <p className="text-xs text-slate-400">
                  Total transaction amount
                </p>

                <p className="mt-1 text-3xl font-semibold tracking-tight text-slate-950">
                  {formatINR(totalAmount)}
                </p>
              </div>

              <div className="mb-5 rounded-2xl bg-slate-50 p-4">
                <div className="flex items-start gap-3">
                  <LockKeyhole
                    size={17}
                    className="mt-0.5 shrink-0 text-emerald-700"
                  />

                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      Secure transaction flow
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Contract, quality hold and logistics are attached to
                      this transaction.
                    </p>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={accepted ? { y: -1 } : {}}
                whileTap={accepted ? { scale: 0.98 } : {}}
                disabled={!accepted || processing}
                onClick={handlePayment}
                className={`flex h-12 w-full items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold text-white transition ${
                  accepted
                    ? "bg-gradient-to-r from-emerald-700 to-emerald-600 shadow-lg shadow-emerald-900/15 hover:from-emerald-800 hover:to-emerald-700"
                    : "cursor-not-allowed bg-slate-300"
                }`}
              >
                {processing ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Processing...
                  </>
                ) : (
                  <>
                    Confirm Payment
                    <ArrowRight size={17} />
                  </>
                )}
              </motion.button>
            </div>
          </aside>
        </div>

        <p className="mt-8 text-center text-[11px] leading-5 text-slate-400">
          Prototype only — no real money is transferred and no payment
          gateway is connected.
        </p>
      </main>
    </div>
  );
}