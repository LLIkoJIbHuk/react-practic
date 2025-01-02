import React from "react";
import { Filters } from "./use-filters";
import qs from "qs";
import { useRouter } from "next/navigation";

export const useQueryFilters = (filters: Filters) => {
  const isMounted = React.useRef(false);
  const router = useRouter();

  React.useEffect(() => {
    if (isMounted.current) {
      const params = {
      ...filters.prices,
      pizzaTypes: Array.from(filters.pizzaTypes),
      sizes: Array.from(filters.sizes),
      ingredients: Array.from(filters.selectedIngredients),
    }
    /* Форматируем строки для использования в URL */
    const query = qs.stringify(params, {
      arrayFormat: 'comma',
    });
    router.push(`?${query}`, {
      scroll: false //убираем подергивание при выборе чекбоксов
    });
    }

    isMounted.current = true;
  }, [filters]);
}