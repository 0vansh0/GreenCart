import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  Droplets,
  ImagePlus,
  Leaf,
  MapPin,
  Package,
  Scale,
  Sparkles,
  Upload,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router";

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10";

const cropOptions = [
  "Wheat",
  "Basmati Rice",
  "Maize",
  "Mustard",
  "Potato",
  "Onion",
  "Tomato",
  "Other",
];

const varietyOptions = {
  Wheat: ["Sharbati Wheat", "Premium Wheat", "Lokwan Wheat"],
  "Basmati Rice": ["1121 Basmati", "1509 Basmati", "Traditional Basmati"],
  Maize: ["Hybrid Maize", "Yellow Maize", "White Maize"],
  Mustard: ["Pusa Bold", "Varuna", "Pusa Jai Kisan"],
  Potato: ["Kufri Jyoti", "Kufri Pukhraj", "Kufri Chipsona"],
  Onion: ["Red Onion", "White Onion", "Nasik Onion"],
  Tomato: ["Hybrid Tomato", "Desi Tomato"],
  Other: ["Other"],
};

function CreateCropLot() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    crop: "",
    variety: "",
    quantity: "",
    unit: "Quintal",
    harvestDate: "",
    expectedPrice: "",
    quality: "",
    moisture: "",
    village: "",
    district: "Muzaffarpur",
    state: "Bihar",
    description: "",
  });

  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
      ...(field === "crop" ? { variety: "" } : {}),
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.crop) nextErrors.crop = "Select a crop";
    if (!form.variety) nextErrors.variety = "Select a variety";

    if (!form.quantity) {
      nextErrors.quantity = "Enter available quantity";
    } else if (Number(form.quantity) <= 0) {
      nextErrors.quantity = "Quantity must be greater than 0";
    }

    if (!form.harvestDate) {
      nextErrors.harvestDate = "Select harvest date";
    }

    if (!form.village.trim()) {
      nextErrors.village = "Enter your village";
    }

    if (!form.quality) {
      nextErrors.quality = "Select quality grade";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files || []);

    const newImages = files.slice(0, 4 - images.length).map((file) => ({
      id: `${file.name}-${file.lastModified}`,
      name: file.name,
      url: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (id) => {
    setImages((prev) => {
      const image = prev.find((item) => item.id === id);

      if (image) {
        URL.revokeObjectURL(image.url);
      }

      return prev.filter((item) => item.id !== id);
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validate()) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    // Frontend-only for now.
    setSaved(true);

    setTimeout(() => {
      navigate("/farmer/dashboard");
    }, 900);
  };

  const varieties = form.crop
    ? varietyOptions[form.crop] || ["Other"]
    : [];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[420px] w-[420px] rounded-full bg-emerald-100/50 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-[460px] w-[460px] rounded-full bg-emerald-50 blur-3xl" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link to="/farmer/dashboard" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-900 text-white shadow-sm">
              <Leaf size={20} />
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
            to="/farmer/dashboard"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <ArrowLeft size={15} />
            Dashboard
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:py-10">
        {/* Page heading */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800">
            <Package size={13} />
            New crop lot
          </div>

          <h1 className="text-3xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-4xl">
            Create a crop lot
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Add your available produce so GreenCart can compare market
            conditions, buyer demand and expected net realization.
          </p>
        </motion.div>

        {/* Progress */}
        <div className="mb-8 flex items-center gap-3 overflow-x-auto pb-1">
          <Step number="01" label="Crop details" active />
          <div className="h-px min-w-10 flex-1 bg-slate-200" />
          <Step number="02" label="Quality & location" />
          <div className="h-px min-w-10 flex-1 bg-slate-200" />
          <Step number="03" label="Market analysis" />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
            {/* Main form */}
            <div className="space-y-6">
              {/* Crop details */}
              <motion.section
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm"
              >
                <SectionHeader
                  icon={Leaf}
                  title="Crop details"
                  description="Tell us about the produce you want to sell."
                />

                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field label="Crop" required error={errors.crop}>
                    <Select
                      value={form.crop}
                      onChange={(value) => updateField("crop", value)}
                      placeholder="Select crop"
                      options={cropOptions}
                    />
                  </Field>

                  <Field
                    label="Variety"
                    required
                    error={errors.variety}
                  >
                    <Select
                      value={form.variety}
                      onChange={(value) =>
                        updateField("variety", value)
                      }
                      placeholder={
                        form.crop
                          ? "Select variety"
                          : "Select crop first"
                      }
                      options={varieties}
                      disabled={!form.crop}
                    />
                  </Field>

                  <Field
                    label="Available quantity"
                    required
                    error={errors.quantity}
                  >
                    <div className="relative">
                      <Scale
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type="number"
                        min="0"
                        value={form.quantity}
                        onChange={(e) =>
                          updateField("quantity", e.target.value)
                        }
                        placeholder="e.g. 120"
                        className={`${inputClass} pl-11 pr-28`}
                      />

                      <select
                        value={form.unit}
                        onChange={(e) =>
                          updateField("unit", e.target.value)
                        }
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg border-0 bg-slate-100 px-2 py-2 text-xs font-semibold text-slate-600 outline-none"
                      >
                        <option>Quintal</option>
                        <option>Kg</option>
                        <option>Ton</option>
                      </select>
                    </div>
                  </Field>

                  <Field
                    label="Harvest date"
                    required
                    error={errors.harvestDate}
                  >
                    <div className="relative">
                      <CalendarDays
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type="date"
                        value={form.harvestDate}
                        onChange={(e) =>
                          updateField(
                            "harvestDate",
                            e.target.value
                          )
                        }
                        className={`${inputClass} pl-11`}
                      />
                    </div>
                  </Field>

                  <Field label="Expected price / Quintal">
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">
                        ₹
                      </span>

                      <input
                        type="number"
                        min="0"
                        value={form.expectedPrice}
                        onChange={(e) =>
                          updateField(
                            "expectedPrice",
                            e.target.value
                          )
                        }
                        placeholder="Optional"
                        className={`${inputClass} pl-9`}
                      />
                    </div>
                  </Field>
                </div>
              </motion.section>

              {/* Quality */}
              <motion.section
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm"
              >
                <SectionHeader
                  icon={Droplets}
                  title="Quality information"
                  description="Quality information helps buyers understand your lot."
                />

                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field
                    label="Quality grade"
                    required
                    error={errors.quality}
                  >
                    <Select
                      value={form.quality}
                      onChange={(value) =>
                        updateField("quality", value)
                      }
                      placeholder="Select quality"
                      options={[
                        "Premium Grade",
                        "Grade A",
                        "Grade B",
                        "Standard",
                      ]}
                    />
                  </Field>

                  <Field label="Moisture level">
                    <div className="relative">
                      <Droplets
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="0.1"
                        value={form.moisture}
                        onChange={(e) =>
                          updateField("moisture", e.target.value)
                        }
                        placeholder="e.g. 11.8"
                        className={`${inputClass} pl-11 pr-12`}
                      />

                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400">
                        %
                      </span>
                    </div>
                  </Field>
                </div>

                {/* Image upload */}
                <div className="mt-6">
                  <div className="mb-2 flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-700">
                      Crop photos
                    </label>

                    <span className="text-xs text-slate-400">
                      Optional · up to 4
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {images.map((image) => (
                      <div
                        key={image.id}
                        className="group relative aspect-square overflow-hidden rounded-xl border border-slate-200"
                      >
                        <img
                          src={image.url}
                          alt="Crop"
                          className="h-full w-full object-cover"
                        />

                        <button
                          type="button"
                          onClick={() => removeImage(image.id)}
                          className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-slate-950/70 text-white opacity-0 backdrop-blur transition group-hover:opacity-100"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}

                    {images.length < 4 && (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex aspect-square flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-slate-400 transition hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-700"
                      >
                        <ImagePlus size={22} />

                        <span className="mt-2 text-xs font-semibold">
                          Add photo
                        </span>
                      </button>
                    )}
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />

                  <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-400">
                    <CircleHelp size={13} />
                    Clear crop photos can later help with quality assessment.
                  </p>
                </div>

                {/* Description */}
                <div className="mt-6">
                  <label className="mb-2 block text-xs font-semibold text-slate-700">
                    Additional notes
                  </label>

                  <textarea
                    value={form.description}
                    onChange={(e) =>
                      updateField("description", e.target.value)
                    }
                    rows={4}
                    placeholder="Mention anything buyers should know about this lot..."
                    className={`${inputClass} resize-none`}
                  />
                </div>
              </motion.section>

              {/* Location */}
              <motion.section
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm"
              >
                <SectionHeader
                  icon={MapPin}
                  title="Pickup location"
                  description="Where will the buyer collect or receive the produce?"
                />

                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field
                    label="Village / Town"
                    required
                    error={errors.village}
                  >
                    <div className="relative">
                      <MapPin
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type="text"
                        value={form.village}
                        onChange={(e) =>
                          updateField("village", e.target.value)
                        }
                        placeholder="e.g. Kanti"
                        className={`${inputClass} pl-11`}
                      />
                    </div>
                  </Field>

                  <Field label="District">
                    <input
                      type="text"
                      value={form.district}
                      onChange={(e) =>
                        updateField("district", e.target.value)
                      }
                      className={inputClass}
                    />
                  </Field>

                  <Field label="State">
                    <input
                      type="text"
                      value={form.state}
                      onChange={(e) =>
                        updateField("state", e.target.value)
                      }
                      className={inputClass}
                    />
                  </Field>
                </div>
              </motion.section>
            </div>

            {/* Right panel */}
            <aside className="space-y-5">
              {/* AI preview */}
              <div className="overflow-hidden rounded-2xl border border-emerald-900/10 bg-emerald-950 text-white shadow-sm">
                <div className="p-6">
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                        <Sparkles size={17} />
                      </div>

                      <span className="text-sm font-semibold">
                        AI Market Analysis
                      </span>
                    </div>

                    <span className="rounded-full bg-emerald-400/15 px-2.5 py-1 text-[10px] font-semibold text-emerald-300">
                      PREVIEW
                    </span>
                  </div>

                  <p className="text-sm leading-6 text-emerald-100/70">
                    Once you create the lot, GreenCart will analyze your crop
                    against market prices, demand and buyer opportunities.
                  </p>

                  <div className="mt-6 space-y-3">
                    <PreviewRow label="Mandi benchmark" value="—" />
                    <PreviewRow label="Buyer demand" value="—" />
                    <PreviewRow label="Expected net value" value="—" />
                    <PreviewRow label="Selling strategy" value="—" />
                  </div>
                </div>

                <div className="border-t border-white/10 bg-white/[0.03] px-6 py-4">
                  <div className="flex items-start gap-2">
                    <Sparkles
                      size={14}
                      className="mt-0.5 shrink-0 text-emerald-400"
                    />

                    <p className="text-[11px] leading-5 text-emerald-100/60">
                      AI recommends. You decide. No transaction happens
                      without your confirmation.
                    </p>
                  </div>
                </div>
              </div>

              {/* Lot summary */}
              <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
                <div className="mb-5 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-slate-900">
                    Lot summary
                  </h3>

                  <Package
                    size={17}
                    className="text-slate-400"
                  />
                </div>

                <div className="space-y-4">
                  <SummaryRow
                    label="Crop"
                    value={
                      form.crop
                        ? `${form.variety || "—"}`
                        : "Not selected"
                    }
                  />

                  <SummaryRow
                    label="Quantity"
                    value={
                      form.quantity
                        ? `${form.quantity} ${form.unit}`
                        : "Not added"
                    }
                  />

                  <SummaryRow
                    label="Quality"
                    value={form.quality || "Not selected"}
                  />

                  <SummaryRow
                    label="Location"
                    value={
                      form.village
                        ? `${form.village}, ${form.district}`
                        : "Not added"
                    }
                  />
                </div>
              </div>

              {/* Upload hint */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                    <Upload size={16} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-800">
                      Better data = better insights
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      Add accurate quantity, quality and location details so
                      buyer matching can be more precise.
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>

          {/* Bottom actions */}
          <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <Link
              to="/farmer/dashboard"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
            >
              <ArrowLeft size={16} />
              Cancel
            </Link>

            <motion.button
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={saved}
              className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-sm transition ${
                saved
                  ? "bg-emerald-700"
                  : "bg-emerald-900 hover:bg-emerald-800"
              }`}
            >
              {saved ? (
                <>
                  <CheckCircle2 size={17} />
                  Lot created
                </>
              ) : (
                <>
                  Create crop lot
                  <ArrowRight size={17} />
                </>
              )}
            </motion.button>
          </div>
        </form>
      </main>
    </div>
  );
}

/* ---------------- Components ---------------- */

function Step({ number, label, active = false }) {
  return (
    <div
      className={`flex shrink-0 items-center gap-2 ${
        active ? "text-emerald-800" : "text-slate-400"
      }`}
    >
      <span
        className={`flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold ${
          active
            ? "bg-emerald-900 text-white"
            : "border border-slate-200 bg-white"
        }`}
      >
        {number}
      </span>

      <span className="text-xs font-semibold">
        {label}
      </span>
    </div>
  );
}

function SectionHeader({
  icon: Icon,
  title,
  description,
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
        <Icon size={18} />
      </div>

      <div>
        <h2 className="text-sm font-semibold text-slate-900">
          {title}
        </h2>

        <p className="mt-1 text-xs leading-5 text-slate-400">
          {description}
        </p>
      </div>
    </div>
  );
}

function Field({ label, required, error, children }) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold text-slate-700">
        {label}

        {required && (
          <span className="ml-1 text-emerald-700">*</span>
        )}
      </label>

      {children}

      {error && (
        <p className="mt-1.5 text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

function Select({
  value,
  onChange,
  placeholder,
  options,
  disabled = false,
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`${inputClass} appearance-none pr-10 ${
          disabled ? "cursor-not-allowed bg-slate-50 text-slate-400" : ""
        }`}
      >
        <option value="">{placeholder}</option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <ChevronDown
        size={16}
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
      />
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-xs text-slate-400">
        {label}
      </span>

      <span className="max-w-[180px] text-right text-xs font-semibold text-slate-700">
        {value}
      </span>
    </div>
  );
}

function PreviewRow({ label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-white/10 pb-3 last:border-0 last:pb-0">
      <span className="text-xs text-emerald-100/60">
        {label}
      </span>

      <span className="text-xs font-semibold text-white">
        {value}
      </span>
    </div>
  );
}

export default CreateCropLot;