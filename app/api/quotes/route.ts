import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const body = await request.json();

    const {
      type,
      name,
      email,
      phone,
      numberOfPeople,
      date,
      budget,
      preferences,
      notes,
      companyName,
      eventType,
      venue,
    } = body;

    const quoteRequest = await prisma.quoteRequest.create({
      data: {
        userId: session?.user?.id || null,
        type,
        name,
        email,
        phone,
        numberOfPeople,
        date: new Date(date),
        budget,
        preferences: preferences || null,
        notes: notes || null,
        companyName: companyName || null,
        eventType: eventType || null,
        venue: venue || null,
      },
    });

    return NextResponse.json({ quoteId: quoteRequest.id, quote: quoteRequest });
  } catch (error) {
    console.error('Error creating quote request:', error);
    return NextResponse.json({ error: 'Failed to create quote request' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type');

    let where: any = {};

    if (session?.user?.id) {
      where.userId = session.user.id;
    }

    if (type) {
      where.type = type;
    }

    const quotes = await prisma.quoteRequest.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(quotes);
  } catch (error) {
    console.error('Error fetching quotes:', error);
    return NextResponse.json({ error: 'Failed to fetch quotes' }, { status: 500 });
  }
}

