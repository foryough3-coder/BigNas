import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

// Secure check (queries the database), unlike src/proxy.ts's optimistic
// cookie-only check. Call this in the protected admin layout and again in
// every admin Server Action — see node_modules/next/dist/docs/01-app/02-guides/authentication.md.
export const verifyAdmin = cache(async () => {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/316nas/login");

  const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single();
  if (!profile?.is_admin) redirect("/316nas/login");

  return { userId: user.id, email: user.email ?? "" };
});
