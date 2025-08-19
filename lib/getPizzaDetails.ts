import { calcTotalPizzaPrice } from './calcTotalPizzaPrice';
import { Ingredient, ProductItem } from '@prisma/client';
import { PizzaSize, DoughType, mapDoughType } from '../constants/pizza';

export const getPizzaDetails = (
  type: DoughType,
  size: PizzaSize,
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>
) => {
  {
    const totalPrice = calcTotalPizzaPrice(
      type,
      size,
      items,
      ingredients,
      selectedIngredients
    );
    const textDetails = `${size} cm, ${mapDoughType[type]} pizza`;

    return { totalPrice, textDetails };
  }
};
