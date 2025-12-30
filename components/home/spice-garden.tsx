"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

export default function SpiceGarden() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45])

  const ingredients = [
    { src: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&q=80&w=300", alt: "Red Pepper", x: "10%", y: "20%", rotate: -15 },
    { src: "https://images.unsplash.com/photo-1615485925763-867862f80c35?auto=format&fit=crop&q=80&w=300", alt: "Fresh Basil", x: "85%", y: "15%", rotate: 20 },
    { src: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=300", alt: "Garlic", x: "75%", y: "60%", rotate: 10 },
  ]

  const timeline = [
    { time: "06:00 AM", title: "Market Source", desc: "Our chefs visit the Bwari Central Market to hand-pick the ripest scotch bonnets." },
    { time: "09:00 AM", title: "Prep Kitchen", desc: "Spices are roasted and ground in-house to release their essential oils." },
    { time: "11:00 AM", title: "Slow Cook", desc: "Sauces simmer for hours before service begins." },
  ]

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden bg-gradient-to-b from-tangerine to-orange-600 text-white">
      {/* Decorative Floating Ingredients */}
      <div className="absolute inset-0 pointer-events-none">
         {/* Simulate floating cutouts with rounded images for now */}
         {ingredients.map((item, i) => (
             <motion.div
                key={i}
                style={{ left: item.x, top: item.y, y: i % 2 === 0 ? y1 : y2, rotate: i === 1 ? rotate : 0 }}
                className="absolute w-24 h-24 md:w-40 md:h-40 rounded-full overflow-hidden shadow-2xl border-4 border-white/20 opacity-80"
             >
                 <Image src={item.src} alt={item.alt} fill className="object-cover" />
             </motion.div>
         ))}
      </div>

      <div className="container relative z-10 px-4">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur-md text-sm font-bold uppercase tracking-widest mb-4 border border-white/30"
          >
            Farm to Table
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-md"
          >
            The Bwari Spice Garden
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl max-w-2xl mx-auto font-light text-white/90"
          >
            We don't just cook food. We celebrate the vibrant, sun-kissed ingredients of Nigeria.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
           {/* Connecting Line */}
           <div className="hidden md:block absolute top-12 left-0 w-full h-1 bg-white/20 -z-10" />

           {timeline.map((item, idx) => (
             <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                className="relative"
             >
                <div className="w-6 h-6 bg-white rounded-full mx-auto mb-6 shadow-[0_0_20px_rgba(255,255,255,0.5)] z-10 relative border-4 border-orange-500" />
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-8 rounded-2xl hover:bg-white/20 transition-colors">
                    <div className="text-radiant-gold font-bold text-xl mb-2">{item.time}</div>
                    <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                    <p className="text-white/80 leading-relaxed">
                        {item.desc}
                    </p>
                </div>
             </motion.div>
           ))}
        </div>
      </div>

      {/* Texture Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.15),_transparent_60%),url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay pointer-events-none" />
    </section>
  )
}
