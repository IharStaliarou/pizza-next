import React from 'react';
import { IFiltersProps } from './useFilters';
import QueryString from 'qs';
import { useRouter } from 'next/navigation';

export const useQueryFilters = ({
  sizes,
  prices,
  doughTypes,
  selectedIngredients,
}: IFiltersProps) => {
  const router = useRouter();
  React.useEffect(() => {
    const params = {
      ...prices,
      doughTypes: Array.from(doughTypes),
      sizes: Array.from(sizes),
      ingredients: Array.from(selectedIngredients),
    };

    const qs = QueryString.stringify(params, { arrayFormat: 'comma' });

    router.push(`?${qs}`, {
      scroll: false,
    });
  }, [router, prices, doughTypes, sizes, selectedIngredients]);
};
