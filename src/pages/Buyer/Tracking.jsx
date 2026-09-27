import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Clock3,
  Copy,
  ExternalLink,
  FileText,
  MapPin,
  Navigation,
  Package,
  Phone,
  ShieldCheck,
  Truck,
  UserRound,
  Warehouse,
  X,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router";

import BuyerHeader from "../../components/BuyerHeader";

const SHIPMENT = {
  transactionId: "GC-TXN-92841",
  contractId: "GC-CON-92841",

  status: "In Transit",

  farmer: {
    name: "Rajesh Kumar",
    location: "Muzaffarpur, Bihar",
    phone: "+91 9XXXX XXXXX",
    verified: true,
  },

  buyer: {
    name: "FreshMart Foods",
    location: "Patna, Bihar",
    warehouse: "FreshMart Foods Warehouse",
  },

  produce: {
    name: "Premium Sharbati Wheat",
    variety: "Sharbati",
    quantity: 40,
    unit: "quintal",
    quality: "Grade A",
    moisture: "10.8%",
  },

  vehicle: {
    type: "Mini Truck",
    capacity: "5–7 Ton",
    number: "BR-06-XX-4821",
    driver: "Rakesh Kumar",
    driverPhone: "+91 9XXXX XXXXX",
  },

  route: {
    distance: 78,
    pickup: "Muzaffarpur, Bihar",
    destination: "Patna, Bihar",
    currentLocation: "Hajipur, Bihar",
  },

  dates: {
    pickup: "27 September 2026 · 08:40 AM",
    eta: "29 September 2026",
    lastUpdate: "27 September 2026 · 12:35 PM",
  },

  financials: {
    produceValue: 114400,
    logistics: 4200,
    qualityHold: 572,
    total: 119172,
  },
};

const INITIAL_STEPS = [
  {
    id: 1,
    title: "Contract confirmed",
    description:
      "Digital contract accepted by the buyer and seller.",
    time: "26 September · 06:12 PM",
    icon: FileText,
    completed: true,
  },
  {
    id: 2,
    title: "Quality hold confirmed",
    description:
      "Transaction protection has been activated.",
    time: "26 September · 06:18 PM",
    icon: ShieldCheck,
    completed: true,
  },
  {
    id: 3,
    title: "Pickup completed",
    description:
      "Produce collected from the farmer's pickup point.",
    time: "27 September · 08:40 AM",
    icon: Package,
    completed: true,
  },
  {
    id: 4,
    title: "Shipment in transit",
    description:
      "Vehicle is moving towards the buyer's warehouse.",
    time: "27 September · 09:05 AM",
    icon: Truck,
    completed: true,
    active: true,
  },
  {
    id: 5,
    title: "Arrived at destination",
    description:
      "Shipment reaches the buyer's delivery location.",
    time: "Expected · 29 September",
    icon: Warehouse,
    completed: false,
  },
  {
    id: 6,
    title: "Delivery confirmed",
    description:
      "Buyer confirms receipt of the produce.",
    time: "Pending delivery",
    icon: CheckCircle2,
    completed: false,
  },
];

function formatINR(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function TimelineStep({
  step,
  isLast,
}) {
  const Icon = step.icon;

  return (
    <div className="relative flex gap-4">
      {!isLast && (
        <div
          className={`absolute left-[19px] top-10 h-[calc(100%-20px)] w-px ${
            step.completed
              ? "bg-emerald-300"
              : "bg-slate-200"
          }`}
        />
      )}

      <div
        className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border ${
          step.active
            ? "border-emerald-600 bg-emerald-600 text-white shadow-lg shadow-emerald-900/15"
            : step.completed
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-slate-200 bg-white text-slate-400"
        }`}
      >
        {step.completed && !step.active ? (
          <Check size={17} />
        ) : (
          <Icon size={17} />
        )}
      </div>

      <div className="min-w-0 flex-1 pb-8">
        <div className="flex flex-col justify-between gap-1 sm:flex-row">
          <p
            className={`text-sm font-semibold ${
              step.active
                ? "text-emerald-700"
                : step.completed
                  ? "text-slate-900"
                  : "text-slate-400"
            }`}
          >
            {step.title}
          </p>

          <span className="text-[11px] text-slate-400">
            {step.time}
          </span>
        </div>

        <p className="mt-1 max-w-xl text-xs leading-5 text-slate-500">
          {step.description}
        </p>

        {step.active && (
          <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
            CURRENT STATUS
          </span>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, subtext }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-emerald-700">
          <Icon size={18} />
        </div>

        <p className="text-xs font-medium text-slate-400">
          {label}
        </p>
      </div>

      <p className="mt-4 text-lg font-semibold text-slate-950">
        {value}
      </p>

      {subtext && (
        <p className="mt-1 text-xs text-slate-500">
          {subtext}
        </p>
      )}
    </div>
  );
}

export default function Tracking() {
  const navigate = useNavigate();
  const location = useLocation();

  const [steps, setSteps] = useState(INITIAL_STEPS);
  const [showDriver, setShowDriver] = useState(false);
  const [delivered, setDelivered] = useState(false);
  const [toast, setToast] = useState("");

  const transactionId =
    location.state?.transactionId ||
    SHIPMENT.transactionId;

  const contractId =
    location.state?.contractId ||
    SHIPMENT.contractId;

  const handleCopy = async (value, label) => {
    try {
      await navigator.clipboard.writeText(value);

      setToast(`${label} copied`);
      setTimeout(() => setToast(""), 2500);
    } catch {
      setToast(value);
      setTimeout(() => setToast(""), 2500);
    }
  };

  const confirmDelivery = () => {
    setDelivered(true);

    setSteps((current) =>
      current.map((step) => {
        if (step.id === 5) {
          return {
            ...step,
            completed: true,
            active: false,
          };
        }

        if (step.id === 6) {
          return {
            ...step,
            completed: true,
            active: false,
            time: "27 September · Just now",
          };
        }

        return step;
      })
    );

    setToast("Delivery confirmed successfully");

    setTimeout(() => setToast(""), 3000);
  };

  return (
    <div className="min-h-screen bg-[#F7F9F7] text-slate-900">
      <BuyerHeader
        search=""
        onSearchChange={() => {}}
      />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* BACK */}
        <button
          onClick={() => navigate("/buyer/orders")}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-emerald-700"
        >
          <ArrowLeft size={16} />
          Back to Orders
        </button>

        {/* HEADER */}
        <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
              <Navigation size={14} />
              STEP 6 OF 6
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Track shipment
              </h1>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  delivered
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-blue-50 text-blue-700"
                }`}
              >
                {delivered ? "Delivered" : "In Transit"}
              </span>
            </div>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Follow your produce from the farmer's pickup point
              to the delivery destination.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
              Transaction
            </p>

            <button
              onClick={() =>
                handleCopy(transactionId, "Transaction ID")
              }
              className="mt-1 flex items-center gap-2 font-mono text-sm font-semibold text-slate-800"
            >
              {transactionId}
              <Copy
                size={13}
                className="text-slate-400"
              />
            </button>
          </div>
        </div>

        {/* LIVE STATUS */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 overflow-hidden rounded-3xl border border-emerald-200 bg-white shadow-sm"
        >
          <div className="bg-gradient-to-r from-emerald-900 to-emerald-700 p-6 text-white sm:p-8">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
              <div>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-200" />
                  </span>

                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-100">
                    Live shipment status
                  </span>
                </div>

                <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
                  {delivered
                    ? "Shipment delivered"
                    : "Your shipment is in transit"}
                </h2>

                <p className="mt-2 max-w-xl text-sm leading-6 text-emerald-100/80">
                  {delivered
                    ? "The buyer has confirmed receipt of the produce."
                    : `The vehicle is currently near ${SHIPMENT.route.currentLocation} and moving towards Patna.`}
                </p>
              </div>

              <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-sm">
                <p className="text-xs text-emerald-100/70">
                  Estimated arrival
                </p>

                <p className="mt-1 text-2xl font-semibold">
                  {delivered
                    ? "Delivered"
                    : SHIPMENT.dates.eta}
                </p>

                {!delivered && (
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-100/70">
                    <Clock3 size={13} />
                    ETA based on current shipment status
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ROUTE */}
          <div className="p-6 sm:p-8">
            <div className="grid gap-5 md:grid-cols-[1fr_auto_1fr] md:items-center">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                  <Warehouse size={18} />
                </div>

                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Pickup
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {SHIPMENT.route.pickup}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {SHIPMENT.dates.pickup}
                  </p>
                </div>
              </div>

              <div className="hidden md:block">
                <div className="flex w-36 items-center">
                  <div className="h-1 flex-1 rounded-full bg-emerald-500" />

                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white shadow-md">
                    <Truck size={15} />
                  </div>

                  <div
                    className={`h-1 flex-1 rounded-full ${
                      delivered
                        ? "bg-emerald-500"
                        : "bg-slate-200"
                    }`}
                  />
                </div>

                <p className="mt-2 text-center text-[10px] font-medium text-slate-400">
                  {SHIPMENT.route.distance} km route
                </p>
              </div>

              <div className="flex items-start gap-3 md:justify-end">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white">
                  <MapPin size={18} />
                </div>

                <div className="md:text-right">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Destination
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {SHIPMENT.buyer.warehouse}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {SHIPMENT.route.destination}
                  </p>
                </div>
              </div>
            </div>

            {/* MOBILE ROUTE */}
            <div className="mt-5 flex items-center gap-3 md:hidden">
              <div className="h-1 flex-1 rounded-full bg-emerald-500" />

              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white">
                <Truck size={15} />
              </div>

              <div
                className={`h-1 flex-1 rounded-full ${
                  delivered
                    ? "bg-emerald-500"
                    : "bg-slate-200"
                }`}
              />
            </div>
          </div>
        </motion.div>

        {/* STATS */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={Package}
            label="Shipment"
            value={`${SHIPMENT.produce.quantity} ${SHIPMENT.produce.unit}`}
            subtext={SHIPMENT.produce.name}
          />

          <StatCard
            icon={Truck}
            label="Vehicle"
            value={SHIPMENT.vehicle.type}
            subtext={SHIPMENT.vehicle.number}
          />

          <StatCard
            icon={Navigation}
            label="Distance"
            value={`${SHIPMENT.route.distance} km`}
            subtext={`Current: ${SHIPMENT.route.currentLocation}`}
          />

          <StatCard
            icon={Clock3}
            label="Last update"
            value="12:35 PM"
            subtext="27 September 2026"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_0.75fr]">
          {/* LEFT */}
          <div className="space-y-6">
            {/* MAP */}
            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 p-5">
                <div>
                  <h2 className="font-semibold text-slate-950">
                    Shipment route
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Current location updated at{" "}
                    {SHIPMENT.dates.lastUpdate}
                  </p>
                </div>

                <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-semibold text-emerald-700">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                  LIVE
                </span>
              </div>

              {/* MAP-LIKE UI */}
              <div className="relative h-[300px] overflow-hidden bg-[#EEF3EE]">
                {/* Roads */}
                <div className="absolute left-[8%] top-[58%] h-2 w-[84%] rotate-[-12deg] rounded-full bg-white shadow-sm" />

                <div className="absolute left-[20%] top-[15%] h-[85%] w-2 rotate-[28deg] rounded-full bg-white shadow-sm" />

                <div className="absolute left-[48%] top-[-10%] h-[120%] w-2 rotate-[10deg] rounded-full bg-white shadow-sm" />

                <div className="absolute left-[2%] top-[32%] h-1 w-[70%] rotate-[18deg] rounded-full bg-white" />

                <div className="absolute left-[55%] top-[65%] h-1 w-[45%] rotate-[-25deg] rounded-full bg-white" />

                {/* Green route */}
                <div className="absolute left-[14%] top-[61%] h-1.5 w-[70%] rotate-[-13deg] rounded-full bg-emerald-500 shadow-sm" />

                {/* Pickup marker */}
                <div className="absolute left-[11%] top-[64%]">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-emerald-700 shadow-lg ring-4 ring-emerald-100">
                    <Warehouse size={17} />
                  </div>

                  <div className="mt-2 rounded-lg bg-white px-2.5 py-1.5 text-[10px] font-semibold text-slate-700 shadow-md">
                    Muzaffarpur
                  </div>
                </div>

                {/* Current vehicle */}
                {!delivered && (
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                    }}
                    className="absolute left-[51%] top-[47%]"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-700 text-white shadow-xl ring-4 ring-white">
                      <Truck size={19} />
                    </div>

                    <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-950 px-2.5 py-1.5 text-[10px] font-medium text-white shadow-lg">
                      {SHIPMENT.route.currentLocation}
                    </div>
                  </motion.div>
                )}

                {/* Destination */}
                <div className="absolute right-[10%] top-[28%]">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg ring-4 ring-emerald-100">
                    <MapPin size={17} />
                  </div>

                  <div className="mt-2 rounded-lg bg-white px-2.5 py-1.5 text-[10px] font-semibold text-slate-700 shadow-md">
                    Patna
                  </div>
                </div>

                {/* Current location card */}
                {!delivered && (
                  <div className="absolute bottom-4 left-4 rounded-xl border border-white/80 bg-white/90 p-3 shadow-lg backdrop-blur-sm">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      Current location
                    </p>

                    <p className="mt-1 text-xs font-semibold text-slate-900">
                      {SHIPMENT.route.currentLocation}
                    </p>

                    <p className="mt-1 text-[10px] text-slate-500">
                      Vehicle is moving towards Patna
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* TIMELINE */}
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-slate-950">
                  Shipment timeline
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Every important transaction and logistics event.
                </p>
              </div>

              <div>
                {steps.map((step, index) => (
                  <TimelineStep
                    key={step.id}
                    step={step}
                    isLast={index === steps.length - 1}
                  />
                ))}
              </div>
            </section>

            {/* DELIVERY CONFIRMATION */}
            {!delivered && (
              <section className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-6">
                <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white">
                      <CheckCircle2 size={19} />
                    </div>

                    <div>
                      <h3 className="font-semibold text-emerald-950">
                        Demo delivery confirmation
                      </h3>

                      <p className="mt-1 text-xs leading-5 text-emerald-900/70">
                        Use this only to demonstrate the final
                        transaction state in the prototype.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={confirmDelivery}
                    className="h-11 rounded-xl bg-emerald-700 px-5 text-sm font-semibold text-white transition hover:bg-emerald-800"
                  >
                    Confirm Delivery
                  </button>
                </div>
              </section>
            )}

            {delivered && (
              <motion.section
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white">
                    <Check size={21} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-emerald-950">
                      Delivery completed
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-emerald-900/70">
                      The shipment has been marked as delivered.
                      The transaction can now proceed to its final
                      settlement workflow.
                    </p>
                  </div>
                </div>
              </motion.section>
            )}
          </div>

          {/* RIGHT */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            {/* VEHICLE */}
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                    Vehicle
                  </p>

                  <h2 className="mt-1 text-lg font-semibold text-slate-950">
                    Shipment vehicle
                  </h2>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                  <Truck size={19} />
                </div>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-900">
                  {SHIPMENT.vehicle.type}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {SHIPMENT.vehicle.capacity}
                </p>

                <div className="mt-4 border-t border-slate-200 pt-3">
                  <p className="text-[11px] text-slate-400">
                    Vehicle number
                  </p>

                  <p className="mt-1 font-mono text-sm font-semibold text-slate-800">
                    {SHIPMENT.vehicle.number}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowDriver(true)}
                className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <UserRound size={16} />
                View driver details
              </button>
            </section>

            {/* PRODUCE */}
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                  <Package size={18} />
                </div>

                <div>
                  <h2 className="font-semibold text-slate-950">
                    Produce
                  </h2>

                  <p className="text-xs text-slate-500">
                    Shipment details
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-xs text-slate-400">
                    Product
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {SHIPMENT.produce.name}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-[11px] text-slate-400">
                      Quantity
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {SHIPMENT.produce.quantity}{" "}
                      {SHIPMENT.produce.unit}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-[11px] text-slate-400">
                      Quality
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {SHIPMENT.produce.quality}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between border-t border-slate-100 pt-3">
                  <span className="text-xs text-slate-500">
                    Moisture
                  </span>

                  <span className="text-xs font-semibold text-slate-800">
                    {SHIPMENT.produce.moisture}
                  </span>
                </div>
              </div>
            </section>

            {/* FINANCIAL */}
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                Transaction
              </p>

              <h2 className="mt-2 text-lg font-semibold text-slate-950">
                Payment summary
              </h2>

              <div className="mt-5 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">
                    Produce
                  </span>

                  <span className="font-medium text-slate-800">
                    {formatINR(
                      SHIPMENT.financials.produceValue
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">
                    Logistics
                  </span>

                  <span className="font-medium text-slate-800">
                    {formatINR(
                      SHIPMENT.financials.logistics
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">
                    Quality hold
                  </span>

                  <span className="font-medium text-slate-800">
                    {formatINR(
                      SHIPMENT.financials.qualityHold
                    )}
                  </span>
                </div>

                <div className="border-t border-slate-100 pt-4">
                  <div className="flex items-end justify-between gap-3">
                    <span className="text-sm font-semibold text-slate-800">
                      Total
                    </span>

                    <span className="text-xl font-semibold text-emerald-700">
                      {formatINR(
                        SHIPMENT.financials.total
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-emerald-50 p-4">
                <div className="flex gap-3">
                  <ShieldCheck
                    size={17}
                    className="mt-0.5 shrink-0 text-emerald-700"
                  />

                  <p className="text-xs leading-5 text-emerald-900/70">
                    This transaction is connected to the digital
                    contract and quality protection workflow.
                  </p>
                </div>
              </div>
            </section>

            {/* IDS */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  Contract ID
                </span>

                <button
                  onClick={() =>
                    handleCopy(contractId, "Contract ID")
                  }
                  className="flex items-center gap-1.5 font-mono text-xs font-semibold text-slate-700"
                >
                  {contractId}
                  <Copy
                    size={12}
                    className="text-slate-400"
                  />
                </button>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
                <span className="text-xs text-slate-400">
                  Transaction ID
                </span>

                <button
                  onClick={() =>
                    handleCopy(
                      transactionId,
                      "Transaction ID"
                    )
                  }
                  className="flex items-center gap-1.5 font-mono text-xs font-semibold text-slate-700"
                >
                  {transactionId}
                  <Copy
                    size={12}
                    className="text-slate-400"
                  />
                </button>
              </div>
            </section>

            <button
              onClick={() => navigate("/buyer/orders")}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              View all orders
              <ExternalLink size={15} />
            </button>
          </aside>
        </div>

        <p className="mt-8 text-center text-[11px] leading-5 text-slate-400">
          Prototype only — shipment location, vehicle details, ETA
          and delivery events shown here are simulated frontend data.
        </p>
      </main>

      {/* DRIVER MODAL */}
      <AnimatePresence>
        {showDriver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
            onClick={() => setShowDriver(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                    <UserRound size={20} />
                  </div>

                  <h2 className="mt-4 text-xl font-semibold text-slate-950">
                    Driver details
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Assigned shipment driver
                  </p>
                </div>

                <button
                  onClick={() => setShowDriver(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="mt-6 rounded-2xl bg-slate-50 p-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <UserRound size={23} />
                  </div>

                  <div>
                    <p className="font-semibold text-slate-900">
                      {SHIPMENT.vehicle.driver}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Assigned driver
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-3 border-t border-slate-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-xs text-slate-500">
                      Vehicle
                    </span>

                    <span className="text-xs font-semibold text-slate-800">
                      {SHIPMENT.vehicle.number}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-xs text-slate-500">
                      Phone
                    </span>

                    <span className="text-xs font-semibold text-slate-800">
                      {SHIPMENT.vehicle.driverPhone}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-xs text-slate-500">
                      Current location
                    </span>

                    <span className="text-xs font-semibold text-slate-800">
                      {SHIPMENT.route.currentLocation}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowDriver(false)}
                className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 text-sm font-semibold text-white transition hover:bg-emerald-800"
              >
                <Phone size={16} />
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOAST */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-medium text-white shadow-xl"
          >
            <CheckCircle2
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