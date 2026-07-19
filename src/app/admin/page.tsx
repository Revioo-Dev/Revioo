"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAdmin();
  }, []);

  async function checkAdmin() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      window.location.href = "/";
      return;
    }

    const { data } = await supabase
      .from("admins")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (!data) {
      window.location.href = "/";
      return;
    }

    setIsAdmin(true);
    setLoading(false);
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        Checking admin...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-5xl font-bold mb-10">
        Revioo Admin Panel
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        <div className="rounded-2xl bg-zinc-900 p-6">
          <h2 className="text-2xl font-bold">Users</h2>
          <p className="text-zinc-400 mt-2">
            Manage all users
          </p>
        </div>

        <div className="rounded-2xl bg-zinc-900 p-6">
          <h2 className="text-2xl font-bold">Businesses</h2>
          <p className="text-zinc-400 mt-2">
            Approve businesses
          </p>
        </div>

        <div className="rounded-2xl bg-zinc-900 p-6">
          <h2 className="text-2xl font-bold">Invite Codes</h2>
          <p className="text-zinc-400 mt-2">
            Generate signup codes
          </p>
        </div>

      </div>
    </main>
  );
}
