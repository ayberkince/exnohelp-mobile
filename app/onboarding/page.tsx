'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function OnboardingWizard() {
  const [step, setStep] = useState(1); // 1: Role, 2: Profile, 3: Emergency, 4: Safety
  const [role, setRole] = useState<'CLIENT' | 'HELPER' | null>(null);
  const [formData, setFormData] = useState({
    city: '',
    district: '',
    emergencyName: '',
    emergencyPhone: '',
  });
  const router = useRouter();

  const handleComplete = async () => {
    // This calls your update-role API but we can expand it to save everything
    await fetch('/api/user/update-role', {
      method: 'POST',
      body: JSON.stringify({ ...formData, role }),
    });
    router.push(role === 'CLIENT' ? '/client' : '/helper');
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8">
        
        {/* STEP 1: ROLE SELECTION */}
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-4">
            <h2 className="text-2xl font-bold mb-2">Welcome to Exnohelp</h2>
            <p className="text-gray-500 mb-8">How will you use the platform?</p>
            <div className="space-y-4">
              <button onClick={() => { setRole('CLIENT'); setStep(2); }} className="w-full p-4 border-2 rounded-xl hover:border-emerald-500 text-left">
                <span className="block font-bold">I need help</span>
                <span className="text-xs text-gray-500">I'm looking for appointment support.</span>
              </button>
              <button onClick={() => { setRole('HELPER'); setStep(2); }} className="w-full p-4 border-2 rounded-xl hover:border-blue-500 text-left">
                <span className="block font-bold">I want to help</span>
                <span className="text-xs text-gray-500">I want to earn by supporting others.</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: BASIC PROFILE (City/District) */}
        {step === 2 && (
          <div className="animate-in fade-in">
            <h2 className="text-2xl font-bold mb-6">Where are you located?</h2>
            <div className="space-y-4">
              <input 
                placeholder="City (e.g. Istanbul)" 
                className="w-full p-3 border rounded-xl"
                onChange={(e) => setFormData({...formData, city: e.target.value})}
              />
              <input 
                placeholder="District (e.g. Kadıköy)" 
                className="w-full p-3 border rounded-xl"
                onChange={(e) => setFormData({...formData, district: e.target.value})}
              />
              <button onClick={() => setStep(3)} className="w-full py-3 bg-black text-white rounded-xl font-bold">Continue</button>
            </div>
          </div>
        )}

        {/* STEP 3: EMERGENCY CONTACT (Trust Step) */}
        {step === 3 && (
          <div className="animate-in fade-in">
            <h2 className="text-2xl font-bold mb-2">Emergency Contact</h2>
            <p className="text-sm text-gray-500 mb-6">This keeps the community safe.</p>
            <div className="space-y-4">
              <input 
                placeholder="Contact Name" 
                className="w-full p-3 border rounded-xl"
                onChange={(e) => setFormData({...formData, emergencyName: e.target.value})}
              />
              <input 
                placeholder="Phone Number" 
                className="w-full p-3 border rounded-xl"
                onChange={(e) => setFormData({...formData, emergencyPhone: e.target.value})}
              />
              <button onClick={() => setStep(4)} className="w-full py-3 bg-black text-white rounded-xl font-bold">Continue</button>
            </div>
          </div>
        )}

        {/* STEP 4: SAFETY BOUNDARIES */}
        {step === 4 && (
          <div className="animate-in fade-in">
            <div className="bg-red-50 p-4 rounded-2xl mb-6">
              <h2 className="text-red-900 font-bold mb-2">Safety First</h2>
              <p className="text-red-700 text-sm">
                Exnohelp is <strong>strictly non-medical</strong>. Helpers cannot give medicine, medical advice, or physical care.
              </p>
            </div>
            <button onClick={handleComplete} className="w-full py-4 bg-emerald-600 text-white rounded-xl font-bold shadow-lg shadow-emerald-200">
              I Understand & Finish
            </button>
          </div>
        )}

      </div>
    </div>
  );
}