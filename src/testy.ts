

// middleware.js
export { default } from "next-auth/middleware";


// Protect specific routes
export const config = {
  matcher: [
    "/admin-dashboard/:path*",
    // Add other protected routes here
  ]
};