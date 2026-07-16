import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/Footer";

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
      <body className="min-h-screen flex flex-col bg-black">
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
