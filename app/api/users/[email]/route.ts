//app/api/auth/[email]]/route.ts

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { promises as fs } from "fs";
import path from "path";
import { Prisma } from "@prisma/client"; // Import Prisma types

// Ensure the "uploads" directory exists
const uploadDir = path.join(process.cwd(), "public/uploads");

async function ensureUploadDir() {
  try {
    await fs.access(uploadDir);
  } catch {
    await fs.mkdir(uploadDir, { recursive: true });
  }
}

// Define the type of updates based on the Prisma User model
type UserUpdateInput = Partial<Prisma.UserUpdateInput>;

// GET — отримати дані користувача
export async function GET(
  _: Request,
  { params }: { params: { email: string } }
) {
  // Зберігаємо значення email

  const user = await prisma.user.findUnique({
    where: { email: params.email },
  });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ user });
}

// PUT — оновити дані користувача
export async function PUT(
  request: Request,
  { params }: { params: { email: string } }
) {
  const email = params.email;

  // Перевіряємо заголовки на правильність типу запиту
  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("multipart/form-data")) {
    return NextResponse.json(
      { message: "Invalid content type, expected multipart/form-data" },
      { status: 400 }
    );
  }

  await ensureUploadDir();

  const formData = await request.formData();
  const updates: UserUpdateInput = {};

  // Обробка текстових полів
  formData.forEach((value, key) => {
    if (key !== "image") {
      updates[key as keyof UserUpdateInput] = value as string;
    }
  });

  // Обробка файлу зображення
  const imageFile = formData.get("image");
  let imagePath = null;

  if (imageFile instanceof File) {
    const fileName = `${Date.now()}-${imageFile.name}`;
    imagePath = `/uploads/${fileName}`;

    const fileBuffer = await imageFile.arrayBuffer();
    await fs.writeFile(path.join(uploadDir, fileName), Buffer.from(fileBuffer));
    updates.image = imagePath;
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: email },
  });

  if (!existingUser) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { email: email },
      data: updates,
    });

    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    console.error("Update failed:", error);
    return NextResponse.json(
      { message: "Update failed", error },
      { status: 500 }
    );
  }
}
