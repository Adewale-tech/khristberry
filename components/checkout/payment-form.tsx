"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { CreditCard } from "lucide-react"

interface PaymentFormProps {
  onSubmit: () => Promise<void>
  isProcessing: boolean
}

export default function PaymentForm({ onSubmit, isProcessing }: PaymentFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Details</CardTitle>
        <CardDescription>Enter your payment information securely. (Mock)</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="card-number">Card Number</Label>
          <div className="relative">
            <CreditCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input id="card-number" placeholder="0000 0000 0000 0000" className="pl-9" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="expiry">Expiry</Label>
            <Input id="expiry" placeholder="MM/YY" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="cvc">CVC</Label>
            <Input id="cvc" placeholder="123" />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="name">Cardholder Name</Label>
          <Input id="name" placeholder="John Doe" />
        </div>

        <Button className="w-full mt-4" onClick={onSubmit} disabled={isProcessing}>
          {isProcessing ? "Processing..." : "Pay Now"}
        </Button>
      </CardContent>
    </Card>
  )
}
