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

  return (
    <main className="min-h-screen bg-black p-6 text-white">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Revioo Dashboard
        </h1>


        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-purple-900/40 via-black to-black backdrop-blur-xl p-8 shadow-2xl">


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
  className="mt-8 w-full max-w-sm rounded-3xl bg-white p-8 text-black text-center shadow-2xl"
>

  <div className="mx-auto mb-4 h-16 w-16 rounded-2xl bg-purple-600 flex items-center justify-center text-3xl font-bold text-white">
    {business.business_name?.charAt(0)}
  </div>


  <h2 className="text-2xl font-bold">
    {business.business_name}
  </h2>


  <p className="mt-1 text-gray-600">
    {business.category}
  </p>


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
