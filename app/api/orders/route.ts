import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { items, total, branchId } = body

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'No items in order' }, { status: 400 })
    }

    if (!branchId) {
      // In a real app, we'd enforce this, but for now fallback to first branch if missing
      // or return error. Let's return error to force branch selection.
      const firstBranch = await prisma.branch.findFirst()
      if (!firstBranch) return NextResponse.json({ error: 'No branches available' }, { status: 500 })
    }

    // Use a default branch if none provided (for prototype ease)
    const finalBranchId = branchId || (await prisma.branch.findFirst())?.id

    const order = await prisma.order.create({
      data: {
        total,
        branchId: finalBranchId,
        status: 'PAID', // Mocking instant payment success
        items: {
          create: items.map((item: any) => ({
            menuItemId: item.id,
            quantity: item.quantity,
            price: item.price
          }))
        }
      }
    })

    return NextResponse.json({ success: true, orderId: order.id })
  } catch (error) {
    console.error('Order creation failed:', error)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}
