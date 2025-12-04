import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const section = searchParams.get('section') || 'restaurant';
    const category = searchParams.get('category');
    const isVeg = searchParams.get('isVeg');
    const isSpicy = searchParams.get('isSpicy');
    const isPopular = searchParams.get('isPopular');

    const where: any = {
      section,
      isAvailable: true,
    };

    if (category) where.category = category;
    if (isVeg === 'true') where.isVeg = true;
    if (isSpicy === 'true') where.isSpicy = true;
    if (isPopular === 'true') where.isPopular = true;

    const menuItems = await prisma.menuItem.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(menuItems);
  } catch (error) {
    console.error('Error fetching menu items:', error);
    return NextResponse.json({ error: 'Failed to fetch menu items' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const menuItem = await prisma.menuItem.create({
      data: body,
    });
    return NextResponse.json(menuItem);
  } catch (error) {
    console.error('Error creating menu item:', error);
    return NextResponse.json({ error: 'Failed to create menu item' }, { status: 500 });
  }
}

