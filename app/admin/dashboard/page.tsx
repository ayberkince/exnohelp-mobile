import { AdminDashboard } from "@/components/shared/AdminDashboard";
import { AnalyticsDashboard } from "@/components/shared/AnalyticsDashboard";

export default function AdminDashboardPage() {
  return (
    <main className="min-h-screen bg-stone-50 pb-20">
      <div className="max-w-5xl mx-auto p-6 space-y-8">
        
        <header className="mb-8">
          <h1 className="text-3xl font-black text-stone-900">Platform Command Center</h1>
          <p className="text-stone-500 mt-2">Manage operations, trust, and platform liquidity.</p>
        </header>

        {/* Day 10 Analytics */}
        <section>
          <AnalyticsDashboard />
        </section>

        {/* Day 8 Operations Queue */}
        <section>
          <AdminDashboard />
        </section>

      </div>
    </main>
  );
}