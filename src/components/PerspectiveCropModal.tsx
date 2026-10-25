"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Point, warpPerspectiveToCanvas } from "@/lib/perspectiveWarp";
import {
  RotateCw,
  RotateCcw,
  Check,
  X,
  RefreshCw,
  Sliders,
  Crop,
  Sparkles,
  ArrowRight,
} from "lucide-react";

interface PerspectiveCropModalProps {
  imageSrc: string;
  isOpen: boolean;
  onClose: () => void;
  onApply: (warpedDataUrl: string) => void;
  title?: string;
}

export const PerspectiveCropModal: React.FC<PerspectiveCropModalProps> = ({
  imageSrc,
  isOpen,
  onClose,
  onApply,
  title = "Aadhaar Card Perspective & Crop",
}) => {
  // Step 1: Rotate & Straighten | Step 2: Set 4 Corner Pins
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);

  // Rotation baked into image (0, 90, 180, 270)
  const [rotationDegrees, setRotationDegrees] = useState(0);
  const [straightenAngle, setStraightenAngle] = useState(0);

  // 4 corners in normalized coords (0..1): [TL, TR, BR, BL]
  const [corners, setCorners] = useState<[Point, Point, Point, Point]>([
    { x: 0.08, y: 0.1 },
    { x: 0.92, y: 0.1 },
    { x: 0.92, y: 0.9 },
    { x: 0.08, y: 0.9 },
  ]);

  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

  // Canvas holding the straightened & rotated image
  const displayCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Reset corners to default
  const handleReset = () => {
    setCorners([
      { x: 0.08, y: 0.1 },
      { x: 0.92, y: 0.1 },
      { x: 0.92, y: 0.9 },
      { x: 0.08, y: 0.9 },
    ]);
    setStraightenAngle(0);
  };

  // 90 deg clockwise rotation
  const handleRotateCW = () => {
    setRotationDegrees((prev) => (prev + 90) % 360);
  };

  // 90 deg counter-clockwise rotation
  const handleRotateCCW = () => {
    setRotationDegrees((prev) => (prev + 270) % 360);
  };

  // Draw the rotated & straightened image onto display canvas
  const renderDisplayImage = useCallback(() => {
    const canvas = displayCanvasRef.current;
    if (!canvas || !imageSrc) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageSrc;
    img.onload = () => {
      const is90or270 = rotationDegrees === 90 || rotationDegrees === 270;
      const srcW = img.naturalWidth || img.width;
      const srcH = img.naturalHeight || img.height;

      const canvasW = is90or270 ? srcH : srcW;
      const canvasH = is90or270 ? srcW : srcH;

      canvas.width = canvasW;
      canvas.height = canvasH;

      ctx.save();
      ctx.clearRect(0, 0, canvasW, canvasH);
      ctx.translate(canvasW / 2, canvasH / 2);

      const totalAngle = (rotationDegrees + straightenAngle) * (Math.PI / 180);
      ctx.rotate(totalAngle);

      ctx.drawImage(img, -srcW / 2, -srcH / 2, srcW, srcH);
      ctx.restore();
    };
  }, [imageSrc, rotationDegrees, straightenAngle]);

  useEffect(() => {
    if (isOpen) {
      renderDisplayImage();
    }
  }, [isOpen, renderDisplayImage]);

  // Pointer drag events for the 4 corner pins
  const getNormalizedPoint = useCallback((e: React.PointerEvent<HTMLDivElement> | PointerEvent): Point | null => {
    const canvas = displayCanvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX;
    const clientY = e.clientY;

    const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
    return { x, y };
  }, []);

  const handlePointerDown = (index: number, e: React.PointerEvent) => {
    e.stopPropagation();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setDraggingIndex(index);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (draggingIndex === null) return;
    const pt = getNormalizedPoint(e);
    if (!pt) return;

    setCorners((prev) => {
      const next = [...prev] as [Point, Point, Point, Point];
      next[draggingIndex] = pt;
      return next;
    });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (draggingIndex !== null) {
      setDraggingIndex(null);
    }
  };

  // Apply final perspective warp with aspect ratio protection (NO STRETCHING)
  const handleApplyWarp = () => {
    const canvas = displayCanvasRef.current;
    if (!canvas) return;

    // Create an image from the straightened canvas
    const renderedImg = new Image();
    renderedImg.src = canvas.toDataURL("image/jpeg", 0.98);
    renderedImg.onload = () => {
      const targetCanvas = document.createElement("canvas");

      // Calculate quad dimensions to maintain natural Aadhaar ratio without stretching
      const canvasW = canvas.width;
      const canvasH = canvas.height;

      const p0 = { x: corners[0].x * canvasW, y: corners[0].y * canvasH };
      const p1 = { x: corners[1].x * canvasW, y: corners[1].y * canvasH };
      const p2 = { x: corners[2].x * canvasW, y: corners[2].y * canvasH };
      const p3 = { x: corners[3].x * canvasW, y: corners[3].y * canvasH };

      const distTop = Math.hypot(p1.x - p0.x, p1.y - p0.y);
      const distBottom = Math.hypot(p2.x - p3.x, p2.y - p3.y);
      const avgWidth = (distTop + distBottom) / 2;

      const distLeft = Math.hypot(p3.x - p0.x, p3.y - p0.y);
      const distRight = Math.hypot(p2.x - p1.x, p2.y - p1.y);
      const avgHeight = (distLeft + distRight) / 2;

      // Standard Aadhaar / PVC ID card is landscape (85.6mm x 54mm -> ratio ~ 1.585)
      // Check if user selected landscape or portrait orientation
      const isLandscape = avgWidth >= avgHeight;

      let destW = 1027;
      let destH = 648;

      if (!isLandscape) {
        // Portrait Aadhaar crop
        destW = 648;
        destH = 1027;
      }

      warpPerspectiveToCanvas(renderedImg, corners, destW, destH, targetCanvas);
      const finalDataUrl = targetCanvas.toDataURL("image/jpeg", 0.95);
      onApply(finalDataUrl);
      onClose();
    };
  };

  if (!isOpen) return null;

  const canvasElem = displayCanvasRef.current;
  const canvasRect = canvasElem ? canvasElem.getBoundingClientRect() : null;
  const displayW = canvasRect ? canvasRect.width : 400;
  const displayH = canvasRect ? canvasRect.height : 260;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#090b0e] flex flex-col justify-between select-none text-white animate-in fade-in duration-200"
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-[#12161f] border-b border-slate-800 z-20">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
          <div>
            <h3 className="text-sm font-black tracking-wide text-white">
              {title}
            </h3>
            <p className="text-[11px] text-slate-400">
              {currentStep === 1
                ? "चरण 1: आधार को सीधा घुमाएं (Rotate & Straighten)"
                : "चरण 2: आधार के चारों कोनों पर 4 पॉइंट्स सेट करें (Set 4 Corners)"}
            </p>
          </div>
        </div>

        {/* Step indicator pills */}
        <div className="flex items-center gap-2">
          <div className="flex rounded-xl p-1 bg-slate-900 border border-slate-800 text-xs font-bold">
            <button
              onClick={() => setCurrentStep(1)}
              className={`px-3 py-1 rounded-lg transition ${
                currentStep === 1 ? "bg-blue-600 text-white" : "text-slate-400"
              }`}
            >
              1. सीधा करें
            </button>
            <button
              onClick={() => setCurrentStep(2)}
              className={`px-3 py-1 rounded-lg transition ${
                currentStep === 2 ? "bg-blue-600 text-white" : "text-slate-400"
              }`}
            >
              2. कोने सेट करें
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Work Area: Straightened Canvas with 4 Corner Pins (NO BLACK OVERLAY) */}
      <div
        ref={containerRef}
        className="flex-1 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden bg-[#050608]"
      >
        <div className="relative inline-block max-w-full max-h-[62vh]">
          {/* Display Canvas with image actually baked in */}
          <canvas
            ref={displayCanvasRef}
            className="max-h-[62vh] max-w-full w-auto h-auto object-contain rounded-xl shadow-2xl border border-slate-700/80 bg-slate-900"
          />

          {/* STEP 2: 4 DRAGGABLE CORNER PINS (NO BLACK OVERLAY, CLEAN BLUE OUTLINE) */}
          {currentStep === 2 && canvasRect && (
            <>
              {/* Connecting Polygon Outline & Subtle Highlight (NO BLACK OUTSIDE) */}
              <svg
                className="absolute inset-0 pointer-events-none w-full h-full"
                viewBox={`0 0 ${displayW} ${displayH}`}
              >
                {/* Clean light blue transparent selection box */}
                <polygon
                  points={`${corners[0].x * displayW},${corners[0].y * displayH} ${
                    corners[1].x * displayW
                  },${corners[1].y * displayH} ${corners[2].x * displayW},${
                    corners[2].y * displayH
                  } ${corners[3].x * displayW},${corners[3].y * displayH}`}
                  fill="#3b82f6"
                  fillOpacity="0.12"
                  stroke="#38bdf8"
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                  strokeLinejoin="round"
                  className="drop-shadow-lg"
                />
              </svg>

              {/* 4 Draggable Circular Handles */}
              {corners.map((c, idx) => (
                <div
                  key={idx}
                  onPointerDown={(e) => handlePointerDown(idx, e)}
                  style={{
                    left: `${c.x * 100}%`,
                    top: `${c.y * 100}%`,
                  }}
                  className={`absolute w-8 h-8 -ml-4 -mt-4 rounded-full border-4 border-white shadow-2xl cursor-grab active:cursor-grabbing transition-transform touch-none flex items-center justify-center z-30 ${
                    draggingIndex === idx
                      ? "bg-blue-600 scale-125 ring-4 ring-blue-400/50"
                      : "bg-[#0ea5e9] hover:scale-110"
                  }`}
                  title={`Corner ${idx + 1}`}
                >
                  <span className="text-[10px] font-black text-white pointer-events-none">
                    {idx + 1}
                  </span>
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      {/* Bottom Toolbars depending on Step 1 or Step 2 */}
      {currentStep === 1 ? (
        /* STEP 1 CONTROLS: ROTATE & STRAIGHTEN */
        <div className="p-4 bg-[#11141c] border-t border-slate-800 space-y-3 z-20">
          <div className="max-w-md mx-auto flex items-center justify-between gap-3 text-xs">
            {/* Rotate Left 90 */}
            <button
              onClick={handleRotateCCW}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-bold flex items-center gap-1.5 transition"
            >
              <RotateCcw className="w-4 h-4 text-blue-400" />
              <span>90° बाएँ घुमाएँ</span>
            </button>

            {/* Rotate Right 90 */}
            <button
              onClick={handleRotateCW}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-bold flex items-center gap-1.5 transition"
            >
              <RotateCw className="w-4 h-4 text-blue-400" />
              <span>90° दाएँ घुमाएँ</span>
            </button>

            {/* Proceed to Step 2 */}
            <button
              onClick={() => setCurrentStep(2)}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black flex items-center gap-1.5 shadow-lg shadow-blue-500/25 transition"
            >
              <span>अगला: कोने सेट करें</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Fine angle straighten slider */}
          <div className="max-w-md mx-auto flex items-center gap-3 text-xs text-slate-400 pt-1">
            <span className="font-semibold text-slate-300">बारीक सीधा करें:</span>
            <span className="font-mono text-blue-400 font-bold w-12 text-center">
              {straightenAngle > 0 ? `+${straightenAngle}°` : `${straightenAngle}°`}
            </span>
            <input
              type="range"
              min="-20"
              max="20"
              step="0.5"
              value={straightenAngle}
              onChange={(e) => setStraightenAngle(Number(e.target.value))}
              className="w-full accent-blue-500"
            />
            <button
              onClick={() => setStraightenAngle(0)}
              className="text-[10px] text-slate-500 hover:text-white underline"
            >
              0° रीसेट
            </button>
          </div>
        </div>
      ) : (
        /* STEP 2 CONTROLS: 4 CORNER PINS & APPLY (NO BLACK OVERLAY) */
        <div className="p-4 bg-[#11141c] border-t border-slate-800 z-20">
          <div className="max-w-lg mx-auto flex items-center justify-between gap-4">
            {/* Back to Step 1 */}
            <button
              onClick={() => setCurrentStep(1)}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-xs font-bold transition"
            >
              ← वापस घुमाएँ
            </button>

            {/* Reset corners */}
            <button
              onClick={handleReset}
              className="px-4 py-2.5 rounded-xl text-slate-400 hover:text-white text-xs font-bold hover:bg-slate-900 transition"
            >
              कोने रीसेट (Reset)
            </button>

            {/* Apply & Finish Crop without stretching */}
            <button
              onClick={handleApplyWarp}
              className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/25 active:scale-95 transition-all"
            >
              <Check className="w-5 h-5 stroke-[3]" />
              <span>क्रॉप पूरा करें (Done)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
