"use client"

import { motion } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

export default function VibeGallery() {
  const ref = useRef(null)
  const images = [
    { src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=600", alt: "Bwari Interior", span: "md:col-span-2 md:row-span-2" },
    { src: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=400", alt: "Chef Plating", span: "md:col-span-1 md:row-span-1" },
    { src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=400", alt: "Outdoor Seating", span: "md:col-span-1 md:row-span-1" },
    { src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=400", alt: "Coffee Corner", span: "md:col-span-1 md:row-span-1" },
    { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=600", alt: "Evening Vibe", span: "md:col-span-2 md:row-span-1" },
  ]

  return (
    <section ref={ref} className="py-24 bg-background">
      <div className="container px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-4"
          >
            The Vibe Check
          </motion.h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Step inside our spaces. Designed for comfort, conversation, and community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px]">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className={`relative rounded-2xl overflow-hidden group shadow-lg cursor-pointer ${img.span}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-bold tracking-widest uppercase border border-white/50 px-4 py-2 rounded-full backdrop-blur-sm">View</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
