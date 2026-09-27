import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calculator,
  IndianRupee,
  Info,
  RotateCcw,
  TrendingUp,
  Truck,
  Package,
  WalletCards,
} from "lucide-react";
import { useNavigate } from "react-router";

const buyerPresets = [
  {
    buyer: "FreshMart",
    price: 2920,
    freight: 85,
    handling: 20,
    payment: "50% upfront",
  },
  {
    buyer: "Bharat Agro",
    price: 2850,
    freight: 55,
    handling: 15,
    payment: "Net 7 days",
  },
  {
    buyer: "Kisan Supply Co.",
    price: 2780,
    freight: 70,
    handling: 10,
    payment: "100% delivery",
  },
];

export default function NetRealizationCalculator() {
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(50);
  const [price, setPrice] = useState(2920);
  const [freight, setFreight] = useState(85);
  const [handling, setHandling] = useState(20);
  const [otherCosts, setOtherCosts] = useState(0);
  const [buyer, setBuyer] = useState("FreshMart");

  const calculations = useMemo(() => {
    const grossPerQtl = Number(price) || 0;
    const freightPerQtl = Number(freight) || 0;
    const handlingPerQtl = Number(handling) || 0;
    const otherPerQtl = Number(otherCosts) || 0;
    const qty = Number(quantity) || 0;

    const netPerQtl =
      grossPerQtl - freightPerQtl - handlingPerQtl - otherPerQtl;

    const grossTotal = grossPerQtl * qty;
    const totalCosts =
      (freightPerQtl + handlingPerQtl + otherPerQtl) * qty;
    const netTotal = netPerQtl * qty;

    const costPercentage =
      grossTotal > 0 ? (totalCosts / grossTotal) * 100 : 0;

    return {
      grossPerQtl,
      netPerQtl,
      grossTotal,
      totalCosts,
      netTotal,
      costPercentage,
    };
  }, [quantity, price, freight, handling, otherCosts]);

  const applyBuyer = (preset) => {
    setBuyer(preset.buyer);
    setPrice(preset.price);
    setFreight(preset.freight);
    setHandling(preset.handling);
  };

  const resetCalculator = () => {
    setBuyer("FreshMart");
    setQuantity(50);
    setPrice(2920);
    setFreight(85);
    setHandling(20);
    setOtherCosts(0);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 lg:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/farmer/dashboard")}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 hover:text-emerald-700"
            >
              <ArrowLeft size={19} />
            </button>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
                Farmer Tools
              </p>
              <h1 className="text-xl font-bold tracking-tight">
                Net Realization Calculator
              </h1>
            </div>
          </div>

          <button
            onClick={resetCalculator}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            <RotateCcw size={15} />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-5 py-7 lg:px-8">
        {/* Intro */}
        <section className="mb-7">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
            <Calculator size={14} />
            Decision Intelligence
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-slate-950">
            What will you actually earn?
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Compare buyer offers after freight, handling and additional
            expenses. GreenCart helps you focus on the amount that reaches
            your pocket.
          </p>
        </section>

        {/* Buyer presets */}
        <section className="mb-6">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800">
              Compare buyer offers
            </h3>

            <span className="text-xs text-slate-400">
              Select a buyer to load their offer
            </span>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {buyerPresets.map((preset) => {
              const active = buyer === preset.buyer;

              const presetNet =
                preset.price - preset.freight - preset.handling;

              return (
                <button
                  key={preset.buyer}
                  onClick={() => applyBuyer(preset)}
                  className={`text-left rounded-2xl border p-4 transition ${
                    active
                      ? "border-emerald-300 bg-emerald-50/70 shadow-sm"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">
                      {preset.buyer}
                    </span>

                    {active && (
                      <span className="rounded-full bg-emerald-600 px-2 py-1 text-[10px] font-bold text-white">
                        Selected
                      </span>
                    )}
                  </div>

                  <div className="mt-3 flex items-end justify-between">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                        Offer
                      </p>

                      <p className="text-lg font-bold">
                        ₹{preset.price.toLocaleString("en-IN")}
                        <span className="text-xs font-normal text-slate-400">
                          /Qtl
                        </span>
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                        Estimated net
                      </p>

                      <p className="text-sm font-bold text-emerald-700">
                        ₹{presetNet.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Calculator */}
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm lg:p-6"
          >
            <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <Calculator size={19} />
              </div>

              <div>
                <h3 className="font-bold text-slate-950">
                  Sale details
                </h3>

                <p className="text-xs text-slate-500">
                  Adjust the numbers to match your actual deal.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <InputField
                label="Quantity"
                value={quantity}
                setValue={setQuantity}
                suffix="Qtl"
              />

              <InputField
                label="Buyer price"
                value={price}
                setValue={setPrice}
                prefix="₹"
                suffix="/Qtl"
              />

              <InputField
                label="Freight"
                value={freight}
                setValue={setFreight}
                prefix="₹"
                suffix="/Qtl"
              />

              <InputField
                label="Handling"
                value={handling}
                setValue={setHandling}
                prefix="₹"
                suffix="/Qtl"
              />

              <div className="sm:col-span-2">
                <InputField
                  label="Other costs"
                  value={otherCosts}
                  setValue={setOtherCosts}
                  prefix="₹"
                  suffix="/Qtl"
                />
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50/60 p-4">
              <div className="flex gap-3">
                <Info
                  size={17}
                  className="mt-0.5 shrink-0 text-blue-600"
                />

                <div>
                  <p className="text-sm font-semibold text-blue-900">
                    How GreenCart calculates it
                  </p>

                  <p className="mt-1 text-xs leading-5 text-blue-700">
                    Net realization = Buyer price − Freight − Handling −
                    Other costs.
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Result */}
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm lg:p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Selected buyer
                </p>

                <h3 className="mt-1 text-xl font-bold text-slate-950">
                  {buyer}
                </h3>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <WalletCards size={19} />
              </div>
            </div>

            {/* Main result */}
            <div className="mt-6 rounded-2xl bg-[#064E3B] p-6 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-200">
                Expected net realization
              </p>

              <div className="mt-2 flex items-end gap-2">
                <span className="text-4xl font-bold tracking-tight">
                  ₹{calculations.netPerQtl.toLocaleString("en-IN")}
                </span>

                <span className="mb-1 text-sm text-emerald-200">
                  /Qtl
                </span>
              </div>

              <div className="mt-5 flex items-center gap-2 text-sm text-emerald-100">
                <TrendingUp size={16} />
                Estimated total:
                <strong className="text-white">
                  ₹{calculations.netTotal.toLocaleString("en-IN")}
                </strong>
              </div>
            </div>

            {/* Breakdown */}
            <div className="mt-6 space-y-3">
              <BreakdownRow
                label="Buyer offer"
                value={calculations.grossPerQtl}
              />

              <BreakdownRow
                label="Freight"
                value={freight}
                negative
              />

              <BreakdownRow
                label="Handling"
                value={handling}
                negative
              />

              <BreakdownRow
                label="Other costs"
                value={otherCosts}
                negative
              />

              <div className="border-t border-slate-100 pt-4">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">
                    Net realization
                  </span>

                  <span className="text-lg font-bold text-emerald-700">
                    ₹{calculations.netPerQtl.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>

            {/* Cost impact */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <MiniMetric
                label="Total costs"
                value={`₹${calculations.totalCosts.toLocaleString(
                  "en-IN"
                )}`}
                icon={<Truck size={15} />}
              />

              <MiniMetric
                label="Cost impact"
                value={`${calculations.costPercentage.toFixed(1)}%`}
                icon={<Package size={15} />}
              />
            </div>
          </motion.section>
        </div>

        {/* Decision strip */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-6 overflow-hidden rounded-2xl border border-emerald-100 bg-emerald-50/70"
        >
          <div className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
            <div className="flex gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-700 shadow-sm">
                <TrendingUp size={18} />
              </div>

              <div>
                <p className="font-bold text-emerald-950">
                  Use net value when comparing buyers
                </p>

                <p className="mt-1 max-w-2xl text-xs leading-5 text-emerald-800">
                  A buyer offering a higher headline price may still provide
                  less money after freight, handling and payment conditions.
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate("/farmer/rfqs")}
              className="shrink-0 rounded-xl bg-[#064E3B] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#053f30]"
            >
              Compare RFQs
            </button>
          </div>
        </motion.section>
      </main>
    </div>
  );
}

function InputField({
  label,
  value,
  setValue,
  prefix,
  suffix,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>

      <div className="relative">
        {prefix && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400">
            {prefix}
          </span>
        )}

        <input
          type="number"
          min="0"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={`h-12 w-full rounded-xl border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 ${
            prefix ? "pl-9" : "pl-4"
          } ${suffix ? "pr-16" : "pr-4"}`}
        />

        {suffix && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

function BreakdownRow({ label, value, negative }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-slate-500">{label}</span>

      <span
        className={`font-semibold ${
          negative ? "text-red-500" : "text-slate-900"
        }`}
      >
        {negative ? "− " : ""}
        ₹{Number(value || 0).toLocaleString("en-IN")}
      </span>
    </div>
  );
}

function MiniMetric({ label, value, icon }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
      <div className="flex items-center gap-2 text-slate-400">
        {icon}
        <span className="text-[10px] font-semibold uppercase tracking-wider">
          {label}
        </span>
      </div>

      <p className="mt-1 text-sm font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}