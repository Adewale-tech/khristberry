import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Gourmet Brand</h3>
            <p className="text-sm text-muted-foreground">
              Experience the finest culinary delights at our multiple locations.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/" className="hover:text-primary">Home</a></li>
              <li><a href="/menu" className="hover:text-primary">Menu</a></li>
              <li><a href="/reservations" className="hover:text-primary">Reservations</a></li>
              <li><a href="/admin" className="hover:text-primary">Staff Login</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>support@gourmetbrand.com</li>
              <li>+1 (555) 123-4567</li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4 text-muted-foreground">
              <a href="#" className="hover:text-primary"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="hover:text-primary"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="hover:text-primary"><Twitter className="h-5 w-5" /></a>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Gourmet Brand. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
