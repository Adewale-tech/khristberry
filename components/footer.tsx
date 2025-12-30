import Link from "next/link"
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-200 py-12 border-t border-slate-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">Krisberry</h3>
            <p className="text-sm text-slate-400">
              Chinese & Intercontinental Restaurant and Bakery. Experience the best of both worlds in Bwari, Kogo, and Ushafa.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/menu" className="hover:text-primary transition-colors">Our Menu</Link></li>
              <li><Link href="/locations" className="hover:text-primary transition-colors">Find a Branch</Link></li>
              <li><Link href="/reservations" className="hover:text-primary transition-colors">Book a Table</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Locations */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Our Branches</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2 items-start">
                <MapPin className="h-4 w-4 mt-1 text-primary" />
                <span>
                  <strong className="block text-white">Bwari (Law School)</strong>
                  Krisberry Complex, Law School Rd
                </span>
              </li>
              <li className="flex gap-2 items-start">
                <MapPin className="h-4 w-4 mt-1 text-primary" />
                <span>
                  <strong className="block text-white">Kogo</strong>
                  Main Junction, Near Veritas
                </span>
              </li>
              <li className="flex gap-2 items-start">
                <MapPin className="h-4 w-4 mt-1 text-primary" />
                <span>
                  <strong className="block text-white">Ushafa</strong>
                  Jordan Road
                </span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Contact Us</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                +234 812 345 6789
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                hello@krisberry.com
              </li>
            </ul>
            <div className="flex gap-4 pt-2">
              <Link href="#" className="hover:text-primary transition-colors"><Facebook className="h-5 w-5" /></Link>
              <Link href="#" className="hover:text-primary transition-colors"><Instagram className="h-5 w-5" /></Link>
              <Link href="#" className="hover:text-primary transition-colors"><Twitter className="h-5 w-5" /></Link>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} Krisberry Pizza Planet. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
