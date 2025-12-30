"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, X, Send, Sparkles, ChefHat } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Message {
  role: "user" | "bot"
  text: string
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Hello! I'm your Krisberry Flavor Concierge. 🧑‍🍳 Looking for spicy Nigerian vibes or classic Chinese comfort today?" }
  ])
  const [inputValue, setInputValue] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = () => {
    if (!inputValue.trim()) return

    const userMsg = inputValue
    setMessages(prev => [...prev, { role: "user", text: userMsg }])
    setInputValue("")

    // Simulated AI Logic
    setTimeout(() => {
      let response = "That sounds delicious! You can find that on our menu page."
      const lower = userMsg.toLowerCase()

      if (lower.includes("spicy") || lower.includes("pepper") || lower.includes("hot")) {
        response = "Ooooh, you like it hot! 🔥 I highly recommend the Bwari Goat Meat Pepper Soup or the Spicy Grilled Chicken. They pack a punch!"
      } else if (lower.includes("chinese") || lower.includes("rice") || lower.includes("noodle")) {
        response = "Great choice! Our Special Fried Rice and Chicken Chow Mein are local favorites. 🥡 Authentic wok-hei flavor!"
      } else if (lower.includes("pizza")) {
        response = "Pizza Planet time! 🍕 The BBQ Chicken Supreme is a crowd pleaser. Would you like to see the size options?"
      } else if (lower.includes("location") || lower.includes("where")) {
        response = "We have beautiful spots in Bwari (Law School area), Kogo, and Ushafa. Which one is closest to you?"
      } else if (lower.includes("delivery")) {
        response = "We deliver! Just fill up your cart and checkout. We'll zip it over to you fresh and hot. 🛵"
      }

      setMessages(prev => [...prev, { role: "bot", text: response }])
    }, 1000)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="pointer-events-auto bg-background/95 backdrop-blur-xl border border-border/50 shadow-2xl rounded-2xl w-[90vw] md:w-[380px] h-[500px] mb-4 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-tangerine p-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-2">
                <div className="bg-white/20 p-1.5 rounded-full">
                  <ChefHat className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Flavor Concierge</h3>
                  <p className="text-[10px] opacity-80 flex items-center gap-1">
                    <Sparkles className="w-2 h-2" /> AI Powered
                  </p>
                </div>
              </div>
              <Button size="icon" variant="ghost" className="h-8 w-8 text-white hover:bg-white/20 rounded-full" onClick={() => setIsOpen(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] p-3 text-sm rounded-2xl ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-muted text-foreground rounded-bl-sm border border-border/50"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 border-t bg-muted/30">
              <form
                onSubmit={(e) => { e.preventDefault(); handleSend() }}
                className="flex gap-2"
              >
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask for recommendations..."
                  className="rounded-full bg-background border-border/50 focus-visible:ring-primary"
                />
                <Button type="submit" size="icon" className="rounded-full bg-tangerine hover:bg-orange-600 shrink-0">
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto h-14 w-14 rounded-full bg-gradient-to-br from-primary to-emerald-600 shadow-[0_0_20px_rgba(0,0,0,0.3)] flex items-center justify-center text-white relative group border-2 border-white/20"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
               <MessageSquare className="w-6 h-6" />
               <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
