import { NextRequest, NextResponse } from "next/server";
import { getAccessToken, getUsernameCookie } from "./lib/actions";
import fetchProtected from "./lib/fetchProtected";

type checkProtectedType = {
  isOk: boolean | null;
  message?: string;
  error?: string;
  logged_in_as?: string;
};

const allowedPathsWithoutToken = [
  "/auth/login",
  "/auth/register/form",
  "/auth/register/interests",
  "/",
];

export async function middleware(request: NextRequest) {
  // Redirects to /@{username}/home when the path is /me
  if (request.nextUrl.pathname === "/me") {
    const username = await getUsernameCookie();
    if (username) {
      return NextResponse.redirect(
        new URL(`@${username?.value}/home`, request.url)
      );
    } else {
      // removeAccessToken();
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // gets token from cookies
  const token = await getAccessToken();

  // if user has token, user user cannot go pages that start with auth
  if (token?.value) {
    try {
      const isAuthorized: checkProtectedType = await fetchProtected(
        token.value
      );
      console.log(
        "=================== MIDDLEWARE FETCH PROTECTED ==================="
      );

      if (isAuthorized.isOk === true) {
        if (request.nextUrl.pathname.startsWith("/auth")) {
          return NextResponse.redirect(new URL("/", request.url));
        }
        return;
      }
      return NextResponse.redirect(new URL("/auth/login", request.url));
    } catch (error) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    // if user has no token, user can go pages that I permitted only
  } else if (typeof token === "undefined") {
    if (!allowedPathsWithoutToken.includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }
}

export const config = {
  matcher: [
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
