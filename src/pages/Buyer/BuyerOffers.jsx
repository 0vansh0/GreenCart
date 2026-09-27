import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileText,
  MessageSquare,
  Package,
  RotateCcw,
  ShieldCheck,
  X,
  XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";

import BuyerHeader from "../../components/BuyerHeader";

const INITIAL_OFFERS = [
  {
    id: "OFF-92841",
    productId: "wheat-01",
    product: "Premium Sharbati Wheat",
    image:
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=900&q=80",
    farmer: "Rajesh Kumar",
    location: "Muzaffarpur, Bihar",
    quantity: 40,
    unit: "Quintal",
    askingPrice: 2920,
    offerPrice: 2800,
    counterPrice: 2860,
    status: "countered",
    created: "22 Sep 2026",
    reason: "Bulk order discount",
    messages: [
      {
        from: "buyer",
        price: 2800,
        time: "10:42 AM",
      },
      {
        from: "seller",
        price: 2860,
        time: "11:16 AM",
      },
    ],
  },
  {
    id: "OFF-92712",
    productId: "rice-01",
    product: "Basmati Rice 1121",
    image:
      "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=900&q=80",
    farmer: "Amit Kumar",
    location: "Patna, Bihar",
    quantity: 20,
    unit: "Quintal",
    askingPrice: 6400,
    offerPrice: 6250,
    counterPrice: null,
    status: "accepted",
    created: "20 Sep 2026",
    reason: "Price match",
    messages: [
      {
        from: "buyer",
        price: 6250,
        time: "2:12 PM",
      },
      {
        from: "seller",
        price: 6250,
        time: "2:48 PM",
      },
    ],
  },
  {
    id: "OFF-92384",
    productId: "maize-01",
    product: "Yellow Maize",
    image:
      "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=900&q=80",
    farmer: "Kisan FPO",
    location: "Purnia, Bihar",
    quantity: 30,
    unit: "Quintal",
    askingPrice: 2200,
    offerPrice: 2050,
    counterPrice: null,
    status: "pending",
    created: "17 Sep 2026",
    reason: "Self-pickup discount",
    messages: [
      {
        from: "buyer",
        price: 2050,
        time: "9:20 AM",
      },
    ],
  },
  {
    id: "OFF-91973",
    productId: "mustard-01",
    product: "Premium Mustard",
    image:
      "https://images.unsplash.com/photo-1599909533730-f9d7a9f1b4cc?auto=format&fit=crop&w=900&q=80",
    farmer: "Bharat Agro",
    location: "Darbhanga, Bihar",
    quantity: 15,
    unit: "Quintal",
    askingPrice: 5750,
    offerPrice: 5400,
    counterPrice: null,
    status: "declined",
    created: "12 Sep 2026",
    reason: "Bulk order discount",
    messages: [
      {
        from: "buyer",
        price: 5400,
        time: "3:10 PM",
      },
    ],
  },
];

const TABS = [
  { id: "all", label: "All Offers" },
  { id: "pending", label: "Pending" },
  { id: "countered", label: "Countered" },
  { id: "accepted", label: "Accepted" },
  { id: "declined", label: "Declined" },
];

const formatPrice = (value) =>
  `₹${Number(value || 0).toLocaleString("en-IN")}`;

function statusStyle(status) {
  if (status === "accepted") {
    return "bg-emerald-50 text-emerald-700";
  }

  if (status === "countered") {
    return "bg-blue-50 text-blue-700";
  }

  if (status === "pending") {
    return "bg-amber-50 text-amber-700";
  }

  return "bg-red-50 text-red-700";
}

function StatusIcon({ status }) {
  if (status === "accepted") {
    return <CheckCircle2 size={14} />;
  }

  if (status === "countered") {
    return <RotateCcw size={14} />;
  }

  if (status === "pending") {
    return <Clock3 size={14} />;
  }

  return <XCircle size={14} />;
}

export default function BuyerOffers() {
  const navigate = useNavigate();

  const [offers, setOffers] = useState(INITIAL_OFFERS);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [toast, setToast] = useState("");

  const filteredOffers = useMemo(() => {
    if (activeTab === "all") return offers;

    return offers.filter(
      (offer) => offer.status === activeTab
    );
  }, [offers, activeTab]);

  const showToast = (message) => {
    setToast(message);

    window.setTimeout(() => {
      setToast("");
    }, 2500);
  };

  const acceptCounter = (offerId) => {
    setOffers((current) =>
      current.map((offer) =>
        offer.id === offerId
          ? {
              ...offer,
              status: "accepted",
              offerPrice: offer.counterPrice,
              messages: [
                ...offer.messages,
                {
                  from: "buyer",
                  price: offer.counterPrice,
                  time: "Now",
                },
              ],
            }
          : offer
      )
    );

    setSelectedOffer(null);
    showToast("Counter offer accepted.");
  };

  const declineOffer = (offerId) => {
    setOffers((current) =>
      current.map((offer) =>
        offer.id === offerId
          ? {
              ...offer,
              status: "declined",
            }
          : offer
      )
    );

    setSelectedOffer(null);
    showToast("Offer declined.");
  };

  return (
    <div className="min-h-screen bg-[#F7F9F5] text-slate-900">
      <BuyerHeader />

      <main className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-7 flex items-center gap-2 text-sm text-slate-500">
          <button
            onClick={() => navigate("/buyer/dashboard")}
            className="transition hover:text-emerald-700"
          >
            Dashboard
          </button>

          <ChevronRight size={15} />

          <span className="font-medium text-slate-900">
            Offers
          </span>
        </div>

        {/* Heading */}
        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">
              Negotiation center
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
              Your offers
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
              Manage price negotiations, seller counters and accepted
              procurement deals.
            </p>
          </div>

          <button
            onClick={() => navigate("/marketplace")}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 text-sm font-semibold text-white shadow-lg shadow-emerald-700/15 transition hover:bg-emerald-800"
          >
            Find more produce
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Summary */}
        <div className="mb-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard
            label="Total offers"
            value={offers.length}
            icon={<FileText size={18} />}
          />

          <SummaryCard
            label="Awaiting response"
            value={
              offers.filter(
                (offer) => offer.status === "pending"
              ).length
            }
            icon={<Clock3 size={18} />}
          />

          <SummaryCard
            label="Counter offers"
            value={
              offers.filter(
                (offer) => offer.status === "countered"
              ).length
            }
            icon={<RotateCcw size={18} />}
          />

          <SummaryCard
            label="Accepted"
            value={
              offers.filter(
                (offer) => offer.status === "accepted"
              ).length
            }
            icon={<CheckCircle2 size={18} />}
          />
        </div>

        {/* Tabs */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex gap-1 overflow-x-auto rounded-xl bg-slate-100 p-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap rounded-lg px-4 py-2 text-xs font-semibold transition ${
                  activeTab === tab.id
                    ? "bg-white text-emerald-700 shadow-sm"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Offers */}
        <div className="mt-5 space-y-4">
          {filteredOffers.map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
            >
              <div className="p-5">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
                  {/* Product */}
                  <div className="flex min-w-0 flex-1 gap-4">
                    <img
                      src={offer.image}
                      alt={offer.product}
                      className="h-24 w-24 shrink-0 rounded-xl object-cover"
                    />

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusStyle(
                            offer.status
                          )}`}
                        >
                          <StatusIcon status={offer.status} />
                          {offer.status === "countered"
                            ? "Seller countered"
                            : offer.status.charAt(0).toUpperCase() +
                              offer.status.slice(1)}
                        </span>

                        <span className="font-mono text-[11px] text-slate-400">
                          {offer.id}
                        </span>
                      </div>

                      <h2 className="mt-2 text-base font-bold">
                        {offer.product}
                      </h2>

                      <p className="mt-1 text-xs text-slate-500">
                        {offer.farmer} · {offer.location}
                      </p>

                      <p className="mt-2 text-xs text-slate-400">
                        {offer.quantity} {offer.unit} ·{" "}
                        {offer.reason}
                      </p>
                    </div>
                  </div>

                  {/* Prices */}
                  <div className="grid grid-cols-3 gap-5 text-right lg:min-w-[360px]">
                    <PriceColumn
                      label="Asking"
                      value={offer.askingPrice}
                    />

                    <PriceColumn
                      label="Your offer"
                      value={offer.offerPrice}
                      highlight
                    />

                    <PriceColumn
                      label="Seller"
                      value={
                        offer.counterPrice || offer.askingPrice
                      }
                      seller
                    />
                  </div>

                  {/* Action */}
                  <button
                    onClick={() => setSelectedOffer(offer)}
                    className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-xs font-semibold text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                  >
                    View negotiation
                    <ChevronRight size={15} />
                  </button>
                </div>
              </div>

              {/* Counter action */}
              {offer.status === "countered" && (
                <div className="flex flex-col justify-between gap-3 border-t border-blue-100 bg-blue-50/50 px-5 py-4 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-3">
                    <MessageSquare
                      size={17}
                      className="text-blue-700"
                    />

                    <div>
                      <p className="text-sm font-semibold text-blue-950">
                        Seller countered at{" "}
                        {formatPrice(offer.counterPrice)}/quintal
                      </p>

                      <p className="text-xs text-blue-950/60">
                        Review the counter and decide how to proceed.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedOffer(offer)}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 text-xs font-semibold text-white transition hover:bg-blue-800"
                  >
                    Review counter
                    <ArrowRight size={15} />
                  </button>
                </div>
              )}

              {/* Accepted */}
              {offer.status === "accepted" && (
                <div className="flex items-center justify-between gap-4 border-t border-emerald-100 bg-emerald-50/50 px-5 py-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2
                      size={18}
                      className="text-emerald-700"
                    />

                    <div>
                      <p className="text-sm font-semibold text-emerald-950">
                        Offer accepted
                      </p>

                      <p className="text-xs text-emerald-950/60">
                        You can now continue with the purchase request.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      navigate(`/product/${offer.productId}`)
                    }
                    className="hidden text-xs font-semibold text-emerald-700 sm:block"
                  >
                    View product
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </main>

      {/* Negotiation Modal */}
      {selectedOffer && (
        <OfferModal
          offer={selectedOffer}
          onClose={() => setSelectedOffer(null)}
          onAccept={() => acceptCounter(selectedOffer.id)}
          onDecline={() => declineOffer(selectedOffer.id)}
          onProduct={() =>
            navigate(`/product/${selectedOffer.productId}`)
          }
        />
      )}

      {/* Toast */}
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-xl"
        >
          {toast}
        </motion.div>
      )}
    </div>
  );
}

function SummaryCard({ label, value, icon }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
        {icon}
      </div>

      <p className="mt-4 text-xs font-medium text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-xl font-bold">{value}</p>
    </div>
  );
}

function PriceColumn({ label, value, highlight, seller }) {
  return (
    <div>
      <p className="text-[11px] text-slate-400">{label}</p>

      <p
        className={`mt-1 text-sm font-bold ${
          highlight
            ? "text-emerald-700"
            : seller
              ? "text-blue-700"
              : "text-slate-800"
        }`}
      >
        {formatPrice(value)}
      </p>
    </div>
  );
}

function OfferModal({
  offer,
  onClose,
  onAccept,
  onDecline,
  onProduct,
}) {
  const [counterPrice, setCounterPrice] = useState(
    offer.counterPrice || offer.offerPrice
  );

  const isCountered = offer.status === "countered";
  const isPending = offer.status === "pending";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
      >
        {/* Header */}
        <div className="border-b border-slate-100 p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex gap-4">
              <img
                src={offer.image}
                alt={offer.product}
                className="h-16 w-16 rounded-xl object-cover"
              />

              <div>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusStyle(
                    offer.status
                  )}`}
                >
                  <StatusIcon status={offer.status} />
                  {offer.status}
                </span>

                <h2 className="mt-2 text-xl font-bold">
                  {offer.product}
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  {offer.farmer} · {offer.location}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* Price comparison */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-[11px] text-slate-400">
                Asking price
              </p>

              <p className="mt-1 text-lg font-bold">
                {formatPrice(offer.askingPrice)}
              </p>
            </div>

            <div className="rounded-xl bg-emerald-50 p-4">
              <p className="text-[11px] text-emerald-700/60">
                Your offer
              </p>

              <p className="mt-1 text-lg font-bold text-emerald-700">
                {formatPrice(offer.offerPrice)}
              </p>
            </div>

            <div className="rounded-xl bg-blue-50 p-4">
              <p className="text-[11px] text-blue-700/60">
                Seller counter
              </p>

              <p className="mt-1 text-lg font-bold text-blue-700">
                {offer.counterPrice
                  ? formatPrice(offer.counterPrice)
                  : "—"}
              </p>
            </div>
          </div>

          {/* Negotiation history */}
          <div className="mt-7">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold">
                Negotiation history
              </h3>

              <span className="text-xs text-slate-400">
                {offer.id}
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {offer.messages.map((message, index) => (
                <div
                  key={`${message.from}-${index}`}
                  className={`flex ${
                    message.from === "buyer"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.from === "buyer"
                        ? "rounded-br-md bg-emerald-700 text-white"
                        : "rounded-bl-md bg-slate-100 text-slate-900"
                    }`}
                  >
                    <p className="text-[11px] opacity-60">
                      {message.from === "buyer"
                        ? "You"
                        : offer.farmer}
                    </p>

                    <p className="mt-1 text-sm font-bold">
                      {formatPrice(message.price)}/quintal
                    </p>

                    <p className="mt-1 text-[10px] opacity-60">
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Counter input */}
          {isCountered && (
            <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50/50 p-4">
              <label className="text-xs font-semibold text-blue-950">
                Seller's counter offer
              </label>

              <div className="mt-2 flex items-center rounded-xl border border-blue-200 bg-white">
                <span className="pl-3 text-sm text-slate-400">
                  ₹
                </span>

                <input
                  value={counterPrice}
                  onChange={(e) => setCounterPrice(e.target.value)}
                  className="h-11 w-full bg-transparent px-2 text-sm font-bold outline-none"
                />

                <span className="pr-3 text-xs text-slate-400">
                  / quintal
                </span>
              </div>
            </div>
          )}

          {/* Pending */}
          {isPending && (
            <div className="mt-6 rounded-2xl border border-amber-100 bg-amber-50 p-4">
              <div className="flex gap-3">
                <Clock3
                  size={18}
                  className="mt-0.5 text-amber-700"
                />

                <div>
                  <h3 className="text-sm font-bold text-amber-950">
                    Waiting for seller
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-amber-950/65">
                    Your offer has been sent. The seller can accept,
                    decline or counter it.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Security */}
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <ShieldCheck
              size={18}
              className="mt-0.5 text-emerald-700"
            />

            <p className="text-xs leading-5 text-slate-500">
              Negotiated prices are indicative until both sides confirm the
              final transaction terms.
            </p>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            {isCountered && (
              <>
                <button
                  onClick={onDecline}
                  className="h-11 flex-1 rounded-xl border border-red-200 bg-white text-sm font-semibold text-red-600 transition hover:bg-red-50"
                >
                  Decline Counter
                </button>

                <button
                  onClick={onAccept}
                  className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-700 text-sm font-semibold text-white transition hover:bg-emerald-800"
                >
                  <Check size={16} />
                  Accept Counter
                </button>
              </>
            )}

            {!isCountered && (
              <button
                onClick={onProduct}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 text-sm font-semibold text-white transition hover:bg-emerald-800"
              >
                View Product
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}