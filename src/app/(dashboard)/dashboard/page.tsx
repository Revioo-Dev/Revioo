"use client";

import { supabase } from "@/lib/supabase/client";
import { useEffect, useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { toPng } from "html-to-image";
import { Lora } from "next/font/google";
import CatalogueManager from "./components/CatalogueManager";


const lora = Lora({ subsets: ["latin"], weight: "variable" });

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
      console.log(data?.[0]);
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

            <CatalogueManager businessId={business.id} />

<div className="mt-4">
  <a
    href={`/b/${business.slug}`}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white hover:bg-purple-700 transition"
  >
    Open Full Catalogue
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
  {/* Background */}
  <img
    src={backgroundImage}
    alt=""
    className="absolute inset-0 w-full h-full object-cover opacity-10"
  />

  <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/70 to-transparent" />

  {/* Purple Spotlights */}
  <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-purple-500/25 blur-[140px]" />
  <div className="absolute top-20 -right-24 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-[120px]" />
  <div className="absolute bottom-24 left-1/2 -translate-x-1/2 h-[420px] w-[420px] rounded-full bg-violet-500/20 blur-[150px]" />

  {/* Card Content */}
  <div className="relative z-10 flex h-full flex-col px-20 pt-16 pb-10">

    <div className="flex items-start justify-between">
      <div className="h-24 w-24 rounded-3xl bg-purple-600 flex items-center justify-center text-5xl font-bold text-white shadow-lg">
        {business.business_name?.charAt(0)}
      </div>

      <div className="flex flex-col items-center text-purple-600">
        <span className="text-3xl">📍</span>
        <span className="text-xl font-bold uppercase">
          {business.city}
        </span>
      </div>
    </div>

    <div className="flex-1 text-center">
      <h2
        className={`${lora.className} mt-12 text-5xl uppercase tracking-wide text-black leading-tight`}
        style={{ fontWeight: 650 }}
      >
        {business.business_name}
      </h2>

                      <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-purple-200 bg-purple-50 px-8 py-4">
                        <span className="text-2xl">🏪</span>
                        <span className="text-2xl font-semibold text-purple-600">
                          {business.category}
                        </span>
                      </div>

                      <div className="mt-12 flex justify-center">
  <div className="rounded-3xl border-4 border-purple-100 bg-white p-8 shadow-xl">
    <QRCodeSVG
      value={business.google_review_link || ""}
      size={330}
    />
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

{/* Catalogue QR */}
<div className="absolute bottom-40 right-10 z-20">
  <div className="rounded-2xl bg-white p-3 border border-purple-200">
    <QRCodeSVG
      value={`${window.location.origin}/b/${business.slug}`}
      size={90}
    />

    <p className="mt-2 text-center text-xs font-bold uppercase tracking-wide text-purple-600">
      View Catalogue
    </p>
  </div>
</div>

</div> {/* closes flex-1 text-center */}
</div> {/* closes relative z-10 flex h-full flex-col */}

{/* Crystal Glossy Purple Wave Footer */}
<div className="absolute bottom-0 left-0 w-full h-70 overflow-hidden">

  <svg
    viewBox="0 0 1023 220"
    preserveAspectRatio="none"
    className="absolute bottom-0 w-full h-full"
  >
    <defs>

      <linearGradient id="waveCrystal" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2A064F" />
        <stop offset="35%" stopColor="#6D28D9" />
        <stop offset="65%" stopColor="#A855F7" />
        <stop offset="100%" stopColor="#D946EF" />
      </linearGradient>

      <linearGradient id="glassShine" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
        <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0.12" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </linearGradient>

      <filter id="waveGlow">
        <feGaussianBlur stdDeviation="10" />
      </filter>

    </defs>


    <path
      d="M0 85 C260 -15 500 180 1023 45 L1023 220 L0 220 Z"
      fill="#C084FC"
      opacity="0.35"
      filter="url(#waveGlow)"
    />

    <path
      d="M0 75 C260 -20 500 175 1023 45 L1023 220 L0 220 Z"
      fill="url(#waveCrystal)"
    />

    <path
      d="M0 75 C260 -20 500 175 1023 45 C650 120 350 55 0 130 Z"
      fill="url(#glassShine)"
    />

    <path
      d="M0 155 C260 80 600 230 1023 120 L1023 220 L0 220 Z"
      fill="#4C1D95"
      opacity="0.55"
    />

    <path
      d="M0 95 C260 5 500 190 1023 65"
      stroke="rgba(255,255,255,0.45)"
      strokeWidth="5"
      fill="none"
    />

  </svg>


  <div className="absolute inset-0 flex flex-col items-center justify-end pb-9">

    <div className="absolute bottom-[92px] h-32 w-32 rounded-full bg-purple-300/60 blur-3xl" />

    <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-[0_0_45px_rgba(216,180,254,.95)]">
      <span className="text-3xl font-black text-purple-700">
        R
      </span>
    </div>

    <h2
      className="mt-3 text-3xl font-black tracking-[0.3em] text-white"
      style={{
        textShadow:
          "0 1px 0 rgba(255,255,255,.35),0 2px 3px rgba(0,0,0,.45)"
      }}
    >
      REVIOO
    </h2>

    <p className="mt-1 text-xs tracking-[0.3em] uppercase text-purple-100">
      Build Trust • Get Discovered
    </p>

    <p className="mt-2 text-xs text-purple-100">
      ✆ Contact us: 03353727314
    </p>

  </div>

</div>


{/* CLOSE QR CARD */}
</div>


{/* CLOSE CARD WRAPPER */}
</div>
{/* Actions live OUTSIDE captured card */}
<div className="mt-6 flex flex-col items-center gap-3">

  <button
    onClick={downloadQRCard}
    className="rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white hover:bg-purple-700 transition"
  >
    Download Review Card
  </button>

  {business.facebook_link && (
    <a
      href={business.facebook_link}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-400 hover:underline"
    >
      Open Facebook Page →
    </a>
  )}

</div>
