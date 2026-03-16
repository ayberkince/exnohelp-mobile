type Transaction = {
  id: string;
  date: string;
  clientName: string;
  amount: number;
  status: 'PENDING' | 'PAID_OUT' | 'HELD';
};

type HelperEarningsProps = {
  totalEarned: number;
  pendingAmount: number;
  transactions: Transaction[];
};

export function HelperEarnings({ totalEarned, pendingAmount, transactions }: HelperEarningsProps) {
  
  // Helper function to color-code the financial states!
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PAID_OUT':
        return <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-md">Paid Out</span>;
      case 'PENDING':
        return <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-md">Pending</span>;
      case 'HELD':
        return <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-md">Held for Review</span>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden">
      
      {/* Header section with total balances */}
      <div className="bg-[#0f4c3a] p-6 text-white">
        <h2 className="text-xl font-bold">Your earnings</h2>
        <p className="text-emerald-100 text-sm mt-1">Track upcoming, pending, and completed payouts.</p>
        
        <div className="flex gap-6 mt-6">
          <div>
            <p className="text-emerald-200 text-xs uppercase tracking-wider font-semibold mb-1">Total Earned</p>
            <p className="text-3xl font-bold">€{totalEarned.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-emerald-200 text-xs uppercase tracking-wider font-semibold mb-1">Expected Soon</p>
            <p className="text-3xl font-bold text-emerald-100">€{pendingAmount.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Transaction History List */}
      <div className="p-6">
        <h3 className="font-bold text-stone-900 mb-4">Recent Transactions</h3>
        
        <div className="space-y-4">
          {transactions.map((tx) => (
            <div key={tx.id} className="flex justify-between items-center border-b border-stone-100 pb-4 last:border-0 last:pb-0">
              <div>
                <p className="font-semibold text-stone-900">{tx.clientName}</p>
                <p className="text-xs text-stone-500">{tx.date}</p>
              </div>
              <div className="text-right flex flex-col items-end gap-1">
                <p className="font-bold text-stone-900">€{tx.amount.toFixed(2)}</p>
                {getStatusBadge(tx.status)}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Safety / Info Notice */}
      <div className="bg-stone-50 p-4 border-t border-stone-100 text-center">
        <p className="text-xs text-stone-500">
          Payouts are typically released 24 hours after a completed booking to ensure client satisfaction.
        </p>
      </div>

    </div>
  );
}