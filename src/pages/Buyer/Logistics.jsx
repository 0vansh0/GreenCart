import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import {
  ArrowRight,
  BarChart3,
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
    asking: 2920,
    offer: 2820,
    status: "Pending",
  },
  {
    id: "OF-2194",
    crop: "Premium Mustard",
    quantity: "20 Qtl",
    farmer: "Kisan Producer Group",
    asking: 5750,
    offer: 5600,
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
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 2,
    name: "Basmati Rice 1121",
    location: "Patna",
    price: 6400,
    mandi: 6210,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=700&q=80",
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

  const displayName = user?.name && user.name !== "Buyer" ? user.name : "Buyer";
  const firstName = displayName.split(" ")[0] || "Buyer";

  const totalProcurement = useMemo(
    () => ORDERS.reduce((sum, order) => sum + order.amount, 0),
    []
  );

  const pendingOffers = OFFERS.filter(
    (o) => o.status === "Pending" || o.status === "Countered"
  ).length;

  const activeOrders = ORDERS.filter((o) => o.statusType !== "delivered").length;

  return (
    <div className="min-h-screen bg-[#F8FAF7] text-[#172117]">
      <BuyerHeader search={search} onSearchChange={setSearch} />

      <main className="mx-auto max-w-[1380px] px-5 py-7 lg:px-8">
        {/* HEADER WELCOME & QUICK ACTIONS */}
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="inline-flex rounded-full bg-[#E8F5E9] px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-[#2E7D32]">
              Buyer Workspace
            </span>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-[#172117] lg:text-[34px]">
              Welcome back, {firstName}
            </h1>
            <p className="mt-1 text-xs font-medium text-[#7A8A78]">
              Manage your active agricultural procurement, offers, and shipments in one place.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => navigate("/marketplace")}
              className="inline-flex h-11 items-center gap-2 rounded-2xl border border-[#E2E8DF] bg-white px-4 text-xs font-bold text-[#3D493D] shadow-sm transition hover:border-[#2E7D32] hover:bg-[#F4F9F4] hover:text-[#2E7D32]"
            >
              <Search size={15} />
              Browse Marketplace
            </button>

            <button
              onClick={() => navigate("/cart")}
              className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-[#2E7D32] text-white shadow-md shadow-[#2E7D32]/20 transition hover:bg-[#1B5E20]"
              title="Cart"
            >
              <ShoppingCart size={17} />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-400 px-1 text-[10px] font-bold text-amber-950">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* METRIC CARDS */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            icon={Package}
            label="Active Orders"
            value={activeOrders}
            helper="Currently in transit/processing"
          />
          <MetricCard
            icon={FileText}
            label="Pending Offers"
            value={pendingOffers}
            helper="Awaiting farmer response"
            warning={pendingOffers > 0}
          />
          <MetricCard
            icon={BarChart3}
            label="Total Invested"
            value={`₹${formatCompact(totalProcurement)}`}
            helper="All-time procurement value"
          />
          <MetricCard
            icon={Heart}
            label="Saved Produce"
            value={SAVED_PRODUCTS.length}
            helper="Watchlist items"
          />
        </div>

        {/* MAIN LAYOUT */}
        <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_380px] items-start">
          {/* LEFT COLUMN: TABS & CONTENT */}
          <div className="space-y-6">
            {/* CLEAN TAB NAVIGATION */}
            <div className="flex items-center gap-1.5 overflow-x-auto rounded-2xl border border-[#E2E8DF] bg-white p-1.5 shadow-sm">
              {[
                { id: "overview", label: "Overview" },
                { id: "orders", label: "Orders" },
                { id: "offers", label: "Offers" },
                { id: "saved", label: "Saved Items" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`whitespace-nowrap rounded-xl px-5 py-2.5 text-xs font-bold transition ${
                    activeTab === tab.id
                      ? "bg-[#2E7D32] text-white shadow-sm"
                      : "text-[#5F6E5E] hover:bg-[#F8FAF7] hover:text-[#172117]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* OVERVIEW TAB */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* AI / MARKET BANNER */}
                <div className="relative overflow-hidden rounded-[28px] bg-[#172117] p-6 sm:p-8 text-white shadow-sm">
                  <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="mb-2 flex items-center gap-2 text-emerald-400">
                        <Sparkles size={16} />
                        <span className="text-[10px] font-extrabold uppercase tracking-wider">
                          GreenCart Market Intelligence
                        </span>
                      </div>
                      <h2 className="text-xl font-extrabold tracking-tight">
                        Sharbati Wheat Window is Active
                      </h2>
                      <p className="mt-1 text-xs leading-relaxed text-[#7A8A78]">
                        Prices in Muzaffarpur are stabilizing. Review verified farmer quotes to lock in optimal bulk rates.
                      </p>
                    </div>
                    <button
                      onClick={() => navigate("/marketplace")}
                      className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-[#2E7D32] px-5 py-3 text-xs font-extrabold text-white shadow-md transition hover:bg-[#1B5E20]"
                    >
                      Explore Market
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </div>

                {/* RECENT ORDERS PREVIEW */}
                <SectionBox title="Recent Orders" action="View all" onAction={() => setActiveTab("orders")}>
                  <div className="space-y-3">
                    {ORDERS.slice(0, 2).map((order) => (
                      <div
                        key={order.id}
                        onClick={() => setActiveTab("orders")}
                        className="flex items-center justify-between rounded-2xl border border-[#E2E8DF] bg-white p-4 shadow-sm cursor-pointer transition hover:border-[#2E7D32]"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F5E9] text-[#2E7D32]">
                            <Package size={18} />
                          </div>
                          <div>
                            <p className="text-xs font-extrabold text-[#172117]">{order.crop}</p>
                            <p className="text-[11px] text-[#7A8A78]">{order.id} · {order.quantity}</p>
                          </div>
                        </div>
                        <StatusBadge status={order.status} type={order.statusType} />
                      </div>
                    ))}
                  </div>
                </SectionBox>

                {/* ACTIVE OFFERS PREVIEW */}
                <SectionBox title="Active Negotiations" action="View all" onAction={() => setActiveTab("offers")}>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {OFFERS.map((offer) => (
                      <div
                        key={offer.id}
                        onClick={() => setActiveTab("offers")}
                        className="rounded-2xl border border-[#E2E8DF] bg-white p-4 shadow-sm cursor-pointer transition hover:border-[#2E7D32]"
                      >
                        <div className="flex items-start justify-between">
                          <p className="text-xs font-extrabold text-[#172117]">{offer.crop}</p>
                          <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-[9px] font-bold text-amber-800 border border-amber-200">
                            {offer.status}
                          </span>
                        </div>
                        <p className="mt-1 text-[11px] text-[#7A8A78]">Farmer asks: ₹{offer.asking} | Your offer: ₹{offer.offer}</p>
                      </div>
                    ))}
                  </div>
                </SectionBox>
              </div>
            )}

            {/* ORDERS TAB */}
            {activeTab === "orders" && (
              <div className="space-y-4">
                <h2 className="text-base font-extrabold text-[#172117]">All Orders ({ORDERS.length})</h2>
                {ORDERS.map((order) => (
                  <div key={order.id} className="rounded-[28px] border border-[#E2E8DF] bg-white p-6 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-extrabold text-[#172117]">{order.crop}</p>
                        <p className="text-xs text-[#7A8A78]">Order ID: {order.id} · {order.date}</p>
                      </div>
                      <StatusBadge status={order.status} type={order.statusType} />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-[#E2E8DF]">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-[#7A8A78]">Quantity</p>
                        <p className="text-xs font-extrabold text-[#172117] mt-0.5">{order.quantity}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-[#7A8A78]">Total Amount</p>
                        <p className="text-xs font-extrabold text-[#2E7D32] mt-0.5">₹{order.amount.toLocaleString("en-IN")}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-[#7A8A78]">Route</p>
                        <p className="text-xs font-extrabold text-[#172117] mt-0.5">{order.location}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* OFFERS TAB */}
            {activeTab === "offers" && (
              <div className="space-y-4">
                <h2 className="text-base font-extrabold text-[#172117]">Negotiated Offers ({OFFERS.length})</h2>
                {OFFERS.map((offer) => (
                  <div key={offer.id} className="rounded-[28px] border border-[#E2E8DF] bg-white p-6 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-extrabold text-[#172117]">{offer.crop}</p>
                        <p className="text-xs text-[#7A8A78]">{offer.farmer} · {offer.quantity}</p>
                      </div>
                      <span className="rounded-full bg-amber-50 px-3 py-1 text-[10px] font-bold text-amber-800 border border-amber-200">
                        {offer.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#E2E8DF]">
                      <div className="rounded-2xl bg-[#F8FAF7] p-3 border border-[#E2E8DF]">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-[#7A8A78]">Farmer Asking Price</p>
                        <p className="text-sm font-extrabold text-[#172117] mt-1">₹{offer.asking}/Qtl</p>
                      </div>
                      <div className="rounded-2xl bg-[#E8F5E9]/50 p-3 border border-[#C5D1C3]">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-[#2E7D32]">Your Counter Offer</p>
                        <p className="text-sm font-extrabold text-[#1B5E20] mt-1">₹{offer.offer}/Qtl</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* SAVED TAB */}
            {activeTab === "saved" && (
              <div className="space-y-4">
                <h2 className="text-base font-extrabold text-[#172117]">Saved Watchlist ({SAVED_PRODUCTS.length})</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {SAVED_PRODUCTS.map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => navigate(`/product/${prod.id}`)}
                      className="group cursor-pointer rounded-[28px] border border-[#E2E8DF] bg-white overflow-hidden shadow-sm transition hover:border-[#2E7D32]"
                    >
                      <div className="relative h-40 overflow-hidden">
                        <img src={prod.image} alt={prod.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                      </div>
                      <div className="p-4">
                        <p className="text-xs font-extrabold text-[#172117]">{prod.name}</p>
                        <p className="mt-0.5 text-[11px] text-[#7A8A78]">{prod.location}</p>
                        <div className="mt-3 flex items-center justify-between">
                          <p className="text-sm font-black text-[#2E7D32]">₹{prod.price}/Qtl</p>
                          <span className="rounded-full bg-[#E8F5E9] px-2 py-0.5 text-[10px] font-bold text-[#2E7D32]">
                            Mandi: ₹{prod.mandi}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR: PROFILE & MARKET SNAPSHOT */}
          <aside className="space-y-5">
            {/* PROFILE SUMMARY */}
            <div className="rounded-[28px] border border-[#E2E8DF] bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3.5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E8F5E9] text-xs font-black text-[#2E7D32]">
                  {getInitials(displayName)}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-extrabold text-[#172117]">{displayName}</p>
                  <p className="truncate text-xs text-[#7A8A78]">{user?.email || "Buyer Account"}</p>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2 rounded-2xl bg-[#E8F5E9]/60 px-3.5 py-3 border border-[#C5D1C3]">
                <ShieldCheck size={16} className="text-[#2E7D32]" />
                <span className="text-xs font-extrabold text-[#1B5E20]">Verified B2B Buyer</span>
              </div>

              <button
                onClick={() => navigate("/buyer/profile")}
                className="mt-4 flex w-full items-center justify-between rounded-2xl border border-[#E2E8DF] bg-[#F8FAF7] px-4 py-3 text-xs font-bold text-[#5F6E5E] transition hover:border-[#2E7D32] hover:text-[#2E7D32]"
              >
                Manage Profile & KYC
                <ChevronRight size={15} />
              </button>
            </div>

            {/* MARKET BENCHMARKS */}
            <div className="rounded-[28px] border border-[#E2E8DF] bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-extrabold text-[#172117]">Market Snapshot</h3>
                  <p className="text-xs text-[#7A8A78]">Regional mandi benchmarks</p>
                </div>
                <TrendingUp size={18} className="text-[#2E7D32]" />
              </div>

              <div className="space-y-3">
                <MarketRow crop="Wheat" market="Muzaffarpur" price="₹2,760" change="+4.2%" positive />
                <MarketRow crop="Rice" market="Patna" price="₹6,210" change="+2.8%" positive />
                <MarketRow crop="Maize" market="Purnia" price="₹2,140" change="+1.9%" positive />
                <MarketRow crop="Mustard" market="Jaipur" price="₹5,580" change="-0.8%" />
              </div>
            </div>

            {/* DEFAULT DELIVERY LOCATION */}
            <div className="rounded-[28px] border border-[#E2E8DF] bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F5E9] text-[#2E7D32]">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-xs font-extrabold text-[#172117]">Default Delivery Hub</p>
                  <p className="text-xs font-semibold text-[#2E7D32]">Patna, Bihar</p>
                </div>
              </div>
              <p className="mt-3 text-xs text-[#7A8A78]">
                Logistics estimates and freight calculations automatically sync with this hub.
              </p>
            </div>

            <div className="rounded-[28px] border border-[#E2E8DF] bg-[#172117] p-6 text-white shadow-sm">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-emerald-300">
                Next step
              </p>
              <h3 className="mt-2 text-xl font-extrabold tracking-tight">
                Payment
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#A3B2A2]">
                Review the protected payment terms and complete the transaction before shipment tracking begins.
              </p>

              <button
                onClick={() => navigate("/buyer/payments")}
                className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-[#2E7D32] px-4 text-xs font-extrabold text-white shadow-md shadow-[#2E7D32]/20 transition hover:bg-[#1B5E20]"
              >
                Proceed to Payment
                <ArrowRight size={15} />
              </button>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

// ============================================================
// HELPER COMPONENTS
// ============================================================

function MetricCard({ icon: Icon, label, value, helper, warning = false }) {
  return (
    <div className="rounded-[28px] border border-[#E2E8DF] bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E8F5E9] text-[#2E7D32]">
          <Icon size={20} />
        </div>
        {warning && (
          <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-bold text-amber-800 border border-amber-200">
            Action needed
          </span>
        )}
      </div>

      <div className="mt-4">
        <p className="text-xs font-bold uppercase tracking-wider text-[#7A8A78]">{label}</p>
        <p className="mt-1 text-2xl font-black text-[#172117]">{value}</p>
        <p className="mt-1 text-xs text-[#5F6E5E]">{helper}</p>
      </div>
    </div>
  );
}

function SectionBox({ title, action, onAction, children }) {
  return (
    <div className="rounded-[28px] border border-[#E2E8DF] bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-extrabold text-[#172117]">{title}</h2>
        {action && (
          <button onClick={onAction} className="text-xs font-bold text-[#2E7D32] hover:text-[#1B5E20]">
            {action}
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

function MarketRow({ crop, market, price, change, positive = false }) {
  return (
    <div className="flex items-center justify-between border-b border-[#E2E8DF] pb-2.5 last:border-0 last:pb-0">
      <div>
        <p className="text-xs font-extrabold text-[#172117]">{crop}</p>
        <p className="text-[10px] text-[#7A8A78]">{market}</p>
      </div>
      <div className="text-right">
        <p className="text-xs font-extrabold text-[#172117]">{price}</p>
        <p className={`text-[10px] font-bold ${positive ? "text-[#2E7D32]" : "text-red-500"}`}>{change}</p>
      </div>
    </div>
  );
}

function StatusBadge({ status, type }) {
  const styles = {
    transit: "bg-blue-50 text-blue-700 border-blue-200",
    quality: "bg-amber-50 text-amber-800 border-amber-200",
    delivered: "bg-[#E8F5E9] text-[#2E7D32] border-[#C5D1C3]",
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-bold ${styles[type] || "bg-slate-50 text-slate-700 border-slate-200"}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-currentColor animate-pulse" />
      {status}
    </span>
  );
}

function getInitials(name = "") {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "B";
  return parts.slice(0, 2).map((p) => p[0]).join("").toUpperCase();
}

function formatCompact(num) {
  if (num >= 10000000) return `${(num / 10000000).toFixed(1)}Cr`;
  if (num >= 100000) return `${(num / 100000).toFixed(1)}L`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toLocaleString("en-IN");
}