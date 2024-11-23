import { prisma } from "@/prisma/prisma-client";
import { updateCartTotalAmount } from "@/shared/lib/update-cart-total-amount";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    const data = (await req.json()) as { quantity: number };
    const token = req.cookies.get('cartToken')?.value;

    if (!token) {
      return NextResponse.json({message: 'Токен корзины не найден'});
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id,
      },
    });

    if (!cartItem) {
      return NextResponse.json({message: 'Товар не найден'});
    }

    await prisma.cartItem.update({
      where: {
        id,
      },
      data: {
        quantity: data.quantity,
      },
    });

    const updatedUserCart = await updateCartTotalAmount(token);

    return NextResponse.json(updatedUserCart);
  } catch (error) {
    console.log('[CART PATCH] Server error', error);
    return NextResponse.json({message: 'Не удалось обновить корзину'}, {status: 500});
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    const token = req.cookies.get('cartToken')?.value;

    if(!token) {
      return NextResponse.json({ error: 'Cart token not found' })
    }

    //Находим товар
    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: Number(params.id),
      },
    });

    if (!cartItem) {
      return NextResponse.json({ error: 'Cart item not found' });
    }

    //Если находим - удаляем из корзины
    await prisma.cartItem.delete({
      where: {
        id: Number(params.id),
      },
    });

    //После удаления обновляем корзину
    const updatedUserCart = await updateCartTotalAmount(token);

    return NextResponse.json(updatedUserCart);

  } catch (error) {
    console.log('[CART_DELETE] Server error', error);
    return NextResponse.json({ message: 'Не удалось удалить корзину' }, { status: 500 });
  }
}