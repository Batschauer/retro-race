import { AdminNav } from "@/components/AdminNav";

export const dynamic = "force-dynamic";

export default function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AdminNav />
      <div className="mx-auto min-w-0 max-w-2xl px-3 pb-8 pt-10 min-[400px]:px-4 min-[400px]:pt-12">
        {children}
      </div>
    </>
  );
}
