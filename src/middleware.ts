import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const loggedUserNotAccessPath = request.nextUrl.pathname === "/login";
  const isLogoutPath = request.nextUrl.pathname === "/logout";
  const protectedRoutes =
    request.nextUrl.pathname === "/user" ||
    request.nextUrl.pathname === "/admin";
  if (isLogoutPath) {
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.set("accessToken", "", {
      path: "/",
      expires: new Date(0),
    });
    response.cookies.set("refreshToken", "", {
      path: "/",
      expires: new Date(0),
    });

    return response;
  }
  if (loggedUserNotAccessPath) {
    if (accessToken) {
      return NextResponse.redirect(new URL("/user", request.url));
    }
  }

  if (protectedRoutes) {
    if (!accessToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}

export const config = {
  matcher: [
    "/user/:path*",
    "/admin/:path*",
    "/api/:path*",
    "/login",
    "/logout",
  ],
};
