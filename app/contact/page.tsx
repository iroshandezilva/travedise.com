import type { Metadata } from "next";

import { ContactSection } from "@/components/contact/contact-section";
import { Footer } from "@/components/site/footer";
import { Navbar } from "@/components/site/navbar";
import { PageGradient } from "@/components/site/page-gradient";
import { SHARE_IMAGE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact - Travedise - Your Next Adventure Starts Here",
  description:
    "Whether you seek adventure, culture, or calm — we’ve got the perfect experience for every kind of traveler.",
  alternates: { canonical: "/contact" },
  openGraph: {
    images: [SHARE_IMAGE],
    title: "Contact - Travedise - Your Next Adventure Starts Here",
    description:
      "Whether you seek adventure, culture, or calm — we’ve got the perfect experience for every kind of traveler.",
    type: "website",
  },
  twitter: {
    images: [SHARE_IMAGE],
    card: "summary_large_image",
    title: "Contact - Travedise - Your Next Adventure Starts Here",
    description:
      "Whether you seek adventure, culture, or calm — we’ve got the perfect experience for every kind of traveler.",
  },
};

export default function ContactPage() {
  return (
    <div className="overflow-clip pb-2.5">
      <PageGradient />
      <Navbar current="/contact" />
      <main>
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
