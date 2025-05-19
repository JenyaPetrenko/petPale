// app/api/usersList/[id]/route.ts
//api to get user profile by id

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Підключаємо prisma для доступу до бази даних

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params; // Отримуємо id користувача з параметрів маршруту

  try {
    const user = await prisma.user.findUnique({
      where: { id }, // Шукаємо користувача за id в базі даних
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 }); // Якщо не знайдено, повертаємо помилку 404
    }

    return NextResponse.json({ user }); // Повертаємо знайденого користувача
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json(
      { message: "Error fetching user profile", error },
      { status: 500 }
    ); // Якщо сталася помилка, повертаємо помилку 500
  }
}
