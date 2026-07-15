"use client";

import { supabase } from "@/lib/supabase/client";

import { useState } from "react";

export default function CreateBusinessPage() {
  const [loading, setLoading] = useState(false);

  const [businessName, setBusinessName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [website, setWebsite] = useState("");
  const [googleReviewLink, setGoogleReviewLink] = useState("");
  const [facebookLink, setFacebookLink] = useState("");

  async function handleSubmit...

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    // Supabase save logic will be added next

    alert("Business registration will be connected to Supabase in the next step.");

    setLoading(false);
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl space-y-4 rounded-2xl border border-gray-800 bg-gray-900/50 p-8"
      >
        <h1 className="text-3xl font-bold">Create Your Business</h1>

        <input
          type="text"
          placeholder="Business Name"
          required
          className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3"
        />

        <input
          type="text"
          placeholder="Category"
          className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3"
        />

        <textarea
          placeholder="Description"
          className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3"
        />

        <input
          type="text"
          placeholder="Phone"
          className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3"
        />

        <input
          type="text"
          placeholder="WhatsApp"
          className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3"
        />

        <input
          type="text"
          placeholder="Address"
          className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3"
        />

        <input
          type="text"
          placeholder="City"
          className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3"
        />

        <input
          type="url"
          placeholder="Website"
          className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3"
        />

        <input
          type="url"
          placeholder="Google Review Link"
          className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3"
        />

        <input
          type="url"
          placeholder="Facebook Page Link"
          className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-purple-600 p-3 font-semibold text-white"
        >
          {loading ? "Saving..." : "Create Business"}
        </button>
      </form>
    </main>
  );
}
