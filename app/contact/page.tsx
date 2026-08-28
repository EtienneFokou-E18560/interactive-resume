import type { Metadata } from "next";
import ContactPageContent from "@/components/ContactPageContent";
import { profile } from "@/data/profile";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: `Contact ${profile.name} - ${profile.title}`,
  path: "/contact",
});

export default function ContactPage() {
  return <ContactPageContent />;
}
