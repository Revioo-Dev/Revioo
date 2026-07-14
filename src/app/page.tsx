export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontSize: "3rem",
          fontWeight: "700",
          marginBottom: "1rem",
        }}
        className="gradient-text"
      >
        Reviooo
      </h1>

      <p
        style={{
          fontSize: "1.2rem",
          maxWidth: "700px",
          opacity: 0.9,
          marginBottom: "2rem",
        }}
      >
        Build Trust. Get Discovered.
      </p>

      <div className="glass" style={{ padding: "2rem", maxWidth: "700px" }}>
        <h2>🚀 Reviooo V1</h2>

        <p>
          Collect Google Reviews, generate QR codes, manage your business
          profile, and grow your reputation—all from one dashboard.
        </p>
      </div>
    </main>
  );
}
