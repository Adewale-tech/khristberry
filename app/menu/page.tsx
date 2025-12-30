import { prisma } from "@/lib/db"
import { MenuClient } from "./client"

export default async function MenuPage() {
  const categories = await prisma.category.findMany({
    include: {
      items: true
    }
  })

  // Transform data to fit the client component if needed,
  // or just pass it directly.
  return (
    <div className="pt-24 pb-16 min-h-screen bg-muted/10">
      <MenuClient initialCategories={categories} />
    </div>
  )
}
