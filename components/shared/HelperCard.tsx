type HelperCardProps = {
  name: string;
  district: string;
  rating: number;
  reviews: number;
  hourlyRate: number;
  languages: string[];
  isVerified: boolean;
};

export function HelperCard({
  name,
  district,
  rating,
  reviews,
  hourlyRate,
  languages,
  isVerified
}: HelperCardProps) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-stone-100 shadow-sm hover:border-emerald-200 transition-all flex gap-4 items-start">
      
      {/* Fake Avatar */}
      <div className="w-16 h-16 bg-stone-200 rounded-full flex items-center justify-center text-xl font-bold text-stone-500 shrink-0">
        {name.charAt(0)}
      </div>

      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-stone-900 flex items-center gap-1">
              {name}
              {isVerified && (
                <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
            </h3>
            <p className="text-sm text-stone-500">📍 {district}</p>
          </div>
          <div className="text-right">
            <p className="font-bold text-stone-900">€{hourlyRate}</p>
            <p className="text-xs text-stone-500">/ hour</p>
          </div>
        </div>

        <div className="mt-2 flex flex-wrap gap-2">
          {languages.map(lang => (
            <span key={lang} className="px-2 py-1 bg-stone-100 text-stone-600 text-xs rounded-md">
              {lang}
            </span>
          ))}
        </div>

        <div className="mt-3 flex items-center gap-2">
          <span className="text-sm font-bold text-stone-900">★ {rating}</span>
          <span className="text-xs text-stone-400">({reviews} reviews)</span>
        </div>
      </div>
    </div>
  );
}