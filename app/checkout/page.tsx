"use client"

import { useStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import PaymentForm from "@/components/checkout/payment-form"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle2 } from "lucide-react"

export default function CheckoutPage() {
  const { cart, clearCart, selectedBranchId } = useStore()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handlePayment = async () => {
    setIsProcessing(true)

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart,
          total,
          branchId: selectedBranchId
        })
      })

      if (response.ok) {
        setIsSuccess(true)
        clearCart()
      } else {
        alert('Payment failed. Please try again.')
      }
    } catch (error) {
      console.error(error)
      alert('An error occurred.')
    } finally {
      setIsProcessing(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="container py-16 flex flex-col items-center justify-center text-center space-y-6">
        <CheckCircle2 className="h-24 w-24 text-green-500 animate-in zoom-in duration-500" />
        <h1 className="text-3xl font-bold">Order Confirmed!</h1>
        <p className="text-muted-foreground max-w-md">
          Thank you for your order. We are preparing your delicious meal now.
        </p>
        <Button onClick={() => router.push('/')}>Return Home</Button>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Button onClick={() => router.push('/menu')}>Go to Menu</Button>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <span>{item.quantity}x {item.name}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t pt-4 flex justify-between items-center font-bold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment Form */}
        <div>
          <PaymentForm onSubmit={handlePayment} isProcessing={isProcessing} />
        </div>
      </div>
    </div>
  )
}
