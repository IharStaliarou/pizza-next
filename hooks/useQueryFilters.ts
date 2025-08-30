import React from 'react';
import { IFiltersProps } from './useFilters';
import qs from 'qs';
import { useRouter } from 'next/navigation';
import { doughTypes } from '@/constants';

export const useQueryFilters = (filters: IFiltersProps) => {
  const isMounted = React.useRef(false);
  const router = useRouter();

  React.useEffect(() => {
    if (isMounted.current) {
      const params = {
        ...filters.prices,
        doughTypes: Array.from(filters.doughTypes),
        sizes: Array.from(filters.sizes),
        ingredients: Array.from(filters.selectedIngredients),
      };

      const query = qs.stringify(params, {
        arrayFormat: 'comma',
      });

      router.push(`?${query}`, {
        scroll: false,
      });
    }

    isMounted.current = true;
  }, [filters]);
};
