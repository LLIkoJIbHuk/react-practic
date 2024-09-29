import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get('query') || '';//извлекаем значение query из URL адреса

  const products = await prisma.product.findMany({
    //находим среди всех наших продуктов с нужным названием
    where: {
      name: {
        contains: query, //содержит query
        mode: 'insensitive', //без чувствительности к регистру
      }
    },
    take: 5,
  });

  return NextResponse.json(products);
}