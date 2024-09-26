import { categories, ingredients } from "./constants";
import { prisma } from "./prisma-client";
import { hashSync } from "bcrypt";

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