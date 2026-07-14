import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Reviooo - Build Trust. Get Discovered.",
  description:
    "Reviooo helps businesses collect Google reviews, build trust, and get discovered online.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
