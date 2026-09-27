import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Check,
  ChevronDown,
  Clock3,
  DollarSign,
  Handshake,
  IndianRupee,
  Leaf,
  MapPin,
  MessageSquare,
  Package,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Truck,
  UserRound,
  X,
  XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";

const INITIAL_RFQS = [
  {
    id: "RFQ-92841",
    buyer: "FreshMart Foods",
    buyerShort: "FreshMart",
    verified: true,
    rating: 4.8,
    location: "Patna, Bihar",
    crop: "Premium Sharbati Wheat",
    variety: "Sharbati",
    quantity: 40,
    unit: "quintal",
    askingPrice: 2920,
    buyerOffer: 2800,
    sellerCounter: 2860,
    status: "countered",
    created: "12 min ago",
    expires: "18h 42m",
    quality: "Grade A",
    moisture: "10.8%",
    logistics: 4200,
    aiMatch: 94,
    recommendation: "Accept counter",
    history: [
      {
        by: "Buyer",
        price: 2800,
        time: "12 min ago",
        note: "Volume procurement offer",
      },
      {
        by: "You",
        price: 2860,
        time: "8 min ago",
        note: "Countered based on current mandi premium",
      },
    ],
  },
  {
    id: "RFQ-92712",
    buyer: "Bharat Agro Pvt. Ltd.",
    buyerShort: "Bharat Agro",
    verified: true,
    rating: 4.7,
    location: "Muzaffarpur, Bihar",
    crop: "Basmati Rice 1121",
    variety: "1121",
    quantity: 20,
    unit: "quintal",
    askingPrice: 6400,
    buyerOffer: 6250,
    sellerCounter: null,
    status: "pending",
    created: "34 min ago",
    expires: "22h 10m",
    quality: "Premium",
    moisture: "11.2%",
    logistics: 2800,
    aiMatch: 89,
    recommendation: "Counter at ₹6,350",
    history: [
      {
        by: "Buyer",
        price: 6250,
        time: "34 min ago",
        note: "Initial purchase offer",
      },
    ],
  },
  {
    id: "RFQ-92384",
    buyer: "Kisan Supply Co.",
    buyerShort: "Kisan Supply",
    verified: true,
    rating: 4.6,
    location: "Purnia, Bihar",
    crop: "Yellow Maize",
    variety: "Hybrid",
    quantity: 50,
    unit: "quintal",
    askingPrice: 2200,
    buyerOffer: 2050,
    sellerCounter: null,
    status: "pending",
    created: "1h ago",
    expires: "19h 25m",
    quality: "Grade A",
    moisture: "13.4%",
    logistics: 5100,
    aiMatch: 82,
    recommendation: "Counter at ₹2,120",
    history: [
      {
        by: "Buyer",
        price: 2050,
        time: "1h ago",
        note: "Bulk order offer",
      },
    ],
  },
  {
    id: "RFQ-91973",
    buyer: "AgroLink Traders",
    buyerShort: "AgroLink",
    verified: true,
    rating: 4.5,
    location: "Darbhanga, Bihar",
    crop: "Premium Mustard",
    variety: "Yellow Mustard",
    quantity: 15,
    unit: "quintal",
    askingPrice: 5750,
    buyerOffer: 5400,
    sellerCounter: 5550,
    status: "countered",
    created: "2h ago",
    expires: "16h 40m",
    quality: "Grade A",
    moisture: "7.8%",
    logistics: 2200,
    aiMatch: 78,
    recommendation: "Wait for response",
    history: [
      {
        by: "Buyer",
        price: 5400,
        time: "2h ago",
        note: "Initial offer",
      },
      {
        by: "You",
        price: 5550,
        time: "1h 48m ago",
        note: "Counter offer",
      },
    ],
  },
];

const FILTERS = [
  ["all", "All"],
  ["pending", "Needs Action"],
  ["countered", "Countered"],
  ["accepted", "Accepted"],
  ["declined", "Declined"],
];

function formatPrice(value) {
  return `₹${Number(value).toLocaleString("en-IN")}`;
}

function calculateNet(rfq, price) {
  const gross = Number(price || 0) * rfq.quantity;
  return Math.max(gross - rfq.logistics, 0);
}

function statusStyles(status) {
  const styles = {
    pending: {
      label: "Needs action",
      className: "bg-amber-50 text-amber-700 border-amber-200",
    },
    countered: {
      label: "Countered",
      className: "bg-violet-50 text-violet-700 border-violet-200",
    },
    accepted: {
      label: "Accepted",
      className: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    declined: {
      label: "Declined",
      className: "bg-rose-50 text-rose-700 border-rose-200",
    },
  };

  return styles[status] || styles.pending;
}

export default function FarmerRFQs() {
  const navigate = useNavigate();

  const [rfqs, setRfqs] = useState(INITIAL_RFQS);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("newest");
  const [selected, setSelected] = useState(null);
  const [showCounter, setShowCounter] = useState(false);
  const [counterPrice, setCounterPrice] = useState("");
  const [counterReason, setCounterReason] = useState(
    "Current mandi premium"
  );
  const [toast, setToast] = useState("");

  const filteredRFQs = useMemo(() => {
    let data = [...rfqs];

    if (filter !== "all") {
      data = data.filter((item) => item.status === filter);
    }

    if (search.trim()) {
      const q = search.toLowerCase();

      data = data.filter(
        (item) =>
          item.crop.toLowerCase().includes(q) ||
          item.buyer.toLowerCase().includes(q) ||
          item.location.toLowerCase().includes(q) ||
          item.id.toLowerCase().includes(q)
      );
    }

    if (sort === "value") {
      data.sort(
        (a, b) =>
          calculateNet(b, b.sellerCounter || b.buyerOffer) -
          calculateNet(a, a.sellerCounter || a.buyerOffer)
      );
    }

    if (sort === "match") {
      data.sort((a, b) => b.aiMatch - a.aiMatch);
    }

    return data;
  }, [rfqs, filter, search, sort]);

  const needsAction = rfqs.filter(
    (item) => item.status === "pending"
  ).length;

  const accepted = rfqs.filter(
    (item) => item.status === "accepted"
  ).length;

  const countered = rfqs.filter(
    (item) => item.status === "countered"
  ).length;

  const totalValue = rfqs
    .filter((item) => item.status !== "declined")
    .reduce(
      (sum, item) =>
        sum +
        calculateNet(
          item,
          item.sellerCounter || item.buyerOffer
        ),
      0
    );

  function showToast(message) {
    setToast(message);

    window.setTimeout(() => {
      setToast("");
    }, 2800);
  }

  function updateStatus(id, status) {
    setRfqs((current) =>
      current.map((item) =>
        item.id === id ? { ...item, status } : item
      )
    );

    if (selected?.id === id) {
      setSelected((current) =>
        current ? { ...current, status } : current
      );
    }
  }

  function handleAccept(rfq) {
    const acceptedPrice =
      rfq.sellerCounter || rfq.buyerOffer;

    updateStatus(rfq.id, "accepted");

    showToast(
      `Offer accepted at ${formatPrice(acceptedPrice)}/quintal`
    );
  }

  function handleDecline(rfq) {
    updateStatus(rfq.id, "declined");

    showToast("Offer declined");
  }

  function openCounter(rfq) {
    setSelected(rfq);

    setCounterPrice(
      String(rfq.sellerCounter || rfq.buyerOffer || rfq.askingPrice)
    );

    setCounterReason("Current mandi premium");
    setShowCounter(true);
  }

  function submitCounter() {
    if (!selected) return;

    const price = Number(counterPrice);

    if (!price || price <= 0) {
      showToast("Enter a valid counter price");
      return;
    }

    const newHistoryItem = {
      by: "You",
      price,
      time: "Just now",
      note: counterReason,
    };

    const updated = {
      ...selected,
      sellerCounter: price,
      status: "countered",
      history: [...selected.history, newHistoryItem],
    };

    setRfqs((current) =>
      current.map((item) =>
        item.id === selected.id ? updated : item
      )
    );

    setSelected(updated);
    setShowCounter(false);

    showToast(
      `Counter offer sent at ${formatPrice(price)}/quintal`
    );
  }

  return (
    <div className="min-h-screen bg-[#f8faf9] text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-[1500px] items-center justify-between px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/farmer/dashboard")}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-emerald-300 hover:text-emerald-700"
            >
              <ArrowLeft size={18} />
            </button>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-700">
                Farmer workspace
              </p>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">
                RFQ & Offer Center
              </h1>
            </div>
          </div>

          <div className="hidden items-center gap-3 sm:flex">
            <div className="rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-700">
              AI-assisted decisions
            </div>

            <button
              onClick={() => navigate("/farmer/ai-insights")}
              className="flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800"
            >
              <Sparkles size={16} />
              AI Strategy
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1500px] px-6 py-8 lg:px-8">
        {/* Page heading */}
        <section className="mb-7 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-emerald-700">
              <Handshake size={16} />
              Buyer negotiations
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-slate-950">
              Review buyer offers before you decide.
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Compare buyer pricing, logistics, AI match signals and
              expected net realization in one place.
            </p>
          </div>

          <button
            onClick={() => navigate("/farmer/net-realization")}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-emerald-300 hover:text-emerald-700"
          >
            <BarChart3 size={17} />
            Net realization calculator
          </button>
        </section>

        {/* KPI cards */}
        <section className="mb-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            icon={Clock3}
            label="Needs action"
            value={needsAction}
            helper="Buyer offers waiting"
            accent="amber"
          />

          <MetricCard
            icon={Handshake}
            label="Countered"
            value={countered}
            helper="Negotiations active"
            accent="violet"
          />

          <MetricCard
            icon={Check}
            label="Accepted"
            value={accepted}
            helper="Ready for contract"
            accent="emerald"
          />

          <MetricCard
            icon={IndianRupee}
            label="Potential net value"
            value={formatPrice(totalValue)}
            helper="After indicative logistics"
            accent="blue"
          />
        </section>

        {/* Toolbar */}
        <section className="mb-6 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="relative w-full xl:max-w-md">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search crop, buyer or RFQ..."
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-50"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {FILTERS.map(([value, label]) => (
                <button
                  key={value}
                  onClick={() => setFilter(value)}
                  className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                    filter === value
                      ? "bg-emerald-700 text-white shadow-sm"
                      : "border border-slate-200 bg-white text-slate-600 hover:border-emerald-200 hover:text-emerald-700"
                  }`}
                >
                  {label}
                </button>
              ))}

              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="h-[42px] appearance-none rounded-xl border border-slate-200 bg-white pl-4 pr-10 text-sm font-semibold text-slate-600 outline-none focus:border-emerald-400"
                >
                  <option value="newest">Newest</option>
                  <option value="value">Highest value</option>
                  <option value="match">AI match</option>
                </select>

                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>
            </div>
          </div>
        </section>

        {/* RFQ list */}
        <section className="space-y-4">
          {filteredRFQs.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-20 text-center">
              <Package
                size={34}
                className="mx-auto mb-3 text-slate-300"
              />

              <h3 className="font-semibold text-slate-800">
                No offers found
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Try changing your search or filter.
              </p>
            </div>
          ) : (
            filteredRFQs.map((rfq) => (
              <RFQCard
                key={rfq.id}
                rfq={rfq}
                onOpen={() => setSelected(rfq)}
                onAccept={() => handleAccept(rfq)}
                onDecline={() => handleDecline(rfq)}
                onCounter={() => openCounter(rfq)}
              />
            ))
          )}
        </section>
      </main>

      {/* Detail drawer */}
      <AnimatePresence>
        {selected && !showCounter && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              className="fixed inset-0 z-50 bg-slate-950/30 backdrop-blur-sm"
            />

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28 }}
              className="fixed right-0 top-0 z-[60] flex h-full w-full max-w-xl flex-col overflow-y-auto bg-white shadow-2xl"
            >
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/95 px-6 py-5 backdrop-blur">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-emerald-700">
                    {selected.id}
                  </p>

                  <h3 className="mt-1 text-xl font-bold">
                    Offer details
                  </h3>
                </div>

                <button
                  onClick={() => setSelected(null)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-6 p-6">
                <div className="rounded-2xl bg-emerald-950 p-5 text-white">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-emerald-200">
                        Buyer
                      </p>

                      <h4 className="mt-1 text-xl font-bold">
                        {selected.buyer}
                      </h4>

                      <div className="mt-2 flex items-center gap-2 text-sm text-emerald-100">
                        <MapPin size={14} />
                        {selected.location}
                      </div>
                    </div>

                    {selected.verified && (
                      <div className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold">
                        <BadgeCheck size={14} />
                        Verified
                      </div>
                    )}
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <DarkStat
                      label="Quantity"
                      value={`${selected.quantity} ${selected.unit}`}
                    />

                    <DarkStat
                      label="AI match"
                      value={`${selected.aiMatch}%`}
                    />
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                    Produce
                  </p>

                  <h4 className="mt-1 text-lg font-bold text-slate-900">
                    {selected.crop}
                  </h4>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                      {selected.quality}
                    </span>

                    <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                      Moisture {selected.moisture}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <PriceBox
                    label="Your asking"
                    value={selected.askingPrice}
                  />

                  <PriceBox
                    label="Buyer offer"
                    value={selected.buyerOffer}
                  />

                  <PriceBox
                    label="Your counter"
                    value={
                      selected.sellerCounter ||
                      selected.buyerOffer
                    }
                    highlight
                  />

                  <PriceBox
                    label="Indicative net"
                    value={
                      calculateNet(
                        selected,
                        selected.sellerCounter ||
                          selected.buyerOffer
                      ) / selected.quantity
                    }
                    suffix="/qtl"
                  />
                </div>

                <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4">
                  <div className="flex items-start gap-3">
                    <Sparkles
                      size={18}
                      className="mt-0.5 text-emerald-700"
                    />

                    <div>
                      <p className="text-sm font-bold text-emerald-900">
                        GreenCart AI suggestion
                      </p>

                      <p className="mt-1 text-sm leading-6 text-emerald-800">
                        {selected.recommendation}
                      </p>

                      <p className="mt-2 text-xs text-emerald-700">
                        Match confidence: {selected.aiMatch}%
                      </p>
                    </div>
                  </div>
                </div>

                {/* Negotiation history */}
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <h4 className="font-bold text-slate-900">
                      Negotiation history
                    </h4>

                    <span className="text-xs text-slate-400">
                      Latest activity
                    </span>
                  </div>

                  <div className="space-y-3">
                    {selected.history.map((item, index) => (
                      <div
                        key={`${item.time}-${index}`}
                        className="flex gap-3"
                      >
                        <div className="relative flex flex-col items-center">
                          <div
                            className={`flex h-8 w-8 items-center justify-center rounded-full ${
                              item.by === "You"
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {item.by === "You" ? (
                              <UserRound size={14} />
                            ) : (
                              <Handshake size={14} />
                            )}
                          </div>

                          {index <
                            selected.history.length - 1 && (
                            <div className="absolute top-8 h-7 w-px bg-slate-200" />
                          )}
                        </div>

                        <div className="flex-1 rounded-xl border border-slate-200 p-3">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-semibold">
                              {item.by}
                            </p>

                            <p className="text-xs text-slate-400">
                              {item.time}
                            </p>
                          </div>

                          <p className="mt-1 font-bold text-slate-900">
                            {formatPrice(item.price)}
                            <span className="ml-1 text-xs font-normal text-slate-400">
                              / quintal
                            </span>
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {item.note}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Security */}
                <div className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <ShieldCheck
                    size={20}
                    className="mt-0.5 text-emerald-700"
                  />

                  <div>
                    <p className="text-sm font-bold">
                      Protected transaction flow
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Finalized offers can move into digital
                      contract, logistics and payment workflows.
                    </p>
                  </div>
                </div>
              </div>

              <div className="sticky bottom-0 mt-auto border-t border-slate-200 bg-white p-5">
                {selected.status === "accepted" ? (
                  <button
                    onClick={() =>
                      showToast("Contract workflow coming next")
                    }
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 text-sm font-bold text-white"
                  >
                    Continue to contract
                    <ArrowRight size={17} />
                  </button>
                ) : selected.status === "declined" ? (
                  <div className="rounded-xl bg-rose-50 px-4 py-3 text-center text-sm font-semibold text-rose-700">
                    This offer has been declined.
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => handleDecline(selected)}
                      className="rounded-xl border border-rose-200 bg-white px-3 py-3 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
                    >
                      Decline
                    </button>

                    <button
                      onClick={() => openCounter(selected)}
                      className="rounded-xl border border-violet-200 bg-violet-50 px-3 py-3 text-sm font-semibold text-violet-700 transition hover:bg-violet-100"
                    >
                      Counter
                    </button>

                    <button
                      onClick={() => handleAccept(selected)}
                      className="rounded-xl bg-emerald-700 px-3 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
                    >
                      Accept
                    </button>
                  </div>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Counter modal */}
      <AnimatePresence>
        {showCounter && selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[70] bg-slate-950/40 backdrop-blur-sm"
              onClick={() => setShowCounter(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              className="fixed left-1/2 top-1/2 z-[80] w-[calc(100%-32px)] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-6 shadow-2xl"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
                    <Handshake size={20} />
                  </div>

                  <h3 className="text-xl font-bold">
                    Make a counter offer
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {selected.crop} · {selected.quantity}{" "}
                    {selected.unit}
                  </p>
                </div>

                <button
                  onClick={() => setShowCounter(false)}
                  className="text-slate-400 hover:text-slate-700"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mt-6 rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">
                    Buyer offer
                  </span>

                  <strong className="text-slate-900">
                    {formatPrice(selected.buyerOffer)}
                    /qtl
                  </strong>
                </div>

                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="text-slate-500">
                    Your asking
                  </span>

                  <strong className="text-slate-900">
                    {formatPrice(selected.askingPrice)}
                    /qtl
                  </strong>
                </div>
              </div>

              <label className="mt-5 block text-sm font-semibold text-slate-700">
                Your counter price
              </label>

              <div className="relative mt-2">
                <IndianRupee
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="number"
                  value={counterPrice}
                  onChange={(e) =>
                    setCounterPrice(e.target.value)
                  }
                  className="h-14 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-20 text-lg font-bold outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50"
                  placeholder="Enter price"
                />

                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  / quintal
                </span>
              </div>

              <label className="mt-5 block text-sm font-semibold text-slate-700">
                Reason
              </label>

              <select
                value={counterReason}
                onChange={(e) =>
                  setCounterReason(e.target.value)
                }
                className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-emerald-400"
              >
                <option>Current mandi premium</option>
                <option>Bulk quantity pricing</option>
                <option>Quality / Grade A premium</option>
                <option>Lower logistics cost</option>
                <option>Price match</option>
                <option>Repeat buyer</option>
              </select>

              <div className="mt-5 flex items-start gap-3 rounded-xl border border-emerald-100 bg-emerald-50 p-3">
                <Sparkles
                  size={17}
                  className="mt-0.5 text-emerald-700"
                />

                <p className="text-xs leading-5 text-emerald-800">
                  GreenCart will record this negotiation and
                  show the buyer your counter price.
                </p>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  onClick={() => setShowCounter(false)}
                  className="h-12 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  onClick={submitCounter}
                  className="flex h-12 items-center justify-center gap-2 rounded-xl bg-emerald-700 text-sm font-bold text-white hover:bg-emerald-800"
                >
                  Send counter
                  <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-3 rounded-2xl bg-slate-950 px-5 py-3.5 text-sm font-semibold text-white shadow-2xl"
          >
            <Check
              size={17}
              className="text-emerald-400"
            />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------------- Components ---------------- */

function MetricCard({
  icon: Icon,
  label,
  value,
  helper,
  accent,
}) {
  const accentClasses = {
    amber: "bg-amber-50 text-amber-700",
    violet: "bg-violet-50 text-violet-700",
    emerald: "bg-emerald-50 text-emerald-700",
    blue: "bg-blue-50 text-blue-700",
  };

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${accentClasses[accent]}`}
        >
          <Icon size={19} />
        </div>

        <TrendingUp
          size={17}
          className="text-slate-300"
        />
      </div>

      <p className="mt-5 text-sm font-medium text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-2xl font-bold tracking-tight text-slate-950">
        {value}
      </p>

      <p className="mt-1 text-xs text-slate-400">
        {helper}
      </p>
    </div>
  );
}

function RFQCard({
  rfq,
  onOpen,
  onAccept,
  onDecline,
  onCounter,
}) {
  const status = statusStyles(rfq.status);

  const currentPrice =
    rfq.sellerCounter || rfq.buyerOffer;

  const net = calculateNet(rfq, currentPrice);

  return (
    <motion.article
      layout
      className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition hover:shadow-md"
    >
      <div className="p-5 lg:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center">
          {/* Buyer */}
          <div className="flex min-w-0 flex-1 items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 font-bold text-emerald-700">
              {rfq.buyerShort
                .split(" ")
                .map((word) => word[0])
                .join("")
                .slice(0, 2)}
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-bold text-slate-900">
                  {rfq.buyer}
                </h3>

                {rfq.verified && (
                  <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[11px] font-bold text-emerald-700">
                    <BadgeCheck size={12} />
                    Verified
                  </span>
                )}
              </div>

              <p className="mt-1 text-sm text-slate-500">
                {rfq.crop} · {rfq.quantity} {rfq.unit}
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <MapPin size={12} />
                  {rfq.location}
                </span>

                <span>★ {rfq.rating}</span>

                <span>{rfq.id}</span>
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 border-y border-slate-100 py-4 sm:grid-cols-4 sm:border-y-0 sm:py-0 xl:min-w-[530px]">
            <SmallMetric
              label="Asking"
              value={formatPrice(rfq.askingPrice)}
            />

            <SmallMetric
              label="Buyer offer"
              value={formatPrice(rfq.buyerOffer)}
              highlight
            />

            <SmallMetric
              label="Current"
              value={formatPrice(currentPrice)}
            />

            <SmallMetric
              label="Net / qtl"
              value={formatPrice(net / rfq.quantity)}
            />
          </div>

          {/* Status */}
          <div className="flex items-center justify-between gap-4 xl:w-[240px]">
            <div>
              <span
                className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-bold ${status.className}`}
              >
                {status.label}
              </span>

              <p className="mt-2 flex items-center gap-1 text-xs text-slate-400">
                <Clock3 size={12} />
                Expires {rfq.expires}
              </p>
            </div>

            <button
              onClick={onOpen}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-emerald-300 hover:text-emerald-700"
            >
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </div>

      {/* AI + actions */}
      <div className="flex flex-col gap-4 border-t border-slate-100 bg-slate-50/70 px-5 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-3 py-1.5 text-xs font-semibold text-emerald-700">
            <Sparkles size={13} />
            AI match {rfq.aiMatch}%
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Truck size={14} />
            Logistics ~{formatPrice(rfq.logistics)}
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Leaf size={14} />
            {rfq.quality} · {rfq.moisture}
          </div>

          <span className="hidden text-xs text-slate-400 lg:block">
            {rfq.recommendation}
          </span>
        </div>

        {rfq.status !== "accepted" &&
          rfq.status !== "declined" && (
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={onDecline}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-600 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
              >
                Decline
              </button>

              <button
                onClick={onCounter}
                className="rounded-xl border border-violet-200 bg-white px-4 py-2.5 text-xs font-bold text-violet-700 transition hover:bg-violet-50"
              >
                Counter
              </button>

              <button
                onClick={onAccept}
                className="rounded-xl bg-emerald-700 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-emerald-800"
              >
                Accept
              </button>
            </div>
          )}
      </div>
    </motion.article>
  );
}

function SmallMetric({ label, value, highlight }) {
  return (
    <div>
      <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p
        className={`mt-1 text-sm font-bold ${
          highlight ? "text-emerald-700" : "text-slate-800"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function PriceBox({
  label,
  value,
  highlight = false,
  suffix = "/qtl",
}) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        highlight
          ? "border-emerald-200 bg-emerald-50"
          : "border-slate-200 bg-white"
      }`}
    >
      <p className="text-xs text-slate-400">{label}</p>

      <p
        className={`mt-1 text-lg font-bold ${
          highlight ? "text-emerald-700" : "text-slate-900"
        }`}
      >
        {formatPrice(value)}
      </p>

      <span className="text-[11px] text-slate-400">
        {suffix}
      </span>
    </div>
  );
}

function DarkStat({ label, value }) {
  return (
    <div className="rounded-xl bg-white/10 p-3">
      <p className="text-[11px] text-emerald-200">{label}</p>
      <p className="mt-1 text-sm font-bold">{value}</p>
    </div>
  );
}