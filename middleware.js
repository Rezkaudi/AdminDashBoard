import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export default function middleware(req) {
  const isAuthenticated = cookies().get("authToken");
  const publicRoutes = [
    "/login",
    "/fonts",
    "/images",
    "/scss",
    "/_next",
    "/favicon.ico",
  ];

  // if (req.nextUrl.pathname === "/") {
  //   return NextResponse.next();
  // }

  // const isPublicRoute =
  //   publicRoutes.slice(0, 10).includes(req?.nextUrl?.pathname) ||
  //   publicRoutes
  //     .slice(9)
  //     .some((route) => req?.nextUrl?.pathname.startsWith(route));

  const isPublicRoute = publicRoutes.some((route) =>
    req?.nextUrl?.pathname.startsWith(route)
  );


 
  
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // if (!!isAuthenticated?.value) {
  //   const absoluteUrl = new URL("/employers-dashboard/dashboard", req.nextUrl.origin);
  //   return NextResponse.redirect(absoluteUrl.toString());
  // }

  if (!isAuthenticated?.value) {
   
    const absoluteUrl = new URL("/login", req.nextUrl.origin);
    absoluteUrl.searchParams.set('redirect', req.nextUrl.pathname);
    return NextResponse.redirect(absoluteUrl.toString());
  }
  return NextResponse.next();
}

// export const config = {
//   matcher: ["/employers-dashboard/:path*", "/candidates-dashboard/:path*"],
// };
