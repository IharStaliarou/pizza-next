import { prisma } from '@/prisma/prisma-client';
import { OrderStatus } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

import { PaymentCallbackData } from '@/@types/yookassa';
import { OrderSuccessTemplate } from '@/components/shared';
import { sendEmail } from '@/lib';
import { CartItemDTO } from '@/services/dto/cart.dto';

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as PaymentCallbackData;

    const order = await prisma.order.findFirst({
      where: {
        id: Number(body.object.metadata.order_id),
      },
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' });
    }

    const isSucceeded = body.object.status === 'succeeded';

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: isSucceeded ? OrderStatus.SUCCEEDED : OrderStatus.CANCELLED,
      },
    });

    const items = JSON.parse(order?.items as string) as CartItemDTO[];

    if (isSucceeded) {
      await sendEmail(
        order.email,
        'Next Pizza / Your order has been successfully checkout. 🎉',
        OrderSuccessTemplate({ orderId: order.id, items })
      );
    } else {
      // TODO: send email with error message
    }
  } catch (error) {
    console.log('[Checkout Callback] Error:', error);
    return NextResponse.json({ error: 'Server error' });
  }
}
