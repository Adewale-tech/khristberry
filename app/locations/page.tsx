import { prisma } from "@/lib/db"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Clock, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export default async function LocationsPage() {
  const branches = await prisma.branch.findMany()

  return (
    <div className="container px-4 py-24 min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4 text-primary">Our Locations</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Visit us at any of our three convenient locations in Bwari, Kogo, and Ushafa.
          Experience the same great taste and hospitality everywhere.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {branches.map((branch) => (
          <Card key={branch.id} className="overflow-hidden border-border/50 hover:shadow-lg transition-shadow">
             {/* Map Placeholder */}
            <div className="h-48 bg-muted w-full relative group">
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                    <MapPin className="w-12 h-12 opacity-20" />
                </div>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button variant="secondary">View on Map</Button>
                </div>
            </div>

            <CardHeader>
              <CardTitle className="text-xl font-bold text-foreground">{branch.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>{branch.address}</span>
              </div>
              <div className="flex gap-3">
                <Clock className="w-5 h-5 text-primary shrink-0" />
                <span>{branch.openingTime} - {branch.closingTime}</span>
              </div>
              <div className="flex gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>{branch.phone}</span>
              </div>
               <div className="flex gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>{branch.email}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
