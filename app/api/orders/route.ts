import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, email, phone, street, area, city, postalCode, specialNotes, items, subtotal, deliveryCharge, total } = body;

    // Create address
    const address = await prisma.address.create({
      data: {
        userId: session.user.id,
        label: 'Delivery Address',
        street,
        area,
        city,
        postalCode: postalCode || '',
      },
    });

    // Create order
    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        addressId: address.id,
        customerName: name,
        customerPhone: phone,
        customerEmail: email,
        subtotal,
        deliveryCharge,
        total,
        specialNotes: specialNotes || null,
        items: {
          create: items.map((item: any) => ({
            menuItemId: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    return NextResponse.json({ orderId: order.id, order });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const orders = await prisma.order.findMany({
      where: { userId: session.user.id },
      include: {
        items: true,
        address: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

