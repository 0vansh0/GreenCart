import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft,
  ArrowUpRight,
  BadgeCheck,
  Bell,
  CalendarClock,
  Check,
  ChevronDown,
  Clock3,
  FileText,
  Filter,
  IndianRupee,
  MapPin,
  MessageSquare,
  Package,
  Plus,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Truck,
  UserRound,
  X,
  XCircle,
} from "lucide-react";

const rfqData = [
  {
    id: "RFQ-24091",
    crop: "Sharbati Wheat",
    variety: "Premium Grade",
    quantity: 120,
    unit: "Qtl",
    destination: "Patna Processing Plant",
    location: "Patna, Bihar",
    targetPrice: 2900,
    mandiPrice: 2760,
    deadline: "Today, 6:30 PM",
    deadlineType: "urgent",
    offers: 3,
    status: "Countered",
    created: "22 Sep 2026",
    quality: "98.2%",
    moisture: "11.8%",
    topOffer: {
      farmer: "Rajesh Kumar",
      price: 2920,
      freight: 85,
      net: 2835,
      payment: "50% upfront",
      delivery: "3 days",
      rating: 4.9,
      verified: true,
    },
  },
  {
    id: "RFQ-24087",
    crop: "Basmati Rice",
    variety: "1121 Steam",
    quantity: 80,
    unit: "Qtl",
    destination: "Muzaffarpur Mill",
    location: "Muzaffarpur, Bihar",
    targetPrice: 6350,
    mandiPrice: 6210,
    deadline: "Tomorrow, 2:00 PM",
    deadlineType: "normal",
    offers: 5,
    status: "Awaiting Response",
    created: "21 Sep 2026",
    quality: "97.6%",
    moisture: "12.4%",
    topOffer: {
      farmer: "Sunil Kumar",
      price: 6340,
      freight: 70,
      net: 6270,
      payment: "Net 7 days",
      delivery: "2 days",
      rating: 4.8,
      verified: true,
    },
  },
  {
    id: "RFQ-24076",
    crop: "Yellow Maize",
    variety: "Hybrid",
    quantity: 200,
    unit: "Qtl",
    destination: "Darbhanga Hub",
    location: "Darbhanga, Bihar",
    targetPrice: 2200,
    mandiPrice: 2140,
    deadline: "24 Sep 2026",
    deadlineType: "normal",
    offers: 4,
    status: "Offers Received",
    created: "20 Sep 2026",
    quality: "96.9%",
    moisture: "13.2%",
    topOffer: {
      farmer: "Amit Kumar",
      price: 2240,
      freight: 65,
      net: 2175,
      payment: "30% upfront",
      delivery: "4 days",
      rating: 4.7,
      verified: true,
    },
  },
  {
    id: "RFQ-24061",
    crop: "Mustard",
    variety: "Pusa Bold",
    quantity: 65,
    unit: "Qtl",
    destination: "Patna Processing Plant",
    location: "Patna, Bihar",
    targetPrice: 5700,
    mandiPrice: 5580,
    deadline: "25 Sep 2026",
    deadlineType: "normal",
    offers: 2,
    status: "Awarded",
    created: "18 Sep 2026",
    quality: "98.8%",
    moisture: "8.9%",
    topOffer: {
      farmer: "Vikash Singh",
      price: 5750,
      freight: 55,
      net: 5695,
      payment: "100% on delivery",
      delivery: "2 days",
      rating: 4.9,
      verified: true,
    },
  },
];

const statusStyles = {
  Countered: "bg-violet-50 text-violet-700 border-violet-100",
  "Awaiting Response": "bg-amber-50 text-amber-700 border-amber-100",
  "Offers Received": "bg-emerald-50 text-emerald-700 border-emerald-100",
  Awarded: "bg-slate-100 text-slate-700 border-slate-200",
};

function money(value) {
  return `₹${Number(value).toLocaleString("en-IN")}`;
}

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${statusStyles[status]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

function Modal({ children, onClose, wide = false }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm"
        onMouseDown={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.98 }}
          transition={{ duration: 0.2 }}
          onMouseDown={(e) => e.stopPropagation()}
          className={`max-h-[92vh] w-full overflow-y-auto rounded-[26px] border border-slate-200 bg-white shadow-2xl ${
            wide ? "max-w-5xl" : "max-w-xl"
          }`}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function MetricCard({ label, value, detail, icon: Icon, accent = "emerald" }) {
  const accentMap = {
    emerald: "bg-emerald-50 text-emerald-700",
    amber: "bg-amber-50 text-amber-700",
    violet: "bg-violet-50 text-violet-700",
    slate: "bg-slate-100 text-slate-700",
  };

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
            {label}
          </p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
            {value}
          </p>
        </div>

        <div className={`rounded-xl p-2.5 ${accentMap[accent]}`}>
          <Icon size={18} strokeWidth={1.8} />
        </div>
      </div>

      <p className="mt-2 text-xs text-slate-500">{detail}</p>
    </div>
  );
}

export default function RFQCenter() {
  const navigate = useNavigate();

  const [rfqs, setRfqs] = useState(rfqData);
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedRFQ, setSelectedRFQ] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [showCounter, setShowCounter] = useState(false);
  const [toast, setToast] = useState("");

  const tabs = [
    "All",
    "Awaiting Response",
    "Countered",
    "Offers Received",
    "Awarded",
  ];

  const filteredRFQs = useMemo(() => {
    return rfqs.filter((rfq) => {
      const matchesTab =
        activeTab === "All" || rfq.status === activeTab;

      const query = search.toLowerCase();

      const matchesSearch =
        !query ||
        rfq.id.toLowerCase().includes(query) ||
        rfq.crop.toLowerCase().includes(query) ||
        rfq.variety.toLowerCase().includes(query) ||
        rfq.destination.toLowerCase().includes(query);

      return matchesTab && matchesSearch;
    });
  }, [rfqs, activeTab, search]);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2600);
  };

  const updateRFQ = (id, status, message) => {
    setRfqs((current) =>
      current.map((rfq) =>
        rfq.id === id ? { ...rfq, status } : rfq
      )
    );

    setSelectedRFQ(null);
    showToast(message);
  };

  return (
    <div className="min-h-screen bg-[#f7f9f7] text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[70px] max-w-[1500px] items-center gap-4 px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate("/marketplace")}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
          >
            <ArrowLeft size={18} />
          </button>

          <div className="hidden sm:block">
            <p className="text-sm font-bold tracking-tight text-slate-900">
              GreenCart
            </p>
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-400">
              Procurement
            </p>
          </div>

          <div className="mx-1 hidden h-7 w-px bg-slate-200 lg:block" />

          <div className="relative min-w-0 flex-1 lg:max-w-md">
            <Search
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search RFQs, crops or destinations..."
              className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-500/5"
            />
          </div>

          <div className="ml-auto flex items-center gap-2">
            <button className="hidden h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 sm:flex">
              <Bell size={18} />
            </button>

            <button className="hidden h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 sm:flex">
              <UserRound size={18} />
            </button>

            <button
              onClick={() => setShowCreate(true)}
              className="flex h-10 items-center gap-2 rounded-xl bg-emerald-700 px-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800"
            >
              <Plus size={17} />
              <span className="hidden sm:inline">Create RFQ</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8">
        {/* Page intro */}
        <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.13em] text-emerald-700">
              <Sparkles size={14} />
              Buyer workspace
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              RFQ Center
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Manage procurement requests, compare farmer offers and negotiate
              directly with verified suppliers.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck size={15} className="text-emerald-600" />
            Protected B2B procurement workflow
          </div>
        </div>

        {/* KPI */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <MetricCard
            label="Active RFQs"
            value="7"
            detail="3 closing within 24 hours"
            icon={FileText}
          />

          <MetricCard
            label="Offers Received"
            value="14"
            detail="Across 5 active requests"
            icon={Package}
            accent="violet"
          />

          <MetricCard
            label="Pending Decisions"
            value="4"
            detail="Requires buyer action"
            icon={Clock3}
            accent="amber"
          />

          <MetricCard
            label="Procurement Value"
            value="₹18.6L"
            detail="Current RFQ pipeline"
            icon={IndianRupee}
          />
        </div>

        {/* Intelligence strip */}
        <div className="mt-5 overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-50 via-white to-white">
          <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-emerald-700 p-2.5 text-white">
                <Sparkles size={18} />
              </div>

              <div>
                <p className="text-sm font-bold text-slate-900">
                  Procurement intelligence
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  3 offers are currently below your target landed cost.
                  Review freight before negotiating further.
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate("/farmer/net-realization")}
              className="flex shrink-0 items-center justify-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
            >
              Compare realization
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>

        {/* Tabs + filters */}
        <div className="mt-7 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex gap-1 overflow-x-auto rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
            {tabs.map((tab) => {
              const active = activeTab === tab;

              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap rounded-lg px-3 py-2 text-xs font-semibold transition ${
                    active
                      ? "bg-slate-900 text-white shadow-sm"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          <button className="flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-600 shadow-sm hover:bg-slate-50">
            <SlidersHorizontal size={15} />
            Filters
            <ChevronDown size={14} />
          </button>
        </div>

        {/* RFQ list */}
        <div className="mt-4 space-y-3">
          {filteredRFQs.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
              <FileText className="mx-auto text-slate-300" size={34} />
              <p className="mt-3 font-semibold text-slate-800">
                No RFQs found
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Try another search or status filter.
              </p>
            </div>
          ) : (
            filteredRFQs.map((rfq, index) => {
              const margin =
                ((rfq.topOffer.net - rfq.mandiPrice) / rfq.mandiPrice) *
                100;

              return (
                <motion.div
                  key={rfq.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                  className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition hover:border-slate-300 hover:shadow-md"
                >
                  <div className="p-5">
                    <div className="flex flex-col gap-5 xl:flex-row xl:items-center">
                      {/* RFQ identity */}
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-[11px] font-bold text-slate-400">
                            {rfq.id}
                          </span>

                          <StatusBadge status={rfq.status} />

                          {rfq.deadlineType === "urgent" && (
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-red-100 bg-red-50 px-2.5 py-1 text-[11px] font-semibold text-red-700">
                              <Clock3 size={11} />
                              Closing soon
                            </span>
                          )}
                        </div>

                        <div className="mt-3 flex items-start gap-3">
                          <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-700">
                            <Package size={18} />
                          </div>

                          <div>
                            <h2 className="font-bold text-slate-900">
                              {rfq.crop}
                            </h2>

                            <p className="mt-0.5 text-xs text-slate-500">
                              {rfq.variety}
                            </p>

                            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                              <span className="flex items-center gap-1">
                                <Package size={12} />
                                {rfq.quantity} {rfq.unit}
                              </span>

                              <span className="flex items-center gap-1">
                                <MapPin size={12} />
                                {rfq.location}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Target */}
                      <div className="min-w-[150px]">
                        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                          Target price
                        </p>

                        <p className="mt-1 text-lg font-bold text-slate-900">
                          {money(rfq.targetPrice)}
                          <span className="ml-1 text-xs font-medium text-slate-400">
                            /Qtl
                          </span>
                        </p>

                        <p className="mt-1 text-[11px] text-slate-500">
                          Mandi {money(rfq.mandiPrice)}
                        </p>
                      </div>

                      {/* Best offer */}
                      <div className="min-w-[210px] rounded-xl bg-slate-50 p-3.5">
                        <div className="flex items-center justify-between">
                          <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-400">
                            Best landed offer
                          </p>

                          <span
                            className={`text-[11px] font-bold ${
                              margin >= 0
                                ? "text-emerald-700"
                                : "text-red-600"
                            }`}
                          >
                            {margin >= 0 ? "+" : ""}
                            {margin.toFixed(1)}% vs mandi
                          </span>
                        </div>

                        <p className="mt-1 text-xl font-bold text-slate-900">
                          {money(rfq.topOffer.net)}
                          <span className="ml-1 text-xs font-medium text-slate-400">
                            /Qtl
                          </span>
                        </p>

                        <div className="mt-2 flex items-center gap-2 text-[11px] text-slate-500">
                          <BadgeCheck
                            size={13}
                            className="text-emerald-600"
                          />
                          {rfq.topOffer.farmer}
                          <span>·</span>
                          {rfq.offers} offers
                        </div>
                      </div>

                      {/* Deadline */}
                      <div className="min-w-[145px]">
                        <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-400">
                          Deadline
                        </p>

                        <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-slate-800">
                          <CalendarClock size={14} />
                          {rfq.deadline}
                        </p>

                        <p className="mt-1 text-[11px] text-slate-500">
                          {rfq.offers} supplier responses
                        </p>
                      </div>

                      {/* Action */}
                      <button
                        onClick={() => setSelectedRFQ(rfq)}
                        className="flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 text-xs font-semibold text-white transition hover:bg-emerald-700"
                      >
                        Review offers
                        <ArrowUpRight size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50/60 px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-wrap gap-4 text-[11px] text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <Truck size={13} />
                        Destination: {rfq.destination}
                      </span>

                      <span className="flex items-center gap-1.5">
                        <BadgeCheck
                          size={13}
                          className="text-emerald-600"
                        />
                        Quality {rfq.quality}
                      </span>

                      <span>Moisture {rfq.moisture}</span>
                    </div>

                    <span className="text-[10px] font-medium text-slate-400">
                      Created {rfq.created}
                    </span>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </main>

      {/* Review modal */}
      {selectedRFQ && (
        <Modal
          wide
          onClose={() => setSelectedRFQ(null)}
        >
          <div className="border-b border-slate-100 p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-400">
                    {selectedRFQ.id}
                  </span>
                  <StatusBadge status={selectedRFQ.status} />
                </div>

                <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
                  {selectedRFQ.crop}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {selectedRFQ.variety} · {selectedRFQ.quantity}{" "}
                  {selectedRFQ.unit} · {selectedRFQ.destination}
                </p>
              </div>

              <button
                onClick={() => setSelectedRFQ(null)}
                className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={19} />
              </button>
            </div>
          </div>

          <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[1fr_320px]">
            <div>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-slate-900">
                    Supplier offer
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    Compare the landed economics before awarding.
                  </p>
                </div>

                <span className="text-xs font-semibold text-emerald-700">
                  {selectedRFQ.offers} offers received
                </span>
              </div>

              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-sm font-bold text-emerald-700 shadow-sm">
                      {selectedRFQ.topOffer.farmer
                        .split(" ")
                        .map((x) => x[0])
                        .join("")}
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5">
                        <p className="text-sm font-bold text-slate-900">
                          {selectedRFQ.topOffer.farmer}
                        </p>

                        {selectedRFQ.topOffer.verified && (
                          <BadgeCheck
                            size={15}
                            className="text-emerald-600"
                          />
                        )}
                      </div>

                      <p className="mt-0.5 text-xs text-slate-500">
                        Verified farmer · ⭐ {selectedRFQ.topOffer.rating}
                      </p>
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-400">
                      Net realization
                    </p>
                    <p className="mt-1 text-2xl font-bold text-emerald-700">
                      {money(selectedRFQ.topOffer.net)}
                      <span className="text-xs text-slate-400">
                        /Qtl
                      </span>
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {[
                    ["Offer price", money(selectedRFQ.topOffer.price)],
                    ["Freight", money(selectedRFQ.topOffer.freight)],
                    ["Payment", selectedRFQ.topOffer.payment],
                    ["Delivery", selectedRFQ.topOffer.delivery],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-xl border border-white bg-white/80 p-3"
                    >
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                        {label}
                      </p>
                      <p className="mt-1 text-xs font-bold text-slate-800">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Comparison */}
              <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200">
                <div className="border-b border-slate-100 bg-slate-50 px-4 py-3">
                  <p className="text-xs font-bold text-slate-800">
                    Procurement comparison
                  </p>
                </div>

                <div className="divide-y divide-slate-100">
                  {[
                    [
                      "Your target",
                      money(selectedRFQ.targetPrice),
                      "Target procurement price",
                    ],
                    [
                      "Mandi benchmark",
                      money(selectedRFQ.mandiPrice),
                      "Current benchmark",
                    ],
                    [
                      "Supplier offer",
                      money(selectedRFQ.topOffer.price),
                      "Before freight",
                    ],
                    [
                      "Landed cost",
                      money(selectedRFQ.topOffer.net),
                      "After freight",
                    ],
                  ].map(([label, value, note]) => (
                    <div
                      key={label}
                      className="flex items-center justify-between px-4 py-3"
                    >
                      <div>
                        <p className="text-xs font-semibold text-slate-800">
                          {label}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          {note}
                        </p>
                      </div>

                      <p className="text-sm font-bold text-slate-900">
                        {value}/Qtl
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Negotiation timeline */}
              <div className="mt-5">
                <p className="mb-3 text-sm font-bold text-slate-900">
                  Negotiation timeline
                </p>

                <div className="relative space-y-4 pl-7">
                  <div className="absolute bottom-2 left-[7px] top-2 w-px bg-slate-200" />

                  {[
                    ["RFQ created", "22 Sep · 10:20 AM"],
                    ["Supplier submitted offer", "22 Sep · 11:08 AM"],
                    ["Counter offer received", "22 Sep · 12:42 PM"],
                  ].map(([title, time], index) => (
                    <div key={title} className="relative">
                      <div
                        className={`absolute -left-7 top-0.5 flex h-4 w-4 items-center justify-center rounded-full ${
                          index === 2
                            ? "bg-violet-100 text-violet-700"
                            : "bg-emerald-100 text-emerald-700"
                        }`}
                      >
                        <Check size={9} strokeWidth={3} />
                      </div>

                      <p className="text-xs font-semibold text-slate-800">
                        {title}
                      </p>
                      <p className="mt-0.5 text-[11px] text-slate-400">
                        {time}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Side actions */}
            <div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.1em] text-slate-400">
                  Decision
                </p>

                <p className="mt-2 text-sm font-bold text-slate-900">
                  Choose how to proceed
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  The selected action is a frontend demo and will be connected
                  to the procurement backend later.
                </p>

                <div className="mt-4 space-y-2">
                  <button
                    onClick={() =>
                      updateRFQ(
                        selectedRFQ.id,
                        "Awarded",
                        `${selectedRFQ.id} awarded to ${selectedRFQ.topOffer.farmer}.`
                      )
                    }
                    className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 text-sm font-semibold text-white hover:bg-emerald-800"
                  >
                    <Check size={16} />
                    Award offer
                  </button>

                  <button
                    onClick={() => setShowCounter(true)}
                    className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                  >
                    <MessageSquare size={16} />
                    Make counter-offer
                  </button>

                  <button
                    onClick={() =>
                      updateRFQ(
                        selectedRFQ.id,
                        "Offers Received",
                        "Offer declined. Other supplier responses remain available."
                      )
                    }
                    className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-red-100 bg-white text-sm font-semibold text-red-600 hover:bg-red-50"
                  >
                    <XCircle size={16} />
                    Decline offer
                  </button>
                </div>
              </div>

              <div className="mt-3 rounded-2xl border border-slate-200 bg-white p-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck
                    size={17}
                    className="text-emerald-600"
                  />
                  <p className="text-xs font-bold text-slate-800">
                    Escrow & quality protection
                  </p>
                </div>

                <p className="mt-2 text-[11px] leading-5 text-slate-500">
                  Payment can be protected until agreed quality and delivery
                  conditions are verified.
                </p>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Counter offer modal */}
      {showCounter && selectedRFQ && (
        <Modal
          onClose={() => setShowCounter(false)}
        >
          <div className="border-b border-slate-100 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-emerald-700">
                  Negotiation
                </p>
                <h2 className="mt-1 text-xl font-bold text-slate-950">
                  Make counter-offer
                </h2>
              </div>

              <button
                onClick={() => setShowCounter(false)}
                className="rounded-xl p-2 text-slate-400 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          <div className="space-y-4 p-5">
            <div className="rounded-xl bg-slate-50 p-3">
              <p className="text-xs text-slate-500">
                Current supplier offer
              </p>
              <p className="mt-1 text-lg font-bold text-slate-900">
                {money(selectedRFQ.topOffer.price)}
                <span className="text-xs font-medium text-slate-400">
                  /Qtl
                </span>
              </p>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                Your counter price / Qtl
              </label>
              <div className="relative">
                <IndianRupee
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  defaultValue={selectedRFQ.targetPrice}
                  type="number"
                  className="h-11 w-full rounded-xl border border-slate-200 pl-9 pr-3 text-sm font-semibold outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/5"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                Quantity
              </label>
              <input
                defaultValue={selectedRFQ.quantity}
                type="number"
                className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/5"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                Payment terms
              </label>
              <select className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-emerald-400">
                <option>50% upfront · 50% on delivery</option>
                <option>30% upfront · Balance on delivery</option>
                <option>Net 7 days</option>
                <option>100% on delivery</option>
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                Message to supplier
              </label>
              <textarea
                rows={3}
                placeholder="Add quality, delivery or payment requirements..."
                className="w-full resize-none rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/5"
              />
            </div>

            <button
              onClick={() => {
                setShowCounter(false);
                setSelectedRFQ(null);
                showToast("Counter-offer sent to supplier.");
              }}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 text-sm font-semibold text-white hover:bg-emerald-800"
            >
              Send counter-offer
              <ArrowUpRight size={16} />
            </button>
          </div>
        </Modal>
      )}

      {/* Create RFQ */}
      {showCreate && (
        <Modal onClose={() => setShowCreate(false)}>
          <div className="border-b border-slate-100 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-emerald-700">
                  New procurement request
                </p>
                <h2 className="mt-1 text-xl font-bold text-slate-950">
                  Create RFQ
                </h2>
              </div>

              <button
                onClick={() => setShowCreate(false)}
                className="rounded-xl p-2 text-slate-400 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setShowCreate(false);
              showToast("RFQ created successfully.");
            }}
            className="space-y-4 p-5"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                  Commodity
                </label>
                <select className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm">
                  <option>Wheat</option>
                  <option>Basmati Rice</option>
                  <option>Maize</option>
                  <option>Mustard</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                  Variety / grade
                </label>
                <input
                  placeholder="e.g. Premium Grade"
                  className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                  Quantity (Qtl)
                </label>
                <input
                  type="number"
                  placeholder="120"
                  className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                  Target price / Qtl
                </label>
                <input
                  type="number"
                  placeholder="2900"
                  className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-emerald-400"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                Delivery destination
              </label>
              <input
                placeholder="Warehouse / processing plant"
                className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-emerald-400"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                  Minimum quality
                </label>
                <select className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm">
                  <option>Premium · 98%+</option>
                  <option>Standard · 95%+</option>
                  <option>Basic · 90%+</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                  RFQ deadline
                </label>
                <input
                  type="date"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm"
                />
              </div>
            </div>

            <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-3">
              <div className="flex gap-2">
                <Sparkles
                  size={16}
                  className="mt-0.5 shrink-0 text-emerald-700"
                />
                <p className="text-[11px] leading-5 text-slate-600">
                  GreenCart can use your target price, destination, quality
                  requirements and market benchmarks to help compare incoming
                  offers.
                </p>
              </div>
            </div>

            <button
              type="submit"
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 text-sm font-semibold text-white hover:bg-emerald-800"
            >
              <Plus size={17} />
              Publish RFQ
            </button>
          </form>
        </Modal>
      )}

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.97 }}
            className="fixed bottom-5 left-1/2 z-[70] flex -translate-x-1/2 items-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-xs font-semibold text-white shadow-xl"
          >
            <Check size={15} className="text-emerald-400" />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}