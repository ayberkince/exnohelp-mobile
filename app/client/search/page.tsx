import { AppHeader } from '@/components/shared/AppHeader';
import { helpers } from '@/data/dummy';
import { Card } from '@/components/ui/card';
import { Star, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { TrustBadge } from '@/components/shared/TrustBadge';

export default function SearchHelpers() {
  return (
    <main className="flex-1 flex flex-col bg-stone-50">
      <AppHeader title="Find a Helper" />
      
      {/* Search & Filters */}
      <div className="px-5 py-4 bg-stone-50/80 backdrop-blur-xl border-b border-stone-200/50 sticky top-[calc(64px+env(safe-area-inset-top))] z-30">
        <div className="flex gap-2.5 overflow-x-auto hide-scrollbar pb-1">
          {['All', 'Accompaniment', 'Waiting', 'Languages', 'Top Rated'].map((filter, i) => (
            <button key={filter} className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${i === 0 ? 'bg-stone-800 text-white' : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-100'}`}>
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-5 pb-[calc(100px+env(safe-area-inset-bottom))]">
        {helpers.map((helper) => {
          const isAvailableToday = helper.availability.toLowerCase().includes('today');
          const isAvailableTomorrow = helper.availability.toLowerCase().includes('tomorrow');
          
          let availabilityClass = "text-stone-600 font-medium bg-stone-100 px-3 py-1.5 rounded-xl";
          if (isAvailableToday) {
            availabilityClass = "text-emerald-800 font-medium bg-emerald-50/80 px-3 py-1.5 rounded-xl border border-emerald-100/50";
          } else if (isAvailableTomorrow) {
            availabilityClass = "text-teal-800 font-medium bg-teal-50/80 px-3 py-1.5 rounded-xl border border-teal-100/50";
          }

          return (
          <Link key={helper.id} href={`/client/helper/${helper.id}`} className="block">
            <Card className="overflow-hidden hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow">
              <div className="p-5">
                <div className="flex gap-5">
                  <div className="relative w-24 h-24 rounded-[24px] overflow-hidden shrink-0 shadow-sm">
                    <Image src={helper.photo} alt={helper.firstName} fill className="object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-display font-medium text-stone-800 text-xl">{helper.firstName} {helper.lastName}</h3>
                        <div className="flex items-center gap-1.5 text-sm text-stone-500 mt-1">
                          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                          <span className="font-medium text-stone-700">{helper.rating}</span>
                          <span>({helper.reviewsCount} reviews)</span>
                        </div>
                      </div>
                      <span className="font-medium text-stone-800 bg-stone-50 px-3 py-1 rounded-xl text-sm">€{helper.pricePerHour}/hr</span>
                    </div>
                    <div className="mt-3">
                      <TrustBadge />
                    </div>
                  </div>
                </div>
                
                <div className="mt-5">
                  <p className="text-sm text-stone-500 line-clamp-2 leading-relaxed">"{helper.tagline}"</p>
                </div>

                <div className="mt-5 flex items-center justify-between text-sm border-t border-stone-50 pt-5">
                  <div className="flex items-center gap-2 text-stone-500">
                    <MapPin className="w-4 h-4" />
                    <span>{helper.district} ({helper.distance})</span>
                  </div>
                  <span className={availabilityClass}>
                    {helper.availability}
                  </span>
                </div>
              </div>
            </Card>
          </Link>
        )})}
      </div>
    </main>
  );
}
