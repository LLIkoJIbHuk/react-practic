import { categories, ingredients, products } from "./constants";
import { prisma } from "./prisma-client";
import { hashSync } from "bcrypt";

const randomDecimalNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max-min) * 10 + min * 10) / 10;
};

async function up(){
  await prisma.user.createMany({
    data: [
      {
        fullName: 'User Test',
        email: 'user@test.ru',
        password: hashSync('111111', 10),
        verified: new Date(),
        role: 'USER',
      },
      {
        fullName: 'Admin Admin',
        email: 'admin@test.ru',
        password: hashSync('111111', 10),
        verified: new Date(),
        role: 'ADMIN',
      }
    ]
  });

  await prisma.category.createMany({
    data: categories
  });
  
  await prisma.ingredient.createMany({
    data: ingredients
  });

  await prisma.product.createMany({
    data: products
  });

  const pizza1 = await prisma.product.create({
    data: {
      name: 'Пепперони фреш',
      imageUrl:
        'https://media.dodostatic.net/image/r:292x292/11EEF9E43DC39C94AA5765DBF1C97100.avif',
      categoryId: 1,
      ingredients: {
        //привязываем к продукту первые 5 ингридиентов
        connect: ingredients.slice(0, 5),
      },
    },
  });

  const pizza2 = await prisma.product.create({
    data: {
      name: 'Сырная',
      imageUrl:
        'https://media.dodostatic.net/image/r:292x292/11EEF9E43DC39C94AA5765DBF1C97100.avif',
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(5, 10),
      },
    },
  });

  const pizza3 = await prisma.product.create({
    data: {
      name: 'Чоризо фреш',
      imageUrl:
        'https://media.dodostatic.net/image/r:292x292/11EEF9E43DC39C94AA5765DBF1C97100.avif',
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(10, 40),
      },
    },
  });

  await prisma.productItem.createMany({
    data: [
      {
        productId: pizza1.id,
        pizzaType: 1,
        size: 20,
        price: randomDecimalNumber(190, 600),
      },
      {
        productId: pizza1.id,
        pizzaType: 2,
        size: 30,
        price: randomDecimalNumber(190, 600),
      },
      {
        productId: pizza1.id,
        pizzaType: 2,
        size: 40,
        price: randomDecimalNumber(190, 600),
      },
    ],
  });
}

async function down(){
  //TRUNCATE TABLE - очищает таблицу User
  //RESTART IDENTITY - сбрасывает счетчик инкремента
  //CASCADE - удаление зависимостей, связанных с User
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE `;
}

async function main(){
  try{
    await down();
    await up();
  } catch (e) {
    console.error(e);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });