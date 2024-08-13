import { Await, useLoaderData } from 'react-router-dom';
import type { Product } from '../../interfaces/product.interface';
import { Suspense } from 'react';

export function Product(){
  const data = useLoaderData() as {data: Product};

  return <>
    <Suspense fallback={'Загружаю...'}>
      <Await
        //что нужно вернуть в наш компонент
        resolve={data.data}
      >
        {({data}: {data: Product}) => (
          <>Product - {data.name}</>
        )}
      </Await>
    </Suspense>
  </>;
}