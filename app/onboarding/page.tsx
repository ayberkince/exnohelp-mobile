import Link from 'next/link';

export default function OnboardingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Exnohelp!</h1>
        <p className="text-gray-600 mb-8">How would you like to use the platform today?</p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Client Option */}
          <Link 
            href="/client" 
            className="block p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-md transition-all text-left"
          >
            <div className="text-3xl mb-4">🤝</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">I need support</h2>
            <p className="text-gray-500 text-sm">Find a trusted companion for everyday tasks, paperwork, or appointments.</p>
          </Link>

          {/* Helper Option */}
          <Link 
            href="/helper" 
            className="block p-6 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:shadow-md transition-all text-left"
          >
            <div className="text-3xl mb-4">🙌</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">I want to help</h2>
            <p className="text-gray-500 text-sm">Offer your time, support others in your community, and earn flexibly.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}