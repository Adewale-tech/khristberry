import { prisma } from "@/lib/db"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import ReservationForm from "@/components/reservations/reservation-form"

async function getBranches() {
  return await prisma.branch.findMany()
}

export default async function ReservationsPage() {
  const branches = await getBranches()

  return (
    <div className="container py-12 max-w-2xl">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Book a Table</h1>
        <p className="text-muted-foreground">
          Reserve your spot at one of our premium locations for an unforgettable dining experience.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Reservation Details</CardTitle>
          <CardDescription>Please fill in the details below to confirm your booking.</CardDescription>
        </CardHeader>
        <CardContent>
          <ReservationForm branches={branches} />
        </CardContent>
      </Card>
    </div>
  )
}
