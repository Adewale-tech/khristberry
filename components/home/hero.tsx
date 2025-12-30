"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion, useScroll, useTransform } from "framer-motion"
import { Star, MessageCircle, ArrowRight } from "lucide-react"

export default function Hero() {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, 200])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  return (
    <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Dynamic Background */}
      <motion.div
        style={{ y: y1 }}
        className="absolute inset-0 z-0"
      >
        <div
            className="absolute inset-0 bg-cover bg-center opacity-60 scale-105"
            style={{
            backgroundImage: "url('/images/hero-bg.jpg')",
            backgroundColor: "#011f11"
            }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-black/60" />
      </motion.div>

      {/* Floating Trust Signals */}
      <div className="absolute top-32 left-4 md:left-20 z-20 flex flex-col gap-4">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 p-3 pr-6 rounded-full shadow-2xl"
          >
             <div className="w-10 h-10 rounded-full bg-radiant-gold flex items-center justify-center text-black font-bold shadow-lg">
                3.9
             </div>
             <div>
                <div className="flex text-radiant-gold text-xs">
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 text-white/30" />
                </div>
                <p className="text-white text-xs font-medium">Google Rating</p>
             </div>
          </motion.div>

          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 p-3 pr-6 rounded-full shadow-2xl"
          >
             <div className="w-10 h-10 rounded-full bg-tangerine flex items-center justify-center text-white shadow-lg">
                <MessageCircle className="w-5 h-5" />
             </div>
             <div>
                <p className="text-white font-bold text-sm">167+ Reviews</p>
                <p className="text-white/60 text-xs">Verified Customers</p>
             </div>
          </motion.div>
      </div>

      <div className="container relative z-10 px-4 text-center mt-20">
        <motion.div style={{ opacity }}>
            <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-radiant-gold font-medium tracking-[0.2em] uppercase text-sm md:text-base mb-4">
                    The Taste of Bwari
                </h2>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight leading-none drop-shadow-2xl">
                Welcome to <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">Krisberry</span>
                </h1>
                <p className="text-lg md:text-2xl text-slate-200 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
                Where Chinese precision meets Nigerian soul. Experience the finest <span className="text-tangerine font-semibold">Pizza, Bakery & Grill</span> in town.
                </p>
            </motion.div>

            <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
            <Link href="/menu">
                <Button size="lg" className="h-14 px-8 rounded-full bg-primary hover:bg-primary/90 text-white text-lg font-semibold shadow-[0_0_40px_-10px_rgba(0,255,150,0.3)] hover:shadow-[0_0_60px_-10px_rgba(0,255,150,0.5)] transition-all transform hover:scale-105">
                Order Delivery
                <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
            </Link>
            <Link href="/reservations">
                <Button size="lg" variant="outline" className="h-14 px-8 rounded-full border-white/30 text-white bg-white/5 hover:bg-white hover:text-black text-lg backdrop-blur-sm transition-all">
                Book a Table
                </Button>
            </Link>
            </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-widest">Scroll to Explore</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
      </motion.div>
    </section>
  )
}
