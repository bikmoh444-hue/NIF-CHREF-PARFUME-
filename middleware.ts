import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import type { CookieOptions } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookies: { name: string; value: string; options: CookieOptions }[]) => {
          cookies.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookies.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        }
      }
    }
  );

  const { data } = await supabase.auth.getUser();
  const isLogin = request.nextUrl.pathname.startsWith("/admin/login");
  const isAdmin = request.nextUrl.pathname.startsWith("/admin");

  if (isAdmin && !isLogin && !data.user) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  if (isLogin && data.user) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"]
};
