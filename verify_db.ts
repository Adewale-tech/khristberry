import { prisma } from './lib/db'

async function main() {
  const branchCount = await prisma.branch.count()
  const categoryCount = await prisma.category.count()
  const itemCount = await prisma.menuItem.count()

  console.log(`Branches: ${branchCount}`)
  console.log(`Categories: ${categoryCount}`)
  console.log(`MenuItems: ${itemCount}`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
