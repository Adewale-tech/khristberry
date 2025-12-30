import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image Placeholder */}
      <div className="absolute inset-0 bg-black/60 z-10" />
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=2000')" }}
      />

      <div className="container relative z-20 text-center text-white space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter animate-in fade-in slide-in-from-bottom-4 duration-1000">
          Experience Culinary Excellence
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          Modern dining across multiple locations. Fresh ingredients, exquisite flavors.
        </p>
        <div className="flex gap-4 justify-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          <Button size="lg" className="text-lg px-8" asChild>
            <Link href="/menu">Order Now</Link>
          </Button>
          <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
            <Link href="/reservations">Book a Table</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
