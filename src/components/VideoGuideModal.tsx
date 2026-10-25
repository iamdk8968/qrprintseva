"use client";

import React, { useState } from "react";
import { X, Play, Youtube, CheckCircle2, ArrowRight } from "lucide-react";

interface VideoGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  youtubeVideoId?: string;
}

export const VideoGuideModal: React.FC<VideoGuideModalProps> = ({
  isOpen,
  onClose,
  youtubeVideoId = "dQw4w9WgXcQ", // Default video placeholder (can be customized)
}) => {
  const [activeVideoId, setActiveVideoId] = useState(youtubeVideoId);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 select-none animate-in fade-in duration-200">
      <div className="w-full max-w-3xl bg-slate-900 rounded-3xl shadow-2xl border border-slate-800 overflow-hidden relative flex flex-col">
        {/* Top Header */}
        <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center text-white shadow">
              <Youtube className="w-5 h-5 fill-white text-rose-600" />
            </div>
            <div>
              <h3 className="font-black text-sm sm:text-base leading-tight">
                How to Setup QR Print Seva in 2 Minutes
              </h3>
              <p className="text-[11px] text-slate-400">
                2 मिनट में अपनी दुकान पर क्यूआर कोड प्रिंटर सेटअप करना सीखें
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Box (16:9 Aspect Ratio) */}
        <div className="relative w-full pb-[56.25%] bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&rel=0`}
            title="QR Print Seva Setup Guide"
            className="absolute inset-0 w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Bottom Steps Summary */}
        <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 text-xs text-slate-300 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex items-start gap-2 bg-slate-900 p-2.5 rounded-xl border border-slate-800">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">
                1
              </span>
              <div>
                <strong className="block text-white text-[11px]">Free Demo बनाएं:</strong>
                <span className="text-[10px] text-slate-400">दुकान का नाम भरें और Shop ID प्राप्त करें।</span>
              </div>
            </div>

            <div className="flex items-start gap-2 bg-slate-900 p-2.5 rounded-xl border border-slate-800">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">
                2
              </span>
              <div>
                <strong className="block text-white text-[11px]">QR स्टैंडी लगाएं:</strong>
                <span className="text-[10px] text-slate-400">काउंटर पर A4 पोस्टर लगाएं।</span>
              </div>
            </div>

            <div className="flex items-start gap-2 bg-slate-900 p-2.5 rounded-xl border border-slate-800">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">
                3
              </span>
              <div>
                <strong className="block text-white text-[11px]">ऑटो-प्रिंट शुरू:</strong>
                <span className="text-[10px] text-slate-400">ग्राहक स्कैन करेगा और सीधे प्रिंट निकलेगा।</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};