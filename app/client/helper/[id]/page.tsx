import { AppHeader } from '@/components/shared/AppHeader';
import { helpers, reviews } from '@/data/dummy';
import { TrustBadge } from '@/components/shared/TrustBadge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star, MapPin, MessageSquare, ShieldCheck, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function HelperProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const helper = helpers.find(h => h.id === id);

  if (!helper) {
    notFound();
  }

  const isAvailableToday = helper.availability.toLowerCase().includes('today');
  const isAvailableTomorrow = helper.availability.toLowerCase().includes('tomorrow');
  
  let availabilityClass = "text-stone-600 font-medium bg-stone-100 px-3 py-1.5 rounded-xl";
  if (isAvailableToday) {
    availabilityClass = "text-emerald-800 font-medium bg-emerald-50/80 px-3 py-1.5 rounded-xl border border-emerald-100/50";
  } else if (isAvailableTomorrow) {
    availabilityClass = "text-teal-800 font-medium bg-teal-50/80 px-3 py-1.5 rounded-xl border border-teal-100/50";
  }

  return (
    <main className="flex-1 overflow-y-auto bg-stone-50 pb-28 relative">
      <AppHeader title="Profile" />
      
      {/* Hero Profile */}
      <div className="bg-white px-5 pt-6 pb-10 rounded-b-[40px] shadow-[0_4px_20px_rgba(0,0,0,0.02)] relative z-10">
        <div className="flex flex-col items-center text-center">
          <div className="relative w-32 h-32 rounded-[32px] overflow-hidden mb-5 shadow-lg">
            <Image src={helper.photo} alt={helper.firstName} fill className="object-cover" referrerPolicy="no-referrer" />
          </div>
          <h1 className="text-3xl font-display font-medium text-stone-800">{helper.firstName} {helper.lastName}</h1>
          <div className="mt-3 mb-2">
            <span className={`text-sm ${availabilityClass}`}>
              {helper.availability}
            </span>
          </div>
          <p className="text-stone-500 mt-2 max-w-[280px] leading-relaxed">{helper.tagline}</p>
          
          <div className="flex items-center gap-6 mt-6 bg-stone-50 px-6 py-3 rounded-2xl">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1.5 text-stone-800 font-semibold text-lg">
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                <span>{helper.rating}</span>
              </div>
              <span className="text-xs text-stone-500 font-medium uppercase tracking-wider mt-0.5">{helper.reviewsCount} reviews</span>
            </div>
            <div className="w-px h-10 bg-stone-200" />
            <div className="flex flex-col items-center">
              <span className="text-stone-800 font-semibold text-lg">{helper.completedBookings}</span>
              <span className="text-xs text-stone-500 font-medium uppercase tracking-wider mt-0.5">Completed</span>
            </div>
            <div className="w-px h-10 bg-stone-200" />
            <div className="flex flex-col items-center">
              <span className="text-stone-800 font-semibold text-lg">€{helper.pricePerHour}</span>
              <span className="text-xs text-stone-500 font-medium uppercase tracking-wider mt-0.5">per hour</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-8 mt-4">
        {/* Trust & Verification */}
        <Card className="border-emerald-200/60 bg-emerald-50/30 shadow-none relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500" />
          <CardContent className="p-5 space-y-4">
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <h3 className="font-semibold text-emerald-900">Verified & Safe</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2.5 text-sm font-medium text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> ID Verified
              </div>
              <div className="flex items-center gap-2.5 text-sm font-medium text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Liveness Check
              </div>
              <div className="flex items-center gap-2.5 text-sm font-medium text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Phone Verified
              </div>
              <div className="flex items-center gap-2.5 text-sm font-medium text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Safety Rules Signed
              </div>
            </div>
          </CardContent>
        </Card>

        {/* About */}
        <section className="space-y-4">
          <h3 className="text-xl font-display font-medium text-stone-800">About {helper.firstName}</h3>
          <p className="text-stone-600 leading-relaxed">{helper.bio}</p>
          
          <div className="pt-3 space-y-3">
            <div className="flex items-center gap-3 text-stone-600 bg-white p-3 rounded-2xl border border-stone-100">
              <MapPin className="w-5 h-5 text-stone-400" />
              <span className="text-sm">Based in <strong className="font-medium text-stone-800">{helper.district}</strong> ({helper.distance} away)</span>
            </div>
            <div className="flex items-center gap-3 text-stone-600 bg-white p-3 rounded-2xl border border-stone-100">
              <MessageSquare className="w-5 h-5 text-stone-400" />
              <span className="text-sm">Speaks <strong className="font-medium text-stone-800">{helper.languages.join(', ')}</strong></span>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section className="space-y-3">
          <h3 className="text-xl font-display font-medium text-stone-800">Experience</h3>
          <p className="text-stone-600 leading-relaxed">{helper.experience}</p>
        </section>

        {/* Reviews */}
        <section className="space-y-5">
          <h3 className="text-xl font-display font-medium text-stone-800">Recent Reviews</h3>
          <div className="space-y-4">
            {reviews.map((review) => (
              <Card key={review.id} className="border-stone-100 shadow-sm">
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <span className="font-medium text-stone-800">{review.author}</span>
                    <div className="flex items-center gap-1 bg-stone-50 px-2 py-1 rounded-lg">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-medium text-stone-700">{review.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-stone-600 leading-relaxed">"{review.text}"</p>
                  <p className="text-xs text-stone-400 mt-3 font-medium uppercase tracking-wider">{new Date(review.date).toLocaleDateString()}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>

      {/* Fixed Bottom Action */}
      <div className="absolute bottom-0 w-full bg-white/80 backdrop-blur-2xl border-t border-stone-200/50 p-5 pb-[calc(20px+env(safe-area-inset-bottom))] z-50">
        <div className="flex gap-3">
          <Button variant="outline" className="w-14 shrink-0 bg-white border-stone-200 rounded-full">
            <MessageSquare className="w-5 h-5 text-stone-600" />
          </Button>
          <Button asChild className="flex-1 text-base rounded-full shadow-lg shadow-teal-900/20">
            <Link href={`/client/book/${helper.id}`}>
              Request Booking
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
