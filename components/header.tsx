"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingBag, Menu, X, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { BranchSelector } from "@/components/branch-selector"
import { useCartStore } from "@/lib/store"
import { useState, useEffect } from "react"

export function Header({ branches }: { branches: any[] }) {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)

  // Hydration-safe cart count
  const [cartCount, setCartCount] = useState(0)
  const cartItems = useCartStore((state) => state.items)

  useEffect(() => {
    setCartCount(cartItems.reduce((acc, item) => acc + item.quantity, 0))
  }, [cartItems])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/menu", label: "Menu" },
    { href: "/locations", label: "Locations" },
    { href: "/about", label: "About" },
  ]

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 dark:bg-slate-950/95 backdrop-blur-md shadow-sm py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl group-hover:scale-105 transition-transform">
            K
          </div>
          <span className={`font-bold text-xl hidden sm:block ${isScrolled ? "text-foreground" : "text-white drop-shadow-md"}`}>
            Krisberry
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium hover:text-primary transition-colors ${
                pathname === link.href ? "text-primary" : (isScrolled ? "text-muted-foreground" : "text-white/90 hover:text-white")
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
            <BranchSelector branches={branches} />
          </div>

          <Link href="/cart">
            <Button variant="ghost" size="icon" className={`relative ${!isScrolled && "text-white hover:bg-white/20"}`}>
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-secondary text-secondary-foreground text-[10px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>
          </Link>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className={`md:hidden ${!isScrolled && "text-white hover:bg-white/20"}`}>
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetTitle>Menu</SheetTitle>
              <div className="flex flex-col gap-6 mt-8">
                <div className="sm:hidden">
                  <label className="text-sm font-medium mb-2 block">Select Branch</label>
                  <BranchSelector branches={branches} />
                </div>
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`text-lg font-medium ${
                        pathname === link.href ? "text-primary" : "text-foreground"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
