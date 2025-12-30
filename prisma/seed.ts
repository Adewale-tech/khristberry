import { prisma } from '../lib/db'

async function main() {
  console.log('Seeding Krisberry Pizza Planet database...')

  // Clear existing data
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.reservation.deleteMany()
  await prisma.menuItem.deleteMany()
  await prisma.category.deleteMany()
  await prisma.branch.deleteMany()

  // 1. Create Branches (Bwari, Kogo, Ushafa)
  const branches = await Promise.all([
    prisma.branch.create({
      data: {
        name: "Bwari Branch",
        address: "Krisberry Complex, Bwari Law School Road",
        latitude: 9.2893,
        longitude: 7.3789,
        phone: "+234 812 345 6789",
        email: "bwari@krisberry.com",
        openingTime: "08:00",
        closingTime: "22:00",
        imageUrl: "/images/branch-bwari.jpg", // Placeholder
      }
    }),
    prisma.branch.create({
      data: {
        name: "Kogo Branch",
        address: "Kogo Main Junction, Near Veritas",
        latitude: 9.2900, // Approx
        longitude: 7.3800,
        phone: "+234 812 345 6790",
        email: "kogo@krisberry.com",
        openingTime: "09:00",
        closingTime: "21:00",
        imageUrl: "/images/branch-kogo.jpg",
      }
    }),
    prisma.branch.create({
      data: {
        name: "Ushafa Branch",
        address: "Ushafa Jordan Road",
        latitude: 9.2500,
        longitude: 7.4000,
        phone: "+234 812 345 6791",
        email: "ushafa@krisberry.com",
        openingTime: "09:00",
        closingTime: "21:00",
        imageUrl: "/images/branch-ushafa.jpg",
      }
    })
  ])

  // 2. Create Categories
  const categoriesMap: Record<string, string> = {}
  const categoryNames = ["Pizza", "Chinese", "Bakery", "Grill", "Intercontinental", "Nigerian Organic"]

  for (const name of categoryNames) {
    const cat = await prisma.category.create({ data: { name } })
    categoriesMap[name] = cat.id
  }

  // 3. Create Menu Items
  const items = [
    // Pizza
    {
      name: "Classic Pepperoni Planet",
      description: "Loaded with double pepperoni, mozzarella, and our secret tomato sauce.",
      price: 4500.00,
      categoryId: categoriesMap["Pizza"],
      isHalal: true,
      imageUrl: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80&w=500"
    },
    {
      name: "BBQ Chicken Supreme",
      description: "Grilled chicken, red onions, corn, and smoky BBQ drizzle.",
      price: 5000.00,
      categoryId: categoriesMap["Pizza"],
      isHalal: true,
      imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=500"
    },
    {
      name: "Veggie Delight",
      description: "Bell peppers, mushrooms, onions, olives, and tomatoes.",
      price: 4000.00,
      categoryId: categoriesMap["Pizza"],
      isVegan: true,
      isHalal: true,
      imageUrl: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&q=80&w=500"
    },

    // Chinese
    {
      name: "Special Fried Rice",
      description: "Wok-fried rice with shrimp, chicken, eggs, and mixed veggies.",
      price: 3500.00,
      categoryId: categoriesMap["Chinese"],
      isHalal: true,
      imageUrl: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&q=80&w=500"
    },
    {
      name: "Chicken Chow Mein",
      description: "Stir-fried noodles with tender chicken strips and crisp vegetables.",
      price: 3800.00,
      categoryId: categoriesMap["Chinese"],
      isHalal: true,
      imageUrl: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=500"
    },
    {
      name: "Sweet & Sour Chicken",
      description: "Crispy chicken chunks tossed in a tangy sweet and sour glaze.",
      price: 4200.00,
      categoryId: categoriesMap["Chinese"],
      isHalal: true,
      imageUrl: "https://images.unsplash.com/photo-1525755617299-720656613865?auto=format&fit=crop&q=80&w=500"
    },

    // Bakery
    {
      name: "Krisberry Meat Pie",
      description: "Flaky pastry filled with seasoned minced meat and potatoes.",
      price: 800.00,
      categoryId: categoriesMap["Bakery"],
      isHalal: true,
      imageUrl: "https://images.unsplash.com/photo-1572383672419-ab47799639f3?auto=format&fit=crop&q=80&w=500"
    },
    {
      name: "Chicken Pie",
      description: "Rich creamy chicken filling in a golden crust.",
      price: 1000.00,
      categoryId: categoriesMap["Bakery"],
      isHalal: true,
      imageUrl: "https://images.unsplash.com/photo-1626804475297-411f7c7526ae?auto=format&fit=crop&q=80&w=500"
    },
    {
      name: "Fresh Bread Loaf",
      description: "Soft, fluffy, freshly baked family loaf.",
      price: 1200.00,
      categoryId: categoriesMap["Bakery"],
      isVegan: true,
      isHalal: true,
      imageUrl: "https://images.unsplash.com/photo-1598373182133-52452f7691ef?auto=format&fit=crop&q=80&w=500"
    },

    // Grill
    {
      name: "Spicy Grilled Chicken",
      description: "Quarter chicken marinated in hot pepper sauce and grilled to perfection.",
      price: 3000.00,
      categoryId: categoriesMap["Grill"],
      isGlutenFree: true,
      isHalal: true,
      imageUrl: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&q=80&w=500"
    },
    {
      name: "Beef Suya",
      description: "Spicy skewered beef with onions and cabbage (Naija style).",
      price: 2500.00,
      categoryId: categoriesMap["Grill"],
      isGlutenFree: true,
      isHalal: true,
      imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=500"
    },

    // Intercontinental
    {
      name: "Creamy Alfredo Pasta",
      description: "Fettuccine pasta in a rich parmesan and cream sauce.",
      price: 4500.00,
      categoryId: categoriesMap["Intercontinental"],
      isHalal: true,
      imageUrl: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&q=80&w=500"
    },

    // Nigerian Organic (Bwari Specials)
    {
      name: "Bwari Goat Meat Pepper Soup",
      description: "Spicy, aromatic broth made with fresh local herbs and tender goat meat.",
      price: 3000.00,
      categoryId: categoriesMap["Nigerian Organic"],
      isHalal: true,
      isGlutenFree: true,
      imageUrl: "https://images.unsplash.com/photo-1543826173-70651703c5a4?auto=format&fit=crop&q=80&w=500"
    },
    {
      name: "Ofada Rice & Ayamase",
      description: "Local unpolished rice served with spicy green pepper sauce and assorted meats.",
      price: 4000.00,
      categoryId: categoriesMap["Nigerian Organic"],
      isHalal: true,
      imageUrl: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f1a?auto=format&fit=crop&q=80&w=500"
    },
    {
      name: "Catfish Peppersoup (Point & Kill)",
      description: "Fresh catfish from Usuma Dam cooked in rich spices. Bwari exclusive.",
      price: 5000.00,
      categoryId: categoriesMap["Nigerian Organic"],
      isHalal: true,
      isGlutenFree: true,
      imageUrl: "https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&q=80&w=500"
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
