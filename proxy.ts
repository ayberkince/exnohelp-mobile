import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const { pathname } = req.nextUrl;

    // 1. If user is NOT logged in and trying to access protected pages
    if (!isAuth && pathname !== "/login" && pathname !== "/register") {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // 2. If user IS logged in but hasn't completed onboarding
    // (We assume role "CLIENT" or "HELPER" is only set/verified after onboarding)
    // Note: You can refine this by checking a custom 'onboarded' flag in the token later
    if (isAuth && pathname === "/") {
      return NextResponse.redirect(new URL("/onboarding", req.url));
    }

    // 3. Role-Based Protection (The Bouncer)
    if (pathname.startsWith("/helper") && token?.role !== "HELPER") {
      return NextResponse.redirect(new URL("/onboarding", req.url));
    }

    if (pathname.startsWith("/client") && token?.role !== "CLIENT") {
      return NextResponse.redirect(new URL("/onboarding", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    "/client/:path*", 
    "/helper/:path*", 
    "/onboarding/:path*",
    // We exclude /login and /register so people can actually join!
  ],
};