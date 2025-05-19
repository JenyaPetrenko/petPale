//app/api/auth/[email]]/route.ts

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { promises as fs } from "fs";
import path from "path";

const uploadDir = path.join(process.cwd(), "public/uploads");

async function ensureUploadDir() {
  try {
    await fs.access(uploadDir);
  } catch {
    await fs.mkdir(uploadDir, { recursive: true });
  }
}

type UserUpdateInput = {
  availabilityFrom?: { set: Date | null };
  availabilityTo?: { set: Date | null }; // Додано поле availabilityTo
  [key: string]:
    | string
    | number
    | Date
    | null
    | { set: Date | null }
    | undefined; // Уточнено, що це за типи
};

// GET — Fetch user data
export async function GET(
  _: Request,
  { params }: { params: { email: string } }
) {
  const user = await prisma.user.findUnique({
    where: { email: params.email },
  });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ user });
}

// PUT — Update user data
export async function PUT(
  request: Request,
  { params }: { params: { email: string } }
) {
  const email = params.email;

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

  // Process text fields
  formData.forEach((value, key) => {
    if (key === "availabilityFrom" || key === "availabilityTo") {
      updates[key] = value ? { set: new Date(value as string) } : { set: null };
    } else if (key !== "image") {
      updates[key] = value as string;
    }
  });

  // Process image upload
  const imageFile = formData.get("image");
  if (imageFile instanceof File) {
    const fileName = `${Date.now()}-${imageFile.name}`;
    const imagePath = `/uploads/${fileName}`;
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
