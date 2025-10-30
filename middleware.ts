import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { routes } from "@/lib/routes";

const PUBLIC_ADMIN_PREFIXES = ["/admin/login", "/admin/forgot-password", "/admin/reset-password"];

export default auth((req) => {
  const { nextUrl } = req;
  const { pathname } = nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const isPublic = PUBLIC_ADMIN_PREFIXES.some(
    (allowed) => pathname === allowed || pathname.startsWith(`${allowed}/`),
  );

  if (isPublic) {
    if (req.auth?.user && pathname === routes.admin.login) {
      return NextResponse.redirect(new URL(routes.admin.dashboard, nextUrl));
    }
    return NextResponse.next();
  }

  if (!req.auth?.user) {
    const loginUrl = new URL(routes.admin.login, nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", nextUrl.href);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};

