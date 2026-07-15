"use client";

import { supabase } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [business, setBusiness] = useState<any>(null);

  useEffect(() => {
    async function getBusiness() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      console.log("Logged in user:", user.id);

      const { data, error } = await supabase
  .from("businesses")
  .select("*")
  .eq("owner_id", user.id)
  .order("created_at", { ascending: false })
  .limit(1);

      if (error) {
  alert("Error: " + error.message);
  return;
}

console.log("Business data:", data);

if (!data) {
  alert("No business found for this user");
  return;
}

setBusiness(data?.[0]);
    }

    getBusiness();
  }, []);

  if (!business) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h1>Loading business...</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-6">
      <h1 className="text-3xl font-bold">
        Revioo Dashboard
      </h1>

      <div className="mt-6 rounded-xl border p-6">
        <h2 className="text-2xl font-bold">
          {business.business_name}
        </h2>

        <p className="mt-2">
          Category: {business.category}
        </p>

        <p>
          Description: {business.description}
        </p>

        <p>
          Address: {business.address}
        </p>

        <p>
          City: {business.city}
        </p>

        <p>
          Phone: {business.phone}
        </p>

        <p>
          WhatsApp: {business.whatsapp}
        </p>

        <p className="mt-4">
          Google Review Link:
        </p>

        <a
          href={business.google_review_link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500"
        >
          Open Review Link
        </a>

        <p className="mt-4">
          Facebook Link:
        </p>

        <a
          href={business.facebook_link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500"
        >
          Open Facebook Page
        </a>
      </div>
    </main>
  );
}
