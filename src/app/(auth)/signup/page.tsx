"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inviteCode, setInviteCode] = useState("");

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();

    // Check Invite Code
    const { data: codeData, error: codeError } = await supabase
      .from("invite_codes")
      .select("*")
      .eq("code", inviteCode.trim().toUpperCase())
      .maybeSingle();

    if (codeError) {
      alert(codeError.message);
      return;
    }

    if (!codeData) {
      alert("Invalid Invite Code.");
      return;
    }

    if (codeData.used) {
      alert("This Invite Code has already been used.");
      return;
    }

    // Create Account
    const {
      data: signupData,
      error: signupError,
    } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role: "business_owner",
        },
      },
    });

    if (signupError) {
      alert(signupError.message);
      return;
    }

    // Mark Invite Code as Used
    await supabase
      .from("invite_codes")
      .update({
        used: true,
        used_by: signupData.user?.id,
        used_at: new Date().toISOString(),
      })
      .eq("id", codeData.id);

    alert("Account created successfully!");

    window.location.href = "/login";
  }

  return (
    <div>
      <h1
        className="gradient-text"
        style={{
          textAlign: "center",
          fontSize: "2rem",
          marginBottom: "0.5rem",
        }}
      >
        Create Account
      </h1>

      <p
        style={{
          textAlign: "center",
          opacity: 0.8,
          marginBottom: "2rem",
        }}
      >
        Join Reviooo today
      </p>

      <form
        onSubmit={handleSignup}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid #333",
            color: "#000",
            backgroundColor: "#fff",
          }}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid #333",
            color: "#000",
            backgroundColor: "#fff",
          }}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid #333",
            color: "#000",
            backgroundColor: "#fff",
          }}
          required
        />

        <input
          type="text"
          placeholder="Invite Code"
          value={inviteCode}
          onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
          style={{
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid #333",
            color: "#000",
            backgroundColor: "#fff",
          }}
          required
        />

        <p
          style={{
            textAlign: "center",
            fontSize: "12px",
            color: "#888",
            marginTop: "-8px",
          }}
        >
          Verify yourself via WhatsApp:
          <strong> 03353727315</strong>
        </p>

        <button
          type="submit"
          style={{
            padding: "12px",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
            background: "#7C3AED",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          Create Account
        </button>
      </form>

      <div
        style={{
          marginTop: "1.5rem",
          textAlign: "center",
        }}
      >
        <p>
          Already have an account? <a href="/login">Sign In</a>
        </p>
      </div>
    </div>
  );
}
