import { BottomNav } from "@/components/shared/BottomNav";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 flex flex-col relative">
      {children}
      <BottomNav role="client" />
    </div>
  );
}
