import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.has("admin-auth")
  const { pathname } = request.nextUrl

  if (pathname.startsWith("/admin/dashboard") && !isAuthenticated) {
    return NextResponse.redirect(new URL("/admin", request.url))
  }

  if (pathname.startsWith("/api/") && !pathname.startsWith("/api/login")) {
    // You might want more granular API protection, but this is a simple start
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/dashboard/:path*", "/api/:path*"],
}
