import { getServerSession } from "next-auth";
import Link from "next/link";
import LogoutButton from "../../components/ui/logoutbutton"; // Ensure this matches your actual file path

export default async function ClientDashboard() {
  // Grab the session from our NextAuth bouncer
  const session = await getServerSession();
  const userName = session?.user?.name || "Guest";

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-12">
      {/* Top App Bar */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex-1"></div>
        <h1 className="text-lg font-semibold text-gray-900 flex-1 text-center">Home</h1>
        <div className="flex-1 flex justify-end">
          <LogoutButton />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 mt-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <p className="text-sm text-gray-500 uppercase tracking-widest font-semibold mb-1">
            Good Morning
          </p>
          <h2 className="text-4xl font-bold text-gray-900">{userName}</h2>
        </div>

        {/* Hero Card */}
        <div className="bg-gradient-to-r from-gray-900 to-[#10352A] rounded-3xl p-8 text-white shadow-lg relative overflow-hidden mb-6">
          <div className="relative z-10 max-w-sm">
            <h3 className="text-2xl font-bold mb-3">Need help today?</h3>
            <p className="text-gray-300 mb-6 text-sm leading-relaxed">
              Book a verified helper to accompany you safely to your appointment.
            </p>
            {/* UPDATED: Now links to the Request Wizard */}
            <Link 
              href="/client/request/new" 
              className="inline-block bg-white text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-sm text-sm"
            >
              Find a Helper
            </Link>
          </div>
          {/* Decorative background glow */}
          <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-emerald-500/20 to-transparent blur-3xl rounded-full translate-x-1/2"></div>
        </div>

        {/* Safety Warning Banner */}
        <div className="bg-red-50/80 border border-red-100 rounded-2xl p-5 flex items-start gap-4 mb-10">
          <div className="mt-0.5 text-red-500">
            {/* Shield Alert Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
          <div>
            <h4 className="font-semibold text-red-900 text-sm mb-1">Strictly Non-Medical Support</h4>
            <p className="text-red-700 text-sm mb-2">
              Helpers provide companionship and practical help only. They cannot offer medical care, advice, or physical nursing.
            </p>
            <Link href="/trust-safety" className="text-red-600 text-sm font-semibold hover:text-red-800 transition-colors">
              Read Safety Guidelines &rarr;
            </Link>
          </div>
        </div>

        {/* Services Grid */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">How can we help?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Card 1 - UPDATED TO LINK */}
            <Link href="/client/request/new" className="block bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all cursor-pointer group">
              <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-emerald-50 transition-colors">
                <svg className="w-5 h-5 text-gray-600 group-hover:text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </div>
              <h4 className="font-semibold text-gray-900">Appointment Accompaniment</h4>
            </Link>

            {/* Card 2 - UPDATED TO LINK */}
            <Link href="/client/request/new" className="block bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all cursor-pointer group">
              <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-emerald-50 transition-colors">
                <svg className="w-5 h-5 text-gray-600 group-hover:text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <h4 className="font-semibold text-gray-900">Waiting Support</h4>
            </Link>

            {/* Card 3 - UPDATED TO LINK */}
            <Link href="/client/request/new" className="block bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all cursor-pointer group">
              <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-emerald-50 transition-colors">
                <svg className="w-5 h-5 text-gray-600 group-hover:text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
              </div>
              <h4 className="font-semibold text-gray-900">Return-Home Help</h4>
            </Link>

            {/* Card 4 - UPDATED TO LINK */}
            <Link href="/client/request/new" className="block bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all cursor-pointer group">
              <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-emerald-50 transition-colors">
                <svg className="w-5 h-5 text-gray-600 group-hover:text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
              </div>
              <h4 className="font-semibold text-gray-900">Paperwork Assistance</h4>
            </Link>

          </div>
        </div>

      </main>
    </div>
  );
}