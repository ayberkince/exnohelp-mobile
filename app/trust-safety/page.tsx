import { AppHeader } from "@/components/shared/AppHeader";
import { Card, CardContent } from "@/components/ui/card";
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Phone,
  Info,
} from "lucide-react";

export default function TrustAndSafetyCenter() {
  return (
    <main className="flex-1 overflow-y-auto bg-stone-50 pb-[calc(32px+env(safe-area-inset-bottom))]">
      <AppHeader title="Trust & Safety" />

      <div className="p-5 space-y-8">
        {/* Header */}
        <div className="text-center space-y-3 py-6">
          <div className="w-20 h-20 bg-teal-900 rounded-[24px] flex items-center justify-center mx-auto mb-6 shadow-[0_8px_30px_rgba(13,148,136,0.2)]">
            <ShieldAlert className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-display font-medium text-stone-800 tracking-tight">
            Safety First
          </h2>
          <p className="text-stone-500 text-sm max-w-[280px] mx-auto leading-relaxed">
            Clear boundaries and verified users make Begleit a safe space for
            everyone.
          </p>
        </div>

        {/* Core Rules */}
        <section className="space-y-4">
          <h3 className="text-lg font-display font-medium text-stone-800 px-1">The Golden Rule</h3>
          <Card className="border-rose-200/60 bg-rose-50/50 shadow-none relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-rose-500" />
            <CardContent className="p-6 space-y-3">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-rose-900">
                    Strictly Non-Medical
                  </h4>
                  <p className="text-sm text-rose-800/80 mt-1.5 leading-relaxed">
                    Begleit is for companionship and practical support only.
                    Helpers are strictly prohibited from providing any form of
                    medical care, advice, or physical nursing.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Do's and Don'ts */}
        <section className="space-y-4">
          <h3 className="text-lg font-display font-medium text-stone-800 px-1">
            What Helpers Can Do
          </h3>
          <Card className="border-stone-100/80 shadow-[0_4px_24px_rgba(0,0,0,0.02)] overflow-hidden">
            <CardContent className="p-0 divide-y divide-stone-50">
              {[
                "Accompany you to and from appointments",
                "Wait with you in the waiting room",
                "Help organize non-medical paperwork",
                "Pick up groceries or pharmacy items",
                "Provide calm, emotional companionship",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-5 hover:bg-stone-50 transition-colors">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span className="text-sm font-medium text-stone-700">{item}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <h3 className="text-lg font-display font-medium text-stone-800 px-1 mt-8">
            What Helpers CANNOT Do
          </h3>
          <Card className="border-stone-100/80 shadow-[0_4px_24px_rgba(0,0,0,0.02)] overflow-hidden">
            <CardContent className="p-0 divide-y divide-stone-50">
              {[
                "Give medical advice or diagnoses",
                "Administer medication of any kind",
                "Perform nursing tasks or wound care",
                "Provide emergency transport",
                "Lift or physically transfer patients",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-5 hover:bg-stone-50 transition-colors">
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  <span className="text-sm font-medium text-stone-700">{item}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        {/* Verification */}
        <section className="space-y-4">
          <h3 className="text-lg font-display font-medium text-stone-800 px-1">
            How We Verify Helpers
          </h3>
          <Card className="border-stone-100/80 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
            <CardContent className="p-6 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-medium text-stone-900">
                    ID Verification
                  </h4>
                  <p className="text-sm text-stone-500 mt-1 leading-relaxed">
                    Government-issued ID check via secure third-party partner.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-medium text-stone-900">
                    Liveness Check
                  </h4>
                  <p className="text-sm text-stone-500 mt-1 leading-relaxed">
                    Real-time selfie matching to ensure identity.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-medium text-stone-900">
                    Community Guidelines
                  </h4>
                  <p className="text-sm text-stone-500 mt-1 leading-relaxed">
                    Mandatory agreement to non-medical rules and safety protocols.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Report an Issue */}
        <section className="space-y-4 pt-2">
          <h3 className="text-lg font-display font-medium text-stone-800 px-1">
            Report an Issue
          </h3>
          <Card className="border-stone-100/80 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow cursor-pointer">
            <CardContent className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-stone-50 flex items-center justify-center shrink-0">
                  <Info className="w-6 h-6 text-stone-600" />
                </div>
                <div>
                  <h4 className="font-medium text-stone-900">Contact Support</h4>
                  <p className="text-sm text-stone-500 mt-0.5">Report a violation or safety concern.</p>
                </div>
              </div>
              <span className="text-teal-700 font-medium text-sm bg-teal-50 px-4 py-2 rounded-full">Report</span>
            </CardContent>
          </Card>
        </section>

        {/* Emergency */}
        <section className="pt-4">
          <div className="bg-rose-600 rounded-[24px] p-6 text-white flex flex-col gap-4 shadow-[0_8px_30px_rgba(225,29,72,0.2)] relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-rose-500/50 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-start gap-4 relative z-10">
              <Phone className="w-6 h-6 text-rose-200 shrink-0 mt-1" />
              <div>
                <h4 className="font-medium text-lg">Medical Emergency?</h4>
                <p className="text-sm text-rose-100 mt-1.5 leading-relaxed">
                  Begleit helpers cannot assist with medical emergencies. If you or someone else needs immediate medical attention, call emergency services.
                </p>
              </div>
            </div>
            <a
              href="tel:112"
              className="bg-white text-rose-700 px-5 py-3.5 rounded-full text-center font-semibold hover:bg-rose-50 transition-colors w-full mt-2 relative z-10 shadow-sm"
            >
              Call 112 (Emergency Services)
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
