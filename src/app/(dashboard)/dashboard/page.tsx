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

      const { data, error } = await supabase
        .from("businesses")
        .select("*")
        .eq("owner_id", user.id)
        .single();

      if (error) {
        console.log(error.message);
        return;
      }

      setBusiness(data);
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

        <p>Category: {business.category}</p>
        <p>City: {business.city}</p>
        <p>Phone: {business.phone}</p>

        <p className="mt-4">
          Google Review Link:
        </p>

        <a
          href={business.google_review_link}
          target="_blank"
          className="text-blue-500"
        >
          Open Review Link
        </a>
      </div>
    </main>
  );
}
