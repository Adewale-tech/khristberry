"use client"

import Link from "next/link"
import Image from "next/image"
import { useCartStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Minus, Plus, Trash2, ArrowLeft, ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"

export default function CartPage() {
  const [isMounted, setIsMounted] = useState(false)
  const { items, removeItem, updateQuantity, total } = useCartStore()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <div className="min-h-screen pt-28 pb-16 container px-4">Loading cart...</div>
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center container px-4 pt-24">
        <h2 className="text-3xl font-bold mb-4 text-foreground">Your cart is empty</h2>
        <p className="text-muted-foreground mb-8 text-center max-w-md">
          Looks like you haven't added any delicious items yet. Head over to our menu to start your order!
        </p>
        <Link href="/menu">
          <Button size="lg" className="rounded-full px-8">Browse Menu</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container px-4 pt-28 pb-16 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-foreground">Your Order</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={item.id} className="overflow-hidden border-border/50">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="relative h-20 w-20 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                  <Image
                    src={item.image || "/images/placeholder.jpg"}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg truncate">{item.name}</h3>
                  <p className="text-primary font-bold">₦{(item.price * item.quantity).toLocaleString()}</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-border rounded-full bg-background">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full hover:bg-muted"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full hover:bg-muted"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:bg-destructive/10 h-8 w-8 rounded-full"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-28 border-border/50 bg-muted/20">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-6">Order Summary</h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>₦{total().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Service Charge (5%)</span>
                  <span>₦{(total() * 0.05).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>VAT (7.5%)</span>
                  <span>₦{(total() * 0.075).toLocaleString()}</span>
                </div>
                <div className="border-t border-border my-4 pt-4 flex justify-between font-bold text-xl text-foreground">
                  <span>Total</span>
                  <span>₦{(total() * 1.125).toLocaleString()}</span>
                </div>
              </div>

              <Link href="/checkout">
                <Button size="lg" className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90 text-lg font-semibold h-12">
                  Checkout <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <div className="mt-4 text-center">
                 <Link href="/menu" className="text-sm text-muted-foreground hover:text-primary flex items-center justify-center gap-1">
                   <ArrowLeft className="h-3 w-3" /> Continue Shopping
                 </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
