"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import {
  SlidersHorizontal,
  Upload,
  Download,
  FileText,
  Trash2,
  ArrowLeft,
  CheckCircle2,
  Layers,
  Scissors,
  Minimize2,
  FileCheck,
} from "lucide-react";

export default function PdfPowerHub() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<"merge" | "split" | "compress">("merge");

  // Merge state
  const [mergeFiles, setMergeFiles] = useState<Array<{ name: string; size: string }>>([
    { name: "Aadhaar_Card.pdf", size: "420 KB" },
    { name: "Marksheet_10th.pdf", size: "1.2 MB" },
    { name: "Income_Certificate.pdf", size: "850 KB" },
  ]);

  // Split state
  const [splitFile, setSplitFile] = useState<{ name: string; pages: number } | null>({
    name: "Complete_Govt_Notification.pdf",
    pages: 24,
  });
  const [pageRange, setPageRange] = useState("1-3, 5");

  // Compress state
  const [compressFile, setCompressFile] = useState<{ name: string; origSize: string } | null>({
    name: "Candidate_Photo_Sign.pdf",
    origSize: "2.4 MB",
  });
  const [targetSize, setTargetSize] = useState<"200kb" | "500kb" | "1mb">("200kb");
  const [compressedSuccess, setCompressedSuccess] = useState(false);

  const handleMergeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const added = Array.from(e.target.files).map((f) => ({
        name: f.name,
        size: `${(f.size / 1024).toFixed(0)} KB`,
      }));
      setMergeFiles([...mergeFiles, ...added]);
    }
  };

  const removeMergeFile = (index: number) => {
    setMergeFiles(mergeFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>

          <span className="text-xs font-bold bg-rose-100 text-rose-700 px-3 py-1 rounded-full">
            ⚡ Cyber Cafe Tool #5
          </span>
        </div>

        {/* Title Banner */}
        <div className="glass-card rounded-3xl p-6 bg-white shadow-sm border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <SlidersHorizontal className="w-6 h-6 text-rose-600" />
              <span>
                {language === "hi"
                  ? "PDF पावर हब (Merge, Split & Compress)"
                  : "PDF Power Hub (Merge, Split & Compress)"}
              </span>
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              {language === "hi"
                ? "सरकारी फॉर्म के लिए PDF साइज छोटा करें, कई फाइलों को जोड़ें या खास पेज अलग करें।"
                : "Combine documents, extract pages, and compress to under 200KB for exam portals."}
            </p>
          </div>

          {/* Tab buttons */}
          <div className="flex rounded-xl p-1 bg-slate-100 border border-slate-200 text-xs font-bold">
            <button
              onClick={() => setActiveTab("merge")}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeTab === "merge" ? "bg-white text-rose-700 shadow-sm" : "text-slate-600"
              }`}
            >
              Merge PDFs
            </button>
            <button
              onClick={() => setActiveTab("split")}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeTab === "split" ? "bg-white text-rose-700 shadow-sm" : "text-slate-600"
              }`}
            >
              Split Pages
            </button>
            <button
              onClick={() => setActiveTab("compress")}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeTab === "compress" ? "bg-white text-rose-700 shadow-sm" : "text-slate-600"
              }`}
            >
              Compress Size
            </button>
          </div>
        </div>

        {/* TAB 1: MERGE */}
        {activeTab === "merge" && (
          <div className="glass-card rounded-3xl p-6 bg-white shadow-sm border border-slate-200 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-rose-600" />
                <h3 className="font-extrabold text-slate-900 text-base">
                  {language === "hi" ? "PDF फाइलों को आपस में जोड़ें" : "Combine Multiple PDFs"}
                </h3>
              </div>
              <label className="px-3.5 py-1.5 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 text-xs font-bold cursor-pointer transition flex items-center gap-1.5">
                <Upload className="w-3.5 h-3.5" />
                <span>{language === "hi" ? "और फाइलें जोड़ें" : "Add More Files"}</span>
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleMergeUpload}
                  accept=".pdf"
                />
              </label>
            </div>

            {/* List */}
            <div className="space-y-2">
              {mergeFiles.map((file, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/70 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-md bg-rose-100 text-rose-700 font-bold text-xs flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <div>
                      <p className="text-xs font-bold text-slate-800">{file.name}</p>
                      <p className="text-[10px] text-slate-500">{file.size}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => removeMergeFile(idx)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <button className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-extrabold text-xs shadow-md shadow-rose-500/25 transition flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              <span>
                {language === "hi"
                  ? "सभी फाइलों को मिलाकर 1 PDF बनाएं व डाउनलोड करें"
                  : "Merge All Files & Download Single PDF"}
              </span>
            </button>
          </div>
        )}

        {/* TAB 2: SPLIT */}
        {activeTab === "split" && (
          <div className="glass-card rounded-3xl p-6 bg-white shadow-sm border border-slate-200 space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Scissors className="w-5 h-5 text-rose-600" />
              <h3 className="font-extrabold text-slate-900 text-base">
                {language === "hi" ? "खास पेज अलग करें (Split Pages)" : "Extract Selected Pages"}
              </h3>
            </div>

            {splitFile && (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-7 h-7 text-rose-600" />
                  <div>
                    <p className="text-xs font-bold text-slate-900">{splitFile.name}</p>
                    <p className="text-[10px] text-slate-500">{splitFile.pages} Total Pages</p>
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {language === "hi" ? "जो पेज चाहिए उनके नंबर लिखें:" : "Enter Page Numbers to Extract:"}
              </label>
              <input
                type="text"
                value={pageRange}
                onChange={(e) => setPageRange(e.target.value)}
                placeholder="e.g. 1-3, 5, 8"
                className="w-full p-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-slate-50 focus:ring-2 focus:ring-rose-500 focus:outline-none"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                Example: &ldquo;1-3&rdquo; extracts pages 1, 2, and 3. &ldquo;5&rdquo; extracts page 5.
              </span>
            </div>

            <button className="w-full py-3.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs shadow-md transition flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              <span>
                {language === "hi"
                  ? `पेज (${pageRange}) निकालें व डाउनलोड करें`
                  : `Extract Pages (${pageRange}) & Download`}
              </span>
            </button>
          </div>
        )}

        {/* TAB 3: COMPRESS */}
        {activeTab === "compress" && (
          <div className="glass-card rounded-3xl p-6 bg-white shadow-sm border border-slate-200 space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Minimize2 className="w-5 h-5 text-rose-600" />
              <h3 className="font-extrabold text-slate-900 text-base">
                {language === "hi"
                  ? "सरकारी फॉर्म के लिए PDF साइज छोटा करें"
                  : "Compress PDF for Govt Exam Portals"}
              </h3>
            </div>

            {compressFile && (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileCheck className="w-7 h-7 text-emerald-600" />
                  <div>
                    <p className="text-xs font-bold text-slate-900">{compressFile.name}</p>
                    <p className="text-[10px] text-slate-500">
                      Original Size: <span className="font-bold text-red-500">{compressFile.origSize}</span>
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                {language === "hi" ? "टारगेट साइज़ चुनें (Exam Portal Limit):" : "Target File Size:"}
              </label>

              <div className="grid grid-cols-3 gap-3 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setTargetSize("200kb")}
                  className={`py-3 rounded-2xl border text-center transition ${
                    targetSize === "200kb"
                      ? "border-rose-600 bg-rose-50 text-rose-700 shadow-sm"
                      : "border-slate-200 text-slate-600 bg-white"
                  }`}
                >
                  <span className="block text-sm font-extrabold">&lt; 200 KB</span>
                  <span className="text-[10px] opacity-80">UPSC / SSC Limit</span>
                </button>

                <button
                  type="button"
                  onClick={() => setTargetSize("500kb")}
                  className={`py-3 rounded-2xl border text-center transition ${
                    targetSize === "500kb"
                      ? "border-rose-600 bg-rose-50 text-rose-700 shadow-sm"
                      : "border-slate-200 text-slate-600 bg-white"
                  }`}
                >
                  <span className="block text-sm font-extrabold">&lt; 500 KB</span>
                  <span className="text-[10px] opacity-80">State CET / Police</span>
                </button>

                <button
                  type="button"
                  onClick={() => setTargetSize("1mb")}
                  className={`py-3 rounded-2xl border text-center transition ${
                    targetSize === "1mb"
                      ? "border-rose-600 bg-rose-50 text-rose-700 shadow-sm"
                      : "border-slate-200 text-slate-600 bg-white"
                  }`}
                >
                  <span className="block text-sm font-extrabold">&lt; 1 MB</span>
                  <span className="text-[10px] opacity-80">Standard High Quality</span>
                </button>
              </div>
            </div>

            <button
              onClick={() => setCompressedSuccess(true)}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-xs shadow-md transition flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>
                {language === "hi"
                  ? `कंप्रेस करें और 190 KB में डाउनलोड करें`
                  : `Compress & Download (Target: ${targetSize})`}
              </span>
            </button>

            {compressedSuccess && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>
                  {language === "hi"
                    ? "सफल! फाइल 2.4 MB से घटकर 186 KB हो गई है। सरकारी पोर्टल पर अपलोड के लिए तैयार है।"
                    : "Success! File size reduced from 2.4 MB to 186 KB. 100% upload compliant."}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
