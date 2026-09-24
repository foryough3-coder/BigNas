import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

// Next.js 16 renamed Middleware to Proxy (same mechanics, new file/export
// name) — see node_modules/next/dist/docs/01-app/01-getting-started/16-proxy.md.
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          for (const { name, value } of cookiesToSet) request.cookies.set(name, value);
          response = NextResponse.next({ request });
          for (const { name, value, options } of cookiesToSet) response.cookies.set(name, value, options);
        },
      },
    }
  );

  // Refreshing the session here keeps it alive across Server Component
  // renders, which can't write cookies themselves.
  const { data: { user } } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;
  const isGuardedAdminRoute = path.startsWith("/316nas") && path !== "/316nas/login";

  // Optimistic check only: confirms a session exists so signed-out visitors
  // never see the admin shell. The real is_admin check happens server-side
  // in src/app/316nas/(protected)/layout.tsx and every admin Server Action.
  if (isGuardedAdminRoute && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/316nas/login";
    return NextResponse.redirect(url);
  }

  return response;
}

// Only the admin area uses sessions, so the storefront skips this round trip.
export const config = {
  matcher: ["/316nas/:path*"],
};
