import { prisma } from "@/lib/db"
import MenuList from "@/components/menu/menu-list"
import { Badge } from "@/components/ui/badge"

async function getMenuData() {
  const categories = await prisma.category.findMany({
    include: {
      items: true
    }
  })
  return categories
}

async function getBranch(id: string) {
  return prisma.branch.findUnique({
    where: { id }
  })
}

export default async function MenuPage({
  searchParams,
}: {
  searchParams: Promise<{ branch?: string }>
}) {
  const params = await searchParams
  const branchId = params.branch

  const categories = await getMenuData()
  const branch = branchId ? await getBranch(branchId) : null

  return (
    <div className="container py-8 min-h-screen">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Our Menu</h1>
        {branch ? (
          <div className="flex items-center gap-2 text-muted-foreground">
            <span>Ordering from:</span>
            <Badge variant="outline" className="text-base">{branch.name}</Badge>
          </div>
        ) : (
          <p className="text-muted-foreground">Select a branch for specific availability.</p>
        )}
      </div>

      <MenuList categories={categories} />
    </div>
  )
}
