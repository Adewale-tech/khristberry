"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "lucide-react"

interface Branch {
  id: string
  name: string
}

export default function ReservationForm({ branches }: { branches: Branch[] }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (res.ok) {
        setSuccess(true)
      } else {
        alert('Booking failed. Please try again.')
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="text-center py-8 space-y-4">
        <div className="h-12 w-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
          <Calendar className="h-6 w-6" />
        </div>
        <h3 className="text-xl font-bold">Reservation Confirmed!</h3>
        <p className="text-muted-foreground">We have received your booking request. You will receive a confirmation email shortly.</p>
        <Button onClick={() => setSuccess(false)} variant="outline">Make another booking</Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="branchId">Select Branch</Label>
          <Select name="branchId" required>
            <SelectTrigger>
              <SelectValue placeholder="Choose a location" />
            </SelectTrigger>
            <SelectContent>
              {branches.map((b) => (
                <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input type="date" name="date" required min={new Date().toISOString().split('T')[0]} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <Input type="time" name="time" required />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="partySize">Party Size</Label>
          <Input type="number" name="partySize" min="1" max="20" required placeholder="2" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input name="name" required placeholder="Jane Doe" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input type="email" name="email" required placeholder="jane@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input type="tel" name="phone" required placeholder="+1 234 567 890" />
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Confirming..." : "Confirm Reservation"}
      </Button>
    </form>
  )
}
