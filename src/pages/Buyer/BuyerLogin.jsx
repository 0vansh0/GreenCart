import { useState } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router";

import {
  ArrowRight,
  CheckCircle2,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";

import { useBuyerAuth } from "../../context/BuyerAuthContext";

export default function BuyerLogin() {
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useBuyerAuth();

  /*
   * Supports both:
   *
   * /buyer/login?redirect=/product/1
   *
   * and navigation state:
   *
   * navigate("/buyer/login", {
   *   state: {
   *     from: "/product/1",
   *     action: "add-to-cart"
   *   }
   * })
   */
  const params = new URLSearchParams(location.search);

  const redirectFromQuery =
    params.get("redirect") || null;

  const redirectFromState =
    location.state?.from || null;

  const redirectTo =
    redirectFromQuery ||
    redirectFromState ||
    "/marketplace";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    setError("");

    /*
     * Validation
     */
    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    /*
     * Frontend-only login simulation
     */
    setTimeout(() => {
      /*
       * IMPORTANT:
       * This updates BuyerAuthContext immediately.
       *
       * This is what makes BuyerHeader change
       * from "Login" to the buyer profile without
       * requiring a page refresh.
       */
      login({
        name: "Buyer",
        email: email.trim(),
        company: "GreenCart Buyer",
      });

      /*
       * Restore pending cart item
       *
       * ProductDetails can save an item here
       * when the buyer tries to add something
       * before logging in.
       */
      const pendingItem = localStorage.getItem(
        "greencart_pending_cart_item"
      );

      if (pendingItem) {
        try {
          const item = JSON.parse(pendingItem);

          const existingCart = JSON.parse(
            localStorage.getItem("greencart_cart") || "[]"
          );

          const existingIndex = existingCart.findIndex(
            (cartItem) =>
              String(cartItem.id) === String(item.id) &&
              Number(cartItem.price) === Number(item.price)
          );

          if (existingIndex >= 0) {
            existingCart[existingIndex].quantity =
              Number(
                existingCart[existingIndex].quantity || 0
              ) +
              Number(item.quantity || 0);
          } else {
            existingCart.push(item);
          }

          localStorage.setItem(
            "greencart_cart",
            JSON.stringify(existingCart)
          );

          localStorage.removeItem(
            "greencart_pending_cart_item"
          );
        } catch (err) {
          console.error(
            "Could not restore pending cart item:",
            err
          );
        }
      }

      setLoading(false);

      /*
       * Return to the page where the buyer came from.
       */
      navigate(redirectTo, {
        replace: true,
      });
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#f7f9f5] text-[#172117]">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-emerald-200/30 blur-3xl" />

        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-green-200/30 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-5 py-8 sm:px-8 lg:px-10">
        <div className="grid w-full overflow-hidden rounded-[32px] border border-slate-200/80 bg-white shadow-[0_25px_80px_rgba(15,23,42,0.08)] lg:grid-cols-2">
          {/* ================================================== */}
          {/* LEFT PANEL */}
          {/* ================================================== */}

          <div className="relative hidden min-h-[680px] overflow-hidden bg-[#064e3b] p-10 text-white lg:flex lg:flex-col lg:justify-between">
            {/* Decorative shapes */}
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />

            <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-green-300/10 blur-3xl" />

            <div className="relative">
              {/* Logo */}
              <button
                type="button"
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

              {/* Main message */}
              <div className="mt-28 max-w-md">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-medium text-emerald-50 backdrop-blur">
                  <ShieldCheck size={14} />

                  Verified procurement platform
                </div>

                <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight xl:text-5xl">
                  Buy smarter.
                  <br />
                  Source directly.
                </h1>

                <p className="mt-6 max-w-sm text-sm leading-7 text-emerald-50/70">
                  Connect with verified farmers, compare real
                  net realization, negotiate directly and
                  manage your agricultural procurement from
                  one place.
                </p>
              </div>
            </div>

            {/* Benefits */}
            <div className="relative space-y-3">
              {[
                "Verified farmer profiles",
                "Transparent mandi benchmarks",
                "Quality & logistics information",
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

          {/* ================================================== */}
          {/* RIGHT PANEL */}
          {/* ================================================== */}

          <div className="flex min-h-[680px] items-center justify-center p-6 sm:p-10 lg:p-14">
            <motion.div
              initial={{
                opacity: 0,
                y: 18,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.45,
              }}
              className="w-full max-w-md"
            >
              {/* Mobile logo */}
              <div className="mb-10 flex items-center gap-3 lg:hidden">
                <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-[#064e3b]">
                  <img src="/Green_cart.png" alt="GreenCart logo" className="h-full w-full object-contain" />
                </div>

                <div>
                  <p className="font-bold">
                    GreenCart
                  </p>

                  <p className="text-xs text-slate-500">
                    B2B Agriculture Marketplace
                  </p>
                </div>
              </div>

              {/* Heading */}
              <div>
                <p className="mb-3 text-sm font-medium text-emerald-700">
                  Buyer account
                </p>

                <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
                  Welcome back
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Sign in to add products to your cart, make
                  offers and manage your procurement.
                </p>
              </div>

              {/* Form */}
              <form
                onSubmit={handleLogin}
                className="mt-8 space-y-5"
              >
                {/* Email */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Email address
                  </label>

                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="email"
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                      placeholder="you@company.com"
                      autoComplete="email"
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-11 pr-4 text-sm outline-none transition focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-600/10"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Password
                  </label>

                  <div className="relative">
                    <LockKeyhole
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="password"
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-11 pr-4 text-sm outline-none transition focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-600/10"
                    />
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -5,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
                  >
                    {error}
                  </motion.div>
                )}

                {/* Remember */}
                <div className="flex items-center justify-between">
                  <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-500">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={(e) =>
                        setRemember(e.target.checked)
                      }
                      className="h-4 w-4 rounded border-slate-300 accent-emerald-700"
                    />

                    Remember me
                  </label>

                  <button
                    type="button"
                    className="text-sm font-medium text-emerald-700 hover:text-emerald-800"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Login */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#064e3b] text-sm font-semibold text-white shadow-lg shadow-emerald-900/10 transition hover:bg-[#053f30] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                      Signing you in...
                    </>
                  ) : (
                    <>
                      Sign in

                      <ArrowRight
                        size={17}
                        className="transition-transform group-hover:translate-x-0.5"
                      />
                    </>
                  )}
                </button>
              </form>

              {/* Register */}
              <div className="mt-8 flex items-center justify-center gap-1.5 text-sm text-slate-500">
                <span>
                  Don't have a buyer account?
                </span>

                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      `/buyer/register?redirect=${encodeURIComponent(
                        redirectTo
                      )}`
                    )
                  }
                  className="font-semibold text-emerald-700 hover:text-emerald-800"
                >
                  Create account
                </button>
              </div>

              {/* Security */}
              <div className="mt-10 flex items-center justify-center gap-2 text-xs text-slate-400">
                <LockKeyhole size={13} />

                Your procurement data is securely protected
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}