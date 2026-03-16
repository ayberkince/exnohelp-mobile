type AccountReviewProps = {
  status: 'SUSPENDED' | 'BANNED';
};

export function AccountReviewScreen({ status }: AccountReviewProps) {
  const isBanned = status === 'BANNED';

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden text-center p-8">
      {/* Alert Icon */}
      <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6 ${isBanned ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'}`}>
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>

      <h2 className="text-2xl font-bold text-stone-900 mb-3">
        {isBanned ? 'Account Permanently Restricted' : 'Account Under Review'}
      </h2>

      <p className="text-stone-600 mb-8 max-w-sm mx-auto">
        {isBanned
          ? 'After a thorough review, your account has been permanently removed for violating our Trust & Safety policies. Any pending payouts will be processed according to our terms.'
          : 'We are currently reviewing recent activity on your account. To protect the platform, access to booking features is temporarily paused until our Trust & Safety team completes their review.'}
      </p>

      <button 
        disabled={isBanned}
        className={`w-full py-4 rounded-xl font-bold transition-colors ${
          isBanned 
            ? 'bg-stone-100 text-stone-400 cursor-not-allowed' 
            : 'bg-stone-900 text-white shadow-md hover:bg-stone-800'
        }`}
      >
        {isBanned ? 'Action Final' : 'Contact Support'}
      </button>

      {!isBanned && (
        <p className="text-xs text-stone-400 mt-4">
          Reviews typically take 24-48 hours. Please check your email for details.
        </p>
      )}
    </div>
  );
}