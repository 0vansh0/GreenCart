import { motion } from "framer-motion";
import {
  Bell,
  Search,
  Mic,
  Plus,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Wheat,
  ShoppingCart,
  IndianRupee,
  Package,
  TrendingUp,
  Clock3,
  CheckCircle2,
  ChevronRight,
  Calculator,
  Store,
  MapPin,
  MoreHorizontal,
  SlidersHorizontal,
} from "lucide-react";
import { useNavigate } from "react-router";

const marketData = [
  {
    crop: "Wheat",
    location: "Muzaffarpur",
    price: "₹2,760",
    change: "+4.2%",
    positive: true,
  },
  {
    crop: "Rice",
    location: "Patna",
    price: "₹6,210",
    change: "+2.8%",
    positive: true,
  },
  {
    crop: "Maize",
    location: "Purnia",
    price: "₹2,140",
    change: "+1.9%",
    positive: true,
  },
  {
    crop: "Mustard",
    location: "Jaipur",
    price: "₹5,580",
    change: "-0.8%",
    positive: false,
  },
];

const rfqs = [
  {
    buyer: "FreshMart",
    status: "Expires Soon",
    statusType: "danger",
    crop: "Sharbati Wheat",
    quantity: "50 Qtl",
    location: "Patna, Bihar",
    offer: "₹2,920",
    freight: "₹85/Qtl",
    net: "₹2,835",
    payment: "50% upfront",
  },
  {
    buyer: "Bharat Agro",
    status: "Action Needed",
    statusType: "warning",
    crop: "Premium Wheat",
    quantity: "80 Qtl",
    location: "Muzaffarpur, Bihar",
    offer: "₹2,850",
    freight: "₹55/Qtl",
    net: "₹2,795",
    payment: "Net 7 days",
  },
  {
    buyer: "Kisan Supply Co.",
    status: "New",
    statusType: "success",
    crop: "Wheat",
    quantity: "30 Qtl",
    location: "Darbhanga, Bihar",
    offer: "₹2,780",
    freight: "₹70/Qtl",
    net: "₹2,710",
    payment: "100% delivery",
  },
];

const cropLots = [
  {
    crop: "Sharbati Wheat",
    variety: "Premium Grade",
    harvest: "18 Sep 2026",
    quantity: "120 Qtl",
    price: "₹2,850",
    mandi: "₹2,760",
    quality: "98.2%",
    moisture: "11.8%",
    position: "Optimal Selling Time",
    type: "success",
  },
  {
    crop: "Basmati Rice",
    variety: "1121",
    harvest: "15 Sep 2026",
    quantity: "80 Qtl",
    price: "₹6,400",
    mandi: "₹6,210",
    quality: "97.6%",
    moisture: "12.4%",
    position: "Active",
    type: "neutral",
  },
  {
    crop: "Yellow Maize",
    variety: "Hybrid",
    harvest: "12 Sep 2026",
    quantity: "200 Qtl",
    price: "₹2,200",
    mandi: "₹2,140",
    quality: "96.9%",
    moisture: "13.2%",
    position: "Optimal Selling Time",
    type: "success",
  },
  {
    crop: "Mustard",
    variety: "Pusa Bold",
    harvest: "10 Sep 2026",
    quantity: "65 Qtl",
    price: "₹5,750",
    mandi: "₹5,580",
    quality: "98.8%",
    moisture: "8.9%",
    position: "Hold 3–5 Days",
    type: "warning",
  },
];

function AppButton({ children, icon: Icon, ...props }) {
  return (
    <button
      {...props}
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#064E3B] px-4 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#053d2e] hover:shadow-lg"
    >
      {Icon && <Icon size={17} />}
      {children}
    </button>
  );
}

function KPI({ icon: Icon, label, value, change, amber }) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${
            amber
              ? "bg-amber-50 text-amber-600"
              : "bg-emerald-50 text-emerald-700"
          }`}
        >
          <Icon size={19} />
        </div>

        <span
          className={`text-xs font-semibold ${
            amber ? "text-amber-600" : "text-emerald-600"
          }`}
        >
          {change}
        </span>
      </div>

      <p className="mt-5 text-xs font-medium uppercase tracking-wider text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
        {value}
      </p>
    </div>
  );
}

function StatusBadge({ children, type }) {
  const styles = {
    danger: "bg-red-50 text-red-600 border-red-100",
    warning: "bg-amber-50 text-amber-700 border-amber-100",
    success: "bg-emerald-50 text-emerald-700 border-emerald-100",
    neutral: "bg-slate-50 text-slate-600 border-slate-200",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${styles[type]}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          type === "danger"
            ? "bg-red-500"
            : type === "warning"
            ? "bg-amber-500"
            : type === "success"
            ? "bg-emerald-500"
            : "bg-slate-400"
        }`}
      />
      {children}
    </span>
  );
}

export default function FarmerDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900">
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-[1500px] items-center gap-6 px-5 lg:px-8">
          {/* Logo */}
          <button
            onClick={() => navigate("/farmer/dashboard")}
            className="flex shrink-0 items-center gap-2"
          >
            <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl">
              <img src="/Green_cart.png" alt="GreenCart logo" className="h-full w-full object-contain" />
            </div>

            <div className="hidden sm:block">
              <p className="text-[15px] font-bold tracking-tight text-slate-900">
                GreenCart
              </p>
              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-emerald-700">
                Farmer Intelligence
              </p>
            </div>
          </button>

          {/* Date + ticker */}
          <div className="hidden items-center gap-5 xl:flex">
            <div className="h-7 w-px bg-slate-200" />

            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Tuesday · 22 September 2026
              </p>
              <p className="mt-0.5 text-xs font-semibold text-slate-700">
                Wheat / Muzaffarpur
                <span className="ml-2 text-emerald-600">₹2,760 +4.2%</span>
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="relative ml-auto hidden max-w-xs flex-1 lg:block">
            <Search
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              placeholder="Search crops, buyers, offers..."
              className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
            />
          </div>

          {/* Header actions */}
          <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50">
            <Bell size={18} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
          </button>

          <button className="hidden h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 sm:flex">
            <Mic size={18} />
          </button>

          <button onClick={() => navigate("/farmer/profile")} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 transition hover:bg-slate-50">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-xs font-bold text-emerald-800">
              RK
            </div>

            <div className="hidden text-left md:block">
              <p className="text-xs font-bold text-slate-800">Rajesh Kumar</p>
              <p className="text-[10px] text-slate-400">Muzaffarpur</p>
            </div>

            <ChevronRight size={15} className="hidden text-slate-400 md:block" />
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-[1500px] px-5 py-6 lg:px-8">
        {/* HERO */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-slate-200/80 bg-white px-5 py-5 shadow-sm lg:px-7"
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                  Market conditions are favorable
                </span>
              </div>

              <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                Good morning, Rajesh
              </h1>

              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="text-sm text-slate-500">
                  Active produce estimated value
                </span>

                <span className="text-lg font-bold text-slate-900">
                  ₹4.82L
                </span>

                <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-700">
                  +8.4% vs mandi
                </span>
              </div>

              <p className="mt-1 text-xs text-slate-400">
                Wheat demand is rising in your area.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <AppButton
                icon={Plus}
                onClick={() => navigate("/farmer/crop-lot/new")}
              >
                Add Crop Lot
              </AppButton>

              <button
                onClick={() => navigate("/farmer/ai-insights")}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-100"
              >
                <Sparkles size={17} />
                AI Strategy
              </button>
            </div>
          </div>
        </motion.section>

        {/* KPI */}
        <section className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <KPI
            icon={Package}
            label="Active Crop Lots"
            value="12"
            change="+2 this month"
          />

          <KPI
            icon={ShoppingCart}
            label="Buyer RFQs"
            value="5"
            change="3 need response"
            amber
          />

          <KPI
            icon={TrendingUp}
            label="Offers Received"
            value="8"
            change="+3 this week"
          />

          <KPI
            icon={IndianRupee}
            label="Expected Value"
            value="₹4.82L"
            change="+8.4% vs mandi"
          />
        </section>

        {/* MARKET TICKER */}
        <section className="mt-5 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
          <div className="flex items-center gap-5 overflow-x-auto px-5 py-3">
            <div className="flex shrink-0 items-center gap-2 border-r border-slate-200 pr-5">
              <TrendingUp size={16} className="text-emerald-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Mandi benchmark
              </span>
            </div>

            {marketData.map((item) => (
              <div
                key={item.crop}
                className="flex shrink-0 items-center gap-2 border-r border-slate-100 pr-5 last:border-0"
              >
                <span className="text-xs font-semibold text-slate-500">
                  {item.crop}
                  <span className="ml-1 text-slate-400">
                    ({item.location})
                  </span>
                </span>

                <span className="text-sm font-bold text-slate-900">
                  {item.price}
                </span>

                <span
                  className={`text-xs font-bold ${
                    item.positive ? "text-emerald-600" : "text-red-500"
                  }`}
                >
                  {item.change}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* MAIN GRID */}
        <section className="mt-5 grid gap-5 xl:grid-cols-12">
          {/* AI HUB */}
          <div className="space-y-5 xl:col-span-4">
            <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                    <Sparkles size={18} />
                  </div>

                  <div>
                    <h2 className="text-sm font-bold text-slate-900">
                      AI Sell Strategy
                    </h2>
                    <p className="text-[11px] text-slate-400">
                      Updated 8 min ago
                    </p>
                  </div>
                </div>

                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
                  82% confidence
                </span>
              </div>

              <div className="mt-5 rounded-xl bg-emerald-50/70 p-4">
                <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                  Recommendation
                </p>

                <p className="mt-2 text-sm font-semibold leading-6 text-slate-800">
                  Split your wheat sale — sell 30% now to FreshMart and hold
                  70% for the next 5 days.
                </p>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="rounded-xl border border-slate-200 p-3">
                  <p className="text-[10px] text-slate-400">Sell now</p>
                  <p className="mt-1 text-sm font-bold text-slate-900">
                    ₹2,920
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 p-3">
                  <p className="text-[10px] text-slate-400">Forecast</p>
                  <p className="mt-1 text-sm font-bold text-slate-900">
                    ₹3,010
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 p-3">
                  <p className="text-[10px] text-slate-400">Extra value</p>
                  <p className="mt-1 text-sm font-bold text-emerald-600">
                    +₹8.4K
                  </p>
                </div>
              </div>

              <button
                onClick={() => navigate("/farmer/ai-insights")}
                className="mt-4 flex w-full items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
              >
                View full decision analysis
                <ArrowRight size={15} />
              </button>
            </div>

            {/* TOOLS */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Intelligence tools
                </p>
                <h2 className="mt-1 text-lg font-bold text-slate-900">
                  Make better selling decisions
                </h2>
              </div>

              <div className="mt-5 space-y-3">
                <button
                  onClick={() => navigate("/farmer/net-realization")}
                  className="group flex w-full items-center gap-3 rounded-xl border border-slate-200 p-3 text-left transition hover:border-emerald-200 hover:bg-emerald-50/40"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                    <Calculator size={18} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-slate-800">
                      Net Realization Calculator
                    </p>
                    <p className="mt-0.5 text-xs text-slate-400">
                      Compare price after freight & handling
                    </p>
                  </div>

                  <ArrowUpRight
                    size={16}
                    className="text-slate-400 transition group-hover:text-emerald-600"
                  />
                </button>

                <button className="group flex w-full items-center gap-3 rounded-xl border border-slate-200 p-3 text-left transition hover:border-emerald-200 hover:bg-emerald-50/40">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                    <Mic size={18} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-slate-800">
                      Voice Assistant
                    </p>
                    <p className="mt-0.5 text-xs text-slate-400">
                      Ask GreenCart in Hindi or your local language
                    </p>
                  </div>

                  <ArrowUpRight
                    size={16}
                    className="text-slate-400 transition group-hover:text-emerald-600"
                  />
                </button>

                <button className="group flex w-full items-center gap-3 rounded-xl border border-slate-200 p-3 text-left transition hover:border-emerald-200 hover:bg-emerald-50/40">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                    <CheckCircle2 size={18} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-slate-800">
                      Verified Farmer Profile
                    </p>
                    <p className="mt-0.5 text-xs text-slate-400">
                      Farm records & quality verification
                    </p>
                  </div>

                  <ArrowUpRight
                    size={16}
                    className="text-slate-400 transition group-hover:text-emerald-600"
                  />
                </button>
              </div>
            </div>
          </div>

          {/* OPERATIONS */}
          <div className="space-y-5 xl:col-span-8">
            <div className="rounded-2xl border border-slate-200/80 bg-white shadow-sm">
              <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Active operations
                  </p>
                  <h2 className="mt-1 text-lg font-bold text-slate-900">
                    Buyer RFQs
                  </h2>
                </div>

                <button
                  onClick={() => navigate("/farmer/rfqs")}
                  className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800"
                >
                  View all RFQs
                  <ArrowRight size={14} />
                </button>
              </div>

              <div className="divide-y divide-slate-100">
                {rfqs.map((rfq) => (
                  <div key={rfq.buyer} className="p-5">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-sm font-bold text-slate-900">
                            {rfq.buyer}
                          </h3>

                          <span className="text-[10px] font-semibold text-emerald-600">
                            Verified Buyer
                          </span>

                          <StatusBadge type={rfq.statusType}>
                            {rfq.status}
                          </StatusBadge>
                        </div>

                        <p className="mt-2 text-sm font-semibold text-slate-700">
                          {rfq.crop}
                          <span className="mx-2 text-slate-300">·</span>
                          {rfq.quantity}
                          <span className="mx-2 text-slate-300">·</span>
                          {rfq.location}
                        </p>

                        <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-400">
                          <span>{rfq.payment}</span>
                          <span>•</span>
                          <span>Delivery included</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-[10px] uppercase tracking-wider text-slate-400">
                            Offer
                          </p>
                          <p className="text-base font-bold text-slate-900">
                            {rfq.offer}
                          </p>
                        </div>

                        <div className="hidden text-right sm:block">
                          <p className="text-[10px] uppercase tracking-wider text-slate-400">
                            Freight
                          </p>
                          <p className="text-sm font-semibold text-slate-600">
                            {rfq.freight}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-[10px] uppercase tracking-wider text-slate-400">
                            Net
                          </p>
                          <p className="text-base font-bold text-emerald-700">
                            {rfq.net}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <button className="rounded-lg bg-[#064E3B] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#053d2e]">
                        Accept
                      </button>

                      <button
                        onClick={() => navigate("/farmer/rfqs")}
                        className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
                      >
                        Counter
                      </button>

                      <button className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-bold text-slate-500 transition hover:bg-slate-50">
                        Decline
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CROP LOTS */}
            <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
              <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Inventory
                  </p>
                  <h2 className="mt-1 text-lg font-bold text-slate-900">
                    Active Crop Lots
                  </h2>
                </div>

                <div className="flex gap-2">
                  <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600">
                    <SlidersHorizontal size={14} />
                    Filter
                  </button>

                  <button
                    onClick={() => navigate("/farmer/crop-lot/new")}
                    className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700"
                  >
                    <Plus size={14} />
                    New Lot
                  </button>
                </div>
              </div>

              {/* Desktop table */}
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full min-w-[900px]">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/70">
                      {[
                        "Crop / Variety",
                        "Quantity",
                        "Price / Mandi",
                        "Quality",
                        "Market Position",
                        "Quick Action",
                      ].map((heading) => (
                        <th
                          key={heading}
                          className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400"
                        >
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {cropLots.map((lot) => (
                      <tr
                        key={lot.crop}
                        className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50"
                      >
                        <td className="px-5 py-4">
                          <p className="text-sm font-bold text-slate-800">
                            {lot.crop}
                          </p>
                          <p className="mt-0.5 text-[11px] text-slate-400">
                            {lot.variety} · Harvest {lot.harvest}
                          </p>
                        </td>

                        <td className="px-5 py-4 text-sm font-semibold text-slate-700">
                          {lot.quantity}
                        </td>

                        <td className="px-5 py-4">
                          <p className="text-sm font-bold text-slate-800">
                            {lot.price}
                          </p>
                          <p className="mt-0.5 text-[11px] text-slate-400">
                            Mandi {lot.mandi}
                          </p>
                        </td>

                        <td className="px-5 py-4">
                          <p className="text-sm font-bold text-emerald-700">
                            {lot.quality}
                          </p>
                          <p className="mt-0.5 text-[11px] text-slate-400">
                            Moisture {lot.moisture}
                          </p>
                        </td>

                        <td className="px-5 py-4">
                          <StatusBadge type={lot.type}>
                            {lot.position}
                          </StatusBadge>
                        </td>

                        <td className="px-5 py-4">
                          <button className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-900">
                            Manage
                            <ChevronRight size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="divide-y divide-slate-100 md:hidden">
                {cropLots.map((lot) => (
                  <div key={lot.crop} className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          {lot.crop}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          {lot.variety} · {lot.quantity}
                        </p>
                      </div>

                      <MoreHorizontal size={18} className="text-slate-400" />
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div className="rounded-lg bg-slate-50 p-3">
                        <p className="text-[10px] text-slate-400">Price</p>
                        <p className="mt-1 text-sm font-bold">
                          {lot.price}
                        </p>
                      </div>

                      <div className="rounded-lg bg-slate-50 p-3">
                        <p className="text-[10px] text-slate-400">Quality</p>
                        <p className="mt-1 text-sm font-bold text-emerald-700">
                          {lot.quality}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <StatusBadge type={lot.type}>
                        {lot.position}
                      </StatusBadge>

                      <button className="text-xs font-bold text-emerald-700">
                        Manage
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER NOTE */}
        <div className="mt-6 flex flex-col gap-2 border-t border-slate-200 pt-5 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            GreenCart AI provides recommendations based on available market
            signals. Final selling decisions remain with you.
          </p>

          <div className="flex items-center gap-2">
            <CheckCircle2 size={14} className="text-emerald-600" />
            Secure farmer workspace
          </div>
        </div>
      </main>
    </div>
  );
}