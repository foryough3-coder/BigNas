import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// For public, unauthenticated reads only (the storefront catalog). No
// cookie/session handling, so it's safe to call from generateStaticParams
// and other build-time contexts where next/headers' cookies() isn't available.
export function createClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
