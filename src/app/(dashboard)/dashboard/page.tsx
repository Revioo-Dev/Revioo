"use client";

import { supabase } from "@/lib/supabase/client";
import { useEffect, useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { toPng } from "html-to-image";

const CARD_WIDTH = 1023;
const CARD_HEIGHT = 1537;

export default function DashboardPage() {
  const [business, setBusiness] = useState<any>(null);
  const [scale, setScale] = useState(1);

  const qrCardRef = useRef<HTMLDivElement>(null);
  const cardWrapperRef = useRef<HTMLDivElement>(null);

  // Keep the card's internal layout at true 1023x1537 (so downloads stay
  // pixel-perfect) but visually scale it to fit whatever screen it's on.
  useEffect(() => {
    function updateScale() {
      if (cardWrapperRef.current) {
        const containerWidth = cardWrapperRef.current.offsetWidth;
        setScale(containerWidth / CARD_WIDTH);
      }
    }
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  async function downloadQRCard() {
    if (!qrCardRef.current) return;

    const node = qrCardRef.current;
    const prevTransform = node.style.transform;

    // Temporarily un-scale for capture so the exported PNG is full resolution,
    // regardless of how small it's currently being displayed on screen.
    node.style.transform = "none";

    try {
      const dataUrl = await toPng(node, {
        cacheBust: true,
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        pixelRatio: 1,
        backgroundColor: "#f3e8ff",
      });

      const link = document.createElement("a");
      link.download = `${business.business_name}-review-card.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.log(error);
      alert("Could not download QR card");
    } finally {
      node.style.transform = prevTransform;
    }
  }

  useEffect(() => {
    async function getBusiness() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("businesses")
        .select("*")
        .eq("owner_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1);

      if (error) {
        console.log(error.message);
        return;
      }

      setBusiness(data?.[0] ?? null);
    }

    getBusiness();
  }, []);

  if (!business) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black text-white">
        <h1 className="text-xl">Loading business...</h1>
      </main>
    );
  }

  const cityBackgrounds: Record<string, string> = {
    mirpurkhas: "/backgrounds/mirpurkhas-map.png",
    karachi: "/backgrounds/karachi-map.png",
  };

  const backgroundImage =
    cityBackgrounds[business.city?.toLowerCase()] ||
    "/backgrounds/mirpurkhas-map.png";

  return (
    <main className="min-h-screen bg-black p-6 text-white">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Revioo Dashboard</h1>

        <div
          className="relative overflow-hidden rounded-3xl border border-white/10 p-8 shadow-2xl"
          style={{
            backgroundImage: `linear-gradient(rgba(10,10,10,0.85), rgba(10,10,10,0.85)), url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img
              src={backgroundImage}
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-25 saturate-150 contrast-125"
            />
            <div className="absolute -inset-y-20 -left-1/2 w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative flex flex-col items-center">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-300 via-purple-500 to-purple-700 shadow-lg flex items-center justify-center ring-4 ring-white/20">
                  <div className="h-2.5 w-2.5 rounded-full bg-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />

          <div className="relative z-10">
            <div className="flex items-center gap-5 mb-8">
              <div className="h-20 w-20 rounded-3xl bg-purple-600 flex items-center justify-center text-3xl font-black">
                {business.business_name?.charAt(0)}
              </div>
              <div>
                <h2 className="text-3xl font-bold">{business.business_name}</h2>
                <p className="text-gray-400 mt-1">{business.category}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
                <p className="text-gray-400 text-sm">Location</p>
                <p className="mt-2">📍 {business.city}</p>
              </div>

              <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
                <p className="text-gray-400 text-sm">Phone</p>
                <p className="mt-2">📞 {business.phone}</p>
              </div>

              <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
                <p className="text-gray-400 text-sm">WhatsApp</p>
                <p className="mt-2">💬 {business.whatsapp}</p>
              </div>

              <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
                <p className="text-gray-400 text-sm">Address</p>
                <p className="mt-2">{business.address}</p>
              </div>
            </div>

            {/* Google Review + QR Section */}
            <div className="mt-8 rounded-3xl bg-purple-600/20 border border-purple-500/30 p-6">
              <h3 className="text-2xl font-bold">Google Reviews</h3>
              <p className="text-gray-300 mt-2 mb-5">
                Customers can scan this QR code or use the button to leave a review.
              </p>
              <a
                href={business.google_review_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-xl bg-purple-600 px-6 py-3 font-semibold hover:bg-purple-700 transition"
              >
                Open Review Link
              </a>
            </div>

            {/* QR REVIEW CARD */}
            <div className="mt-8 flex flex-col items-center">
              {/* Outer border/frame — sized responsively based on scale */}
              <div
                ref={cardWrapperRef}
                className="w-full max-w-[380px] sm:max-w-[420px] rounded-[42px] p-[3px] bg-gradient-to-br from-purple-300 via-white to-purple-400 shadow-[0_25px_60px_-15px_rgba(124,58,237,0.5)] overflow-hidden"
                style={{ height: CARD_HEIGHT * scale + 6 }}
              >
                {/* The actual card, always laid out at true 1023x1537,
                    visually scaled down to fit the wrapper. */}
                <div
                  ref={qrCardRef}
                  className="relative bg-gradient-to-b from-purple-200 via-purple-100 to-purple-50 rounded-[40px] overflow-hidden"
                  style={{
                    width: CARD_WIDTH,
                    height: CARD_HEIGHT,
                    transform: `scale(${scale})`,
                    transformOrigin: "top left",
                  }}
                >
                  <img
                    src={backgroundImage}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover opacity-10"
                  />
                  <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/70 to-transparent" />

                  <div className="relative z-10 flex h-full flex-col px-20 pt-16 pb-10">
                    <div className="flex items-start justify-between">
                      <div className="h-24 w-24 rounded-3xl bg-purple-600 flex items-center justify-center text-5xl font-bold text-white shadow-lg">
                        {business.business_name?.charAt(0)}
                      </div>

                      <div className="flex flex-col items-center text-purple-600">
                        <span className="text-3xl">📍</span>
                        <span className="text-xl font-bold uppercase">{business.city}</span>
                      </div>
                    </div>

                    <div className="flex-1 text-center">
                      <h2 className="mt-12 text-6xl font-extrabold text-black leading-tight">
                        {business.business_name}
                      </h2>

                      <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-purple-200 bg-purple-50 px-8 py-4">
                        <span className="text-2xl">🏪</span>
                        <span className="text-2xl font-semibold text-purple-600">
                          {business.category}
                        </span>
                      </div>

                      <div className="mt-10 flex items-center justify-center gap-5">
                        <span className="h-px w-24 bg-purple-200" />
                        <span className="text-3xl text-purple-500">♥</span>
                        <span className="h-px w-24 bg-purple-200" />
                      </div>

                      <p className="mt-8 text-lg font-medium tracking-[0.25em] text-gray-500 uppercase font-serif">
                        Your feedback helps us grow
                      </p>

                      <div className="mt-12 flex justify-center">
                        <div className="rounded-3xl border-4 border-purple-100 bg-white p-8 shadow-xl">
                          <QRCodeSVG value={business.google_review_link || ""} size={330} />
                        </div>
                      </div>

                      <div className="mt-10 flex items-center justify-center gap-4">
                        <div className="h-14 w-14 rounded-full bg-white flex items-center justify-center text-3xl">
                          🔍
                        </div>
                        <p className="text-2xl text-gray-700 font-medium tracking-wide">
                          Scan to review us on{" "}
                          <span className="font-extrabold text-purple-600">Google</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 3D Wave Footer — soft single curve, deep purple gradient,
                      centered glow + embossed REVIOO wordmark */}
                  <div className="absolute bottom-0 left-0 w-full h-56">
                    <svg
                      viewBox="0 0 1023 220"
                      preserveAspectRatio="none"
                      className="absolute bottom-0 w-full h-full"
                    >
                      <defs>
                        <linearGradient id="waveMain" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#3B0A6B" />
                          <stop offset="55%" stopColor="#6D28D9" />
                          <stop offset="100%" stopColor="#9333EA" />
                        </linearGradient>
                      </defs>

                      {/* Single soft curve */}
                      <path
                        d="M0,110
                           C260,10 500,190 1023,90
                           L1023,220
                           L0,220Z"
                        fill="url(#waveMain)"
                      />

                      {/* Soft top highlight along the curve */}
                      <path
                        d="M0,110
                           C260,10 500,190 1023,90"
                        stroke="rgba(255,255,255,.3)"
                        strokeWidth="4"
                        fill="none"
                      />
                    </svg>

                    <div className="absolute inset-0 flex flex-col items-center justify-end pb-9">
                      {/* Glow behind logo */}
                      <div className="absolute bottom-[92px] h-28 w-28 rounded-full bg-purple-300/50 blur-2xl" />

                      {/* Logo badge */}
                      
