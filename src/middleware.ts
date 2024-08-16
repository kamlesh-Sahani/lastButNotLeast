import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
export function middleware(request: NextRequest) {
    const accessToken = request.cookies.get("accessToken")?.value;
    const refreshToken = request.cookies.get("refreshToken")?.value;
    const loggedUserNotAccessPath = request.nextUrl.pathname === "/login";
    const protectedRoutes = request.nextUrl.pathname === "/user" || request.nextUrl.pathname==="/admin";
    console.log(accessToken,"acc");
    if(loggedUserNotAccessPath){
        if(accessToken){
            return NextResponse.redirect(new URL('/user',request.url));
        }
    }

    if(protectedRoutes){
        if(!accessToken){
            return NextResponse.redirect(new URL('/login',request.url));
        }
    }
}
 
export const config = {
  matcher: ['/user/:path*','/admin/:path*',"/api/:path*","/login"],
}