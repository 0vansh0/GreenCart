import {
  ArrowUpRight,
  Globe2,
  Link2,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router";

export default function Footer() {
  const navigate = useNavigate();

  const goTo = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="mt-20 bg-[#172117] text-white selection:bg-[#2E7D32] selection:text-white">
      {/* Main footer */}
      <div className="mx-auto max-w-[1380px] px-5 py-14 lg:px-8 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div className="max-w-md">
            <button
              onClick={() => goTo("/")}
              className="group flex items-center gap-3.5"
            >
              <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl shadow-md shadow-[#2E7D32]/20">
                <img src="/Green_cart.png" alt="GreenCart logo" className="h-full w-full object-contain" />
              </div>

              <div className="text-left">
                <p className="text-xl font-black tracking-tight text-white">
                  GreenCart
                </p>
                <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#81C784]">
                  Farmer-powered commerce
                </p>
              </div>
            </button>

            <p className="mt-6 max-w-sm text-xs font-medium leading-relaxed text-[#8F9E8D]">
              AI-powered agricultural commerce that helps farmers
              understand markets, compare offers, negotiate with
              buyers and make informed selling decisions.
            </p>

            <div className="mt-6 flex items-center gap-2 rounded-2xl bg-white/5 px-3 py-2 w-fit text-xs font-bold text-[#A5D6A7] border border-white/10">
              <ShieldCheck size={16} />
              AI recommends. Farmer decides.
            </div>

            {/* Social */}
            <div className="mt-7 flex gap-2.5">
              <SocialButton icon={Globe2} label="Website" />
              <SocialButton icon={Link2} label="LinkedIn" />
              <SocialButton icon={Send} label="Twitter" />
              <SocialButton icon={MessageCircle} label="Facebook" />
            </div>
          </div>

          {/* Platform */}
          <FooterColumn title="Platform">
            <FooterLink
              label="Marketplace"
              onClick={() => goTo("/marketplace")}
            />
            <FooterLink
              label="Farmer Dashboard"
              onClick={() => goTo("/farmer/dashboard")}
            />
            <FooterLink
              label="AI Insights"
              onClick={() => goTo("/farmer/ai-insights")}
            />
            <FooterLink
              label="RFQ & Offers"
              onClick={() => goTo("/farmer/rfqs")}
            />
            <FooterLink
              label="Net Realization"
              onClick={() => goTo("/farmer/net-realization")}
            />
          </FooterColumn>

          {/* Buyer */}
          <FooterColumn title="Buyer">
            <FooterLink
              label="Browse Produce"
              onClick={() => goTo("/marketplace")}
            />
            <FooterLink
              label="My Dashboard"
              onClick={() => goTo("/buyer/dashboard")}
            />
            <FooterLink
              label="My Orders"
              onClick={() => goTo("/buyer/orders")}
            />
            <FooterLink
              label="My Offers"
              onClick={() => goTo("/buyer/offers")}
            />
            <FooterLink
              label="Cart"
              onClick={() => goTo("/cart")}
            />
          </FooterColumn>

          {/* Contact */}
          <div>
            <p className="text-sm font-extrabold text-white">
              Built for India's agricultural ecosystem
            </p>

            <div className="mt-6 space-y-5">
              <div className="flex gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-white">
                  <MapPin size={18} />
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#8F9E8D]">
                    Operations
                  </p>
                  <p className="mt-0.5 text-sm font-extrabold text-white">
                    Bihar, India
                  </p>
                </div>
              </div>

              <div className="flex gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-white">
                  <Mail size={18} />
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#8F9E8D]">
                    Support
                  </p>
                  <p className="mt-0.5 text-sm font-extrabold text-white">
                    vanshraj0529@gmail.com
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => goTo("/about")}
              className="group mt-8 flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-3.5 text-xs font-extrabold text-white transition hover:border-[#2E7D32] hover:bg-[#2E7D32]"
            >
              Learn about GreenCart
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>
          </div>
        </div>

        {/* Bottom trust strip */}
        <div className="mt-14 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-3">
          <TrustItem
            icon={ShieldCheck}
            title="Verified participants"
            description="Farmer and buyer verification"
          />

          <TrustItem
            icon={ShieldCheck}
            title="Transparent pricing"
            description="Mandi and net realization visibility"
          />

          <TrustItem
            icon={ShieldCheck}
            title="Protected transactions"
            description="Contract and quality workflow"
          />
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10 bg-[#121A12]">
        <div className="mx-auto flex max-w-[1380px] flex-col gap-4 px-5 py-6 text-xs font-medium text-[#8F9E8D] sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>
            © {new Date().getFullYear()} GreenCart. All rights reserved.
          </p>

          <div className="flex gap-6 font-bold">
            <button className="transition hover:text-white">Privacy</button>
            <button className="transition hover:text-white">Terms</button>
            <button className="transition hover:text-white">Help</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- Components ---------------- */

function FooterColumn({ title, children }) {
  return (
    <div>
      <p className="text-sm font-extrabold text-white">{title}</p>
      <div className="mt-6 space-y-4">{children}</div>
    </div>
  );
}

function FooterLink({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group flex items-center gap-1.5 text-left text-xs font-bold text-[#8F9E8D] transition hover:text-white"
    >
      {label}
      <ArrowUpRight
        size={14}
        className="opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 group-hover:text-[#81C784]"
      />
    </button>
  );
}

function SocialButton({ icon: Icon, label }) {
  return (
    <button
      className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-[#8F9E8D] transition hover:border-[#2E7D32] hover:bg-[#2E7D32] hover:text-white"
      aria-label={label}
    >
      <Icon size={18} />
    </button>
  );
}

function TrustItem({ icon: Icon, title, description }) {
  return (
    <div className="flex items-center gap-3.5 rounded-[24px] border border-white/10 bg-white/5 px-5 py-4 transition hover:border-white/20 hover:bg-white/10">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#2E7D32]/20 text-[#81C784]">
        <Icon size={18} />
      </div>

      <div>
        <p className="text-xs font-extrabold text-white">{title}</p>
        <p className="mt-0.5 text-[11px] font-medium text-[#8F9E8D]">
          {description}
        </p>
      </div>
    </div>
  );
}