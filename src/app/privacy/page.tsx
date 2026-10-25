"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  FileText,
  AlertTriangle,
  Scale,
  Trash2,
  RefreshCw,
  Mail,
  MapPin,
  Clock,
  ExternalLink,
  ChevronRight,
  Globe,
  ArrowLeft,
  Building,
  CheckCircle2,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function PrivacyNoticePage() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Navigation & Language Toggle */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-blue-600 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{language === "hi" ? "मुख्य पृष्ठ पर वापस जाएं" : "Back to Home"}</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/privacy/rights"
              className="px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold hover:bg-blue-100 transition shadow-sm flex items-center gap-1.5"
            >
              <Scale className="w-3.5 h-3.5" />
              <span>{language === "hi" ? "अधिकार अनुरोध फॉर्म" : "Exercise DPDP Rights"}</span>
            </Link>

            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-300 bg-white shadow-sm text-xs font-bold text-slate-700 hover:text-blue-600 transition"
            >
              <Globe className="w-3.5 h-3.5 text-blue-600" />
              <span>{language === "hi" ? "English" : "हिन्दी"}</span>
            </button>
          </div>
        </div>

        {/* Legal Counsel Review Banner */}
        <div className="p-4 sm:p-5 rounded-3xl bg-amber-500/10 border-2 border-amber-500/30 text-amber-950 space-y-2">
          <div className="flex items-center gap-2 font-black text-xs sm:text-sm uppercase tracking-wider text-amber-800">
            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>Legal Review Notice • विधिक समीक्षा सूचना</span>
          </div>
          <p className="text-xs text-amber-900/90 leading-relaxed font-medium">
            <strong>[PENDING FINAL OPINION BY QUALIFIED INDIAN DATA PROTECTION ADVOCATE / LEGAL COUNSEL]:</strong>{" "}
            This Privacy Notice is drafted to align with the provisions of the{" "}
            <em>Digital Personal Data Protection Act, 2023 (Act No. 22 of 2023, Republic of India)</em> and the Information Technology Act, 2000. It governs the processing of personal data by <strong>QR Print Seva</strong>. It should be formally ratified by corporate legal counsel prior to formal commercial execution.
          </p>
        </div>

        {/* Page Hero Header */}
        <div className="border-b border-slate-200 pb-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-800 text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>Statutory Privacy Notice • Section 5, DPDP Act 2023</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">
            {language === "hi"
              ? "गोपनीयता सूचना व डेटा संरक्षण नीति"
              : "Privacy Notice & Data Protection Policy"}
          </h1>

          <div className="flex items-center gap-4 text-xs font-medium text-slate-500 flex-wrap">
            <span><strong>Effective Date:</strong> October 25, 2026</span>
            <span>•</span>
            <span><strong>Version:</strong> 1.0 (DPDP Act Compliance Edition)</span>
            <span>•</span>
            <span><strong>Jurisdiction:</strong> Gorakhpur (Uttar Pradesh), India</span>
          </div>
        </div>

        {/* 1. Identity of Data Fiduciary */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-blue-600 text-white text-sm font-black flex items-center justify-center">1</span>
            <span>Data Fiduciary Identity • डेटा फिड्यूशियरी की पहचान</span>
          </h2>
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <p>
              Under Section 2(i) of the Digital Personal Data Protection Act, 2023, <strong>QR Print Seva</strong> (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) operates as the <strong>Data Fiduciary</strong> in respect of shopkeeper account records, partner applications, and platform operations.
            </p>
            <p>
              When facilitating document transmission from customer smartphones to local shop printers, QR Print Seva acts as an <strong>ephemeral, automated technical transmission pipeline (Data Processor)</strong> operating under strict zero-storage guarantees on behalf of the respective independent print shop.
            </p>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 font-mono text-xs space-y-1 text-slate-800">
              <div><strong>Platform:</strong> QR Print Seva (qrprintseva.in)</div>
              <div><strong>Principal Place of Operation:</strong> Near Railway Station Road, Gorakhpur, Uttar Pradesh - 273001, India</div>
              <div><strong>Official Email:</strong> contact@qrprintseva.in / dpo@qrprintseva.in</div>
            </div>
          </div>
        </section>

        {/* 2. Personal Data Collected & Purpose Matrix */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-blue-600 text-white text-sm font-black flex items-center justify-center">2</span>
            <span>Categories of Personal Data &amp; Purpose • डेटा व उद्देश्य</span>
          </h2>
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <p>
              In strict accordance with Section 5 and Section 6 of the DPDP Act 2023, we collect and process only the minimal personal data necessary for specified lawful purposes:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b-2 border-slate-200 text-slate-900 font-black">
                    <th className="py-2.5 pr-3">Category</th>
                    <th className="py-2.5 px-3">Data Points Collected</th>
                    <th className="py-2.5 px-3">Specified Lawful Purpose</th>
                    <th className="py-2.5 pl-3">Retention Period</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  <tr>
                    <td className="py-3 pr-3 font-bold text-slate-900">Shopkeeper Accounts</td>
                    <td className="py-3 px-3">Name, Mobile number, Email, Shop name, Physical address, UPI VPA identifier, Encrypted credentials</td>
                    <td className="py-3 px-3">Account provisioning, software licensing, print spooler routing, and statutory accounting</td>
                    <td className="py-3 pl-3 font-mono">Duration of active subscription + 7 years (Statutory tax compliance)</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-3 font-bold text-slate-900">Customer Print Queue</td>
                    <td className="py-3 px-3">File name, File payload (PDF/Images/Docs), Print parameters (color, copies), Payment UTR reference</td>
                    <td className="py-3 px-3">Ephemeral queuing and transmission to the designated shopkeeper&apos;s printer</td>
                    <td className="py-3 pl-3 font-mono text-emerald-700 font-bold">Ephemeral (Purged immediately upon print or max 15 mins)</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-3 font-bold text-slate-900">Partner &amp; Reseller</td>
                    <td className="py-3 px-3">Name, Mobile number, Email, District/State, Number of partner cyber cafes</td>
                    <td className="py-3 px-3">Distribution network vetting, commission settlement, onboarding support</td>
                    <td className="py-3 pl-3 font-mono">Duration of partnership or until consent withdrawal</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-3 font-bold text-slate-900">AI / Browser Tools</td>
                    <td className="py-3 px-3">Passport photos, Aadhaar crops, Resume bio-data</td>
                    <td className="py-3 px-3">Client-side browser processing for document formatting and instant printing</td>
                    <td className="py-3 pl-3 font-mono text-emerald-700 font-bold">0 Seconds (Processed entirely in client memory; zero upload)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 3. The Zero-Storage Architecture Guarantee */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-blue-600 text-white text-sm font-black flex items-center justify-center">3</span>
            <span>Zero-Storage Architecture Guarantee • ज़ीरो-स्टोरेज गारंटी</span>
          </h2>
          <div className="p-6 rounded-3xl bg-emerald-500/10 border-2 border-emerald-500/30 text-emerald-950 space-y-4 text-xs sm:text-sm leading-relaxed">
            <div className="flex items-center gap-2 font-black text-base text-emerald-900">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>100% Privacy by Design for Sensitive Customer Documents</span>
            </div>
            <p>
              Cyber cafe customers regularly print highly sensitive identity documents, including <strong>Aadhaar cards, PAN cards, Voter IDs, marksheets, admit cards, and banking statements</strong>. 
            </p>
            <p>
              To protect Indian citizens from identity theft and unauthorized archival, QR Print Seva incorporates an architectural <strong>Zero-Permanent-Storage Principle</strong>:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 font-medium text-emerald-900/90">
              <li>Customer files are processed in ephemeral memory (RAM) solely for conversion and silent spooling to the shop&apos;s physical printer.</li>
              <li>No customer document files are ever archived, cached permanently, sold, or shared with third parties.</li>
              <li>Once the shop&apos;s print spooler acknowledges execution (or after 15 minutes of inactivity), the file payload is irrevocably purged from all server queues.</li>
              <li>Client tools (Passport Photo Maker, Aadhaar Deskew, Resume Builder) execute entirely inside the customer&apos;s local browser via HTML5 Canvas.</li>
            </ul>
          </div>
        </section>

        {/* 4. Sub-processors and Third-Party Disclosures */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-blue-600 text-white text-sm font-black flex items-center justify-center">4</span>
            <span>Third-Party Processors • थर्ड-पार्टी सेवाएं</span>
          </h2>
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <p>
              We engage select trusted technical sub-processors under strict contractual data protection agreements:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">Cloud Hosting &amp; Edge Network</span>
                <span className="text-xs text-slate-500 block">Vercel Inc. (TLS 1.3 encrypted hosting and API edge routing)</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">UPI Payment Protocols</span>
                <span className="text-xs text-slate-500 block">NPCI UPI Gateway / Bank UPI Apps (Direct peer-to-peer VPA settlement; 0% middleman retention)</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">Shop Windows Print Agent</span>
                <span className="text-xs text-slate-500 block">Local client background spooler software on shopkeeper&apos;s PC</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">Video Tutorials (Gated)</span>
                <span className="text-xs text-slate-500 block">YouTube-nocookie embed (gated behind explicit user consent banner)</span>
              </div>
            </div>
            <p className="text-xs text-slate-500 pt-2">
              Cross-border data transfers adhere strictly to Central Government notifications issued under Section 16 of the DPDP Act 2023.
            </p>
          </div>
        </section>

        {/* 5. Rights of the Data Principal under DPDP Act */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-blue-600 text-white text-sm font-black flex items-center justify-center">5</span>
            <span>Your Statutory Rights under DPDP Act 2023 • आपके कानूनी अधिकार</span>
          </h2>
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <p>
              As a Data Principal under Chapter III of the Digital Personal Data Protection Act, 2023, you are legally entitled to exercise the following rights:
            </p>

            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-blue-950">1. Right to Access Information (Section 11)</span>
                  <span className="text-[10px] uppercase font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">Sec 11</span>
                </div>
                <p className="text-xs text-blue-900/80">
                  You have the right to obtain a summary of personal data being processed, identity of all sub-processors, and any other information prescribed by the Data Protection Board.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-blue-950">2. Right to Correction &amp; Erasure (Section 12)</span>
                  <span className="text-[10px] uppercase font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">Sec 12</span>
                </div>
                <p className="text-xs text-blue-900/80">
                  You have the right to correct inaccurate data, complete incomplete records, and request irrevocable erasure of personal data that is no longer necessary for the purpose it was collected.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-blue-950">3. Right to Withdraw Consent (Section 6(4))</span>
                  <span className="text-[10px] uppercase font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">Sec 6(4)</span>
                </div>
                <p className="text-xs text-blue-900/80">
                  You may withdraw your consent at any time with the same ease with which it was granted. Processing will immediately cease, subject to legal retention obligations.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-blue-950">4. Right of Grievance Redressal (Section 13)</span>
                  <span className="text-[10px] uppercase font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">Sec 13</span>
                </div>
                <p className="text-xs text-blue-900/80">
                  You have the right to readily available grievance redressal mechanisms with designated timelines, and the subsequent right to appeal to the Data Protection Board of India.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-blue-950">5. Right to Nominate (Section 14)</span>
                  <span className="text-[10px] uppercase font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">Sec 14</span>
                </div>
                <p className="text-xs text-blue-900/80">
                  You have the right to nominate an individual who shall, in the event of your death or incapacity, exercise your data rights under the Act.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/privacy/rights"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md shadow-blue-500/20 transition active:scale-95"
              >
                <span>Submit Data Rights Request Online (अधिकार अनुरोध दर्ज करें)</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* 6. Protection of Children's Data */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-blue-600 text-white text-sm font-black flex items-center justify-center">6</span>
            <span>Children&apos;s Personal Data • बच्चों का डेटा संरक्षण</span>
          </h2>
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <p>
              In accordance with Section 9 of the DPDP Act 2023:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>QR Print Seva does not knowingly process the personal data of children (individuals under 18 years of age) for behavioral profiling, tracking, or targeted advertising.</li>
              <li>Any incidental processing of minors&apos; documents (such as school marksheets or admit cards) by cyber cafes occurs purely via ephemeral client printing without retention.</li>
              <li>Account registration for print shop ownership requires the subscriber to be at least 18 years of age and legally competent to contract under the Indian Contract Act, 1872.</li>
            </ul>
          </div>
        </section>

        {/* 7. Grievance Redressal Officer Contact Details */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-blue-600 text-white text-sm font-black flex items-center justify-center">7</span>
            <span>Grievance Redressal Mechanism &amp; Officer • शिकायत निवारण अधिकारी</span>
          </h2>
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-5">
            <div className="space-y-1">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                Statutory Publication • Section 13, DPDP Act 2023
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Data Protection &amp; Grievance Redressal Officer
              </h3>
              <p className="text-xs text-slate-300">
                If you have any questions, concerns, complaints, or wish to exercise your data principal rights, you may directly reach out to our designated officer:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-slate-400 font-bold uppercase tracking-wider text-[11px]">Officer Profile</div>
                <div className="text-base font-black text-white">Mr. Dhananjay Vishwakarma</div>
                <div className="text-slate-300 font-medium">Data Protection &amp; Grievance Redressal Officer</div>
                <div className="text-slate-400 text-[11px]">Platform: QR Print Seva (qrprintseva.in)</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-slate-400 font-bold uppercase tracking-wider text-[11px]">Direct Official Contact</div>
                <div className="flex items-center gap-2 text-slate-200">
                  <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <a href="mailto:dpo@qrprintseva.in" className="hover:text-blue-400 font-mono font-bold">
                    dpo@qrprintseva.in
                  </a>
                </div>
                <div className="flex items-center gap-2 text-slate-200">
                  <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <a href="mailto:grievance@qrprintseva.in" className="hover:text-blue-400 font-mono">
                    grievance@qrprintseva.in
                  </a>
                </div>
                <div className="flex items-start gap-2 text-slate-300 pt-1">
                  <MapPin className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                  <span>Near Railway Station Road, Gorakhpur, Uttar Pradesh - 273001, India</span>
                </div>
              </div>
            </div>

            {/* SLA Escalation Pathway */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <Clock className="w-4 h-4" />
                <span>Statutory Response SLA &amp; Escalation Pathway</span>
              </div>
              <ul className="list-disc pl-5 space-y-1 text-slate-300">
                <li><strong>Acknowledgement:</strong> All grievances are acknowledged within <strong>24 to 48 hours</strong> with a unique tracking ticket.</li>
                <li><strong>Resolution Timeline:</strong> Complete investigation and resolution will be provided within <strong>30 days</strong> from the receipt of the complaint.</li>
                <li><strong>Appellate Authority:</strong> If you are not satisfied with our resolution, or if we fail to respond within the prescribed period, you have the statutory right under Section 13(3) of the DPDP Act 2023 to register a complaint with the <strong>Data Protection Board of India (DPBI)</strong>.</li>
              </ul>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
