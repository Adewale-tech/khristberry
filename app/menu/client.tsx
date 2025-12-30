"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useBranchStore } from "@/components/branch-selector"
import { useCartStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Plus, ShoppingCart } from "lucide-react"

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
  // Hydration safety for Zustand
  const [isMounted, setIsMounted] = useState(false)
  const selectedBranchId = useBranchStore((state) => state.selectedBranchId)
  const addItem = useCartStore((state) => state.addItem)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Sort categories to put Pizza/Chinese first as they are main attractions
  const sortedCategories = [...initialCategories].sort((a, b) => {
    const priority = ["Pizza", "Chinese", "Grill", "Bakery", "Intercontinental"]
    return priority.indexOf(a.name) - priority.indexOf(b.name)
  })

  const [activeCategory, setActiveCategory] = useState(sortedCategories[0]?.id || "")

  const handleAddToCart = (item: MenuItem) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.imageUrl
    })
    // Simple feedback since we haven't installed a toast lib yet
    // In a real app, use toast()
    const btn = document.getElementById(`btn-${item.id}`)
    if (btn) {
      const originalText = btn.innerHTML
      btn.innerText = "Added!"
      btn.classList.add("bg-green-600")
      setTimeout(() => {
        btn.innerHTML = originalText
        btn.classList.remove("bg-green-600")
      }, 1000)
    }
  }

  return (
    <div className="container px-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4 text-primary">Our Culinary Collection</h1>
        <p className="text-muted-foreground">
          {isMounted && selectedBranchId
            ? "Showing menu available at your selected branch."
            : "Select a branch to see specific availability, or browse our full menu below."}
        </p>
      </div>

      <Tabs defaultValue={sortedCategories[0]?.id} className="w-full" onValueChange={setActiveCategory}>
        <div className="flex justify-center mb-8 overflow-x-auto pb-4">
          <TabsList className="h-auto p-1 bg-muted/50 rounded-full border border-border/50">
            {sortedCategories.map((cat) => (
              <TabsTrigger
                key={cat.id}
                value={cat.id}
                className="rounded-full px-6 py-2 text-sm md:text-base data-[state=active]:bg-primary data-[state=active]:text-white transition-all"
              >
                {cat.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {sortedCategories.map((cat) => (
          <TabsContent key={cat.id} value={cat.id} className="mt-0 animate-in fade-in-50 slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cat.items.map((item) => (
                <Card key={item.id} className="overflow-hidden border-none shadow-md hover:shadow-xl transition-shadow bg-card group">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={item.imageUrl || "/images/placeholder.jpg"}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-2 right-2 flex gap-1">
                      {item.isVegan && <Badge className="bg-green-500 hover:bg-green-600">Vegan</Badge>}
                      {item.isHalal && <Badge className="bg-orange-500 hover:bg-orange-600">Halal</Badge>}
                      {item.isGlutenFree && <Badge className="bg-blue-500 hover:bg-blue-600">GF</Badge>}
                    </div>
                  </div>

                  <CardHeader className="p-5 pb-0">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-xl line-clamp-1">{item.name}</h3>
                      <span className="font-bold text-primary whitespace-nowrap">₦{item.price.toLocaleString()}</span>
                    </div>
                    <p className="text-muted-foreground text-sm line-clamp-2 min-h-[40px]">{item.description}</p>
                  </CardHeader>

                  <CardFooter className="p-5 pt-4">
                    <Button
                      id={`btn-${item.id}`}
                      className="w-full rounded-full bg-secondary hover:bg-secondary/80 text-secondary-foreground font-semibold shadow-sm"
                      onClick={() => handleAddToCart(item)}
                    >
                      <Plus className="w-4 h-4 mr-2" /> Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Concierge Floating Button (from Screenshot) */}
      <div className="fixed bottom-6 right-6 z-40 hidden md:flex">
         <Button className="rounded-full h-14 px-6 shadow-2xl bg-primary text-white hover:bg-primary/90 text-lg">
            Ask the Concierge!
         </Button>
      </div>
    </div>
  )
}
