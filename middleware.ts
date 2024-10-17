import { NextRequest, NextResponse } from "next/server";
import { getAccessToken, getUsernameCookie } from "./lib/actions";
import fetchProtected from "./lib/fetchProtected";

type checkProtectedType = {
  isOk: boolean | null;
  message?: string;
  error?: string;
  logged_in_as?: string;
};

export async function middleware(request: NextRequest) {
  const { nextUrl, url } = request;
  // gets token and username from cookies
  const token = await getAccessToken();
  const username = await getUsernameCookie();
  const allowedPathsWithoutToken = [
    "/",
    "/get-started/topics",
    "/auth/login",
    "/auth/register",
  ];

  // Redirects to /@{username}/home when the path is /me
  if (nextUrl.pathname === "/me") {
    if (username) {
      return NextResponse.redirect(new URL(`@${username?.value}/home`, url));
    } else {
      // removeAccessToken();
      return NextResponse.redirect(new URL("/", url));
    }
  }

  // Check if the user is navigating to the /get-started/topics path
  if (nextUrl.pathname === "/get-started/topics") {
    console.log("username?.value =>", username?.value);
    console.log("token?.value =>", token?.value);

    // If user has either username or token, allow access to /get-started/topics
    if (username?.value || token?.value) {
      console.log("ALLOW ACCESS");
      return NextResponse.next(); // Allow access
    } else {
      // Redirect to homepage if no username and no token
      return NextResponse.redirect(new URL("/", url));
    }
  }

  // If the user has a token, block access to /auth/* pages
  if (token?.value) {
    try {
      const isAuthorized = await fetchProtected(token.value);
      console.log(
        "=================== MIDDLEWARE FETCH PROTECTED ==================="
      );

      if (isAuthorized.isOk) {
        // If authorized, redirect away from /auth pages to home
        if (nextUrl.pathname.startsWith("/auth")) {
          return NextResponse.redirect(new URL("/", url));
        }
        return NextResponse.next(); // Allow access to non-auth pages
      }
      // If not authorized, redirect to login
      return NextResponse.redirect(new URL("/auth/login", url));
    } catch (error) {
      // If there's an error, redirect to login
      return NextResponse.redirect(new URL("/auth/login", url));
    }
  }

  // If user has no token or username, restrict access to non-permitted pages
  if (!token?.value) {
    console.log("nextUrl.pathname =>", nextUrl.pathname);
    console.log(allowedPathsWithoutToken.includes(nextUrl.pathname));

    // If the current path is not allowed without a token, redirect to /auth/login
    if (allowedPathsWithoutToken.includes(nextUrl.pathname))
      return NextResponse.next();
    return NextResponse.redirect(new URL("/auth/login", url));
  }

  // Allow the request to continue if it passes all checks
  return NextResponse.next();
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
