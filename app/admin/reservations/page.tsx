import { prisma } from "@/lib/db"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

async function getReservations() {
  return prisma.reservation.findMany({
    orderBy: { createdAt: 'desc' },
    include: { branch: true }
  })
}

export default async function AdminReservationsPage() {
  const reservations = await getReservations()

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Recent Reservations</h1>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Branch</TableHead>
              <TableHead>Party Size</TableHead>
              <TableHead>Contact</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reservations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No reservations found.
                </TableCell>
              </TableRow>
            ) : (
              reservations.map((res) => (
                <TableRow key={res.id}>
                  <TableCell className="font-medium">{res.name}</TableCell>
                  <TableCell>{new Date(res.date).toLocaleString()}</TableCell>
                  <TableCell>{res.branch.name}</TableCell>
                  <TableCell>{res.partySize} ppl</TableCell>
                  <TableCell>
                    <div className="text-sm">{res.email}</div>
                    <div className="text-xs text-muted-foreground">{res.phone}</div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
