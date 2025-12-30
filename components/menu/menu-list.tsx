"use client"

import { useState } from "react"
import MenuItemCard from "./menu-item-card"
import { Button } from "@/components/ui/button"

interface MenuListProps {
  categories: {
    id: string
    name: string
    items: any[]
  }[]
}

export default function MenuList({ categories }: MenuListProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id)

  return (
    <div className="space-y-8">
      {/* Category Filter */}
      <div className="flex overflow-x-auto pb-4 gap-2 no-scrollbar sticky top-16 z-40 bg-background/95 py-4">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? "default" : "outline"}
            onClick={() => {
              setActiveCategory(category.id)
              document.getElementById(category.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }}
            className="rounded-full"
          >
            {category.name}
          </Button>
        ))}
      </div>

      {/* Menu Items */}
      <div className="space-y-12">
        {categories.map((category) => (
          <div key={category.id} id={category.id} className="scroll-mt-32">
            <h2 className="text-2xl font-bold mb-6">{category.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {category.items.map((item) => (
                <MenuItemCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
