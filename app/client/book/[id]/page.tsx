import { AppHeader } from '@/components/shared/AppHeader';
import { helpers, categories } from '@/data/dummy';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ShieldAlert, Calendar as CalendarIcon, MapPin, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function BookingFlowPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const helper = helpers.find(h => h.id === id);

  if (!helper) {
    notFound();
  }

  return (
    <main className="flex-1 overflow-y-auto bg-stone-50 pb-[calc(160px+env(safe-area-inset-bottom))]">
      <AppHeader title="Request Booking" />
      
      <div className="p-5 space-y-8">
        {/* Helper Summary */}
        <Card className="border-stone-100 shadow-sm bg-white">
          <CardContent className="p-5 flex gap-4 items-center">
            <div className="relative w-16 h-16 rounded-[20px] overflow-hidden shrink-0 shadow-sm">
              <Image src={helper.photo} alt={helper.firstName} fill className="object-cover" referrerPolicy="no-referrer" />
            </div>
            <div>
              <h3 className="font-display font-medium text-lg text-stone-800">{helper.firstName} {helper.lastName}</h3>
              <p className="text-sm text-stone-500 font-medium mt-0.5">€{helper.pricePerHour}/hr • {helper.district}</p>
            </div>
          </CardContent>
        </Card>

        {/* Step 1: Service Type */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center text-sm font-semibold text-stone-700">1</div>
            <h3 className="text-lg font-display font-medium text-stone-800">Select Service</h3>
          </div>
          <div className="grid gap-3 pl-11">
            {categories.slice(0, 3).map((category) => (
              <label key={category.id} className="flex items-start gap-4 p-5 border border-stone-200 rounded-[24px] bg-white cursor-pointer hover:border-teal-200 transition-all has-[:checked]:border-teal-600 has-[:checked]:bg-teal-50/50 has-[:checked]:ring-1 has-[:checked]:ring-teal-600">
                <input type="radio" name="service" value={category.id} className="mt-1 w-5 h-5 text-teal-600 border-stone-300 focus:ring-teal-600" />
                <div>
                  <h4 className="font-medium text-stone-900">{category.title}</h4>
                  <p className="text-sm text-stone-500 mt-1 leading-relaxed">{category.description}</p>
                </div>
              </label>
            ))}
          </div>
        </section>

        {/* Step 2: Date & Time */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center text-sm font-semibold text-stone-700">2</div>
            <h3 className="text-lg font-display font-medium text-stone-800">Date & Time</h3>
          </div>
          <div className="pl-11">
            <Card className="border-stone-200 shadow-sm overflow-hidden">
              <CardContent className="p-0 divide-y divide-stone-100">
                <div className="flex items-center gap-4 p-5 hover:bg-stone-50 transition-colors">
                  <CalendarIcon className="w-5 h-5 text-stone-400 shrink-0" />
                  <input type="date" className="flex-1 bg-transparent border-none focus:ring-0 text-stone-900 placeholder:text-stone-400 font-medium" />
                </div>
                <div className="flex items-center gap-4 p-5 hover:bg-stone-50 transition-colors">
                  <Clock className="w-5 h-5 text-stone-400 shrink-0" />
                  <input type="time" className="flex-1 bg-transparent border-none focus:ring-0 text-stone-900 placeholder:text-stone-400 font-medium" />
                </div>
                <div className="flex items-center gap-4 p-5 hover:bg-stone-50 transition-colors">
                  <span className="text-sm font-medium text-stone-500 w-20 shrink-0">Duration</span>
                  <select className="flex-1 bg-transparent border-none focus:ring-0 text-stone-900 font-medium">
                    <option>1 Hour</option>
                    <option>2 Hours</option>
                    <option>3 Hours</option>
                    <option>4 Hours</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Step 3: Location */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center text-sm font-semibold text-stone-700">3</div>
            <h3 className="text-lg font-display font-medium text-stone-800">Meeting Location</h3>
          </div>
          <div className="pl-11">
            <Card className="border-stone-200 shadow-sm">
              <CardContent className="p-5 flex items-center gap-4">
                <MapPin className="w-5 h-5 text-stone-400 shrink-0" />
                <input type="text" placeholder="Enter address or hospital name" className="flex-1 bg-transparent border-none focus:ring-0 text-stone-900 placeholder:text-stone-400 font-medium" />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Step 4: Notes */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center text-sm font-semibold text-stone-700">4</div>
            <h3 className="text-lg font-display font-medium text-stone-800">Notes for Helper</h3>
          </div>
          <div className="pl-11">
            <textarea 
              placeholder="E.g., I'll be waiting near the main entrance. I have trouble walking long distances."
              className="w-full p-5 rounded-[24px] border border-stone-200 bg-white shadow-sm focus:ring-2 focus:ring-teal-600 focus:border-transparent resize-none h-32 text-stone-900 placeholder:text-stone-400"
            />
          </div>
        </section>

        {/* Safety Reminder */}
        <section className="pt-6">
          <Card className="border-rose-200/60 bg-rose-50/50 shadow-none relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-rose-500" />
            <CardContent className="p-5 flex items-start gap-4">
              <ShieldAlert className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-rose-900">Mandatory Safety Agreement</h4>
                <p className="text-sm text-rose-800/80 mt-1.5 leading-relaxed">
                  By booking, you acknowledge that {helper.firstName} will provide <strong className="font-semibold">non-medical support only</strong>. They cannot offer medical advice, administer medication, or perform physical nursing tasks.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      {/* Fixed Bottom Action */}
      <div className="absolute bottom-0 w-full bg-white/90 backdrop-blur-2xl border-t border-stone-200/50 p-5 pb-[calc(20px+env(safe-area-inset-bottom))] z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-between mb-4 px-1">
          <span className="text-stone-500 font-medium">Estimated Total</span>
          <span className="text-2xl font-display font-semibold text-stone-900">€44.00</span>
        </div>
        <Button asChild className="w-full text-base h-14 rounded-full shadow-lg shadow-teal-900/20">
          <Link href="/client/bookings">
            Confirm Request
          </Link>
        </Button>
      </div>
    </main>
  );
}
