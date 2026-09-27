import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  IndianRupee,
  MapPin,
  MessageCircle,
  Package,
  Search,
  ShieldCheck,
  Truck,
  UserRound,
  X,
  XCircle,
} from "lucide-react";
import { useNavigate } from "react-router";

import BuyerHeader from "../../components/BuyerHeader";

const INITIAL_OFFERS = [
  {
    id: "OFR-92841",
    product: "Premium Sharbati Wheat",
    variety: "Sharbati",
    farmer: "Rajesh Kumar",
    location: "Muzaffarpur, Bihar",
    verified: true,
    rating: 4.8,
    quantity: 40,
    unit: "quintal",
    askingPrice: 2920,
    offeredPrice: 2860,
    mandiPrice: 2760,
    logistics: 4200,
    quality: "Grade A",
    moisture: "10.8%",
    delivery: "29 September 2026",
    received: "Today · 10:42 AM",
    status: "received",
    note: "Can arrange pickup from farm collection point.",
  },
  {
    id: "OFR-92752",
    product: "Basmati Rice 1121",
    variety: "1121 Steam",
    farmer: "Amit Kumar",
    location: "Patna, Bihar",
    verified: true,
    rating: 4.7,
    quantity: 20,
    unit: "quintal",
    askingPrice: 6400,
    offeredPrice: 6250,
    mandiPrice: 6210,
    logistics: 3100,
    quality: "Premium",
    moisture: "11.2%",
    delivery: "30 September 2026",
    received: "Yesterday · 4:18 PM",
    status: "received",
    note: "Quality inspection report available.",
  },
  {
    id: "OFR-92684",
    product: "Yellow Maize",
    variety: "Hybrid",
    farmer: "Sanjay Prasad",
    location: "Purnia, Bihar",
    verified: true,
    rating: 4.6,
    quantity: 50,
    unit: "quintal",
    askingPrice: 2200,
    offeredPrice: 2140,
    mandiPrice: 2140,
    logistics: 5600,
    quality: "Grade A",
    moisture: "13.4%",
    delivery: "1 October 2026",
    received: "24 September · 1:35 PM",
    status: "accepted",
    note: "Bulk quantity available for immediate dispatch.",
  },
  {
    id: "OFR-92541",
    product: "Premium Mustard",
    variety: "Yellow Mustard",
    farmer: "Deepak Singh",
    location: "Samastipur, Bihar",
    verified: false,
    rating: 4.4,
    quantity: 25,
    unit: "quintal",
    askingPrice: 5750,
    offeredPrice: 5520,
    mandiPrice: 5580,
    logistics: 3600,
    quality: "Grade A",
    moisture: "7.9%",
    delivery: "2 October 2026",
    received: "23 September · 11:20 AM",
    status: "declined",
    note: "Price valid for 48 hours.",
  },
];

function formatINR(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function StatusBadge({ status }) {
  const config = {
    received: {
      label: "New offer",
      icon: Clock3,
      className: "bg-amber-50 text-amber-700 border-amber-200",
    },
    accepted: {
      label: "Accepted",
      icon: CheckCircle2,
      className: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    declined: {
      label: "Declined",
      icon: XCircle,
      className: "bg-slate-100 text-slate-500 border-slate-200",
    },
  };

  const item = config[status] || config.received;
  const Icon = item.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${item.className}`}
    >
      <Icon size={13} />
      {item.label}
    </span>
  );
}

function Metric({ label, value, subtext }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-medium text-slate-400">{label}</p>

      <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
        {value}
      </p>

      {subtext && (
        <p className="mt-1 text-xs text-slate-500">
          {subtext}
        </p>
      )}
    </div>
  );
}

export default function OffersReceived() {
  const navigate = useNavigate();

  const [offers, setOffers] = useState(INITIAL_OFFERS);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [toast, setToast] = useState("");

  const filteredOffers = useMemo(() => {
    let result = [...offers];

    if (activeTab !== "all") {
      result = result.filter(
        (offer) => offer.status === activeTab
      );
    }

    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter((offer) =>
        [
          offer.product,
          offer.farmer,
          offer.location,
          offer.id,
        ]
          .join(" ")
          .toLowerCase()
          .includes(query)
      );
    }

    if (sortBy === "price-high") {
      result.sort(
        (a, b) => b.offeredPrice - a.offeredPrice
      );
    }

    if (sortBy === "price-low") {
      result.sort(
        (a, b) => a.offeredPrice - b.offeredPrice
      );
    }

    if (sortBy === "quantity-high") {
      result.sort((a, b) => b.quantity - a.quantity);
    }

    return result;
  }, [offers, activeTab, search, sortBy]);

  const newOffers = offers.filter(
    (offer) => offer.status === "received"
  ).length;

  const acceptedOffers = offers.filter(
    (offer) => offer.status === "accepted"
  ).length;

  const totalQuantity = offers
    .filter((offer) => offer.status !== "declined")
    .reduce((sum, offer) => sum + offer.quantity, 0);

  const acceptOffer = (offer) => {
    setOffers((current) =>
      current.map((item) =>
        item.id === offer.id
          ? { ...item, status: "accepted" }
          : item
      )
    );

    setSelectedOffer(null);
    navigate("/buyer/contract-details", {
      state: {
        offerId: offer.id,
        product: offer.product,
      },
    });

    setToast(
      `${offer.product} offer accepted successfully.`
    );

    setTimeout(() => setToast(""), 3000);
  };

  const declineOffer = (offer) => {
    setOffers((current) =>
      current.map((item) =>
        item.id === offer.id
          ? { ...item, status: "declined" }
          : item
      )
    );

    setSelectedOffer(null);

    setToast(
      `${offer.product} offer declined.`
    );

    setTimeout(() => setToast(""), 3000);
  };

  const openCounterOffer = (offer) => {
    setSelectedOffer(null);

    navigate("/buyer/offers", {
      state: {
        fromReceivedOffer: true,
        offerId: offer.id,
        product: offer.product,
        sellerOffer: offer.offeredPrice,
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#F7F9F7] text-slate-900">
      <BuyerHeader
        search={search}
        onSearchChange={setSearch}
      />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* BACK */}
        <button
          onClick={() => navigate("/buyer/dashboard")}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-emerald-700"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </button>

        {/* HEADER */}
        <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
              <Package size={14} />
              SELLER OFFERS
            </div>

            <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Offers received
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Review direct offers from verified farmers and suppliers,
              compare pricing, and decide how to proceed.
            </p>
          </div>

          <button
            onClick={() => navigate("/marketplace")}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 text-sm font-semibold text-white shadow-lg shadow-emerald-900/10 transition hover:bg-emerald-800"
          >
            Browse marketplace
            <ArrowRightIcon />
          </button>
        </div>

        {/* METRICS */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Metric
            label="Total received"
            value={offers.length}
            subtext="Seller offers"
          />

          <Metric
            label="New offers"
            value={newOffers}
            subtext="Need your review"
          />

          <Metric
            label="Accepted"
            value={acceptedOffers}
            subtext="Ready for contract"
          />

          <Metric
            label="Available quantity"
            value={`${totalQuantity} qtl`}
            subtext="Across active offers"
          />
        </div>

        {/* FILTER BAR */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* TABS */}
            <div className="flex flex-wrap gap-2">
              {[
                ["all", "All"],
                ["received", "New"],
                ["accepted", "Accepted"],
                ["declined", "Declined"],
              ].map(([value, label]) => (
                <button
                  key={value}
                  onClick={() => setActiveTab(value)}
                  className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                    activeTab === value
                      ? "bg-emerald-700 text-white"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              {/* SEARCH */}
              <div className="relative">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search offers..."
                  className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50 sm:w-64"
                />
              </div>

              {/* SORT */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="h-10 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-9 text-sm font-medium text-slate-600 outline-none focus:border-emerald-400 sm:w-44"
                >
                  <option value="newest">Newest</option>
                  <option value="price-high">
                    Highest price
                  </option>
                  <option value="price-low">
                    Lowest price
                  </option>
                  <option value="quantity-high">
                    Highest quantity
                  </option>
                </select>

                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>
            </div>
          </div>
        </div>

        {/* OFFERS */}
        <div className="space-y-4">
          {filteredOffers.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                <Package size={25} />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-slate-900">
                No offers found
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                Try changing your search or selecting another offer status.
              </p>
            </div>
          ) : (
            filteredOffers.map((offer) => {
              const priceDifference =
                offer.offeredPrice - offer.mandiPrice;

              const premiumPercent =
                ((offer.offeredPrice - offer.mandiPrice) /
                  offer.mandiPrice) *
                100;

              return (
                <motion.div
                  key={offer.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-emerald-200 hover:shadow-md"
                >
                  <div className="p-5 sm:p-6">
                    <div className="flex flex-col gap-5 xl:flex-row xl:items-center">
                      {/* PRODUCT */}
                      <div className="flex min-w-0 flex-1 gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                          <Package size={23} />
                        </div>

                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h2 className="truncate text-base font-semibold text-slate-950">
                              {offer.product}
                            </h2>

                            <StatusBadge
                              status={offer.status}
                            />
                          </div>

                          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                              <UserRound size={13} />
                              {offer.farmer}
                            </span>

                            <span className="flex items-center gap-1">
                              <MapPin size={13} />
                              {offer.location}
                            </span>

                            <span>
                              {offer.quantity} {offer.unit}
                            </span>
                          </div>

                          <p className="mt-2 text-[11px] text-slate-400">
                            Offer ID: {offer.id} · {offer.received}
                          </p>
                        </div>
                      </div>

                      {/* PRICE */}
                      <div className="rounded-2xl bg-slate-50 px-5 py-4 xl:min-w-[220px]">
                        <p className="text-xs text-slate-400">
                          Seller's offer
                        </p>

                        <div className="mt-1 flex items-center gap-1">
                          <IndianRupee
                            size={18}
                            className="text-emerald-700"
                          />

                          <span className="text-2xl font-semibold tracking-tight text-slate-950">
                            {offer.offeredPrice.toLocaleString(
                              "en-IN"
                            )}
                          </span>

                          <span className="text-xs text-slate-400">
                            / qtl
                          </span>
                        </div>

                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          <span className="text-xs text-slate-400">
                            Mandi {formatINR(offer.mandiPrice)}
                          </span>

                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                              premiumPercent >= 0
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-rose-50 text-rose-600"
                            }`}
                          >
                            {priceDifference >= 0
                              ? "+"
                              : ""}
                            {premiumPercent.toFixed(1)}%
                          </span>
                        </div>
                      </div>

                      {/* ACTIONS */}
                      <div className="flex flex-col gap-2 sm:flex-row xl:w-[220px] xl:flex-col">
                        {offer.status === "received" && (
                          <>
                            <button
                              onClick={() =>
                                setSelectedOffer(offer)
                              }
                              className="flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 text-sm font-semibold text-white transition hover:bg-emerald-800"
                            >
                              Review offer
                            </button>

                            <button
                              onClick={() =>
                                openCounterOffer(offer)
                              }
                              className="flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                            >
                              <MessageCircle size={16} />
                              Counter
                            </button>
                          </>
                        )}

                        {offer.status === "accepted" && (
                          <button
                            onClick={() =>
                              navigate("/buyer/contract-details")
                            }
                            className="flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 text-sm font-semibold text-white transition hover:bg-emerald-800"
                          >
                            <CheckCircle2 size={16} />
                            View contract
                          </button>
                        )}

                        {offer.status === "declined" && (
                          <button
                            onClick={() =>
                              setSelectedOffer(offer)
                            }
                            className="flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                          >
                            View details
                          </button>
                        )}
                      </div>
                    </div>

                    {/* LOWER DETAILS */}
                    <div className="mt-5 grid gap-3 border-t border-slate-100 pt-5 sm:grid-cols-2 lg:grid-cols-4">
                      <div>
                        <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                          Quality
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-800">
                          {offer.quality}
                        </p>

                        <p className="text-xs text-slate-500">
                          Moisture {offer.moisture}
                        </p>
                      </div>

                      <div>
                        <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                          Delivery
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-800">
                          {offer.delivery}
                        </p>
                      </div>

                      <div>
                        <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                          Logistics
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-800">
                          {formatINR(offer.logistics)}
                        </p>

                        <p className="text-xs text-slate-500">
                          Estimated
                        </p>
                      </div>

                      <div>
                        <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                          Seller
                        </p>

                        <div className="mt-1 flex items-center gap-2">
                          <span className="text-sm font-semibold text-slate-800">
                            ★ {offer.rating}
                          </span>

                          {offer.verified && (
                            <span className="flex items-center gap-1 text-xs font-medium text-emerald-700">
                              <ShieldCheck size={13} />
                              Verified
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SELLER NOTE */}
                  {offer.status === "received" && (
                    <div className="border-t border-slate-100 bg-slate-50/60 px-5 py-3 sm:px-6">
                      <p className="text-xs text-slate-500">
                        <span className="font-semibold text-slate-700">
                          Seller note:
                        </span>{" "}
                        {offer.note}
                      </p>
                    </div>
                  )}
                </motion.div>
              );
            })
          )}
        </div>
      </main>

      {/* REVIEW MODAL */}
      <AnimatePresence>
        {selectedOffer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm"
            onClick={() => setSelectedOffer(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
            >
              {/* MODAL HEADER */}
              <div className="flex items-start justify-between border-b border-slate-100 p-6">
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <StatusBadge
                      status={selectedOffer.status}
                    />
                  </div>

                  <h2 className="text-xl font-semibold text-slate-950">
                    {selectedOffer.product}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Offer from {selectedOffer.farmer}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedOffer(null)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-5 p-6">
                {/* SELLER */}
                <div className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                      <UserRound size={19} />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-slate-900">
                          {selectedOffer.farmer}
                        </p>

                        {selectedOffer.verified && (
                          <ShieldCheck
                            size={15}
                            className="text-emerald-600"
                          />
                        )}
                      </div>

                      <p className="mt-1 text-xs text-slate-500">
                        {selectedOffer.location} · ★{" "}
                        {selectedOffer.rating}
                      </p>
                    </div>
                  </div>
                </div>

                {/* PRICE */}
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs text-slate-400">
                      Seller offer
                    </p>

                    <p className="mt-1 text-xl font-semibold text-slate-950">
                      {formatINR(
                        selectedOffer.offeredPrice
                      )}
                    </p>

                    <p className="text-xs text-slate-400">
                      per quintal
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs text-slate-400">
                      Mandi reference
                    </p>

                    <p className="mt-1 text-xl font-semibold text-slate-950">
                      {formatINR(
                        selectedOffer.mandiPrice
                      )}
                    </p>

                    <p className="text-xs text-slate-400">
                      indicative
                    </p>
                  </div>

                  <div className="rounded-2xl bg-emerald-50 p-4">
                    <p className="text-xs text-emerald-700">
                      Quantity
                    </p>

                    <p className="mt-1 text-xl font-semibold text-emerald-950">
                      {selectedOffer.quantity}
                    </p>

                    <p className="text-xs text-emerald-700">
                      {selectedOffer.unit}
                    </p>
                  </div>
                </div>

                {/* DETAILS */}
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-slate-200 p-4">
                    <p className="text-xs text-slate-400">
                      Quality
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {selectedOffer.quality}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Moisture {selectedOffer.moisture}
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 p-4">
                    <p className="text-xs text-slate-400">
                      Estimated logistics
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {formatINR(
                        selectedOffer.logistics
                      )}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Final freight may vary
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 p-4">
                    <p className="text-xs text-slate-400">
                      Expected delivery
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {selectedOffer.delivery}
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 p-4">
                    <p className="text-xs text-slate-400">
                      Seller note
                    </p>

                    <p className="mt-1 text-sm font-medium leading-5 text-slate-700">
                      {selectedOffer.note}
                    </p>
                  </div>
                </div>

                {/* ACTIONS */}
                {selectedOffer.status === "received" && (
                  <div className="grid gap-3 border-t border-slate-100 pt-5 sm:grid-cols-3">
                    <button
                      onClick={() =>
                        acceptOffer(selectedOffer)
                      }
                      className="flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 text-sm font-semibold text-white transition hover:bg-emerald-800"
                    >
                      <Check size={16} />
                      Accept offer
                    </button>

                    <button
                      onClick={() =>
                        openCounterOffer(selectedOffer)
                      }
                      className="flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      <MessageCircle size={16} />
                      Counter offer
                    </button>

                    <button
                      onClick={() =>
                        declineOffer(selectedOffer)
                      }
                      className="flex h-11 items-center justify-center gap-2 rounded-xl border border-rose-200 px-4 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
                    >
                      <X size={16} />
                      Decline
                    </button>
                  </div>
                )}

                {selectedOffer.status === "accepted" && (
                  <button
                    onClick={() =>
                      navigate("/buyer/contract-details")
                    }
                    className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 text-sm font-semibold text-white transition hover:bg-emerald-800"
                  >
                    View digital contract
                    <ArrowRightIcon />
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOAST */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-medium text-white shadow-xl"
          >
            <CheckCircle2
              size={17}
              className="text-emerald-400"
            />

            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ArrowRightIcon() {
  return <span aria-hidden="true">→</span>;
}