import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const isLogoutPath = request.nextUrl.pathname === "/logout";
  const loggedUserNotAccessPath = request.nextUrl.pathname === "/login";
  const protectedRoutes = request.nextUrl.pathname === "/user" || request.nextUrl.pathname === "/admin";
  
  // Handle logout
  if (isLogoutPath) {
    const response = NextResponse.redirect(new URL('/login', request.url));
    
    // Clear the access and refresh tokens
    response.cookies.set("accessToken", "", { path: "/", expires: new Date(0) });
    response.cookies.set("refreshToken", "", { path: "/", expires: new Date(0) });
    
    return response;
  }

  // Redirect logged-in users away from the login page
  if (loggedUserNotAccessPath && accessToken) {
    return NextResponse.redirect(new URL('/user', request.url));
  }

  // Protect routes by checking if the user is authenticated
  if (protectedRoutes && !accessToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/user/:path*', '/admin/:path*', '/api/:path*', '/login', '/logout'],
};
