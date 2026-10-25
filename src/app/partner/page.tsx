"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import {
  Handshake,
  DollarSign,
  TrendingUp,
  Award,
  Users,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Building,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Flame,
} from "lucide-react";

export default function PartnerProgramPage() {
  const { language } = useLanguage();

  // Commission Calculator state
  const [shopsCount, setShopsCount] = useState(25);
  const monthlyEarning = shopsCount * 180; // Estimated passive recurring cut

  // Form State
  const [submitted, setSubmitted] = useState(false);
  const [partnerForm, setPartnerForm] = useState({
    name: "",
    phone: "",
    city: "",
    role: "csc_vle",
    shopsInNetwork: "10-25",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 space-y-16">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* HERO SECTION */}
        <section className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 border border-blue-200 text-blue-800 text-xs sm:text-sm font-bold shadow-sm">
            <Handshake className="w-4 h-4 text-blue-600" />
            <span>
              {language === "hi"
                ? "स्मार्टप्रिंट प्रो अधिकृत पार्टनर व डिस्ट्रीब्यूटर प्रोग्राम"
                : "Official SmartPrint Pro Partner & Reseller Program"}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            {language === "hi" ? (
              <>
                अपने शहर के साइबर कैफे जोड़ें और{" "}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  हर महीने ₹25,000+
                </span>{" "}
                कमाएं
              </>
            ) : (
              <>
                Onboard Cyber Cafes in Your City & Earn{" "}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  ₹25,000+ Every Month
                </span>
              </>
            )}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {language === "hi"
              ? "अगर आप CSC जिला प्रबंधक, कंप्यूटर हार्डवेयर डीलर, ज़ेरॉक्स मशीन सप्लायर, या टेक एक्सपर्ट हैं, तो हमारे पार्टनर बनकर अपने क्षेत्र की फोटोकॉपी व प्रिंट दुकानों को स्मार्ट बनाएं और आजीवन कमीशन पाएं।"
              : "Partner with India's fastest-growing print automation platform. Perfect for CSC District Coordinators, printer hardware vendors, and local tech entrepreneurs."}
          </p>
        </section>

        {/* COMMISSION CALCULATOR */}
        <section className="glass-card rounded-3xl p-6 sm:p-10 bg-white border border-slate-200 shadow-xl max-w-4xl mx-auto">
          <div className="text-center pb-6 border-b border-slate-100">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block mb-1">
              {language === "hi" ? "लाइव कमीशन कैलकुलेटर" : "Live Partner Earnings Calculator"}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              {language === "hi"
                ? "जानिए आप हर महीने कितना कमा सकते हैं"
                : "Estimate Your Monthly Passive Recurring Income"}
            </h2>
          </div>

          <div className="pt-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Slider Column (7 cols) */}
            <div className="md:col-span-7 space-y-5">
              <div>
                <div className="flex justify-between items-center text-sm font-bold text-slate-700 mb-2">
                  <span>
                    {language === "hi" ? "आपकी जोड़ी गई दुकानें (Onboarded Shops):" : "Number of Shops Onboarded:"}
                  </span>
                  <span className="text-xl font-black text-blue-600 font-mono">
                    {shopsCount} Shops
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="150"
                  step="5"
                  value={shopsCount}
                  onChange={(e) => setShopsCount(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-semibold">
                  <span>5 Shops</span>
                  <span>50 Shops</span>
                  <span>100 Shops</span>
                  <span>150 Shops</span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-600">
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>
                    {language === "hi"
                      ? "30% आजीवन रिकरिंग कमीशन (दुकान जब भी रिन्यू करेगी, पैसा आपको मिलेगा)"
                      : "30% Lifetime recurring cut on all monthly/yearly subscription renewals"}
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>
                    {language === "hi"
                      ? "प्रत्येक नई दुकान पर ₹200 का तत्काल इंस्टेंट ऑनबोर्डिंग बोनस"
                      : "Instant ₹200 activation bonus per shop onboarded"}
                  </span>
                </p>
              </div>
            </div>

            {/* Earnings Result Card (5 cols) */}
            <div className="md:col-span-5 bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-3xl p-6 sm:p-8 text-center shadow-xl space-y-3">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-bold block">
                {language === "hi" ? "अनुमानित मासिक कमाई" : "Estimated Monthly Income"}
              </span>
              <div className="text-4xl sm:text-5xl font-black text-emerald-400 font-mono tracking-tight">
                ₹{monthlyEarning.toLocaleString("en-IN")}
              </div>
              <span className="text-xs text-blue-200 block">
                + ₹{(shopsCount * 200).toLocaleString("en-IN")} One-Time Bonus
              </span>
              <p className="text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                {language === "hi"
                  ? "हर महीने की 1 तारीख को सीधे आपके बैंक खाते में ट्रांसफर।"
                  : "Paid out automatically on the 1st of every month to your bank account."}
              </p>
            </div>
          </div>
        </section>

        {/* 4 BENEFITS CARDS */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-card rounded-2xl p-6 bg-white border border-slate-200 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-sm">
              {language === "hi" ? "फ्री मार्केटिंग किट" : "Free Marketing Kit"}
            </h3>
            <p className="text-xs text-slate-500">
              {language === "hi"
                ? "दुकानों में लगाने के लिए रेडीमेड स्टैंडी, ब्रोशर और स्टिकर्स की मुफ्त किट।"
                : "High-res printable counter standees, demo flyers, and marketing posters provided."}
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 bg-white border border-slate-200 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-sm">
              {language === "hi" ? "लाइव पार्टनर डैशबोर्ड" : "Live Partner Portal"}
            </h3>
            <p className="text-xs text-slate-500">
              {language === "hi"
                ? "अपने डैशबोर्ड में देखें कितनी दुकानें एक्टिव हैं और आपका कुल कमीशन कितना बना।"
                : "Real-time dashboard tracking onboarded shops, subscription renewals, and payouts."}
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 bg-white border border-slate-200 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-sm">
              {language === "hi" ? "जिला स्तर एक्सक्लूसिविटी" : "Territory Exclusivity"}
            </h3>
            <p className="text-xs text-slate-500">
              {language === "hi"
                ? "अपने तहसील या जिले के मुख्य आधिकारिक डिस्ट्रीब्यूटर बनने का मौका।"
                : "Opportunity to become the official exclusive master distributor for your district."}
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 bg-white border border-slate-200 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-sm">
              {language === "hi" ? "समर्पित मैनेजर सपोर्ट" : "Dedicated WhatsApp Manager"}
            </h3>
            <p className="text-xs text-slate-500">
              {language === "hi"
                ? "दुकानदार के कंप्यूटर में प्रिंटर सेटअप कराने के लिए हमारी टीम सहायता करेगी।"
                : "Our remote engineering team helps you configure your shops' printers over AnyDesk."}
            </p>
          </div>
        </section>

        {/* REGISTRATION FORM */}
        <section className="glass-card rounded-3xl p-6 sm:p-10 bg-white border border-slate-200 shadow-xl max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-black text-slate-900">
              {language === "hi" ? "पार्टनर बनने के लिए आवेदन करें" : "Apply to Become an Official Partner"}
            </h2>
            <p className="text-xs text-slate-500">
              {language === "hi"
                ? "विवरण भरें, हमारी पार्टनरशिप टीम 2 घंटे के भीतर आपसे WhatsApp पर संपर्क करेगी।"
                : "Fill details below. Our partnership manager will connect with you within 2 hours."}
            </p>
          </div>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-300 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-lg font-black text-emerald-900">
                {language === "hi" ? "आवेदन सफलतापूर्वक प्राप्त हुआ!" : "Application Submitted Successfully!"}
              </h3>
              <p className="text-xs text-emerald-700">
                {language === "hi"
                  ? "धन्यवाद! हमारे पार्टनरशिप हेड आपसे +91 नंबर पर WhatsApp कॉल करेंगे और आपका पार्टनर कोड सक्रिय करेंगे।"
                  : "Thank you! Our partnership team will contact your WhatsApp number shortly."}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  {language === "hi" ? "आपका पूरा नाम:" : "Your Full Name:"}
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={partnerForm.name}
                  onChange={(e) => setPartnerForm({ ...partnerForm, name: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 text-slate-800 bg-slate-50 font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    {language === "hi" ? "WhatsApp मोबाइल नंबर:" : "WhatsApp Number:"}
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={partnerForm.phone}
                    onChange={(e) => setPartnerForm({ ...partnerForm, phone: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200 text-slate-800 bg-slate-50 font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    {language === "hi" ? "शहर व जिला (City & State):" : "City & District:"}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sirsa, Haryana"
                    value={partnerForm.city}
                    onChange={(e) => setPartnerForm({ ...partnerForm, city: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200 text-slate-800 bg-slate-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    {language === "hi" ? "आपका पेशा (Profession):" : "Your Role:"}
                  </label>
                  <select
                    value={partnerForm.role}
                    onChange={(e) => setPartnerForm({ ...partnerForm, role: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200 text-slate-800 bg-slate-50 font-bold"
                  >
                    <option value="csc_vle">CSC VLE / Coordinator</option>
                    <option value="hardware_dealer">Printer / Hardware Dealer</option>
                    <option value="shop_owner">Cyber Cafe Owner</option>
                    <option value="freelancer">Tech Entrepreneur / Freelancer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    {language === "hi" ? "अनुमानित दुकानें जो आप जोड़ सकते हैं:" : "Shops in Your Network:"}
                  </label>
                  <select
                    value={partnerForm.shopsInNetwork}
                    onChange={(e) => setPartnerForm({ ...partnerForm, shopsInNetwork: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200 text-slate-800 bg-slate-50 font-bold"
                  >
                    <option value="5-15">5 - 15 Shops</option>
                    <option value="15-50">15 - 50 Shops</option>
                    <option value="50-100">50 - 100 Shops</option>
                    <option value="100+">100+ Shops (District Master)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm shadow-xl shadow-blue-500/25 transition flex items-center justify-center gap-2 mt-2"
              >
                <span>{language === "hi" ? "पार्टनर प्रोग्राम में शामिल हों" : "Join Partner Program"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </section>
      </div>
    </div>
  );
}
