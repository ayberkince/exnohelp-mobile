import { prisma } from "@/lib/prisma";
import { format } from "date-fns";

export default async function AdminBookingsPage() {
  const bookings = await prisma.booking.findMany({
    include: {
      client: { include: { user: { select: { name: true } } } },
      helper: { include: { user: { select: { name: true } } } },
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-black italic uppercase tracking-tighter">Global Bookings</h1>
      <div className="overflow-x-auto border-2 border-black rounded-xl">
        <table className="w-full text-left">
          <thead className="bg-stone-100 border-b-2 border-black">
            <tr>
              <th className="p-4 font-black">ID</th>
              <th className="p-4 font-black">Client</th>
              <th className="p-4 font-black">Helper</th>
              <th className="p-4 font-black">Status</th>
              <th className="p-4 font-black">Date</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="border-b border-stone-200 hover:bg-emerald-50 transition-colors">
                <td className="p-4 font-mono text-xs">{b.id}</td>
                <td className="p-4">{b.client.user?.name || "Unknown"}</td>
                <td className="p-4">{b.helper.user?.name || "Unknown"}</td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-black text-white text-[10px] font-bold rounded uppercase">
                    {b.status}
                  </span>
                </td>
                <td className="p-4 text-sm">
                  {format(new Date(b.scheduledAt), "dd/MM/yyyy")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}