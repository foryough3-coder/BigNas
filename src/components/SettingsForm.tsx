"use client";
import { useActionState } from "react";
import { updateSettings } from "@/app/316nas/(protected)/settings/actions";
import type { SiteSettings } from "@/lib/settings";

export function SettingsForm({ settings }: { settings: SiteSettings }) {
  const [state, action, pending] = useActionState(updateSettings, undefined);
  return <form action={action} className="form-grid">
    <div className="form-field">
      <label htmlFor="whatsappNumbers">WhatsApp numbers (one per line)</label>
      <textarea id="whatsappNumbers" name="whatsappNumbers" rows={4} defaultValue={settings.whatsappNumbers.map(n => "+" + n).join("\n")} placeholder={"+591 7XXXXXXX"} />
      <p className="form-note">Include the country code. The first number is used by every “Ask on WhatsApp” button; all numbers are listed in the footer.</p>
    </div>
    <div className="form-field">
      <label htmlFor="location">Location</label>
      <input id="location" name="location" defaultValue={settings.location} placeholder="La Paz" />
      <p className="form-note">Shown in the top bar and the footer.</p>
    </div>
    {state?.error && <p className="form-error">{state.error}</p>}
    {state?.saved && <p className="form-note">Saved.</p>}
    <button className="button primary" type="submit" disabled={pending}>{pending ? "Saving…" : "Save settings"}</button>
  </form>;
}
