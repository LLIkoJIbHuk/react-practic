import { Ingredient, ProductItem } from "@prisma/client";
import { PizzaSize, PizzaType } from "../constants/pizza";

/**
 * Функция для вычисления общей стоимости пиццы
 * @param type - тип теста выбрнной пиццы
 * @param size - размер пиццы
 * @param items - список вариаций
 * @param ingredients - список ингредиентов
 * @param selectedIngredients - выбранные ингредиенты
 * @returns number - общая стоимость
 */

export const calcTotalPizzaPrice = (
  type: PizzaType, 
  size: PizzaSize, 
  items: ProductItem[], 
  ingredients: Ingredient[],
  selectedIngredients: Set<number>,
) => {
  const pizzaPrice = items.find((item) => item.pizzaType === type && item.size === size)?.price || 0;
  const totalIngredientPrice = ingredients
    ?.filter((ingredient) => selectedIngredients.has(ingredient.id))
    ?.reduce((acc, item) => acc + item.price, 0) || 0;

  return pizzaPrice + totalIngredientPrice
};