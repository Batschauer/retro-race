import { AdminNav } from "@/components/AdminNav";

export default function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AdminNav />
      <div className="mx-auto min-w-0 max-w-2xl overflow-x-hidden px-3 py-8 min-[400px]:px-4">
        {children}
      </div>
    </>
  );
}
