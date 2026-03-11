import { ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TrustBadgeProps {
  className?: string;
  text?: string;
}

export function TrustBadge({ className, text = "Verified Helper" }: TrustBadgeProps) {
  return (
    <div className={cn("inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50/80 backdrop-blur-sm text-emerald-700 border border-emerald-100/50", className)}>
      <ShieldCheck className="w-3.5 h-3.5" />
      <span className="text-[11px] font-semibold tracking-wide uppercase">{text}</span>
    </div>
  );
}
