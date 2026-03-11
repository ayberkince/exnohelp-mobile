import { AppHeader } from "@/components/shared/AppHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, ArrowUpRight, ArrowDownRight, Download, Calendar } from "lucide-react";

export default function EarningsPage() {
  return (
    <main className="flex-1 overflow-y-auto bg-stone-50 pb-8">
      <AppHeader title="Earnings" />

      <div className="p-5 space-y-8">
        {/* Total Balance */}
        <section className="text-center py-6">
          <p className="text-sm font-medium text-stone-500 uppercase tracking-wider mb-2">Available Balance</p>
          <h2 className="text-5xl font-display font-medium text-stone-900 mb-6">€342.50</h2>
          <Button className="rounded-full px-8 h-12 shadow-[0_8px_30px_rgba(13,148,136,0.2)]">
            Withdraw Funds
          </Button>
        </section>

        {/* Summary Cards */}
        <section className="grid grid-cols-2 gap-4">
          <Card className="border-stone-100/80 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 text-emerald-600 mb-2">
                <ArrowUpRight className="w-4 h-4" />
                <span className="text-xs font-medium">This Month</span>
              </div>
              <p className="text-2xl font-display font-medium text-stone-800">€850.00</p>
            </CardContent>
          </Card>
          <Card className="border-stone-100/80 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 text-stone-500 mb-2">
                <Calendar className="w-4 h-4" />
                <span className="text-xs font-medium">Completed</span>
              </div>
              <p className="text-2xl font-display font-medium text-stone-800">12 Trips</p>
            </CardContent>
          </Card>
        </section>

        {/* Recent Transactions */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-lg font-display font-medium text-stone-800">Recent Transactions</h3>
            <button className="text-sm text-teal-800 font-medium flex items-center hover:text-teal-900 transition-colors">
              <Download className="w-4 h-4 mr-1.5" /> Statement
            </button>
          </div>

          <Card className="border-stone-100/80 shadow-[0_4px_24px_rgba(0,0,0,0.02)] overflow-hidden">
            <CardContent className="p-0 divide-y divide-stone-50">
              {[
                { name: "Anna Schmidt", date: "Today, 14:30", amount: "+€45.00", type: "Accompaniment" },
                { name: "Withdrawal to Bank", date: "Yesterday", amount: "-€150.00", type: "Transfer", isNegative: true },
                { name: "Michael Weber", date: "Oct 24, 10:00", amount: "+€60.00", type: "Waiting Support" },
                { name: "Sarah Meyer", date: "Oct 22, 16:15", amount: "+€35.00", type: "Errands" },
              ].map((tx, i) => (
                <div key={i} className="p-5 flex items-center justify-between hover:bg-stone-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${tx.isNegative ? 'bg-stone-100 text-stone-600' : 'bg-emerald-50 text-emerald-600'}`}>
                      {tx.isNegative ? <ArrowDownRight className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="font-medium text-stone-900">{tx.name}</p>
                      <p className="text-xs text-stone-500 mt-0.5">{tx.type} • {tx.date}</p>
                    </div>
                  </div>
                  <span className={`font-display font-medium ${tx.isNegative ? 'text-stone-900' : 'text-emerald-700'}`}>
                    {tx.amount}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
