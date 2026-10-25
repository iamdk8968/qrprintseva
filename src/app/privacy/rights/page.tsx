"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Scale,
  ShieldCheck,
  FileText,
  Send,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowLeft,
  Globe,
  User,
  Phone,
  Mail,
  UserCheck,
  RefreshCw,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { DPDPRightType } from "@/lib/dataRightsStore";

export default function DataRightsRequestPage() {
  const { language, toggleLanguage } = useLanguage();

  const [activeTab, setActiveTab] = useState<"submit" | "track">("submit");

  // Form State
  const [principalName, setPrincipalName] = useState("");
  const [principalContact, setPrincipalContact] = useState("");
  const [principalType, setPrincipalType] = useState<"customer" | "shopkeeper" | "partner" | "visitor">("customer");
  const [rightType, setRightType] = useState<DPDPRightType>("access_summary");
  const [details, setDetails] = useState("");
  const [verificationIdentifier, setVerificationIdentifier] = useState("");
  
  // Nominee fields (if rightType === 'nomination')
  const [nomineeName, setNomineeName] = useState("");
  const [nomineeContact, setNomineeContact] = useState("");
  const [nomineeRelation, setNomineeRelation] = useState("");

  // Submission feedback
  const [submitting, setSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    success: boolean;
    requestId?: string;
    trackingCode?: string;
    targetResolutionDate?: string;
    message?: string;
  } | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  // Tracking query
  const [trackQuery, setTrackQuery] = useState("");
  const [trackingLoading, setTrackingLoading] = useState(false);
  const [trackedRecord, setTrackedRecord] = useState<any>(null);
  const [trackError, setTrackError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError(null);

    try {
      const payload: any = {
        principalName,
        principalContact,
        principalType,
        rightType,
        details,
        verificationIdentifier: verificationIdentifier || undefined,
      };

      if (rightType === "nomination") {
        payload.nominee = {
          name: nomineeName,
          contact: nomineeContact,
          relation: nomineeRelation,
        };
      }

      const res = await fetch("/api/privacy/rights-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit request");
      }

      setSubmissionResult({
        success: true,
        requestId: data.requestId,
        trackingCode: data.trackingCode,
        targetResolutionDate: data.targetResolutionDate,
        message: data.message,
      });
    } catch (err: any) {
      setFormError(err.message || "An unexpected error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackQuery.trim()) return;

    setTrackingLoading(true);
    setTrackError(null);
    setTrackedRecord(null);

    try {
      const res = await fetch(`/api/privacy/rights-request?query=${encodeURIComponent(trackQuery.trim())}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Request not found");
      }

      setTrackedRecord(data.request);
    } catch (err: any) {
      setTrackError(err.message || "Unable to find request");
    } finally {
      setTrackingLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Link
            href="/privacy"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-blue-600 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{language === "hi" ? "गोपनीयता सूचना पर लौटें" : "Back to Privacy Notice"}</span>
          </Link>

          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-300 bg-white shadow-sm text-xs font-bold text-slate-700 hover:text-blue-600 transition"
          >
            <Globe className="w-3.5 h-3.5 text-blue-600" />
            <span>{language === "hi" ? "English" : "हिन्दी"}</span>
          </button>
        </div>

        {/* Hero Header */}
        <div className="border-b border-slate-200 pb-6 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 border border-blue-200 text-blue-800 text-xs font-bold">
            <Scale className="w-4 h-4 text-blue-600" />
            <span>Chapter III, DPDP Act 2023 Statutory Portal</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {language === "hi"
              ? "डेटा अधिकार अनुरोध पोर्टल (DPDP Rights)"
              : "Data Principal Rights Request Portal"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {language === "hi"
              ? "डिजिटल पर्सनल डेटा प्रोटेक्शन एक्ट 2023 के तहत भारतीय नागरिकों को अपने डेटा की जानकारी पाने, संशोधन कराने, मिटाने या सहमति वापस लेने का पूर्ण कानूनी अधिकार है।"
              : "Under the Digital Personal Data Protection Act, 2023 (India), you have the statutory right to access, correct, erase, or withdraw consent regarding personal data processed by QR Print Seva."}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center p-1.5 bg-slate-200/80 rounded-2xl text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab("submit")}
            className={`flex-1 py-2.5 rounded-xl transition flex items-center justify-center gap-2 ${
              activeTab === "submit"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Send className="w-4 h-4" />
            <span>{language === "hi" ? "नया अनुरोध दर्ज करें" : "Submit New Request"}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("track")}
            className={`flex-1 py-2.5 rounded-xl transition flex items-center justify-center gap-2 ${
              activeTab === "track"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Search className="w-4 h-4" />
            <span>{language === "hi" ? "अनुरोध की स्थिति जांचें" : "Track Request Status"}</span>
          </button>
        </div>

        {/* TAB 1: SUBMIT NEW REQUEST */}
        {activeTab === "submit" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
            {submissionResult?.success ? (
              <div className="space-y-5 text-center py-6">
                <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-slate-900">
                    Request Formally Registered!
                  </h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    Your request has been logged in compliance with Section 11–14 of the DPDP Act 2023. Our Data Protection &amp; Grievance Officer has been notified.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 max-w-md mx-auto text-left font-mono text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Request ID:</span>
                    <strong className="text-blue-600 font-bold">{submissionResult.requestId}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Tracking Code:</span>
                    <strong className="text-slate-900">{submissionResult.trackingCode}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Resolution SLA:</span>
                    <span className="text-amber-700 font-bold">Within 30 Days</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmissionResult(null);
                      setDetails("");
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
                  >
                    Submit Another Request
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setTrackQuery(submissionResult.requestId || "");
                      setActiveTab("track");
                    }}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition"
                  >
                    Track Progress
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 text-xs">
                {formError && (
                  <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 flex items-center gap-2 font-medium">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                {/* Role Selector */}
                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">
                    1. Select Your Role / अपनी भूमिका चुनें:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: "customer", label: "Print Customer" },
                      { id: "shopkeeper", label: "Shopkeeper" },
                      { id: "partner", label: "Partner Agent" },
                      { id: "visitor", label: "Website Visitor" },
                    ].map((role) => (
                      <button
                        key={role.id}
                        type="button"
                        onClick={() => setPrincipalType(role.id as any)}
                        className={`p-2.5 rounded-xl border text-center font-bold transition ${
                          principalType === role.id
                            ? "bg-blue-50 border-blue-600 text-blue-700"
                            : "border-slate-200 hover:bg-slate-50 text-slate-600"
                        }`}
                      >
                        {role.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Statutory Right Selector */}
                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">
                    2. Select the DPDP Statutory Right to Exercise / कानूनी अधिकार चुनें:
                  </label>
                  <select
                    value={rightType}
                    onChange={(e) => setRightType(e.target.value as DPDPRightType)}
                    className="w-full p-3 rounded-xl border border-slate-200 font-bold text-slate-900 bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="access_summary">Right to Access Data &amp; Processing Summary (Section 11)</option>
                    <option value="correction_update">Right to Correction &amp; Updating (Section 12)</option>
                    <option value="erasure_deletion">Right to Erasure / Deletion of Personal Data (Section 12)</option>
                    <option value="withdraw_consent">Right to Withdraw Consent (Section 6(4))</option>
                    <option value="nomination">Right to Nominate Representative (Section 14)</option>
                  </select>
                </div>

                {/* Identity & Contact Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      Full Name / पूरा नाम: *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={principalName}
                      onChange={(e) => setPrincipalName(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      Registered Mobile / Email: *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 9876543210 or user@example.com"
                      value={principalContact}
                      onChange={(e) => setPrincipalContact(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Verification Identifier */}
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Order Token / Shop ID / Verification Clue (Optional):
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Print Token #115 or Shop Slug 'sharma-cyber-cafe'"
                    value={verificationIdentifier}
                    onChange={(e) => setVerificationIdentifier(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-mono text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Helps our Data Protection Officer verify your identity without requiring excessive identity documents.
                  </span>
                </div>

                {/* Nomination Conditional Fields */}
                {rightType === "nomination" && (
                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-3">
                    <div className="flex items-center gap-2 font-bold text-amber-900 text-xs">
                      <UserCheck className="w-4 h-4 text-amber-600" />
                      <span>Nominee Details under Section 14 (नामित व्यक्ति का विवरण):</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <input
                        type="text"
                        required
                        placeholder="Nominee Full Name"
                        value={nomineeName}
                        onChange={(e) => setNomineeName(e.target.value)}
                        className="p-2 rounded-lg border border-amber-200 bg-white text-slate-900 text-xs"
                      />
                      <input
                        type="text"
                        required
                        placeholder="Nominee Phone / Email"
                        value={nomineeContact}
                        onChange={(e) => setNomineeContact(e.target.value)}
                        className="p-2 rounded-lg border border-amber-200 bg-white text-slate-900 text-xs"
                      />
                      <input
                        type="text"
                        required
                        placeholder="Relationship (e.g. Spouse/Brother)"
                        value={nomineeRelation}
                        onChange={(e) => setNomineeRelation(e.target.value)}
                        className="p-2 rounded-lg border border-amber-200 bg-white text-slate-900 text-xs"
                      />
                    </div>
                  </div>
                )}

                {/* Request Details */}
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Specific Description of Your Request / विवरण: *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe specifically which personal data you wish to access, correct, delete, or withdraw consent for..."
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  ></textarea>
                </div>

                {/* Statutory Declaration */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500 leading-relaxed">
                  ⚖️ <strong>Statutory Undertaking:</strong> Under Section 15 of the DPDP Act 2023, you declare that you are the authentic Data Principal (or legally authorized nominee) and the information furnished is accurate to the best of your knowledge.
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs shadow-xl shadow-blue-500/20 transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Submitting Statutory Request...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Statutory Data Request (अनुरोध दर्ज करें)</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        )}

        {/* TAB 2: TRACK STATUS */}
        {activeTab === "track" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
            <form onSubmit={handleTrack} className="space-y-3">
              <label className="block text-xs font-bold text-slate-700">
                Enter Your Request ID or Tracking Code / ट्रैकिंग नंबर दर्ज करें:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  placeholder="e.g. DPR-2026-1001 or SEC-8921-XQ"
                  value={trackQuery}
                  onChange={(e) => setTrackQuery(e.target.value)}
                  className="flex-1 p-3 rounded-xl border border-slate-200 bg-slate-50 font-mono text-xs font-bold text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={trackingLoading}
                  className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow transition flex items-center gap-1.5 disabled:opacity-50"
                >
                  {trackingLoading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Search className="w-4 h-4" />
                      <span>Search</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {trackError && (
              <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{trackError}</span>
              </div>
            )}

            {trackedRecord && (
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div>
                    <span className="text-[10px] text-slate-400 font-mono block">REQUEST ID</span>
                    <span className="font-mono font-bold text-blue-600 text-sm">{trackedRecord.id}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    trackedRecord.status === "completed"
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                      : "bg-amber-100 text-amber-800 border border-amber-200"
                  }`}>
                    {trackedRecord.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Data Principal Name:</span>
                    <strong className="text-slate-800">{trackedRecord.principalName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Exercised Right:</span>
                    <strong className="text-slate-800 font-mono">{trackedRecord.rightType}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Submitted On:</span>
                    <span className="text-slate-700 font-mono">{new Date(trackedRecord.submittedAt).toLocaleDateString("en-IN")}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Target Resolution SLA:</span>
                    <span className="text-amber-700 font-mono font-bold">{new Date(trackedRecord.targetResolutionDate).toLocaleDateString("en-IN")}</span>
                  </div>
                </div>

                {trackedRecord.resolutionRemarks && (
                  <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs space-y-1">
                    <span className="font-bold text-slate-800 block">Officer Resolution Remarks:</span>
                    <p className="text-slate-600">{trackedRecord.resolutionRemarks}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
