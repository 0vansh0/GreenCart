import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

import {
  ArrowRight,
  BarChart3,
  Bell,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileText,
  Heart,
  MapPin,
  Package,
  RefreshCw,
  Search,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Truck,
  TrendingUp,
  UserRound,
  X,
} from "lucide-react";

import BuyerHeader from "../../components/BuyerHeader";
import { useBuyerAuth } from "../../context/BuyerAuthContext";
import { useCart } from "../../context/CartContext";


// ============================================================
// DEMO DATA
// ============================================================

const ORDERS = [
  {
    id: "GC-10482",
    crop: "Premium Sharbati Wheat",
    variety: "Sharbati",
    quantity: "40 Qtl",
    amount: 116800,
    status: "In Transit",
    statusType: "transit",
    location: "Muzaffarpur → Patna",
    date: "24 Sep 2026",
  },
  {
    id: "GC-10471",
    crop: "Basmati Rice 1121",
    variety: "1121",
    quantity: "20 Qtl",
    amount: 128000,
    status: "Quality Check",
    statusType: "quality",
    location: "Patna",
    date: "22 Sep 2026",
  },
  {
    id: "GC-10455",
    crop: "Yellow Maize",
    variety: "Hybrid",
    quantity: "35 Qtl",
    amount: 77000,
    status: "Delivered",
    statusType: "delivered",
    location: "Purnia → Patna",
    date: "18 Sep 2026",
  },
];

const OFFERS = [
  {
    id: "OF-2208",
    crop: "Premium Sharbati Wheat",
    quantity: "50 Qtl",
    farmer: "Rajesh Kumar",
    location: "Muzaffarpur",
    asking: 2920,
    offer: 2820,
    reason: "Bulk order discount",
    status: "Pending",
  },
  {
    id: "OF-2194",
    crop: "Premium Mustard",
    quantity: "20 Qtl",
    farmer: "Kisan Producer Group",
    location: "Jaipur",
    asking: 5750,
    offer: 5600,
    reason: "Price match",
    status: "Countered",
  },
];

const SAVED_PRODUCTS = [
  {
    id: 1,
    name: "Premium Sharbati Wheat",
    location: "Muzaffarpur",
    price: 2920,
    mandi: 2760,
    image:
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 2,
    name: "Basmati Rice 1121",
    location: "Patna",
    price: 6400,
    mandi: 6210,
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=700&q=80",
  },
];


// ============================================================
// MAIN COMPONENT
// ============================================================

export default function BuyerDashboard() {
  const navigate = useNavigate();

  const { user } = useBuyerAuth();
  const { cartCount } = useCart();

  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [showNotifications, setShowNotifications] =
    useState(false);

  const displayName =
    user?.name && user.name !== "Buyer"
      ? user.name
      : "Buyer";

  const firstName =
    displayName.split(" ")[0] || "Buyer";

  const totalProcurement = useMemo(
    () =>
      ORDERS.reduce(
        (sum, order) => sum + order.amount,
        0
      ),
    []
  );

  const pendingOffers = OFFERS.filter(
    (offer) =>
      offer.status === "Pending" ||
      offer.status === "Countered"
  ).length;

  const activeOrders = ORDERS.filter(
    (order) =>
      order.statusType !== "delivered"
  ).length;

  return (
    <div className="min-h-screen bg-[#f7f9f5] text-slate-900">

      {/* ================================================== */}
      {/* HEADER */}
      {/* ================================================== */}

      <div className="mx-auto max-w-[1450px] px-4 sm:px-6 lg:px-8">
        <BuyerHeader
          search={search}
          onSearchChange={setSearch}
        />
      </div>


      {/* ================================================== */}
      {/* MAIN */}
      {/* ================================================== */}

      <main className="mx-auto max-w-[1450px] px-4 pb-16 pt-8 sm:px-6 lg:px-8">

        {/* ================================================== */}
        {/* TOP BAR */}
        {/* ================================================== */}

        <div className="mb-7 flex flex-col justify-between gap-5 md:flex-row md:items-end">

          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />

              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-700">
                Buyer workspace
              </span>
            </div>

            <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Good morning, {firstName}.
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Manage procurement, compare offers and track
              agricultural orders from one place.
            </p>
          </div>

          <div className="flex items-center gap-2">

            <button
              type="button"
              onClick={() =>
                navigate("/marketplace")
              }
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50/40"
            >
              <Search size={15} />

              Browse marketplace
            </button>

            <button
              type="button"
              onClick={() =>
                navigate("/cart")
              }
              className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-[#064E3B] text-white shadow-sm transition hover:bg-[#053D2E] hover:shadow-md"
              title="Cart"
            >
              <ShoppingCart size={17} />

              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-400 px-1 text-[9px] font-bold text-emerald-950">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>


        {/* ================================================== */}
        {/* METRIC CARDS */}
        {/* ================================================== */}

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <MetricCard
            icon={Package}
            label="Active orders"
            value={activeOrders}
            suffix="orders"
            helper="Currently in procurement"
            trend="+2 this month"
          />

          <MetricCard
            icon={FileText}
            label="Pending offers"
            value={pendingOffers}
            suffix="offers"
            helper="Need your attention"
            trend="2 awaiting response"
            warning
          />

          <MetricCard
            icon={BarChart3}
            label="Procurement value"
            value={`₹${formatCompact(
              totalProcurement
            )}`}
            helper="Current order value"
            trend="+8.4% vs last month"
          />

          <MetricCard
            icon={Heart}
            label="Saved products"
            value={SAVED_PRODUCTS.length}
            suffix="items"
            helper="Watchlist"
            trend="2 price changes"
          />

        </div>


        {/* ================================================== */}
        {/* QUICK ACTIONS */}
        {/* ================================================== */}

        <section className="mt-6 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">

          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-slate-900">
                Quick actions
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Common procurement tasks
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

            <QuickAction
              icon={Search}
              title="Find produce"
              description="Browse verified listings"
              onClick={() =>
                navigate("/marketplace")
              }
            />

            <QuickAction
              icon={FileText}
              title="My offers"
              description={`${pendingOffers} need attention`}
              onClick={() =>
                setActiveTab("offers")
              }
            />

            <QuickAction
              icon={Truck}
              title="Track orders"
              description={`${activeOrders} active shipments`}
              onClick={() =>
                setActiveTab("orders")
              }
            />

            <QuickAction
              icon={Heart}
              title="Saved products"
              description="Watch price movement"
              onClick={() =>
                setActiveTab("saved")
              }
            />

          </div>
        </section>


        {/* ================================================== */}
        {/* MAIN GRID */}
        {/* ================================================== */}

        <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_360px]">

          {/* ================================================= */}
          {/* LEFT CONTENT */}
          {/* ================================================= */}

          <div className="min-w-0">

            {/* TAB NAVIGATION */}

            <div className="mb-5 flex items-center gap-1 overflow-x-auto rounded-xl border border-slate-200/80 bg-white p-1.5 shadow-sm">

              {[
                {
                  id: "overview",
                  label: "Overview",
                },
                {
                  id: "orders",
                  label: "Orders",
                },
                {
                  id: "offers",
                  label: "Offers",
                },
                {
                  id: "saved",
                  label: "Saved",
                },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() =>
                    setActiveTab(tab.id)
                  }
                  className={`whitespace-nowrap rounded-lg px-4 py-2.5 text-xs font-semibold transition ${
                    activeTab === tab.id
                      ? "bg-[#064E3B] text-white shadow-sm"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                  }`}
                >
                  {tab.label}
                </button>
              ))}

            </div>


            {/* ================================================= */}
            {/* OVERVIEW */}
            {/* ================================================= */}

            {activeTab === "overview" && (
              <div className="space-y-6">

                {/* AI PROCUREMENT INSIGHT */}

                <section className="relative overflow-hidden rounded-2xl border border-emerald-900/10 bg-[#064E3B] p-6 text-white shadow-sm">

                  <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-emerald-400/10 blur-3xl" />

                  <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                    <div className="max-w-xl">

                      <div className="mb-3 flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                          <Sparkles
                            size={16}
                            className="text-emerald-200"
                          />
                        </div>

                        <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-200">
                          GreenCart Intelligence
                        </span>
                      </div>

                      <h2 className="text-xl font-semibold tracking-tight">
                        Wheat procurement window is active
                      </h2>

                      <p className="mt-2 text-sm leading-6 text-emerald-50/70">
                        Sharbati wheat is currently trading
                        above the Muzaffarpur mandi benchmark.
                        Compare verified farmer offers before
                        placing your next purchase request.
                      </p>

                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        navigate("/marketplace")
                      }
                      className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-xs font-bold text-emerald-900 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
                    >
                      Explore offers

                      <ArrowRight size={15} />
                    </button>

                  </div>
                </section>


                {/* RECENT ORDERS */}

                <DashboardSection
                  title="Recent procurement"
                  description="Your latest GreenCart transactions"
                  action="View all"
                  onAction={() =>
                    setActiveTab("orders")
                  }
                >

                  <div className="overflow-hidden rounded-xl border border-slate-200/80">

                    <div className="hidden grid-cols-[1.5fr_100px_130px_140px] gap-4 bg-slate-50/80 px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 md:grid">
                      <span>Produce</span>
                      <span>Quantity</span>
                      <span>Amount</span>
                      <span>Status</span>
                    </div>

                    {ORDERS.slice(0, 3).map(
                      (order, index) => (
                        <OrderRow
                          key={order.id}
                          order={order}
                          last={
                            index ===
                            Math.min(
                              ORDERS.length,
                              3
                            ) -
                              1
                          }
                          onClick={() =>
                            setActiveTab("orders")
                          }
                        />
                      )
                    )}

                  </div>
                </DashboardSection>


                {/* OFFERS */}

                <DashboardSection
                  title="Offers needing attention"
                  description="Review your active negotiations"
                  action="View all"
                  onAction={() =>
                    setActiveTab("offers")
                  }
                >

                  <div className="grid gap-3 lg:grid-cols-2">

                    {OFFERS.map((offer) => (
                      <OfferCard
                        key={offer.id}
                        offer={offer}
                        onClick={() =>
                          setActiveTab("offers")
                        }
                      />
                    ))}

                  </div>
                </DashboardSection>

              </div>
            )}


            {/* ================================================= */}
            {/* ORDERS */}
            {/* ================================================= */}

            {activeTab === "orders" && (
              <div className="space-y-4">

                <SectionHeading
                  title="My orders"
                  description="Track your current and completed procurement"
                />

                {ORDERS.map((order) => (
                  <OrderLargeCard
                    key={order.id}
                    order={order}
                  />
                ))}

              </div>
            )}


            {/* ================================================= */}
            {/* OFFERS */}
            {/* ================================================= */}

            {activeTab === "offers" && (
              <div className="space-y-4">

                <SectionHeading
                  title="My offers"
                  description="Negotiations and counter offers"
                />

                {OFFERS.map((offer) => (
                  <OfferLargeCard
                    key={offer.id}
                    offer={offer}
                  />
                ))}

              </div>
            )}


            {/* ================================================= */}
            {/* SAVED */}
            {/* ================================================= */}

            {activeTab === "saved" && (
              <div className="space-y-4">

                <SectionHeading
                  title="Saved products"
                  description="Produce you are watching"
                />

                <div className="grid gap-4 sm:grid-cols-2">

                  {SAVED_PRODUCTS.map(
                    (product) => (
                      <SavedProductCard
                        key={product.id}
                        product={product}
                        onClick={() =>
                          navigate(
                            `/product/${product.id}`
                          )
                        }
                      />
                    )
                  )}

                </div>

              </div>
            )}

          </div>


          {/* ================================================= */}
          {/* RIGHT SIDEBAR */}
          {/* ================================================= */}

          <aside className="space-y-5">

            {/* PROFILE */}

            <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">

              <div className="flex items-center gap-3">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-sm font-black text-emerald-800">
                  {getInitials(displayName)}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-slate-900">
                    {displayName}
                  </p>

                  <p className="truncate text-xs text-slate-400">
                    {user?.email ||
                      "Buyer account"}
                  </p>
                </div>

              </div>

              <div className="mt-5 flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2.5">
                <ShieldCheck
                  size={15}
                  className="text-emerald-700"
                />

                <span className="text-[11px] font-semibold text-emerald-800">
                  Verified buyer account
                </span>
              </div>

              <button
                type="button"
                onClick={() =>
                  navigate("/buyer/profile")
                }
                className="mt-4 flex w-full items-center justify-between rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-semibold text-slate-600 transition hover:border-emerald-200 hover:bg-emerald-50/40"
              >
                Manage profile

                <ChevronRight size={14} />
              </button>

            </section>


            {/* MARKET SNAPSHOT */}

            <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm font-bold text-slate-900">
                    Market snapshot
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Selected mandi benchmarks
                  </p>
                </div>

                <TrendingUp
                  size={17}
                  className="text-emerald-600"
                />

              </div>

              <div className="mt-5 space-y-3">

                <MarketRow
                  crop="Wheat"
                  market="Muzaffarpur"
                  price="₹2,760"
                  change="+4.2%"
                  positive
                />

                <MarketRow
                  crop="Rice"
                  market="Patna"
                  price="₹6,210"
                  change="+2.8%"
                  positive
                />

                <MarketRow
                  crop="Maize"
                  market="Purnia"
                  price="₹2,140"
                  change="+1.9%"
                  positive
                />

                <MarketRow
                  crop="Mustard"
                  market="Jaipur"
                  price="₹5,580"
                  change="-0.8%"
                />

              </div>

              <button
                type="button"
                onClick={() =>
                  navigate("/marketplace")
                }
                className="mt-4 flex w-full items-center justify-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
              >
                View marketplace

                <ArrowRight size={13} />
              </button>

            </section>


            {/* PROCUREMENT LOCATION */}

            <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">

              <div className="relative h-32 bg-emerald-950">

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(52,211,153,0.25),transparent_35%),radial-gradient(circle_at_75%_65%,rgba(16,185,129,0.16),transparent_40%)]" />

                <div className="relative flex h-full items-center justify-center">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur">
                    <MapPin size={18} />
                  </div>
                </div>

              </div>

              <div className="p-5">

                <p className="text-sm font-bold text-slate-900">
                  Default delivery
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <MapPin
                    size={14}
                    className="text-emerald-600"
                  />

                  <span className="text-xs font-semibold text-slate-700">
                    Patna, Bihar
                  </span>
                </div>

                <p className="mt-2 text-[11px] leading-5 text-slate-400">
                  Land-to-door estimates and freight
                  calculations will use this location.
                </p>

              </div>

            </section>


            {/* HELP */}

            <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">

              <div className="flex items-start gap-3">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                  <Bell
                    size={16}
                    className="text-slate-600"
                  />
                </div>

                <div>
                  <p className="text-sm font-bold text-slate-900">
                    Procurement updates
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    You will see farmer responses,
                    quality updates and delivery
                    notifications here.
                  </p>
                </div>

              </div>

            </section>

          </aside>

        </div>

      </main>
    </div>
  );
}


// ============================================================
// COMPONENTS
// ============================================================

function MetricCard({
  icon: Icon,
  label,
  value,
  suffix,
  helper,
  trend,
  warning = false,
}) {
  return (
    <motion.div
      whileHover={{
        y: -2,
      }}
      className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex items-start justify-between">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
          <Icon size={17} />
        </div>

        {warning ? (
          <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[9px] font-bold text-amber-700">
            Attention
          </span>
        ) : (
          <span className="rounded-full bg-slate-50 px-2.5 py-1 text-[9px] font-semibold text-slate-400">
            Live
          </span>
        )}

      </div>

      <div className="mt-5">

        <p className="text-[11px] font-semibold text-slate-400">
          {label}
        </p>

        <div className="mt-1 flex items-baseline gap-1.5">

          <p className="text-2xl font-bold tracking-tight text-slate-950">
            {value}
          </p>

          {suffix && (
            <span className="text-[10px] font-medium text-slate-400">
              {suffix}
            </span>
          )}

        </div>

        <div className="mt-2 flex items-center justify-between gap-2">

          <span className="text-[10px] text-slate-400">
            {helper}
          </span>

          <span
            className={`text-[9px] font-bold ${
              warning
                ? "text-amber-600"
                : "text-emerald-600"
            }`}
          >
            {trend}
          </span>

        </div>

      </div>
    </motion.div>
  );
}


function QuickAction({
  icon: Icon,
  title,
  description,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 text-left transition hover:border-emerald-200 hover:bg-emerald-50/30"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-500 transition group-hover:bg-emerald-100 group-hover:text-emerald-700">
        <Icon size={17} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-bold text-slate-800">
          {title}
        </p>

        <p className="mt-0.5 truncate text-[10px] text-slate-400">
          {description}
        </p>
      </div>

      <ChevronRight
        size={14}
        className="text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-emerald-600"
      />
    </button>
  );
}


function DashboardSection({
  title,
  description,
  action,
  onAction,
  children,
}) {
  return (
    <section>

      <div className="mb-4 flex items-end justify-between gap-4">

        <div>
          <h2 className="text-base font-bold text-slate-900">
            {title}
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            {description}
          </p>
        </div>

        {action && (
          <button
            type="button"
            onClick={onAction}
            className="shrink-0 text-[11px] font-bold text-emerald-700 hover:text-emerald-800"
          >
            {action}
          </button>
        )}

      </div>

      {children}

    </section>
  );
}


function OrderRow({
  order,
  last,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`grid w-full gap-3 px-4 py-4 text-left transition hover:bg-slate-50 md:grid-cols-[1.5fr_100px_130px_140px] md:items-center ${
        !last
          ? "border-b border-slate-100"
          : ""
      }`}
    >

      <div className="flex items-center gap-3">

        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
          <Package size={15} />
        </div>

        <div className="min-w-0">
          <p className="truncate text-xs font-bold text-slate-800">
            {order.crop}
          </p>

          <p className="mt-0.5 text-[10px] text-slate-400">
            {order.id} · {order.location}
          </p>
        </div>

      </div>

      <div className="text-[11px] font-semibold text-slate-600">
        {order.quantity}
      </div>

      <div className="text-xs font-bold text-slate-800">
        ₹{order.amount.toLocaleString("en-IN")}
      </div>

      <div>
        <StatusBadge
          status={order.status}
          type={order.statusType}
        />
      </div>

    </button>
  );
}


function OfferCard({
  offer,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-xl border border-slate-200 bg-white p-4 text-left transition hover:border-emerald-200 hover:shadow-sm"
    >

      <div className="flex items-start justify-between gap-3">

        <div className="min-w-0">

          <p className="truncate text-xs font-bold text-slate-800">
            {offer.crop}
          </p>

          <p className="mt-1 text-[10px] text-slate-400">
            {offer.quantity} · {offer.farmer}
          </p>

        </div>

        <span
          className={`shrink-0 rounded-full px-2 py-1 text-[9px] font-bold ${
            offer.status === "Countered"
              ? "bg-amber-50 text-amber-700"
              : "bg-emerald-50 text-emerald-700"
          }`}
        >
          {offer.status}
        </span>

      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">

        <div className="rounded-lg bg-slate-50 p-2.5">
          <p className="text-[9px] text-slate-400">
            Farmer asks
          </p>

          <p className="mt-1 text-xs font-bold text-slate-700">
            ₹{offer.asking.toLocaleString("en-IN")}
          </p>
        </div>

        <div className="rounded-lg bg-emerald-50 p-2.5">
          <p className="text-[9px] text-emerald-600">
            Your offer
          </p>

          <p className="mt-1 text-xs font-bold text-emerald-800">
            ₹{offer.offer.toLocaleString("en-IN")}
          </p>
        </div>

      </div>

      <div className="mt-3 flex items-center gap-1.5 text-[10px] text-slate-400">
        <RefreshCw size={11} />

        {offer.reason}
      </div>

    </button>
  );
}


function OrderLargeCard({
  order,
}) {
  return (
    <motion.div
      whileHover={{
        y: -1,
      }}
      className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm"
    >

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">

        <div className="flex gap-3">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
            <Package size={18} />
          </div>

          <div>
            <p className="text-sm font-bold text-slate-900">
              {order.crop}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Order {order.id}
            </p>
          </div>

        </div>

        <StatusBadge
          status={order.status}
          type={order.statusType}
        />

      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-4">

        <DetailItem
          label="Quantity"
          value={order.quantity}
        />

        <DetailItem
          label="Order value"
          value={`₹${order.amount.toLocaleString(
            "en-IN"
          )}`}
        />

        <DetailItem
          label="Location"
          value={order.location}
        />

        <DetailItem
          label="Order date"
          value={order.date}
        />

      </div>

      <div className="mt-5 rounded-xl bg-slate-50 p-4">

        <div className="flex items-center justify-between">

          <span className="text-[10px] font-semibold text-slate-400">
            Procurement progress
          </span>

          <span className="text-[10px] font-bold text-emerald-700">
            {getOrderProgress(order.statusType)}%
          </span>

        </div>

        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-emerald-600 transition-all"
            style={{
              width: `${getOrderProgress(
                order.statusType
              )}%`,
            }}
          />
        </div>

        <div className="mt-3 flex items-center justify-between text-[9px] text-slate-400">
          <span>Request</span>
          <span>Confirmed</span>
          <span>Quality</span>
          <span>Transit</span>
          <span>Delivered</span>
        </div>

      </div>

    </motion.div>
  );
}


function OfferLargeCard({
  offer,
}) {
  return (
    <motion.div
      whileHover={{
        y: -1,
      }}
      className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm"
    >

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">

        <div>
          <p className="text-sm font-bold text-slate-900">
            {offer.crop}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            {offer.id} · {offer.farmer}
          </p>
        </div>

        <span
          className={`w-fit rounded-full px-3 py-1 text-[9px] font-bold ${
            offer.status === "Countered"
              ? "bg-amber-50 text-amber-700"
              : "bg-emerald-50 text-emerald-700"
          }`}
        >
          {offer.status}
        </span>

      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-4">

        <DetailItem
          label="Quantity"
          value={offer.quantity}
        />

        <DetailItem
          label="Farmer asks"
          value={`₹${offer.asking.toLocaleString(
            "en-IN"
          )}/Qtl`}
        />

        <DetailItem
          label="Your offer"
          value={`₹${offer.offer.toLocaleString(
            "en-IN"
          )}/Qtl`}
          green
        />

        <DetailItem
          label="Reason"
          value={offer.reason}
        />

      </div>

      <div className="mt-5 flex flex-wrap gap-2">

        <button
          type="button"
          className="rounded-xl bg-[#064E3B] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#053D2E]"
        >
          Review offer
        </button>

        <button
          type="button"
          className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
        >
          Message farmer
        </button>

      </div>

    </motion.div>
  );
}


function SavedProductCard({
  product,
  onClick,
}) {
  const difference =
    ((product.price - product.mandi) /
      product.mandi) *
    100;

  return (
    <button
      type="button"
      onClick={onClick}
      className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >

      <div className="relative h-48 overflow-hidden">

        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-white/20 bg-white/85 px-2.5 py-1.5 text-[9px] font-bold text-emerald-800 shadow-sm backdrop-blur">
          <Heart
            size={11}
            fill="currentColor"
          />

          Saved
        </div>

      </div>

      <div className="p-4">

        <p className="text-sm font-bold text-slate-900">
          {product.name}
        </p>

        <div className="mt-1 flex items-center gap-1.5 text-[10px] text-slate-400">
          <MapPin size={11} />

          {product.location}
        </div>

        <div className="mt-4 flex items-end justify-between">

          <div>
            <p className="text-lg font-bold text-slate-950">
              ₹{product.price.toLocaleString(
                "en-IN"
              )}
            </p>

            <p className="text-[9px] text-slate-400">
              Asking / Qtl
            </p>
          </div>

          <span className="rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-bold text-emerald-700">
            +{difference.toFixed(1)}% mandi
          </span>

        </div>

      </div>

    </button>
  );
}


function MarketRow({
  crop,
  market,
  price,
  change,
  positive = false,
}) {
  return (
    <div className="flex items-center justify-between gap-3">

      <div>
        <p className="text-xs font-bold text-slate-700">
          {crop}
        </p>

        <p className="mt-0.5 text-[9px] text-slate-400">
          {market}
        </p>
      </div>

      <div className="text-right">

        <p className="text-xs font-bold text-slate-800">
          {price}
        </p>

        <p
          className={`mt-0.5 text-[9px] font-bold ${
            positive
              ? "text-emerald-600"
              : "text-red-500"
          }`}
        >
          {change}
        </p>

      </div>

    </div>
  );
}


function StatusBadge({
  status,
  type,
}) {
  const styles = {
    transit:
      "bg-blue-50 text-blue-700",
    quality:
      "bg-amber-50 text-amber-700",
    delivered:
      "bg-emerald-50 text-emerald-700",
  };

  const icons = {
    transit: Truck,
    quality: ShieldCheck,
    delivered: CheckCircle2,
  };

  const Icon =
    icons[type] || Clock3;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[9px] font-bold ${
        styles[type] ||
        "bg-slate-50 text-slate-600"
      }`}
    >
      <Icon size={11} />

      {status}
    </span>
  );
}


function DetailItem({
  label,
  value,
  green = false,
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">

      <p className="text-[9px] font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p
        className={`mt-1 text-xs font-bold ${
          green
            ? "text-emerald-700"
            : "text-slate-700"
        }`}
      >
        {value}
      </p>

    </div>
  );
}


function SectionHeading({
  title,
  description,
}) {
  return (
    <div>
      <h2 className="text-xl font-bold tracking-tight text-slate-950">
        {title}
      </h2>

      <p className="mt-1 text-sm text-slate-400">
        {description}
      </p>
    </div>
  );
}


// ============================================================
// HELPERS
// ============================================================

function getInitials(name = "") {
  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (!parts.length) {
    return "B";
  }

  return parts
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}


function formatCompact(number) {
  if (number >= 10000000) {
    return `${(number / 10000000).toFixed(1)}Cr`;
  }

  if (number >= 100000) {
    return `${(number / 100000).toFixed(1)}L`;
  }

  if (number >= 1000) {
    return `${(number / 1000).toFixed(1)}K`;
  }

  return number.toLocaleString("en-IN");
}


function getOrderProgress(type) {
  if (type === "delivered") {
    return 100;
  }

  if (type === "transit") {
    return 78;
  }

  if (type === "quality") {
    return 58;
  }

  return 25;
}