import Link from "next/link"
import { Utensils } from "lucide-react"
import { Button } from "@/components/ui/button"
import CartSheet from "@/components/cart/cart-sheet"

export default function Navbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Utensils className="h-6 w-6 text-primary" />
          <Link href="/" className="text-xl font-bold tracking-tight">
            Gourmet Brand
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/">Home</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/menu">Menu</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/reservations">Reservations</Link>
          </Button>
          <CartSheet />
        </div>
      </div>
    </nav>
  )
}
