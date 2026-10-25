"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import {
  ScanLine,
  Upload,
  Download,
  Printer,
  ArrowLeft,
  Sparkles,
  Sliders,
  CheckCircle2,
  Maximize,
  RotateCw,
} from "lucide-react";

export default function DocumentScannerFilter() {
  const { language } = useLanguage();
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [filterMode, setFilterMode] = useState<"bw-clean" | "magic-color" | "greyscale">("bw-clean");
  const [threshold, setThreshold] = useState(130);
  const [rotation, setRotation] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) setImageSrc(ev.target.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const processImage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (!imageSrc) {
      canvas.width = 800;
      canvas.height = 500;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, 800, 500);
      ctx.fillStyle = "#94a3b8";
      ctx.font = "bold 22px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(
        language === "hi"
          ? "कृपया फोन से खींची गई मार्कशीट या डॉक्यूमेंट अपलोड करें"
          : "Upload a document/marksheet photo to enhance",
        400,
        250
      );
      return;
    }

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageSrc;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      // Handle rotation if needed
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      if (rotation !== 0) {
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.drawImage(img, -img.width / 2, -img.height / 2);
      } else {
        ctx.drawImage(img, 0, 0);
      }
      ctx.restore();

      // Get image data for pixel processing
      try {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          // Luminance
          const lum = 0.299 * r + 0.587 * g + 0.114 * b;

          if (filterMode === "bw-clean") {
            // Adaptive thresholding: pure white paper, dark text
            const v = lum > threshold ? 255 : Math.max(0, lum * 0.7);
            data[i] = v;
            data[i + 1] = v;
            data[i + 2] = v;
          } else if (filterMode === "magic-color") {
            // Whiten bright areas, enhance vibrant colored stamps
            if (lum > threshold) {
              data[i] = 255;
              data[i + 1] = 255;
              data[i + 2] = 255;
            } else {
              // Boost color saturation
              data[i] = Math.min(255, r * 1.15);
              data[i + 1] = Math.min(255, g * 1.15);
              data[i + 2] = Math.min(255, b * 1.15);
            }
          } else if (filterMode === "greyscale") {
            data[i] = lum;
            data[i + 1] = lum;
            data[i + 2] = lum;
          }
        }
        ctx.putImageData(imageData, 0, 0);
      } catch {
        // Fallback
      }
    };
  }, [imageSrc, filterMode, threshold, rotation, language]);

  useEffect(() => {
    processImage();
  }, [processImage]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `Scanned_Clean_Document.jpg`;
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

          <span className="text-xs font-bold bg-amber-100 text-amber-700 px-3 py-1 rounded-full">
            ⚡ Cyber Cafe Tool #4
          </span>
        </div>

        {/* Title Banner */}
        <div className="glass-card rounded-3xl p-6 bg-white shadow-sm border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <ScanLine className="w-6 h-6 text-amber-600" />
              <span>
                {language === "hi"
                  ? "डॉक्यूमेंट स्कैनर व क्लैरिटी फिल्टर"
                  : "Smart Document Scanner & Xerox Enhancer"}
              </span>
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              {language === "hi"
                ? "मोबाइल से खींची गई गंदी या पीली फोटो के शैडो हटाकर साफ, डार्क और क्रिस्प ज़ेरॉक्स बनाएं।"
                : "Removes yellow tint and phone shadows to generate crisp, clean, high-contrast photocopies."}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              disabled={!imageSrc}
              className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md shadow-amber-500/25 transition flex items-center gap-2 disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>{language === "hi" ? "साफ कॉपी डाउनलोड करें" : "Download Enhanced Copy"}</span>
            </button>
          </div>
        </div>

        {/* Work Area Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            {/* Upload */}
            <div className="glass-card rounded-2xl p-5 bg-white border border-slate-200 space-y-3">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                1. {language === "hi" ? "फोटो या डॉक्यूमेंट चुनें:" : "Upload Phone Snapshot:"}
              </label>

              <label className="border-2 border-dashed border-amber-300 hover:border-amber-500 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer bg-amber-50/30 hover:bg-amber-50/60 transition">
                <Upload className="w-6 h-6 text-amber-600 mb-1" />
                <span className="text-xs font-bold text-slate-800">
                  {imageSrc
                    ? language === "hi"
                      ? "दूसरी फोटो बदलें"
                      : "Change Image"
                    : language === "hi"
                    ? "फोटो चुनें"
                    : "Select Snapshot"}
                </span>
                <span className="text-[10px] text-slate-500 mt-0.5">JPG / PNG / Document</span>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUpload}
                  accept="image/*"
                />
              </label>
            </div>

            {/* Filter Mode */}
            <div className="glass-card rounded-2xl p-5 bg-white border border-slate-200 space-y-3">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                2. {language === "hi" ? "स्कैनर फिल्टर चुनें:" : "Select Filter Mode:"}
              </label>

              <div className="space-y-2 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => {
                    setFilterMode("bw-clean");
                    setThreshold(130);
                  }}
                  className={`w-full p-2.5 rounded-xl border text-left transition flex items-center justify-between ${
                    filterMode === "bw-clean"
                      ? "border-amber-600 bg-amber-50 text-amber-900 shadow-sm"
                      : "border-slate-200 text-slate-700 bg-white"
                  }`}
                >
                  <span>Crisp Clean B&W (Xerox)</span>
                  {filterMode === "bw-clean" && <CheckCircle2 className="w-4 h-4 text-amber-600" />}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setFilterMode("magic-color");
                    setThreshold(140);
                  }}
                  className={`w-full p-2.5 rounded-xl border text-left transition flex items-center justify-between ${
                    filterMode === "magic-color"
                      ? "border-amber-600 bg-amber-50 text-amber-900 shadow-sm"
                      : "border-slate-200 text-slate-700 bg-white"
                  }`}
                >
                  <span>Magic Color (Keep Stamps/Signs)</span>
                  {filterMode === "magic-color" && <CheckCircle2 className="w-4 h-4 text-amber-600" />}
                </button>

                <button
                  type="button"
                  onClick={() => setFilterMode("greyscale")}
                  className={`w-full p-2.5 rounded-xl border text-left transition flex items-center justify-between ${
                    filterMode === "greyscale"
                      ? "border-amber-600 bg-amber-50 text-amber-900 shadow-sm"
                      : "border-slate-200 text-slate-700 bg-white"
                  }`}
                >
                  <span>Smooth Greyscale</span>
                  {filterMode === "greyscale" && <CheckCircle2 className="w-4 h-4 text-amber-600" />}
                </button>
              </div>

              {/* Threshold Slider */}
              <div className="pt-3 border-t border-slate-100">
                <div className="flex justify-between text-xs text-slate-600 mb-1">
                  <span>White Background Threshold:</span>
                  <span className="font-bold">{threshold}</span>
                </div>
                <input
                  type="range"
                  min="80"
                  max="200"
                  value={threshold}
                  onChange={(e) => setThreshold(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Rotation */}
              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700">Rotate Document:</span>
                <button
                  onClick={() => setRotation((prev) => (prev + 90) % 360)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-1"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>90°</span>
                </button>
              </div>
            </div>
          </div>

          {/* Canvas Render (8 cols) */}
          <div className="lg:col-span-8 flex flex-col items-center justify-center glass-card rounded-3xl p-6 bg-white border border-slate-200 shadow-sm overflow-hidden">
            <div className="w-full flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                {language === "hi" ? "साफ किया गया स्कैन प्रीव्यू" : "Enhanced Scanned Output"}
              </span>
              <span className="text-[11px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Noise & Shadow Removed
              </span>
            </div>

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
