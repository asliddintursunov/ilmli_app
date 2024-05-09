import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // console.log("request.nextUrl.pathname:::", request.nextUrl.pathname);

  // Redirects to /profile when the path is /smth
  if (request.nextUrl.pathname.startsWith("/smth")) {
    return NextResponse.rewrite(new URL("/profile", request.url));
  }
}
