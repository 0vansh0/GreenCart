import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  ChevronDown,
  Heart,
  Map,
  MapPin,
  Navigation,
  Search,
  SlidersHorizontal,
  Sparkles,
  Star,
  Verified,
  X,
  ShieldCheck,
  Scale,
  Droplets,
  Package,
  TrendingUp,
  Globe2,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import BuyerHeader from "../../components/BuyerHeader";

// --- Data ---
const products = [
  {
    id: 1,
    crop: "Sharbati Wheat",
    cropHi: "शरबती गेहूं",
    variety: "Premium Grade",
    farmer: "Rajesh Kumar",
    location: "Muzaffarpur, Bihar",
    quantity: 120,
    price: 2850,
    mandi: 2760,
    quality: "98.2%",
    moisture: "11.8%",
    harvest: "18 Sep 2026",
    rating: "4.9",
    sales: 12,
    tag: "Optimal Selling Time",
    tagHi: "बिक्री का सही समय",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 2,
    crop: "Basmati Rice",
    cropHi: "बासमती चावल",
    variety: "1121",
    farmer: "Amit Kumar",
    location: "Patna, Bihar",
    quantity: 80,
    price: 6400,
    mandi: 6210,
    quality: "97.6%",
    moisture: "12.4%",
    harvest: "15 Sep 2026",
    rating: "4.8",
    sales: 19,
    tag: "Premium Quality",
    tagHi: "प्रीमियम गुणवत्ता",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 3,
    crop: "Yellow Maize",
    cropHi: "पीला मक्का",
    variety: "Hybrid",
    farmer: "Suresh Prasad",
    location: "Purnia, Bihar",
    quantity: 200,
    price: 2200,
    mandi: 2140,
    quality: "96.9%",
    moisture: "13.2%",
    harvest: "12 Sep 2026",
    rating: "4.7",
    sales: 24,
    tag: "Bulk Available",
    tagHi: "थोक में उपलब्ध",
    image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 4,
    crop: "Mustard",
    cropHi: "सरसों",
    variety: "Pusa Bold",
    farmer: "Manoj Singh",
    location: "Darbhanga, Bihar",
    quantity: 65,
    price: 5750,
    mandi: 5580,
    quality: "98.8%",
    moisture: "8.9%",
    harvest: "10 Sep 2026",
    rating: "4.9",
    sales: 9,
    tag: "High Quality",
    tagHi: "उच्च गुणवत्ता",
    image: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=1200&q=85",
  },
];

const mandiData = [
  { name: "Wheat", nameHi: "गेहूं", location: "Muzaffarpur", price: "₹2,760", change: "+4.2%" },
  { name: "Rice", nameHi: "चावल", location: "Patna", price: "₹6,210", change: "+2.8%" },
  { name: "Maize", nameHi: "मक्का", location: "Purnia", price: "₹2,140", change: "+1.9%" },
  { name: "Mustard", nameHi: "सरसों", location: "Jaipur", price: "₹5,580", change: "-0.8%" },
];

// --- Translations ---
const t = {
  EN: {
    mandiBench: "Mandi benchmark",
    directSourcing: "Direct sourcing",
    title: "Available crop lots",
    subtitle: "Compare quality, market position and landed cost before making an offer.",
    lots: "Lots",
    mapView: "Map view",
    categories: ["All", "Wheat", "Rice", "Maize", "Mustard"],
    sortRec: "Recommended",
    sortLow: "Lowest price",
    sortHigh: "Highest price",
    sortQty: "Largest lot",
    intelTitle: "Market intelligence",
    intelDesc: "3 lots currently priced above their local mandi benchmark.",
    viewAnalysis: "View market analysis →",
    noMatchTitle: "No matching lots",
    noMatchDesc: "Try another crop, farmer or location.",
    askingPrice: "Asking price",
    qtl: "/Qtl",
    harvest: "Harvest",
    verified: "Verified",
    buyerPremium: "Buyer premium",
    qty: "Quantity",
    quality: "Quality",
    moisture: "Moisture",
    sales: "sales",
    viewDetails: "View details",
    makeOffer: "Make offer",
    filters: "Filters",
    applyFilters: "Apply filters",
    mapSubtitle: "Bihar sourcing map",
    mapNote: "Route and freight estimates available on listing",
    farmerProfile: "GreenCart verified profile",
    farmerNote: "Identity, crop information and transaction history verified.",
  },
  HI: {
    mandiBench: "मंडी बेंचमार्क",
    directSourcing: "सीधी खरीद",
    title: "उपलब्ध फसल लॉट",
    subtitle: "प्रस्ताव देने से पहले गुणवत्ता, बाजार की स्थिति और लागत की तुलना करें।",
    lots: "लॉट (सूची)",
    mapView: "नक्शा दृश्य",
    categories: ["सभी", "गेहूं", "चावल", "मक्का", "सरसों"],
    sortRec: "अनुशंसित",
    sortLow: "सबसे कम कीमत",
    sortHigh: "सबसे ज्यादा कीमत",
    sortQty: "सबसे बड़ा लॉट",
    intelTitle: "बाजार की जानकारी",
    intelDesc: "3 लॉट वर्तमान में अपने स्थानीय मंडी बेंचमार्क से ऊपर मूल्यवान हैं।",
    viewAnalysis: "बाजार विश्लेषण देखें →",
    noMatchTitle: "कोई लॉट नहीं मिला",
    noMatchDesc: "कोई अन्य फसल, किसान या स्थान खोजें।",
    askingPrice: "मांगी गई कीमत",
    qtl: "/क्विंटल",
    harvest: "कटाई",
    verified: "सत्यापित",
    buyerPremium: "खरीदार प्रीमियम",
    qty: "मात्रा",
    quality: "गुणवत्ता",
    moisture: "नमी",
    sales: "बिक्री",
    viewDetails: "विवरण देखें",
    makeOffer: "प्रस्ताव दें",
    filters: "फ़िल्टर",
    applyFilters: "फ़िल्टर लागू करें",
    mapSubtitle: "बिहार सोर्सिंग मैप",
    mapNote: "लिस्टिंग पर मार्ग और भाड़ा अनुमान उपलब्ध हैं",
    farmerProfile: "ग्रीनकार्ट सत्यापित प्रोफ़ाइल",
    farmerNote: "पहचान, फसल की जानकारी और लेनदेन इतिहास सत्यापित किया गया है।",
  }
};

// --- Animations ---
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function Marketplace() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("EN");
  const d = t[lang]; // Dictionary

  const [categoryIndex, setCategoryIndex] = useState(0);
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [sort, setSort] = useState("recommended");
  const [mapView, setMapView] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [farmer, setFarmer] = useState(null);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (categoryIndex !== 0) {
      const catMap = ["All", "Wheat", "Rice", "Maize", "Mustard"];
      result = result.filter((item) =>
        item.crop.toLowerCase().includes(catMap[categoryIndex].toLowerCase())
      );
    }

    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(
        (item) =>
          item.crop.toLowerCase().includes(q) ||
          item.variety.toLowerCase().includes(q) ||
          item.location.toLowerCase().includes(q) ||
          item.farmer.toLowerCase().includes(q)
      );
    }

    if (sort === "price-low") result.sort((a, b) => a.price - b.price);
    if (sort === "price-high") result.sort((a, b) => b.price - a.price);
    if (sort === "quantity") result.sort((a, b) => b.quantity - a.quantity);

    return result;
  }, [categoryIndex, search, sort]);

  const toggleFavorite = (id) => {
    setFavorites((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAF7] text-[#172117] selection:bg-[#2E7D32] selection:text-white">
      <BuyerHeader search={search} onSearchChange={setSearch} />

      <main className="mx-auto max-w-[1500px] px-5 py-6 lg:px-8">
        {/* MARKET TICKER */}
        <section className="overflow-hidden rounded-2xl border border-[#E2E8DF] bg-white shadow-sm">
          <div className="flex items-center overflow-x-auto">
            <div className="flex shrink-0 items-center gap-2 border-r border-[#E2E8DF] px-5 py-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#E8F5E9] text-[#2E7D32]">
                <TrendingUp size={16} />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A8A78]">
                {d.mandiBench}
              </span>
            </div>

            {mandiData.map((item, idx) => (
              <button
                key={idx}
                type="button"
                className="min-w-[175px] shrink-0 border-r border-[#E2E8DF] px-5 py-3 text-left transition hover:bg-[#F4F9F4]"
              >
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#A3B2A2]">
                  {lang === "HI" ? item.nameHi : item.name} · {item.location}
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-sm font-extrabold text-[#172117]">
                    {item.price}
                  </span>
                  <span
                    className={`text-[11px] font-bold ${
                      item.change.startsWith("+") ? "text-[#2E7D32]" : "text-red-500"
                    }`}
                  >
                    {item.change}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* PAGE HEADER & CONTROLS */}
        <section className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#2E7D32]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#2E7D32]">
                {d.directSourcing}
              </span>
            </div>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-[#172117] lg:text-4xl">
              {d.title}
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#5F6E5E]">
              {d.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Language Toggle */}
            <button
              onClick={() => setLang(lang === "EN" ? "HI" : "EN")}
              className="group flex items-center gap-2 rounded-xl border border-[#E2E8DF] bg-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#3D493D] shadow-sm transition hover:border-[#2E7D32] hover:bg-[#F4F9F4] hover:text-[#2E7D32]"
            >
              <Globe2 size={16} />
              {lang === "EN" ? "हिन्दी" : "English"}
            </button>

            <div className="flex items-center rounded-xl border border-[#E2E8DF] bg-white p-1 shadow-sm">
              <button
                type="button"
                onClick={() => setMapView(false)}
                className={`rounded-lg px-4 py-2 text-xs font-bold transition ${
                  !mapView ? "bg-[#2E7D32] text-white shadow-sm" : "text-[#5F6E5E] hover:bg-[#F4F9F4] hover:text-[#172117]"
                }`}
              >
                {d.lots}
              </button>
              <button
                type="button"
                onClick={() => setMapView(true)}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition ${
                  mapView ? "bg-[#2E7D32] text-white shadow-sm" : "text-[#5F6E5E] hover:bg-[#F4F9F4] hover:text-[#172117]"
                }`}
              >
                <Map size={14} />
                {d.mapView}
              </button>
            </div>

            <button
              type="button"
              onClick={() => setFiltersOpen(true)}
              className="flex h-[42px] w-[42px] items-center justify-center rounded-xl border border-[#E2E8DF] bg-white text-[#5F6E5E] shadow-sm transition hover:border-[#2E7D32] hover:bg-[#F4F9F4] hover:text-[#2E7D32]"
              aria-label="Open filters"
            >
              <SlidersHorizontal size={18} />
            </button>
          </div>
        </section>

        {/* CATEGORY + SORT */}
        <section className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-1 overflow-x-auto rounded-2xl border border-[#E2E8DF] bg-white p-1.5 shadow-sm scrollbar-hide">
            {d.categories.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCategoryIndex(idx)}
                className={`whitespace-nowrap rounded-xl px-5 py-2.5 text-xs font-bold transition ${
                  categoryIndex === idx
                    ? "bg-[#2E7D32] text-white shadow-sm"
                    : "text-[#5F6E5E] hover:bg-[#F4F9F4] hover:text-[#172117]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="h-[46px] appearance-none rounded-2xl border border-[#E2E8DF] bg-white pl-5 pr-10 text-xs font-bold text-[#3D493D] shadow-sm outline-none transition focus:border-[#2E7D32] focus:ring-4 focus:ring-[#2E7D32]/10"
            >
              <option value="recommended">{d.sortRec}</option>
              <option value="price-low">{d.sortLow}</option>
              <option value="price-high">{d.sortHigh}</option>
              <option value="quantity">{d.sortQty}</option>
            </select>
            <ChevronDown size={14} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#7A8A78]" />
          </div>
        </section>

        {/* MAP / LOT VIEW */}
        {mapView ? (
          <MapView products={filteredProducts} d={d} lang={lang} />
        ) : (
          <>
            {/* AI INSIGHT BAR */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 flex flex-col gap-4 rounded-2xl border border-[#C5D1C3] bg-gradient-to-r from-[#E8F5E9]/50 to-white px-6 py-5 sm:flex-row sm:items-center sm:justify-between shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E8F5E9] text-[#2E7D32]">
                  <Sparkles size={20} />
                </div>
                <div>
                  <p className="text-sm font-extrabold text-[#172117]">
                    {d.intelTitle}
                  </p>
                  <p className="mt-0.5 text-xs font-medium text-[#5F6E5E]">
                    {d.intelDesc}
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="text-left text-xs font-bold text-[#2E7D32] transition hover:text-[#1B5E20] sm:text-right"
              >
                {d.viewAnalysis}
              </button>
            </motion.div>

            {/* PRODUCT GRID */}
            <motion.div variants={containerVariants} initial="hidden" animate="show" className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  favorite={favorites.includes(product.id)}
                  onFavorite={() => toggleFavorite(product.id)}
                  onOpen={() => navigate(`/product/${product.id}`)}
                  onFarmer={() => setFarmer(product)}
                  d={d}
                  lang={lang}
                />
              ))}
            </motion.div>

            {/* EMPTY STATE */}
            {filteredProducts.length === 0 && (
              <div className="mt-8 rounded-3xl border border-dashed border-[#C5D1C3] bg-white py-24 text-center">
                <Search className="mx-auto text-[#A3B2A2]" size={40} />
                <p className="mt-4 text-base font-bold text-[#3D493D]">{d.noMatchTitle}</p>
                <p className="mt-2 text-sm font-medium text-[#7A8A78]">{d.noMatchDesc}</p>
              </div>
            )}
          </>
        )}
      </main>

      {/* FILTER DRAWER */}
      <AnimatePresence>
        {filtersOpen && <FilterDrawer onClose={() => setFiltersOpen(false)} d={d} />}
      </AnimatePresence>

      {/* FARMER MODAL */}
      <AnimatePresence>
        {farmer && <FarmerModal farmer={farmer} onClose={() => setFarmer(null)} d={d} lang={lang} />}
      </AnimatePresence>
    </div>
  );
}

/* =========================================================
   PRODUCT CARD
========================================================= */

function ProductCard({ product, index, favorite, onFavorite, onOpen, onFarmer, d, lang }) {
  const margin = product.price - product.mandi;
  const marginPercent = ((margin / product.mandi) * 100).toFixed(1);

  return (
    <motion.article
      variants={itemVariants}
      className="group flex flex-col overflow-hidden rounded-3xl border border-[#E2E8DF] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#C5D1C3] hover:shadow-xl"
    >
      {/* IMAGE */}
      <div onClick={onOpen} className="relative h-[220px] cursor-pointer overflow-hidden">
        <img
          src={product.image}
          alt={product.crop}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#172117]/80 via-[#172117]/20 to-transparent" />

        <div className="absolute left-5 top-5">
          <span className="rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-extrabold text-[#2E7D32] shadow-sm backdrop-blur-md">
            {lang === "HI" && product.tagHi ? product.tagHi : product.tag}
          </span>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onFavorite();
          }}
          className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#5F6E5E] shadow-sm backdrop-blur-md transition hover:scale-110 hover:text-red-500"
        >
          <Heart size={18} fill={favorite ? "currentColor" : "none"} className={favorite ? "text-red-500" : ""} />
        </button>

        <div className="absolute bottom-5 left-5 text-white">
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/80">
            {d.askingPrice}
          </p>
          <p className="mt-1 text-2xl font-extrabold tracking-tight">
            ₹{product.price.toLocaleString("en-IN")}
            <span className="ml-1 text-xs font-semibold text-white/80">{d.qtl}</span>
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        {/* TITLE */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-extrabold tracking-tight text-[#172117]">
              {lang === "HI" && product.cropHi ? product.cropHi : product.crop}
            </h2>
            <p className="mt-1 text-xs font-medium text-[#5F6E5E]">
              {product.variety} · {d.harvest} {product.harvest}
            </p>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-[#E8F5E9] px-2.5 py-1 text-[10px] font-bold text-[#2E7D32]">
            <Verified size={12} />
            {d.verified}
          </div>
        </div>

        {/* PRICE COMPARISON */}
        <div className="mt-5 rounded-2xl bg-[#F8FAF7] p-4 border border-[#E2E8DF]/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#7A8A78]">
                {d.mandiBench}
              </p>
              <p className="mt-1 text-sm font-extrabold text-[#3D493D]">
                ₹{product.mandi.toLocaleString("en-IN")}{d.qtl}
              </p>
            </div>
            <div className="h-10 w-px bg-[#E2E8DF]" />
            <div className="text-right">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#7A8A78]">
                {d.buyerPremium}
              </p>
              <p className="mt-1 text-sm font-extrabold text-[#2E7D32]">
                +₹{margin}{d.qtl}
                <span className="ml-1 text-[10px] font-semibold text-[#2E7D32]/80">
                  (+{marginPercent}%)
                </span>
              </p>
            </div>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#E2E8DF]">
            <div
              className="h-full rounded-full bg-[#2E7D32]"
              style={{ width: `${Math.min(100, 50 + Number(marginPercent) * 8)}%` }}
            />
          </div>
        </div>

        {/* METRICS */}
        <div className="mt-5 grid grid-cols-3 gap-2">
          <Metric icon={Package} label={d.qty} value={`${product.quantity} Qtl`} />
          <Metric icon={Scale} label={d.quality} value={product.quality} />
          <Metric icon={Droplets} label={d.moisture} value={product.moisture} />
        </div>

        {/* FARMER */}
        <button
          type="button"
          onClick={onFarmer}
          className="mt-6 flex w-full items-center gap-3 rounded-2xl border border-transparent p-2 text-left transition hover:border-[#E2E8DF] hover:bg-[#F4F9F4]"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E8F5E9] text-xs font-extrabold text-[#2E7D32]">
            {product.farmer.split(" ").map((n) => n[0]).join("")}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <p className="truncate text-sm font-extrabold text-[#3D493D]">
                {product.farmer}
              </p>
              <Verified size={14} className="text-[#2E7D32]" />
            </div>
            <div className="mt-0.5 flex items-center gap-1.5 text-[11px] font-medium text-[#7A8A78]">
              <Star size={12} fill="currentColor" className="text-amber-400" />
              <span className="font-bold text-[#5F6E5E]">{product.rating}</span>
              <span>·</span>
              {product.sales} {d.sales}
              <span>·</span>
              <MapPin size={11} />
              <span className="truncate">{product.location}</span>
            </div>
          </div>
          <ArrowUpRight size={16} className="text-[#A3B2A2] transition group-hover:text-[#2E7D32]" />
        </button>

        {/* ACTIONS */}
        <div className="mt-auto pt-6 flex gap-3">
          <button
            type="button"
            onClick={onOpen}
            className="flex-1 rounded-2xl border-2 border-[#E2E8DF] py-3 text-xs font-extrabold text-[#3D493D] transition hover:border-[#C5D1C3] hover:bg-[#F8FAF7]"
          >
            {d.viewDetails}
          </button>
          <button
            type="button"
            onClick={onOpen}
            className="flex-1 rounded-2xl bg-[#2E7D32] py-3 text-xs font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#1B5E20] hover:shadow-md"
          >
            {d.makeOffer}
          </button>
        </div>
      </div>
    </motion.article>
  );
}

/* =========================================================
   METRIC
========================================================= */

function Metric({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl border border-[#E2E8DF] bg-white p-2.5 shadow-sm">
      <div className="flex items-center gap-1.5 text-[#7A8A78]">
        <Icon size={12} />
        <span className="text-[9px] font-bold uppercase tracking-widest">
          {label}
        </span>
      </div>
      <p className="mt-1.5 text-xs font-extrabold text-[#172117]">
        {value}
      </p>
    </div>
  );
}

/* =========================================================
   MAP VIEW
========================================================= */

function MapView({ products, d, lang }) {
  const positions = [
    { left: "28%", top: "32%" },
    { left: "57%", top: "24%" },
    { left: "72%", top: "49%" },
    { left: "43%", top: "61%" },
    { left: "20%", top: "67%" },
    { left: "67%", top: "74%" },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative mt-6 h-[620px] overflow-hidden rounded-3xl border border-[#E2E8DF] bg-[#F4F9F4]"
    >
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute left-[10%] top-[20%] h-40 w-40 rounded-full bg-[#A5D6A7] blur-3xl" />
        <div className="absolute right-[15%] top-[35%] h-56 w-56 rounded-full bg-[#E8F5E9] blur-3xl" />
        <div className="absolute bottom-[5%] left-[35%] h-48 w-48 rounded-full bg-[#81C784] blur-3xl opacity-50" />
      </div>

      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(#7A8A78 1px, transparent 1px), linear-gradient(90deg, #7A8A78 1px, transparent 1px)",
          backgroundSize: "70px 70px",
        }}
      />

      <div className="absolute left-6 top-6 rounded-2xl border border-white/80 bg-white/90 p-4 shadow-sm backdrop-blur-xl">
        <p className="text-sm font-extrabold text-[#172117]">
          {d.mapSubtitle}
        </p>
        <p className="mt-1 text-xs font-medium text-[#5F6E5E]">
          {products.length} {d.lots.toLowerCase()}
        </p>
      </div>

      {products.map((product, index) => {
        const position = positions[index % positions.length];
        return (
          <motion.div
            key={product.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.08 }}
            className="absolute"
            style={position}
          >
            <button
              type="button"
              className="group relative flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-[#2E7D32] text-white shadow-lg transition hover:scale-110 hover:bg-[#1B5E20]"
              aria-label={`View ${product.crop}`}
            >
              <MapPin size={20} fill="currentColor" />

              <div className="pointer-events-none absolute bottom-full left-1/2 mb-3 hidden w-52 -translate-x-1/2 rounded-2xl border border-[#E2E8DF] bg-white p-4 text-left shadow-xl group-hover:block">
                <p className="text-sm font-extrabold text-[#172117]">
                  {lang === "HI" && product.cropHi ? product.cropHi : product.crop}
                </p>
                <p className="mt-1 text-[11px] font-medium text-[#7A8A78]">
                  {product.location}
                </p>
                <p className="mt-2 text-sm font-extrabold text-[#2E7D32]">
                  ₹{product.price.toLocaleString("en-IN")}{d.qtl}
                </p>
              </div>
            </button>
          </motion.div>
        );
      })}

      <div className="absolute bottom-6 left-6 flex items-center gap-2.5 rounded-2xl border border-white/80 bg-white/90 px-4 py-3 text-xs font-bold text-[#5F6E5E] shadow-sm backdrop-blur-xl">
        <Navigation size={16} className="text-[#2E7D32]" />
        {d.mapNote}
      </div>
    </motion.section>
  );
}

/* =========================================================
   FILTER DRAWER
========================================================= */

function FilterDrawer({ onClose, d }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] bg-[#172117]/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.aside
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        className="absolute right-0 top-0 h-full w-full max-w-[400px] overflow-y-auto bg-white p-6 shadow-2xl rounded-l-3xl"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xl font-extrabold text-[#172117]">
              {d.filters}
            </p>
            <p className="mt-1 text-sm text-[#5F6E5E]">
              Narrow down your sourcing requirements.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F8FAF7] text-[#5F6E5E] transition hover:bg-[#E2E8DF] hover:text-[#172117]"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mt-8 space-y-8">
          <FilterSection title="Location" options={["Muzaffarpur", "Patna", "Purnia", "Darbhanga"]} />
          <FilterSection title={d.quality} options={["95%+", "97%+", "98%+"]} />
          <FilterSection title={d.qty} options={["Under 50 Qtl", "50–100 Qtl", "100+ Qtl"]} />
          <FilterSection title="Seller status" options={["Verified farmers", "Quality verified"]} />
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-10 w-full rounded-2xl bg-[#2E7D32] py-4 text-sm font-extrabold text-white shadow-sm transition hover:bg-[#1B5E20]"
        >
          {d.applyFilters}
        </button>
      </motion.aside>
    </motion.div>
  );
}

function FilterSection({ title, options }) {
  return (
    <div>
      <p className="text-xs font-extrabold uppercase tracking-widest text-[#3D493D]">
        {title}
      </p>
      <div className="mt-3 space-y-2">
        {options.map((option) => (
          <label key={option} className="flex cursor-pointer items-center gap-3 rounded-2xl border border-[#E2E8DF] px-4 py-3.5 transition hover:bg-[#F4F9F4] hover:border-[#C5D1C3]">
            <input type="checkbox" className="h-4 w-4 accent-[#2E7D32] rounded border-[#C5D1C3]" />
            <span className="text-sm font-bold text-[#5F6E5E]">
              {option}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   FARMER MODAL
========================================================= */

function FarmerModal({ farmer, onClose, d, lang }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-[#172117]/40 p-5 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[430px] overflow-hidden rounded-3xl bg-white shadow-2xl"
      >
        <div className="relative h-32 bg-[#2E7D32]">
          <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-[url('https://images.unsplash.com/photo-1592982537447-6f29fb462bd8?auto=format&fit=crop&w=600&q=80')] bg-cover bg-center" />
          <button
            type="button"
            onClick={onClose}
            className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition hover:bg-white/30"
          >
            <X size={18} />
          </button>
        </div>

        <div className="-mt-12 px-6 pb-8">
          <div className="flex h-24 w-24 items-center justify-center rounded-3xl border-4 border-white bg-[#E8F5E9] text-3xl font-extrabold text-[#2E7D32] shadow-sm">
            {farmer.farmer.split(" ").map((n) => n[0]).join("")}
          </div>

          <div className="mt-4 flex items-center gap-2">
            <h2 className="text-2xl font-extrabold text-[#172117]">
              {farmer.farmer}
            </h2>
            <Verified size={20} className="text-[#2E7D32]" />
          </div>
          <p className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-[#7A8A78]">
            <MapPin size={14} />
            {farmer.location}
          </p>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="rounded-2xl border border-[#E2E8DF] bg-[#F8FAF7] p-3 text-center">
              <Star size={18} fill="currentColor" className="mx-auto text-amber-400" />
              <p className="mt-1.5 text-base font-extrabold text-[#172117]">{farmer.rating}</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#7A8A78]">Rating</p>
            </div>
            <div className="rounded-2xl border border-[#E2E8DF] bg-[#F8FAF7] p-3 text-center">
              <Package size={18} className="mx-auto text-[#2E7D32]" />
              <p className="mt-1.5 text-base font-extrabold text-[#172117]">{farmer.sales}</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#7A8A78]">{d.sales}</p>
            </div>
            <div className="rounded-2xl border border-[#E2E8DF] bg-[#F8FAF7] p-3 text-center">
              <ShieldCheck size={18} className="mx-auto text-[#2E7D32]" />
              <p className="mt-1.5 text-base font-extrabold text-[#172117]">{d.verified}</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#7A8A78]">Profile</p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-[#C5D1C3] bg-[#E8F5E9]/50 p-4">
            <div className="flex gap-4">
              <ShieldCheck size={24} className="shrink-0 text-[#2E7D32]" />
              <div>
                <p className="text-sm font-extrabold text-[#1B5E20]">
                  {d.farmerProfile}
                </p>
                <p className="mt-1 text-xs font-medium leading-relaxed text-[#3D493D]">
                  {d.farmerNote}
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="mt-6 w-full rounded-2xl bg-[#2E7D32] py-4 text-sm font-extrabold text-white shadow-sm transition hover:bg-[#1B5E20]"
          >
            {d.viewDetails}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}