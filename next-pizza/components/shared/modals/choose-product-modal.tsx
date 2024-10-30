'use client';

import { DialogContent, Dialog } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import React from "react";
import { useRouter } from "next/navigation";
import { ChooseProductForm } from "../choose-product-form";
import { ProductWithRelations } from "@/@types/prisma";

interface Props {
  className?: string;
  product: ProductWithRelations;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();
  /* Проверяем, является ли продукт пиццей */
  const isPizzaForm = Boolean(product.items[0].pizzaType);

  return (
    /* модальное окно */
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()} >
      <DialogContent className={cn('p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden', className)} >
        { /* проверяем, является ли продукт пиццей, иначе рендерим стандартную форму */
          isPizzaForm ? (
            'PizzaForm'
          ) : <ChooseProductForm imageUrl={product.imageUrl} name={product.name} ingredients={[]} />
        }
      </DialogContent>
    </Dialog>
  );
};