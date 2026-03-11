import { AppHeader } from '@/components/shared/AppHeader';
import { openRequests, categories } from '@/data/dummy';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ShieldAlert, Calendar as CalendarIcon, MapPin, Clock, Globe } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export default async function OpenRequestDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const request = openRequests.find(r => r.id === id);

  if (!request) {
    notFound();
  }

  const category = categories.find(c => c.id === request.serviceId);
  const dateObj = new Date(request.date);

  return (
    <main className="flex-1 overflow-y-auto bg-stone-50 pb-32">
      <AppHeader title="Request Details" />
      
      <div className="p-5 space-y-6">
        {/* Client Summary */}
        <Card className="border-stone-100/80 shadow-[0_4px_24px_rgba(0,0,0,0.02)] bg-white">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="relative w-24 h-24 rounded-[24px] overflow-hidden mb-4 shadow-sm">
              <Image src={request.clientPhoto} alt={request.clientName} fill className="object-cover" referrerPolicy="no-referrer" />
            </div>
            <h2 className="font-display font-medium text-2xl text-stone-800">{request.clientName}</h2>
            <p className="text-sm font-medium text-teal-700 bg-teal-50 px-3 py-1 rounded-lg inline-block mt-2">
              Needs {category?.title || 'Support'}
            </p>
          </CardContent>
        </Card>

        {/* Logistics */}
        <section className="space-y-4">
          <h3 className="text-lg font-display font-medium text-stone-800 px-1">Logistics</h3>
          <Card className="border-stone-100/80 shadow-[0_4px_24px_rgba(0,0,0,0.02)] overflow-hidden">
            <CardContent className="p-0 divide-y divide-stone-50">
              <div className="flex items-center gap-4 p-5">
                <div className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center shrink-0">
                  <CalendarIcon className="w-5 h-5 text-stone-500" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Date</p>
                  <p className="font-medium text-stone-900 mt-0.5">{dateObj.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-5">
                <div className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-stone-500" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Time & Duration</p>
                  <p className="font-medium text-stone-900 mt-0.5">{dateObj.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })} ({request.durationHours} hours)</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-5">
                <div className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-stone-500" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Location</p>
                  <p className="font-medium text-stone-900 mt-0.5">{request.location}</p>
                  <p className="text-sm text-stone-500">{request.district}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-5">
                <div className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center shrink-0">
                  <Globe className="w-5 h-5 text-stone-500" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Preferred Languages</p>
                  <p className="font-medium text-stone-900 mt-0.5">{request.languages.join(', ')}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Notes */}
        <section className="space-y-4">
          <h3 className="text-lg font-display font-medium text-stone-800 px-1">Client Notes</h3>
          <Card className="border-stone-100/80 shadow-[0_4px_24px_rgba(0,0,0,0.02)] bg-white">
            <CardContent className="p-6">
              <p className="text-stone-700 leading-relaxed italic">"{request.notes}"</p>
            </CardContent>
          </Card>
        </section>

        {/* Safety Reminder */}
        <section className="pt-2">
          <Card className="border-amber-200/60 bg-amber-50/50 shadow-none">
            <CardContent className="p-5 flex items-start gap-4">
              <ShieldAlert className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-amber-900">Safety Reminder</h4>
                <p className="text-sm text-amber-800/80 mt-1.5 leading-relaxed">
                  You are applying to provide <strong className="font-semibold">non-medical support only</strong>. Do not offer medical advice or physical nursing care.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      {/* Fixed Bottom Action */}
      <div className="absolute bottom-0 w-full bg-white/90 backdrop-blur-2xl border-t border-stone-200/50 p-5 pb-[calc(20px+env(safe-area-inset-bottom))] z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-between mb-4 px-1">
          <span className="text-stone-500 font-medium">Offered Payment</span>
          <span className="text-2xl font-display font-semibold text-stone-900">€{request.offeredPrice}</span>
        </div>
        <Button className="w-full text-base h-14 rounded-full shadow-lg shadow-teal-900/20">
          Apply for Request
        </Button>
      </div>
    </main>
  );
}
