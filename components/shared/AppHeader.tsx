"use client";

import { ArrowLeft, ShieldAlert } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface AppHeaderProps {
  title?: string;
  showBack?: boolean;
  rightAction?: React.ReactNode;
}

export function AppHeader({ title, showBack = true, rightAction }: AppHeaderProps) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-40 w-full bg-stone-50/90 backdrop-blur-2xl border-b border-stone-200/50 px-4 h-[calc(64px+env(safe-area-inset-top))] pt-[env(safe-area-inset-top)] flex items-center justify-between">
      <div className="flex items-center w-1/3">
        {showBack && (
          <button 
            onClick={() => router.back()} 
            className="p-2.5 -ml-2 text-stone-600 hover:bg-stone-200/50 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
      </div>
      
      <div className="flex-1 text-center truncate px-2">
        {title && <h1 className="font-display font-medium text-stone-800 text-lg tracking-tight">{title}</h1>}
      </div>

      <div className="flex items-center justify-end w-1/3">
        {rightAction || (
          <Link href="/trust-safety" className="p-2.5 -mr-2 text-stone-400 hover:text-teal-700 hover:bg-teal-50 rounded-full transition-colors">
            <ShieldAlert className="w-5 h-5" />
          </Link>
        )}
      </div>
    </header>
  );
}
