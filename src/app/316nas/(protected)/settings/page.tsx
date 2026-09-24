import type { Metadata } from "next";
import { verifyAdmin } from "@/lib/admin";
import { getSiteSettings } from "@/lib/settings";
import { SettingsForm } from "@/components/SettingsForm";
export const metadata: Metadata = { title: "Admin — settings" };

export default async function AdminSettingsPage() {
  await verifyAdmin();
  const settings = await getSiteSettings();
  return <>
    <p className="eyebrow">Business details</p><h1>Settings</h1>
    <SettingsForm settings={settings} />
  </>;
}
