"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useStore } from "@/lib/store"
import { Plus } from "lucide-react"

interface MenuItemCardProps {
  item: {
    id: string
    name: string
    description: string
    price: number
    imageUrl: string | null
    isVegan: boolean
    isGlutenFree: boolean
    isHalal: boolean
  }
}

export default function MenuItemCard({ item }: MenuItemCardProps) {
  const addToCart = useStore((state) => state.addToCart)
  const setIsCartOpen = useStore((state) => state.setIsCartOpen)

  const handleAddToCart = () => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      imageUrl: item.imageUrl
    })
    setIsCartOpen(true)
  }

  return (
    <Card className="overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
      <div className="aspect-video relative overflow-hidden bg-muted">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            No Image
          </div>
        )}
      </div>
      <CardHeader className="p-4">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-lg">{item.name}</CardTitle>
          <span className="font-semibold">${item.price.toFixed(2)}</span>
        </div>
        <div className="flex gap-1 flex-wrap mt-2">
          {item.isVegan && <Badge variant="secondary" className="text-xs">Vegan</Badge>}
          {item.isGlutenFree && <Badge variant="secondary" className="text-xs">GF</Badge>}
          {item.isHalal && <Badge variant="secondary" className="text-xs">Halal</Badge>}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-1">
        <p className="text-sm text-muted-foreground line-clamp-3">{item.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" onClick={handleAddToCart}>
          <Plus className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
