import NextAuth from "next-auth";
import authConfig from "@/auth/auth.config";
import {
  ADMIN_ROUTES,
  AUTH_ROUTES,
  PROTECTED_ROUTES,
  DEFAULT_AUTH_REDIRECT,
  AUTH_API_PREFIX
} from "@/routes";


const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const { nextUrl, auth } = req;
  const {pathname} = nextUrl
  console.log(auth)
  const loggedIn = !!req.auth;
  const isApiAuthRoute = nextUrl.pathname.startsWith(AUTH_API_PREFIX);
  const isAdminRoute = ADMIN_ROUTES.includes(pathname);
  const isAuthRoute = AUTH_ROUTES.includes(pathname);
  const isProtectedRoute = PROTECTED_ROUTES.includes(pathname)


  if (isApiAuthRoute) return;
  if (isAuthRoute) {
    if (loggedIn) {
      return Response.redirect(new URL(DEFAULT_AUTH_REDIRECT, nextUrl));
    }
    return;
  }
  if (!loggedIn && (isAdminRoute || isProtectedRoute)) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }
  
  return;
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
