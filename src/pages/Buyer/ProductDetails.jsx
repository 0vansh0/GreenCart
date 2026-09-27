import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Clock3,
  Download,
  Heart,
  Info,
  Leaf,
  MapPin,
  MessageCircle,
  Minus,
  PackageCheck,
  Plus,
  Scale,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Star,
  Truck,
  Verified,
  X,
  Globe2,
  ZoomIn,
  Volume2,
  Layers,
  TrendingUp,
} from "lucide-react";
import { useNavigate, useParams } from "react-router";

import BuyerHeader from "../../components/BuyerHeader";
import { useBuyerAuth } from "../../context/BuyerAuthContext";
import { useCart } from "../../context/CartContext";

/* -------------------------------------------------------------------------- */
/* DEMO PRODUCT DATA (WITH HINDI TRANSLATIONS & ADVANCED COMMODITY DETAILS) */
/* -------------------------------------------------------------------------- */

const PRODUCTS = [
  {
    id: 1,
    name: "Premium Sharbati Wheat",
    nameHi: "प्रीमियम शरबती गेहूं",
    variety: "Sharbati",
    varietyHi: "शरबती",
    category: "Wheat",
    categoryHi: "गेहूं",
    price: 2920,
    mandiPrice: 2760,
    quantity: 120,
    unit: "Qtl",
    location: "Muzaffarpur, Bihar",
    harvest: "18 Sep 2026",
    moisture: "11.8%",
    quality: "98.2%",
    grade: "Premium Grade",
    gradeHi: "प्रीमियम ग्रेड",
    images: [
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=1400&q=90",
    ],
    farmer: {
      name: "Rajesh Kumar",
      rating: 4.8,
      sales: 126,
      verified: true,
      audioNote: "सुनिए किसान की आवाज़: इस लॉट की नमी 11.8% है और इसकी सफाई ट्रिपल-स्क्रीन मशीन से की गई है।",
      audioNoteEn: "Listen to farmer: This lot has 11.8% moisture and was cleaned using a triple-screen sorting machine.",
    },
    traceability: {
      district: "Muzaffarpur",
      coordinates: "26.1226° N, 85.3906° E",
      soilType: "Alluvial Loam",
      storageType: "Hermetic PICS Grain Storage Bags",
      harvestTimestamp: "18 Sept 2026, 06:00 AM",
    },
    trend: [2700, 2715, 2690, 2740, 2760, 2785, 2760],
    volatility30d: "+4.8% (Stable Bullish)",
    freight: {
      base: 4200,
      perQtl: 85,
      mandiTax: 1450,
    },
    inspection: {
      reportId: "GC-QA-2026-0918",
      lab: "GreenCart Quality Network",
      date: "18 Sep 2026",
      score: "98.2%",
    },
  },
  {
    id: 2,
    name: "Basmati Rice 1121",
    nameHi: "बासमती चावल 1121",
    variety: "1121",
    varietyHi: "1121",
    category: "Rice",
    categoryHi: "चावल",
    price: 6400,
    mandiPrice: 6210,
    quantity: 80,
    unit: "Qtl",
    location: "Patna, Bihar",
    harvest: "15 Sep 2026",
    moisture: "12.4%",
    quality: "97.6%",
    grade: "Premium",
    gradeHi: "प्रीमियम",
    images: [
      "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=1400&q=90",
    ],
    farmer: {
      name: "Amit Singh",
      rating: 4.9,
      sales: 214,
      verified: true,
      audioNote: "सुनिए किसान की आवाज़: यह पारंपरिक 1121 बासमती है, एरोमा ग्रेड सर्वोच्च है।",
      audioNoteEn: "Listen to farmer: Traditional 1121 Basmati with top-tier aroma grade.",
    },
    traceability: {
      district: "Patna",
      coordinates: "25.5941° N, 85.1376° E",
      soilType: "Gangetic Alluvial",
      storageType: "Pest-controlled Silo",
      harvestTimestamp: "15 Sept 2026, 07:30 AM",
    },
    trend: [6060, 6120, 6150, 6175, 6210, 6250, 6210],
    volatility30d: "+2.9% (Steady)",
    freight: { base: 3900, perQtl: 72, mandiTax: 1800 },
    inspection: { reportId: "GC-QA-2026-0915", lab: "GreenCart Quality Network", date: "15 Sep 2026", score: "97.6%" },
  },
  {
    id: 3,
    name: "Yellow Maize",
    nameHi: "पीला मक्का",
    variety: "Hybrid",
    varietyHi: "हाइब्रिड",
    category: "Maize",
    categoryHi: "मक्का",
    price: 2200,
    mandiPrice: 2140,
    quantity: 200,
    unit: "Qtl",
    location: "Purnia, Bihar",
    harvest: "12 Sep 2026",
    moisture: "13.2%",
    quality: "96.9%",
    grade: "Grade A",
    gradeHi: "ग्रेड ए",
    images: [
      "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=1400&q=90",
    ],
    farmer: {
      name: "Sanjay Yadav",
      rating: 4.7,
      sales: 98,
      verified: true,
      audioNote: "सुनिए किसान की आवाज़: पोल्ट्री और फीड मिल के लिए उत्तम पीला मक्का।",
      audioNoteEn: "Listen to farmer: Premium yellow maize well-suited for poultry and feed mills.",
    },
    traceability: {
      district: "Purnia",
      coordinates: "25.7781° N, 87.4753° E",
      soilType: "Kosi Basin Loam",
      storageType: "Standard Dry Storage",
      harvestTimestamp: "12 Sept 2026, 08:00 AM",
    },
    trend: [2070, 2090, 2110, 2100, 2140, 2160, 2140],
    volatility30d: "+1.5% (Balanced)",
    freight: { base: 5200, perQtl: 64, mandiTax: 1100 },
    inspection: { reportId: "GC-QA-2026-0912", lab: "GreenCart Quality Network", date: "12 Sep 2026", score: "96.9%" },
  },
  {
    id: 4,
    name: "Premium Mustard",
    nameHi: "प्रीमियम सरसों",
    variety: "Pusa Bold",
    varietyHi: "पूसा बोल्ड",
    category: "Mustard",
    categoryHi: "सरसों",
    price: 5750,
    mandiPrice: 5580,
    quantity: 65,
    unit: "Qtl",
    location: "Jaipur, Rajasthan",
    harvest: "10 Sep 2026",
    moisture: "8.9%",
    quality: "98.8%",
    grade: "Premium",
    gradeHi: "प्रीमियम",
    images: [
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1400&q=90",
    ],
    farmer: {
      name: "Deepak Sharma",
      rating: 4.8,
      sales: 157,
      verified: true,
      audioNote: "सुनिए किसान की आवाज़: तेल की मात्रा उच्च (42%+) वाली पूसा बोल्ड सरसों।",
      audioNoteEn: "Listen to farmer: Pusa Bold mustard with high oil yield content (42%+).",
    },
    traceability: {
      district: "Jaipur",
      coordinates: "26.9124° N, 75.7873° E",
      soilType: "Semi-Arid Sandy Loam",
      storageType: "Jute Gunny Bags (Aerated)",
      harvestTimestamp: "10 Sept 2026, 06:30 AM",
    },
    trend: [5510, 5540, 5570, 5600, 5580, 5615, 5580],
    volatility30d: "-0.8% (Consolidating)",
    freight: { base: 6100, perQtl: 96, mandiTax: 2100 },
    inspection: { reportId: "GC-QA-2026-0910", lab: "GreenCart Quality Network", date: "10 Sep 2026", score: "98.8%" },
  },
];

/* -------------------------------------------------------------------------- */
/* TRANSLATIONS DICTIONARY                                                  */
/* -------------------------------------------------------------------------- */

const t = {
  EN: {
    back: "Back to marketplace",
    notFound: "Crop lot not found",
    notFoundDesc: "This listing may have been removed or is no longer available.",
    verifiedFarmer: "Verified Farmer",
    quality: "Quality",
    moisture: "Moisture",
    available: "Available",
    qualityVerifiedMsg: "Quality verified for this crop lot",
    viewInspection: "View inspection",
    harvested: "Harvested",
    askingPrice: "Asking price",
    mandi: "Mandi",
    vsMandi: "vs mandi",
    benchmark: "Current listing benchmark",
    completedSales: "completed sales",
    maxQty: "Max",
    estValue: "Estimated crop value",
    beforeLogistics: "Before logistics",
    addToCart: "Add to Cart",
    purchaseReq: "Purchase Request",
    negotiate: "Negotiate price with farmer",
    guaranteeTitle: "GreenCart Quality Guarantee",
    guaranteeDesc: "Quality and delivery conditions can be verified before transaction completion.",
    mandiIntel: "Mandi price intelligence",
    benchmark7d: "7-day local benchmark",
    currentBenchmark: "Current benchmark",
    indicativeData: "Indicative market data",
    daysAgo: "7 days ago",
    today: "Today",
    doorEstimate: "Land-to-door estimate",
    estLogistics: "Estimated logistics cost",
    deliveryLoc: "Delivery location",
    freight: "Freight",
    estDeliveredVal: "Estimated delivered value",
    freightNote: "Freight is an indicative prototype estimate. Final logistics pricing depends on route, vehicle and shipment details.",
    qualityVerification: "Quality verification",
    inspectionInfo: "Inspection information",
    grade: "Grade",
    inspectionId: "Inspection ID",
    viewPdf: "View Quality Inspection PDF",
    requestSample: "Request a sample",
    inspectBefore: "Inspect before bulk purchase",
    sampleDesc: "Request a small physical sample before placing a large multi-quintal purchase request.",
    suggestedSample: "Suggested sample",
    sampleNote: "Sample availability and courier charges will be confirmed by the farmer.",
    sendSample: "Request Physical Sample",
    transProtection: "Transaction protection",
    verifiedListing: "Verified listing",
    verifiedListingDesc: "Farmer and crop information is presented with verification status.",
    qualityHold: "Quality hold",
    qualityHoldDesc: "Quality conditions can be checked against the agreed transaction terms.",
    deliverySupport: "Delivery support",
    deliverySupportDesc: "Logistics details can be estimated before final confirmation.",
    prototypeNote: "Prices, freight estimates and market indicators shown here are demo values for the GreenCart prototype and should be connected to verified market data before production use.",
    negotiation: "B2B negotiation",
    counterOffer: "Make a counter offer",
    reason: "Reason",
    bulkDiscount: "Bulk order discount",
    selfPickup: "Self-pickup",
    repeatBuyer: "Repeat buyer",
    proposedPrice: "Proposed price / Qtl",
    yourOffer: "Your offer",
    difference: "Difference",
    sendOffer: "Send Counter Offer",
    qualityCheck: "Quality check",
    sampleSteps: [
      "Farmer receives your sample request.",
      "Courier availability and charges are confirmed before dispatch.",
      "Bulk purchase can be discussed after sample inspection."
    ],
    qualityReport: "Quality report",
    inspectionDetails: "Inspection details",
    lab: "Inspection lab",
    date: "Inspection date",
    downloadPdf: "Download Inspection PDF",
    traceabilityTitle: "Batch Traceability Ledger",
    traceabilitySubtitle: "Verified origin & storage history",
    district: "Origin District",
    coordinates: "GPS Coordinates",
    soilType: "Soil Composition",
    storageType: "Storage Technology",
    harvestTimestamp: "Harvest Timestamp",
    audioNoteTitle: "Farmer Voice Note",
    playVoice: "Play audio note",
    stopVoice: "Pause audio",
    splitLedgerTitle: "Split Ledger & Net Realization",
    splitLedgerSubtitle: "Complete economic breakdown",
    farmerEarnings: "Farmer Earnings",
    mandiLevies: "Mandi Taxes & Levies",
    logisticsTransit: "Transit & Freight",
    netTotal: "Total Delivered Cost",
    zoomModalTitle: "Crop Lot High-Resolution View",
  },
  HI: {
    back: "बाज़ार पर वापस जाएं",
    notFound: "फसल लॉट नहीं मिला",
    notFoundDesc: "यह लिस्टिंग हटा दी गई है या अब उपलब्ध नहीं है।",
    verifiedFarmer: "सत्यापित किसान",
    quality: "गुणवत्ता",
    moisture: "नमी",
    available: "उपलब्ध",
    qualityVerifiedMsg: "इस फसल लॉट के लिए गुणवत्ता सत्यापित है",
    viewInspection: "निरीक्षण देखें",
    harvested: "कटाई",
    askingPrice: "मांगी गई कीमत",
    mंडी: "मंडी",
    vsMandi: "मंडी के मुकाबले",
    benchmark: "वर्तमान लिस्टिंग बेंचमार्क",
    completedSales: "पूर्ण बिक्री",
    maxQty: "अधिकतम",
    estValue: "अनुमानित फसल मूल्य",
    beforeLogistics: "लॉजिस्टिक्स से पहले",
    addToCart: "कार्ट में डालें",
    purchaseReq: "खरीद अनुरोध",
    negotiate: "किसान के साथ कीमत पर बातचीत करें",
    guaranteeTitle: "ग्रीनकार्ट गुणवत्ता गारंटी",
    guaranteeDesc: "लेनदेन पूरा होने से पहले गुणवत्ता और डिलीवरी शर्तों को सत्यापित किया जा सकता है।",
    mandiIntel: "मंडी मूल्य बुद्धिमत्ता",
    benchmark7d: "7-दिवसीय स्थानीय बेंचमार्क",
    currentBenchmark: "वर्तमान बेंचमार्क",
    indicativeData: "संकेतक बाज़ार डेटा",
    daysAgo: "7 दिन पहले",
    today: "आज",
    doorEstimate: "भूमि-से-द्वार अनुमान",
    estLogistics: "अनुमानित लॉजिस्टिक्स लागत",
    deliveryLoc: "डिलीवरी का स्थान",
    freight: "भाड़ा",
    estDeliveredVal: "अनुमानित डिलीवर मूल्य",
    freightNote: "भाड़ा एक सांकेतिक प्रोटोटाइप अनुमान है। अंतिम लॉजिस्टिक्स मूल्य मार्ग, वाहन और शिपमेंट विवरण पर निर्भर करता है।",
    qualityVerification: "गुणवत्ता सत्यापन",
    inspectionInfo: "निरीक्षण जानकारी",
    grade: "ग्रेड",
    inspectionId: "निरीक्षण आईडी",
    viewPdf: "गुणवत्ता निरीक्षण पीडीएफ देखें",
    requestSample: "नमूना (सैंपल) अनुरोध करें",
    inspectBefore: "थोक खरीद से पहले निरीक्षण करें",
    sampleDesc: "बड़ी बहु-क्विंटल खरीद अनुरोध करने से पहले एक छोटा भौतिक नमूना अनुरोध करें।",
    suggestedSample: "सुझाया गया नमूना",
    sampleNote: "नमूना उपलब्धता और कूरियर शुल्क की पुष्टि किसान द्वारा की जाएगी।",
    sendSample: "भौतिक नमूना अनुरोध भेजें",
    transProtection: "लेनदेन सुरक्षा",
    verifiedListing: "सत्यापित लिस्टिंग",
    verifiedListingDesc: "किसान और फसल की जानकारी सत्यापन स्थिति के साथ प्रस्तुत की जाती है।",
    qualityHold: "गुणवत्ता होल्ड",
    qualityHoldDesc: "सहमति की लेनदेन शर्तों के विरुद्ध गुणवत्ता की स्थिति की जांच की जा सकती है।",
    deliverySupport: "डिलीवरी सहायता",
    deliverySupportDesc: "अंतिम पुष्टि से पहले लॉजिस्टिक्स विवरण का अनुमान लगाया जा सकता है।",
    prototypeNote: "यहां दिखाए गए मूल्य, भाड़ा अनुमान और बाज़ार संकेतक ग्रीनकार्ट प्रोटोटाइप के लिए डेमो मान हैं और उत्पादन उपयोग से पहले सत्यापित बाज़ार डेटा से जुड़े होने चाहिए।",
    negotiation: "बी2बी बातचीत",
    counterOffer: "काउंटर ऑफर दें",
    reason: "कारण",
    bulkDiscount: "थोक ऑर्डर छूट",
    selfPickup: "स्वयं पिकअप",
    repeatBuyer: "बार-बार आने वाला खरीदार",
    proposedPrice: "प्रस्तावित मूल्य / क्विंटल",
    yourOffer: "आपका ऑफर",
    difference: "अंतर",
    sendOffer: "काउंटर ऑफर भेजें",
    qualityCheck: "गुणवत्ता जांच",
    sampleSteps: [
      "किसान को आपका नमूना अनुरोध प्राप्त होता है।",
      "प्रेषण से पहले कूरियर उपलब्धता और शुल्क की पुष्टि की जाती है।",
      "नमूना निरीक्षण के बाद थोक खरीद पर चर्चा की जा सकती है।"
    ],
    qualityReport: "गुणवत्ता रिपोर्ट",
    inspectionDetails: "निरीक्षण विवरण",
    lab: "निरीक्षण लैब",
    date: "निरीक्षण तिथि",
    downloadPdf: "निरीक्षण पीडीएफ डाउनलोड करें",
    traceabilityTitle: "बैच ट्रेसेबिलिटी लेजर",
    traceabilitySubtitle: "सत्यापित मूल और भंडारण इतिहास",
    district: "उत्पत्ति जिला",
    coordinates: "जीपीएस निर्देशांक",
    soilType: "मिट्टी का प्रकार",
    storageType: "भंडारण तकनीक",
    harvestTimestamp: "कटाई का समय",
    audioNoteTitle: "किसान का ऑडियो नोट",
    playVoice: "ऑडियो सुनें",
    stopVoice: "ऑडियो रोकें",
    splitLedgerTitle: "स्प्लिट लेजर और शुद्ध प्राप्ति",
    splitLedgerSubtitle: "पूर्ण आर्थिक विवरण",
    farmerEarnings: "किसान की कमाई",
    mandiLevies: "मंडी कर और लेवी",
    logisticsTransit: "परिवहन और भाड़ा",
    netTotal: "कुल डिलीवर लागत",
    zoomModalTitle: "फसल लॉट उच्च-रिज़ॉल्यूशन दृश्य",
  }
};

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { isAuthenticated } = useBuyerAuth();
  const { addToCart } = useCart();

  const [lang, setLang] = useState("EN");
  const d = t[lang];

  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const [showOffer, setShowOffer] = useState(false);
  const [offerPrice, setOfferPrice] = useState("");
  const [offerReason, setOfferReason] = useState("Bulk order discount");

  const [showSample, setShowSample] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  const [deliveryLocation, setDeliveryLocation] = useState("Patna, Bihar");
  const [toast, setToast] = useState("");

  const product = PRODUCTS.find((item) => String(item.id) === String(id));

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F8FAF7] text-[#172117]">
        <BuyerHeader />
        <main className="mx-auto max-w-3xl px-5 py-16">
          <div className="rounded-3xl border border-[#E2E8DF] bg-white p-10 text-center shadow-sm">
            <h1 className="text-2xl font-black text-[#172117]">{d.notFound}</h1>
            <p className="mt-2 text-sm text-[#5F6E5E]">{d.notFoundDesc}</p>
            <button
              onClick={() => navigate("/marketplace")}
              className="mt-6 rounded-2xl bg-[#2E7D32] px-6 py-3 text-xs font-bold text-white shadow-sm transition hover:bg-[#1B5E20]"
            >
              {d.back}
            </button>
          </div>
        </main>
      </div>
    );
  }

  const marginPercent = ((product.price - product.mandiPrice) / product.mandiPrice) * 100;
  const total = product.price * quantity;
  const freightCost = product.freight.base + product.freight.perQtl * quantity;
  const mandiLeviesTotal = (product.freight.mandiTax || 1200) * (quantity / 10);
  const estimatedDeliveredCost = total + freightCost + mandiLeviesTotal;

  const priceChange = product.trend[product.trend.length - 1] - product.trend[0];
  const priceChangePercent = (priceChange / product.trend[0]) * 100;

  const showToast = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2500);
  };

  const requireLogin = (action) => {
    navigate("/buyer/login", {
      state: { from: `/product/${product.id}`, action },
    });
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      requireLogin("add-to-cart");
      return;
    }
    addToCart(product, quantity);
    showToast(`${lang === "HI" && product.nameHi ? product.nameHi : product.name} added to your cart`);
  };

  const handlePurchaseRequest = () => {
    if (!isAuthenticated) {
      requireLogin("purchase");
      return;
    }
    navigate("/cart");
  };

  const submitOffer = () => {
    if (!isAuthenticated) {
      requireLogin("make-offer");
      return;
    }
    if (!offerPrice || Number(offerPrice) <= 0) return;
    setShowOffer(false);
    showToast(`₹${Number(offerPrice).toLocaleString("en-IN")}/Qtl offer submitted`);
  };

  const requestSample = () => {
    if (!isAuthenticated) {
      requireLogin("sample-request");
      return;
    }
    setShowSample(false);
    showToast(lang === "HI" ? "नमूना अनुरोध किसान को भेज दिया गया" : "Sample request sent to the farmer");
  };

  const downloadCertificate = () => {
    showToast(`Inspection report ${product.inspection.reportId} prepared`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAF7] text-[#172117] selection:bg-[#2E7D32] selection:text-white">
      <BuyerHeader />

      <main className="mx-auto max-w-[1380px] px-5 py-7 lg:px-8">

        {/* TOP BAR: BACK & LANGUAGE TOGGLE */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => navigate("/marketplace")}
            className="flex items-center gap-2 text-xs font-bold text-[#5F6E5E] transition hover:text-[#2E7D32]"
          >
            <ArrowLeft size={15} />
            {d.back}
          </button>

          <button
            onClick={() => setLang(lang === "EN" ? "HI" : "EN")}
            className="flex items-center gap-2 rounded-xl border border-[#E2E8DF] bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#3D493D] shadow-sm transition hover:border-[#2E7D32] hover:bg-[#F4F9F4] hover:text-[#2E7D32]"
          >
            <Globe2 size={16} />
            {lang === "EN" ? "हिन्दी" : "English"}
          </button>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* MAIN PRODUCT GRID WITH ITEMS-START & H-FIT FIX                   */}
        {/* ---------------------------------------------------------------- */}

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] items-start">

          {/* IMAGE GALLERY SIDE - Added h-fit to eliminate blank vertical spacing */}
          <section className="relative overflow-hidden rounded-[28px] border border-[#E2E8DF] bg-white shadow-sm flex flex-col h-fit">
            <div className="relative aspect-[4/3] overflow-hidden group">
              <img
                src={product.images[activeImageIndex]}
                alt={product.name}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#172117]/75 to-transparent pointer-events-none" />

              {/* TOP BADGES */}
              <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                {product.farmer.verified && (
                  <span className="flex items-center gap-1.5 rounded-full border border-white/40 bg-white/90 px-3 py-1.5 text-[10px] font-bold text-[#2E7D32] shadow-md backdrop-blur-xl">
                    <Verified size={12} />
                    {d.verifiedFarmer}
                  </span>
                )}
                <span className="rounded-full border border-white/40 bg-white/80 px-3 py-1.5 text-[10px] font-bold text-[#3D493D] shadow-md backdrop-blur-xl">
                  {lang === "HI" && product.gradeHi ? product.gradeHi : product.grade}
                </span>
              </div>

              {/* ZOOM BUTTON */}
              <button
                onClick={() => setIsZoomOpen(true)}
                className="absolute right-16 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/90 shadow-md backdrop-blur-xl transition hover:scale-105 text-[#5F6E5E] hover:text-[#2E7D32]"
                title="Zoom view"
              >
                <ZoomIn size={17} />
              </button>

              {/* LIKE BUTTON */}
              <button
                onClick={() => setLiked((val) => !val)}
                className={`absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/90 shadow-md backdrop-blur-xl transition hover:scale-105 ${
                  liked ? "text-red-500" : "text-[#5F6E5E]"
                }`}
              >
                <Heart size={17} fill={liked ? "currentColor" : "none"} />
              </button>

              {/* IMAGE METRICS */}
              <div className="absolute bottom-5 left-5 right-5 grid grid-cols-3 gap-2">
                <GlassMetric label={d.quality} value={product.quality} />
                <GlassMetric label={d.moisture} value={product.moisture} />
                <GlassMetric label={d.available} value={`${product.quantity} ${product.unit}`} />
              </div>
            </div>

            {/* THUMBNAILS BAR */}
            {product.images.length > 1 && (
              <div className="flex gap-2.5 p-4 bg-[#F8FAF7] border-t border-[#E2E8DF]">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative h-16 w-20 overflow-hidden rounded-xl border-2 transition ${
                      activeImageIndex === idx ? "border-[#2E7D32] ring-2 ring-[#2E7D32]/20" : "border-[#E2E8DF] opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* IMAGE FOOTER */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 mt-auto">
              <div className="flex items-center gap-2">
                <Sparkles size={15} className="text-[#2E7D32]" />
                <span className="text-xs font-semibold text-[#5F6E5E]">
                  {d.qualityVerifiedMsg}
                </span>
              </div>
              <button
                onClick={() => setShowCertificate(true)}
                className="flex items-center gap-1.5 text-xs font-bold text-[#2E7D32] hover:text-[#1B5E20]"
              >
                {d.viewInspection}
                <ArrowUpRight size={14} />
              </button>
            </div>
          </section>

          {/* DETAILS SIDE */}
          <section className="rounded-[28px] border border-[#E2E8DF] bg-white p-6 shadow-sm lg:p-8 flex flex-col">

            {/* CATEGORY & HARVEST */}
            <div className="flex items-center justify-between gap-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E8F5E9] px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-[#2E7D32]">
                <Leaf size={11} />
                {lang === "HI" && product.categoryHi ? product.categoryHi : product.category} · {lang === "HI" && product.varietyHi ? product.varietyHi : product.variety}
              </span>

              <span className="flex items-center gap-1.5 text-xs font-semibold text-[#7A8A78]">
                <Clock3 size={13} />
                {d.harvested} {product.harvest}
              </span>
            </div>

            {/* TITLE & LOCATION */}
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[#172117] lg:text-[34px]">
              {lang === "HI" && product.nameHi ? product.nameHi : product.name}
            </h1>

            <div className="mt-2 flex items-center gap-2 text-xs font-medium text-[#5F6E5E]">
              <MapPin size={14} className="text-[#2E7D32]" />
              {product.location}
            </div>

            {/* PRICE CARD */}
            <div className="mt-6 rounded-2xl border border-[#C5D1C3] bg-gradient-to-br from-[#E8F5E9]/50 to-white p-5 shadow-sm">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#7A8A78]">
                    {d.askingPrice}
                  </p>
                  <p className="mt-1 text-3xl font-extrabold tracking-tight text-[#1B5E20]">
                    ₹{product.price.toLocaleString("en-IN")}
                    <span className="ml-1 text-xs font-bold text-[#5F6E5E]">/ Qtl</span>
                  </p>
                </div>

                <div className="rounded-xl bg-white px-3.5 py-2 text-right shadow-sm border border-[#E2E8DF]">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-[#7A8A78]">{d.mandi}</p>
                  <p className="text-xs font-extrabold text-[#3D493D]">₹{product.mandiPrice.toLocaleString("en-IN")}</p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <span className="rounded-full bg-[#2E7D32] px-2.5 py-1 text-[10px] font-extrabold text-white shadow-sm">
                  +{marginPercent.toFixed(1)}% {d.vsMandi}
                </span>
                <span className="text-[10px] font-medium text-[#7A8A78]">
                  {d.benchmark}
                </span>
              </div>
            </div>

            {/* FARMER INFO & AUDIO NOTE */}
            <div className="mt-5 rounded-2xl border border-[#E2E8DF] p-4 bg-[#F8FAF7]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F5E9] text-xs font-black text-[#2E7D32]">
                    {getInitials(product.farmer.name)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-extrabold text-[#172117]">{product.farmer.name}</p>
                      <CheckCircle2 size={13} className="text-[#2E7D32]" />
                    </div>
                    <p className="mt-0.5 text-[11px] text-[#5F6E5E]">
                      {product.farmer.sales} {d.completedSales}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1.5 border border-amber-200">
                  <Star size={12} fill="currentColor" className="text-amber-400" />
                  <span className="text-xs font-bold text-amber-800">{product.farmer.rating}</span>
                </div>
              </div>

              {/* FARMER AUDIO NOTE PLAYER */}
              <div className="mt-3.5 flex items-center justify-between rounded-xl bg-white p-3 border border-[#E2E8DF]">
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2E7D32] text-white transition hover:bg-[#1B5E20]"
                    aria-label="Play farmer audio note"
                  >
                    <Volume2 size={14} className={isPlayingAudio ? "animate-pulse" : ""} />
                  </button>
                  <span className="text-xs font-bold text-[#3D493D]">
                    {d.audioNoteTitle}
                  </span>
                </div>
                <span className="text-[11px] font-medium text-[#7A8A78]">
                  {isPlayingAudio ? (lang === "HI" ? "चल रहा है..." : "Playing...") : "0:14s"}
                </span>
              </div>
              <p className="mt-2 text-[11px] italic text-[#5F6E5E]">
                "{lang === "HI" ? product.farmer.audioNote : product.farmer.audioNoteEn}"
              </p>
            </div>

            {/* QUANTITY SELECTOR */}
            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-wider text-[#3D493D]">Quantity</p>
                <p className="text-xs font-semibold text-[#7A8A78]">
                  {d.maxQty} {product.quantity} Qtl
                </p>
              </div>

              <div className="flex h-14 items-center justify-between rounded-2xl border border-[#E2E8DF] bg-[#F8FAF7] px-3">
                <button
                  onClick={() => setQuantity((v) => Math.max(1, v - 1))}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#5F6E5E] shadow-sm transition hover:text-[#2E7D32]"
                >
                  <Minus size={16} />
                </button>
                <span className="text-sm font-extrabold text-[#172117]">
                  {quantity} Qtl
                </span>
                <button
                  onClick={() => setQuantity((v) => Math.min(product.quantity, v + 1))}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#5F6E5E] shadow-sm transition hover:text-[#2E7D32]"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* ESTIMATED VALUE */}
            <div className="mt-5 flex items-end justify-between px-1">
              <div>
                <p className="text-xs font-semibold text-[#7A8A78]">{d.estValue}</p>
                <p className="mt-1 text-2xl font-black tracking-tight text-[#172117]">
                  ₹{total.toLocaleString("en-IN")}
                </p>
              </div>
              <p className="text-xs font-medium text-[#7A8A78]">{d.beforeLogistics}</p>
            </div>

            {/* PRIMARY ACTIONS */}
            <div className="mt-6 grid grid-cols-[1fr_1.2fr] gap-3">
              <button
                onClick={handleAddToCart}
                className="group flex h-14 items-center justify-center gap-2 rounded-2xl border-2 border-[#2E7D32] bg-[#E8F5E9] text-xs font-extrabold text-[#2E7D32] transition hover:bg-[#DCEBD7]"
              >
                <ShoppingCart size={18} className="transition group-hover:scale-110" />
                {d.addToCart}
              </button>

              <button
                onClick={handlePurchaseRequest}
                className="group flex h-14 items-center justify-center gap-2 rounded-2xl bg-[#2E7D32] text-xs font-extrabold text-white shadow-md shadow-[#2E7D32]/20 transition hover:-translate-y-0.5 hover:bg-[#1B5E20]"
              >
                <Truck size={18} className="transition group-hover:translate-x-0.5" />
                {d.purchaseReq}
              </button>
            </div>

            {/* SECONDARY ACTION */}
            <button
              onClick={() => setShowOffer(true)}
              className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-2xl text-xs font-bold text-[#5F6E5E] transition hover:bg-[#F8FAF7] hover:text-[#2E7D32]"
            >
              <Scale size={15} />
              {d.negotiate}
            </button>

            {/* GUARANTEE BOX */}
            <div className="mt-5 flex items-start gap-3.5 rounded-2xl border border-[#C5D1C3] bg-[#E8F5E9]/40 p-4">
              <ShieldCheck size={20} className="mt-0.5 shrink-0 text-[#2E7D32]" />
              <div>
                <p className="text-xs font-extrabold text-[#1B5E20]">
                  {d.guaranteeTitle}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-[#3D493D]">
                  {d.guaranteeDesc}
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* BATCH TRACEABILITY LEDGER & MANDI INTELLIGENCE                   */}
        {/* ---------------------------------------------------------------- */}

        <div className="mt-8 grid gap-6 lg:grid-cols-2">

          {/* BATCH TRACEABILITY LEDGER */}
          <section className="rounded-[28px] border border-[#E2E8DF] bg-white p-6 shadow-sm">
            <SectionHeading icon={Layers} title={d.traceabilityTitle} subtitle={d.traceabilitySubtitle} />

            <div className="mt-6 space-y-3.5">
              <QualityRow label={d.district} value={product.traceability.district} />
              <QualityRow label={d.coordinates} value={product.traceability.coordinates} />
              <QualityRow label={d.soilType} value={product.traceability.soilType} />
              <QualityRow label={d.storageType} value={product.traceability.storageType} />
              <QualityRow label={d.harvestTimestamp} value={product.traceability.harvestTimestamp} />
            </div>

            <div className="mt-5 flex items-center gap-2 rounded-2xl bg-[#E8F5E9]/50 p-3.5 border border-[#C5D1C3]">
              <Sparkles size={16} className="text-[#2E7D32]" />
              <p className="text-xs font-bold text-[#1B5E20]">
                {lang === "HI" ? "100% स्रोत-सत्यापित कृषि उत्पाद" : "100% Source-Verified Agricultural Lot"}
              </p>
            </div>
          </section>

          {/* MANDI TREND */}
          <section className="rounded-[28px] border border-[#E2E8DF] bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F5E9] text-[#2E7D32]">
                  <TrendingUp size={20} />
                </div>
                <div>
                  <p className="text-sm font-extrabold text-[#172117]">{d.mandiIntel}</p>
                  <p className="text-xs text-[#7A8A78]">{product.volatility30d}</p>
                </div>
              </div>
              <span className="rounded-full bg-[#E8F5E9] px-3 py-1 text-xs font-extrabold text-[#2E7D32]">
                +{priceChangePercent.toFixed(1)}% / 7D
              </span>
            </div>

            <div className="mt-6 flex items-end justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#7A8A78]">{d.currentBenchmark}</p>
                <p className="mt-1 text-2xl font-black text-[#172117]">
                  ₹{product.mandiPrice.toLocaleString("en-IN")}
                </p>
              </div>
              <p className="text-xs text-[#7A8A78]">{d.indicativeData}</p>
            </div>

            <TrendChart values={product.trend} />

            <div className="mt-3 flex justify-between text-xs font-semibold text-[#7A8A78]">
              <span>{d.daysAgo}</span>
              <span>{d.today}</span>
            </div>
          </section>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* SPLIT LEDGER & FREIGHT ESTIMATOR                                 */}
        {/* ---------------------------------------------------------------- */}

        <div className="mt-8 grid gap-6 lg:grid-cols-2">

          {/* SPLIT LEDGER COST BREAKDOWN */}
          <section className="rounded-[28px] border border-[#E2E8DF] bg-white p-6 shadow-sm">
            <SectionHeading icon={Scale} title={d.splitLedgerTitle} subtitle={d.splitLedgerSubtitle} />

            <div className="mt-6 space-y-3.5">
              <QualityRow label={`${d.farmerEarnings} (${quantity} Qtl)`} value={`₹${total.toLocaleString("en-IN")}`} />
              <QualityRow label={d.mandiLevies} value={`₹${mandiLeviesTotal.toLocaleString("en-IN")}`} />
              <QualityRow label={d.logisticsTransit} value={`₹${freightCost.toLocaleString("en-IN")}`} />
              <div className="pt-2 border-t border-[#E2E8DF] flex items-center justify-between">
                <span className="text-xs font-extrabold text-[#172117]">{d.netTotal}</span>
                <span className="text-sm font-black text-[#2E7D32]">₹{estimatedDeliveredCost.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </section>

          {/* LAND-TO-DOOR FREIGHT ESTIMATOR */}
          <FreightEstimator
            product={product}
            quantity={quantity}
            deliveryLocation={deliveryLocation}
            setDeliveryLocation={setDeliveryLocation}
            freightCost={freightCost}
            estimatedDeliveredCost={estimatedDeliveredCost}
            d={d}
          />
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* QUALITY + SAMPLE + GUARANTEE                                     */}
        {/* ---------------------------------------------------------------- */}

        <div className="mt-8 grid gap-6 lg:grid-cols-3">

          {/* QUALITY VERIFICATION */}
          <section className="rounded-[28px] border border-[#E2E8DF] bg-white p-6 shadow-sm">
            <SectionHeading icon={PackageCheck} title={d.qualityVerification} subtitle={d.inspectionInfo} />

            <div className="mt-6 space-y-3">
              <QualityRow label={d.quality} value={product.quality} />
              <QualityRow label={d.moisture} value={product.moisture} />
              <QualityRow label={d.grade} value={lang === "HI" && product.gradeHi ? product.gradeHi : product.grade} />
              <QualityRow label={d.inspectionId} value={product.inspection.reportId} />
            </div>

            <button
              onClick={() => setShowCertificate(true)}
              className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-2xl border-2 border-[#E2E8DF] text-xs font-bold text-[#3D493D] transition hover:border-[#2E7D32] hover:bg-[#F4F9F4] hover:text-[#2E7D32]"
            >
              <Download size={16} />
              {d.viewPdf}
            </button>
          </section>

          {/* REQUEST SAMPLE */}
          <section className="rounded-[28px] border border-[#E2E8DF] bg-white p-6 shadow-sm">
            <SectionHeading icon={Leaf} title={d.requestSample} subtitle={d.inspectBefore} />

            <p className="mt-6 text-xs leading-relaxed text-[#5F6E5E]">
              {d.sampleDesc}
            </p>

            <div className="mt-6 rounded-2xl bg-[#F8FAF7] p-4 border border-[#E2E8DF]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#5F6E5E]">{d.suggestedSample}</span>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-[#172117] shadow-sm border border-[#E2E8DF]">
                  1–2 kg
                </span>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-[#7A8A78]">
                {d.sampleNote}
              </p>
            </div>

            <button
              onClick={() => setShowSample(true)}
              className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#172117] text-xs font-bold text-white shadow-sm transition hover:bg-[#2C3E2D]"
            >
              <MessageCircle size={16} />
              {d.sendSample}
            </button>
          </section>

          {/* GUARANTEE CARD */}
          <section className="rounded-[28px] border border-[#C5D1C3] bg-gradient-to-br from-[#E8F5E9]/60 to-white p-6 shadow-sm">
            <SectionHeading icon={ShieldCheck} title={d.guaranteeTitle} subtitle={d.transProtection} />

            <div className="mt-6 space-y-4">
              <GuaranteeRow title={d.verifiedListing} text={d.verifiedListingDesc} />
              <GuaranteeRow title={d.qualityHold} text={d.qualityHoldDesc} />
              <GuaranteeRow title={d.deliverySupport} text={d.deliverySupportDesc} />
            </div>
          </section>
        </div>

        {/* FOOTER NOTE */}
        <div className="mt-8 flex items-center gap-3 rounded-2xl border border-[#E2E8DF] bg-white p-4 shadow-sm">
          <Info size={16} className="shrink-0 text-[#7A8A78]" />
          <p className="text-xs leading-relaxed text-[#7A8A78]">
            {d.prototypeNote}
          </p>
        </div>
      </main>

      {/* ------------------------------------------------------------------ */}
      {/* ZOOM IMAGE MODAL                                                   */}
      {/* ------------------------------------------------------------------ */}

      <AnimatePresence>
        {isZoomOpen && (
          <ModalShell onClose={() => setIsZoomOpen(false)}>
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-lg font-extrabold text-[#172117]">{d.zoomModalTitle}</h2>
              <CloseButton onClick={() => setIsZoomOpen(false)} />
            </div>
            <div className="overflow-hidden rounded-2xl border border-[#E2E8DF]">
              <img
                src={product.images[activeImageIndex]}
                alt="Zoomed crop"
                className="h-full w-full object-cover transform scale-125"
              />
            </div>
          </ModalShell>
        )}
      </AnimatePresence>

      {/* ------------------------------------------------------------------ */}
      {/* COUNTER OFFER MODAL                                                */}
      {/* ------------------------------------------------------------------ */}

      <AnimatePresence>
        {showOffer && (
          <ModalShell onClose={() => setShowOffer(false)}>
            <div className="flex items-start justify-between">
              <div>
                <span className="inline-flex rounded-full bg-[#E8F5E9] px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#2E7D32]">
                  {d.negotiation}
                </span>
                <h2 className="mt-3 text-2xl font-extrabold text-[#172117]">{d.counterOffer}</h2>
                <p className="mt-1 text-xs text-[#5F6E5E]">
                  {d.askingPrice}: ₹{product.price.toLocaleString("en-IN")} / Qtl
                </p>
              </div>
              <CloseButton onClick={() => setShowOffer(false)} />
            </div>

            <div className="mt-6">
              <p className="mb-2.5 text-xs font-bold uppercase tracking-wider text-[#3D493D]">{d.reason}</p>
              <div className="grid gap-2 sm:grid-cols-3">
                {[d.bulkDiscount, d.selfPickup, d.repeatBuyer].map((reason, i) => {
                  const rawKey = ["Bulk order discount", "Self-pickup", "Repeat buyer"][i];
                  return (
                    <button
                      key={reason}
                      onClick={() => setOfferReason(rawKey)}
                      className={`rounded-xl border p-3 text-xs font-bold transition ${
                        offerReason === rawKey
                          ? "border-[#2E7D32] bg-[#E8F5E9] text-[#1B5E20]"
                          : "border-[#E2E8DF] text-[#5F6E5E] hover:bg-[#F8FAF7]"
                      }`}
                    >
                      {reason}
                    </button>
                  );
                })}
              </div>
            </div>

            <label className="mt-6 block">
              <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#3D493D]">
                {d.proposedPrice}
              </span>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-[#7A8A78]">₹</span>
                <input
                  autoFocus
                  type="number"
                  value={offerPrice}
                  onChange={(e) => setOfferPrice(e.target.value)}
                  placeholder={String(product.price)}
                  className="h-14 w-full rounded-2xl border border-[#E2E8DF] bg-[#F8FAF7] pl-8 pr-4 text-sm font-bold text-[#172117] outline-none transition focus:border-[#2E7D32] focus:bg-white focus:ring-4 focus:ring-[#2E7D32]/10"
                />
              </div>
            </label>

            {offerPrice && (
              <div className="mt-4 rounded-2xl bg-[#F8FAF7] p-4 border border-[#E2E8DF]">
                <div className="flex justify-between text-xs">
                  <span className="text-[#5F6E5E]">{d.yourOffer}</span>
                  <span className="font-extrabold text-[#172117]">
                    ₹{Number(offerPrice).toLocaleString("en-IN")}/Qtl
                  </span>
                </div>
                <div className="mt-2 flex justify-between text-xs">
                  <span className="text-[#5F6E5E]">{d.difference}</span>
                  <span
                    className={`font-extrabold ${
                      Number(offerPrice) < product.price ? "text-amber-600" : "text-[#2E7D32]"
                    }`}
                  >
                    {(((Number(offerPrice) - product.price) / product.price) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            )}

            <button
              onClick={submitOffer}
              className="mt-6 h-14 w-full rounded-2xl bg-[#2E7D32] text-sm font-extrabold text-white shadow-md shadow-[#2E7D32]/20 transition hover:bg-[#1B5E20]"
            >
              {d.sendOffer}
            </button>
          </ModalShell>
        )}
      </AnimatePresence>

      {/* ------------------------------------------------------------------ */}
      {/* SAMPLE MODAL                                                       */}
      {/* ------------------------------------------------------------------ */}

      <AnimatePresence>
        {showSample && (
          <ModalShell onClose={() => setShowSample(false)}>
            <div className="flex items-start justify-between">
              <div>
                <span className="inline-flex rounded-full bg-[#E8F5E9] px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#2E7D32]">
                  {d.qualityCheck}
                </span>
                <h2 className="mt-3 text-2xl font-extrabold text-[#172117]">{d.requestSample}</h2>
              </div>
              <CloseButton onClick={() => setShowSample(false)} />
            </div>

            <div className="mt-6 rounded-2xl bg-[#F8FAF7] p-4 border border-[#E2E8DF]">
              <p className="text-sm font-extrabold text-[#172117]">
                {lang === "HI" && product.nameHi ? product.nameHi : product.name}
              </p>
              <p className="mt-1 text-xs text-[#7A8A78]">
                {d.suggestedSample}: 1–2 kg
              </p>
            </div>

            <div className="mt-6 space-y-3.5">
              {d.sampleSteps.map((step, i) => (
                <div key={i} className="flex gap-3">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#2E7D32]" />
                  <p className="text-xs leading-relaxed text-[#5F6E5E]">{step}</p>
                </div>
              ))}
            </div>

            <button
              onClick={requestSample}
              className="mt-8 h-14 w-full rounded-2xl bg-[#2E7D32] text-sm font-extrabold text-white shadow-md transition hover:bg-[#1B5E20]"
            >
              {d.sendSample}
            </button>
          </ModalShell>
        )}
      </AnimatePresence>

      {/* ------------------------------------------------------------------ */}
      {/* CERTIFICATE MODAL                                                  */}
      {/* ------------------------------------------------------------------ */}

      <AnimatePresence>
        {showCertificate && (
          <ModalShell onClose={() => setShowCertificate(false)}>
            <div className="flex items-start justify-between">
              <div>
                <span className="inline-flex rounded-full bg-[#E8F5E9] px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#2E7D32]">
                  {d.qualityReport}
                </span>
                <h2 className="mt-3 text-2xl font-extrabold text-[#172117]">{d.inspectionDetails}</h2>
              </div>
              <CloseButton onClick={() => setShowCertificate(false)} />
            </div>

            <div className="mt-6 rounded-2xl border border-[#E2E8DF] p-5 bg-[#F8FAF7]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#7A8A78]">{d.inspectionId}</p>
                  <p className="mt-1 text-sm font-extrabold text-[#172117]">{product.inspection.reportId}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E8F5E9]">
                  <PackageCheck size={22} className="text-[#2E7D32]" />
                </div>
              </div>

              <div className="mt-6 space-y-3 border-t border-[#E2E8DF] pt-4">
                <QualityRow label={d.lab} value={product.inspection.lab} />
                <QualityRow label={d.date} value={product.inspection.date} />
                <QualityRow label={d.quality} value={product.inspection.score} />
                <QualityRow label={d.moisture} value={product.moisture} />
              </div>
            </div>

            <button
              onClick={downloadCertificate}
              className="mt-6 h-14 w-full rounded-2xl bg-[#2E7D32] text-sm font-extrabold text-white shadow-md transition hover:bg-[#1B5E20]"
            >
              <Download size={18} className="inline mr-2" />
              {d.downloadPdf}
            </button>
          </ModalShell>
        )}
      </AnimatePresence>

      {/* TOAST NOTIFICATION */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 15, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 10, x: "-50%" }}
            className="fixed bottom-8 left-1/2 z-[150] rounded-2xl bg-[#172117] px-6 py-4 text-xs font-extrabold text-white shadow-2xl backdrop-blur-md"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* HELPER COMPONENTS                                                        */
/* -------------------------------------------------------------------------- */

function GlassMetric({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/40 bg-white/80 px-3 py-3 shadow-lg backdrop-blur-xl">
      <p className="text-[9px] font-bold uppercase tracking-wider text-[#5F6E5E]">{label}</p>
      <p className="mt-1 text-sm font-extrabold text-[#172117]">{value}</p>
    </div>
  );
}

function SectionHeading({ icon: Icon, title, subtitle }) {
  return (
    <div className="flex items-center gap-3.5">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E8F5E9]">
        <Icon size={20} className="text-[#2E7D32]" />
      </div>
      <div>
        <h2 className="text-base font-extrabold text-[#172117]">{title}</h2>
        <p className="text-xs font-medium text-[#7A8A78]">{subtitle}</p>
      </div>
    </div>
  );
}

function QualityRow({ label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-[#E2E8DF] pb-2.5 last:border-0 last:pb-0">
      <span className="text-xs font-medium text-[#7A8A78]">{label}</span>
      <span className="text-xs font-bold text-[#172117]">{value}</span>
    </div>
  );
}

function GuaranteeRow({ title, text }) {
  return (
    <div className="flex gap-3.5">
      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white shadow-sm border border-[#C5D1C3]">
        <Check size={13} className="text-[#2E7D32]" strokeWidth={3} />
      </div>
      <div>
        <p className="text-xs font-extrabold text-[#1B5E20]">{title}</p>
        <p className="mt-0.5 text-xs leading-relaxed text-[#3D493D]">{text}</p>
      </div>
    </div>
  );
}

function TrendChart({ values }) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const width = 700;
  const height = 160;
  const padding = 15;

  const points = values
    .map((val, idx) => {
      const x = padding + (idx / (values.length - 1)) * (width - padding * 2);
      const norm = (val - min) / (max - min || 1);
      const y = height - padding - norm * (height - padding * 2);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="mt-6 overflow-hidden rounded-2xl bg-[#F8FAF7] p-4 border border-[#E2E8DF]">
      <svg viewBox={`0 0 ${width} ${height}`} className="h-36 w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="trendFillGreen" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#2E7D32" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#2E7D32" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polyline
          points={`${padding},${height - padding} ${points} ${width - padding},${height - padding}`}
          fill="url(#trendFillGreen)"
          stroke="none"
        />
        <polyline
          points={points}
          fill="none"
          stroke="#2E7D32"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {values.map((val, idx) => {
          const x = padding + (idx / (values.length - 1)) * (width - padding * 2);
          const norm = (val - min) / (max - min || 1);
          const y = height - padding - norm * (height - padding * 2);
          return <circle key={idx} cx={x} cy={y} r="5" fill="white" stroke="#2E7D32" strokeWidth="3" />;
        })}
      </svg>
    </div>
  );
}

function FreightEstimator({
  product,
  quantity,
  deliveryLocation,
  setDeliveryLocation,
  freightCost,
  estimatedDeliveredCost,
  d,
}) {
  return (
    <section className="rounded-[28px] border border-[#E2E8DF] bg-white p-6 shadow-sm">
      <SectionHeading icon={Truck} title={d.doorEstimate} subtitle={d.estLogistics} />

      <div className="mt-6">
        <label className="text-xs font-bold uppercase tracking-wider text-[#3D493D]">
          {d.deliveryLoc}
        </label>
        <div className="relative mt-2">
          <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2E7D32]" />
          <input
            value={deliveryLocation}
            onChange={(e) => setDeliveryLocation(e.target.value)}
            className="h-12 w-full rounded-xl border border-[#E2E8DF] bg-[#F8FAF7] pl-10 pr-4 text-xs font-bold text-[#172117] outline-none transition focus:border-[#2E7D32] focus:bg-white"
          />
        </div>
      </div>

      <div className="mt-5 space-y-3">
        <QualityRow label={`${d.freight} · ${quantity} Qtl`} value={`₹${freightCost.toLocaleString("en-IN")}`} />
        <QualityRow label="Quantity" value={`${quantity} Qtl`} />
        <QualityRow label={d.estDeliveredVal} value={`₹${estimatedDeliveredCost.toLocaleString("en-IN")}`} />
      </div>

      <div className="mt-5 flex items-start gap-3 rounded-2xl bg-amber-50 p-4 border border-amber-200">
        <Info size={16} className="mt-0.5 shrink-0 text-amber-600" />
        <p className="text-xs leading-relaxed text-amber-900/80">
          {d.freightNote}
        </p>
      </div>
    </section>
  );
}

function ModalShell({ children, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[120] flex items-center justify-center bg-[#172117]/45 p-5 backdrop-blur-sm"
      onMouseDown={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 8 }}
        transition={{ duration: 0.2 }}
        onMouseDown={(e) => e.stopPropagation()}
        className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-[28px] border border-[#E2E8DF] bg-white p-7 shadow-2xl"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

function CloseButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F8FAF7] text-[#5F6E5E] transition hover:bg-[#E2E8DF] hover:text-[#172117]"
    >
      <X size={18} />
    </button>
  );
}

function getInitials(name = "") {
  return (
    name
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase() || "F"
  );
}