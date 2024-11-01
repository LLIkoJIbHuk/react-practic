import { cn } from "@/shared/lib/utils";
import React from "react";
import { Title } from "./title";
import { Button } from "../ui";
import { PizzaImage } from "./pizza-image";
import { GroupVariants } from "./group-variants";
import { PizzaSize, PizzaSizes, PizzaType, PizzaTypes } from "@/shared/constants/pizza";
import { IngredientItem } from "./ingredient-item";
import { Ingredient } from "@prisma/client";

interface Props {
  imageUrl: string;
  name: string;
  className?: string;
  ingredients: Ingredient[];
  items?: any[];
  onClickAdd?: VoidFunction;
}

export const ChoosePizzaForm: React.FC<Props> = ({ 
  name,
  items,
  imageUrl,
  ingredients,
  onClickAdd,
  className
}) => {
  const [size, setSize] = React.useState<PizzaSize>(20);
  const [type, setType] = React.useState<PizzaType>(1);

  const textDetails = '30см, традиционное тесто 30';
  const totalPrice = 350;

  return <div className={cn(className, 'flex flex-1')}>
    <PizzaImage imageUrl={imageUrl} size={size} />

    <div className="w-[490px] bg-[#f7f6f5] p-7" >
      <Title text={name} size="md" className="font-extrabold mb-1" />

      <p className="text-gray-400" >{textDetails}</p>

      <div className="flex flex-col gap-4 mt-5" >
        <GroupVariants 
          items={PizzaSizes}
          value={String(size)}
          onClick={value => setSize(Number(value) as PizzaSize)}
        />

        <GroupVariants 
          items={PizzaTypes}
          value={String(type)}
          onClick={value => setType(Number(value) as PizzaType)}
        />
      </div>

      <div className="grid grid-cols-3 gap-3" >
        {ingredients.map((ingredient) => (
          <IngredientItem
            key={ingredient.id}
            name={ingredient.name}
            price={ingredient.price}
            imageUrl={ingredient.imageUrl}
            onClick={onClickAdd}
          />
        ))}
      </div>

      <Button className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10" >
        Добавить в корзину за {totalPrice} ₽
      </Button>
    </div>
  </div>;
}