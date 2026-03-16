'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    surname: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        // Success! Send them to login
        router.push('/login');
      } else {
        const errorText = await res.text();
        setError(`Error: ${errorText}`);
      }
    } catch (err) {
      console.error(err);
      setError('Network error. Check your internet connection.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-stone-100 p-8">
        <h1 className="text-2xl font-bold text-center text-stone-900 mb-6">Create Account</h1>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm text-stone-600 mb-1">First Name</label>
              <input 
                type="text" required
                className="w-full p-3 border border-stone-200 rounded-xl"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm text-stone-600 mb-1">Surname</label>
              <input 
                type="text" required
                className="w-full p-3 border border-stone-200 rounded-xl"
                value={formData.surname}
                onChange={(e) => setFormData({...formData, surname: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-stone-600 mb-1">Email</label>
            <input 
              type="email" required
              className="w-full p-3 border border-stone-200 rounded-xl"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm text-stone-600 mb-1">Password</label>
            <input 
              type="password" required
              className="w-full p-3 border border-stone-200 rounded-xl"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full py-4 mt-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-stone-600">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 font-semibold">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}