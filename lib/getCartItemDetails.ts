import { PizzaSize, DoughType, mapDoughType } from '../constants/pizza';
import { CartStateItem } from './getCartDetails';

export const getCartItemDetails = (
  ingredients: CartStateItem['ingredients'],
  doughType?: DoughType,
  pizzaSize?: PizzaSize
): string => {
  const details = [];

  if (pizzaSize && doughType) {
    const typeName = mapDoughType[doughType];
    details.push(`${typeName} ${pizzaSize} см`);
  }

  if (ingredients) {
    details.push(...ingredients.map((ingredient) => ingredient.name));
  }

  return details.join(', ');
};
