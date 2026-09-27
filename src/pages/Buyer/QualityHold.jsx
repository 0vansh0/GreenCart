import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Check,
  ChevronDown,
  FileCheck2,
  IndianRupee,
  LockKeyhole,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Truck,
  UserRound,
} from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";

const TRANSACTION = {
  contractId: "GC-CON-92841",

  buyer: {
    name: "FreshMart Foods",
  },

  farmer: {
    name: "Rajesh Kumar",
    location: "Muzaffarpur, Bihar",
  },

  produce: {
    name: "Premium Sharbati Wheat",
    quantity: 40,
    unit: "quintal",
    quality: "Grade A",
    moisture: "10.8%",
  },

  pricing: {
    agreedPrice: 2860,
    grossValue: 114400,
    logistics: 4200,
  },

  qualityHoldRate: 0.5,
};

function formatPrice(value) {
  return `₹${Number(value).toLocaleString("en-IN")}`;
}

export default function QualityHold() {
  const navigate = useNavigate();
  const location = useLocation();

  const contractId =
    location.state?.contractId ||
    TRANSACTION.contractId;

  const [confirmed, setConfirmed] = useState(false);
  const [inspectionAccepted, setInspectionAccepted] =
    useState(false);
  const [showHowItWorks, setShowHowItWorks] =
    useState(false);
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [toast, setToast] = useState("");

  const qualityHold = Math.round(
    TRANSACTION.pricing.grossValue *
      (TRANSACTION.qualityHoldRate / 100)
  );

  const payableToSeller =
    TRANSACTION.pricing.grossValue - qualityHold;

  function showToast(message) {
    setToast(message);

    window.setTimeout(() => {
      setToast("");
    }, 2800);
  }

  function handleContinue() {
    if (!confirmed) {
      showToast(
        "Please confirm the transaction terms first."
      );
      return;
    }

    if (!inspectionAccepted) {
      showToast(
        "Please acknowledge the quality inspection terms."
      );
      return;
    }

    setProcessing(true);

    window.setTimeout(() => {
      setProcessing(false);
      setCompleted(true);
    }, 1000);
  }

  if (completed) {
    return (
      <SuccessScreen
        contractId={contractId}
        qualityHold={qualityHold}
        onContinue={() =>
          navigate("/buyer/logistics", {
            state: {
              contractId,
              qualityHold,
            },
          })
        }
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#f7faf8] text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() =>
                navigate("/buyer/contract-details", {
                  state: { contractId },
                })
              }
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-emerald-300 hover:text-emerald-700"
            >
              <ArrowLeft size={18} />
            </button>

            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-700">
                Transaction
              </p>

              <h1 className="text-lg font-bold tracking-tight">
                Quality Hold
              </h1>
            </div>
          </div>

          <div className="hidden items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-700 sm:flex">
            <LockKeyhole size={14} />
            Protected payment flow
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-6 py-8 lg:px-8">
        {/* Heading */}
        <section className="mb-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
              Step 3 of 6
            </span>

            <span className="text-xs text-slate-400">
              Contract {contractId}
            </span>
          </div>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
            Protect the transaction before dispatch.
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            GreenCart's quality-hold workflow keeps the agreed
            transaction amount protected while the produce moves
            through inspection and delivery.
          </p>
        </section>

        {/* Progress */}
        <TransactionProgress />

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_390px]">
          {/* Main */}
          <div className="space-y-6">
            {/* Hero protection card */}
            <section className="overflow-hidden rounded-2xl bg-emerald-950 text-white shadow-lg">
              <div className="relative p-7">
                <div className="absolute right-8 top-8 opacity-10">
                  <ShieldCheck size={150} />
                </div>

                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                    <LockKeyhole size={23} />
                  </div>

                  <p className="mt-6 text-sm font-medium text-emerald-200">
                    Quality-protected amount
                  </p>

                  <p className="mt-1 text-4xl font-bold tracking-tight">
                    {formatPrice(qualityHold)}
                  </p>

                  <p className="mt-2 max-w-lg text-sm leading-6 text-emerald-100/70">
                    Indicative 0.5% quality-hold amount calculated
                    against the agreed produce value.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    <ProtectionPill>
                      <ShieldCheck size={13} />
                      Quality verification
                    </ProtectionPill>

                    <ProtectionPill>
                      <PackageCheck size={13} />
                      Delivery confirmation
                    </ProtectionPill>

                    <ProtectionPill>
                      <LockKeyhole size={13} />
                      Controlled release
                    </ProtectionPill>
                  </div>
                </div>
              </div>
            </section>

            {/* Transaction amount */}
            <section className="rounded-2xl border border-slate-200/80 bg-white shadow-sm">
              <SectionHeader
                icon={IndianRupee}
                title="Transaction amount"
                description="Based on your accepted contract"
              />

              <div className="p-6">
                <AmountRow
                  label="Produce value"
                  value={formatPrice(
                    TRANSACTION.pricing.grossValue
                  )}
                />

                <AmountRow
                  label="Logistics estimate"
                  value={formatPrice(
                    TRANSACTION.pricing.logistics
                  )}
                  muted
                />

                <div className="my-3 h-px bg-slate-100" />

                <AmountRow
                  label="Quality hold"
                  value={formatPrice(qualityHold)}
                  highlighted
                />

                <div className="mt-5 rounded-xl bg-slate-50 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-400">
                        Produce value after quality hold
                      </p>

                      <p className="mt-1 text-xl font-bold text-slate-900">
                        {formatPrice(payableToSeller)}
                      </p>
                    </div>

                    <div className="rounded-xl bg-white px-3 py-2 shadow-sm">
                      <p className="text-[10px] uppercase tracking-wide text-slate-400">
                        Hold rate
                      </p>

                      <p className="mt-1 text-sm font-bold text-emerald-700">
                        {TRANSACTION.qualityHoldRate}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Produce verification */}
            <section className="rounded-2xl border border-slate-200/80 bg-white shadow-sm">
              <SectionHeader
                icon={FileCheck2}
                title="Quality verification"
                description="Confirm the inspection conditions"
              />

              <div className="p-6">
                <div className="grid gap-3 sm:grid-cols-2">
                  <VerificationItem
                    label="Produce"
                    value={TRANSACTION.produce.name}
                  />

                  <VerificationItem
                    label="Quantity"
                    value={`${TRANSACTION.produce.quantity} ${TRANSACTION.produce.unit}`}
                  />

                  <VerificationItem
                    label="Quality grade"
                    value={TRANSACTION.produce.quality}
                  />

                  <VerificationItem
                    label="Moisture"
                    value={TRANSACTION.produce.moisture}
                  />
                </div>

                <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-4 transition hover:border-emerald-200 hover:bg-emerald-50/30">
                  <input
                    type="checkbox"
                    checked={inspectionAccepted}
                    onChange={(e) =>
                      setInspectionAccepted(
                        e.target.checked
                      )
                    }
                    className="mt-1 h-4 w-4 accent-emerald-700"
                  />

                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      I acknowledge the quality conditions.
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      The produce will be checked against the
                      agreed specifications before the protected
                      amount is released.
                    </p>
                  </div>
                </label>
              </div>
            </section>

            {/* How it works */}
            <section className="rounded-2xl border border-slate-200/80 bg-white shadow-sm">
              <button
                onClick={() =>
                  setShowHowItWorks(!showHowItWorks)
                }
                className="flex w-full items-center justify-between p-6 text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
                    <Sparkles size={19} />
                  </div>

                  <div>
                    <h3 className="font-bold">
                      How the quality hold works
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      Simple protection for both sides
                    </p>
                  </div>
                </div>

                <ChevronDown
                  size={18}
                  className={`text-slate-400 transition ${
                    showHowItWorks
                      ? "rotate-180"
                      : ""
                  }`}
                />
              </button>

              {showHowItWorks && (
                <motion.div
                  initial={{
                    opacity: 0,
                    height: 0,
                  }}
                  animate={{
                    opacity: 1,
                    height: "auto",
                  }}
                  className="border-t border-slate-100 px-6 pb-6 pt-5"
                >
                  <div className="space-y-4">
                    <WorkflowStep
                      number="01"
                      title="Transaction is confirmed"
                      text="The accepted contract becomes the reference for the transaction."
                    />

                    <WorkflowStep
                      number="02"
                      title="Quality is verified"
                      text="Produce is checked against the agreed quality conditions."
                    />

                    <WorkflowStep
                      number="03"
                      title="Delivery is completed"
                      text="The logistics stage records dispatch and delivery confirmation."
                    />

                    <WorkflowStep
                      number="04"
                      title="Protected amount is released"
                      text="The quality-hold amount is released according to the transaction conditions."
                    />
                  </div>
                </motion.div>
              )}
            </section>

            {/* Confirmation */}
            <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={confirmed}
                  onChange={(e) =>
                    setConfirmed(e.target.checked)
                  }
                  className="mt-1 h-4 w-4 accent-emerald-700"
                />

                <div>
                  <p className="text-sm font-bold text-slate-900">
                    Confirm quality-hold terms
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    I understand that the quality-hold amount is
                    an indicative protection mechanism in this
                    GreenCart demonstration flow and that final
                    payment/escrow processing requires backend
                    verification.
                  </p>
                </div>
              </label>
            </section>
          </div>

          {/* Summary */}
          <aside>
            <div className="sticky top-[96px] rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                  <PackageCheck size={20} />
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Produce
                  </p>

                  <p className="font-bold text-slate-900">
                    {TRANSACTION.produce.name}
                  </p>
                </div>
              </div>

              <div className="my-5 h-px bg-slate-100" />

              <SummaryRow
                label="Farmer"
                value={TRANSACTION.farmer.name}
              />

              <SummaryRow
                label="Location"
                value={TRANSACTION.farmer.location}
              />

              <SummaryRow
                label="Quantity"
                value={`${TRANSACTION.produce.quantity} ${TRANSACTION.produce.unit}`}
              />

              <SummaryRow
                label="Agreed rate"
                value={`${formatPrice(
                  TRANSACTION.pricing.agreedPrice
                )}/qtl`}
              />

              <SummaryRow
                label="Contract"
                value={contractId}
              />

              <div className="my-5 h-px bg-slate-100" />

              <div className="rounded-xl bg-emerald-50 p-4">
                <p className="text-xs font-semibold text-emerald-700">
                  Quality hold
                </p>

                <p className="mt-1 text-2xl font-bold text-emerald-900">
                  {formatPrice(qualityHold)}
                </p>

                <p className="mt-1 text-[11px] leading-5 text-emerald-700">
                  Indicative amount for this demonstration
                  workflow.
                </p>
              </div>

              <button
                disabled={processing}
                onClick={handleContinue}
                className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {processing ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Preparing...
                  </>
                ) : (
                  <>
                    Confirm & Continue
                    <ArrowRight size={16} />
                  </>
                )}
              </button>

              <div className="mt-4 flex items-start gap-2 text-[11px] leading-5 text-slate-400">
                <ShieldCheck
                  size={14}
                  className="mt-0.5 shrink-0 text-emerald-600"
                />

                <span>
                  This UI represents the transaction workflow.
                  It does not move real funds.
                </span>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Toast */}
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-2xl bg-slate-950 px-5 py-3.5 text-sm font-semibold text-white shadow-2xl"
        >
          <ShieldCheck
            size={16}
            className="text-emerald-400"
          />
          {toast}
        </motion.div>
      )}
    </div>
  );
}

/* ---------------- Components ---------------- */

function TransactionProgress() {
  const steps = [
    "Offer accepted",
    "Contract",
    "Quality hold",
    "Logistics",
    "Payment",
    "Tracking",
  ];

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
      <div className="flex min-w-[720px] items-center">
        {steps.map((step, index) => {
          const completed = index <= 1;
          const active = index === 2;

          return (
            <div
              key={step}
              className="flex flex-1 items-center"
            >
              <div className="flex items-center gap-2">
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    completed
                      ? "bg-emerald-700 text-white"
                      : active
                      ? "border-2 border-emerald-600 bg-white text-emerald-700"
                      : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {completed ? (
                    <Check size={14} />
                  ) : (
                    index + 1
                  )}
                </div>

                <span
                  className={`whitespace-nowrap text-xs font-semibold ${
                    completed || active
                      ? "text-slate-800"
                      : "text-slate-400"
                  }`}
                >
                  {step}
                </span>
              </div>

              {index < steps.length - 1 && (
                <div
                  className={`mx-3 h-px flex-1 ${
                    index < 2
                      ? "bg-emerald-300"
                      : "bg-slate-200"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SectionHeader({
  icon: Icon,
  title,
  description,
}) {
  return (
    <div className="flex items-center gap-4 border-b border-slate-100 p-6">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
        <Icon size={19} />
      </div>

      <div>
        <h3 className="font-bold text-slate-900">
          {title}
        </h3>

        <p className="mt-1 text-xs text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}

function AmountRow({ label, value, muted, highlighted }) {
  return (
    <div className="flex items-center justify-between py-2.5">
      <span
        className={`text-sm ${
          muted
            ? "text-slate-400"
            : highlighted
            ? "font-semibold text-emerald-700"
            : "text-slate-600"
        }`}
      >
        {label}
      </span>

      <span
        className={`text-sm font-bold ${
          highlighted
            ? "text-emerald-700"
            : "text-slate-900"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function VerificationItem({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-2 text-sm font-bold text-slate-800">
        {value}
      </p>
    </div>
  );
}

function WorkflowStep({ number, title, text }) {
  return (
    <div className="flex gap-4">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
        {number}
      </div>

      <div>
        <p className="text-sm font-bold text-slate-800">
          {title}
        </p>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          {text}
        </p>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5">
      <span className="text-xs text-slate-400">
        {label}
      </span>

      <span className="max-w-[210px] text-right text-xs font-semibold text-slate-700">
        {value}
      </span>
    </div>
  );
}

function ProtectionPill({ children }) {
  return (
    <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-semibold text-emerald-100">
      {children}
    </span>
  );
}

function SuccessScreen({
  contractId,
  qualityHold,
  onContinue,
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7faf8] px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl"
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
          <Check size={30} />
        </div>

        <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">
          Quality hold prepared
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
          Transaction is protected.
        </h1>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
          The quality-hold stage has been completed in the
          GreenCart transaction workflow. You can now arrange
          produce logistics.
        </p>

        <div className="mt-6 rounded-2xl bg-emerald-50 p-5 text-left">
          <div className="flex items-center justify-between">
            <span className="text-sm text-emerald-700">
              Quality hold
            </span>

            <strong className="text-lg text-emerald-900">
              {formatPrice(qualityHold)}
            </strong>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs text-emerald-700">
              Contract
            </span>

            <span className="text-xs font-bold text-emerald-900">
              {contractId}
            </span>
          </div>
        </div>

        <button
          onClick={onContinue}
          className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 text-sm font-bold text-white transition hover:bg-emerald-800"
        >
          Continue to Logistics
          <ArrowRight size={17} />
        </button>

        <p className="mt-4 text-[11px] leading-5 text-slate-400">
          Demo workflow only. No real funds have been
          transferred or held.
        </p>
      </motion.div>
    </div>
  );
}