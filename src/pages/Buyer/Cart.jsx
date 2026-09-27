import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingCart,
  Trash2,
  Truck,
  MapPin,
  PackageCheck,
  Sparkles,
  Volume2,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";

import BuyerHeader from "../../components/BuyerHeader";
import { useCart } from "../../context/CartContext";

const formatPrice = (value) =>
  `₹${Number(value || 0).toLocaleString("en-IN")}`;

export default function Cart() {
  const navigate = useNavigate();

  const {
    cart: cartItems = [],
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCart();

  const [destination, setDestination] = useState("Patna, Bihar");

  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (total, item) =>
          total + Number(item.price || 0) * Number(item.quantity || 1),
        0
      ),
    [cartItems]
  );

  const logisticsCost = useMemo(() => {
    if (!cartItems.length) return 0;

    const totalQuantity = cartItems.reduce(
      (total, item) => total + Number(item.quantity || 1),
      0
    );

    if (destination.toLowerCase().includes("patna")) {
      return Math.round(totalQuantity * 65);
    }

    return Math.round(totalQuantity * 90);
  }, [cartItems, destination]);

  const total = subtotal + logisticsCost;

  const totalItems = cartItems.reduce(
    (total, item) => total + Number(item.quantity || 1),
    0
  );

  const handleQuantity = (item, nextQuantity) => {
    if (nextQuantity <= 0) {
      removeFromCart(item.id);
      return;
    }

    updateQuantity(item.id, nextQuantity);
  };

  return (
    <div className="min-h-screen bg-[#F8FAF7] text-[#172117] selection:bg-[#2E7D32] selection:text-white">
      <BuyerHeader />

      <main className="mx-auto max-w-[1380px] px-5 py-7 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs font-bold text-[#5F6E5E]">
          <button
            onClick={() => navigate("/marketplace")}
            className="transition hover:text-[#2E7D32]"
          >
            Marketplace
          </button>

          <ChevronRight size={14} />

          <span className="text-[#172117]">Cart</span>
        </div>

        {/* Empty Cart */}
        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-xl rounded-[28px] border border-[#E2E8DF] bg-white p-10 text-center shadow-sm"
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-[24px] bg-[#E8F5E9] text-[#2E7D32]">
              <ShoppingCart size={32} />
            </div>

            <h1 className="text-2xl font-extrabold tracking-tight text-[#172117]">
              Your cart is empty
            </h1>

            <p className="mt-2 text-xs leading-relaxed text-[#5F6E5E]">
              Browse verified agricultural lots and add produce you want to
              purchase.
            </p>

            <button
              onClick={() => navigate("/marketplace")}
              className="mt-6 inline-flex h-12 items-center gap-2 rounded-2xl bg-[#2E7D32] px-6 text-xs font-extrabold text-white shadow-md shadow-[#2E7D32]/20 transition hover:bg-[#1B5E20]"
            >
              Browse Marketplace
              <ArrowRight size={16} />
            </button>
          </motion.div>
        ) : (
          <>
            {/* Header */}
            <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <span className="inline-flex rounded-full bg-[#E8F5E9] px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-[#2E7D32]">
                  Procurement
                </span>

                <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-[#172117] lg:text-[34px]">
                  Your cart
                </h1>

                <p className="mt-1 text-xs font-medium text-[#7A8A78]">
                  {totalItems} produce{" "}
                  {totalItems === 1 ? "unit" : "units"} ready for purchase.
                </p>
              </div>

              <button
                onClick={clearCart}
                className="inline-flex items-center gap-2 self-start rounded-2xl border border-[#E2E8DF] bg-white px-4 py-2.5 text-xs font-bold text-[#5F6E5E] transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 md:self-auto shadow-sm"
              >
                <Trash2 size={15} />
                Clear cart
              </button>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1fr_420px] items-start">
              {/* LEFT */}
              <section className="space-y-4">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="rounded-[28px] border border-[#E2E8DF] bg-white p-5 shadow-sm"
                  >
                    <div className="flex gap-4">
                      {/* Image */}
                      <div className="h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-[#F8FAF7] border border-[#E2E8DF]">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      {/* Content */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="mb-1.5 flex flex-wrap items-center gap-2">
                              <span className="rounded-full bg-[#E8F5E9] px-2.5 py-1 text-[10px] font-extrabold text-[#2E7D32]">
                                Verified lot
                              </span>

                              {item.location && (
                                <span className="flex items-center gap-1 text-xs font-medium text-[#7A8A78]">
                                  <MapPin size={13} className="text-[#2E7D32]" />
                                  {item.location}
                                </span>
                              )}
                            </div>

                            <button
                              onClick={() =>
                                navigate(`/product/${item.id}`)
                              }
                              className="text-left text-base font-extrabold text-[#172117] transition hover:text-[#2E7D32]"
                            >
                              {item.name}
                            </button>

                            {item.farmerName && (
                              <p className="mt-0.5 text-xs text-[#5F6E5E]">
                                Sold by {item.farmerName}
                              </p>
                            )}
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="rounded-xl p-2.5 text-[#5F6E5E] transition hover:bg-red-50 hover:text-red-600"
                            title="Remove"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                        <div className="mt-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-[#7A8A78]">
                              Price per unit
                            </p>

                            <p className="mt-0.5 text-base font-black text-[#172117]">
                              {formatPrice(item.price)}
                            </p>
                          </div>

                          {/* Quantity */}
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-bold uppercase tracking-wider text-[#3D493D]">
                              Quantity
                            </span>

                            <div className="flex h-11 items-center rounded-2xl border border-[#E2E8DF] bg-[#F8FAF7] px-2">
                              <button
                                onClick={() =>
                                  handleQuantity(
                                    item,
                                    Number(item.quantity || 1) - 1
                                  )
                                }
                                className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-[#5F6E5E] shadow-sm transition hover:text-[#2E7D32]"
                              >
                                <Minus size={14} />
                              </button>

                              <span className="w-10 text-center text-xs font-extrabold text-[#172117]">
                                {item.quantity || 1} Qtl
                              </span>

                              <button
                                onClick={() =>
                                  handleQuantity(
                                    item,
                                    Number(item.quantity || 1) + 1
                                  )
                                }
                                className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-[#5F6E5E] shadow-sm transition hover:text-[#2E7D32]"
                              >
                                <Plus size={14} />
                              </button>
                            </div>

                            <div className="text-right">
                              <p className="text-[10px] font-bold uppercase tracking-wider text-[#7A8A78]">
                                Line total
                              </p>

                              <p className="text-base font-black text-[#1B5E20]">
                                {formatPrice(
                                  Number(item.price || 0) *
                                    Number(item.quantity || 1)
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Continue shopping */}
                <button
                  onClick={() => navigate("/marketplace")}
                  className="inline-flex items-center gap-2 px-1 py-2 text-xs font-extrabold text-[#2E7D32] transition hover:text-[#1B5E20]"
                >
                  <ArrowLeft size={15} />
                  Continue shopping
                </button>
              </section>

              {/* RIGHT */}
              <aside className="space-y-4">
                {/* Delivery */}
                <div className="rounded-[28px] border border-[#E2E8DF] bg-white p-6 shadow-sm">
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E8F5E9] text-[#2E7D32]">
                      <Truck size={20} />
                    </div>

                    <div>
                      <h2 className="text-sm font-extrabold text-[#172117]">
                        Delivery destination
                      </h2>

                      <p className="text-xs font-medium text-[#7A8A78]">
                        Estimate your land-to-door cost
                      </p>
                    </div>
                  </div>

                  <label className="mt-5 block text-xs font-bold uppercase tracking-wider text-[#3D493D]">
                    Destination
                  </label>

                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="mt-2 h-12 w-full rounded-2xl border border-[#E2E8DF] bg-[#F8FAF7] px-4 text-xs font-bold text-[#172117] outline-none transition focus:border-[#2E7D32] focus:bg-white focus:ring-4 focus:ring-[#2E7D32]/10"
                  >
                    <option>Patna, Bihar</option>
                    <option>Muzaffarpur, Bihar</option>
                    <option>Gaya, Bihar</option>
                    <option>Darbhanga, Bihar</option>
                    <option>Other Bihar</option>
                  </select>

                  <div className="mt-4 flex items-start gap-3 rounded-2xl bg-[#F8FAF7] p-4 border border-[#E2E8DF]">
                    <PackageCheck
                      size={18}
                      className="mt-0.5 shrink-0 text-[#2E7D32]"
                    />

                    <p className="text-xs leading-relaxed text-[#5F6E5E]">
                      Logistics is an indicative estimate. Final freight can
                      change based on distance, vehicle capacity and negotiated
                      terms.
                    </p>
                  </div>
                </div>

                {/* Summary */}
                <div className="rounded-[28px] border border-[#E2E8DF] bg-white p-6 shadow-sm">
                  <h2 className="text-base font-extrabold text-[#172117]">Order summary</h2>

                  <div className="mt-5 space-y-3.5 text-xs">
                    <div className="flex justify-between font-medium">
                      <span className="text-[#7A8A78]">Produce value</span>
                      <span className="font-bold text-[#172117]">
                        {formatPrice(subtotal)}
                      </span>
                    </div>

                    <div className="flex justify-between font-medium">
                      <span className="text-[#7A8A78]">
                        Estimated logistics
                      </span>
                      <span className="font-bold text-[#172117]">
                        {formatPrice(logisticsCost)}
                      </span>
                    </div>

                    <div className="border-t border-[#E2E8DF] pt-4">
                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-[#7A8A78]">
                            Estimated total
                          </p>

                          <p className="mt-1 text-2xl font-black tracking-tight text-[#172117]">
                            {formatPrice(total)}
                          </p>
                        </div>

                        <span className="rounded-full bg-[#E8F5E9] px-3 py-1 text-[10px] font-extrabold text-[#2E7D32]">
                          Indicative
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate("/buyer/offers-received")}
                    className="mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#2E7D32] text-xs font-extrabold text-white shadow-md shadow-[#2E7D32]/20 transition hover:-translate-y-0.5 hover:bg-[#1B5E20]"
                  >
                    Continue to Purchase
                    <ArrowRight size={16} />
                  </button>

                  <div className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold text-[#5F6E5E]">
                    <ShieldCheck size={15} className="text-[#2E7D32]" />
                    Protected transaction workflow
                  </div>
                </div>

                {/* GreenCart Guarantee */}
                <div className="rounded-[28px] border border-[#C5D1C3] bg-gradient-to-br from-[#E8F5E9]/60 to-white p-6 shadow-sm">
                  <div className="flex gap-3.5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-[#2E7D32] shadow-sm border border-[#C5D1C3]">
                      <CheckCircle2 size={19} />
                    </div>

                    <div>
                      <h3 className="text-xs font-extrabold text-[#1B5E20]">
                        GreenCart Quality Guarantee
                      </h3>

                      <p className="mt-1 text-xs leading-relaxed text-[#3D493D]">
                        Quality, quantity and delivery terms are recorded
                        before the transaction is finalized.
                      </p>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </>
        )}
      </main>
    </div>
  );
}