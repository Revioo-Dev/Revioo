"use client";

import { supabase } from "@/lib/supabase/client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateBusinessPage() {
  const router = useRouter();

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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login first.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("businesses").insert({
      owner_id: user.id,
      business_name: businessName,
      category,
      description,
      address,
      city,
      phone,
      whatsapp,
      website,
      google_review_link: googleReviewLink,
      facebook_link: facebookLink,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Business create successful");
      router.push("/dashboard");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl space-y-4 rounded-2xl border border-gray-800 bg-gray-900/50 p-8"
      >
        <h1 className="text-3xl font-bold">
          Create Your Business
        </h1>

        <input
          type="text"
          placeholder="Business Name"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          required
          className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3"
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3"
        />

        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3"
        />

        <input
          type="text"
          placeholder="WhatsApp"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3"
        />

        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3"
        />

        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3"
        />

        <input
          type="url"
          placeholder="Website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3"
        />

        <input
          type="url"
          placeholder="Google Review Link"
          value={googleReviewLink}
          onChange={(e) => setGoogleReviewLink(e.target.value)}
          className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3"
        />

        <input
          type="url"
          placeholder="Facebook Page Link"
          value={facebookLink}
          onChange={(e) => setFacebookLink(e.target.value)}
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
