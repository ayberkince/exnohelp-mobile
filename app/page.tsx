import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50 p-6">
      <div className="max-w-md w-full flex flex-col items-center text-center">
        
        {/* Logo Section */}
        <div className="w-16 h-16 bg-[#0f4c3a] rounded-2xl flex items-center justify-center mb-6 shadow-sm">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>

        <h1 className="text-4xl font-bold text-stone-900 mb-3">Begleit</h1>
        <p className="text-stone-600 mb-8 max-w-xs">
          Trusted non-medical support for your appointments in Berlin.
        </p>

        {/* Trust Badge */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-100 flex items-start gap-3 mb-8 w-full text-left">
          <div className="text-emerald-600 mt-0.5">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-stone-900">Safe & Verified</p>
            <p className="text-xs text-stone-500">All helpers undergo ID checks and agree to strict non-medical boundaries.</p>
          </div>
        </div>

        {/* Authentication Buttons */}
        <div className="w-full space-y-3">
          <Link 
            href="/register" 
            className="w-full block text-center py-4 bg-[#0f4c3a] text-white rounded-2xl font-bold hover:bg-[#0a3629] transition-colors shadow-sm"
          >
            Create an Account
          </Link>
          <Link 
            href="/login" 
            className="w-full block text-center py-4 bg-white text-[#0f4c3a] border-2 border-stone-200 rounded-2xl font-bold hover:bg-stone-50 transition-colors"
          >
            Sign In
          </Link>
        </div>

        <p className="text-xs text-stone-400 mt-8 max-w-xs">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>

      </div>
    </div>
  );
}