'use client';

import { DialogContent, Dialog } from "@/shared/components/ui/dialog";
import { cn } from "@/shared/lib/utils";
import React from "react";
import { useRouter } from "next/navigation";
import { ChooseProductForm } from "../choose-product-form";
import { ProductWithRelations } from "@/@types/prisma";
import { ChoosePizzaForm } from "../choose-pizza-form";
import { useCartStore } from "@/shared/store";

interface Props {
  className?: string;
  product: ProductWithRelations;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();
  const firstItem = product.items[0];
  /* Проверяем, является ли продукт пиццей */
  const isPizzaForm = Boolean(firstItem.pizzaType);
  const addCartItem = useCartStore(state => state.addCartItem);

  // добавляем продукт в корзину
  const onAddProduct = () => {
    addCartItem({
      productItemId: firstItem.id,
    })
  };

  const onAddPizza = async (productItemId: number, ingredients: number[]) => {
    try {
      await addCartItem({
        productItemId,
        ingredients,
      });
    } catch (e) {
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
              onSubmit={onAddPizza}
            />
          ) : <ChooseProductForm imageUrl={product.imageUrl} name={product.name} onSubmit={onAddProduct} price={firstItem.price}/>
        }
      </DialogContent>
    </Dialog>
  );
};