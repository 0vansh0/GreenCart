import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  ChevronRight,
  Globe,
  Leaf,
  MapPin,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import { Link } from "react-router";
import Navbar from "../components/Navbar";

const stats = [
  { value: "50K+", label: "Verified Farmers" },
  { value: "₹120Cr+", label: "Trade Volume" },
  { value: "14+", label: "States Covered" },
  { value: "100%", label: "Payment Security" },
];

const categories = [
  {
    title: "For Farmers",
    description: "Access live market intelligence and sell directly to verified institutional buyers with complete price transparency.",
    image: "https://images.pexels.com/photos/2165688/pexels-photo-2165688.jpeg?auto=compress&cs=tinysrgb&w=800",
    link: "/farmers",
    icon: Leaf,
  },
  {
    title: "For Institutional Buyers",
    description: "Source high-quality, traceable produce directly from farms with predictable logistics and AI-driven quality checks.",
    image: "https://images.pexels.com/photos/2888373/pexels-photo-2888373.jpeg?auto=compress&cs=tinysrgb&w=800",
    link: "/buyers",
    icon: Briefcase,
  },
  {
    title: "Logistics Partners",
    description: "Join our network of transit partners ensuring farm-to-warehouse delivery with real-time tracking.",
    image: "https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg?auto=compress&cs=tinysrgb&w=800",
    link: "/logistics",
    icon: MapPin,
  },
];

const marqueeItems = [
  "AI Market Intelligence",
  "Transparent Pricing",
  "Verified Institutional Buyers",
  "End-to-End Traceability",
  "Guaranteed Payments",
  "Real-time Logistics",
];

function FadeUp({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-[#0f172a] selection:bg-[#2E7D32] selection:text-white">
      <Navbar />

      {/* HERO SECTION (Edge to Edge) */}
      <section className="relative h-[90vh] min-h-[600px] w-full overflow-hidden pt-20">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/1595108/pexels-photo-1595108.jpeg?auto=compress&cs=tinysrgb&w=2000"
            alt="Agriculture landscape"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        </div>

        <div className="relative mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-5 text-center sm:px-8 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-4xl"
          >
            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-[5rem] lg:leading-[1.1]">
              Leave a mark on <br />
              <span className="text-[#81C784]">India's Agriculture.</span>
            </h1>
            
            <p className="mx-auto mt-6 max-w-2xl text-lg font-medium text-white/90 sm:text-xl">
              Join the ecosystem where AI-driven intelligence meets transparent, fair-trade agricultural commerce.
            </p>

            {/* Central Action Button */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mx-auto mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Link 
                to="/start" 
                className="inline-flex h-14 items-center justify-center gap-3 rounded-full bg-[#2E7D32] px-10 text-lg font-bold text-white shadow-2xl transition-transform hover:scale-105 hover:bg-[#1B5E20]"
              >
                Get Started
                <ArrowRight size={20} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* INFINITE MARQUEE */}
      <div className="flex overflow-hidden border-b border-gray-100 bg-[#F7F9F5] py-4">
        <motion.div
          animate={{ x: [0, -1035] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 20,
          }}
          className="flex whitespace-nowrap"
        >
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
            <div key={i} className="flex items-center gap-4 px-8 text-sm font-bold uppercase tracking-widest text-[#2E7D32]">
              <Sparkles size={14} />
              {item}
            </div>
          ))}
        </motion.div>
      </div>

      {/* IMPACT STATS */}
      <section className="px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12">
            {stats.map((stat, index) => (
              <FadeUp key={index} delay={index * 0.1}>
                <div className="flex flex-col border-l-4 border-[#2E7D32] pl-6">
                  <span className="text-4xl font-extrabold tracking-tight text-[#0f172a] sm:text-5xl lg:text-6xl">
                    {stat.value}
                  </span>
                  <span className="mt-2 text-sm font-bold uppercase tracking-wider text-[#64748b]">
                    {stat.label}
                  </span>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* EXPLORE ECOSYSTEM (Interactive Image Cards) */}
      <section className="bg-[#f8fafc] px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <FadeUp>
            <h2 className="text-4xl font-extrabold tracking-tight text-[#0f172a] sm:text-5xl">
              Who we serve
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-[#64748b]">
              Whether you are growing the food, buying for millions, or moving it across the country, GreenCart is built for you.
            </p>
          </FadeUp>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <FadeUp key={index} delay={index * 0.1}>
                  <Link to={category.link} className="group relative block h-[450px] w-full overflow-hidden rounded-[2rem] bg-gray-900">
                    <img 
                      src={category.image} 
                      alt={category.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Gradient that raises on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-all duration-500 group-hover:from-black/95 group-hover:via-black/60" />
                    
                    <div className="absolute bottom-0 left-0 flex w-full flex-col justify-end p-8 transition-transform duration-500 group-hover:-translate-y-4">
                      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 text-white backdrop-blur-md">
                        <Icon size={24} />
                      </div>
                      <h3 className="text-2xl font-bold text-white">{category.title}</h3>
                      
                      {/* Description reveals on hover */}
                      <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr]">
                        <div className="overflow-hidden">
                          <p className="mt-3 text-sm leading-relaxed text-gray-300">
                            {category.description}
                          </p>
                          <div className="mt-5 flex items-center gap-2 text-sm font-bold text-[#81C784]">
                            Explore opportunities <ChevronRight size={16} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* CORE VALUES / WHY GREENCART */}
      <section className="px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <FadeUp>
              <h2 className="text-4xl font-extrabold tracking-tight text-[#0f172a] sm:text-5xl">
                Intelligence meets <br />
                <span className="text-[#2E7D32]">infrastructure.</span>
              </h2>
              
              <div className="mt-12 space-y-10">
                <div className="flex gap-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#E8F5E9] text-[#2E7D32]">
                    <BarChart3 size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0f172a]">AI-Powered Net Realization</h3>
                    <p className="mt-2 leading-relaxed text-[#64748b]">
                      We calculate logistics, market trends, and buyer terms to show you exactly what you earn—not just the headline price.
                    </p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#E8F5E9] text-[#2E7D32]">
                    <ShieldCheck size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0f172a]">Verified Ecosystem</h3>
                    <p className="mt-2 leading-relaxed text-[#64748b]">
                      Every buyer is KYC-verified. Every transaction is transparent. Escrow-backed payments ensure you are never left waiting.
                    </p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#E8F5E9] text-[#2E7D32]">
                    <TrendingUp size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0f172a]">Predictable Demand</h3>
                    <p className="mt-2 leading-relaxed text-[#64748b]">
                      Institutional buyers post specific requirements, allowing farmers to align their crop lots directly with active market demand.
                    </p>
                  </div>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.2} className="relative h-[600px] w-full rounded-[2.5rem] bg-gray-100 lg:h-full">
              <img 
                src="https://images.pexels.com/photos/259280/pexels-photo-259280.jpeg?auto=compress&cs=tinysrgb&w=1200" 
                alt="Farmer looking at tablet" 
                className="h-full w-full rounded-[2.5rem] object-cover"
              />
              <div className="absolute -bottom-8 -left-8 hidden rounded-3xl bg-white p-8 shadow-2xl lg:block">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2E7D32] text-white">
                    <Users size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-wider text-[#64748b]">Community</p>
                    <p className="text-2xl font-extrabold text-[#0f172a]">50,000+ Strong</p>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* BOLD CTA FOOTER */}
      <section className="bg-[#111827] px-5 py-24 sm:px-8 lg:px-10 lg:py-32 text-white">
        <div className="mx-auto max-w-5xl text-center">
          <FadeUp>
            <Globe className="mx-auto mb-8 text-[#81C784]" size={48} strokeWidth={1.5} />
            <h2 className="text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
              Ready to redefine <br />
              how you trade?
            </h2>
            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/start" className="w-full rounded-full bg-[#2E7D32] px-10 py-5 text-lg font-bold text-white transition-transform hover:scale-105 sm:w-auto">
                Join GreenCart
              </Link>
              <Link to="/market" className="w-full rounded-full border-2 border-white/20 bg-transparent px-10 py-5 text-lg font-bold text-white transition-colors hover:bg-white/10 sm:w-auto">
                View Live Markets
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}