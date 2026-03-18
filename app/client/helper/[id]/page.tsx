import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const prisma = new PrismaClient();

export default async function BrowseHelpersPage() {
  const session = await getServerSession(authOptions);

  // Fetch all users who are Helpers AND have an approved profile
  const helpers = await prisma.user.findMany({
    where: { 
      role: "HELPER",
      helperProfile: {
        verificationStatus: "APPROVED"
      }
    },
    include: { helperProfile: true }
  });

  return (
    <main className="min-h-screen bg-stone-50 pb-20">
      <div className="max-w-5xl mx-auto p-6 space-y-8">
        
        <header className="mt-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-black text-stone-900">Verified Helpers</h1>
            <p className="text-stone-500 mt-2">Browse trusted companions in your area and invite them to help.</p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {helpers.map((helper) => (
            <div key={helper.id} className="bg-white p-6 rounded-3xl shadow-sm border border-stone-200 text-center flex flex-col items-center transition-all hover:border-emerald-300 hover:shadow-md">
              
              {/* Profile Avatar */}
              <div className="w-20 h-20 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-2xl font-black mb-4 border-4 border-white shadow-sm">
                {helper.name?.charAt(0) || "H"}
              </div>

              {/* Helper Info */}
              <h3 className="text-xl font-bold text-stone-900">{helper.name}</h3>
              <div className="flex items-center gap-1 mt-1 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <p className="text-xs font-bold text-stone-500 tracking-wider uppercase">Background Checked</p>
              </div>

              <p className="text-sm text-stone-600 mb-6">
                📍 {helper.helperProfile?.district}, {helper.helperProfile?.city}
              </p>

              {/* Invite Button */}
              <button className="w-full py-3 bg-stone-900 text-white font-bold rounded-xl hover:bg-stone-800 transition-colors">
                Send Invitation
              </button>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}