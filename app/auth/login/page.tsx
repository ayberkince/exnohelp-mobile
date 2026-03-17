'use client';

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("maria@example.com");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Call the NextAuth sign-in function
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false, // We handle the redirect manually below
    });

    if (result?.error) {
      setError("Invalid email or password.");
      setIsLoading(false);
    } else {
      // If successful, send them to the homepage (we will build role-based routing next!)
      router.push("/");
      router.refresh();
    }
  };

  return (
    <main className="min-h-screen bg-stone-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-sm border border-stone-200 p-8">
        
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-stone-900 text-white rounded-xl flex items-center justify-center mx-auto mb-4 text-xl font-bold">
            B.
          </div>
          <h1 className="text-2xl font-black text-stone-900">Welcome Back</h1>
          <p className="text-stone-500 text-sm mt-2">Log in to manage your bookings and account.</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-xl text-sm font-bold mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-stone-700 mb-2">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 border border-stone-200 rounded-xl bg-stone-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-stone-700 mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 border border-stone-200 rounded-xl bg-stone-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-stone-900 text-white rounded-xl font-bold hover:bg-stone-800 transition-colors disabled:opacity-50"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-stone-100 text-center">
          <p className="text-sm text-stone-500 mb-4">Try logging in as:</p>
          <div className="flex justify-center gap-2 text-xs font-bold">
            <button onClick={() => setEmail('maria@example.com')} className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-md hover:bg-emerald-100">Client</button>
            <button onClick={() => setEmail('sarah@example.com')} className="px-3 py-1 bg-amber-50 text-amber-700 rounded-md hover:bg-amber-100">Helper</button>
            <button onClick={() => setEmail('admin@exnohelp.com')} className="px-3 py-1 bg-red-50 text-red-700 rounded-md hover:bg-red-100">Admin</button>
          </div>
        </div>

      </div>
    </main>
  );
}