import Link from 'next/link';
import { AppHeader } from '@/components/shared/AppHeader';
import { categories, helpers } from '@/data/dummy';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Home, FileText, Heart, ShoppingBag, ChevronRight, Star, ShieldAlert } from 'lucide-react';
import Image from 'next/image';

const iconMap: Record<string, React.ElementType> = {
  MapPin, Clock, Home, FileText, Heart, ShoppingBag
};

export default function ClientDashboard() {
  return (
    <main className="flex-1 overflow-y-auto bg-stone-50 pb-[calc(80px+env(safe-area-inset-bottom))]">
      <AppHeader title="Home" showBack={false} />
      
      <div className="p-5 space-y-10">
        {/* Hero Section */}
        <section className="space-y-6">
          <div>
            <p className="text-stone-500 text-sm font-medium uppercase tracking-wider mb-1">Good morning</p>
            <h2 className="text-4xl font-display font-medium text-stone-800 tracking-tight">
              Sarah
            </h2>
          </div>

          <div className="bg-stone-900 rounded-[32px] p-6 text-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl font-display font-medium mb-2">Need help today?</h3>
              <p className="text-stone-300 text-sm mb-6 max-w-[220px] leading-relaxed">
                Book a verified helper to accompany you safely to your appointment.
              </p>
              <Button asChild className="bg-white text-stone-900 hover:bg-stone-100 rounded-full h-12 px-6 text-sm font-medium border-0">
                <Link href="/client/search">Find a Helper</Link>
              </Button>
            </div>
            {/* Decorative circles */}
            <div className="absolute -bottom-16 -right-16 w-56 h-56 bg-teal-800/40 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-600/20 rounded-full blur-2xl pointer-events-none" />
          </div>
        </section>

        {/* Safety Banner */}
        <section>
          <Link href="/trust-safety" className="block">
            <div className="bg-white border border-rose-200/60 rounded-[24px] p-5 flex items-start gap-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-shadow relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-rose-500" />
              <div className="bg-rose-50 p-2.5 rounded-full shrink-0">
                <ShieldAlert className="w-5 h-5 text-rose-600" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-stone-800">Strictly Non-Medical Support</h4>
                <p className="text-sm text-stone-500 mt-1 leading-relaxed">
                  Helpers provide companionship and practical help only. They cannot offer medical care, advice, or physical nursing.
                </p>
                <span className="text-xs font-medium text-rose-600 mt-2 inline-block">Read Safety Guidelines &rarr;</span>
              </div>
            </div>
          </Link>
        </section>

        {/* Categories */}
        <section className="space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-display font-medium text-stone-800">How can we help?</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {categories.slice(0, 4).map((category) => {
              const Icon = iconMap[category.icon];
              return (
                <Link key={category.id} href={`/client/search?category=${category.id}`}>
                  <Card className="h-full hover:border-teal-200/50 transition-colors cursor-pointer">
                    <CardContent className="p-5 flex flex-col items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-stone-50 flex items-center justify-center text-stone-700 border border-stone-100">
                        {Icon && <Icon className="w-5 h-5" />}
                      </div>
                      <span className="text-sm font-medium text-stone-800 leading-tight">
                        {category.title}
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Recommended Helpers */}
        <section className="space-y-5 pb-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-display font-medium text-stone-800">Recommended in Berlin</h3>
            <Link href="/client/search" className="text-sm text-stone-500 hover:text-stone-800 font-medium flex items-center transition-colors">
              See all <ChevronRight className="w-4 h-4 ml-0.5" />
            </Link>
          </div>
          
          <div className="flex overflow-x-auto gap-5 pb-6 -mx-5 px-5 snap-x hide-scrollbar">
            {helpers.map((helper) => (
              <Link key={helper.id} href={`/client/helper/${helper.id}`} className="snap-start shrink-0 w-[280px]">
                <Card className="overflow-hidden h-full flex flex-col hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow">
                  <div className="p-5 flex gap-4 items-center border-b border-stone-50">
                    <div className="relative w-16 h-16 rounded-[20px] overflow-hidden shrink-0 shadow-sm">
                      <Image src={helper.photo} alt={helper.firstName} fill className="object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h4 className="font-semibold text-stone-800 text-lg">{helper.firstName} {helper.lastName}</h4>
                      <div className="flex items-center gap-1.5 text-sm text-stone-500 mt-0.5">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span className="font-medium text-stone-700">{helper.rating}</span>
                        <span>({helper.reviewsCount})</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <p className="text-sm text-stone-500 line-clamp-2 mb-4 leading-relaxed">
                      "{helper.tagline}"
                    </p>
                    <div className="flex items-center justify-between text-sm pt-4 border-t border-stone-50">
                      <span className="font-medium text-stone-800">€{helper.pricePerHour}/hr</span>
                      <span className="text-stone-400 bg-stone-50 px-2.5 py-1 rounded-lg">{helper.district}</span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
