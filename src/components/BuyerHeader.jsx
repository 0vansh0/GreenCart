import { useState } from "react";

import {
  Bell,
  ChevronDown,
  LogIn,
  MapPin,
  Search,
  ShoppingCart,
  UserRound,
  X,
} from "lucide-react";

import { useNavigate } from "react-router";
import { useBuyerAuth } from "../context/BuyerAuthContext";
import { useCart } from "../context/CartContext";

export default function BuyerHeader({
  search = "",
  onSearchChange,
}) {
  const navigate = useNavigate();

  const {
    user,
    isAuthenticated,
    logout,
  } = useBuyerAuth();

  const { cartCount } = useCart();

  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    navigate("/marketplace");
  };

  return (
    <header className="sticky top-3 z-50 mt-5">
      <div className="rounded-2xl border border-slate-200/80 bg-white/90 px-4 py-3 shadow-[0_8px_30px_rgba(15,23,42,0.06)] backdrop-blur-xl lg:px-5">
        <div className="flex items-center gap-3">

          {/* LOGO */}
          <button
            type="button"
            onClick={() => navigate("/marketplace")}
            className="flex shrink-0 items-center gap-2.5"
          >
            <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl">
              <img
                src="/Green_cart.png"
                alt="GreenCart logo"
                className="h-full w-full object-contain"
              />
            </div>

            <div className="hidden text-left sm:block">
              <p className="text-sm font-extrabold tracking-tight text-slate-900">
                GreenCart
              </p>

              <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-emerald-700">
                Buyer
              </p>
            </div>
          </button>

          {/* LOCATION */}
          <div className="hidden items-center gap-2 border-l border-slate-200 pl-4 lg:flex">
            <MapPin
              size={14}
              className="text-emerald-700"
            />

            <div>
              <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                Delivery to
              </p>

              <p className="text-[11px] font-bold text-slate-700">
                Patna, Bihar
              </p>
            </div>

            <ChevronDown
              size={12}
              className="text-slate-400"
            />
          </div>

          {/* SEARCH */}
          <div className="relative ml-auto flex-1 lg:max-w-[460px]">
            <Search
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={search}
              onChange={(e) =>
                onSearchChange?.(e.target.value)
              }
              placeholder="Search crops, varieties, locations..."
              className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-10 pr-9 text-xs font-medium text-slate-700 outline-none placeholder:text-slate-400 focus:border-emerald-300 focus:bg-white"
            />

            {search && (
              <button
                type="button"
                onClick={() =>
                  onSearchChange?.("")
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* ACTIONS */}
          <div className="flex shrink-0 items-center gap-1.5">

            {/* NOTIFICATIONS */}
            <button
              type="button"
              className="relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-50 hover:text-slate-800"
              title="Notifications"
            >
              <Bell size={17} />

              <span className="absolute right-2.5 top-2 h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </button>

            {/* CART */}
            <button
              type="button"
              onClick={() => navigate("/cart")}
              className="relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-emerald-50 hover:text-emerald-700"
              title="Cart"
            >
              <ShoppingCart size={17} />

              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-emerald-600 px-1 text-[8px] font-extrabold text-white">
                  {cartCount > 99
                    ? "99+"
                    : cartCount}
                </span>
              )}
            </button>

            {/* ================================================= */}
            {/* LOGIN / PROFILE */}
            {/* ================================================= */}

            {!isAuthenticated ? (
              <button
                type="button"
                onClick={() =>
                  navigate("/buyer/login")
                }
                className="ml-1 inline-flex h-10 items-center gap-2 rounded-xl bg-[#064E3B] px-4 text-[11px] font-bold text-white shadow-sm transition hover:bg-[#053D2E] hover:shadow-md"
              >
                <LogIn size={14} />

                <span className="hidden sm:inline">
                  Login
                </span>
              </button>
            ) : (
              <div className="relative ml-1">

                {/* PROFILE BUTTON */}
                <button
                  type="button"
                  onClick={() =>
                    setProfileOpen(
                      (value) => !value
                    )
                  }
                  className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-2.5 transition hover:border-emerald-200 hover:bg-emerald-50/40"
                >
                  {/* AVATAR */}
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-[10px] font-extrabold text-emerald-800">
                    {getInitials(user?.name)}
                  </div>

                  {/* NAME */}
                  <div className="hidden text-left sm:block">
                    <p className="max-w-[100px] truncate text-[10px] font-bold text-slate-800">
                      {user?.name || "Buyer"}
                    </p>

                    <p className="text-[8px] font-medium text-slate-400">
                      Buyer Account
                    </p>
                  </div>

                  <ChevronDown
                    size={12}
                    className={`text-slate-400 transition ${
                      profileOpen
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </button>

                {/* DROPDOWN */}
                {profileOpen && (
                  <div className="absolute right-0 top-[48px] w-60 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_18px_50px_rgba(15,23,42,0.14)]">

                    {/* USER INFO */}
                    <div className="border-b border-slate-100 px-3 py-3">
                      <p className="text-xs font-bold text-slate-800">
                        {user?.name || "Buyer"}
                      </p>

                      <p className="mt-0.5 truncate text-[10px] text-slate-400">
                        {user?.email ||
                          "Buyer account"}
                      </p>
                    </div>

                    {/* MY ACCOUNT */}
                    <button
                      type="button"
                      onClick={() => {
                        setProfileOpen(false);
                        navigate("/buyer/dashboard");
                      }}
                      className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[11px] font-semibold text-slate-600 transition hover:bg-slate-50"
                    >
                      <UserRound size={15} />

                      My account
                    </button>

                    {/* MY CART */}
                    <button
                      type="button"
                      onClick={() => {
                        setProfileOpen(false);
                        navigate("/cart");
                      }}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[11px] font-semibold text-slate-600 transition hover:bg-slate-50"
                    >
                      <ShoppingCart size={15} />

                      My cart
                    </button>

                    {/* LOGOUT */}
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="mt-1 w-full rounded-xl px-3 py-2.5 text-left text-[11px] font-bold text-red-500 transition hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

function getInitials(name = "") {
  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (!parts.length) {
    return "B";
  }

  return parts
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}