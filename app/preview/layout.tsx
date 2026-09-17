import type { Metadata } from "next";

// Scratch pages for comparing migrated components with the Webflow originals.
// Delete app/preview/ at cleanup.
export const metadata: Metadata = { robots: { index: false } };

export default function PreviewLayout({ children }: { children: React.ReactNode }) {
  return <main className="flex flex-col items-start gap-10 p-10">{children}</main>;
}
