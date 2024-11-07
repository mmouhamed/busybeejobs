import authConfig from "../auth.config";
import NextAuth from "next-auth";
import {
    DEFAULT_LOGIN_REDIRECT,
    ADMIN_LOGIN_REDIRECT,
    SUPERVISOR_LOGIN_REDIRECT,
    apiAuthPrefix,
    authRoutes,
    publicRoutes
} from '../routes'
import { UserRole } from "@prisma/client";


const { auth } = NextAuth(authConfig);
 
export default auth( async (req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      // Redirect to the appropriate dashboard based on user role
      let redirectUrl;
      const userRole = req.auth?.user.role;
      
      switch (userRole) {
        case UserRole.ADMIN:
          redirectUrl = ADMIN_LOGIN_REDIRECT;
          break;
        case UserRole.SUPERVISOR:
          redirectUrl = SUPERVISOR_LOGIN_REDIRECT;
          break;
        default:
          redirectUrl = DEFAULT_LOGIN_REDIRECT;
      }

      return Response.redirect(new URL(redirectUrl, nextUrl).toString());
    }
    return;
  }


  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl))
  } 


  return;
})
 
// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}