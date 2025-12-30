"use client"

import { useState, useEffect, useMemo } from "react"
import Image from "next/image"
import { useBranchStore } from "@/components/branch-selector"
import { useCartStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Plus, MessageCircle, MapPin } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string | null
  isVegan: boolean
  isGlutenFree: boolean
  isHalal: boolean
  categoryId: string
}

interface Category {
  id: string
  name: string
  items: MenuItem[]
}

export function MenuClient({ initialCategories }: { initialCategories: Category[] }) {
  const [isMounted, setIsMounted] = useState(false)
  const selectedBranchId = useBranchStore((state) => state.selectedBranchId)
  const addItem = useCartStore((state) => state.addItem)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Custom sorting: Promoted items first
  const sortedCategories = useMemo(() => {
    return [...initialCategories].sort((a, b) => {
      const priority = ["Nigerian Organic", "Pizza", "Chinese", "Grill", "Intercontinental", "Bakery"]
      return priority.indexOf(a.name) - priority.indexOf(b.name)
    })
  }, [initialCategories])

  // Ensure activeCategory is set only after mounting to avoid hydration mismatch
  const [activeCategory, setActiveCategory] = useState(sortedCategories[0]?.id || "")

  // Sync active category if sortedCategories changes (e.g. initial load)
  useEffect(() => {
      if(sortedCategories.length > 0 && !activeCategory) {
          setActiveCategory(sortedCategories[0].id)
      }
  }, [sortedCategories, activeCategory])

  const handleAddToCart = (item: MenuItem) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.imageUrl
    })
    // Simple visual feedback
    const btn = document.getElementById(`btn-${item.id}`)
    if (btn) {
      const originalText = btn.innerHTML
      btn.innerHTML = "Added!"
      btn.classList.add("bg-green-600", "text-white")
      setTimeout(() => {
        btn.innerHTML = originalText
        btn.classList.remove("bg-green-600", "text-white")
      }, 1000)
    }
  }

  // Branch Specific Logic (Mocked for visual demonstration)
  const branchName = selectedBranchId === "branch-uuid-bwari" ? "Bwari Branch" :
                     selectedBranchId === "branch-uuid-kogo" ? "Kogo Branch" : "Selected Branch"

  return (
    <div className="container px-4 min-h-screen">
      {/* Menu Header with Branch Context */}
      <div className="text-center mb-12 space-y-4">
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold"
        >
            <MapPin className="w-4 h-4" />
            {isMounted && selectedBranchId ? "Viewing menu for selected location" : "Select a location for specific availability"}
        </motion.div>

        <h1 className="text-4xl md:text-5xl font-bold text-foreground">Our Culinary Collection</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore our diverse menu featuring authentic Nigerian organic dishes, classic Chinese cuisine, and our famous stone-baked pizzas.
        </p>

        {/* WhatsApp Conversion Buttons */}
        <div className="flex justify-center gap-4 pt-4">
             <Button variant="outline" className="gap-2 border-green-500 text-green-600 hover:bg-green-50 hover:text-green-700">
                <MessageCircle className="w-4 h-4" /> Order via WhatsApp
             </Button>
        </div>
      </div>

      <Tabs value={activeCategory} className="w-full" onValueChange={setActiveCategory}>
        <div className="sticky top-20 z-30 bg-background/95 backdrop-blur-md py-4 mb-8 -mx-4 px-4 md:mx-0 md:px-0 border-b border-border/50">
            <div className="flex justify-start md:justify-center overflow-x-auto pb-2 no-scrollbar">
            <TabsList className="h-auto p-1 bg-muted/50 rounded-full border border-border/50 inline-flex">
                {sortedCategories.map((cat) => (
                <TabsTrigger
                    key={cat.id}
                    value={cat.id}
                    className="rounded-full px-6 py-2.5 text-sm md:text-base data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-emerald-600 data-[state=active]:text-white transition-all shadow-sm"
                >
                    {cat.name}
                </TabsTrigger>
                ))}
            </TabsList>
            </div>
        </div>

        <AnimatePresence mode="wait">
            {sortedCategories.map((cat) => (
            <TabsContent key={cat.id} value={cat.id} className="mt-0">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                {cat.items.map((item) => (
                    <Card key={item.id} className="overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-300 bg-card group h-full flex flex-col">
                    <div className="relative h-56 w-full overflow-hidden">
                        <Image
                        src={item.imageUrl || "/images/placeholder.jpg"}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />

                        <div className="absolute top-3 right-3 flex gap-1 flex-wrap justify-end">
                        {item.isVegan && <Badge className="bg-green-500/90 backdrop-blur-sm hover:bg-green-600 border-none shadow-lg">Vegan</Badge>}
                        {item.isHalal && <Badge className="bg-orange-500/90 backdrop-blur-sm hover:bg-orange-600 border-none shadow-lg">Halal</Badge>}
                        {/* Highlights for Specific Items */}
                        {cat.name === "Nigerian Organic" && <Badge className="bg-tangerine/90 backdrop-blur-sm text-white border-none shadow-lg">Local Special</Badge>}
                        </div>

                        <div className="absolute bottom-3 left-3 text-white">
                            <h3 className="font-bold text-xl drop-shadow-md">{item.name}</h3>
                        </div>
                    </div>

                    <CardContent className="p-6 flex-1">
                        <div className="flex justify-between items-start mb-3">
                            <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                             <div className="h-[1px] flex-1 bg-border" />
                             <span className="font-bold text-xl text-primary">₦{item.price.toLocaleString()}</span>
                        </div>
                    </CardContent>

                    <CardFooter className="p-6 pt-0 mt-auto">
                        <Button
                        id={`btn-${item.id}`}
                        className="w-full h-12 rounded-xl bg-muted text-foreground hover:bg-primary hover:text-white font-semibold shadow-sm transition-all duration-300 group-hover:shadow-primary/25"
                        onClick={() => handleAddToCart(item)}
                        >
                        <Plus className="w-5 h-5 mr-2" /> Add to Order
                        </Button>
                    </CardFooter>
                    </Card>
                ))}
                </motion.div>
            </TabsContent>
            ))}
        </AnimatePresence>
      </Tabs>
    </div>
  )
}
