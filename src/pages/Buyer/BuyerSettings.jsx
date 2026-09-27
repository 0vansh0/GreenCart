import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Bell,
  Check,
  ChevronRight,
  Globe2,
  LockKeyhole,
  Mail,
  MessageSquare,
  Moon,
  PackageCheck,
  Phone,
  Save,
  ShieldCheck,
  SlidersHorizontal,
  Smartphone,
  UserRound,
  WalletCards,
  X,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialSettings = {
  emailRfqs: true,
  emailOrders: true,
  emailPayments: true,
  emailMarket: false,
  smsUrgent: true,
  smsDelivery: true,
  whatsappUpdates: true,
  browserNotifications: true,

  preferredLanguage: "English",
  preferredRegion: "Bihar + neighboring states",
  defaultQuality: "Premium Grade",
  defaultPayment: "50% upfront / balance on delivery",
  defaultDelivery: "Buyer warehouse",

  twoFactor: true,
  loginAlerts: true,
};

function SettingToggle({ enabled, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition ${
        enabled ? "bg-emerald-600" : "bg-slate-200"
      }`}
      aria-label={enabled ? "Disable setting" : "Enable setting"}
    >
      <motion.span
        animate={{ x: enabled ? 20 : 2 }}
        transition={{ duration: 0.18 }}
        className="absolute left-0 top-1 h-4 w-4 rounded-full bg-white shadow-sm"
      />
    </button>
  );
}

function SettingRow({
  icon: Icon,
  title,
  description,
  enabled,
  onChange,
  children,
}) {
  return (
    <div className="flex items-center gap-4 border-b border-slate-100 py-4 last:border-0">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-500">
        <Icon size={17} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-slate-800">{title}</p>

        {description && (
          <p className="mt-1 text-xs leading-5 text-slate-500">
            {description}
          </p>
        )}
      </div>

      {children}

      {typeof enabled === "boolean" && (
        <SettingToggle enabled={enabled} onChange={onChange} />
      )}
    </div>
  );
}

function Section({ icon: Icon, title, description, children }) {
  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <div className="flex items-start gap-3 border-b border-slate-100 p-5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
          <Icon size={18} />
        </div>

        <div>
          <h2 className="font-bold text-slate-900">{title}</h2>

          {description && (
            <p className="mt-1 text-xs leading-5 text-slate-500">
              {description}
            </p>
          )}
        </div>
      </div>

      <div className="px-5">{children}</div>
    </section>
  );
}

function SelectField({ label, value, onChange, options }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold text-slate-600">
        {label}
      </span>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-medium text-slate-700 outline-none transition focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-500/5"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function Toast({ message }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          className="fixed bottom-5 left-1/2 z-[70] -translate-x-1/2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-2xl"
        >
          <span className="flex items-center gap-2">
            <Check size={15} className="text-emerald-400" />
            {message}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ChangePasswordModal({ onClose, onSuccess }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="w-full max-w-md rounded-3xl bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-slate-100 p-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Change password
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Keep your procurement account secure.
            </p>
          </div>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600"
          >
            <X size={17} />
          </button>
        </div>

        <div className="space-y-4 p-6">
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-slate-600">
              Current password
            </span>

            <input
              type="password"
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-emerald-300 focus:bg-white"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-slate-600">
              New password
            </span>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 pr-20 text-sm outline-none focus:border-emerald-300 focus:bg-white"
              />

              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-slate-600">
              Confirm new password
            </span>

            <input
              type="password"
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-emerald-300 focus:bg-white"
            />
          </label>
        </div>

        <div className="flex gap-3 border-t border-slate-100 p-6">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            onClick={onSuccess}
            className="flex-1 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-800"
          >
            Update password
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function BuyerSettings() {
  const navigate = useNavigate();

  const [settings, setSettings] = useState(initialSettings);
  const [saved, setSaved] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const update = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const saveSettings = () => {
    setSaved("Settings saved successfully");

    setTimeout(() => {
      setSaved("");
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-[1500px] items-center gap-4 px-5 lg:px-8">
          <button
            onClick={() => navigate("/marketplace")}
            className="flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-emerald-700"
          >
            <ArrowLeft size={17} />
            <span className="hidden sm:inline">Marketplace</span>
          </button>

          <div className="hidden h-6 w-px bg-slate-200 sm:block" />

          <div>
            <h1 className="text-base font-bold tracking-tight text-slate-900">
              Settings
            </h1>

            <p className="hidden text-xs text-slate-500 sm:block">
              Manage your buyer account and procurement preferences
            </p>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => navigate("/buyer/profile")}
              className="hidden rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:border-emerald-200 hover:text-emerald-700 sm:block"
            >
              Profile
            </button>

            <button
              onClick={() => navigate("/buyer/orders")}
              className="hidden rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800 sm:block"
            >
              Orders
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1180px] px-5 py-7 lg:px-8">
        {/* Intro */}
        <section className="mb-7">
          <p className="text-sm font-semibold text-emerald-700">
            Account controls
          </p>

          <h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Settings
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Configure how GreenCart handles procurement alerts, market
            updates, account security and your default buying workflow.
          </p>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1fr_0.72fr]">
          {/* LEFT */}
          <div className="space-y-6">
            {/* Notifications */}
            <Section
              icon={Bell}
              title="Notifications"
              description="Choose which procurement events should reach you."
            >
              <SettingRow
                icon={Mail}
                title="New RFQ responses"
                description="Get an email when a supplier responds to your RFQ."
                enabled={settings.emailRfqs}
                onChange={(value) => update("emailRfqs", value)}
              />

              <SettingRow
                icon={PackageCheck}
                title="Order updates"
                description="Receive updates about dispatch, delivery and quality checks."
                enabled={settings.emailOrders}
                onChange={(value) => update("emailOrders", value)}
              />

              <SettingRow
                icon={WalletCards}
                title="Payment updates"
                description="Know when escrow or payment status changes."
                enabled={settings.emailPayments}
                onChange={(value) => update("emailPayments", value)}
              />

              <SettingRow
                icon={SlidersHorizontal}
                title="Market intelligence"
                description="Receive market trends and procurement opportunities."
                enabled={settings.emailMarket}
                onChange={(value) => update("emailMarket", value)}
              />
            </Section>

            {/* Mobile */}
            <Section
              icon={Smartphone}
              title="SMS & WhatsApp"
              description="Important operational alerts on your phone."
            >
              <SettingRow
                icon={MessageSquare}
                title="Urgent RFQ alerts"
                description="Receive alerts when an RFQ is close to expiry."
                enabled={settings.smsUrgent}
                onChange={(value) => update("smsUrgent", value)}
              />

              <SettingRow
                icon={Truck}
                title="Delivery updates"
                description="Get shipment and ETA notifications."
                enabled={settings.smsDelivery}
                onChange={(value) => update("smsDelivery", value)}
              />

              <SettingRow
                icon={MessageSquare}
                title="WhatsApp updates"
                description="Receive selected procurement updates through WhatsApp."
                enabled={settings.whatsappUpdates}
                onChange={(value) => update("whatsappUpdates", value)}
              />

              <SettingRow
                icon={Bell}
                title="Browser notifications"
                description="Show important alerts while GreenCart is open."
                enabled={settings.browserNotifications}
                onChange={(value) =>
                  update("browserNotifications", value)
                }
              />
            </Section>

            {/* Procurement */}
            <Section
              icon={SlidersHorizontal}
              title="Procurement defaults"
              description="These defaults can be changed for individual RFQs."
            >
              <div className="grid gap-5 py-5 sm:grid-cols-2">
                <SelectField
                  label="Preferred language"
                  value={settings.preferredLanguage}
                  onChange={(value) =>
                    update("preferredLanguage", value)
                  }
                  options={["English", "हिन्दी"]}
                />

                <SelectField
                  label="Preferred procurement region"
                  value={settings.preferredRegion}
                  onChange={(value) =>
                    update("preferredRegion", value)
                  }
                  options={[
                    "Bihar + neighboring states",
                    "Bihar only",
                    "East India",
                    "All India",
                  ]}
                />

                <SelectField
                  label="Default quality requirement"
                  value={settings.defaultQuality}
                  onChange={(value) =>
                    update("defaultQuality", value)
                  }
                  options={[
                    "Premium Grade",
                    "Standard Grade",
                    "Any verified grade",
                  ]}
                />

                <SelectField
                  label="Default delivery preference"
                  value={settings.defaultDelivery}
                  onChange={(value) =>
                    update("defaultDelivery", value)
                  }
                  options={[
                    "Buyer warehouse",
                    "Pickup from farm",
                    "Supplier warehouse",
                  ]}
                />

                <div className="sm:col-span-2">
                  <SelectField
                    label="Default payment preference"
                    value={settings.defaultPayment}
                    onChange={(value) =>
                      update("defaultPayment", value)
                    }
                    options={[
                      "50% upfront / balance on delivery",
                      "100% on delivery",
                      "Net 7 days",
                      "Net 15 days",
                    ]}
                  />
                </div>
              </div>
            </Section>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            {/* Account */}
            <Section
              icon={UserRound}
              title="Account"
              description="Basic account and contact controls."
            >
              <div className="space-y-3 py-5">
                <button
                  onClick={() => navigate("/buyer/profile")}
                  className="flex w-full items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4 text-left transition hover:border-emerald-100 hover:bg-emerald-50/40"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-slate-600 shadow-sm">
                    <UserRound size={16} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-slate-800">
                      Company profile
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Company information and verification
                    </p>
                  </div>

                  <ChevronRight size={17} className="text-slate-400" />
                </button>

                <button
                  onClick={() => navigate("/buyer/profile")}
                  className="flex w-full items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4 text-left transition hover:border-emerald-100 hover:bg-emerald-50/40"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-slate-600 shadow-sm">
                    <Building2Icon />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-slate-800">
                      Warehouses
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Manage procurement destinations
                    </p>
                  </div>

                  <ChevronRight size={17} className="text-slate-400" />
                </button>
              </div>
            </Section>

            {/* Security */}
            <Section
              icon={ShieldCheck}
              title="Security"
              description="Protect your procurement account."
            >
              <div className="py-1">
                <SettingRow
                  icon={LockKeyhole}
                  title="Two-factor authentication"
                  description="Require an additional verification step when signing in."
                  enabled={settings.twoFactor}
                  onChange={(value) => update("twoFactor", value)}
                />

                <SettingRow
                  icon={Bell}
                  title="Login alerts"
                  description="Notify you when your account is accessed from a new device."
                  enabled={settings.loginAlerts}
                  onChange={(value) => update("loginAlerts", value)}
                />

                <button
                  onClick={() => setShowPassword(true)}
                  className="flex w-full items-center gap-3 border-b border-slate-100 py-4 text-left"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-500">
                    <LockKeyhole size={17} />
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-800">
                      Change password
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Update your account password.
                    </p>
                  </div>

                  <ChevronRight size={17} className="text-slate-400" />
                </button>
              </div>
            </Section>

            {/* Language */}
            <Section
              icon={Globe2}
              title="Language & experience"
              description="Customize the GreenCart interface."
            >
              <div className="space-y-4 py-5">
                <SelectField
                  label="Interface language"
                  value={settings.preferredLanguage}
                  onChange={(value) =>
                    update("preferredLanguage", value)
                  }
                  options={["English", "हिन्दी"]}
                />

                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <div className="flex items-start gap-3">
                    <Globe2
                      size={17}
                      className="mt-0.5 text-emerald-600"
                    />

                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        Localized experience
                      </p>

                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        Language preferences will also affect voice
                        assistance and localized procurement communication.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Section>

            {/* Privacy */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-500">
                  <ShieldCheck size={18} />
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">
                    Data & privacy
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Your procurement information is intended for your
                    GreenCart account and authorized workflows.
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-2 text-xs font-semibold">
                <button className="flex items-center justify-between rounded-lg px-2 py-2 text-left text-slate-600 hover:bg-slate-50 hover:text-emerald-700">
                  Privacy policy
                  <ChevronRight size={14} />
                </button>

                <button className="flex items-center justify-between rounded-lg px-2 py-2 text-left text-slate-600 hover:bg-slate-50 hover:text-emerald-700">
                  Terms of procurement
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Save bar */}
        <div className="sticky bottom-4 z-20 mt-7">
          <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-xl backdrop-blur sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-bold text-slate-900">
                Ready to save your changes?
              </p>

              <p className="mt-1 text-xs text-slate-500">
                These settings are currently stored locally for this demo.
              </p>
            </div>

            <button
              onClick={saveSettings}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              <Save size={15} />
              Save settings
            </button>
          </div>
        </div>
      </main>

      <Toast message={saved} />

      <AnimatePresence>
        {showPassword && (
          <ChangePasswordModal
            onClose={() => setShowPassword(false)}
            onSuccess={() => {
              setShowPassword(false);
              setSaved("Password updated successfully");
              setTimeout(() => setSaved(""), 2500);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function Building2Icon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18" />
      <path d="M6 12H4a2 2 0 0 0-2 2v8h20v-8a2 2 0 0 0-2-2h-2" />
      <path d="M10 6h4" />
      <path d="M10 10h4" />
      <path d="M10 14h4" />
      <path d="M10 18h4" />
    </svg>
  );
}