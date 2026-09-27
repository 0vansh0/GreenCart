import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Leaf,
  MapPin,
  Package,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Truck,
  Users,
  X,
} from "lucide-react";
import { Link } from "react-router";

const strategies = [
  {
    id: "split",
    title: "Split Sale",
    badge: "Recommended",
    confidence: "82%",
    description:
      "Sell part of your wheat now and hold the remaining quantity for the expected price movement.",
    action: "Sell 30% now",
    hold: "Hold 70% for 5 days",
    current: "₹2,920 / Qtl",
    forecast: "₹3,010 / Qtl",
    extra: "+₹8.4K",
    tone: "emerald",
  },
  {
    id: "sell",
    title: "Sell Now",
    badge: "Low Risk",
    confidence: "91%",
    description:
      "Lock the current buyer offer and reduce exposure to short-term market movement.",
    action: "Sell 100% now",
    hold: "No holding period",
    current: "₹2,920 / Qtl",
    forecast: "₹2,920 / Qtl",
    extra: "₹0",
    tone: "slate",
  },
  {
    id: "hold",
    title: "Hold",
    badge: "Higher Upside",
    confidence: "68%",
    description:
      "Hold the crop temporarily based on current demand and local price signals.",
    action: "Hold 100%",
    hold: "Review in 5 days",
    current: "₹2,920 / Qtl",
    forecast: "₹3,010 / Qtl",
    extra: "+₹10.8K",
    tone: "amber",
  },
];

const rfqs = [
  {
    buyer: "FreshMart Foods",
    verified: true,
    urgency: "Expires Soon",
    crop: "Sharbati Wheat",
    quantity: "50 Qtl",
    location: "Patna, Bihar",
    offer: "₹2,920",
    freight: "₹85",
    net: "₹2,835",
    payment: "50% upfront",
    delivery: "Delivery included",
  },
  {
    buyer: "Bharat Agro",
    verified: true,
    urgency: "Action Needed",
    crop: "Premium Wheat",
    quantity: "80 Qtl",
    location: "Muzaffarpur, Bihar",
    offer: "₹2,850",
    freight: "₹55",
    net: "₹2,795",
    payment: "Net 7 days",
    delivery: "Delivery included",
  },
  {
    buyer: "Kisan Supply Co.",
    verified: false,
    urgency: "New",
    crop: "Wheat",
    quantity: "30 Qtl",
    location: "Darbhanga, Bihar",
    offer: "₹2,780",
    freight: "₹70",
    net: "₹2,710",
    payment: "100% delivery",
    delivery: "Delivery included",
  },
];

const mandiPrices = [
  {
    crop: "Wheat",
    market: "Muzaffarpur",
    price: "₹2,760",
    change: "+4.2%",
    positive: true,
  },
  {
    crop: "Rice",
    market: "Patna",
    price: "₹6,210",
    change: "+2.8%",
    positive: true,
  },
  {
    crop: "Maize",
    market: "Purnia",
    price: "₹2,140",
    change: "+1.9%",
    positive: true,
  },
  {
    crop: "Mustard",
    market: "Jaipur",
    price: "₹5,580",
    change: "-0.8%",
    positive: false,
  },
];

function AIInsights() {
  const selectedStrategy = strategies[0];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-[1500px] items-center justify-between gap-6 px-5 sm:px-8">
          <div className="flex min-w-0 items-center gap-4">
            <Link
              to="/farmer/dashboard"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
            >
              <ArrowLeft size={16} />
            </Link>

            <div className="min-w-0">
              <p className="truncate text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-700">
                GreenCart Intelligence
              </p>

              <h1 className="truncate text-sm font-semibold text-slate-900">
                AI Market Insights
              </h1>
            </div>
          </div>

          <div className="hidden items-center gap-2 text-xs text-slate-400 sm:flex">
            <CalendarDays size={14} />
            Tuesday · 22 September 2026
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 md:flex">
              <MapPin size={14} className="text-slate-400" />
              <span className="text-xs font-medium text-slate-600">
                Muzaffarpur
              </span>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-900 text-xs font-bold text-white">
              RK
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1500px] px-5 py-7 sm:px-8 lg:py-9">
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-7 flex flex-col justify-between gap-5 lg:flex-row lg:items-end"
        >
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800">
              <Sparkles size={13} />
              AI decision engine
            </div>

            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
              What should you do with your wheat?
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              GreenCart combines current mandi prices, buyer offers, demand
              signals, freight and expected price movement to show possible
              selling strategies.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <ShieldCheck size={17} className="text-emerald-700" />

            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Decision principle
              </p>
              <p className="text-xs font-semibold text-slate-700">
                AI recommends · Farmer decides
              </p>
            </div>
          </div>
        </motion.div>

        {/* Crop context */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mb-6 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm"
        >
          <div className="grid grid-cols-2 divide-x divide-slate-100 lg:grid-cols-5">
            <ContextItem
              icon={Leaf}
              label="Crop"
              value="Sharbati Wheat"
            />

            <ContextItem
              icon={Package}
              label="Available"
              value="120 Qtl"
            />

            <ContextItem
              icon={CircleDollarSign}
              label="Current Mandi"
              value="₹2,760 / Qtl"
              accent
            />

            <ContextItem
              icon={Users}
              label="Buyer Offers"
              value="5 active"
            />

            <ContextItem
              icon={TrendingUp}
              label="Demand Signal"
              value="Rising"
              positive
            />
          </div>
        </motion.section>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          {/* LEFT */}
          <div className="space-y-6">
            {/* Main recommendation */}
            <motion.section
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="overflow-hidden rounded-2xl border border-emerald-900/10 bg-emerald-950 text-white shadow-sm"
            >
              <div className="border-b border-white/10 p-6 sm:p-7">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-300">
                        <Sparkles size={18} />
                      </div>

                      <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
                        AI recommendation
                      </span>
                    </div>

                    <h3 className="text-2xl font-semibold tracking-tight">
                      Split your wheat sale
                    </h3>
                  </div>

                  <div className="rounded-xl border border-emerald-300/20 bg-emerald-400/10 px-3 py-2 text-right">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
                      Confidence
                    </p>
                    <p className="mt-0.5 text-lg font-bold text-white">
                      82%
                    </p>
                  </div>
                </div>

                <p className="mt-5 max-w-2xl text-sm leading-6 text-emerald-100/75">
                  Sell 30% now to FreshMart Foods and hold the remaining 70%
                  for approximately 5 days. Current buyer demand and local
                  price movement support this split strategy.
                </p>
              </div>

              <div className="grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                <RecommendationMetric
                  label="Sell now"
                  value="₹2,920"
                  suffix="/ Qtl"
                />

                <RecommendationMetric
                  label="Forecast"
                  value="₹3,010"
                  suffix="/ Qtl"
                  positive
                />

                <RecommendationMetric
                  label="Estimated extra value"
                  value="+₹8.4K"
                  positive
                />
              </div>

              <div className="flex flex-col gap-3 border-t border-white/10 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2 text-xs text-emerald-100/60">
                  <Clock3 size={14} />
                  Suggested review window: 5 days
                </div>

                <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-xs font-bold text-emerald-950 transition hover:bg-emerald-50">
                  View decision analysis
                  <ArrowRight size={14} />
                </button>
              </div>
            </motion.section>

            {/* Strategy comparison */}
            <motion.section
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm"
            >
              <div className="mb-5 flex items-end justify-between gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">
                    Compare selling strategies
                  </h3>

                  <p className="mt-1 text-xs text-slate-400">
                    Different options based on current market signals.
                  </p>
                </div>

                <BarChart3
                  size={18}
                  className="text-slate-400"
                />
              </div>

              <div className="space-y-3">
                {strategies.map((strategy, index) => (
                  <StrategyCard
                    key={strategy.id}
                    strategy={strategy}
                    active={index === 0}
                  />
                ))}
              </div>
            </motion.section>

            {/* Market signals */}
            <motion.section
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm"
            >
              <div className="mb-5">
                <h3 className="text-sm font-semibold text-slate-900">
                  Market signals used
                </h3>

                <p className="mt-1 text-xs text-slate-400">
                  Factors currently influencing the recommendation.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Signal
                  title="Local demand"
                  value="Rising"
                  detail="+12% buyer activity"
                  icon={TrendingUp}
                />

                <Signal
                  title="Mandi price"
                  value="₹2,760"
                  detail="+4.2% this week"
                  icon={CircleDollarSign}
                />

                <Signal
                  title="Buyer competition"
                  value="5 active offers"
                  detail="3 verified buyers"
                  icon={Users}
                />

                <Signal
                  title="Freight"
                  value="₹55–₹85"
                  detail="Depending on buyer"
                  icon={Truck}
                />
              </div>
            </motion.section>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            {/* Buyer opportunity */}
            <motion.section
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
              className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm"
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                      <Users size={16} />
                    </span>

                    <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                      Best current opportunity
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-slate-900">
                    FreshMart Foods
                  </h3>

                  <p className="mt-1 text-xs text-slate-400">
                    Verified buyer · Patna, Bihar
                  </p>
                </div>

                <CheckCircle2
                  size={19}
                  className="text-emerald-600"
                />
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="grid grid-cols-2 gap-4">
                  <SmallMetric
                    label="Offer"
                    value="₹2,920 / Qtl"
                  />

                  <SmallMetric
                    label="Freight"
                    value="₹85 / Qtl"
                  />

                  <SmallMetric
                    label="Net realization"
                    value="₹2,835 / Qtl"
                    positive
                  />

                  <SmallMetric
                    label="Payment"
                    value="50% upfront"
                  />
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs">
                <span className="text-slate-400">
                  50 Qtl requested
                </span>

                <span className="font-semibold text-red-600">
                  Expires in 2h 18m
                </span>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2">
                <button className="rounded-lg bg-emerald-900 px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-emerald-800">
                  Accept
                </button>

                <button className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50">
                  Counter
                </button>

                <button className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-500 transition hover:bg-slate-50">
                  Decline
                </button>
              </div>
            </motion.section>

            {/* RFQ list */}
            <motion.section
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.17 }}
              className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm"
            >
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">
                    Buyer opportunities
                  </h3>

                  <p className="mt-1 text-xs text-slate-400">
                    Offers relevant to your current crop lot.
                  </p>
                </div>

                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-500">
                  {rfqs.length} OFFERS
                </span>
              </div>

              <div className="space-y-3">
                {rfqs.map((rfq) => (
                  <RFQItem key={rfq.buyer} rfq={rfq} />
                ))}
              </div>
            </motion.section>

            {/* Decision explanation */}
            <motion.section
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22 }}
              className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                  <Sparkles size={17} />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-900">
                    Why this recommendation?
                  </h3>

                  <p className="text-xs text-slate-400">
                    Transparent decision support
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <Reason
                  number="01"
                  title="Price movement"
                  text="Local wheat prices have increased over the recent observation period."
                />

                <Reason
                  number="02"
                  title="Buyer demand"
                  text="Multiple active RFQs create an opportunity to secure part of the crop now."
                />

                <Reason
                  number="03"
                  title="Risk balance"
                  text="Splitting the sale reduces dependence on a single future price outcome."
                />
              </div>

              <div className="mt-5 border-t border-slate-100 pt-4">
                <p className="text-[11px] leading-5 text-slate-400">
                  Forecasts are estimates based on available market signals
                  and should not be treated as guaranteed prices.
                </p>
              </div>
            </motion.section>
          </div>
        </div>

        {/* Mandi ticker */}
        <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
          <div className="flex items-center gap-5 overflow-x-auto px-5 py-3.5">
            <div className="flex shrink-0 items-center gap-2 border-r border-slate-200 pr-5">
              <CircleDollarSign
                size={15}
                className="text-emerald-700"
              />
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Mandi prices
              </span>
            </div>

            {mandiPrices.map((item) => (
              <div
                key={`${item.crop}-${item.market}`}
                className="flex shrink-0 items-center gap-3"
              >
                <div>
                  <p className="text-xs font-semibold text-slate-700">
                    {item.crop}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    {item.market}
                  </p>
                </div>

                <span className="text-xs font-bold text-slate-900">
                  {item.price}
                </span>

                <span
                  className={`text-[10px] font-bold ${
                    item.positive
                      ? "text-emerald-600"
                      : "text-red-500"
                  }`}
                >
                  {item.change}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Footer principle */}
        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-400">
          <ShieldCheck size={14} className="text-emerald-700" />
          GreenCart provides decision support. Final selling decisions remain
          with the farmer.
        </div>
      </main>
    </div>
  );
}

/* ------------------------------------------------ */
/* Components                                      */
/* ------------------------------------------------ */

function ContextItem({
  icon: Icon,
  label,
  value,
  accent = false,
  positive = false,
}) {
  return (
    <div className="p-4 sm:p-5">
      <div className="mb-2 flex items-center gap-2">
        <Icon size={14} className="text-slate-400" />

        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          {label}
        </span>
      </div>

      <p
        className={`text-sm font-bold ${
          accent
            ? "text-emerald-700"
            : positive
              ? "text-emerald-600"
              : "text-slate-800"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function RecommendationMetric({
  label,
  value,
  suffix,
  positive = false,
}) {
  return (
    <div className="p-5">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-200/50">
        {label}
      </p>

      <p
        className={`mt-2 text-xl font-bold ${
          positive ? "text-emerald-300" : "text-white"
        }`}
      >
        {value}
        {suffix && (
          <span className="ml-1 text-xs font-medium text-emerald-100/50">
            {suffix}
          </span>
        )}
      </p>
    </div>
  );
}

function StrategyCard({ strategy, active }) {
  return (
    <div
      className={`rounded-xl border p-4 transition ${
        active
          ? "border-emerald-200 bg-emerald-50/60"
          : "border-slate-200 bg-white hover:border-slate-300"
      }`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <div
            className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
              active
                ? "bg-emerald-100 text-emerald-700"
                : "bg-slate-100 text-slate-500"
            }`}
          >
            {active ? (
              <CheckCircle2 size={16} />
            ) : (
              <TrendingUp size={16} />
            )}
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="text-sm font-semibold text-slate-900">
                {strategy.title}
              </h4>

              <span
                className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide ${
                  active
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {strategy.badge}
              </span>
            </div>

            <p className="mt-1 max-w-xl text-xs leading-5 text-slate-400">
              {strategy.description}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center justify-between gap-5 sm:justify-end">
          <div>
            <p className="text-[10px] text-slate-400">
              Confidence
            </p>

            <p className="mt-1 text-sm font-bold text-slate-700">
              {strategy.confidence}
            </p>
          </div>

          <div className="text-right">
            <p className="text-[10px] text-slate-400">
              Forecast
            </p>

            <p className="mt-1 text-sm font-bold text-slate-900">
              {strategy.forecast}
            </p>
          </div>

          <ChevronRight
            size={16}
            className="text-slate-300"
          />
        </div>
      </div>
    </div>
  );
}

function Signal({
  title,
  value,
  detail,
  icon: Icon,
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/70 p-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-emerald-700 shadow-sm">
        <Icon size={16} />
      </div>

      <div className="min-w-0">
        <p className="text-xs font-semibold text-slate-800">
          {title}
        </p>

        <div className="mt-1 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-emerald-700">
            {value}
          </span>

          <span className="text-[10px] text-slate-400">
            {detail}
          </span>
        </div>
      </div>
    </div>
  );
}

function SmallMetric({
  label,
  value,
  positive = false,
}) {
  return (
    <div>
      <p className="text-[10px] text-slate-400">
        {label}
      </p>

      <p
        className={`mt-1 text-xs font-bold ${
          positive ? "text-emerald-700" : "text-slate-800"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function RFQItem({ rfq }) {
  const urgencyClass =
    rfq.urgency === "Expires Soon"
      ? "bg-red-50 text-red-600"
      : rfq.urgency === "Action Needed"
        ? "bg-amber-50 text-amber-700"
        : "bg-emerald-50 text-emerald-700";

  return (
    <div className="rounded-xl border border-slate-200 p-4 transition hover:border-slate-300 hover:shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="text-xs font-semibold text-slate-900">
              {rfq.buyer}
            </h4>

            {rfq.verified && (
              <CheckCircle2
                size={13}
                className="text-emerald-600"
              />
            )}
          </div>

          <p className="mt-1 text-[10px] text-slate-400">
            {rfq.crop} · {rfq.quantity} · {rfq.location}
          </p>
        </div>

        <span
          className={`shrink-0 rounded-full px-2 py-1 text-[9px] font-bold ${
            urgencyClass
          }`}
        >
          {rfq.urgency}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3 border-t border-slate-100 pt-3">
        <SmallMetric
          label="Offer"
          value={`${rfq.offer}`}
        />

        <SmallMetric
          label="Freight"
          value={`${rfq.freight}/Qtl`}
        />

        <SmallMetric
          label="Net"
          value={`${rfq.net}/Qtl`}
          positive
        />
      </div>

      <div className="mt-3 flex items-center justify-between">
        <span className="text-[10px] text-slate-400">
          {rfq.payment}
        </span>

        <button className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 hover:text-emerald-900">
          Review
          <ChevronRight size={12} />
        </button>
      </div>
    </div>
  );
}

function Reason({ number, title, text }) {
  return (
    <div className="flex gap-3">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-[10px] font-bold text-slate-500">
        {number}
      </span>

      <div>
        <p className="text-xs font-semibold text-slate-800">
          {title}
        </p>

        <p className="mt-1 text-xs leading-5 text-slate-400">
          {text}
        </p>
      </div>
    </div>
  );
}

export default AIInsights;