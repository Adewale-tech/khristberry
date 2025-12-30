"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingBag, Menu, X, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { BranchSelector } from "@/components/branch-selector"
import { useCartStore } from "@/lib/store"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function Header({ branches }: { branches: any[] }) {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${
          isScrolled
            ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-md shadow-sm py-3 border-border/50"
            : "bg-transparent py-5 border-transparent"
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group relative z-50">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.8, ease: "anticipate" }}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-tangerine flex items-center justify-center text-white font-bold text-xl shadow-lg"
            >
              K
            </motion.div>
            <span className={`font-bold text-xl hidden sm:block tracking-tight transition-colors duration-300 ${isScrolled ? "text-foreground" : "text-white drop-shadow-md"}`}>
              Krisberry
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 bg-black/10 backdrop-blur-sm rounded-full px-8 py-2 border border-white/10 shadow-inner">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-all duration-300 relative group ${
                  pathname === link.href ? "text-radiant-gold" : "text-white/90 hover:text-white"
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-radiant-gold transition-all duration-300 group-hover:w-full ${pathname === link.href ? "w-full" : ""}`} />
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <BranchSelector branches={branches} />
            </div>

            <Link href="/cart">
              <Button
                variant="ghost"
                size="icon"
                className={`relative transition-colors duration-300 hover:bg-white/20 rounded-full h-12 w-12 ${
                  !isScrolled ? "text-white" : "text-foreground hover:bg-black/5"
                }`}
              >
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2 right-2 h-4 w-4 rounded-full bg-tangerine text-white text-[10px] font-bold flex items-center justify-center shadow-md border border-white/20"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Trigger */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(true)}
              className={`md:hidden rounded-full h-12 w-12 hover:bg-white/20 ${!isScrolled ? "text-white" : "text-foreground"}`}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar (Custom Sheet for better animation control) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[85%] max-w-[350px] bg-background/95 backdrop-blur-xl border-l border-white/10 z-[70] shadow-2xl p-6 flex flex-col gap-8"
            >
              <div className="flex justify-between items-center">
                <span className="font-bold text-2xl bg-gradient-to-r from-primary to-tangerine bg-clip-text text-transparent">Menu</span>
                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)} className="rounded-full hover:bg-muted">
                  <X className="h-6 w-6" />
                </Button>
              </div>

              <div className="space-y-6">
                 <div>
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3 block">Location</label>
                  <BranchSelector branches={branches} />
                </div>

                <nav className="flex flex-col gap-2">
                   <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2 block">Navigate</label>
                  {navLinks.map((link, idx) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className={`text-xl font-medium p-3 rounded-xl transition-all ${
                          pathname === link.href
                            ? "bg-primary/10 text-primary pl-5 border-l-4 border-primary"
                            : "text-foreground hover:bg-muted hover:pl-5"
                        }`}
                      >
                        {link.label}
                      </motion.div>
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="mt-auto p-6 rounded-2xl bg-gradient-to-br from-primary to-emerald-900 text-white relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-700" />
                 <h4 className="font-bold text-lg mb-1 relative z-10">Hungry?</h4>
                 <p className="text-white/80 text-sm mb-4 relative z-10">Order now for delivery or pickup.</p>
                 <Button onClick={() => { setIsMobileMenuOpen(false); window.location.href='/menu' }} className="w-full bg-white text-primary hover:bg-white/90 font-bold shadow-lg relative z-10">Order Now</Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
