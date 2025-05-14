import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const {
      name,
      email,
      password,
      role,
      location,
      phone,
      petType,
      petName,
      petAge,
      petBreed,
      petGender,
      petImage,
      availability,
    } = await request.json();

    if (!email || !password || !role || !location) {
      return NextResponse.json(
        { message: "Missing required fields" },
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

    const hashedPassword = await hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        location,
        phone,
        ...(role === "owner" && {
          petType,
          petName,
          petAge: String(petAge), // ensure string
          petBreed,
          petGender,
          petImage,
          availability,
        }),
      },
    });

    return NextResponse.json(
      { message: "User registered successfully", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Registration error:", error);
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
}
