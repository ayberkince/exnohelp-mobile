'use client';

import { selectUserRole } from "@/app/actions/onboarding";
import { useState } from "react";
import { Role } from "@prisma/client";

export default function RoleSelectionUI() {
  const [loading, setLoading] = useState<Role | null>(null);

  const handleRoleSelect = async (role: Role) => {
    setLoading(role);
    try {
      await selectUserRole(role);
      // The page will re-evaluate via revalidatePath in the action
    } catch (error) {
      alert("Something went wrong. Please try again.");
      setLoading(null);
    }
  };

  return (
    <main className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-stone-900 tracking-tight">How will you use Platform?</h1>
          <p className="text-stone-500 text-lg">Choose your path to get started.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Client Option */}
          <button 
            disabled={!!loading}
            onClick={() => handleRoleSelect("CLIENT")}
            className="group p-8 bg-white border-2 border-stone-200 rounded-3xl hover:border-emerald-500 transition-all text-left shadow-sm hover:shadow-md disabled:opacity-50"
          >
            <span className="text-4xl mb-4 block group-hover:scale-110 transition-transform">🙋‍♀️</span>
            <h3 className="text-xl font-bold text-stone-900">I need support</h3>
            <p className="text-stone-500 mt-2 text-sm leading-relaxed">
              I'm looking for a trusted helper to accompany me or a loved one to appointments.
            </p>
            {loading === "CLIENT" && <span className="text-emerald-600 text-xs font-bold mt-4 block">Updating...</span>}
          </button>

          {/* Helper Option */}
          <button 
            disabled={!!loading}
            onClick={() => handleRoleSelect("HELPER")}
            className="group p-8 bg-white border-2 border-stone-200 rounded-3xl hover:border-emerald-500 transition-all text-left shadow-sm hover:shadow-md disabled:opacity-50"
          >
            <span className="text-4xl mb-4 block group-hover:scale-110 transition-transform">🤝</span>
            <h3 className="text-xl font-bold text-stone-900">I want to help</h3>
            <p className="text-stone-500 mt-2 text-sm leading-relaxed">
              I want to earn extra income by providing non-medical support and companionship.
            </p>
            {loading === "HELPER" && <span className="text-emerald-600 text-xs font-bold mt-4 block">Updating...</span>}
          </button>
        </div>
      </div>
    </main>
  );
}