import {
  Container,
  Filters,
  ProductsGroupList,
  Title,
  TopBar,
} from '@/components/shared';

export default function Home() {
  return (
    <>
      <Container className='mt-10'>
        <Title text='All products' size='lg' className='font-extrabold' />
      </Container>
      <TopBar />

      <Container className='mt-10 pb-14'>
        <div className='flex gap-[80px]'>
          <div className='w-[250px]'>
            <Filters />
          </div>

          <div className='flex-1'>
            <div className='flex flex-col gap-16'>
              <ProductsGroupList
                title='Pizza'
                items={[
                  {
                    id: 1,
                    name: 'Cheeseburger Pizza',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp',
                    price: 500,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 2,
                    name: 'Cheeseburger Pizza',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp',
                    price: 350,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 3,
                    name: 'Cheeseburger Pizza',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp',
                    price: 500,
                    items: [{ price: 550 }],
                  },
                ]}
                categoryId={1}
              />
              <ProductsGroupList
                title='Combo'
                items={[
                  {
                    id: 1,
                    name: 'Cheeseburger Pizza',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp',
                    price: 500,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 2,
                    name: 'Cheeseburger Pizza',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp',
                    price: 350,
                    items: [{ price: 550 }],
                  },
                ]}
                categoryId={2}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
