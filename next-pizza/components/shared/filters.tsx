'use client';

import React from 'react';
import {Title} from './title';
import { Input } from '../ui';
import { RangeSlider } from './range-slider';
import { CheckboxFiltersGroup } from './checkbox-filters-group';
import qs from 'qs';
import { useRouter } from 'next/navigation';
import { useIngredients } from '@/hooks/use-ingredients';
import { useFilters } from '@/hooks/use-filters';
import { useQueryFilters } from '@/hooks/use-query-filters';

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const {ingredients, loading} = useIngredients();
  const filters = useFilters();

  useQueryFilters(filters);

  const items = ingredients.map((item) => ({ value: String(item.id), text: item.name }));

  

  return(
    <div className={className} >
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

      {/* Верхние чекбоксы */}

      <CheckboxFiltersGroup 
        title='Тип теста'
        name='pizzaTypes'
        className='mb-5'
        onClickCheckbox={togglePizzaTypes}
        selected={pizzaTypes}
        items={[
          {text: 'Тонкое', value: '1'},
          {text: 'Традиционное', value: '2'},
        ]}
      />

      <CheckboxFiltersGroup 
        title='Размеры'
        name='sizes'
        className='mb-5'
        onClickCheckbox={toggleSizes}
        selected={sizes}
        items={[
          {text: '20см', value: '20'},
          {text: '30см', value: '30'},
          {text: '40см', value: '40'},
        ]}
      />

      {/* Фильтр цен */}
      <div className='mt-5 border-y border-y-neutral-100 py-6 pb-7' >
        <p className='font-bold mb-3' >Цена от и до:</p>
        <div className='flex gap-3 mb-5' >
          <Input 
            type='number' 
            placeholder='0' 
            min={0} max={1000} 
            value={String(prices.priceFrom)}
            onChange={(e) => updatePrice('priceFrom', Number(e.target.value))}
          />
          <Input 
            type='number' 
            placeholder='1000' 
            min={100} max={1000} 
            value={String(prices.priceTo)}
            onChange={(e) => updatePrice('priceTo', Number(e.target.value))}
          />
        </div>
        <RangeSlider min={0} max={1000} step={10} value={[ prices.priceFrom || 0, prices.priceTo || 1000, ]} 
          onValueChange={([priceFrom, priceTo]) => setPrice({priceFrom, priceTo})}
        />
      </div>
      
      <CheckboxFiltersGroup 
        title='Ингридиенты'
        name='ingredients'
        className='mt-5'
        limit={6}
        defaultItems={items.slice(0, 6)}
        items={items}
        loading={loading}
        onClickCheckbox={onAddId}
        selected={selectedIngredients}
      />
    </div>
  );
};
