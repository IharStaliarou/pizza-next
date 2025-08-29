import { Suspense } from 'react';

import {
  Container,
  Filters,
  ProductsGroupList,
  Stories,
  Title,
  TopBar,
} from '@/components/shared';
import { findPizzas, GetSearchParams } from '@/lib/findPizzas';

export default async function Home({
  searchParams,
}: {
  searchParams: GetSearchParams;
}) {
  const categories = await findPizzas(searchParams);

  return (
    <>
      <Container className='mt-10'>
        <Title text='All products' size='lg' className='font-extrabold' />
      </Container>
      <TopBar categories={categories.filter((c) => c.products.length > 0)} />

      <Stories />

      <Container className='mt-10 pb-14'>
        <div className='flex gap-[80px]'>
          <div className='w-[250px]'>
            <Suspense>
              <Filters />
            </Suspense>
          </div>

          <div className='flex-1'>
            <div className='flex flex-col gap-16'>
              {categories.map(
                (category) =>
                  category.products.length > 0 && (
                    <ProductsGroupList
                      key={category.id}
                      title={category.name}
                      categoryId={category.id}
                      items={category.products}
                    />
                  )
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
