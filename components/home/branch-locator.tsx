import { prisma } from "@/lib/db"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Clock } from "lucide-react"
import Link from "next/link"
import MapPlaceholder from "@/components/ui/map-placeholder"

async function getBranches() {
  const branches = await prisma.branch.findMany()
  return branches
}

export default async function BranchLocator() {
  const branches = await getBranches()

  return (
    <section className="py-16 container">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight mb-4">Find Your Nearest Location</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Visit us at one of our premium locations. Each branch offers a unique atmosphere while maintaining our high standards of service.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          {branches.map((branch) => (
            <Card key={branch.id} className="hover:border-primary/50 transition-colors cursor-pointer group">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 group-hover:text-primary transition-colors">
                  <MapPin className="h-5 w-5" />
                  {branch.name}
                </CardTitle>
                <CardDescription>{branch.address}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  {branch.phone}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {branch.openingTime} - {branch.closingTime}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/menu?branch=${branch.id}`}>Order from here</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="lg:col-span-2 h-full min-h-[400px]">
          <MapPlaceholder />
        </div>
      </div>
    </section>
  )
}
