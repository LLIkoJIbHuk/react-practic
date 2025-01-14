import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    //извлекаем код из URL
    const code = req.nextUrl.searchParams.get('code');

    if (!code) {
      return NextResponse.json({ error: 'Код не найден' }, { status: 400 });
    }

    const verificationCode = await prisma.verificationCode.findFirst({
      where: {
        code,
      },
    });

    //проверяем на наличие в БД
    if (!verificationCode) {
      return NextResponse.json({ error: 'Неверный код' }, { status: 400 });
    }

    //присваиваем дату верификации, если код верный
    await prisma.user.update({
      where: {
        id: verificationCode.userId,
      },
      data: {
        verified: new Date(),
      },
    });

    //удаляем код из БД
    await prisma.verificationCode.delete({
      where: {
        id: verificationCode.id,
      },
    });

    //возвращаем пользователя на главную страницу
    return NextResponse.redirect(new URL('/?verified', req.url));
  } catch (error) {
    console.log(error);
    console.log('[VERIFY_GET] Server error', error);
  }

}