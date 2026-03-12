export { default } from "next-auth/middleware";

// This tells NextAuth WHICH pages to lock down.
// Anyone can visit the homepage and /login, but these folders require a session:
export const config = {
  matcher: [
    "/client/:path*",
    "/helper/:path*",
    "/admin/:path*",
    "/onboarding/:path*"
  ]
};