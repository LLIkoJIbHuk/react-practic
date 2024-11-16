import { CartItemDTO } from "../services/dto/cart.dto";

export const calcCartItemTotalPrice = (item: CartItemDTO) => {
  const { pizzaSize, pizzaType, ingredients } = item.productItem;
  const pizzaPrice = item.productItem.price;
  const totalIngredientPrice = ingredients.reduce((acc, item) => acc + item.price, 0);

  return pizzaPrice + totalIngredientPrice;
};