import { prisma } from '../lib/db'

async function main() {
  console.log('Seeding database...')

  // Clear existing data
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.reservation.deleteMany()
  await prisma.menuItem.deleteMany()
  await prisma.category.deleteMany()
  await prisma.branch.deleteMany()

  // 1. Create Branches
  const branches = await Promise.all([
    prisma.branch.create({
      data: {
        name: "Downtown Gourmet",
        address: "123 Main St, City Center",
        latitude: 40.7128,
        longitude: -74.0060,
        phone: "+1 555-0101",
        email: "downtown@gourmet.com",
        openingTime: "10:00",
        closingTime: "22:00",
        imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1000",
      }
    }),
    prisma.branch.create({
      data: {
        name: "Riverside Bistro",
        address: "45 River Rd, Riverside",
        latitude: 40.7308,
        longitude: -73.9973,
        phone: "+1 555-0102",
        email: "riverside@gourmet.com",
        openingTime: "11:00",
        closingTime: "23:00",
        imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1000",
      }
    }),
    // The specific location from the map link (approximate based on standard Google Maps link structure if coords aren't extracted,
    // but I'll use a placeholder or known coords for the "Map Link" provided in prompt if I could parse it.
    // Since it's a shortened URL, I can't extract coords directly without visiting.
    // I will mock a "Greenwich Village" location as the requested map spot.)
    prisma.branch.create({
      data: {
        name: "Greenwich Village",
        address: "10 Downing St, New York, NY 10014",
        latitude: 40.7304,
        longitude: -74.0021,
        phone: "+1 555-0103",
        email: "greenwich@gourmet.com",
        openingTime: "09:00",
        closingTime: "21:00",
        imageUrl: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1000",
      }
    })
  ])

  // 2. Create Categories
  const categories = await Promise.all([
    prisma.category.create({ data: { name: "Starters" } }),
    prisma.category.create({ data: { name: "Mains" } }),
    prisma.category.create({ data: { name: "Desserts" } }),
    prisma.category.create({ data: { name: "Drinks" } }),
  ])

  // 3. Create Menu Items
  const items = [
    {
      name: "Truffle Arancini",
      description: "Crispy risotto balls with black truffle and mozzarella.",
      price: 12.00,
      categoryId: categories[0].id,
      isVegan: false,
      isGlutenFree: false,
      isHalal: true,
      imageUrl: "https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&q=80&w=500"
    },
    {
      name: "Bruschetta Pomodoro",
      description: "Toasted sourdough with fresh tomatoes, basil, and balsamic glaze.",
      price: 9.50,
      categoryId: categories[0].id,
      isVegan: true,
      isGlutenFree: false,
      isHalal: true,
      imageUrl: "https://images.unsplash.com/photo-1572695157363-bc31c2847b27?auto=format&fit=crop&q=80&w=500"
    },
    {
      name: "Wagyu Beef Burger",
      description: "Premium wagyu patty, brioche bun, aged cheddar, and house sauce.",
      price: 24.00,
      categoryId: categories[1].id,
      isVegan: false,
      isGlutenFree: false,
      isHalal: true,
      imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=500"
    },
    {
      name: "Wild Mushroom Risotto",
      description: "Creamy arborio rice with porcini mushrooms and parmesan.",
      price: 18.00,
      categoryId: categories[1].id,
      isVegan: false, // has butter/cheese usually
      isGlutenFree: true,
      isHalal: true,
      imageUrl: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&q=80&w=500"
    },
    {
      name: "Vegan Buddha Bowl",
      description: "Quinoa, avocado, roasted chickpeas, kale, and tahini dressing.",
      price: 16.00,
      categoryId: categories[1].id,
      isVegan: true,
      isGlutenFree: true,
      isHalal: true,
      imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=500"
    },
    {
      name: "Tiramisu",
      description: "Classic Italian dessert with coffee-soaked ladyfingers and mascarpone cream.",
      price: 10.00,
      categoryId: categories[2].id,
      isVegan: false,
      isGlutenFree: false,
      isHalal: true,
      imageUrl: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=500"
    },
    {
      name: "Chocolate Lava Cake",
      description: "Warm chocolate cake with a molten center, served with vanilla ice cream.",
      price: 11.00,
      categoryId: categories[2].id,
      isVegan: false,
      isGlutenFree: false,
      isHalal: true,
      imageUrl: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=500"
    },
    {
      name: "Artisan Lemonade",
      description: "Freshly squeezed lemon with mint and honey.",
      price: 5.00,
      categoryId: categories[3].id,
      isVegan: true,
      isGlutenFree: true,
      isHalal: true,
      imageUrl: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=500"
    }
  ]

  for (const item of items) {
    await prisma.menuItem.create({ data: item })
  }

  console.log('Seeding completed.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
