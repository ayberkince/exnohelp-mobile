'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppHeader } from "@/components/shared/AppHeader"; // Adjust import if needed

export default function NewRequestPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    category: '',
    date: '',
    time: '',
    city: '',
    district: '',
    title: '',
    description: ''
  });

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Request published successfully!");
        router.push('/client'); // Send back to dashboard
        router.refresh();
      } else {
        // THIS WILL NOW SHOW THE EXACT ERROR FROM THE BACKEND
        const errorText = await res.text();
        alert(`Server Error (${res.status}): ${errorText}`); 
      }
    } catch (error) {
      console.error(error);
      alert("Network error. Check console.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-stone-50 pb-20">
      {/* Fallback header if AppHeader isn't ready */}
      <header className="bg-white border-b border-stone-200 px-6 py-4 sticky top-0 z-10">
        <h1 className="text-xl font-bold text-stone-900">Create Request</h1>
      </header>

      <div className="max-w-md mx-auto p-6 mt-4">
        <div className="bg-white rounded-3xl shadow-sm p-8 border border-stone-100">
          
          {/* STEP 1: CATEGORY */}
          {step === 1 && (
            <div className="animate-in fade-in">
              <h2 className="text-2xl font-bold mb-2 text-stone-900">What kind of support do you need?</h2>
              <p className="text-stone-500 mb-6">Choose the type of non-medical support.</p>
              
              <div className="space-y-3">
                {['Accompaniment', 'Waiting Support', 'Paperwork Help', 'General Companionship'].map((cat) => (
                  <button 
                    key={cat}
                    onClick={() => setFormData({...formData, category: cat})}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      formData.category === cat ? 'border-emerald-600 bg-emerald-50' : 'border-stone-100 hover:border-emerald-200'
                    }`}
                  >
                    <span className="font-semibold text-stone-800">{cat}</span>
                  </button>
                ))}
              </div>
              <button 
                disabled={!formData.category}
                onClick={() => setStep(2)} 
                className="w-full mt-8 py-4 bg-stone-900 text-white rounded-xl font-bold disabled:opacity-50"
              >
                Continue
              </button>
            </div>
          )}

          {/* STEP 2: DATE & TIME */}
          {step === 2 && (
            <div className="animate-in fade-in">
              <h2 className="text-2xl font-bold mb-2 text-stone-900">When do you need support?</h2>
              <div className="space-y-4 mt-6">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Date</label>
                  <input 
                    type="date" 
                    className="w-full p-3 border border-stone-200 rounded-xl"
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Start Time</label>
                  <input 
                    type="time" 
                    className="w-full p-3 border border-stone-200 rounded-xl"
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <button onClick={() => setStep(1)} className="w-1/3 py-4 bg-stone-100 text-stone-700 rounded-xl font-bold">Back</button>
                  <button onClick={() => setStep(3)} disabled={!formData.date || !formData.time} className="w-2/3 py-4 bg-stone-900 text-white rounded-xl font-bold disabled:opacity-50">Continue</button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: LOCATION & DETAILS */}
          {step === 3 && (
            <div className="animate-in fade-in">
              <h2 className="text-2xl font-bold mb-2 text-stone-900">Where and What?</h2>
              <div className="space-y-4 mt-6">
                <div className="flex gap-2">
                  <input placeholder="City" className="w-1/2 p-3 border border-stone-200 rounded-xl" onChange={(e) => setFormData({...formData, city: e.target.value})} />
                  <input placeholder="District" className="w-1/2 p-3 border border-stone-200 rounded-xl" onChange={(e) => setFormData({...formData, district: e.target.value})} />
                </div>
                <input placeholder="Short Title (e.g. Dentist Trip)" className="w-full p-3 border border-stone-200 rounded-xl" onChange={(e) => setFormData({...formData, title: e.target.value})} />
                <textarea placeholder="Describe how the helper can assist you (non-medical only)..." rows={3} className="w-full p-3 border border-stone-200 rounded-xl" onChange={(e) => setFormData({...formData, description: e.target.value})} />
                
                <div className="bg-emerald-50 p-4 rounded-xl mt-4 border border-emerald-100">
                  <p className="text-sm text-emerald-800 font-medium">Safety Reminder: Helpers provide practical support only. No medical care.</p>
                </div>

                <div className="flex gap-2 pt-2">
                  <button onClick={() => setStep(2)} className="w-1/3 py-4 bg-stone-100 text-stone-700 rounded-xl font-bold">Back</button>
                  <button onClick={handleSubmit} disabled={isLoading || !formData.city || !formData.title} className="w-2/3 py-4 bg-emerald-600 text-white rounded-xl font-bold shadow-lg shadow-emerald-200 disabled:opacity-50">
                    {isLoading ? 'Publishing...' : 'Publish Request'}
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}