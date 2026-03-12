import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-slate-900">Platform Operations</h1>
      <p className="text-slate-600 mb-8">Manual trust and safety control center.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/admin/verifications" className="p-6 border rounded-xl hover:shadow-md transition">
          <h2 className="text-xl font-semibold text-sage-700">ID Verifications</h2>
          <p className="text-sm text-slate-500 mt-2">Review helper uploads and approve accounts.</p>
        </Link>
        
        <Link href="/admin/bookings" className="p-6 border rounded-xl hover:shadow-md transition">
          <h2 className="text-xl font-semibold text-sage-700">Active Bookings</h2>
          <p className="text-sm text-slate-500 mt-2">Monitor marketplace liquidity and statuses.</p>
        </Link>

        <Link href="/admin/reports" className="p-6 border rounded-xl hover:shadow-md transition border-red-100 bg-red-50">
          <h2 className="text-xl font-semibold text-red-700">Incident Reports</h2>
          <p className="text-sm text-red-500 mt-2">Manage safety flags and user suspensions.</p>
        </Link>

        <Link href="/admin/users" className="p-6 border rounded-xl hover:shadow-md transition">
          <h2 className="text-xl font-semibold text-sage-700">User Management</h2>
          <p className="text-sm text-slate-500 mt-2">View all registered clients and helpers.</p>
        </Link>
      </div>
    </div>
  );
}