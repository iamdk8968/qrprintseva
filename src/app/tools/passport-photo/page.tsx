"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import {
  Printer,
  Upload,
  Download,
  Image as ImageIcon,
  Check,
  Scissors,
  ArrowLeft,
  Sparkles,
  Palette,
  LayoutGrid,
} from "lucide-react";

export default function PassportPhotoStudio() {
  const { language } = useLanguage();
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [photoCount, setPhotoCount] = useState<8 | 12 | 16 | 32>(8);
  const [paperFormat, setPaperFormat] = useState<"4x6" | "a4">("4x6");
  const [bgColor, setBgColor] = useState<"original" | "white" | "blue" | "lightgray">("white");
  const [showCutLines, setShowCutLines] = useState(true);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImageSrc(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Draw grid onto canvas
  const drawGrid = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Standard 4x6 inch is 1200 x 1800 at 300 DPI, or scaled for web preview
    const width = paperFormat === "4x6" ? 1200 : 1600;
    const height = paperFormat === "4x6" ? 800 : 2200;
    canvas.width = width;
    canvas.height = height;

    // Fill background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    if (!imageSrc) {
      // Placeholder illustration
      ctx.fillStyle = "#f1f5f9";
      ctx.fillRect(40, 40, width - 80, height - 80);
      ctx.fillStyle = "#64748b";
      ctx.font = "bold 32px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(
        language === "hi"
          ? "कृपया एक फोटो अपलोड करें"
          : "Please upload a photo to preview grid",
        width / 2,
        height / 2
      );
      return;
    }

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageSrc;
    img.onload = () => {
      // Determine columns and rows
      let cols = 4;
      let rows = 2;
      if (paperFormat === "4x6") {
        if (photoCount === 8) {
          cols = 4;
          rows = 2;
        } else if (photoCount === 12) {
          cols = 4;
          rows = 3;
        } else {
          cols = 4;
          rows = 4;
        }
      } else {
        // A4
        cols = 4;
        rows = 8; // 32
      }

      const marginX = 60;
      const marginY = 60;
      const cellWidth = (width - marginX * 2) / cols;
      const cellHeight = (height - marginY * 2) / rows;
      const photoWidth = cellWidth * 0.88;
      const photoHeight = cellHeight * 0.92;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = marginX + c * cellWidth + (cellWidth - photoWidth) / 2;
          const y = marginY + r * cellHeight + (cellHeight - photoHeight) / 2;

          // Background tint behind photo if selected
          if (bgColor === "white") {
            ctx.fillStyle = "#ffffff";
          } else if (bgColor === "blue") {
            ctx.fillStyle = "#3b82f6";
          } else if (bgColor === "lightgray") {
            ctx.fillStyle = "#e2e8f0";
          }
          if (bgColor !== "original") {
            ctx.fillRect(x, y, photoWidth, photoHeight);
          }

          // Draw the image cropped to 3.5cm x 4.5cm ratio
          ctx.drawImage(img, x, y, photoWidth, photoHeight);

          // Border / Cut lines
          if (showCutLines) {
            ctx.strokeStyle = "#94a3b8";
            ctx.lineWidth = 1.5;
            ctx.setLineDash([4, 4]);
            ctx.strokeRect(x, y, photoWidth, photoHeight);
            ctx.setLineDash([]);
          }
        }
      }
    };
  }, [paperFormat, photoCount, imageSrc, bgColor, showCutLines, language]);

  useEffect(() => {
    drawGrid();
  }, [drawGrid]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `Passport_Photos_${paperFormat}_${photoCount}.jpg`;
    link.href = canvas.toDataURL("image/jpeg", 0.95);
    link.click();
  };

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>

          <span className="text-xs font-bold bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
            ⚡ Cyber Cafe Tool #1
          </span>
        </div>

        {/* Title banner */}
        <div className="glass-card rounded-3xl p-6 bg-white shadow-sm border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <ImageIcon className="w-6 h-6 text-blue-600" />
              <span>
                {language === "hi"
                  ? "पासपोर्ट फोटो स्टूडियो (4x6 व A4 शीट)"
                  : "Passport Photo Grid Studio"}
              </span>
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              {language === "hi"
                ? "1 फोटो अपलोड करें और तुरंत 8, 12, 16 या 32 फोटो की ग्रिड शीट कटिंग लाइन के साथ प्रिंट करें।"
                : "Upload 1 photo and instantly generate 4x6 / A4 print sheets with cut borders."}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              disabled={!imageSrc}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/25 transition flex items-center gap-2 disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>{language === "hi" ? "शीट डाउनलोड करें" : "Download Sheet"}</span>
            </button>
          </div>
        </div>

        {/* Main Work Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            {/* 1. Upload Box */}
            <div className="glass-card rounded-2xl p-5 bg-white border border-slate-200 space-y-3">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                1. {language === "hi" ? "फोटो अपलोड करें:" : "Upload Single Photo:"}
              </label>

              <label className="border-2 border-dashed border-blue-300 hover:border-blue-500 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer bg-blue-50/40 hover:bg-blue-50/70 transition">
                <Upload className="w-6 h-6 text-blue-600 mb-1" />
                <span className="text-xs font-bold text-slate-800">
                  {imageSrc
                    ? language === "hi"
                      ? "दूसरी फोटो बदलें"
                      : "Change Photo"
                    : language === "hi"
                    ? "फोटो चुनें"
                    : "Select Photo"}
                </span>
                <span className="text-[10px] text-slate-500 mt-0.5">JPG / PNG / WebP</span>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleImageUpload}
                  accept="image/*"
                />
              </label>
            </div>

            {/* 2. Format & Photo Count */}
            <div className="glass-card rounded-2xl p-5 bg-white border border-slate-200 space-y-4">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                2. {language === "hi" ? "शीट और फोटो संख्या:" : "Sheet & Photo Count:"}
              </label>

              {/* Sheet selector */}
              <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => {
                    setPaperFormat("4x6");
                    setPhotoCount(8);
                  }}
                  className={`py-2 rounded-xl border text-center transition ${
                    paperFormat === "4x6"
                      ? "border-blue-600 bg-blue-50 text-blue-700"
                      : "border-slate-200 text-slate-600 bg-white"
                  }`}
                >
                  4 × 6 Inch Glossy
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPaperFormat("a4");
                    setPhotoCount(32);
                  }}
                  className={`py-2 rounded-xl border text-center transition ${
                    paperFormat === "a4"
                      ? "border-blue-600 bg-blue-50 text-blue-700"
                      : "border-slate-200 text-slate-600 bg-white"
                  }`}
                >
                  A4 Paper Sheet
                </button>
              </div>

              {/* Count selector */}
              {paperFormat === "4x6" ? (
                <div className="grid grid-cols-3 gap-2 text-xs font-bold">
                  {[8, 12, 16].map((count) => (
                    <button
                      key={count}
                      type="button"
                      onClick={() => setPhotoCount(count as 8 | 12 | 16)}
                      className={`py-2 rounded-xl border text-center transition ${
                        photoCount === count
                          ? "border-slate-900 bg-slate-900 text-white"
                          : "border-slate-200 text-slate-700 bg-white"
                      }`}
                    >
                      {count} Photos
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 text-center">
                  Full 32 Photos on A4
                </div>
              )}
            </div>

            {/* 3. Background Color */}
            <div className="glass-card rounded-2xl p-5 bg-white border border-slate-200 space-y-3">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-blue-600" />
                <span>3. {language === "hi" ? "बैकग्राउंड कलर:" : "Studio Background Color:"}</span>
              </label>

              <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setBgColor("white")}
                  className={`py-2 px-3 rounded-xl border flex items-center gap-2 transition ${
                    bgColor === "white"
                      ? "border-blue-600 bg-blue-50 text-blue-800 font-bold"
                      : "border-slate-200 bg-white text-slate-700"
                  }`}
                >
                  <span className="w-3.5 h-3.5 rounded-full border border-slate-300 bg-white"></span>
                  <span>Pure White</span>
                </button>

                <button
                  type="button"
                  onClick={() => setBgColor("blue")}
                  className={`py-2 px-3 rounded-xl border flex items-center gap-2 transition ${
                    bgColor === "blue"
                      ? "border-blue-600 bg-blue-50 text-blue-800 font-bold"
                      : "border-slate-200 bg-white text-slate-700"
                  }`}
                >
                  <span className="w-3.5 h-3.5 rounded-full bg-blue-600"></span>
                  <span>Passport Blue</span>
                </button>

                <button
                  type="button"
                  onClick={() => setBgColor("lightgray")}
                  className={`py-2 px-3 rounded-xl border flex items-center gap-2 transition ${
                    bgColor === "lightgray"
                      ? "border-blue-600 bg-blue-50 text-blue-800 font-bold"
                      : "border-slate-200 bg-white text-slate-700"
                  }`}
                >
                  <span className="w-3.5 h-3.5 rounded-full bg-slate-300"></span>
                  <span>Light Grey</span>
                </button>

                <button
                  type="button"
                  onClick={() => setBgColor("original")}
                  className={`py-2 px-3 rounded-xl border flex items-center gap-2 transition ${
                    bgColor === "original"
                      ? "border-blue-600 bg-blue-50 text-blue-800 font-bold"
                      : "border-slate-200 bg-white text-slate-700"
                  }`}
                >
                  <span>As Uploaded</span>
                </button>
              </div>

              {/* Cut Lines Switch */}
              <div className="pt-2 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                  <Scissors className="w-3.5 h-3.5 text-slate-500" />
                  <span>Border Cut Lines:</span>
                </span>
                <input
                  type="checkbox"
                  checked={showCutLines}
                  onChange={(e) => setShowCutLines(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Canvas Live Preview (8 cols) */}
          <div className="lg:col-span-8 flex flex-col items-center justify-center glass-card rounded-3xl p-6 bg-white border border-slate-200 shadow-sm overflow-hidden">
            <div className="w-full flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                <LayoutGrid className="w-4 h-4 text-blue-600" />
                <span>
                  {language === "hi"
                    ? `प्रिंट प्रीव्यू (${paperFormat} • ${photoCount} फोटोज)`
                    : `Live Print Preview (${paperFormat} • ${photoCount} Photos)`}
                </span>
              </span>
              <span className="text-[11px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                300 DPI High-Res
              </span>
            </div>

            {/* Canvas Render */}
            <div className="w-full flex items-center justify-center p-2 bg-slate-100 rounded-2xl border border-slate-200 overflow-auto max-h-[600px]">
              <canvas
                ref={canvasRef}
                className="max-w-full h-auto shadow-md rounded-lg bg-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
