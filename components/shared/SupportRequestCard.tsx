type RequestProps = {
  request: {
    id: string;
    title: string;
    categorySlug: string;
    city: string;
    district: string | null;
    requestedDate: Date;
    description: string | null;
  };
};

export function SupportRequestCard({ request }: RequestProps) {
  // 1. Create a safe date object
  const formattedDate = new Date(request.requestedDate);

  // 2. Format the date and time using Native JavaScript (No external libraries needed!)
  const dateString = new Intl.DateTimeFormat('en-US', { 
    month: 'short', 
    day: 'numeric' 
  }).format(formattedDate); // e.g., "Mar 16"

  const timeString = new Intl.DateTimeFormat('en-US', { 
    hour: 'numeric', 
    minute: '2-digit', 
    hour12: true 
  }).format(formattedDate); // e.g., "10:04 AM"

  return (
    <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full mb-2">
            {request.categorySlug}
          </span>
          <h3 className="text-lg font-bold text-stone-900">{request.title}</h3>
          <p className="text-sm text-stone-500 flex items-center gap-1 mt-1">
            📍 {request.district ? `${request.district}, ` : ''}{request.city}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold text-stone-900">{dateString}</p>
          <p className="text-xs text-stone-500">{timeString}</p>
        </div>
      </div>
      
      <p className="text-stone-600 text-sm line-clamp-2 mb-6">
        {request.description || "No additional details provided."}
      </p>

      <div className="flex gap-2">
        <button className="w-full py-3 bg-stone-900 text-white rounded-xl font-bold text-sm hover:bg-stone-800 transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
}