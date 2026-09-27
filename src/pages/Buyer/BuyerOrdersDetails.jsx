import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router";
import {
  ArrowLeft,
  BadgeCheck,
  Check,
  ChevronRight,
  Clock3,
  FileCheck2,
  FileText,
  IndianRupee,
  MapPin,
  Package,
  Phone,
  ShieldCheck,
  Truck,
  UserRound,
  Warehouse,
} from "lucide-react";

const orders = {
  "GC-PO-10241": {
    id: "GC-PO-10241",
    rfq: "RFQ-24061",
    crop: "Mustard",
    variety: "Pusa Bold",
    quantity: 65,
    unit: "Qtl",
    price: 5750,
    freight: 55,
    total: 377000,
    farmer: "Vikash Singh",
    farmerLocation: "Muzaffarpur, Bihar",
    destination: "Patna Processing Plant",
    destinationLocation: "Patna, Bihar",
    orderDate: "22 Sep 2026",
    eta: "24 Sep 2026 · 4:30 PM",
    status: "In Transit",
    progress: 72,
    quality: "98.8%",
    moisture: "8.9%",
    impurity: "0.3%",
    paymentStatus: "Escrow Protected",
    truck: "BR-06-G-4821",
    driver: "Rakesh Kumar",
    driverPhone: "+91 98XXXXXX42",
    distance: "54 km remaining",
    lastUpdate: "Truck passed Hajipur checkpoint",
  },
  "GC-PO-10218": {
    id: "GC-PO-10218",
    rfq: "RFQ-24044",
    crop: "Basmati Rice",
    variety: "1121 Steam",
    quantity: 80,
    unit: "Qtl",
    price: 6340,
    freight: 70,
    total: 512800,
    farmer: "Sunil Kumar",
    farmerLocation: "Patna, Bihar",
    destination: "Muzaffarpur Mill",
    destinationLocation: "Muzaffarpur, Bihar",
    orderDate: "21 Sep 2026",
    eta: "23 Sep 2026 · 2:00 PM",
    status: "Quality Check",
    progress: 48,
    quality: "97.6%",
    moisture: "12.4%",
    impurity: "0.5%",
    paymentStatus: "Escrow Protected",
    truck: "BR-01-H-7214",
    driver: "Manoj Kumar",
    driverPhone: "+91 97XXXXXX16",
    distance: "Awaiting inspection",
    lastUpdate: "Quality inspection initiated",
  },
};

function money(value) {
  return `₹${Number(value).toLocaleString("en-IN")}`;
}

function InfoCard({ icon: Icon, title, children }) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="rounded-xl bg-emerald-50 p-2 text-emerald-700">
          <Icon size={17} />
        </div>

        <h3 className="text-sm font-bold text-slate-900">{title}</h3>
      </div>

      {children}
    </div>
  );
}

function TimelineStep({ title, detail, done, active }) {
  return (
    <div className="relative flex gap-4">
      <div
        className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 ${
          done
            ? "border-emerald-600 bg-emerald-600 text-white"
            : active
              ? "border-emerald-500 bg-emerald-50 text-emerald-700"
              : "border-slate-200 bg-white text-slate-300"
        }`}
      >
        {done ? (
          <Check size={14} strokeWidth={3} />
        ) : (
          <span className="h-2 w-2 rounded-full bg-current" />
        )}
      </div>

      <div className="pb-7">
        <p
          className={`text-sm font-bold ${
            done || active ? "text-slate-800" : "text-slate-400"
          }`}
        >
          {title}
        </p>

        <p className="mt-1 text-xs leading-5 text-slate-400">
          {detail}
        </p>
      </div>
    </div>
  );
}

export default function BuyerOrderDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const order = orders[id] || orders["GC-PO-10241"];

  return (
    <div className="min-h-screen bg-[#f7f9f7] text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[70px] max-w-[1450px] items-center gap-3 px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate("/buyer/orders")}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <p className="text-sm font-bold text-slate-900">
              Order tracking
            </p>
            <p className="font-mono text-[10px] text-slate-400">
              {order.id}
            </p>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <button className="hidden h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 sm:flex">
              <FileText size={15} />
              Contract
            </button>

            <button
              onClick={() => navigate("/buyer/rfqs")}
              className="hidden h-10 items-center gap-2 rounded-xl bg-slate-900 px-3.5 text-xs font-semibold text-white sm:flex"
            >
              RFQ Center
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1450px] px-4 py-6 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-5 flex items-center gap-2 text-xs text-slate-400">
          <button
            onClick={() => navigate("/buyer/orders")}
            className="hover:text-emerald-700"
          >
            Orders
          </button>
          <ChevronRight size={13} />
          <span>{order.id}</span>
        </div>

        {/* Main header */}
        <section className="overflow-hidden rounded-[24px] border border-slate-200/80 bg-white shadow-sm">
          <div className="p-5 sm:p-7">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-700">
                    {order.status}
                  </span>

                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                    <ShieldCheck size={11} />
                    {order.paymentStatus}
                  </span>
                </div>

                <div className="mt-4 flex items-start gap-4">
                  <div className="rounded-2xl bg-emerald-50 p-3.5 text-emerald-700">
                    <Package size={25} />
                  </div>

                  <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                      {order.crop}
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                      {order.variety} · {order.quantity} {order.unit}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <MapPin size={13} />
                        {order.farmerLocation}
                      </span>

                      <span className="flex items-center gap-1.5">
                        <Warehouse size={13} />
                        {order.destination}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:text-right">
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                  Procurement value
                </p>

                <p className="mt-1 text-3xl font-bold tracking-tight text-slate-950">
                  {money(order.total)}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {money(order.price)}/Qtl + {money(order.freight)}/Qtl freight
                </p>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="border-t border-slate-100 bg-slate-50/60 px-5 py-5 sm:px-7">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">
                Delivery progress
              </span>

              <span className="font-bold text-emerald-700">
                {order.progress}%
              </span>
            </div>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${order.progress}%` }}
                transition={{ duration: 0.8 }}
                className="h-full rounded-full bg-emerald-600"
              />
            </div>

            <div className="mt-3 flex justify-between text-[10px] text-slate-400">
              <span>Procured</span>
              <span>Quality verified</span>
              <span>In transit</span>
              <span>Delivered</span>
            </div>
          </div>
        </section>

        {/* ETA */}
        <section className="mt-5 grid gap-4 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-5">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-emerald-700 p-2.5 text-white">
                <Truck size={19} />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-700">
                  Estimated arrival
                </p>

                <p className="mt-1 text-xl font-bold text-slate-950">
                  {order.eta}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {order.lastUpdate}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
              Current location
            </p>

            <div className="mt-2 flex items-center gap-2">
              <MapPin size={17} className="text-emerald-600" />
              <p className="text-sm font-bold text-slate-900">
                {order.status === "In Transit"
                  ? "Near Hajipur"
                  : "Quality facility"}
              </p>
            </div>

            <p className="mt-1 text-xs text-slate-500">
              {order.distance}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
              Last updated
            </p>

            <div className="mt-2 flex items-center gap-2">
              <Clock3 size={16} className="text-slate-500" />
              <p className="text-sm font-bold text-slate-900">
                12:42 PM
              </p>
            </div>

            <p className="mt-1 text-xs text-slate-500">
              Today · automated tracking
            </p>
          </div>
        </section>

        {/* Main grid */}
        <div className="mt-5 grid gap-5 lg:grid-cols-[1.4fr_0.8fr]">
          {/* Left */}
          <div className="space-y-5">
            {/* Tracking timeline */}
            <InfoCard icon={Truck} title="Shipment timeline">
              <div className="relative">
                <div className="absolute bottom-8 left-[15px] top-8 w-px bg-slate-200" />

                <TimelineStep
                  title="Procurement awarded"
                  detail={`${order.orderDate} · RFQ ${order.rfq}`}
                  done
                />

                <TimelineStep
                  title="Digital contract signed"
                  detail="Buyer and supplier agreement verified"
                  done
                />

                <TimelineStep
                  title="Payment secured"
                  detail="Funds protected under procurement terms"
                  done
                />

                <TimelineStep
                  title="Quality inspection"
                  detail={
                    order.status === "Quality Check"
                      ? "Inspection currently in progress"
                      : "Quality report approved"
                  }
                  done={order.progress >= 48}
                  active={order.status === "Quality Check"}
                />

                <TimelineStep
                  title="Shipment in transit"
                  detail={
                    order.status === "In Transit"
                      ? order.lastUpdate
                      : "Shipment stage"
                  }
                  done={order.progress >= 72}
                  active={order.status === "In Transit"}
                />

                <TimelineStep
                  title="Delivery"
                  detail={`Expected ${order.eta}`}
                  done={order.progress === 100}
                />
              </div>
            </InfoCard>

            {/* Route */}
            <InfoCard icon={MapPin} title="Farm-to-buyer route">
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-800">
                      Origin
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {order.farmerLocation}
                    </p>
                  </div>

                  <div className="rounded-full bg-emerald-100 p-2 text-emerald-700">
                    <MapPin size={15} />
                  </div>
                </div>

                <div className="my-5 flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full border-2 border-emerald-600 bg-white" />

                  <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-slate-200">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${order.progress}%` }}
                      transition={{ duration: 1 }}
                      className="h-full rounded-full bg-emerald-500"
                    />
                  </div>

                  <Truck
                    size={19}
                    className="shrink-0 text-emerald-700"
                  />

                  <div className="h-1 flex-1 rounded-full bg-slate-200" />

                  <div className="h-3 w-3 rounded-full bg-slate-300" />
                </div>

                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-800">
                      Shipment
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {order.distance}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-800">
                      Destination
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {order.destination}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-slate-100 p-2 text-slate-600">
                    <Truck size={16} />
                  </div>

                  <div>
                    <p className="text-xs font-bold text-slate-800">
                      Vehicle {order.truck}
                    </p>
                    <p className="mt-0.5 text-[10px] text-slate-400">
                      Commercial transport
                    </p>
                  </div>
                </div>

                <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-50">
                  <Phone size={15} />
                </button>
              </div>
            </InfoCard>

            {/* Quality */}
            <InfoCard icon={BadgeCheck} title="Quality & lab verification">
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  ["Quality score", order.quality],
                  ["Moisture", order.moisture],
                  ["Impurity", order.impurity],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-xl bg-slate-50 p-4"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                      {label}
                    </p>

                    <p className="mt-1.5 text-lg font-bold text-slate-900">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex flex-col justify-between gap-3 rounded-xl border border-emerald-100 bg-emerald-50/50 p-4 sm:flex-row sm:items-center">
                <div className="flex gap-3">
                  <ShieldCheck
                    size={18}
                    className="mt-0.5 text-emerald-700"
                  />

                  <div>
                    <p className="text-xs font-bold text-slate-800">
                      Digital quality certificate
                    </p>

                    <p className="mt-1 text-[11px] text-slate-500">
                      Inspection data linked to this procurement lot.
                    </p>
                  </div>
                </div>

                <button className="flex items-center gap-1 text-xs font-semibold text-emerald-700">
                  View report
                  <ChevronRight size={14} />
                </button>
              </div>
            </InfoCard>
          </div>

          {/* Right */}
          <div className="space-y-5">
            {/* Supplier */}
            <InfoCard icon={UserRound} title="Supplier">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-sm font-bold text-emerald-700">
                  {order.farmer
                    .split(" ")
                    .map((word) => word[0])
                    .join("")}
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-bold text-slate-900">
                      {order.farmer}
                    </p>
                    <BadgeCheck
                      size={15}
                      className="text-emerald-600"
                    />
                  </div>

                  <p className="mt-1 text-xs text-slate-500">
                    Verified supplier
                  </p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-[10px] text-slate-400">
                    Origin
                  </p>
                  <p className="mt-1 text-xs font-semibold text-slate-800">
                    {order.farmerLocation}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-[10px] text-slate-400">
                    Verification
                  </p>
                  <p className="mt-1 text-xs font-semibold text-emerald-700">
                    Complete
                  </p>
                </div>
              </div>

              <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50">
                View supplier profile
                <ChevronRight size={14} />
              </button>
            </InfoCard>

            {/* Payment */}
            <InfoCard icon={IndianRupee} title="Payment & escrow">
              <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck
                    size={17}
                    className="text-emerald-700"
                  />

                  <p className="text-xs font-bold text-emerald-800">
                    {order.paymentStatus}
                  </p>
                </div>

                <p className="mt-2 text-2xl font-bold text-slate-950">
                  {money(order.total)}
                </p>

                <p className="mt-1 text-[11px] text-slate-500">
                  Protected until agreed delivery and quality conditions
                  are satisfied.
                </p>
              </div>

              <div className="mt-4 space-y-3">
                {[
                  ["Contract value", money(order.total)],
                  ["Escrow status", "Protected"],
                  ["Release condition", "Delivery + quality"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex justify-between gap-4 text-xs"
                  >
                    <span className="text-slate-500">{label}</span>
                    <span className="font-semibold text-slate-800">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </InfoCard>

            {/* Contract */}
            <InfoCard icon={FileCheck2} title="Digital contract">
              <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                <div>
                  <p className="text-xs font-bold text-slate-800">
                    Procurement Agreement
                  </p>
                  <p className="mt-1 text-[10px] text-slate-400">
                    Contract linked to {order.rfq}
                  </p>
                </div>

                <span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-bold text-emerald-700">
                  Signed
                </span>
              </div>

              <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50">
                <FileText size={14} />
                Open contract
              </button>
            </InfoCard>

            {/* Protection */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex gap-3">
                <div className="rounded-xl bg-amber-50 p-2.5 text-amber-700">
                  <ShieldCheck size={18} />
                </div>

                <div>
                  <p className="text-sm font-bold text-slate-900">
                    Procurement protection
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Quality mismatch or delivery issues can be recorded
                    against the digital procurement agreement.
                  </p>
                </div>
              </div>

              <button className="mt-4 w-full rounded-xl border border-slate-200 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50">
                Report an issue
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}