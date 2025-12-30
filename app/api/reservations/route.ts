import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, phone, date, time, partySize, branchId } = body

    // Combine date and time (simplification for prototype)
    // Assume date is YYYY-MM-DD and time is HH:MM
    const dateTime = new Date(`${date}T${time}:00`)

    const reservation = await prisma.reservation.create({
      data: {
        name,
        email,
        phone,
        date: dateTime,
        partySize: parseInt(partySize),
        branchId
      }
    })

    return NextResponse.json({ success: true, id: reservation.id })
  } catch (error) {
    console.error('Reservation failed:', error)
    return NextResponse.json({ error: 'Failed to create reservation' }, { status: 500 })
  }
}
