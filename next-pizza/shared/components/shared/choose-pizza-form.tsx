import { cn } from "@/shared/lib/utils";
import React from "react";
import { Title } from "./title";
import { Button } from "../ui";
import { PizzaImage } from "./pizza-image";
import { GroupVariants } from "./group-variat";
import { PizzaSize, PizzaSizes, PizzaType } from "@/shared/constants/pizza";

interface Props {
  imageUrl: string;
  name: string;
  className?: string;
  ingredients: any[];
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

      <GroupVariants 
        items={PizzaSizes}
        value={String(size)}
        onClick={value => setSize(Number(value) as PizzaSize)}
      />

      <Button className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10" >
        Добавить в корзину за {totalPrice} ₽
      </Button>
    </div>
  </div>;
}