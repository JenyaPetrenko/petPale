// Example for login endpoint
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  // Add login logic here (e.g., validate credentials, generate JWT)
  if (email === "test@example.com" && password === "password") {
    return NextResponse.json({ token: "fake-jwt-token" }, { status: 200 });
  }

  return NextResponse.json(
    { message: "Invalid email or password" },
    { status: 401 }
  );
}
