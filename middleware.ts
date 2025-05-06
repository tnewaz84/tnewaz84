import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Check if the request is for the admin area
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin")

  if (isAdminRoute) {
    // If no session, redirect to admin login
    if (!session) {
      const redirectUrl = new URL("/admin/login", req.url)
      redirectUrl.searchParams.set("redirectedFrom", req.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }

    // Check if user has admin role
    const { data: userRoles } = await supabase.from("user_roles").select("role").eq("user_id", session.user.id).single()

    if (!userRoles || userRoles.role !== "admin") {
      // User doesn't have admin role, redirect to unauthorized page
      return NextResponse.redirect(new URL("/unauthorized", req.url))
    }
  }

  return res
}

// Only run middleware on admin routes
export const config = {
  matcher: ["/admin/:path*"],
}
