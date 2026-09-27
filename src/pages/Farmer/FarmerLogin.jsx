import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  LockKeyhole,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router";

// Animation variants for staggered form loading
const formVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function FarmerLogin() {
  const navigate = useNavigate();

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    // Frontend-only demo
    setLoading(true);

    setTimeout(() => {
      navigate("/farmer/dashboard");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#F8FAF7] text-[#172117] selection:bg-[#2E7D32] selection:text-white">
      <div className="grid min-h-screen lg:grid-cols-[1fr_1.1fr]">
        
        {/* LEFT BRAND PANEL (Hidden on Mobile) */}
        <section className="relative hidden overflow-hidden lg:flex">
          <img 
            src="https://images.pexels.com/photos/2165688/pexels-photo-2165688.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Agricultural field"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1A0D]/95 via-[#122A14]/80 to-[#1A3A1D]/60" />
          
          <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16 text-white">
            <div>
              <button
                onClick={() => navigate("/")}
                className="group flex items-center gap-3 transition-transform hover:scale-105"
              >
                <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md ring-1 ring-white/20 transition-colors group-hover:bg-white/20">
                  <img src="/Green_cart.png" alt="GreenCart logo" className="h-full w-full object-contain" />
                </div>
                <span className="text-2xl font-extrabold tracking-tight">
                  GreenCart
                </span>
              </button>
            </div>

            <div className="max-w-xl">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#81C784]">
                Farmer Intelligence Platform
              </p>

              <h1 className="text-5xl font-extrabold leading-[1.1] tracking-tight xl:text-6xl">
                Sell smarter. <br />
                <span className="text-[#A5D6A7]">Keep more.</span>
              </h1>

              <p className="mt-6 max-w-md text-lg leading-relaxed text-white/80">
                Compare real buyer opportunities, understand your net realization, and use AI-powered market insights before you decide to sell.
              </p>

              <div className="mt-12 grid max-w-md grid-cols-3 gap-4">
                <FeatureStat value="AI" label="Market insights" />
                <FeatureStat value="RFQ" label="Direct buyers" />
                <FeatureStat value="₹" label="Net realization" />
              </div>
            </div>

            <p className="text-sm font-medium text-white/50">
              AI recommends. You decide.
            </p>
          </div>
        </section>

        {/* RIGHT LOGIN PANEL */}
        <section className="flex items-center justify-center px-6 py-12 sm:px-10 lg:px-16">
          <div className="w-full max-w-md">
            
            {/* Mobile Logo */}
            <div className="mb-10 flex items-center gap-3 lg:hidden">
              <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-[#E8F5E9]">
                <img src="/Green_cart.png" alt="GreenCart logo" className="h-full w-full object-contain" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-[#172117]">
                GreenCart
              </span>
            </div>

            <div className="mb-10">
              <h2 className="text-3xl font-extrabold tracking-tight text-[#172117]">
                Welcome back
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#5F6E5E]">
                Sign in to manage your crop lots, review buyer offers, and access live market intelligence.
              </p>
            </div>

            <motion.form 
              variants={formVariants}
              initial="hidden"
              animate="show"
              onSubmit={handleSubmit}
            >
              <div className="space-y-6">
                
                {/* Mobile Number Input */}
                <motion.div variants={itemVariants}>
                  <label className="mb-2 block text-sm font-bold text-[#3D493D]">
                    Mobile Number
                  </label>
                  <div className="relative group">
                    <Phone
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7A8A78] transition-colors group-focus-within:text-[#2E7D32]"
                    />
                    <span className="absolute left-11 top-1/2 -translate-y-1/2 text-sm font-medium text-[#7A8A78]">
                      +91
                    </span>
                    <input
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      value={mobile}
                      onChange={(e) =>
                        setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))
                      }
                      placeholder="Enter 10-digit number"
                      className="h-14 w-full rounded-2xl border border-[#E2E8DF] bg-white pl-[4.5rem] pr-4 text-sm font-medium text-[#172117] outline-none transition-all placeholder:text-[#A3B2A2] focus:border-[#2E7D32] focus:ring-4 focus:ring-[#2E7D32]/10 hover:border-[#C5D1C3]"
                    />
                  </div>
                </motion.div>

                {/* Password Input */}
                <motion.div variants={itemVariants}>
                  <label className="mb-2 block text-sm font-bold text-[#3D493D]">
                    Password
                  </label>
                  <div className="relative group">
                    <LockKeyhole
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7A8A78] transition-colors group-focus-within:text-[#2E7D32]"
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="h-14 w-full rounded-2xl border border-[#E2E8DF] bg-white pl-11 pr-12 text-sm font-medium text-[#172117] outline-none transition-all placeholder:text-[#A3B2A2] focus:border-[#2E7D32] focus:ring-4 focus:ring-[#2E7D32]/10 hover:border-[#C5D1C3]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl p-2 text-[#7A8A78] transition-colors hover:bg-[#F4F7F4] hover:text-[#172117]"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </motion.div>

                {/* Options */}
                <motion.div variants={itemVariants} className="flex items-center justify-between gap-3 px-1">
                  <label className="flex cursor-pointer items-center gap-2.5 text-sm font-medium text-[#5F6E5E]">
                    <div className="relative flex items-center justify-center">
                      <input
                        type="checkbox"
                        checked={remember}
                        onChange={(e) => setRemember(e.target.checked)}
                        className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-[#C5D1C3] bg-white transition-all checked:border-[#2E7D32] checked:bg-[#2E7D32]"
                      />
                      <Check size={14} className="absolute text-white opacity-0 transition-opacity peer-checked:opacity-100 pointer-events-none" strokeWidth={3} />
                    </div>
                    Remember me
                  </label>

                  <button
                    type="button"
                    onClick={() => navigate("/farmer/verify")}
                    className="text-sm font-bold text-[#2E7D32] transition-colors hover:text-[#1B5E20]"
                  >
                    Forgot password?
                  </button>
                </motion.div>

                {/* Error Message */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                        <AlertCircle size={18} className="shrink-0" />
                        {error}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Button */}
                <motion.div variants={itemVariants} className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="group flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#2E7D32] text-sm font-bold text-white shadow-[0_8px_20px_rgba(46,125,50,0.2)] transition-all hover:-translate-y-0.5 hover:bg-[#1B5E20] hover:shadow-[0_12px_25px_rgba(46,125,50,0.3)] disabled:pointer-events-none disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign in to account
                        <ArrowRight
                          size={18}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </>
                    )}
                  </button>
                </motion.div>
              </div>
            </motion.form>

            {/* Register */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="my-8 flex items-center gap-4">
                <div className="h-px flex-1 bg-[#E2E8DF]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#A3B2A2]">
                  New to GreenCart?
                </span>
                <div className="h-px flex-1 bg-[#E2E8DF]" />
              </div>

              <button
                onClick={() => navigate("/farmer/register")}
                className="flex h-14 w-full items-center justify-center rounded-2xl border-2 border-[#E2E8DF] bg-transparent text-sm font-bold text-[#3D493D] transition-all hover:border-[#2E7D32] hover:bg-[#F4F9F4] hover:text-[#2E7D32]"
              >
                Create a farmer account
              </button>

              {/* Security note */}
              <div className="mt-8 flex gap-3.5 rounded-2xl border border-[#E2E8DF] bg-white p-5 shadow-sm">
                <ShieldCheck
                  size={20}
                  className="shrink-0 text-[#2E7D32]"
                  strokeWidth={2}
                />
                <p className="text-xs font-medium leading-relaxed text-[#7A8A78]">
                  Your account is protected by industry-standard security. GreenCart provides market recommendations, but the final selling decision always remains completely yours.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}

function FeatureStat({ value, label }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
      <p className="text-2xl font-extrabold text-white">{value}</p>
      <p className="mt-1 text-xs font-medium text-white/70">
        {label}
      </p>
    </div>
  );
}