import { ProductItem } from '@prisma/client';
import { DoughType, pizzaSizes } from '../constants/pizza';
import { Variant } from '@/components/shared/VariantsGroup/VariantsGroup';

export const getAvailablePizzaSizes = (
  type: DoughType,
  items: ProductItem[]
): Variant[] => {
  const filteredPizzasByType = items.filter((item) => item.doughType === type);

  return pizzaSizes.map((item) => ({
    name: item.name,
    value: item.value,
    disabled: !filteredPizzasByType.some(
      (pizza) => Number(pizza.size) === Number(item.value)
    ),
  }));
};
