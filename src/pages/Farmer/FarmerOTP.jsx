import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  LockKeyhole,
  MessageSquareText,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

function FarmerOTP() {
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [error, setError] = useState("");
  const [verified, setVerified] = useState(false);
  const [resending, setResending] = useState(false);

  const phoneNumber = "******4321";

  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((previous) => previous - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleOtpChange = (index, value) => {
    const digit = value.replace(/\D/g, "").slice(-1);

    const nextOtp = [...otp];
    nextOtp[index] = digit;

    setOtp(nextOtp);
    setError("");

    if (digit && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (event.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (event.key === "ArrowRight" && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();

    const pastedValue = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pastedValue) return;

    const nextOtp = [...otp];

    pastedValue.split("").forEach((digit, index) => {
      nextOtp[index] = digit;
    });

    setOtp(nextOtp);
    setError("");

    const nextIndex = Math.min(pastedValue.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleVerify = (event) => {
    event.preventDefault();

    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      setError("Please enter the complete 6-digit verification code.");
      return;
    }

    // Frontend-only demo verification.
    setVerified(true);

    setTimeout(() => {
      navigate("/farmer/dashboard");
    }, 900);
  };

  const handleResend = () => {
    if (timer > 0 || resending) return;

    setResending(true);
    setError("");
    setOtp(["", "", "", "", "", ""]);

    setTimeout(() => {
      setTimer(30);
      setResending(false);
      inputRefs.current[0]?.focus();
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[420px] w-[420px] rounded-full bg-emerald-100/60 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-[460px] w-[460px] rounded-full bg-emerald-50 blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link to="/" className="group flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl shadow-sm transition group-hover:scale-105">
              <img src="/Green_cart.png" alt="GreenCart logo" className="h-full w-full object-contain" />
            </div>

            <div>
              <p className="text-[15px] font-bold tracking-tight text-slate-900">
                GreenCart
              </p>

              <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-400">
                Farmer Commerce
              </p>
            </div>
          </Link>

          <Link
            to="/farmer/login"
            className="text-sm font-medium text-slate-500 transition hover:text-emerald-800"
          >
            Sign in
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 flex min-h-[calc(100vh-72px)] items-center justify-center px-5 py-10 sm:px-8">
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="w-full max-w-md"
        >
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.07)] sm:p-8">
            {/* Back */}
            <Link
              to="/farmer/register"
              className="mb-8 inline-flex items-center gap-2 text-xs font-medium text-slate-500 transition hover:text-slate-900"
            >
              <ArrowLeft size={14} />
              Back to registration
            </Link>

            {/* Icon */}
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-800">
              {verified ? (
                <CheckCircle2 size={28} />
              ) : (
                <LockKeyhole size={26} />
              )}
            </div>

            {/* Heading */}
            <div className="mb-8">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-emerald-700">
                Step 02 of 03
              </p>

              <h1 className="text-3xl font-semibold tracking-[-0.035em] text-slate-950">
                {verified ? "Verification complete" : "Verify your number"}
              </h1>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                {verified
                  ? "Your mobile number has been verified. Preparing your farmer dashboard."
                  : "Enter the 6-digit code sent to your registered mobile number."}
              </p>
            </div>

            {!verified ? (
              <form onSubmit={handleVerify}>
                {/* Mobile number display */}
                <div className="mb-6 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-emerald-700 shadow-sm">
                    <MessageSquareText size={19} />
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Verification code sent to
                    </p>

                    <p className="mt-1 text-sm font-semibold tracking-wide text-slate-800">
                      +91 {phoneNumber}
                    </p>
                  </div>
                </div>

                {/* OTP inputs */}
                <div className="mb-3 flex justify-between gap-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(element) => {
                        inputRefs.current[index] = element;
                      }}
                      value={digit}
                      onChange={(event) =>
                        handleOtpChange(index, event.target.value)
                      }
                      onKeyDown={(event) =>
                        handleKeyDown(index, event)
                      }
                      onPaste={handlePaste}
                      inputMode="numeric"
                      maxLength={1}
                      aria-label={`OTP digit ${index + 1}`}
                      className={`h-14 w-full rounded-xl border bg-white text-center text-xl font-bold text-slate-900 outline-none transition focus:ring-4 ${
                        error
                          ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
                          : "border-slate-200 focus:border-emerald-600 focus:ring-emerald-600/10"
                      }`}
                    />
                  ))}
                </div>

                {error && (
                  <p className="mb-4 text-xs font-medium text-red-600">
                    {error}
                  </p>
                )}

                {/* Resend */}
                <div className="mb-7 flex items-center justify-between gap-3">
                  <p className="text-xs text-slate-500">
                    Didn't receive the code?
                  </p>

                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={timer > 0 || resending}
                    className={`flex items-center gap-1.5 text-xs font-semibold transition ${
                      timer > 0 || resending
                        ? "cursor-not-allowed text-slate-300"
                        : "text-emerald-700 hover:text-emerald-900"
                    }`}
                  >
                    <RefreshCw
                      size={13}
                      className={resending ? "animate-spin" : ""}
                    />

                    {resending
                      ? "Sending..."
                      : timer > 0
                        ? `Resend in ${timer}s`
                        : "Resend code"}
                  </button>
                </div>

                {/* Verify button */}
                <motion.button
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-900 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800"
                >
                  Verify and continue
                  <ArrowRight size={17} />
                </motion.button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5 text-center"
              >
                <CheckCircle2
                  size={34}
                  className="mx-auto mb-3 text-emerald-700"
                />

                <p className="text-sm font-semibold text-emerald-900">
                  Mobile number verified successfully
                </p>

                <p className="mt-1 text-xs text-emerald-700">
                  Redirecting to your farmer dashboard...
                </p>
              </motion.div>
            )}

            {/* Security note */}
            <div className="mt-7 flex items-start gap-3 border-t border-slate-100 pt-5">
              <ShieldCheck
                size={17}
                className="mt-0.5 shrink-0 text-emerald-700"
              />

              <p className="text-xs leading-5 text-slate-400">
                Your verification code is used only to confirm ownership of
                your mobile number. This is a frontend demo flow for now.
              </p>
            </div>
          </div>

          <p className="mt-5 text-center text-xs text-slate-400">
            Need help?{" "}
            <span className="font-medium text-slate-600">
              Contact GreenCart support
            </span>
          </p>
        </motion.section>
      </main>
    </div>
  );
}

export default FarmerOTP;