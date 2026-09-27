import { motion } from "framer-motion";
import {
  ArrowLeft,
  Camera,
  CheckCircle2,
  ChevronRight,
  FileText,
  Globe2,
  HelpCircle,
  Lock,
  MapPin,
  Mic,
  Pencil,
  Save,
  ShieldCheck,
  Smartphone,
  UserRound,
  Bell,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

const tabs = [
  { id: "profile", label: "Profile" },
  { id: "verification", label: "Verification" },
  { id: "preferences", label: "Preferences" },
];

export default function FarmerProfile() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("profile");
  const [editing, setEditing] = useState(false);

  const [form, setForm] = useState({
    name: "Rajesh Kumar",
    mobile: "+91 91229 28643",
    village: "Muzaffarpur",
    district: "Muzaffarpur",
    state: "Bihar",
    language: "Hindi",
  });

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900">
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-[1500px] items-center justify-between px-5 lg:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/farmer/dashboard")}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
            >
              <ArrowLeft size={18} />
            </button>

            <div>
              <p className="text-sm font-bold text-slate-900">
                Farmer Profile
              </p>
              <p className="text-[11px] text-slate-400">
                Manage your GreenCart account
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <ShieldCheck size={16} className="text-emerald-600" />
            <span className="text-xs font-semibold text-slate-500">
              Secure farmer account
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1100px] px-5 py-8 lg:px-8">
        {/* PROFILE HERO */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm"
        >
          <div className="h-28 bg-gradient-to-r from-[#064E3B] via-[#08624A] to-[#0B7657]" />

          <div className="relative px-6 pb-6">
            <div className="-mt-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-end gap-4">
                <div className="relative">
                  <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white bg-emerald-100 text-2xl font-bold text-emerald-800 shadow-sm">
                    RK
                  </div>

                  <button className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#064E3B] text-white shadow-sm">
                    <Camera size={14} />
                  </button>
                </div>

                <div className="pb-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-xl font-bold tracking-tight">
                      Rajesh Kumar
                    </h1>

                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-700">
                      <CheckCircle2 size={12} />
                      Verified
                    </span>
                  </div>

                  <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
                    <MapPin size={13} />
                    Muzaffarpur, Bihar
                  </div>
                </div>
              </div>

              <button
                onClick={() => setEditing(!editing)}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
              >
                <Pencil size={15} />
                {editing ? "Cancel Editing" : "Edit Profile"}
              </button>
            </div>
          </div>
        </motion.section>

        {/* TABS */}
        <div className="mt-5 flex gap-1 overflow-x-auto rounded-xl border border-slate-200/80 bg-white p-1.5 shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap rounded-lg px-5 py-2.5 text-xs font-bold transition ${
                activeTab === tab.id
                  ? "bg-[#064E3B] text-white shadow-sm"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* PROFILE */}
        {activeTab === "profile" && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-5 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Personal information
                </h2>
                <p className="mt-1 text-xs text-slate-400">
                  Your basic details used across GreenCart.
                </p>
              </div>

              <UserRound size={19} className="text-slate-300" />
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Field
                label="Full name"
                value={form.name}
                disabled={!editing}
                onChange={(e) => updateField("name", e.target.value)}
              />

              <Field
                label="Mobile number"
                value={form.mobile}
                disabled={!editing}
                onChange={(e) => updateField("mobile", e.target.value)}
              />

              <Field
                label="Village / City"
                value={form.village}
                disabled={!editing}
                onChange={(e) => updateField("village", e.target.value)}
              />

              <Field
                label="District"
                value={form.district}
                disabled={!editing}
                onChange={(e) => updateField("district", e.target.value)}
              />

              <Field
                label="State"
                value={form.state}
                disabled={!editing}
                onChange={(e) => updateField("state", e.target.value)}
              />

              <div>
                <label className="mb-2 block text-xs font-bold text-slate-600">
                  Preferred language
                </label>

                <select
                  disabled={!editing}
                  value={form.language}
                  onChange={(e) => updateField("language", e.target.value)}
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 disabled:bg-slate-50 disabled:text-slate-500"
                >
                  <option>Hindi</option>
                  <option>English</option>
                  <option>Bhojpuri</option>
                </select>
              </div>
            </div>

            {editing && (
              <div className="mt-6 flex justify-end border-t border-slate-100 pt-5">
                <button
                  onClick={() => setEditing(false)}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#064E3B] px-5 py-3 text-xs font-bold text-white transition hover:bg-[#053d2e]"
                >
                  <Save size={15} />
                  Save Changes
                </button>
              </div>
            )}
          </motion.section>
        )}

        {/* VERIFICATION */}
        {activeTab === "verification" && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-5 space-y-4"
          >
            <VerificationItem
              icon={Smartphone}
              title="Mobile number"
              description="Your mobile number has been verified through OTP."
              status="Verified"
            />

            <VerificationItem
              icon={UserRound}
              title="Farmer identity"
              description="Identity information can be linked to your verified farmer profile."
              status="Verified"
            />

            <VerificationItem
              icon={FileText}
              title="Farm records"
              description="Add land, crop and quality records to strengthen buyer trust."
              status="Add records"
              pending
            />

            <VerificationItem
              icon={ShieldCheck}
              title="Quality verification"
              description="Quality and lab records can be attached to individual crop lots."
              status="Available"
              pending
            />
          </motion.section>
        )}

        {/* PREFERENCES */}
        {activeTab === "preferences" && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-5 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm"
          >
            <Preference
              icon={Globe2}
              title="Language"
              description="Choose the language used throughout GreenCart."
              value="Hindi"
            />

            <Preference
              icon={Mic}
              title="Voice assistant"
              description="Use your voice to ask about prices, offers and markets."
              value="Enabled"
              toggle
            />

            <Preference
              icon={Bell}
              title="Market alerts"
              description="Receive important changes in mandi prices and buyer offers."
              value="Enabled"
              toggle
            />

            <Preference
              icon={Lock}
              title="Account security"
              description="Your account and verification information is protected."
              value="Protected"
            />

            <Preference
              icon={HelpCircle}
              title="Help & support"
              description="Get assistance with your account or GreenCart features."
              value="Open"
              last
            />
          </motion.section>
        )}

        {/* ACCOUNT ACTIONS */}
        <section className="mt-5 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Account
          </p>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => navigate("/farmer/dashboard")}
              className="flex flex-1 items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-left transition hover:bg-slate-50"
            >
              <span className="text-xs font-bold text-slate-700">
                Back to Dashboard
              </span>
              <ChevronRight size={16} className="text-slate-400" />
            </button>

            <button
              onClick={() => navigate("/farmer/login")}
              className="flex flex-1 items-center justify-between rounded-xl border border-red-100 bg-red-50/40 px-4 py-3 text-left transition hover:bg-red-50"
            >
              <span className="flex items-center gap-2 text-xs font-bold text-red-600">
                <LogOut size={15} />
                Sign out
              </span>
              <ChevronRight size={16} className="text-red-300" />
            </button>
          </div>
        </section>

        <p className="mt-6 text-center text-[11px] text-slate-400">
          GreenCart · Farmer Intelligence Platform
        </p>
      </main>
    </div>
  );
}

function Field({ label, ...props }) {
  return (
    <div>
      <label className="mb-2 block text-xs font-bold text-slate-600">
        {label}
      </label>

      <input
        {...props}
        className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 disabled:bg-slate-50 disabled:text-slate-500"
      />
    </div>
  );
}

function VerificationItem({
  icon: Icon,
  title,
  description,
  status,
  pending,
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
          pending
            ? "bg-amber-50 text-amber-600"
            : "bg-emerald-50 text-emerald-700"
        }`}
      >
        <Icon size={19} />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-bold text-slate-900">{title}</h3>
        <p className="mt-1 text-xs leading-5 text-slate-400">
          {description}
        </p>
      </div>

      <span
        className={`hidden rounded-full px-3 py-1.5 text-[10px] font-bold sm:block ${
          pending
            ? "bg-amber-50 text-amber-700"
            : "bg-emerald-50 text-emerald-700"
        }`}
      >
        {status}
      </span>

      <ChevronRight size={16} className="text-slate-300" />
    </div>
  );
}

function Preference({
  icon: Icon,
  title,
  description,
  value,
  toggle,
  last,
}) {
  return (
    <div
      className={`flex items-center gap-4 px-5 py-5 ${
        !last ? "border-b border-slate-100" : ""
      }`}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-600">
        <Icon size={18} />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-bold text-slate-800">{title}</h3>
        <p className="mt-1 text-xs leading-5 text-slate-400">
          {description}
        </p>
      </div>

      {toggle ? (
        <div className="relative h-6 w-11 rounded-full bg-emerald-600">
          <div className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm" />
        </div>
      ) : (
        <span className="hidden text-xs font-semibold text-slate-500 sm:block">
          {value}
        </span>
      )}

      <ChevronRight size={16} className="text-slate-300" />
    </div>
  );
}