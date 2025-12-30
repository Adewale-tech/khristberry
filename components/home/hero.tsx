import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Background Image Overlay */}
      <div
        className="absolute inset-0 z-0 opacity-40"
        style={{
          backgroundImage: "url('/images/hero-bg.jpg')", // Need to ensure this exists or use a gradient for now
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "#011f11" // Fallback to dark green
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50" />
      </div>

      <div className="container relative z-10 px-4 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
          <span className="block text-primary mb-2 text-2xl md:text-3xl font-medium tracking-widest uppercase">Welcome to</span>
          Krisberry Pizza Planet
        </h1>
        <p className="text-lg md:text-2xl text-slate-200 mb-8 max-w-2xl mx-auto leading-relaxed">
          The ultimate destination for Chinese & Intercontinental cuisine, fresh bakery delights, and the best pizza in town.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/menu">
            <Button size="lg" className="text-lg px-8 py-6 rounded-full bg-primary hover:bg-primary/90 text-white border-none shadow-lg shadow-primary/20 w-full sm:w-auto">
              Order Now
            </Button>
          </Link>
          <Link href="/locations">
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 rounded-full border-2 border-white text-primary bg-white/90 hover:bg-white hover:text-primary shadow-lg w-full sm:w-auto">
              Find a Branch
            </Button>
          </Link>
        </div>
      </div>

      {/* Decorative Dots Pattern (Simulating the screenshot design) */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:16px_16px] [mask-image:linear-gradient(to_top,black,transparent)]" />
    </section>
  )
}
