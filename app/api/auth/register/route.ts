//app/api/auth/register/route.ts

import { NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import { hash } from "bcryptjs";
import prisma from "@/lib/prisma";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const role = formData.get("role") as string;
    const location = formData.get("location") as string;
    const phone = formData.get("phone") as string;
    const availability = formData.get("availability") as string;

    // Owner-specific fields
    const petType = formData.get("petType") as string;
    const petName = formData.get("petName") as string;
    const petAge = formData.get("petAge") as string;
    const petBreed = formData.get("petBreed") as string;
    const petGender = formData.get("petGender") as string;

    // File upload (shared for both roles)
    const file = formData.get("image") as File | null;

    // Валідація обов'язкових полів залежно від ролі
    if (!name || !email || !password || !location) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    if (role === "owner") {
      if (!petType) {
        return NextResponse.json(
          { message: "Missing required fields for owner" },
          { status: 400 }
        );
      }
    }

    if (role !== "owner" && role !== "caretaker") {
      return NextResponse.json(
        { message: "Invalid role specified" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already in use" },
        { status: 409 }
      );
    }

    let imageUrl = "";

    // Тільки якщо файл є — обробляємо
    if (file && typeof file === "object" && file.type.startsWith("image/")) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploadsDir = path.join(process.cwd(), "public/uploads");
      await mkdir(uploadsDir, { recursive: true });
      const filePath = path.join(uploadsDir, file.name);
      await writeFile(filePath, buffer);
      imageUrl = `/uploads/${file.name}`;
    }

    const hashedPassword = await hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        location,
        phone: phone || null,
        availability: availability || null,
        image: imageUrl || null,
        ...(role === "owner" && {
          petType: petType || null,
          petName: petName || null,
          petAge: petAge ? String(petAge) : null,
          petBreed: petBreed || null,
          petGender: petGender || null,
        }),
      },
    });

    console.log("New user registration", {
      name,
      email,
      role,
      location,
      phone,
      availability,
      imageUrl: imageUrl || null,
    });

    return NextResponse.json(
      { message: "User registered successfully", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error during registration:", error);

    return NextResponse.json(
      {
        message: "Internal server error",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
