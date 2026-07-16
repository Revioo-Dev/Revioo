"use client";

import { supabase } from "@/lib/supabase/client";
import { useEffect, useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { toPng } from "html-to-image";

export default function DashboardPage() {
  const [business, setBusiness] = useState<any>(null);

  const qrCardRef = useRef<HTMLDivElement>(null);

  async function downloadQRCard() {
  if (!qrCardRef.current) return;

  try {
    const dataUrl = await toPng(qrCardRef.current);

    const link = document.createElement("a");
    link.download = `${business.business_name}-review-card.png`;
    link.href = dataUrl;
    link.click();

  } catch (error) {
    console.log(error);
    alert("Could not download QR card");
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
      <h1 className="text-xl">
        Loading business...
      </h1>
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

        <h1 className="text-4xl font-bold mb-8">
          Revioo Dashboard
        </h1>


        <div
  className="relative overflow-hidden rounded-3xl border border-white/10 p-8 shadow-2xl"
  style={{
  backgroundImage: `linear-gradient(rgba(10,10,10,0.85), rgba(10,10,10,0.85)), url(${backgroundImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
}}
>

          {/* Glossy Business Name Background */}

          <div className="absolute inset-0 overflow-hidden pointer-events-none">
  <div className="absolute inset-0 -rotate-[25deg] opacity-5 flex flex-wrap content-center justify-center gap-x-8 gap-y-6 p-6">
    {Array.from({ length: 36 }).map((_, i) => (
      <span
        key={i}
        className="text-lg font-bold uppercase whitespace-nowrap text-white"
      >
        {business.business_name}
      </span>
    ))}
  </div>
</div>


          {/* Glow */}

          <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl">
          </div>


          <div className="relative z-10">


            {/* Business Header */}

            <div className="flex items-center gap-5 mb-8">

              <div className="h-20 w-20 rounded-3xl bg-purple-600 flex items-center justify-center text-3xl font-black shadow-lg">
                {business.business_name?.charAt(0)}
              </div>


              <div>
                <h2 className="text-3xl font-bold">
                  {business.business_name}
                </h2>

                <p className="text-gray-400 mt-1">
                  {business.category}
                </p>
              </div>

            </div>



            {/* Details */}

            <div className="grid md:grid-cols-2 gap-4">

              <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
                <p className="text-gray-400 text-sm">
                  Location
                </p>
                <p className="mt-2">
                  📍 {business.city}
                </p>
              </div>


              <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
                <p className="text-gray-400 text-sm">
                  Phone
                </p>
                <p className="mt-2">
                  📞 {business.phone}
                </p>
              </div>


              <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
                <p className="text-gray-400 text-sm">
                  WhatsApp
                </p>
                <p className="mt-2">
                  💬 {business.whatsapp}
                </p>
              </div>


              <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
                <p className="text-gray-400 text-sm">
                  Address
                </p>
                <p className="mt-2">
                  {business.address}
                </p>
              </div>

            </div>



            {/* Google Review + QR Section */}

            <div className="mt-8 rounded-3xl bg-purple-600/20 border border-purple-500/30 p-6">


              <h3 className="text-2xl font-bold">
                Google Reviews
              </h3>


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

            <div
  ref={qrCardRef}
  className="relative mt-8 w-full max-w-md overflow-hidden rounded-[40px] bg-white shadow-2xl p-8"
>

  {/* City Map Background */}
  <img
    src={backgroundImage}
    alt=""
    className="absolute inset-0 w-full h-full object-cover opacity-10"
  />

  {/* Purple Glow */}
  <div className="absolute -top-28 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-purple-500 blur-3xl opacity-25"></div>

  {/* Content */}
  <div className="relative z-10 text-center">

    <div className="mx-auto mb-4 h-16 w-16 rounded-2xl bg-purple-600 flex items-center justify-center text-3xl font-bold text-white shadow-lg">
      {business.business_name?.charAt(0)}
    </div>

    <h2 className="text-2xl font-bold text-black">
  {business.business_name}
</h2>

<p className="mt-1 text-gray-600">
  {business.category}
</p>

<div className="mt-4 flex items-center justify-center gap-1 text-yellow-500 text-xl">
  ⭐⭐⭐⭐⭐
</div>

<p className="mt-2 text-sm text-gray-500">
  We'd love your feedback on Google
</p>

<div className="mt-8 flex justify-center">
  <div className="rounded-3xl border-2 border-purple-200 bg-white p-5 shadow-xl">

    <QRCodeSVG
      value={business.google_review_link || ""}
      size={200}
    />

  </div>
</div>

    <p className="mt-5 text-sm font-semibold text-black">
      ⭐ Scan to leave us a Google Review
    </p>

    <p className="mt-2 text-xs text-gray-500">
      Powered by <span className="font-semibold text-purple-600">Revioo</span>
    </p>

  </div>

</div>


  <div className="mt-6 flex justify-center">

    <QRCodeSVG
      value={business.google_review_link || ""}
      size={200}
    />

  </div>


  <p className="mt-5 text-sm font-semibold">
    Scan to leave us a Google Review
  </p>


  <p className="mt-2 text-xs text-gray-500">
    Powered by Revioo
  </p>

</div>


<button
  onClick={downloadQRCard}
  className="mt-5 rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white"
>
  Download Review Card
</button>



            {/* Facebook */}

            {business.facebook_link && (
              <div className="mt-6">

                <a
                  href={business.facebook_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  Open Facebook Page →
                </a>

              </div>
            )}


          </div>

        </div>

      </div>

    </main>
  );
}
