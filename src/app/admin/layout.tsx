import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crente Race — Admin",
};


export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full bg-surface text-on-surface">{children}</div>
  );
}
