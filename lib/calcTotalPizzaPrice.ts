import { Ingredient, ProductItem } from '@prisma/client';
import { PizzaSize, DoughType } from '../constants/pizza';

/**
 * Function for calculation total pizza price
 *
 * @param type - dough type of selected pizza
 * @param size - size of selected pizza
 * @param items - list of pizzas
 * @param ingredients - list of ingredients
 * @param selectedIngredients - set of selected ingredients
 *
 * @returns number total pizza price
 */
export const calcTotalPizzaPrice = (
  type: DoughType,
  size: PizzaSize,
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>
) => {
  const pizzaPrice =
    items.find((item) => item.doughType === type && item.size === size)
      ?.price || 0;

  const totalIngredientsPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);

  return pizzaPrice + totalIngredientsPrice;
};
