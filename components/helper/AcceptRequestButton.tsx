'use client';

import { useTransition } from "react";
import { acceptRequestAction } from "@/app/actions/bookings";

export function AcceptRequestButton({ requestId }: { requestId: string }) {
  const [isPending, startTransition] = useTransition();

  const handleAccept = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    startTransition(() => {
      acceptRequestAction(formData).catch((error) => {
        alert(error.message || "Failed to accept request.");
      });
    });
  };

  return (
    <form onSubmit={handleAccept}>
      <input type="hidden" name="requestId" value={requestId} />
      <button 
        type="submit" 
        disabled={isPending}
        className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-emerald-700 disabled:bg-stone-400 transition-all shadow-lg active:scale-[0.98]"
      >
        {isPending ? "Locking in Match..." : "I Can Help (Accept)"}
      </button>
      <p className="text-center text-xs text-stone-500 font-bold mt-3">
        By accepting, you agree to our trust & safety boundaries.
      </p>
    </form>
  );
}