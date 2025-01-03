'use server';

import { prisma } from "@/prisma/prisma-client";
import { PayOrderTemplate } from "@/shared/components/shared/email-templates";
import { CheckoutFormValues } from "@/shared/constants";
import { createPayment, sendEmail } from "@/shared/lib";
import { OrderStatus } from "@prisma/client";
import { cookies } from "next/headers";

export async function createOrder(data: CheckoutFormValues) {
  try {
    const cookieStore = cookies();
    const cartToken = cookieStore.get('cartToken')?.value;

    if (!cartToken) {
      throw new Error('Токен корзины не найден');
    }

    //Находим корзину по токену
    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productItem: {
              include: {
                product: true
              },
            },
          },
        },
      },
      where: {
        token: cartToken,
      },
    });

    //Если корзина не найдена возвращаем ошибку
    if (!userCart) {
      throw new Error('Корзина не найдена');
    }

    if (userCart?.totalAmount === 0) {
      throw new Error('Корзина пуста');
    }

    /* Создаем заказ */
    const order = await prisma.order.create({
      data: {
        token: cartToken,
        fullName: data.firstName + ' ' + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.items),
      },
    });

    // Очищаем корзину после оформления заказа
    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    });

    // Удаление товаров
    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });
    
    const paymentData = await createPayment({
      amount: order.totalAmount,
      orderId: order.id,
      description: 'Заказ No' + order.id,
    });

    if (!paymentData) {
      throw new Error('Ошибка при создании платежа');
    }

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        paymentId: paymentData.id,
      },
    });

    const paymentUrl = paymentData.confirmation.confirmation_url

    await sendEmail(data.email, 'Next Pizza | Оплатите заказ #' + order.id, PayOrderTemplate({
      orderId: order.id,
      totalAmount: order.totalAmount,
      paymentUrl,
    }));

    return paymentUrl;
  } catch (err) {
    console.log('[CreateOrder] Server error', err);
  }
}