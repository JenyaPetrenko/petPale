import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET — отримати дані користувача
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

// PUT — оновити дані користувача
export async function PUT(
  request: Request,
  { params }: { params: { email: string } }
) {
  const data = await request.json();

  try {
    const updatedUser = await prisma.user.update({
      where: { email: params.email },
      data: {
        name: data.name,
        phone: data.phone,
        location: data.location,
        // Додаткові поля:
        petName: data.petName,
        petType: data.petType,
        petBreed: data.petBreed,
        petAge: data.petAge,
        petGender: data.petGender,
        availability: data.availability,
        petImage: data.petImage,
      },
    });

    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    return NextResponse.json(
      { message: "Update failed", error },
      { status: 500 }
    );
  }
}
