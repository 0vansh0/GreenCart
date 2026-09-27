import { useState } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";

export default function BuyerRegister() {
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const redirectTo = params.get("redirect") || "/marketplace";

  const [form, setForm] = useState({
    company: "",
    name: "",
    email: "",
    phone: "",
    location: "",
    password: "",
    confirmPassword: "",
  });

  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (
      !form.company.trim() ||
      !form.name.trim() ||
      !form.email.trim() ||
      !form.phone.trim() ||
      !form.location.trim() ||
      !form.password ||
      !form.confirmPassword
    ) {
      setError("Please complete all required fields.");
      return;
    }

    if (!form.email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!agree) {
      setError("Please accept the terms to continue.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      // Frontend-only buyer account
      localStorage.setItem("greencart_buyer_auth", "true");

      localStorage.setItem(
        "greencart_buyer",
        JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          phone: form.phone,
          location: form.location,
        })
      );

      /*
       * Restore an item that was waiting for authentication.
       */
      const pendingItem = localStorage.getItem(
        "greencart_pending_cart_item"
      );

      if (pendingItem) {
        try {
          const item = JSON.parse(pendingItem);

          const cart = JSON.parse(
            localStorage.getItem("greencart_cart") || "[]"
          );

          const existingIndex = cart.findIndex(
            (cartItem) =>
              String(cartItem.id) === String(item.id) &&
              Number(cartItem.price) === Number(item.price)
          );

          if (existingIndex >= 0) {
            cart[existingIndex].quantity =
              Number(cart[existingIndex].quantity || 0) +
              Number(item.quantity || 0);
          } else {
            cart.push(item);
          }

          localStorage.setItem(
            "greencart_cart",
            JSON.stringify(cart)
          );

          localStorage.removeItem(
            "greencart_pending_cart_item"
          );
        } catch (err) {
          console.error("Could not restore cart item:", err);
        }
      }

      setLoading(false);

      navigate(redirectTo);
    }, 900);
  };

  return (
    <div className="min-h-screen bg-[#f7f9f5] text-slate-900">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-emerald-200/30 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-green-200/30 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-5 py-8 sm:px-8 lg:px-10">
        <div className="grid w-full overflow-hidden rounded-[32px] border border-slate-200/80 bg-white shadow-[0_25px_80px_rgba(15,23,42,0.08)] lg:grid-cols-2">
          {/* LEFT PANEL */}
          <div className="relative hidden min-h-[760px] overflow-hidden bg-[#064e3b] p-10 text-white lg:flex lg:flex-col lg:justify-between">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-green-300/10 blur-3xl" />

            <div className="relative">
              {/* Logo */}
              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-3"
              >
                <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-white/10 ring-1 ring-white/15 backdrop-blur">
                  <img src="/Green_cart.png" alt="GreenCart logo" className="h-full w-full object-contain" />
                </div>

                <div className="text-left">
                  <p className="text-lg font-bold tracking-tight">
                    GreenCart
                  </p>
                  <p className="text-xs text-emerald-100/70">
                    B2B Agriculture Marketplace
                  </p>
                </div>
              </button>

              <div className="mt-28 max-w-md">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-medium text-emerald-50 backdrop-blur">
                  <ShieldCheck size={14} />
                  Verified procurement platform
                </div>

                <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight xl:text-5xl">
                  Build your
                  <br />
                  procurement network.
                </h1>

                <p className="mt-6 max-w-sm text-sm leading-7 text-emerald-50/70">
                  Create your buyer profile to discover agricultural
                  lots, compare offers, negotiate with farmers and
                  manage procurement.
                </p>
              </div>
            </div>

            <div className="relative space-y-3">
              {[
                "Verified farmer marketplace",
                "Transparent price benchmarks",
                "Direct B2B negotiation",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm text-emerald-50/80"
                >
                  <CheckCircle2
                    size={17}
                    className="shrink-0 text-emerald-300"
                  />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="flex min-h-[760px] items-center justify-center p-6 sm:p-10 lg:p-12">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="w-full max-w-lg"
            >
              {/* Mobile logo */}
              <div className="mb-8 flex items-center gap-3 lg:hidden">
                <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-[#064e3b]">
                  <img src="/Green_cart.png" alt="GreenCart logo" className="h-full w-full object-contain" />
                </div>

                <div>
                  <p className="font-bold">GreenCart</p>
                  <p className="text-xs text-slate-500">
                    B2B Agriculture Marketplace
                  </p>
                </div>
              </div>

              {/* Heading */}
              <div>
                <p className="mb-2 text-sm font-medium text-emerald-700">
                  Buyer registration
                </p>

                <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
                  Create your account
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Set up your procurement profile to start sourcing
                  directly from verified agricultural lots.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="mt-7 space-y-4"
              >
                {/* Company */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Company / Organization
                  </label>

                  <div className="relative">
                    <Building2
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      value={form.company}
                      onChange={(e) =>
                        updateField("company", e.target.value)
                      }
                      placeholder="e.g. FreshMart Foods"
                      className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-11 pr-4 text-sm outline-none transition focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-600/10"
                    />
                  </div>
                </div>

                {/* Name + Phone */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Contact person
                    </label>

                    <input
                      value={form.name}
                      onChange={(e) =>
                        updateField("name", e.target.value)
                      }
                      placeholder="Your name"
                      className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 text-sm outline-none transition focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-600/10"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Phone
                    </label>

                    <div className="relative">
                      <Phone
                        size={16}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        value={form.phone}
                        onChange={(e) =>
                          updateField("phone", e.target.value)
                        }
                        placeholder="+91 98765..."
                        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-600/10"
                      />
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Business email
                  </label>

                  <div className="relative">
                    <Mail
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        updateField("email", e.target.value)
                      }
                      placeholder="you@company.com"
                      className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-11 pr-4 text-sm outline-none transition focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-600/10"
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Procurement location
                  </label>

                  <div className="relative">
                    <MapPin
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      value={form.location}
                      onChange={(e) =>
                        updateField("location", e.target.value)
                      }
                      placeholder="City, State"
                      className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-11 pr-4 text-sm outline-none transition focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-600/10"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Password
                    </label>

                    <input
                      type="password"
                      value={form.password}
                      onChange={(e) =>
                        updateField("password", e.target.value)
                      }
                      placeholder="Minimum 6 characters"
                      className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 text-sm outline-none transition focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-600/10"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Confirm password
                    </label>

                    <input
                      type="password"
                      value={form.confirmPassword}
                      onChange={(e) =>
                        updateField(
                          "confirmPassword",
                          e.target.value
                        )
                      }
                      placeholder="Repeat password"
                      className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 text-sm outline-none transition focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-600/10"
                    />
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
                  >
                    {error}
                  </motion.div>
                )}

                {/* Terms */}
                <label className="flex cursor-pointer items-start gap-3 pt-1">
                  <input
                    type="checkbox"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-slate-300 accent-emerald-700"
                  />

                  <span className="text-xs leading-5 text-slate-500">
                    I agree to GreenCart's Terms of Service and
                    acknowledge the procurement marketplace policies.
                  </span>
                </label>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#064e3b] text-sm font-semibold text-white shadow-lg shadow-emerald-900/10 transition hover:bg-[#053f30] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      Create buyer account
                      <ArrowRight
                        size={17}
                        className="transition-transform group-hover:translate-x-0.5"
                      />
                    </>
                  )}
                </button>
              </form>

              {/* Login */}
              <div className="mt-7 flex items-center justify-center gap-1.5 text-sm text-slate-500">
                <span>Already have an account?</span>

                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      `/buyer/login?redirect=${encodeURIComponent(
                        redirectTo
                      )}`
                    )
                  }
                  className="font-semibold text-emerald-700 hover:text-emerald-800"
                >
                  Sign in
                </button>
              </div>

              {/* Security */}
              <div className="mt-7 flex items-center justify-center gap-2 text-xs text-slate-400">
                <LockKeyhole size={13} />
                Secure buyer account
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}