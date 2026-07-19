"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
  alert(error.message);
  return;
}

const {
  data: { user },
} = await supabase.auth.getUser();

const { data: admin } = await supabase
  .from("admins")
  .select("id")
  .eq("user_id", user!.id)
  .maybeSingle();

alert("Login successful!");

if (admin) {
  window.location.href = "/admin";
} else {
  window.location.href = "/dashboard";
}
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
        Welcome Back
      </h1>

      <p
        style={{
          textAlign: "center",
          opacity: 0.8,
          marginBottom: "2rem",
        }}
      >
        Sign in to your Reviooo account
      </p>

      <form
        onSubmit={handleLogin}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
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
          Sign In
        </button>
      </form>

      <div
        style={{
          marginTop: "1.5rem",
          textAlign: "center",
        }}
      >
        <p>
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>

        <p>
          <a href="/forgot-password">Forgot Password?</a>
        </p>
      </div>
    </div>
  );
}
