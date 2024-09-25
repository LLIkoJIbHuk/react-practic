import { prisma } from "./prisma-client";
import { hashSync } from "bcrypt";

async function up(){
  await prisma.user.createMany({
    data: [
      {
        fullName: 'User',
        email: 'user@test.ru',
        password: hashSync('111111', 10),
        verified: new Date(),
        role: 'USER',
      },
      {
        fullName: 'Admin',
        email: 'admin@test.ru',
        password: hashSync('111111', 10),
        verified: new Date(),
        role: 'ADMIN',
      }
    ]
  });
}

async function down(){
  await prisma.user.deleteMany({});
}

async function main(){
  try{
    await down();
    await up();
  } catch (e) {
    console.error(e);
  }
}