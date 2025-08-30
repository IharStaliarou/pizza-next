import { useSearchParams } from 'next/navigation';
import React from 'react';
import { useSet } from 'react-use';

interface IPriceProps {
  priceFrom?: number;
  priceTo?: number;
}

interface IQueryProps extends IPriceProps {
  doughTypes: string;
  sizes: string;
  ingredients: string;
}

export interface IFiltersProps {
  sizes: Set<string>;
  prices: IPriceProps;
  doughTypes: Set<string>;
  selectedIngredients: Set<string>;
}

interface IReturnProps extends IFiltersProps {
  setPrices: (name: keyof IPriceProps, value: number) => void;
  setSizes: (value: string) => void;
  setIngredientTypes: (value: string) => void;
  setDoughTypes: (value: string) => void;
}

export const useFilters = (): IReturnProps => {
  const searchParams = useSearchParams() as unknown as Map<
    keyof IQueryProps,
    string
  >;

  const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
    new Set<string>(searchParams.get('ingredients')?.split(','))
  );

  const [sizes, { toggle: toggleSize }] = useSet(
    new Set<string>(
      searchParams.get('sizes') ? searchParams.get('sizes')?.split(',') : []
    )
  );

  const [doughTypes, { toggle: toggleDoughType }] = useSet(
    new Set<string>(
      searchParams.get('doughTypes')
        ? searchParams.get('doughTypes')?.split(',')
        : []
    )
  );

  const [prices, setPrices] = React.useState<IPriceProps>({
    priceFrom: searchParams.get('priceFrom')
      ? Number(searchParams.get('priceFrom'))
      : undefined,
    priceTo: searchParams.get('priceTo')
      ? Number(searchParams.get('priceTo'))
      : undefined,
  });

  const handleUpdatePrice = (name: keyof IPriceProps, value: number) => {
    setPrices((prev) => ({ ...prev, [name]: value }));
  };

  return React.useMemo(
    () => ({
      sizes,
      prices,
      doughTypes,
      selectedIngredients,
      setPrices: handleUpdatePrice,
      setSizes: toggleSize,
      setIngredientTypes: toggleIngredients,
      setDoughTypes: toggleDoughType,
    }),
    [sizes, doughTypes, selectedIngredients, prices]
  );
};
