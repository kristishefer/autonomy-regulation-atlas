import { NextResponse, type NextRequest } from "next/server";

import {
  ATLAS_LOCALE_COOKIE,
  ATLAS_LOCALE_HEADER,
  isLocale,
  normalizeLocale,
} from "@/app/i18n/locale";

export function proxy(request: NextRequest) {
  const requestedLocale = request.nextUrl.searchParams.get("lang");
  const cookieLocale = request.cookies.get(ATLAS_LOCALE_COOKIE)?.value;
  const locale =
    requestedLocale !== null
      ? normalizeLocale(requestedLocale)
      : normalizeLocale(cookieLocale);
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(ATLAS_LOCALE_HEADER, locale);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  if (
    requestedLocale !== null ||
    !isLocale(cookieLocale) ||
    cookieLocale !== locale
  ) {
    response.cookies.set({
      name: ATLAS_LOCALE_COOKIE,
      value: locale,
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico)$).*)",
  ],
};
