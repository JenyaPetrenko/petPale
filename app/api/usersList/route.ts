// app/api/usersList/route.ts
//api to get all users

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const users = await prisma.user.findMany(); // Отримуємо всіх користувачів з бази даних
    return NextResponse.json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: "Error fetching users", error },
      { status: 500 }
    );
  }
}
