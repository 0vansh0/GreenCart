import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Check,
  ChevronDown,
  Download,
  FileCheck2,
  FileText,
  IndianRupee,
  MapPin,
  Package,
  PenLine,
  ShieldCheck,
  Truck,
  UserRound,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";

const CONTRACT = {
  id: "GC-CON-92841",
  status: "Awaiting Buyer Signature",

  buyer: {
    name: "FreshMart Foods",
    contact: "Procurement Team",
    location: "Patna, Bihar",
    verified: true,
  },

  farmer: {
    name: "Rajesh Kumar",
    location: "Muzaffarpur, Bihar",
    verified: true,
  },

  produce: {
    name: "Premium Sharbati Wheat",
    variety: "Sharbati",
    quantity: 40,
    unit: "quintal",
    quality: "Grade A",
    moisture: "10.8%",
  },

  pricing: {
    agreedPrice: 2860,
    mandiPrice: 2760,
    logistics: 4200,
  },

  delivery: {
    location: "FreshMart Warehouse, Patna, Bihar",
    method: "Door delivery",
    expected: "29 September 2026",
  },

  qualityTerms: [
    "Produce must match the agreed crop variety.",
    "Quality grade should be Grade A at dispatch.",
    "Moisture target is 10.8% as recorded during offer review.",
    "Final quality verification is performed before release of the quality-held amount.",
  ],
};

function formatPrice(value) {
  return `₹${Number(value).toLocaleString("en-IN")}`;
}

export default function DigitalContract() {
  const navigate = useNavigate();

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [signed, setSigned] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [toast, setToast] = useState("");

  const grossValue = useMemo(
    () =>
      CONTRACT.pricing.agreedPrice *
      CONTRACT.produce.quantity,
    []
  );

  const estimatedNet =
    grossValue - CONTRACT.pricing.logistics;

  function showToastMessage(message) {
    setToast(message);

    window.setTimeout(() => {
      setToast("");
    }, 2800);
  }

  function handleSign() {
    if (!acceptedTerms) {
      showToastMessage(
        "Please accept the contract terms first."
      );
      return;
    }

    setSigned(true);
    showToastMessage("Contract signed successfully.");
  }

  function handleDownload() {
    const printable = `
GREENCART DIGITAL CONTRACT

Contract ID: ${CONTRACT.id}

BUYER
${CONTRACT.buyer.name}
${CONTRACT.buyer.location}

FARMER
${CONTRACT.farmer.name}
${CONTRACT.farmer.location}

PRODUCE
${CONTRACT.produce.name}
Variety: ${CONTRACT.produce.variety}
Quantity: ${CONTRACT.produce.quantity} ${CONTRACT.produce.unit}
Quality: ${CONTRACT.produce.quality}
Moisture: ${CONTRACT.produce.moisture}

AGREED PRICE
${formatPrice(CONTRACT.pricing.agreedPrice)} / quintal

GROSS VALUE
${formatPrice(grossValue)}

LOGISTICS
${formatPrice(CONTRACT.pricing.logistics)}

ESTIMATED NET
${formatPrice(estimatedNet)}

DELIVERY
${CONTRACT.delivery.location}
${CONTRACT.delivery.method}
Expected: ${CONTRACT.delivery.expected}

This is a frontend demonstration contract for GreenCart.
Final legal and financial terms require backend verification.
`;

    const blob = new Blob([printable], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${CONTRACT.id}.txt`;
    link.click();

    URL.revokeObjectURL(url);

    showToastMessage("Contract downloaded.");
  }

  return (
    <div className="min-h-screen bg-[#f7faf8] text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/buyer/offers")}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-emerald-300 hover:text-emerald-700"
            >
              <ArrowLeft size={18} />
            </button>

            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-700">
                Transaction
              </p>

              <h1 className="text-lg font-bold tracking-tight">
                Digital Contract
              </h1>
            </div>
          </div>

          <div className="hidden items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-700 sm:flex">
            <ShieldCheck size={15} />
            Protected workflow
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-6 py-8 lg:px-8">
        {/* Top heading */}
        <section className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                {signed
                  ? "Signed"
                  : CONTRACT.status}
              </span>

              <span className="text-xs font-medium text-slate-400">
                Contract {CONTRACT.id}
              </span>
            </div>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
              Review your purchase agreement.
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Confirm the negotiated produce, pricing, quality,
              delivery and transaction terms before moving to
              the quality-hold stage.
            </p>
          </div>

          <button
            onClick={handleDownload}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-emerald-300 hover:text-emerald-700"
          >
            <Download size={17} />
            Download contract
          </button>
        </section>

        {/* Progress */}
        <ContractProgress signed={signed} />

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_380px]">
          {/* Main contract */}
          <div className="space-y-6">
            {/* Parties */}
            <section className="rounded-2xl border border-slate-200/80 bg-white shadow-sm">
              <SectionHeader
                icon={UserRound}
                title="Contract parties"
                description="Verified participants in this transaction"
              />

              <div className="grid gap-4 p-6 md:grid-cols-2">
                <PartyCard
                  type="Buyer"
                  name={CONTRACT.buyer.name}
                  location={CONTRACT.buyer.location}
                  verified={CONTRACT.buyer.verified}
                />

                <PartyCard
                  type="Farmer / Seller"
                  name={CONTRACT.farmer.name}
                  location={CONTRACT.farmer.location}
                  verified={CONTRACT.farmer.verified}
                />
              </div>
            </section>

            {/* Produce */}
            <section className="rounded-2xl border border-slate-200/80 bg-white shadow-sm">
              <SectionHeader
                icon={Package}
                title="Produce & quantity"
                description="Details agreed during negotiation"
              />

              <div className="grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-4">
                <InfoBox
                  label="Produce"
                  value={CONTRACT.produce.name}
                />

                <InfoBox
                  label="Variety"
                  value={CONTRACT.produce.variety}
                />

                <InfoBox
                  label="Quantity"
                  value={`${CONTRACT.produce.quantity} ${CONTRACT.produce.unit}`}
                />

                <InfoBox
                  label="Quality"
                  value={CONTRACT.produce.quality}
                />

                <InfoBox
                  label="Moisture"
                  value={CONTRACT.produce.moisture}
                />
              </div>
            </section>

            {/* Commercial terms */}
            <section className="rounded-2xl border border-slate-200/80 bg-white shadow-sm">
              <SectionHeader
                icon={IndianRupee}
                title="Commercial terms"
                description="Negotiated transaction value"
              />

              <div className="p-6">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <PriceCard
                    label="Agreed price"
                    value={formatPrice(
                      CONTRACT.pricing.agreedPrice
                    )}
                    helper="/ quintal"
                    highlighted
                  />

                  <PriceCard
                    label="Mandi reference"
                    value={formatPrice(
                      CONTRACT.pricing.mandiPrice
                    )}
                    helper="/ quintal"
                  />

                  <PriceCard
                    label="Gross value"
                    value={formatPrice(grossValue)}
                  />

                  <PriceCard
                    label="Logistics"
                    value={formatPrice(
                      CONTRACT.pricing.logistics
                    )}
                  />
                </div>

                <div className="mt-5 flex flex-col justify-between gap-4 rounded-2xl bg-emerald-950 p-5 text-white sm:flex-row sm:items-center">
                  <div>
                    <p className="text-xs font-medium text-emerald-200">
                      Estimated seller realization
                    </p>

                    <p className="mt-1 text-2xl font-bold">
                      {formatPrice(estimatedNet)}
                    </p>
                  </div>

                  <div className="rounded-xl bg-white/10 px-4 py-3">
                    <p className="text-[11px] text-emerald-200">
                      Reference
                    </p>

                    <p className="mt-1 text-sm font-bold">
                      After indicative logistics
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Delivery */}
            <section className="rounded-2xl border border-slate-200/80 bg-white shadow-sm">
              <SectionHeader
                icon={Truck}
                title="Delivery & logistics"
                description="Agreed destination and delivery method"
              />

              <div className="grid gap-4 p-6 md:grid-cols-3">
                <InfoBox
                  label="Destination"
                  value={CONTRACT.delivery.location}
                  icon={MapPin}
                />

                <InfoBox
                  label="Method"
                  value={CONTRACT.delivery.method}
                  icon={Truck}
                />

                <InfoBox
                  label="Expected delivery"
                  value={CONTRACT.delivery.expected}
                  icon={CalendarDays}
                />
              </div>
            </section>

            {/* Quality terms */}
            <section className="rounded-2xl border border-slate-200/80 bg-white shadow-sm">
              <button
                onClick={() => setShowTerms(!showTerms)}
                className="flex w-full items-center justify-between p-6 text-left"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                    <FileCheck2 size={19} />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900">
                      Quality & inspection terms
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Conditions attached to the transaction
                    </p>
                  </div>
                </div>

                <ChevronDown
                  size={19}
                  className={`text-slate-400 transition ${
                    showTerms ? "rotate-180" : ""
                  }`}
                />
              </button>

              {showTerms && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="border-t border-slate-100 px-6 pb-6 pt-5"
                >
                  <div className="space-y-3">
                    {CONTRACT.qualityTerms.map(
                      (term, index) => (
                        <div
                          key={index}
                          className="flex gap-3 rounded-xl bg-slate-50 p-3"
                        >
                          <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                            <Check size={12} />
                          </div>

                          <p className="text-sm leading-6 text-slate-600">
                            {term}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </motion.div>
              )}
            </section>

            {/* Buyer confirmation */}
            <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
                  <PenLine size={19} />
                </div>

                <div className="flex-1">
                  <h3 className="font-bold text-slate-900">
                    Buyer confirmation
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    By signing, you confirm that the commercial,
                    produce, quality and delivery details shown
                    above match the accepted offer.
                  </p>

                  <label className="mt-5 flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      checked={acceptedTerms}
                      onChange={(e) =>
                        setAcceptedTerms(e.target.checked)
                      }
                      className="mt-1 h-4 w-4 accent-emerald-700"
                    />

                    <span className="text-sm leading-6 text-slate-600">
                      I have reviewed the contract details and
                      agree to proceed with the GreenCart
                      transaction workflow.
                    </span>
                  </label>
                </div>
              </div>
            </section>
          </div>

          {/* Right summary */}
          <aside className="space-y-5">
            <div className="sticky top-[96px] rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                  <FileText size={20} />
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Contract value
                  </p>

                  <p className="text-xl font-bold text-slate-950">
                    {formatPrice(grossValue)}
                  </p>
                </div>
              </div>

              <div className="my-5 h-px bg-slate-100" />

              <SummaryRow
                label="Produce"
                value={CONTRACT.produce.name}
              />

              <SummaryRow
                label="Quantity"
                value={`${CONTRACT.produce.quantity} ${CONTRACT.produce.unit}`}
              />

              <SummaryRow
                label="Agreed rate"
                value={`${formatPrice(
                  CONTRACT.pricing.agreedPrice
                )}/qtl`}
              />

              <SummaryRow
                label="Delivery"
                value={CONTRACT.delivery.expected}
              />

              <SummaryRow
                label="Contract"
                value={CONTRACT.id}
              />

              <div className="mt-5 rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                <div className="flex gap-3">
                  <ShieldCheck
                    size={18}
                    className="mt-0.5 shrink-0 text-emerald-700"
                  />

                  <div>
                    <p className="text-sm font-bold text-emerald-900">
                      Quality hold follows signing
                    </p>

                    <p className="mt-1 text-xs leading-5 text-emerald-800">
                      The next stage will prepare the
                      transaction for quality protection before
                      logistics begins.
                    </p>
                  </div>
                </div>
              </div>

              {!signed ? (
                <button
                  onClick={handleSign}
                  className="mt-5 flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-800"
                >
                  <PenLine size={17} />
                  Sign & Continue
                  <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  onClick={() =>
                    navigate("/buyer/quality-hold", {
                      state: {
                        contractId: CONTRACT.id,
                      },
                    })
                  }
                  className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-800"
                >
                  Proceed to Quality Hold
                  <ArrowRight size={16} />
                </button>
              )}

              <p className="mt-3 text-center text-[11px] leading-5 text-slate-400">
                Demo transaction flow. Final contracts,
                payments and escrow require backend verification.
              </p>
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
          <Check size={16} className="text-emerald-400" />
          {toast}
        </motion.div>
      )}
    </div>
  );
}

/* ---------------- Components ---------------- */

function ContractProgress({ signed }) {
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
          const completed =
            index === 0 || (index === 1 && signed);

          const active =
            index === 1 && !signed;

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
                    index === 0 ||
                    (index === 1 && signed)
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

function PartyCard({
  type,
  name,
  location,
  verified,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
            {type}
          </p>

          <h4 className="mt-1 font-bold text-slate-900">
            {name}
          </h4>

          <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
            <MapPin size={13} />
            {location}
          </div>
        </div>

        {verified && (
          <BadgeCheck
            size={19}
            className="text-emerald-600"
          />
        )}
      </div>
    </div>
  );
}

function InfoBox({
  label,
  value,
  icon: Icon,
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
      <div className="flex items-center gap-2">
        {Icon && (
          <Icon size={14} className="text-emerald-700" />
        )}

        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
          {label}
        </p>
      </div>

      <p className="mt-2 text-sm font-bold leading-5 text-slate-800">
        {value}
      </p>
    </div>
  );
}

function PriceCard({
  label,
  value,
  helper,
  highlighted,
}) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        highlighted
          ? "border-emerald-200 bg-emerald-50"
          : "border-slate-200 bg-slate-50/60"
      }`}
    >
      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p
        className={`mt-2 text-lg font-bold ${
          highlighted
            ? "text-emerald-700"
            : "text-slate-900"
        }`}
      >
        {value}
      </p>

      {helper && (
        <p className="mt-0.5 text-[11px] text-slate-400">
          {helper}
        </p>
      )}
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