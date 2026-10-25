"use client";

import React from "react";
import Link from "next/link";
import {
  FileText,
  ShieldCheck,
  Scale,
  AlertTriangle,
  ArrowLeft,
  Globe,
  Building,
  CheckCircle2,
  Lock,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function TermsOfServicePage() {
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
              href="/privacy"
              className="px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold hover:bg-blue-100 transition shadow-sm"
            >
              <span>{language === "hi" ? "गोपनीयता नीति" : "Privacy Notice"}</span>
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
            <strong>[PENDING FINAL OPINION BY QUALIFIED INDIAN ADVOCATE / LEGAL COUNSEL]:</strong>{" "}
            These Terms of Service constitute a legally binding agreement under the Indian Contract Act, 1872, the Information Technology Act, 2000, and the Digital Personal Data Protection Act, 2023. These clauses must be reviewed and vetted by legal counsel prior to commercial launch.
          </p>
        </div>

        {/* Header */}
        <div className="border-b border-slate-200 pb-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-800 text-xs font-bold">
            <Scale className="w-4 h-4 text-blue-600" />
            <span>Legally Binding Agreement • सेवा की शर्तें</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">
            {language === "hi"
              ? "सेवा की शर्तें व नियम (Terms of Service)"
              : "Terms of Service & Data Protection Agreement"}
          </h1>

          <div className="flex items-center gap-4 text-xs font-medium text-slate-500 flex-wrap">
            <span><strong>Effective Date:</strong> October 25, 2026</span>
            <span>•</span>
            <span><strong>Version:</strong> 1.0 (DPDP Act Compliance Edition)</span>
            <span>•</span>
            <span><strong>Jurisdiction:</strong> Gorakhpur (Uttar Pradesh), India</span>
          </div>
        </div>

        {/* Section 1: Acceptance & Eligibility */}
        <section className="space-y-3">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-blue-600 text-white text-xs font-black flex items-center justify-center">1</span>
            <span>Acceptance of Terms &amp; Eligibility</span>
          </h2>
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <p>
              By accessing, browsing, registering for an account, or utilizing the services provided by <strong>QR Print Seva</strong> (&quot;Platform&quot;, &quot;we&quot;, &quot;us&quot;, &quot;our&quot;), you (&quot;Subscriber&quot;, &quot;Shopkeeper&quot;, &quot;Customer&quot;, or &quot;User&quot;) agree to be bound by these Terms of Service.
            </p>
            <p>
              You represent and warrant that you are at least 18 years of age and legally competent to enter into binding agreements under the <strong>Indian Contract Act, 1872</strong>. If you are registering on behalf of a business entity (such as a Cyber Cafe, CSC Jan Seva Kendra, or Xerox enterprise), you warrant that you hold the requisite authority to bind that entity.
            </p>
          </div>
        </section>

        {/* Section 2: Platform Description & Service Scope */}
        <section className="space-y-3">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-blue-600 text-white text-xs font-black flex items-center justify-center">2</span>
            <span>Platform Description &amp; Technical Scope</span>
          </h2>
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <p>
              QR Print Seva provides cloud-orchestrated silent print queuing, dynamic QR code standee generation, and shop spooler synchronization for retail print shops.
            </p>
            <p>
              <strong>Nature of Customer Transactions:</strong> All financial payments for physical print jobs are conducted directly between the customer and the shopkeeper via Unified Payments Interface (UPI) or direct counter cash. QR Print Seva is <strong>NOT</strong> an escrow agent, payment aggregator, or middleman, and charges 0% transaction commission on customer printing fees.
            </p>
          </div>
        </section>

        {/* Section 3: DATA PROTECTION CLAUSE (DPDP ACT 2023) */}
        <section className="space-y-3">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-blue-600 text-white text-xs font-black flex items-center justify-center">3</span>
            <span>Data Protection &amp; DPDP Act Compliance Clause</span>
          </h2>
          <div className="p-6 sm:p-7 rounded-3xl bg-blue-50/70 border-2 border-blue-200 shadow-sm space-y-4 text-xs sm:text-sm text-blue-950 leading-relaxed">
            <div className="flex items-center gap-2 font-black text-base text-blue-900">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              <span>Mandatory Data Protection Covenants (Section 8, DPDP Act 2023)</span>
            </div>

            <p>
              Both QR Print Seva and the Shopkeeper Subscriber acknowledge their respective statutory obligations under the <strong>Digital Personal Data Protection Act, 2023</strong> (Republic of India) and the <strong>Information Technology Act, 2000</strong>:
            </p>

            <div className="space-y-3 pt-1">
              <div className="p-4 rounded-2xl bg-white border border-blue-100 space-y-1.5">
                <strong className="block text-slate-900 text-xs">A. Allocation of Data Roles:</strong>
                <p className="text-xs text-slate-600 leading-relaxed">
                  QR Print Seva acts as a <strong>Data Fiduciary</strong> regarding the personal data of shopkeeper accounts. In relation to documents uploaded by end-customers at the shop counter, QR Print Seva operates as a <strong>Data Processor</strong> providing an ephemeral, encrypted technical transit conduit, while the Shopkeeper functions as the principal service provider and local custodian of physical prints.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-blue-100 space-y-1.5">
                <strong className="block text-slate-900 text-xs">B. Shopkeeper&apos;s Strict Confidentiality Obligations:</strong>
                <p className="text-xs text-slate-600 leading-relaxed">
                  The Shopkeeper explicitly agrees, covenants, and warrants that:
                </p>
                <ul className="list-disc pl-5 text-xs text-slate-600 space-y-1">
                  <li>They shall <strong>NEVER</strong> retain, archive, duplicate, photocopy without permission, or store copies of sensitive customer documents (including Aadhaar cards, PAN cards, voter identification, bank statements, educational certificates, or legal deeds).</li>
                  <li>All physical printouts must be handed directly and exclusively to the authentic customer who initiated the print order.</li>
                  <li>Any misprinted, spoiled, or abandoned printed pages containing personal data must be shredded or disposed of immediately in a secure manner.</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-blue-100 space-y-1.5">
                <strong className="block text-slate-900 text-xs">C. Zero Permanent Server Storage Architecture:</strong>
                <p className="text-xs text-slate-600 leading-relaxed">
                  The Platform confirms that digital file payloads submitted by customers are processed purely in ephemeral RAM/spool buffers and are automatically and irrevocably purged immediately upon successful print spooling or upon session expiration (maximum 15 minutes).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-blue-100 space-y-1.5">
                <strong className="block text-slate-900 text-xs">D. Mandatory Breach Notification Covenant:</strong>
                <p className="text-xs text-slate-600 leading-relaxed">
                  If either party identifies or reasonably suspects a personal data breach affecting customers or account records, they must immediately report the incident to our Grievance &amp; Data Protection Officer at <a href="mailto:dpo@qrprintseva.in" className="text-blue-600 font-bold underline">dpo@qrprintseva.in</a> to facilitate statutory reporting to the <strong>Data Protection Board of India (DPBI)</strong> and affected Data Principals within the prescribed 72-hour timeline under Section 8(6) of the DPDP Act.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Customer Commitments & Unlawful Content */}
        <section className="space-y-3">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-blue-600 text-white text-xs font-black flex items-center justify-center">4</span>
            <span>Customer Commitments &amp; Prohibited Content</span>
          </h2>
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <p>
              Users shall not upload, transmit, or attempt to print any material that:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>Infringes upon any third-party intellectual property rights, copyright, or trademark.</li>
              <li>Constitutes forged, fraudulent, or counterfeit documentation, including counterfeit currency notes, unauthorized government seals, or forged official credentials.</li>
              <li>Contains sexually explicit, obscene, or defamatory content in violation of Section 67 / 67A of the Information Technology Act, 2000 or the Bharatiya Nyaya Sanhita, 2023.</li>
              <li>Contains malicious software, viruses, corrupted PDF bombs, or code designed to disrupt shop computer systems.</li>
            </ul>
          </div>
        </section>

        {/* Section 5: Subscription Pricing & Account Cancellation */}
        <section className="space-y-3">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-blue-600 text-white text-xs font-black flex items-center justify-center">5</span>
            <span>Subscriptions, Billing &amp; Refunds</span>
          </h2>
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <p>
              Shopkeepers subscribe to software license tiers (Monthly, Yearly, or Lifetime License). Pricing is dynamically published on our official website. All fees are non-refundable once the digital license key has been activated, except where mandated by statutory consumer protection provisions.
            </p>
            <p>
              We provide a full-featured <strong>24-Hour Free Demo Trial</strong> allowing shopkeepers to test printer compatibility, spooling speeds, and QR generation prior to purchasing any commercial plan.
            </p>
          </div>
        </section>

        {/* Section 6: Indemnity & Limitation of Liability */}
        <section className="space-y-3">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-blue-600 text-white text-xs font-black flex items-center justify-center">6</span>
            <span>Indemnity &amp; Limitation of Liability</span>
          </h2>
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <p>
              <strong>Indemnity:</strong> The Shopkeeper agrees to indemnify, defend, and hold harmless QR Print Seva, its directors, developers, and partners against any claims, fines, liabilities, legal costs, or damages arising out of: (a) physical mismanagement, theft, or unauthorized retention of customer documents at the shop premises; (b) failure to properly verify customer ownership prior to print handover; or (c) violation of the DPDP Act 2023 committed by the shopkeeper or their staff.
            </p>
            <p>
              <strong>Limitation of Liability:</strong> In no event shall QR Print Seva be liable for indirect, incidental, punitive, or consequential damages (including loss of business, printer hardware malfunctions, or ink exhaustion) arising out of the use of our software. Our total aggregate liability under these terms shall not exceed the subscription fees paid by you in the three (3) months preceding the claim.
            </p>
          </div>
        </section>

        {/* Section 7: Governing Law & Dispute Resolution */}
        <section className="space-y-3">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-blue-600 text-white text-xs font-black flex items-center justify-center">7</span>
            <span>Governing Law &amp; Jurisdiction</span>
          </h2>
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <p>
              These Terms shall be governed by, interpreted, and construed exclusively in accordance with the <strong>laws of the Republic of India</strong>.
            </p>
            <p>
              Any dispute, controversy, or claim arising out of or relating to these Terms shall be subject to the exclusive jurisdiction of the competent courts located in <strong>Gorakhpur, Uttar Pradesh, India</strong>.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
