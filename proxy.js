import { NextResponse } from "next/server";

export function proxy(request) {
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith("/k/admin")) return NextResponse.next();

  const isLoginPage = pathname === "/k/admin/login";
  const hasAdminCookie = request.cookies.get("a2z_admin")?.value === "1";

  if (!hasAdminCookie && !isLoginPage) {
    return NextResponse.redirect(new URL("/k/admin/login", request.url));
  }

  if (hasAdminCookie && isLoginPage) {
    return NextResponse.redirect(new URL("/k/admin/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/k/admin/:path*"]
};
