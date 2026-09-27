import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Check,
  Globe2,
  Leaf,
  ShieldCheck,
  ShoppingBag,
  Sprout,
  Truck,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

// --- Translations ---
const content = {
  EN: {
    heading: "Choose your path.",
    subheading: "Join the ecosystem where AI-driven intelligence meets transparent, fair-trade commerce.",
    farmerTitle: "I am a Farmer",
    farmerDesc: "List your harvest, view AI market insights, and compare buyer offers to maximize your net realization.",
    farmerBullets: [
      "Create & manage crop lots",
      "Compare expected net realization",
      "Receive verified buyer RFQs",
    ],
    farmerBtn: "Enter Farmer Portal",
    buyerTitle: "I am a Buyer",
    buyerDesc: "Source directly from verified farmers with complete data on quality, quantity, and real-time logistics.",
    buyerBullets: [
      "Browse available crop lots",
      "Source from verified farmers",
      "Manage logistics & payments",
    ],
    buyerBtn: "Explore Marketplace",
    trust1Title: "100% Verified",
    trust1Text: "KYC buyers",
    trust2Title: "Transparent",
    trust2Text: "Market insights",
    trust3Title: "Trackable",
    trust3Text: "Logistics flow",
    trust4Title: "Secure",
    trust4Text: "Escrow payments",
  },
  HI: {
    heading: "अपना रास्ता चुनें।",
    subheading: "उस इकोसिस्टम से जुड़ें जहां AI-संचालित बुद्धिमत्ता और पारदर्शी, निष्पक्ष व्यापार मिलते हैं।",
    farmerTitle: "मैं एक किसान हूँ",
    farmerDesc: "अपनी फसल सूचीबद्ध करें, AI बाज़ार अंतर्दृष्टि देखें, और अपना शुद्ध लाभ अधिकतम करने के लिए खरीदार के प्रस्तावों की तुलना करें।",
    farmerBullets: [
      "फसल लॉट बनाएं और प्रबंधित करें",
      "अपेक्षित शुद्ध लाभ की तुलना करें",
      "सत्यापित खरीदार RFQ प्राप्त करें",
    ],
    farmerBtn: "किसान पोर्टल में प्रवेश करें",
    buyerTitle: "मैं एक खरीदार हूँ",
    buyerDesc: "गुणवत्ता, मात्रा और वास्तविक समय लॉजिस्टिक्स पर संपूर्ण डेटा के साथ सीधे सत्यापित किसानों से स्रोत प्राप्त करें।",
    buyerBullets: [
      "उपलब्ध फसल लॉट ब्राउज़ करें",
      "सत्यापित किसानों से खरीदें",
      "लॉजिस्टिक्स और भुगतान प्रबंधित करें",
    ],
    buyerBtn: "बाज़ार देखें",
    trust1Title: "100% सत्यापित",
    trust1Text: "KYC खरीदार",
    trust2Title: "पारदर्शी",
    trust2Text: "बाज़ार की जानकारी",
    trust3Title: "ट्रैक करने योग्य",
    trust3Text: "लॉजिस्टिक्स प्रवाह",
    trust4Title: "सुरक्षित",
    trust4Text: "एस्क्रो भुगतान",
  },
};

// --- Slideshow Images ---
const backgroundImages = [
  "https://images.pexels.com/photos/1595108/pexels-photo-1595108.jpeg?auto=compress&cs=tinysrgb&w=2000",
  "https://images.pexels.com/photos/2165688/pexels-photo-2165688.jpeg?auto=compress&cs=tinysrgb&w=2000",
  "https://images.pexels.com/photos/259280/pexels-photo-259280.jpeg?auto=compress&cs=tinysrgb&w=2000"
];

// --- Animation Configs ---
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

export default function Start() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("EN");
  const [bgIndex, setBgIndex] = useState(0);

  const t = content[language]; // Current translation dictionary

  // Slideshow timer
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 6000); // Change image every 6 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F8FAF7] text-[#172117] selection:bg-[#2E7D32] selection:text-white">
      
      {/* BACKGROUND SLIDESHOW */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-[#F8FAF7]">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={bgIndex}
            src={backgroundImages[bgIndex]}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 h-full w-full object-cover blur-[6px]"
          />
        </AnimatePresence>
        {/* Soft overlay to ensure minimal contrast for text/cards */}
        <div className="absolute inset-0 bg-white/60 transition-colors duration-1000" />
      </div>

      {/* TOP BAR */}
      <header className="relative z-10 flex items-center justify-between px-6 py-6 sm:px-10 lg:px-14">
        <button
          onClick={() => navigate("/")}
          className="group flex items-center gap-3 text-left transition-transform active:scale-95"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2E7D32] text-white shadow-sm transition-transform group-hover:rotate-6">
            <Leaf size={20} strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-lg font-bold tracking-tight text-[#172117]">
              GreenCart
            </p>
          </div>
        </button>

        <button
          onClick={() => setLanguage(language === "EN" ? "HI" : "EN")}
          className="group flex items-center gap-2 rounded-full border border-[#E2E8DF] bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#4A5749] shadow-sm backdrop-blur-md transition-all hover:bg-white hover:text-[#2E7D32] active:scale-95"
        >
          <Globe2 size={16} />
          <AnimatePresence mode="wait">
            <motion.span
              key={language}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.15 }}
            >
              {language === "EN" ? "EN" : "HI"}
            </motion.span>
          </AnimatePresence>
        </button>
      </header>

      {/* MAIN CONTENT */}
      <main className="relative z-10 flex min-h-[calc(100vh-100px)] flex-col items-center justify-center px-5 pb-12 pt-4 sm:px-8 lg:px-14">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="mx-auto w-full max-w-5xl"
        >
          {/* Heading */}
          <motion.div variants={itemVariants} className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              {t.heading}
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base font-medium text-[#4A5749] sm:text-lg">
              {t.subheading}
            </p>
          </motion.div>

          {/* ROLE CARDS */}
          <div className="mx-auto mt-14 grid gap-6 md:grid-cols-2">
            <motion.div variants={itemVariants}>
              <RoleCard
                icon={Sprout}
                title={t.farmerTitle}
                description={t.farmerDesc}
                bullets={t.farmerBullets}
                buttonText={t.farmerBtn}
                onClick={() => navigate("/farmer/login")}
                accentColor="text-[#2E7D32]"
                accentBg="bg-[#E8F5E9]"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <RoleCard
                icon={ShoppingBag}
                title={t.buyerTitle}
                description={t.buyerDesc}
                bullets={t.buyerBullets}
                buttonText={t.buyerBtn}
                onClick={() => navigate("/marketplace")}
                accentColor="text-[#1E293B]"
                accentBg="bg-[#F1F5F9]"
              />
            </motion.div>
          </div>

          {/* TRUST STRIP */}
          <motion.div
            variants={itemVariants}
            className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-4 divide-y divide-[#D1DCD0]/60 border-y border-[#D1DCD0]/60 py-6 sm:grid-cols-4 sm:divide-x sm:divide-y-0 sm:py-8"
          >
            <TrustItem icon={ShieldCheck} title={t.trust1Title} text={t.trust1Text} />
            <TrustItem icon={Leaf} title={t.trust2Title} text={t.trust2Text} />
            <TrustItem icon={Truck} title={t.trust3Title} text={t.trust3Text} />
            <TrustItem icon={Check} title={t.trust4Title} text={t.trust4Text} />
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}

/* -------------------------------- */
/* ROLE CARD COMPONENT */
/* -------------------------------- */

function RoleCard({
  icon: Icon,
  title,
  description,
  bullets,
  buttonText,
  onClick,
  accentColor,
  accentBg,
}) {
  return (
    <motion.button
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="group relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[2rem] border border-white/40 bg-white/80 p-8 text-left shadow-lg backdrop-blur-xl transition-shadow duration-300 hover:shadow-2xl sm:p-10"
    >
      <div>
        <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${accentBg} ${accentColor} transition-transform duration-300 group-hover:scale-110`}>
          <Icon size={32} strokeWidth={2} />
        </div>

        <h2 className="mt-8 text-3xl font-extrabold tracking-tight text-[#172117]">
          {title}
        </h2>
        
        <p className="mt-3 text-sm font-medium leading-relaxed text-[#5F6E5E]">
          {description}
        </p>

        <div className="mt-8 space-y-3">
          {bullets.map((bullet, idx) => (
            <div key={idx} className="flex items-start gap-3 text-sm font-semibold text-[#3D493D]">
              <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${accentBg} ${accentColor}`}>
                <Check size={12} strokeWidth={3} />
              </span>
              {bullet}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 flex items-center justify-between border-t border-black/5 pt-6">
        <span className={`font-bold ${accentColor}`}>
          {buttonText}
        </span>
        <span className={`flex h-10 w-10 items-center justify-center rounded-full ${accentBg} ${accentColor} transition-all duration-300 group-hover:bg-[#172117] group-hover:text-white`}>
          <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </motion.button>
  );
}

/* -------------------------------- */
/* TRUST ITEM COMPONENT */
/* -------------------------------- */

function TrustItem({ icon: Icon, title, text }) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-3 text-center sm:py-0">
      <Icon size={24} className="mb-2 text-[#2E7D32]" strokeWidth={1.5} />
      <p className="text-sm font-bold text-[#172117]">{title}</p>
      <p className="mt-0.5 text-xs font-semibold text-[#6A7869]">{text}</p>
    </div>
  );
}