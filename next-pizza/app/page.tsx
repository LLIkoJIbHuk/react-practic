import { Categories, Container, Filters, SortPopup, Title, TopBar } from "@/components/shared";
import { ProductCard } from "@/components/shared/product-card";
import { ProductsGroupList } from "@/components/shared/products-group-list";

export default function Home() {
  return <>
    <Container className="mt-10" >
      <Title text="Все пиццы" size="lg" className="font-extrabold" />
    </Container>
    <TopBar />
    <Container className="mt-10 pb-14" >
      <div className="flex gap-[80px]" >

        {/* Фильтрация */}
        <div className="w-[250px]" >
          <Filters />
        </div>

        {/* Список товаров */}
        <div className="flex-1" >
          <div className="flex flex-col gap-16" >
            <ProductsGroupList
              title='Пиццы'
              categoryId={1}
              items={[
              {
                id: 1,
                name: 'Бефстроганов',
                imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EEF9E43DC39C94AA5765DBF1C97100.avif',
                price: 550,
                items: [{price: 550}],
              },
              {
                id: 2,
                name: 'Бефстроганов',
                imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EEF9E43DC39C94AA5765DBF1C97100.avif',
                price: 550,
                items: [{price: 550}],
              },
              {
                id: 3,
                name: 'Бефстроганов',
                imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EEF9E43DC39C94AA5765DBF1C97100.avif',
                price: 550,
                items: [{price: 550}],
              },
              {
                id: 4,
                name: 'Бефстроганов',
                imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EEF9E43DC39C94AA5765DBF1C97100.avif',
                price: 550,
                items: [{price: 550}],
              },
              {
                id: 5,
                name: 'Бефстроганов',
                imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EEF9E43DC39C94AA5765DBF1C97100.avif',
                price: 550,
                items: [{price: 550}],
              },
              {
                id: 6,
                name: 'Бефстроганов',
                imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EEF9E43DC39C94AA5765DBF1C97100.avif',
                price: 550,
                items: [{price: 550}],
              },
            ]}
            />
            <ProductsGroupList
              title='Комбо'
              categoryId={2}
              items={[
              {
                id: 1,
                name: 'Бефстроганов',
                imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EEF9E43DC39C94AA5765DBF1C97100.avif',
                price: 550,
                items: [{price: 550}],
              },
              {
                id: 2,
                name: 'Бефстроганов',
                imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EEF9E43DC39C94AA5765DBF1C97100.avif',
                price: 550,
                items: [{price: 550}],
              },
              {
                id: 3,
                name: 'Бефстроганов',
                imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EEF9E43DC39C94AA5765DBF1C97100.avif',
                price: 550,
                items: [{price: 550}],
              },
              {
                id: 4,
                name: 'Бефстроганов',
                imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EEF9E43DC39C94AA5765DBF1C97100.avif',
                price: 550,
                items: [{price: 550}],
              },
              {
                id: 5,
                name: 'Бефстроганов',
                imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EEF9E43DC39C94AA5765DBF1C97100.avif',
                price: 550,
                items: [{price: 550}],
              },
              {
                id: 6,
                name: 'Бефстроганов',
                imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EEF9E43DC39C94AA5765DBF1C97100.avif',
                price: 550,
                items: [{price: 550}],
              },
            ]}
            />
          </div>
        </div>
      </div>
    </Container>
  </>;
}
