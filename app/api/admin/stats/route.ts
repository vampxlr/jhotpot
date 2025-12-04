import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const [totalOrders, pendingOrders, totalQuotes, revenueData] = await Promise.all([
      prisma.order.count(),
      prisma.order.count({
        where: {
          status: { in: ['NEW', 'PREPARING', 'OUT_FOR_DELIVERY'] },
        },
      }),
      prisma.quoteRequest.count(),
      prisma.order.aggregate({
        _sum: {
          total: true,
        },
        where: {
          status: 'DELIVERED',
        },
      }),
    ]);

    return NextResponse.json({
      totalOrders,
      pendingOrders,
      totalQuotes,
      totalRevenue: revenueData._sum.total || 0,
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}

