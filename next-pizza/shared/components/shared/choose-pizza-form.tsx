import React from "react";
import { useSet } from "react-use";
import { Ingredient, ProductItem } from "@prisma/client";
import { PizzaImage } from "./pizza-image";
import { Title } from "./title";
import { Button } from "../ui";
import { GroupVariants } from "./group-variants";
import { mapPizzaType, PizzaSize, pizzaSizes, PizzaType, pizzaTypes } from "@/shared/constants/pizza";
import { IngredientItem } from "./ingredient-item";
import { cn } from "@/shared/lib/utils";
import { calcTotalPizzaPrice, getAvailablePizzaSizes } from "@/shared/lib";
import { usePizzaOptions } from "@/shared/hooks";

interface Props {
  imageUrl: string;
  name: string;
  className?: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  onClickAddCart?: VoidFunction;
}

export const ChoosePizzaForm: React.FC<Props> = ({ 
  name,
  items,
  imageUrl,
  ingredients,
  onClickAddCart,
  className
}) => {
  
  const { size, type, selectedIngredients, availableSizes, setSize, setType, addIngredient } = usePizzaOptions(items);

  const totalPrice = calcTotalPizzaPrice(
    type, 
    size, 
    items, 
    ingredients,
    selectedIngredients,
  );
  const textDetails = `${size} см, ${mapPizzaType[type]} пицца`;
  
  const handleClickAdd = () => {
    onClickAddCart?.();
    console.log({
      size,
      type,
      ingredients: selectedIngredients
    });
  };

  return <div className={cn(className, 'flex flex-1')}>
    <PizzaImage imageUrl={imageUrl} size={size} />

    <div className="w-[490px] bg-[#f7f6f5] p-7" >
      <Title text={name} size="md" className="font-extrabold mb-1" />

      <p className="text-gray-400" >{textDetails}</p>

      <div className="flex flex-col gap-4 mt-5" >
        <GroupVariants 
          items={availableSizes}
          value={String(size)}
          onClick={value => setSize(Number(value) as PizzaSize)}
        />

        <GroupVariants 
          items={pizzaTypes}
          value={String(type)}
          onClick={value => setType(Number(value) as PizzaType)}
        />
      </div>

      <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5" >
        <div className="grid grid-cols-3 gap-3" >
        {ingredients.map((ingredient) => (
          <IngredientItem
            key={ingredient.id}
            name={ingredient.name}
            price={ingredient.price}
            imageUrl={ingredient.imageUrl}
            onClick={() => addIngredient(ingredient.id)}
            active={selectedIngredients.has(ingredient.id)}
          />
        ))}
        </div>
      </div>

      <Button 
        onClick={handleClickAdd}
        className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10" >
        Добавить в корзину за {totalPrice} ₽
      </Button>
    </div>
  </div>;
}