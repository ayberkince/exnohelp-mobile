import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Clock, Globe, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { categories } from '@/data/dummy';

interface OpenRequestCardProps {
  request: any;
}

export function OpenRequestCard({ request }: OpenRequestCardProps) {
  const category = categories.find(c => c.id === request.serviceId);
  const dateObj = new Date(request.date);

  return (
    <Link href={`/helper/requests/${request.id}`} className="block">
      <Card className="border-stone-100/80 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow overflow-hidden bg-white">
        <div className="p-5 border-b border-stone-50">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14 rounded-[16px] overflow-hidden shrink-0 shadow-sm">
                <Image src={request.clientPhoto} alt={request.clientName} fill className="object-cover" referrerPolicy="no-referrer" />
              </div>
              <div>
                <h4 className="font-semibold text-stone-800 text-lg">{request.clientName}</h4>
                <p className="text-xs font-medium text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md inline-block mt-1">{category?.title || 'Support'}</p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="font-display font-semibold text-stone-800 text-xl">€{request.offeredPrice}</p>
              <Badge variant="secondary" className="mt-1 bg-stone-100 text-stone-500 font-medium text-[10px] px-2 py-0">
                {request.status.toUpperCase()}
              </Badge>
            </div>
          </div>
          
          <p className="text-sm text-stone-500 line-clamp-2 mb-5 leading-relaxed">
            "{request.notes}"
          </p>
          
          <div className="grid grid-cols-2 gap-y-3 gap-x-4">
            <div className="flex items-center gap-2.5 text-xs text-stone-600 font-medium">
              <Calendar className="w-4 h-4 text-stone-400 shrink-0" />
              <span className="truncate">{dateObj.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-stone-600 font-medium">
              <Clock className="w-4 h-4 text-stone-400 shrink-0" />
              <span>{dateObj.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })} ({request.durationHours}h)</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-stone-600 font-medium">
              <MapPin className="w-4 h-4 text-stone-400 shrink-0" />
              <span className="truncate">{request.district}</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-stone-600 font-medium">
              <Globe className="w-4 h-4 text-stone-400 shrink-0" />
              <span className="truncate">{request.languages.join(', ')}</span>
            </div>
          </div>
        </div>
        <div className="bg-stone-50/50 px-5 py-3.5 flex items-center justify-between">
          <span className="text-xs font-medium text-stone-500 uppercase tracking-wider">Tap to view details</span>
          <ChevronRight className="w-4 h-4 text-stone-400" />
        </div>
      </Card>
    </Link>
  );
}
