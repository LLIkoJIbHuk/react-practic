'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckoutSidebar, Container, Title } from "@/shared/components/shared";
import { useCart } from "@/shared/hooks";
import { CheckoutAddressForm, CheckoutCart, CheckoutPersonalForm } from "@/shared/components/shared/checkout";

export default function CheckoutPage() {
  const { totalAmount, updateItemQuantity, items, removeCartItem } = useCart();

  const form = useForm({
    resolver: zodResolver(),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      comment: '',
    }
  });

  const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return <Container className="mt-10" >
    <Title text="Оформление заказа" className="font-extrabold mb-8 text-[36px]" />

    <div className="flex gap-10" >
      {/* Левая колонка */}
      <div className="flex flex-col gap-10 flex-1 mb-20" >
        <CheckoutCart onClickCountButton={onClickCountButton} removeCartItem={removeCartItem} items={items} />

        <CheckoutPersonalForm />

        <CheckoutAddressForm />
      </div>

      {/* Правая часть */}
      <div className="w-[450px]">
        <CheckoutSidebar totalAmount={totalAmount} />
      </div>
    </div>
  </Container>
}