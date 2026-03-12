import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // The Smart Routing Logic:
    // If they hit /onboarding but already have a role, skip the choice and redirect them!
    if (path.startsWith("/onboarding") && token?.role) {
      if (token.role === "CLIENT") {
        return NextResponse.redirect(new URL("/client", req.url));
      }
      if (token.role === "HELPER") {
        return NextResponse.redirect(new URL("/helper", req.url));
      }
    }
  },
  {
    pages: {
      signIn: "/login", // Keep sending unauthenticated people to the front door
    },
  }
);

// Lock down these folders
export const config = {
  matcher: [
    "/client/:path*",
    "/helper/:path*",
    "/admin/:path*",
    "/onboarding/:path*"
  ]
};