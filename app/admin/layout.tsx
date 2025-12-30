import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Store, CalendarDays, LogOut } from "lucide-react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-muted/30 hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b font-bold text-lg">
          Admin Panel
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Button variant="ghost" className="w-full justify-start gap-2" asChild>
            <Link href="/admin"><LayoutDashboard className="h-4 w-4" /> Dashboard</Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2" asChild>
            <Link href="/admin/branches"><Store className="h-4 w-4" /> Branches</Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2" asChild>
            <Link href="/admin/reservations"><CalendarDays className="h-4 w-4" /> Reservations</Link>
          </Button>
        </nav>
        <div className="p-4 border-t">
          <Button variant="outline" className="w-full gap-2 text-destructive hover:text-destructive" asChild>
            <Link href="/"><LogOut className="h-4 w-4" /> Exit</Link>
          </Button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        {children}
      </div>
    </div>
  )
}
