'use client';

import { DialogContent, Dialog } from "@/shared/components/ui/dialog";
import { cn } from "@/shared/lib/utils";
import React from "react";
import { useRouter } from "next/navigation";
import { ChooseProductForm } from "../choose-product-form";
import { ProductWithRelations } from "@/@types/prisma";
import { ChoosePizzaForm } from "../choose-pizza-form";
import { useCartStore } from "@/shared/store";
import toast from "react-hot-toast";

interface Props {
  className?: string;
  product: ProductWithRelations;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();
  const firstItem = product.items[0];
  /* Проверяем, является ли продукт пиццей */
  const isPizzaForm = Boolean(firstItem.pizzaType);
  const [addCartItem, loading] = useCartStore(state => [state.addCartItem, state.loading]);

  const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
    try {

      const itemId = productItemId ?? firstItem.id;

      await addCartItem({
        productItemId: itemId,
        ingredients,
      });

      toast.success(product.name + ' добавлен в корзину');
      router.back();
    } catch (e) {
      toast.error('Не удалось добавить товар в корзину');
      console.error(e);
    }
  };

  return (
    /* модальное окно */
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()} >
      <DialogContent className={cn('p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden', className)} >
        { /* проверяем, является ли продукт пиццей, иначе рендерим стандартную форму */
          isPizzaForm ? (
            <ChoosePizzaForm 
              imageUrl={product.imageUrl} 
              name={product.name} 
              ingredients={product.ingredients} 
              items={product.items}
              onSubmit={onSubmit}
              loading={loading}
            />
          ) : <ChooseProductForm 
                imageUrl={product.imageUrl} 
                name={product.name} 
                onSubmit={onSubmit} 
                price={firstItem.price}
                loading={loading}
              />
        }
      </DialogContent>
    </Dialog>
  );
};