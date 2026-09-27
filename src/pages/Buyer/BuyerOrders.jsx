import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileText,
  MapPin,
  Package,
  Search,
  ShieldCheck,
  Truck,
  XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";

import BuyerHeader from "../../components/BuyerHeader";

const ORDERS = [
  {
    id: "GC-482913",
    date: "22 Sep 2026",
    status: "In Transit",
    statusType: "transit",
    farmer: "Rajesh Kumar",
    location: "Muzaffarpur, Bihar",
    destination: "Patna, Bihar",
    crop: "Premium Sharbati Wheat",
    quantity: 40,
    unit: "Quintal",
    price: 2920,
    total: 116800,
    image:
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=900&q=80",
    eta: "27 Sep 2026",
    vehicle: "BR-06-GA-4821",
    driver: "Suresh Kumar",
  },
  {
    id: "GC-481276",
    date: "18 Sep 2026",
    status: "Confirmed",
    statusType: "confirmed",
    farmer: "Amit Kumar",
    location: "Patna, Bihar",
    destination: "Patna, Bihar",
    crop: "Basmati Rice 1121",
    quantity: 20,
    unit: "Quintal",
    price: 6400,
    total: 128000,
    image:
      "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=900&q=80",
    eta: "30 Sep 2026",
    vehicle: "Not assigned",
    driver: "Pending",
  },
  {
    id: "GC-479842",
    date: "11 Sep 2026",
    status: "Delivered",
    statusType: "delivered",
    farmer: "Kisan FPO",
    location: "Purnia, Bihar",
    destination: "Patna, Bihar",
    crop: "Yellow Maize",
    quantity: 50,
    unit: "Quintal",
    price: 2200,
    total: 110000,
    image:
      "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=900&q=80",
    eta: "Delivered 15 Sep",
    vehicle: "BR-11-XY-2290",
    driver: "Ramesh Singh",
  },
  {
    id: "GC-476531",
    date: "04 Sep 2026",
    status: "Cancelled",
    statusType: "cancelled",
    farmer: "Bharat Agro",
    location: "Darbhanga, Bihar",
    destination: "Patna, Bihar",
    crop: "Premium Mustard",
    quantity: 15,
    unit: "Quintal",
    price: 5750,
    total: 86250,
    image:
      "https://images.unsplash.com/photo-1599909533730-f9d7a9f1b4cc?auto=format&fit=crop&w=900&q=80",
    eta: "Cancelled",
    vehicle: "—",
    driver: "—",
  },
];

const TABS = [
  { id: "all", label: "All Orders" },
  { id: "active", label: "Active" },
  { id: "delivered", label: "Delivered" },
  { id: "cancelled", label: "Cancelled" },
];

function statusClasses(type) {
  switch (type) {
    case "transit":
      return "bg-blue-50 text-blue-700";
    case "confirmed":
      return "bg-amber-50 text-amber-700";
    case "delivered":
      return "bg-emerald-50 text-emerald-700";
    case "cancelled":
      return "bg-red-50 text-red-700";
    default:
      return "bg-slate-100 text-slate-600";
  }
}

function StatusIcon({ type }) {
  if (type === "transit") return <Truck size={14} />;
  if (type === "confirmed") return <Clock3 size={14} />;
  if (type === "delivered") return <CheckCircle2 size={14} />;
  return <XCircle size={14} />;
}

function formatPrice(value) {
  return `₹${Number(value || 0).toLocaleString("en-IN")}`;
}

export default function BuyerOrders() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = useMemo(() => {
    let orders = [...ORDERS];

    if (activeTab === "active") {
      orders = orders.filter(
        (order) =>
          order.statusType === "confirmed" ||
          order.statusType === "transit"
      );
    }

    if (activeTab === "delivered") {
      orders = orders.filter(
        (order) => order.statusType === "delivered"
      );
    }

    if (activeTab === "cancelled") {
      orders = orders.filter(
        (order) => order.statusType === "cancelled"
      );
    }

    if (search.trim()) {
      const query = search.toLowerCase();

      orders = orders.filter(
        (order) =>
          order.id.toLowerCase().includes(query) ||
          order.crop.toLowerCase().includes(query) ||
          order.farmer.toLowerCase().includes(query)
      );
    }

    return orders;
  }, [activeTab, search]);

  const activeOrders = ORDERS.filter(
    (order) =>
      order.statusType === "confirmed" ||
      order.statusType === "transit"
  ).length;

  const deliveredOrders = ORDERS.filter(
    (order) => order.statusType === "delivered"
  ).length;

  const totalValue = ORDERS.reduce(
    (sum, order) => sum + Number(order.total || 0),
    0
  );

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
            Orders
          </span>
        </div>

        {/* Heading */}
        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">
              Procurement
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
              Orders & tracking
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Monitor purchase requests, deliveries and transaction status.
            </p>
          </div>

          <button
            onClick={() => navigate("/marketplace")}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 text-sm font-semibold text-white shadow-lg shadow-emerald-700/15 transition hover:bg-emerald-800"
          >
            Buy more produce
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Metrics */}
        <div className="mb-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Metric
            label="Total orders"
            value={ORDERS.length}
            icon={<Package size={18} />}
          />

          <Metric
            label="Active orders"
            value={activeOrders}
            icon={<Truck size={18} />}
          />

          <Metric
            label="Delivered"
            value={deliveredOrders}
            icon={<CheckCircle2 size={18} />}
          />

          <Metric
            label="Procurement value"
            value={formatPrice(totalValue)}
            icon={<FileText size={18} />}
          />
        </div>

        {/* Controls */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Tabs */}
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

            {/* Search */}
            <div className="relative w-full lg:max-w-xs">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search order or produce..."
                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm outline-none transition focus:border-emerald-500 focus:bg-white"
              />
            </div>
          </div>
        </div>

        {/* Orders */}
        <div className="mt-5 space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
              <Search
                size={28}
                className="mx-auto text-slate-300"
              />

              <h3 className="mt-4 font-bold">
                No orders found
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Try another search or change the filter.
              </p>
            </div>
          ) : (
            filteredOrders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
              >
                <div className="p-5">
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
                    {/* Image */}
                    <img
                      src={order.image}
                      alt={order.crop}
                      className="h-24 w-full rounded-xl object-cover sm:w-32"
                    />

                    {/* Main */}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs font-semibold text-slate-400">
                          {order.id}
                        </span>

                        <span className="text-xs text-slate-300">
                          •
                        </span>

                        <span className="text-xs text-slate-400">
                          {order.date}
                        </span>
                      </div>

                      <h2 className="mt-2 text-lg font-bold">
                        {order.crop}
                      </h2>

                      <p className="mt-1 text-sm text-slate-500">
                        {order.quantity} {order.unit} ·{" "}
                        {formatPrice(order.price)}/quintal
                      </p>

                      <div className="mt-3 flex flex-wrap items-center gap-3">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusClasses(
                            order.statusType
                          )}`}
                        >
                          <StatusIcon type={order.statusType} />
                          {order.status}
                        </span>

                        <span className="flex items-center gap-1 text-xs text-slate-400">
                          <MapPin size={12} />
                          {order.location}
                        </span>
                      </div>
                    </div>

                    {/* Value */}
                    <div className="lg:min-w-[150px] lg:text-right">
                      <p className="text-xs text-slate-400">
                        Order value
                      </p>

                      <p className="mt-1 text-xl font-bold text-slate-900">
                        {formatPrice(order.total)}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        ETA: {order.eta}
                      </p>
                    </div>

                    {/* Action */}
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                    >
                      View details
                      <ChevronRight size={15} />
                    </button>
                  </div>
                </div>

                {/* Progress */}
                {order.statusType !== "cancelled" && (
                  <OrderProgress status={order.statusType} />
                )}
              </motion.div>
            ))
          )}
        </div>
      </main>

      {/* Detail Modal */}
      {selectedOrder && (
        <OrderModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onMarketplace={() => navigate("/marketplace")}
        />
      )}
    </div>
  );
}

function Metric({ label, value, icon }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
          {icon}
        </div>
      </div>

      <p className="mt-4 text-xs font-medium text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-xl font-bold">{value}</p>
    </div>
  );
}

function OrderProgress({ status }) {
  const steps = [
    {
      id: "confirmed",
      label: "Confirmed",
    },
    {
      id: "transit",
      label: "In Transit",
    },
    {
      id: "delivered",
      label: "Delivered",
    },
  ];

  const currentIndex =
    status === "confirmed" ? 0 : status === "transit" ? 1 : 2;

  return (
    <div className="border-t border-slate-100 bg-slate-50/60 px-5 py-4">
      <div className="mx-auto flex max-w-2xl items-center">
        {steps.map((step, index) => {
          const complete = index <= currentIndex;

          return (
            <div
              key={step.id}
              className="flex flex-1 items-center last:flex-none"
            >
              <div className="flex items-center gap-2">
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full ${
                    complete
                      ? "bg-emerald-700 text-white"
                      : "bg-slate-200 text-slate-400"
                  }`}
                >
                  {complete ? (
                    <CheckCircle2 size={14} />
                  ) : (
                    <div className="h-2 w-2 rounded-full bg-current" />
                  )}
                </div>

                <span
                  className={`hidden text-[11px] font-semibold sm:block ${
                    complete
                      ? "text-emerald-700"
                      : "text-slate-400"
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {index < steps.length - 1 && (
                <div
                  className={`mx-3 h-px flex-1 ${
                    index < currentIndex
                      ? "bg-emerald-600"
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

function OrderModal({ order, onClose, onMarketplace }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/20 bg-white shadow-2xl"
      >
        <div className="p-6 md:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusClasses(
                  order.statusType
                )}`}
              >
                <StatusIcon type={order.statusType} />
                {order.status}
              </span>

              <h2 className="mt-3 text-2xl font-bold">
                {order.crop}
              </h2>

              <p className="mt-1 font-mono text-xs text-slate-400">
                {order.id}
              </p>
            </div>

            <button
              onClick={onClose}
              className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            >
              Close
            </button>
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            <InfoCard
              icon={<Package size={17} />}
              label="Quantity"
              value={`${order.quantity} ${order.unit}`}
            />

            <InfoCard
              icon={<FileText size={17} />}
              label="Order value"
              value={formatPrice(order.total)}
            />

            <InfoCard
              icon={<MapPin size={17} />}
              label="From"
              value={order.location}
            />

            <InfoCard
              icon={<MapPin size={17} />}
              label="Destination"
              value={order.destination}
            />
          </div>

          {order.statusType === "transit" && (
            <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50/60 p-5">
              <div className="flex gap-3">
                <Truck
                  size={19}
                  className="mt-0.5 text-blue-700"
                />

                <div>
                  <h3 className="font-bold text-blue-950">
                    Shipment is on the way
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-blue-950/65">
                    Expected delivery: {order.eta}
                  </p>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl bg-white/70 p-3">
                      <p className="text-[11px] text-blue-950/50">
                        Vehicle
                      </p>
                      <p className="mt-1 text-sm font-bold text-blue-950">
                        {order.vehicle}
                      </p>
                    </div>

                    <div className="rounded-xl bg-white/70 p-3">
                      <p className="text-[11px] text-blue-950/50">
                        Driver
                      </p>
                      <p className="mt-1 text-sm font-bold text-blue-950">
                        {order.driver}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {order.statusType === "delivered" && (
            <div className="mt-5 rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
              <div className="flex gap-3">
                <CheckCircle2
                  size={19}
                  className="mt-0.5 text-emerald-700"
                />

                <div>
                  <h3 className="font-bold text-emerald-950">
                    Delivery completed
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-emerald-950/65">
                    The produce was recorded as delivered on{" "}
                    {order.eta.replace("Delivered ", "")}.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <ShieldCheck
              size={18}
              className="mt-0.5 text-emerald-700"
            />

            <p className="text-xs leading-5 text-slate-500">
              GreenCart keeps the requested quantity, price, delivery
              conditions and transaction status associated with this order.
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={onClose}
              className="h-11 flex-1 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Close
            </button>

            <button
              onClick={onMarketplace}
              className="h-11 flex-1 rounded-xl bg-emerald-700 text-sm font-semibold text-white hover:bg-emerald-800"
            >
              Browse More Produce
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function InfoCard({ icon, label, value }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-center gap-2 text-emerald-700">
        {icon}
        <span className="text-xs font-semibold">{label}</span>
      </div>

      <p className="mt-2 text-sm font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}