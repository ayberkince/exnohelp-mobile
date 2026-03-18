import { BottomNav } from "@/components/shared/BottomNav";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      {/* The main page content will load here */}
      {children}
      
      {/* The bottom navigation bar we just fixed! */}
      <BottomNav role="client" />
    </div>
  );
}