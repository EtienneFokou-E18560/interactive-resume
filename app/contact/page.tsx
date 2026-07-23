import type { Metadata } from "next";
import ContactPageContent from "@/components/ContactPageContent";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${profile.name} — ${profile.title}`,
};

export default function ContactPage() {
  return <ContactPageContent />;
}
