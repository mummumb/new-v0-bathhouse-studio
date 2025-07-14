import type React from "react"
import QueryProvider from "@/lib/query-provider"
import { Toaster } from "@/components/ui/toaster"
import "./admin.css" // Import admin-specific styles

export const metadata = {
  title: "Bathhouse Studio Admin",
  description: "Content management for Bathhouse Studio",
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      {/* The admin-panel class scopes our admin-specific CSS */}
      <div className="admin-panel">
        {children}
        <Toaster />
      </div>
    </QueryProvider>
  )
}
