"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import {
  FileText,
  Heart,
  Printer,
  Download,
  ArrowLeft,
  Sparkles,
  User,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  GraduationCap,
  Palette,
  Check,
} from "lucide-react";

export default function ResumeBioDataBuilder() {
  const { language } = useLanguage();
  const [mode, setMode] = useState<"biodata" | "resume">("biodata");

  // Template styles
  const [bioTemplate, setBioTemplate] = useState<"royal-gold" | "rose-floral" | "classic-minimal">("royal-gold");
  const [resumeTemplate, setResumeTemplate] = useState<"modern-tech" | "classic-corporate" | "minimal">("modern-tech");

  // Form Fields
  const [formData, setFormData] = useState({
    name: "रोहित शर्मा (Rohit Sharma)",
    dob: "15-08-1998",
    time: "06:45 AM",
    birthPlace: "जयपुर, राजस्थान",
    height: "5'9\"",
    complexion: "Fair (गोरा)",
    education: "B.Tech (Computer Science), Rajasthan University",
    occupation: "Senior Software Engineer @ MNC, Gurugram",
    income: "₹12,00,000 per annum",
    fatherName: "श्री रमेश शर्मा (व्यापारी)",
    motherName: "श्रीमती सुनीता शर्मा (गृहणी)",
    brothers: "1 छोटा भाई (विद्यार्थी)",
    sisters: "1 बड़ी बहन (विवाहित)",
    gotra: "कौशिक (Kaushik)",
    contactPhone: "+91 98765 43210",
    email: "rohit.sharma@example.com",
    address: "मकान नं. 45, गांधी नगर, जयपुर, राजस्थान",
    skills: "React, Next.js, TypeScript, SQL, Cloud Architecture",
    experience: "3+ Years as Full Stack Developer delivering scalable web applications.",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top Header */}
        <div className="flex items-center justify-between print:hidden">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{language === "hi" ? "मुख्य पृष्ठ" : "Home"}</span>
          </Link>

          <span className="text-xs font-bold bg-pink-100 text-pink-700 px-3 py-1 rounded-full">
            ⚡ {language === "hi" ? "मल्टी-टेम्पलेट स्टूडियो" : "Multi-Template Studio"}
          </span>
        </div>

        {/* Title Banner */}
        <div className="glass-card rounded-3xl p-6 bg-white shadow-sm border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <FileText className="w-6 h-6 text-pink-600" />
              <span>
                {language === "hi"
                  ? "शादी बायो-डाटा व जॉब रिज्यूम मेकर"
                  : "Marriage Bio-Data & Job Resume Studio"}
              </span>
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              {language === "hi"
                ? "मनपसंद डिज़ाइन और टेम्पलेट चुनें, जानकारी भरें और तुरंत प्रिंट निकालें।"
                : "Choose your favorite template design, fill details, and export print-ready PDF."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Mode Switcher */}
            <div className="flex rounded-xl p-1 bg-slate-100 border border-slate-200 text-xs font-bold">
              <button
                type="button"
                onClick={() => setMode("biodata")}
                className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                  mode === "biodata"
                    ? "bg-white text-pink-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Heart className="w-3.5 h-3.5 text-pink-600" />
                <span>{language === "hi" ? "शादी बायो-डाटा" : "Marriage Bio-Data"}</span>
              </button>

              <button
                type="button"
                onClick={() => setMode("resume")}
                className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                  mode === "resume"
                    ? "bg-white text-blue-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                <span>{language === "hi" ? "जॉब रिज्यूम" : "Job Resume"}</span>
              </button>
            </div>

            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4" />
              <span>{language === "hi" ? "प्रिंट निकालें" : "Print PDF"}</span>
            </button>
          </div>
        </div>

        {/* Template Selector Bar (Print Hidden) */}
        <div className="glass-card rounded-2xl p-4 bg-white border border-slate-200 print:hidden flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-purple-600" />
            <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
              {language === "hi" ? "डिज़ाइन टेम्पलेट चुनें:" : "Choose Design Template:"}
            </span>
          </div>

          {mode === "biodata" ? (
            <div className="flex flex-wrap gap-2 text-xs font-bold">
              <button
                onClick={() => setBioTemplate("royal-gold")}
                className={`px-3 py-1.5 rounded-xl border transition ${
                  bioTemplate === "royal-gold"
                    ? "bg-amber-50 border-amber-500 text-amber-900 shadow-sm"
                    : "border-slate-200 text-slate-600 bg-white"
                }`}
              >
                {language === "hi" ? "👑 शाही वैदिक गोल्ड (Royal Gold)" : "👑 Royal Vedic Gold"}
              </button>

              <button
                onClick={() => setBioTemplate("rose-floral")}
                className={`px-3 py-1.5 rounded-xl border transition ${
                  bioTemplate === "rose-floral"
                    ? "bg-pink-50 border-pink-500 text-pink-900 shadow-sm"
                    : "border-slate-200 text-slate-600 bg-white"
                }`}
              >
                {language === "hi" ? "🌸 आधुनिक रोज़ फ्लोरल (Rose Floral)" : "🌸 Modern Rose Floral"}
              </button>

              <button
                onClick={() => setBioTemplate("classic-minimal")}
                className={`px-3 py-1.5 rounded-xl border transition ${
                  bioTemplate === "classic-minimal"
                    ? "bg-slate-100 border-slate-600 text-slate-900 shadow-sm"
                    : "border-slate-200 text-slate-600 bg-white"
                }`}
              >
                {language === "hi" ? "📄 क्लीन क्लासिक (Minimal)" : "📄 Clean Classic"}
              </button>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2 text-xs font-bold">
              <button
                onClick={() => setResumeTemplate("modern-tech")}
                className={`px-3 py-1.5 rounded-xl border transition ${
                  resumeTemplate === "modern-tech"
                    ? "bg-blue-50 border-blue-600 text-blue-900 shadow-sm"
                    : "border-slate-200 text-slate-600 bg-white"
                }`}
              >
                {language === "hi" ? "💻 2-कॉलम मॉडर्न टेक" : "💻 2-Column Modern Tech"}
              </button>

              <button
                onClick={() => setResumeTemplate("classic-corporate")}
                className={`px-3 py-1.5 rounded-xl border transition ${
                  resumeTemplate === "classic-corporate"
                    ? "bg-indigo-50 border-indigo-600 text-indigo-900 shadow-sm"
                    : "border-slate-200 text-slate-600 bg-white"
                }`}
              >
                {language === "hi" ? "🏛️ क्लासिक कॉर्पोरेट (Formal)" : "🏛️ Classic Corporate"}
              </button>

              <button
                onClick={() => setResumeTemplate("minimal")}
                className={`px-3 py-1.5 rounded-xl border transition ${
                  resumeTemplate === "minimal"
                    ? "bg-slate-100 border-slate-600 text-slate-900 shadow-sm"
                    : "border-slate-200 text-slate-600 bg-white"
                }`}
              >
                {language === "hi" ? "⚡ क्लीन मिनिमल" : "⚡ Clean Minimal"}
              </button>
            </div>
          )}
        </div>

        {/* Work Area Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Form Editor (5 cols) */}
          <div className="lg:col-span-5 space-y-4 print:hidden">
            <div className="glass-card rounded-2xl p-5 bg-white border border-slate-200 space-y-3 max-h-[750px] overflow-y-auto">
              <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                {language === "hi" ? "जानकारी भरें:" : "Fill Details:"}
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-600 font-bold mb-1">
                    {language === "hi" ? "पूरा नाम:" : "Full Name:"}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 rounded-xl border border-slate-200 text-slate-800 bg-slate-50 font-bold focus:ring-2 focus:ring-pink-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-600 font-bold mb-1">
                      {language === "hi" ? "जन्म तिथि (DOB):" : "Date of Birth:"}
                    </label>
                    <input
                      type="text"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      className="w-full p-2 rounded-xl border border-slate-200 text-slate-800 bg-slate-50 font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-bold mb-1">
                      {language === "hi" ? "लंबाई (Height):" : "Height:"}
                    </label>
                    <input
                      type="text"
                      name="height"
                      value={formData.height}
                      onChange={handleChange}
                      className="w-full p-2 rounded-xl border border-slate-200 text-slate-800 bg-slate-50 font-bold"
                    />
                  </div>
                </div>

                {mode === "biodata" && (
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-600 font-bold mb-1">
                        {language === "hi" ? "जन्म समय:" : "Birth Time:"}
                      </label>
                      <input
                        type="text"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className="w-full p-2 rounded-xl border border-slate-200 text-slate-800 bg-slate-50"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 font-bold mb-1">
                        {language === "hi" ? "गोत्र (Gotra):" : "Gotra:"}
                      </label>
                      <input
                        type="text"
                        name="gotra"
                        value={formData.gotra}
                        onChange={handleChange}
                        className="w-full p-2 rounded-xl border border-slate-200 text-slate-800 bg-slate-50"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-slate-600 font-bold mb-1">
                    {language === "hi" ? "शिक्षा (Education):" : "Education:"}
                  </label>
                  <input
                    type="text"
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    className="w-full p-2 rounded-xl border border-slate-200 text-slate-800 bg-slate-50 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-bold mb-1">
                    {language === "hi" ? "पेशा / नौकरी (Occupation):" : "Occupation / Job:"}
                  </label>
                  <input
                    type="text"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    className="w-full p-2 rounded-xl border border-slate-200 text-slate-800 bg-slate-50 font-bold"
                  />
                </div>

                {mode === "biodata" ? (
                  <>
                    <div>
                      <label className="block text-slate-600 font-bold mb-1">
                        {language === "hi" ? "मासिक / वार्षिक आय:" : "Annual Income:"}
                      </label>
                      <input
                        type="text"
                        name="income"
                        value={formData.income}
                        onChange={handleChange}
                        className="w-full p-2 rounded-xl border border-slate-200 text-slate-800 bg-slate-50"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-slate-600 font-bold mb-1">
                          {language === "hi" ? "पिता का नाम:" : "Father's Name:"}
                        </label>
                        <input
                          type="text"
                          name="fatherName"
                          value={formData.fatherName}
                          onChange={handleChange}
                          className="w-full p-2 rounded-xl border border-slate-200 text-slate-800 bg-slate-50"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-600 font-bold mb-1">
                          {language === "hi" ? "माता का नाम:" : "Mother's Name:"}
                        </label>
                        <input
                          type="text"
                          name="motherName"
                          value={formData.motherName}
                          onChange={handleChange}
                          className="w-full p-2 rounded-xl border border-slate-200 text-slate-800 bg-slate-50"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-slate-600 font-bold mb-1">
                        {language === "hi" ? "मुख्य स्किल्स (Key Skills):" : "Skills:"}
                      </label>
                      <input
                        type="text"
                        name="skills"
                        value={formData.skills}
                        onChange={handleChange}
                        className="w-full p-2 rounded-xl border border-slate-200 text-slate-800 bg-slate-50"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 font-bold mb-1">
                        {language === "hi" ? "अनुभव (Experience Summary):" : "Experience Summary:"}
                      </label>
                      <textarea
                        name="experience"
                        rows={2}
                        value={formData.experience}
                        onChange={handleChange}
                        className="w-full p-2 rounded-xl border border-slate-200 text-slate-800 bg-slate-50"
                      />
                    </div>
                  </>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-600 font-bold mb-1">
                      {language === "hi" ? "मोबाइल नंबर:" : "Phone:"}
                    </label>
                    <input
                      type="text"
                      name="contactPhone"
                      value={formData.contactPhone}
                      onChange={handleChange}
                      className="w-full p-2 rounded-xl border border-slate-200 text-slate-800 bg-slate-50 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-bold mb-1">Email:</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-2 rounded-xl border border-slate-200 text-slate-800 bg-slate-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-600 font-bold mb-1">
                    {language === "hi" ? "पता (Address):" : "Address:"}
                  </label>
                  <textarea
                    name="address"
                    rows={2}
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full p-2 rounded-xl border border-slate-200 text-slate-800 bg-slate-50"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Live Printable Preview Area (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center">
            {/* ================= BIODATA PREVIEWS ================= */}
            {mode === "biodata" && (
              <div
                className={`w-full max-w-[620px] bg-white rounded-2xl shadow-xl p-8 sm:p-12 print:border-none print:shadow-none print:p-0 min-h-[820px] text-slate-900 flex flex-col justify-between transition-all ${
                  bioTemplate === "royal-gold"
                    ? "border-4 border-amber-500/80 ring-8 ring-amber-100"
                    : bioTemplate === "rose-floral"
                    ? "border-4 border-pink-400 ring-8 ring-pink-50"
                    : "border-2 border-slate-300"
                }`}
              >
                <div>
                  {/* Header */}
                  <div
                    className={`text-center pb-6 border-b-2 ${
                      bioTemplate === "royal-gold"
                        ? "border-amber-500"
                        : bioTemplate === "rose-floral"
                        ? "border-pink-400"
                        : "border-slate-800"
                    }`}
                  >
                    <span
                      className={`text-xl sm:text-2xl font-bold block mb-1 ${
                        bioTemplate === "royal-gold"
                          ? "text-amber-800"
                          : bioTemplate === "rose-floral"
                          ? "text-pink-700"
                          : "text-slate-700"
                      }`}
                    >
                      ॥ श्री गणेशाय नमः ॥
                    </span>
                    <h2
                      className={`text-2xl sm:text-3xl font-black tracking-widest uppercase ${
                        bioTemplate === "royal-gold"
                          ? "text-amber-900"
                          : bioTemplate === "rose-floral"
                          ? "text-pink-900"
                          : "text-slate-900"
                      }`}
                    >
                      {language === "hi" ? "वैवाहिक बायो-डाटा" : "MARRIAGE BIO-DATA"}
                    </h2>
                  </div>

                  {/* Details Sections */}
                  <div className="mt-8 space-y-4 text-xs sm:text-sm">
                    {/* Personal */}
                    <div
                      className={`p-2.5 rounded-lg font-black uppercase tracking-wider text-xs ${
                        bioTemplate === "royal-gold"
                          ? "bg-amber-100/70 text-amber-900 border-l-4 border-amber-600"
                          : bioTemplate === "rose-floral"
                          ? "bg-pink-100/70 text-pink-900 border-l-4 border-pink-500"
                          : "bg-slate-100 text-slate-900 border-l-4 border-slate-700"
                      }`}
                    >
                      {language === "hi" ? "व्यक्तिगत विवरण (Personal Details)" : "Personal Details"}
                    </div>

                    <div className="grid grid-cols-3 gap-2 py-1 border-b border-slate-100">
                      <span className="font-bold text-slate-600">नाम (Name):</span>
                      <span className="col-span-2 font-bold text-slate-900">{formData.name}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 py-1 border-b border-slate-100">
                      <span className="font-bold text-slate-600">जन्म तिथि (DOB):</span>
                      <span className="col-span-2 text-slate-800">{formData.dob}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 py-1 border-b border-slate-100">
                      <span className="font-bold text-slate-600">जन्म समय व स्थान:</span>
                      <span className="col-span-2 text-slate-800">
                        {formData.time}, {formData.birthPlace}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 py-1 border-b border-slate-100">
                      <span className="font-bold text-slate-600">गोत्र (Gotra):</span>
                      <span className="col-span-2 text-slate-800">{formData.gotra}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 py-1 border-b border-slate-100">
                      <span className="font-bold text-slate-600">कद / वर्ण (Height):</span>
                      <span className="col-span-2 text-slate-800">
                        {formData.height} ({formData.complexion})
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 py-1 border-b border-slate-100">
                      <span className="font-bold text-slate-600">शिक्षा (Education):</span>
                      <span className="col-span-2 font-bold text-slate-900">{formData.education}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 py-1 border-b border-slate-100">
                      <span className="font-bold text-slate-600">पेशा (Occupation):</span>
                      <span className="col-span-2 font-bold text-slate-900">
                        {formData.occupation} ({formData.income})
                      </span>
                    </div>

                    {/* Family */}
                    <div
                      className={`p-2.5 rounded-lg font-black uppercase tracking-wider text-xs mt-6 ${
                        bioTemplate === "royal-gold"
                          ? "bg-amber-100/70 text-amber-900 border-l-4 border-amber-600"
                          : bioTemplate === "rose-floral"
                          ? "bg-pink-100/70 text-pink-900 border-l-4 border-pink-500"
                          : "bg-slate-100 text-slate-900 border-l-4 border-slate-700"
                      }`}
                    >
                      {language === "hi" ? "पारिवारिक विवरण (Family Details)" : "Family Details"}
                    </div>

                    <div className="grid grid-cols-3 gap-2 py-1 border-b border-slate-100">
                      <span className="font-bold text-slate-600">पिता का नाम:</span>
                      <span className="col-span-2 text-slate-800">{formData.fatherName}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 py-1 border-b border-slate-100">
                      <span className="font-bold text-slate-600">माता का नाम:</span>
                      <span className="col-span-2 text-slate-800">{formData.motherName}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 py-1 border-b border-slate-100">
                      <span className="font-bold text-slate-600">भाई / बहन:</span>
                      <span className="col-span-2 text-slate-800">
                        {formData.brothers}, {formData.sisters}
                      </span>
                    </div>

                    {/* Contact */}
                    <div
                      className={`p-2.5 rounded-lg font-black uppercase tracking-wider text-xs mt-6 ${
                        bioTemplate === "royal-gold"
                          ? "bg-amber-100/70 text-amber-900 border-l-4 border-amber-600"
                          : bioTemplate === "rose-floral"
                          ? "bg-pink-100/70 text-pink-900 border-l-4 border-pink-500"
                          : "bg-slate-100 text-slate-900 border-l-4 border-slate-700"
                      }`}
                    >
                      {language === "hi" ? "संपर्क विवरण (Contact Details)" : "Contact Details"}
                    </div>

                    <div className="grid grid-cols-3 gap-2 py-1 border-b border-slate-100">
                      <span className="font-bold text-slate-600">मोबाइल नंबर:</span>
                      <span className="col-span-2 font-bold text-slate-900 font-mono">
                        {formData.contactPhone}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 py-1">
                      <span className="font-bold text-slate-600">निवास स्थान:</span>
                      <span className="col-span-2 text-slate-800">{formData.address}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 text-center text-[10px] text-slate-400 border-t border-slate-100 mt-6">
                  Printed via QR Print Seva Cyber Cafe System
                </div>
              </div>
            )}

            {/* ================= RESUME PREVIEWS ================= */}
            {mode === "resume" && (
              <div className="w-full max-w-[620px] bg-white rounded-2xl shadow-xl p-8 sm:p-10 border border-slate-200 print:border-none print:shadow-none print:p-0 min-h-[820px] text-slate-900 flex flex-col justify-between">
                {resumeTemplate === "modern-tech" ? (
                  // 2-Column Modern Tech
                  <div className="grid grid-cols-12 gap-6">
                    {/* Left Sidebar (4 cols) */}
                    <div className="col-span-4 bg-slate-900 text-white rounded-xl p-5 space-y-5">
                      <div>
                        <h3 className="font-black text-sm uppercase tracking-wider text-blue-400 mb-2">
                          Contact
                        </h3>
                        <p className="text-[11px] text-slate-300 break-all">{formData.contactPhone}</p>
                        <p className="text-[11px] text-slate-300 break-all mt-1">{formData.email}</p>
                        <p className="text-[10px] text-slate-400 mt-2">{formData.address}</p>
                      </div>

                      <div>
                        <h3 className="font-black text-sm uppercase tracking-wider text-blue-400 mb-2">
                          Skills
                        </h3>
                        <div className="flex flex-wrap gap-1.5">
                          {formData.skills.split(",").map((sk, i) => (
                            <span key={i} className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-blue-300">
                              {sk.trim()}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-black text-sm uppercase tracking-wider text-blue-400 mb-2">
                          Education
                        </h3>
                        <p className="text-xs font-bold text-white">{formData.education}</p>
                      </div>
                    </div>

                    {/* Right Main Content (8 cols) */}
                    <div className="col-span-8 space-y-6">
                      <div>
                        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                          {formData.name}
                        </h1>
                        <p className="text-sm font-bold text-blue-600 mt-0.5">{formData.occupation}</p>
                      </div>

                      <div>
                        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 pb-1.5 border-b-2 border-blue-600 mb-2">
                          Professional Summary
                        </h3>
                        <p className="text-xs text-slate-600 leading-relaxed">{formData.experience}</p>
                      </div>

                      <div>
                        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 pb-1.5 border-b-2 border-blue-600 mb-2">
                          Key Projects & Achievements
                        </h3>
                        <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
                          <li>Developed fast self-service cloud queue automation software.</li>
                          <li>Optimized client-side rendering reducing bundle sizes by 40%.</li>
                          <li>Engineered high-concurrency real-time WebSocket communication channels.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Classic Corporate
                  <div className="space-y-6">
                    <div className="text-center pb-4 border-b-2 border-slate-900">
                      <h1 className="text-3xl font-black text-slate-900">{formData.name}</h1>
                      <p className="text-sm font-bold text-slate-700 mt-1">{formData.occupation}</p>
                      <p className="text-xs text-slate-500 mt-1">
                        {formData.contactPhone} • {formData.email} • {formData.address}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-900 pb-1 border-b border-slate-300 mb-2">
                        Summary
                      </h3>
                      <p className="text-xs text-slate-700 leading-relaxed">{formData.experience}</p>
                    </div>

                    <div>
                      <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-900 pb-1 border-b border-slate-300 mb-2">
                        Education
                      </h3>
                      <p className="text-xs font-bold text-slate-800">{formData.education}</p>
                    </div>

                    <div>
                      <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-900 pb-1 border-b border-slate-300 mb-2">
                        Skills & Competencies
                      </h3>
                      <p className="text-xs text-slate-700">{formData.skills}</p>
                    </div>
                  </div>
                )}

                <div className="pt-6 text-center text-[10px] text-slate-400 border-t border-slate-100 mt-6">
                  Printed via QR Print Seva Cyber Cafe System
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
