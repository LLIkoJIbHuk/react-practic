export const mapPizzaSize = {
  20: 'Маленькая',
  30: 'Средняя',
  40: 'Большая',
} as const;

export const mapPizzaType = {
  1: 'традиционное',
  2: 'тонкое',
} as const;

/* Преобразуем в массив */
export const PizzaSizes = Object.entries(mapPizzaSize).map(([value, name]) => ({
  name,
  value,
}))