import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Globe,
  Handshake,
  Leaf,
  ShieldCheck,
  Sprout,
  Truck,
} from "lucide-react";
import { Link } from "react-router";
import Navbar from "../components/Navbar";

const features = [
  {
    icon: BarChart3,
    title: "Market intelligence",
    text: "See price movement, demand signals and buyer activity before you decide.",
  },
  {
    icon: Handshake,
    title: "Better connections",
    text: "Bring farmers and verified buyers together with clearer expectations.",
  },
  {
    icon: Truck,
    title: "Transparent logistics",
    text: "Compare transport, pickup and delivery details alongside every offer.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted transactions",
    text: "Keep offers, agreements and payment progress visible from start to finish.",
  },
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

export default function About() {
  return (
    <div className="min-h-screen bg-white text-[#0f172a] selection:bg-[#2E7D32] selection:text-white">
      <Navbar />

      <main>
        {/* HERO SECTION (Edge-to-Edge) */}
        <section className="relative flex h-[75vh] min-h-[500px] w-full flex-col items-center justify-center overflow-hidden pt-20 text-center">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=2000&q=85"
              alt="Fresh produce in an agricultural field"
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
          </div>

          <div className="relative mx-auto max-w-5xl px-5 sm:px-8 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-md">
                <Leaf size={14} className="text-[#81C784]" />
                Our Mission
              </div>
              
              <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-[5.5rem] lg:leading-[1.05]">
                A fairer route from <br />
                <span className="text-[#81C784]">field to market.</span>
              </h1>
              
              <p className="mx-auto mt-8 max-w-2xl text-lg font-medium text-white/80 sm:text-xl">
                We believe every crop decision should be backed by data, not guesswork. GreenCart helps farmers make informed selling decisions and helps buyers find quality produce with confidence.
              </p>
            </motion.div>
          </div>
        </section>

        {/* MISSION / STORY SECTION */}
        <section className="bg-white px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <FadeUp>
              <h2 className="max-w-4xl text-4xl font-extrabold tracking-tight text-[#0f172a] sm:text-5xl lg:text-6xl">
                We are building the infrastructure for a <span className="text-[#2E7D32]">transparent agricultural economy.</span>
              </h2>
            </FadeUp>
            
            <div className="mt-16 grid gap-12 border-t border-gray-100 pt-16 md:grid-cols-2 lg:grid-cols-3">
              <FadeUp delay={0.1}>
                <p className="text-lg leading-relaxed text-[#64748b]">
                  For decades, agricultural trade has been limited by fragmented information and opaque pricing. Farmers struggle to find the true value of their yield, while buyers face unpredictable supply chains.
                </p>
              </FadeUp>
              <FadeUp delay={0.2}>
                <p className="text-lg leading-relaxed text-[#64748b]">
                  GreenCart was founded to bridge this gap. By bringing real-time market intelligence, verified institutional buyers, and transparent logistics into a single ecosystem, we eliminate the blind spots in agricultural trade.
                </p>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* FEATURES / PILLARS SECTION */}
        <section id="features" className="bg-[#f8fafc] px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <FadeUp>
              <div className="max-w-2xl">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2E7D32]">
                  The GreenCart Advantage
                </span>
                <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-[#0f172a] sm:text-5xl">
                  The useful details, <br /> in one place.
                </h2>
              </div>
            </FadeUp>

            <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {features.map(({ icon: Icon, title, text }, index) => (
                <FadeUp key={title} delay={index * 0.1}>
                  <div className="group relative h-full rounded-[2rem] bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#2E7D32]/5">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E8F5E9] text-[#2E7D32] transition-colors group-hover:bg-[#2E7D32] group-hover:text-white">
                      <Icon size={28} />
                    </div>
                    <h3 className="mt-8 text-xl font-bold text-[#0f172a]">{title}</h3>
                    <p className="mt-4 leading-relaxed text-[#64748b]">
                      {text}
                    </p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* BOLD CTA FOOTER */}
        <section className="bg-[#111827] px-5 py-24 sm:px-8 lg:px-10 lg:py-32 text-white">
          <div className="mx-auto max-w-5xl text-center">
            <FadeUp>
              <Sprout className="mx-auto mb-8 text-[#81C784]" size={48} strokeWidth={1.5} />
              <h2 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
                Grow with better information.
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
                Your next major market decision can start here. Join the community reshaping agricultural trade.
              </p>
              
              <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link 
                  to="/start" 
                  className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#2E7D32] px-10 py-5 text-lg font-bold text-white transition-transform hover:scale-105 hover:bg-[#1B5E20] sm:w-auto"
                >
                  Explore GreenCart
                  <ArrowRight size={20} />
                </Link>
              </div>
            </FadeUp>
          </div>
        </section>
      </main>
    </div>
  );
}