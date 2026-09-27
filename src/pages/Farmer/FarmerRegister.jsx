import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Eye,
  EyeOff,
  Leaf,
  MapPin,
  Phone,
  UserRound,
  ShieldCheck,
  LockKeyhole,
} from "lucide-react";
import { Link, useNavigate } from "react-router";

// Animation configurations
const formVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const inputClass =
  "h-14 w-full rounded-2xl border border-[#E2E8DF] bg-white text-sm font-medium text-[#172117] outline-none transition-all placeholder:text-[#A3B2A2] focus:border-[#2E7D32] focus:ring-4 focus:ring-[#2E7D32]/10 hover:border-[#C5D1C3]";

export default function FarmerRegister() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    village: "",
    district: "",
    state: "Bihar",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Enter your full name";
    
    if (!form.phone.trim()) {
      newErrors.phone = "Enter your mobile number";
    } else if (!/^[6-9]\d{9}$/.test(form.phone)) {
      newErrors.phone = "Enter a valid 10-digit mobile number";
    }

    if (!form.village.trim()) newErrors.village = "Enter your village";
    if (!form.district.trim()) newErrors.district = "Enter your district";

    if (!form.password) {
      newErrors.password = "Create a password";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Confirm your password";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!form.agree) {
      newErrors.agree = "Please accept the terms to continue";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitted(true);
    setTimeout(() => {
      navigate("/farmer/verify");
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#F8FAF7] text-[#172117] selection:bg-[#2E7D32] selection:text-white">
      <div className="grid min-h-screen lg:grid-cols-[1fr_1.1fr]">
        
        {/* LEFT BRAND PANEL (Hidden on Mobile) */}
        <section className="relative hidden overflow-hidden lg:flex lg:flex-col lg:justify-between">
          <img 
            src="https://images.pexels.com/photos/1595108/pexels-photo-1595108.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Agricultural field"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1A0D]/95 via-[#122A14]/85 to-[#1A3A1D]/70" />
          
          <div className="relative z-10 p-12 xl:p-16">
            <button
              onClick={() => navigate("/")}
              className="group flex items-center gap-3 transition-transform hover:scale-105"
            >
              <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md ring-1 ring-white/20 transition-colors group-hover:bg-white/20">
                <img src="/Green_cart.png" alt="GreenCart logo" className="h-full w-full object-contain" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white">
                GreenCart
              </span>
            </button>

            <div className="mt-20 max-w-xl text-white">
              <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#A5D6A7] backdrop-blur-md">
                <Leaf size={14} />
                Join the Network
              </div>

              <h1 className="text-5xl font-extrabold leading-[1.1] tracking-tight xl:text-6xl">
                Sell smarter. <br />
                <span className="text-[#A5D6A7]">Keep more value.</span>
              </h1>

              <p className="mt-6 max-w-md text-lg leading-relaxed text-white/80">
                Create your farmer account and connect directly with verified buyers, utilize market intelligence, and make AI-powered selling decisions.
              </p>
            </div>
          </div>

          <div className="relative z-10 p-12 xl:p-16 space-y-6">
            <Benefit
              icon={ShieldCheck}
              title="Verified Buyer Network"
              description="Discover genuine buyer opportunities and RFQs."
            />
            <Benefit
              icon={BarChart3}
              title="AI-Powered Insights"
              description="Understand when and where to sell your produce."
            />
            <Benefit
              icon={MapPin}
              title="Transparent Logistics"
              description="Compare freight and expected net realization."
            />
          </div>
        </section>

        {/* RIGHT REGISTRATION PANEL */}
        <section className="flex h-screen flex-col overflow-y-auto custom-scrollbar px-6 py-12 sm:px-10 lg:px-16">
          <div className="mx-auto w-full max-w-md pb-12">
            
            {/* Header */}
            <div className="mb-8">
              <Link
                to="/start"
                className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-[#7A8A78] transition hover:text-[#2E7D32]"
              >
                <ArrowLeft size={16} />
                Back
              </Link>

              {/* Mobile Logo */}
              <div className="mb-8 flex items-center gap-3 lg:hidden">
                <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-[#E8F5E9]">
                  <img src="/Green_cart.png" alt="GreenCart logo" className="h-full w-full object-contain" />
                </div>
                <span className="text-2xl font-extrabold tracking-tight text-[#172117]">
                  GreenCart
                </span>
              </div>

              <h2 className="text-3xl font-extrabold tracking-tight text-[#172117]">
                Create account
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#5F6E5E]">
                Start selling your produce directly through GreenCart.
              </p>
            </div>

            {/* Progress indicator */}
            <div className="mb-10 flex items-center gap-3">
              <ProgressStep number="1" label="Account" active />
              <div className="h-px flex-1 bg-[#E2E8DF]" />
              <ProgressStep number="2" label="Verify" />
              <div className="h-px flex-1 bg-[#E2E8DF]" />
              <ProgressStep number="3" label="Profile" />
            </div>

            <motion.form 
              variants={formVariants}
              initial="hidden"
              animate="show"
              onSubmit={handleSubmit} 
              className="space-y-5"
            >
              {/* Name */}
              <Field label="Full Name" required error={errors.name}>
                <div className="relative group">
                  <UserRound size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7A8A78] transition-colors group-focus-within:text-[#2E7D32]" />
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    placeholder="Enter your full name"
                    className={`${inputClass} pl-11`}
                  />
                </div>
              </Field>

              {/* Phone */}
              <Field label="Mobile Number" required error={errors.phone}>
                <div className="relative group">
                  <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7A8A78] transition-colors group-focus-within:text-[#2E7D32]" />
                  <span className="absolute left-[2.65rem] top-1/2 -translate-y-1/2 border-r border-[#E2E8DF] pr-2 text-sm font-medium text-[#7A8A78]">
                    +91
                  </span>
                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value.replace(/\D/g, ""))}
                    placeholder="10-digit number"
                    className={`${inputClass} pl-[88px]`}
                  />
                </div>
              </Field>

              {/* Location Grid */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="Village / Town" required error={errors.village}>
                  <div className="relative group">
                    <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7A8A78] transition-colors group-focus-within:text-[#2E7D32]" />
                    <input
                      type="text"
                      value={form.village}
                      onChange={(e) => updateField("village", e.target.value)}
                      placeholder="Your village"
                      className={`${inputClass} pl-11`}
                    />
                  </div>
                </Field>

                <Field label="District" required error={errors.district}>
                  <input
                    type="text"
                    value={form.district}
                    onChange={(e) => updateField("district", e.target.value)}
                    placeholder="e.g. Muzaffarpur"
                    className={inputClass}
                  />
                </Field>
              </div>

              {/* State */}
              <Field label="State">
                <select
                  value={form.state}
                  onChange={(e) => updateField("state", e.target.value)}
                  className={`${inputClass} appearance-none cursor-pointer bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20stroke%3D%22%237A8A78%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem_1.25rem] bg-[position:right_1rem_center] bg-no-repeat pr-10`}
                >
                  <option>Bihar</option>
                  <option>Uttar Pradesh</option>
                  <option>Jharkhand</option>
                  <option>West Bengal</option>
                  <option>Madhya Pradesh</option>
                  <option>Rajasthan</option>
                  <option>Punjab</option>
                  <option>Haryana</option>
                  <option>Other</option>
                </select>
              </Field>

              {/* Password Grid */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="Create Password" required error={errors.password}>
                  <div className="relative group">
                    <LockKeyhole size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7A8A78] transition-colors group-focus-within:text-[#2E7D32]" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={(e) => updateField("password", e.target.value)}
                      placeholder="Min 6 chars"
                      className={`${inputClass} pl-11 pr-10`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A8A78] hover:text-[#172117] transition-colors"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </Field>

                <Field label="Confirm Password" required error={errors.confirmPassword}>
                  <div className="relative group">
                    <LockKeyhole size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7A8A78] transition-colors group-focus-within:text-[#2E7D32]" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={form.confirmPassword}
                      onChange={(e) => updateField("confirmPassword", e.target.value)}
                      placeholder="Repeat"
                      className={`${inputClass} pl-11 pr-10`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A8A78] hover:text-[#172117] transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </Field>
              </div>

              {/* Terms Checkbox */}
              <motion.div variants={itemVariants} className="pt-2">
                <label className="flex cursor-pointer items-start gap-3">
                  <div className="relative flex mt-0.5 items-center justify-center shrink-0">
                    <input
                      type="checkbox"
                      checked={form.agree}
                      onChange={() => updateField("agree", !form.agree)}
                      className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-[#C5D1C3] bg-white transition-all checked:border-[#2E7D32] checked:bg-[#2E7D32]"
                    />
                    <Check size={14} className="absolute text-white opacity-0 transition-opacity peer-checked:opacity-100 pointer-events-none" strokeWidth={3} />
                  </div>
                  <span className="text-xs leading-relaxed text-[#5F6E5E]">
                    I agree to GreenCart's terms of service and understand that my account information will be used to provide marketplace services.
                  </span>
                </label>
                <AnimatePresence>
                  {errors.agree && (
                    <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-2 pl-8 text-xs font-bold text-red-600">
                      {errors.agree}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Submit Button */}
              <motion.div variants={itemVariants} className="pt-4">
                <button
                  type="submit"
                  disabled={submitted}
                  className={`group flex h-14 w-full items-center justify-center gap-2 rounded-2xl text-sm font-bold text-white shadow-[0_8px_20px_rgba(46,125,50,0.2)] transition-all ${
                    submitted
                      ? "bg-[#1B5E20]"
                      : "bg-[#2E7D32] hover:-translate-y-0.5 hover:bg-[#1B5E20] hover:shadow-[0_12px_25px_rgba(46,125,50,0.3)]"
                  }`}
                >
                  {submitted ? (
                    <>
                      <CheckCircle2 size={20} />
                      Account created
                    </>
                  ) : (
                    <>
                      Continue to Verification
                      <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </motion.div>

              {/* Footer Login Link */}
              <motion.p variants={itemVariants} className="mt-8 text-center text-sm font-medium text-[#7A8A78]">
                Already have an account?{" "}
                <Link to="/farmer/login" className="font-bold text-[#2E7D32] hover:text-[#1B5E20] transition-colors">
                  Sign in
                </Link>
              </motion.p>
              
            </motion.form>
          </div>
        </section>
      </div>
    </div>
  );
}

/* -------------------------------- */
/* HELPER COMPONENTS */
/* -------------------------------- */

function Field({ label, required, error, children }) {
  return (
    <motion.div variants={itemVariants}>
      <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#3D493D]">
        {label}
        {required && <span className="ml-1 text-[#2E7D32]">*</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-2 text-xs font-bold text-red-600">
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ProgressStep({ number, label, active = false }) {
  return (
    <div className={`flex shrink-0 items-center gap-2.5 transition-colors ${active ? "text-[#2E7D32]" : "text-[#A3B2A2]"}`}>
      <span
        className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${
          active
            ? "bg-[#2E7D32] text-white shadow-md shadow-[#2E7D32]/20"
            : "border-2 border-[#E2E8DF] bg-white text-[#A3B2A2]"
        }`}
      >
        {number}
      </span>
      <span className="hidden text-xs font-bold uppercase tracking-wider sm:block">
        {label}
      </span>
    </div>
  );
}

function Benefit({ icon: Icon, title, description }) {
  return (
    <div className="flex items-start gap-4 text-white">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md ring-1 ring-white/20">
        <Icon size={20} className="text-[#A5D6A7]" />
      </div>
      <div>
        <h3 className="text-base font-bold">
          {title}
        </h3>
        <p className="mt-1 text-sm font-medium text-white/70">
          {description}
        </p>
      </div>
    </div>
  );
}

// Icon for BarChart since it was used but not imported originally
function BarChart3(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3v18h18" />
      <path d="M18 17V9" />
      <path d="M13 17V5" />
      <path d="M8 17v-3" />
    </svg>
  );
}