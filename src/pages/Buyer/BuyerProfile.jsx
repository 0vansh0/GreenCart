import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Building2,
  Check,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  Edit3,
  FileCheck2,
  Globe2,
  Mail,
  MapPin,
  Phone,
  Plus,
  ShieldCheck,
  Store,
  Truck,
  Upload,
  UserRound,
  Users,
  WalletCards,
  X,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const COMPANY = {
  name: "FreshMart Foods Pvt. Ltd.",
  shortName: "FreshMart",
  type: "Food Processing & Procurement",
  gst: "10AABCF4821M1ZX",
  email: "procurement@freshmart.in",
  phone: "+91 98765 43210",
  website: "freshmart.in",
  location: "Patna, Bihar",
  verified: true,
  memberSince: "January 2026",
};

const WAREHOUSES = [
  {
    name: "Patna Processing Plant",
    type: "Processing",
    address: "Bihta Industrial Area, Patna",
    capacity: "2,500 Qtl",
    status: "Active",
  },
  {
    name: "Muzaffarpur Mill",
    type: "Processing",
    address: "Kanti Industrial Area, Muzaffarpur",
    capacity: "1,800 Qtl",
    status: "Active",
  },
  {
    name: "Darbhanga Distribution Hub",
    type: "Distribution",
    address: "Laheriasarai, Darbhanga",
    capacity: "1,200 Qtl",
    status: "Active",
  },
];

const PROCUREMENT_STATS = [
  {
    label: "Orders completed",
    value: "26",
    detail: "Since January 2026",
  },
  {
    label: "Total procurement",
    value: "1,840 Qtl",
    detail: "Across 8 commodities",
  },
  {
    label: "Active suppliers",
    value: "42",
    detail: "Verified farmer profiles",
  },
  {
    label: "Avg. quality score",
    value: "97.4%",
    detail: "Last 90 days",
  },
];

function SectionCard({ children, className = "" }) {
  return (
    <div
      className={`rounded-2xl border border-slate-200/80 bg-white shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}

function StatusBadge({ children, green = true }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${
        green
          ? "border-emerald-100 bg-emerald-50 text-emerald-700"
          : "border-slate-200 bg-slate-50 text-slate-600"
      }`}
    >
      {green && <CheckCircle2 size={13} />}
      {children}
    </span>
  );
}

function ProfileRow({ icon: Icon, label, value, action }) {
  return (
    <div className="flex items-start gap-4 border-b border-slate-100 py-4 last:border-0">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-500">
        <Icon size={17} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-slate-400">{label}</p>
        <p className="mt-1 break-words text-sm font-semibold text-slate-800">
          {value}
        </p>
      </div>

      {action}
    </div>
  );
}

function EditProfileModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    name: COMPANY.name,
    email: COMPANY.email,
    phone: COMPANY.phone,
    website: COMPANY.website,
  });

  const update = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

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
        className="w-full max-w-lg rounded-3xl bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-slate-100 p-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Edit company profile
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Update your procurement account information.
            </p>
          </div>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200"
          >
            <X size={17} />
          </button>
        </div>

        <div className="space-y-4 p-6">
          {[
            ["name", "Company name"],
            ["email", "Procurement email"],
            ["phone", "Phone number"],
            ["website", "Website"],
          ].map(([key, label]) => (
            <label key={key} className="block">
              <span className="mb-1.5 block text-xs font-semibold text-slate-600">
                {label}
              </span>

              <input
                value={form[key]}
                onChange={(e) => update(key, e.target.value)}
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none transition focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-500/5"
              />
            </label>
          ))}
        </div>

        <div className="flex gap-3 border-t border-slate-100 p-6">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            onClick={() => onSave(form)}
            className="flex-1 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-800"
          >
            Save changes
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function WarehouseModal({ onClose }) {
  const [saved, setSaved] = useState(false);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg rounded-3xl bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-slate-100 p-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Add warehouse
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Add a new procurement or delivery location.
            </p>
          </div>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600"
          >
            <X size={17} />
          </button>
        </div>

        {!saved ? (
          <>
            <div className="space-y-4 p-6">
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-slate-600">
                  Warehouse name
                </span>
                <input
                  placeholder="e.g. North Bihar Hub"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-emerald-300 focus:bg-white"
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-slate-600">
                  Address
                </span>
                <input
                  placeholder="Full warehouse address"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-emerald-300 focus:bg-white"
                />
              </label>

              <div className="grid grid-cols-2 gap-3">
                <label>
                  <span className="mb-1.5 block text-xs font-semibold text-slate-600">
                    Type
                  </span>

                  <select className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none">
                    <option>Processing</option>
                    <option>Distribution</option>
                    <option>Storage</option>
                  </select>
                </label>

                <label>
                  <span className="mb-1.5 block text-xs font-semibold text-slate-600">
                    Capacity
                  </span>

                  <input
                    placeholder="1,000 Qtl"
                    className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-emerald-300 focus:bg-white"
                  />
                </label>
              </div>
            </div>

            <div className="border-t border-slate-100 p-6">
              <button
                onClick={() => setSaved(true)}
                className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-800"
              >
                Add warehouse
              </button>
            </div>
          </>
        ) : (
          <div className="p-10 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <Check size={25} />
            </div>

            <h3 className="mt-4 text-lg font-bold text-slate-900">
              Warehouse added
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              The new location will appear after backend integration.
            </p>

            <button
              onClick={onClose}
              className="mt-6 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white"
            >
              Done
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default function BuyerProfile() {
  const navigate = useNavigate();

  const [showEdit, setShowEdit] = useState(false);
  const [showWarehouse, setShowWarehouse] = useState(false);
  const [toast, setToast] = useState("");

  const [company, setCompany] = useState(COMPANY);

  const saveProfile = (form) => {
    setCompany((prev) => ({
      ...prev,
      ...form,
    }));

    setShowEdit(false);
    setToast("Company profile updated");

    setTimeout(() => setToast(""), 2500);
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
              Buyer Profile
            </h1>
            <p className="hidden text-xs text-slate-500 sm:block">
              Company, verification and procurement settings
            </p>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => navigate("/buyer/rfqs")}
              className="hidden rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:border-emerald-200 hover:text-emerald-700 sm:block"
            >
              RFQ Center
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

      <main className="mx-auto max-w-[1500px] px-5 py-7 lg:px-8">
        {/* Profile hero */}
        <section className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm lg:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex gap-5">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                <Building2 size={32} />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-2xl font-bold tracking-tight text-slate-950">
                    {company.name}
                  </h2>

                  {company.verified && (
                    <StatusBadge>Verified buyer</StatusBadge>
                  )}
                </div>

                <p className="mt-1 text-sm text-slate-500">
                  {company.type}
                </p>

                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <MapPin size={13} />
                    {company.location}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <CalendarIcon />
                    Member since {company.memberSince}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowEdit(true)}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-emerald-200 hover:text-emerald-700"
            >
              <Edit3 size={15} />
              Edit profile
            </button>
          </div>
        </section>

        {/* Stats */}
        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {PROCUREMENT_STATS.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm"
            >
              <p className="text-xs font-medium text-slate-500">
                {item.label}
              </p>

              <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                {item.value}
              </p>

              <p className="mt-2 text-xs text-slate-400">{item.detail}</p>
            </div>
          ))}
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          {/* Left */}
          <div className="space-y-6">
            {/* Company information */}
            <SectionCard>
              <div className="flex items-center justify-between border-b border-slate-100 p-5">
                <div>
                  <h3 className="font-bold text-slate-900">
                    Company information
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    Details used for procurement and contracts
                  </p>
                </div>

                <Building2 size={18} className="text-slate-400" />
              </div>

              <div className="px-5">
                <ProfileRow
                  icon={Building2}
                  label="Legal company name"
                  value={company.name}
                />

                <ProfileRow
                  icon={FileCheck2}
                  label="GST registration"
                  value={company.gst}
                  action={
                    <StatusBadge>
                      Verified
                    </StatusBadge>
                  }
                />

                <ProfileRow
                  icon={Mail}
                  label="Procurement email"
                  value={company.email}
                />

                <ProfileRow
                  icon={Phone}
                  label="Phone"
                  value={company.phone}
                />

                <ProfileRow
                  icon={Globe2}
                  label="Website"
                  value={company.website}
                />
              </div>
            </SectionCard>

            {/* Verification */}
            <SectionCard>
              <div className="border-b border-slate-100 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                    <ShieldCheck size={19} />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900">
                      Verification & compliance
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      Your buyer identity and business records
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 p-5">
                {[
                  ["Business identity", "Verified"],
                  ["GST details", "Verified"],
                  ["Procurement account", "Active"],
                  ["Payment profile", "Verified"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle2
                        size={17}
                        className="text-emerald-600"
                      />
                      <span className="text-sm font-medium text-slate-700">
                        {label}
                      </span>
                    </div>

                    <span className="text-xs font-bold text-emerald-700">
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-100 p-5">
                <button className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800">
                  <Upload size={15} />
                  Update verification documents
                  <ChevronRight size={15} />
                </button>
              </div>
            </SectionCard>

            {/* Team */}
            <SectionCard>
              <div className="flex items-center justify-between border-b border-slate-100 p-5">
                <div>
                  <h3 className="font-bold text-slate-900">
                    Procurement team
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    People who can manage purchases and RFQs
                  </p>
                </div>

                <button className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700">
                  <Plus size={17} />
                </button>
              </div>

              <div className="divide-y divide-slate-100">
                {[
                  {
                    name: "Rajiv Sharma",
                    role: "Procurement Manager",
                    email: "rajiv@freshmart.in",
                    owner: true,
                  },
                  {
                    name: "Priya Singh",
                    role: "Procurement Executive",
                    email: "priya@freshmart.in",
                  },
                  {
                    name: "Aman Kumar",
                    role: "Logistics Manager",
                    email: "aman@freshmart.in",
                  },
                ].map((person) => (
                  <div
                    key={person.email}
                    className="flex items-center gap-3 p-5"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-600">
                      {person.name
                        .split(" ")
                        .map((x) => x[0])
                        .join("")
                        .slice(0, 2)}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-bold text-slate-900">
                          {person.name}
                        </p>

                        {person.owner && (
                          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                            Admin
                          </span>
                        )}
                      </div>

                      <p className="mt-0.5 text-xs text-slate-500">
                        {person.role}
                      </p>
                    </div>

                    <button className="text-slate-400 hover:text-slate-700">
                      <ChevronRight size={17} />
                    </button>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>

          {/* Right */}
          <div className="space-y-6">
            {/* Warehouses */}
            <SectionCard>
              <div className="flex items-center justify-between border-b border-slate-100 p-5">
                <div>
                  <h3 className="font-bold text-slate-900">
                    Warehouses & destinations
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    Locations available for procurement
                  </p>
                </div>

                <button
                  onClick={() => setShowWarehouse(true)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                >
                  <Plus size={17} />
                </button>
              </div>

              <div className="space-y-3 p-5">
                {WAREHOUSES.map((warehouse) => (
                  <div
                    key={warehouse.name}
                    className="rounded-2xl border border-slate-100 p-4 transition hover:border-emerald-100 hover:bg-emerald-50/30"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-600">
                          <Store size={17} />
                        </div>

                        <div>
                          <p className="text-sm font-bold text-slate-900">
                            {warehouse.name}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {warehouse.type}
                          </p>
                        </div>
                      </div>

                      <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
                        {warehouse.status}
                      </span>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <MapPin size={12} />
                        {warehouse.address}
                      </span>

                      <span className="flex items-center gap-1">
                        <Package size={12} />
                        {warehouse.capacity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-100 p-5">
                <button
                  onClick={() => setShowWarehouse(true)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:border-emerald-200 hover:text-emerald-700"
                >
                  <Plus size={15} />
                  Add destination
                </button>
              </div>
            </SectionCard>

            {/* Payment */}
            <SectionCard>
              <div className="border-b border-slate-100 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                    <CreditCard size={18} />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900">
                      Payment profile
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      Settlement and escrow configuration
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 p-5">
                <div className="rounded-xl bg-slate-50 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">
                      Primary payment method
                    </span>

                    <StatusBadge>Verified</StatusBadge>
                  </div>

                  <p className="mt-2 text-sm font-bold text-slate-900">
                    Business bank account
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Account ending •••• 4821
                  </p>
                </div>

                <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-4">
                  <div className="flex gap-3">
                    <WalletCards
                      size={18}
                      className="mt-0.5 text-emerald-600"
                    />

                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        Escrow enabled
                      </p>

                      <p className="mt-1 text-xs leading-5 text-slate-600">
                        Eligible orders can use protected payment until
                        delivery and quality confirmation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 p-5">
                <button className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
                  Manage payment settings
                  <ChevronRight size={15} />
                </button>
              </div>
            </SectionCard>

            {/* Preferences */}
            <SectionCard>
              <div className="border-b border-slate-100 p-5">
                <h3 className="font-bold text-slate-900">
                  Procurement preferences
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  Default settings for new RFQs and purchases
                </p>
              </div>

              <div className="space-y-4 p-5">
                {[
                  ["Preferred region", "Bihar + neighboring states"],
                  ["Payment preference", "50% upfront / balance on delivery"],
                  ["Default quality", "Premium Grade"],
                  ["Preferred delivery", "Buyer warehouse"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between gap-4"
                  >
                    <span className="text-xs text-slate-500">{label}</span>

                    <span className="text-right text-xs font-semibold text-slate-800">
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-100 p-5">
                <button className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
                  Edit preferences
                  <ChevronRight size={15} />
                </button>
              </div>
            </SectionCard>
          </div>
        </div>
      </main>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="fixed bottom-5 left-1/2 z-[60] -translate-x-1/2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-xl"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {showEdit && (
        <EditProfileModal
          onClose={() => setShowEdit(false)}
          onSave={saveProfile}
        />
      )}

      {showWarehouse && (
        <WarehouseModal onClose={() => setShowWarehouse(false)} />
      )}
    </div>
  );
}

function CalendarIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}