"use client";

import { useState } from "react";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSignup(e: React.FormEvent) {
    e.preventDefault();

    alert("Supabase signup will be connected in the next module.");
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
          style={{ padding: "12px", borderRadius: "10px", border: "1px solid #333" }}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: "12px", borderRadius: "10px", border: "1px solid #333" }}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: "12px", borderRadius: "10px", border: "1px solid #333" }}
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
