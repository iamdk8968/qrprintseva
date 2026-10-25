"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import {
  ShieldCheck,
  Upload,
  Download,
  Scissors,
  ArrowLeft,
  Sliders,
  CheckCircle2,
  RefreshCw,
  Printer,
  RotateCw,
  Crop,
  Compass,
  Maximize2,
  Sparkles,
} from "lucide-react";
import { PerspectiveCropModal } from "@/components/PerspectiveCropModal";

export default function AadhaarSmartIdCrop() {
  const { language } = useLanguage();
  const [frontImage, setFrontImage] = useState<string | null>(null);
  const [backImage, setBackImage] = useState<string | null>(null);
  const [layoutMode, setLayoutMode] = useState<"side-by-side" | "stacked">("side-by-side");
  const [contrast, setContrast] = useState(120); // %
  const [brightness, setBrightness] = useState(105); // %
  const [showBorder, setShowBorder] = useState(true);

  // Advanced Crop & Perspective Deskew Controls
  const [activeTab, setActiveTab] = useState<"front" | "back">("front");
  const [frontCropInset, setFrontCropInset] = useState(0); // 0% to 25% cut from outer edges
  const [backCropInset, setBackCropInset] = useState(0);
  const [frontRotate, setFrontRotate] = useState(0); // -45 to +45 deg
  const [backRotate, setBackRotate] = useState(0);
  const [frontSkew, setFrontSkew] = useState(0); // perspective slant
  const [backSkew, setBackSkew] = useState(0);

  // 4-Point Perspective Editor Modal State (from User Screenshot)
  const [perspectiveModalOpen, setPerspectiveModalOpen] = useState(false);
  const [modalTarget, setModalTarget] = useState<"front" | "back">("front");

  const openPerspectiveEditor = (side: "front" | "back") => {
    setModalTarget(side);
    setPerspectiveModalOpen(true);
  };

  const handlePerspectiveWarpDone = (warpedDataUrl: string) => {
    if (modalTarget === "front") {
      setFrontImage(warpedDataUrl);
      setFrontCropInset(0);
      setFrontRotate(0);
      setFrontSkew(0);
    } else {
      setBackImage(warpedDataUrl);
      setBackCropInset(0);
      setBackRotate(0);
      setBackSkew(0);
    }
  };

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleFrontUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) setFrontImage(ev.target.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleBackUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) setBackImage(ev.target.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = 1200;
    const height = 800;
    canvas.width = width;
    canvas.height = height;

    // Fill clean white background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    if (!frontImage && !backImage) {
      ctx.fillStyle = "#f8fafc";
      ctx.fillRect(40, 40, width - 80, height - 80);
      ctx.fillStyle = "#64748b";
      ctx.font = "bold 26px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(
        language === "hi"
          ? "कृपया आधार या ID कार्ड का अगला (Front) व पिछला (Back) भाग अपलोड करें"
          : "Please upload Front & Back sides of your ID Card",
        width / 2,
        height / 2
      );
      return;
    }

    // Apply contrast / brightness filters
    ctx.filter = `contrast(${contrast}%) brightness(${brightness}%)`;

    // Standard PVC Card ratio (85.6mm x 54mm -> approx 1.585:1)
    const cardWidth = 480;
    const cardHeight = 302;

    const drawCardWithTransform = (
      src: string,
      x: number,
      y: number,
      label: string,
      cropInset: number,
      rotationDeg: number,
      skewVal: number
    ) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = src;
      img.onload = () => {
        ctx.save();

        // Calculate source crop dimensions
        const insetFactor = cropInset / 100;
        const sx = img.width * insetFactor;
        const sy = img.height * insetFactor;
        const sw = img.width * (1 - insetFactor * 2);
        const sh = img.height * (1 - insetFactor * 2);

        // Center point for rotation & perspective
        const centerX = x + cardWidth / 2;
        const centerY = y + cardHeight / 2;

        ctx.translate(centerX, centerY);

        // Rotation deskew
        if (rotationDeg !== 0) {
          ctx.rotate((rotationDeg * Math.PI) / 180);
        }

        // Perspective / Skew warp
        if (skewVal !== 0) {
          const rad = (skewVal * Math.PI) / 180;
          ctx.transform(1, 0, Math.tan(rad), 1, 0, 0);
        }

        // Clip rounded rectangle for PVC Card
        ctx.beginPath();
        const rx = -cardWidth / 2;
        const ry = -cardHeight / 2;
        const radius = 12;
        ctx.roundRect(rx, ry, cardWidth, cardHeight, radius);
        ctx.clip();

        // Draw image
        ctx.drawImage(img, sx, sy, sw, sh, rx, ry, cardWidth, cardHeight);

        // Border / Guidelines
        if (showBorder) {
          ctx.strokeStyle = "#94a3b8";
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        ctx.restore();

        // Draw label outside transform
        ctx.fillStyle = "#475569";
        ctx.font = "bold 15px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(label, x + cardWidth / 2, y + cardHeight + 26);
      };
    };

    if (layoutMode === "side-by-side") {
      const gap = 50;
      const startX = (width - (cardWidth * 2 + gap)) / 2;
      const startY = (height - cardHeight) / 2;

      if (frontImage) {
        drawCardWithTransform(
          frontImage,
          startX,
          startY,
          language === "hi" ? "आगे का भाग (FRONT)" : "FRONT SIDE",
          frontCropInset,
          frontRotate,
          frontSkew
        );
      }
      if (backImage) {
        drawCardWithTransform(
          backImage,
          startX + cardWidth + gap,
          startY,
          language === "hi" ? "पीछे का भाग (BACK)" : "BACK SIDE",
          backCropInset,
          backRotate,
          backSkew
        );
      }
    } else {
      // Stacked
      const gap = 36;
      const startX = (width - cardWidth) / 2;
      const startY = (height - (cardHeight * 2 + gap)) / 2;

      if (frontImage) {
        drawCardWithTransform(
          frontImage,
          startX,
          startY,
          language === "hi" ? "आगे (FRONT)" : "FRONT SIDE",
          frontCropInset,
          frontRotate,
          frontSkew
        );
      }
      if (backImage) {
        drawCardWithTransform(
          backImage,
          startX,
          startY + cardHeight + gap,
          language === "hi" ? "पीछे (BACK)" : "BACK SIDE",
          backCropInset,
          backRotate,
          backSkew
        );
      }
    }
  }, [
    frontImage,
    backImage,
    contrast,
    brightness,
    layoutMode,
    showBorder,
    frontCropInset,
    backCropInset,
    frontRotate,
    backRotate,
    frontSkew,
    backSkew,
    language,
  ]);

  useEffect(() => {
    renderCanvas();
  }, [renderCanvas]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `Aadhaar_Deskewed_PVC_Print.jpg`;
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
            <span>{language === "hi" ? "मुख्य पृष्ठ" : "Home"}</span>
          </Link>

          <span className="text-xs font-bold bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
            ⚡ {language === "hi" ? "आधार व ID स्मार्ट टूल" : "Aadhaar & Smart ID Tool"}
          </span>
        </div>

        {/* Title Banner */}
        <div className="glass-card rounded-3xl p-6 bg-white shadow-sm border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-blue-600" />
              <span>
                {language === "hi"
                  ? "आधार व स्मार्ट ID कार्ड 2-इन-1 ऑटो क्रॉप व पर्स्पेक्टिव टूल"
                  : "Aadhaar 2-in-1 Smart Crop & Perspective Deskew Tool"}
              </span>
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              {language === "hi"
                ? "अतिरिक्त बैकग्राउंड काटें, टेढ़े खींचे गए फोटो को सीधा (Deskew) करें और एक ही PVC/A4 शीट पर प्रिंट निकालें।"
                : "Crop unwanted backgrounds, correct crooked camera angles (Deskew), and print perfectly on PVC or A4."}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              disabled={!frontImage && !backImage}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/25 transition flex items-center gap-2 disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>{language === "hi" ? "प्रिंट शीट डाउनलोड करें" : "Download Sheet"}</span>
            </button>
          </div>
        </div>

        {/* Work Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls Sidebar (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* 1. Upload Front & Back */}
            <div className="glass-card rounded-2xl p-5 bg-white border border-slate-200 space-y-3">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                1. {language === "hi" ? "दोनों तरफ की फोटो अपलोड करें:" : "Upload Card Photos:"}
              </label>

              <div className="grid grid-cols-2 gap-2">
                {/* Front Upload */}
                <div className="space-y-1.5">
                  <label className="border-2 border-dashed border-blue-200 hover:border-blue-500 rounded-xl p-3 flex flex-col items-center justify-center text-center cursor-pointer bg-blue-50/30 hover:bg-blue-50/60 transition">
                    <Upload className="w-5 h-5 text-blue-600 mb-1" />
                    <span className="text-[11px] font-bold text-slate-800">
                      {frontImage
                        ? language === "hi"
                          ? "आगे (अपलोड हुआ ✓)"
                          : "Front Uploaded ✓"
                        : language === "hi"
                        ? "आगे का भाग"
                        : "Front Side"}
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFrontUpload}
                      accept="image/*"
                    />
                  </label>
                  {frontImage && (
                    <button
                      type="button"
                      onClick={() => openPerspectiveEditor("front")}
                      className="w-full py-1.5 px-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-bold flex items-center justify-center gap-1 shadow-sm"
                    >
                      <Maximize2 className="w-3 h-3 text-rose-400" />
                      <span>{language === "hi" ? "4-पॉइंट क्रॉप" : "4-Point Crop"}</span>
                    </button>
                  )}
                </div>

                {/* Back Upload */}
                <div className="space-y-1.5">
                  <label className="border-2 border-dashed border-indigo-200 hover:border-indigo-500 rounded-xl p-3 flex flex-col items-center justify-center text-center cursor-pointer bg-indigo-50/30 hover:bg-indigo-50/60 transition">
                    <Upload className="w-5 h-5 text-indigo-600 mb-1" />
                    <span className="text-[11px] font-bold text-slate-800">
                      {backImage
                        ? language === "hi"
                          ? "पीछे (अपलोड हुआ ✓)"
                          : "Back Uploaded ✓"
                        : language === "hi"
                        ? "पीछे का भाग"
                        : "Back Side"}
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleBackUpload}
                      accept="image/*"
                    />
                  </label>
                  {backImage && (
                    <button
                      type="button"
                      onClick={() => openPerspectiveEditor("back")}
                      className="w-full py-1.5 px-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-bold flex items-center justify-center gap-1 shadow-sm"
                    >
                      <Maximize2 className="w-3 h-3 text-rose-400" />
                      <span>{language === "hi" ? "4-पॉइंट क्रॉप" : "4-Point Crop"}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* 2. ADVANCED CROP & PERSPECTIVE DESKEW CONTROLS */}
            <div className="glass-card rounded-2xl p-5 bg-white border border-slate-200 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Crop className="w-4 h-4 text-blue-600" />
                  <span>
                    2. {language === "hi" ? "बैकग्राउंड क्रॉप व सीधा करें (Deskew):" : "Crop & Perspective Deskew:"}
                  </span>
                </span>

                {/* Side Selector */}
                <div className="flex rounded-lg p-0.5 bg-slate-100 text-[10px] font-bold">
                  <button
                    onClick={() => setActiveTab("front")}
                    className={`px-2.5 py-1 rounded transition ${
                      activeTab === "front" ? "bg-white text-blue-700 shadow-sm" : "text-slate-500"
                    }`}
                  >
                    Front
                  </button>
                  <button
                    onClick={() => setActiveTab("back")}
                    className={`px-2.5 py-1 rounded transition ${
                      activeTab === "back" ? "bg-white text-blue-700 shadow-sm" : "text-slate-500"
                    }`}
                  >
                    Back
                  </button>
                </div>
              </div>

              {activeTab === "front" ? (
                <div className="space-y-3.5 text-xs">
                  {/* Front Background Crop Inset */}
                  <div>
                    <div className="flex justify-between text-slate-600 mb-1">
                      <span>{language === "hi" ? "अतिरिक्त बैकग्राउंड काटें (Crop Out Margin):" : "Trim Background Noise:"}</span>
                      <span className="font-bold text-blue-700">{frontCropInset}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="22"
                      value={frontCropInset}
                      onChange={(e) => setFrontCropInset(Number(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex gap-2 mt-1">
                      <button
                        onClick={() => setFrontCropInset(0)}
                        className="text-[10px] px-2 py-0.5 bg-slate-100 rounded text-slate-600 hover:bg-slate-200"
                      >
                        {language === "hi" ? "मूल साइज़ (0%)" : "Original (0%)"}
                      </button>
                      <button
                        onClick={() => setFrontCropInset(8)}
                        className="text-[10px] px-2 py-0.5 bg-blue-50 text-blue-700 rounded font-bold"
                      >
                        {language === "hi" ? "हल्का ट्रिम (8%)" : "Auto-Trim (8%)"}
                      </button>
                      <button
                        onClick={() => setFrontCropInset(15)}
                        className="text-[10px] px-2 py-0.5 bg-blue-50 text-blue-700 rounded font-bold"
                      >
                        {language === "hi" ? "गहरा ट्रिम (15%)" : "Deep Trim (15%)"}
                      </button>
                    </div>
                  </div>

                  {/* Front Angle Deskew */}
                  <div>
                    <div className="flex justify-between text-slate-600 mb-1">
                      <span>{language === "hi" ? "टेढ़ा कोण सीधा करें (Rotate Deskew):" : "Rotate Angle (Deskew):"}</span>
                      <span className="font-bold text-blue-700">{frontRotate}°</span>
                    </div>
                    <input
                      type="range"
                      min="-30"
                      max="30"
                      value={frontRotate}
                      onChange={(e) => setFrontRotate(Number(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between items-center mt-1">
                      <button
                        onClick={() => setFrontRotate(0)}
                        className="text-[10px] text-slate-500 hover:text-blue-600 underline"
                      >
                        {language === "hi" ? "रीसेट (0°)" : "Reset to 0°"}
                      </button>
                      <button
                        onClick={() => setFrontRotate((prev) => (prev + 90) % 360)}
                        className="text-[10px] px-2 py-0.5 bg-slate-100 rounded font-bold text-slate-700 hover:bg-slate-200 flex items-center gap-1"
                      >
                        <RotateCw className="w-3 h-3" />
                        <span>90°</span>
                      </button>
                    </div>
                  </div>

                  {/* Front Perspective Slant */}
                  <div>
                    <div className="flex justify-between text-slate-600 mb-1">
                      <span>{language === "hi" ? "पर्स्पेक्टिव झुकाव (Perspective Tilt):" : "Perspective Tilt:"}</span>
                      <span className="font-bold text-blue-700">{frontSkew}°</span>
                    </div>
                    <input
                      type="range"
                      min="-15"
                      max="15"
                      value={frontSkew}
                      onChange={(e) => setFrontSkew(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-3.5 text-xs">
                  {/* Back Background Crop Inset */}
                  <div>
                    <div className="flex justify-between text-slate-600 mb-1">
                      <span>{language === "hi" ? "पीछे का बैकग्राउंड काटें:" : "Back Side Trim:"}</span>
                      <span className="font-bold text-blue-700">{backCropInset}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="22"
                      value={backCropInset}
                      onChange={(e) => setBackCropInset(Number(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex gap-2 mt-1">
                      <button
                        onClick={() => setBackCropInset(0)}
                        className="text-[10px] px-2 py-0.5 bg-slate-100 rounded text-slate-600"
                      >
                        {language === "hi" ? "मूल साइज़" : "Original"}
                      </button>
                      <button
                        onClick={() => setBackCropInset(8)}
                        className="text-[10px] px-2 py-0.5 bg-blue-50 text-blue-700 rounded font-bold"
                      >
                        {language === "hi" ? "हल्का ट्रिम (8%)" : "Auto-Trim (8%)"}
                      </button>
                      <button
                        onClick={() => setBackCropInset(15)}
                        className="text-[10px] px-2 py-0.5 bg-blue-50 text-blue-700 rounded font-bold"
                      >
                        {language === "hi" ? "गहरा ट्रिम (15%)" : "Deep Trim (15%)"}
                      </button>
                    </div>
                  </div>

                  {/* Back Angle Deskew */}
                  <div>
                    <div className="flex justify-between text-slate-600 mb-1">
                      <span>{language === "hi" ? "पीछे का कोण सीधा करें:" : "Back Angle Deskew:"}</span>
                      <span className="font-bold text-blue-700">{backRotate}°</span>
                    </div>
                    <input
                      type="range"
                      min="-30"
                      max="30"
                      value={backRotate}
                      onChange={(e) => setBackRotate(Number(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between items-center mt-1">
                      <button
                        onClick={() => setBackRotate(0)}
                        className="text-[10px] text-slate-500 hover:text-blue-600 underline"
                      >
                        {language === "hi" ? "रीसेट (0°)" : "Reset"}
                      </button>
                      <button
                        onClick={() => setBackRotate((prev) => (prev + 90) % 360)}
                        className="text-[10px] px-2 py-0.5 bg-slate-100 rounded font-bold text-slate-700 flex items-center gap-1"
                      >
                        <RotateCw className="w-3 h-3" />
                        <span>90°</span>
                      </button>
                    </div>
                  </div>

                  {/* Back Perspective Tilt */}
                  <div>
                    <div className="flex justify-between text-slate-600 mb-1">
                      <span>{language === "hi" ? "पर्स्पेक्टिव झुकाव:" : "Perspective Tilt:"}</span>
                      <span className="font-bold text-blue-700">{backSkew}°</span>
                    </div>
                    <input
                      type="range"
                      min="-15"
                      max="15"
                      value={backSkew}
                      onChange={(e) => setBackSkew(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* 3. Layout & Xerox Clarity */}
            <div className="glass-card rounded-2xl p-5 bg-white border border-slate-200 space-y-3">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                3. {language === "hi" ? "लेआउट व ज़ेरॉक्स क्लैरिटी:" : "Layout & Clarity Booster:"}
              </label>

              <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setLayoutMode("side-by-side")}
                  className={`py-2 rounded-xl border text-center transition ${
                    layoutMode === "side-by-side"
                      ? "border-blue-600 bg-blue-50 text-blue-700"
                      : "border-slate-200 text-slate-600 bg-white"
                  }`}
                >
                  {language === "hi" ? "साइड-बाय-साइड (बराबर)" : "Side-by-Side"}
                </button>
                <button
                  type="button"
                  onClick={() => setLayoutMode("stacked")}
                  className={`py-2 rounded-xl border text-center transition ${
                    layoutMode === "stacked"
                      ? "border-blue-600 bg-blue-50 text-blue-700"
                      : "border-slate-200 text-slate-600 bg-white"
                  }`}
                >
                  {language === "hi" ? "ऊपर-नीचे (Stacked)" : "Top & Bottom"}
                </button>
              </div>

              {/* Contrast */}
              <div className="pt-2">
                <div className="flex justify-between text-xs text-slate-600 mb-1">
                  <span>{language === "hi" ? "डार्कनेस (Contrast Boost):" : "Contrast Boost:"}</span>
                  <span className="font-bold">{contrast}%</span>
                </div>
                <input
                  type="range"
                  min="80"
                  max="160"
                  value={contrast}
                  onChange={(e) => setContrast(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Border checkbox */}
              <div className="pt-1 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                  <Scissors className="w-3.5 h-3.5 text-slate-500" />
                  <span>{language === "hi" ? "PVC कट-लाइन्स दिखाएं:" : "Show PVC Cut Borders:"}</span>
                </span>
                <input
                  type="checkbox"
                  checked={showBorder}
                  onChange={(e) => setShowBorder(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
              </div>
            </div>
          </div>

          {/* Canvas Preview Area (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center glass-card rounded-3xl p-6 bg-white border border-slate-200 shadow-sm overflow-hidden">
            <div className="w-full flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-blue-600" />
                <span>
                  {language === "hi" ? "प्रिंट-रेडी शीट प्रीव्यू (A4 / PVC)" : "Print-Ready Sheet Preview"}
                </span>
              </span>
              <span className="text-[11px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                85.6mm × 54mm Standard PVC
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

      {/* 4-Point Perspective Modal matching User Screenshot */}
      {perspectiveModalOpen && (
        <PerspectiveCropModal
          imageSrc={(modalTarget === "front" ? frontImage : backImage) || ""}
          isOpen={perspectiveModalOpen}
          onClose={() => setPerspectiveModalOpen(false)}
          onApply={handlePerspectiveWarpDone}
          title={
            modalTarget === "front"
              ? language === "hi"
                ? "आगे का भाग: 4-पॉइंट पर्स्पेक्टिव व क्रॉप (Aadhaar Front)"
                : "Front Side: 4-Point Perspective Crop & Deskew"
              : language === "hi"
              ? "पीछे का भाग: 4-पॉइंट पर्स्पेक्टिव व क्रॉप (Aadhaar Back)"
              : "Back Side: 4-Point Perspective Crop & Deskew"
          }
        />
      )}
    </div>
  );
}
