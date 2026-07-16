"use client";

import { supabase } from "@/lib/supabase/client";
import { useEffect, useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { toPng } from "html-to-image";

export default function DashboardPage() {
  const [business, setBusiness] = useState<any>(null);

  const qrCardRef = useRef<HTMLDivElement>(null);

  async function downloadQRCard() {
    if (!qrCardRef.current) return;

    // Open a blank tab RIGHT NOW, synchronously, while we still have the
    // "this came from a real tap" permission. Many mobile browsers (iOS
    // Safari, in-app WhatsApp/Instagram browsers) silently block downloads
    // triggered after an async delay — this tab is our guaranteed fallback.
    const fallbackTab = window.open("", "_blank");

    try {
      const node = qrCardRef.current;
      const targetWidth = 1600;

      const rect = node.getBoundingClientRect();
      const scale = targetWidth / rect.width;
      const targetHeight = Math.round(rect.height * scale);

      const dataUrl = await toPng(node, {
        width: targetWidth,
        height: targetHeight,
        pixelRatio: 2,
        quality: 1,
        backgroundColor: "#ffffff",
        style: {
          transform: `
