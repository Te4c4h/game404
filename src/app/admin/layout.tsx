import { AdminSidebar } from "@/components/layout/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row min-h-screen bg-background text-foreground overflow-hidden">
      <AdminSidebar />
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto w-full">
        {children}
      </main>
    </div>
  );
}
