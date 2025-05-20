//app/api/user/[email]/route.ts

// Importing necessary modules and libraries
import { NextResponse } from "next/server"; // For sending responses in Next.js API routes
import prisma from "@/lib/prisma"; // Prisma client for database operations
import { promises as fs } from "fs"; // For asynchronous filesystem operations
import path from "path"; // For handling file paths

// Directory for storing uploaded files
const uploadDir = path.join(process.cwd(), "public/uploads");

// Ensures the upload directory exists; creates it if it doesn't
async function ensureUploadDir() {
  try {
    await fs.access(uploadDir); // Check if the directory is accessible
  } catch {
    await fs.mkdir(uploadDir, { recursive: true }); // Create the directory if it doesn't exist
  }
}

// Type definition for user update inputs
type UserUpdateInput = {
  availabilityFrom?: { set: Date | null }; // Optional date field
  availabilityTo?: { set: Date | null }; // Optional date field for availability
  [key: string]: // Allows dynamic keys for other fields
  string | number | Date | null | { set: Date | null } | undefined; // Defines possible value types
};

// **GET Request** — Fetch user data by email
export async function GET(
  _: Request, // The incoming HTTP request (unused in this case)
  { params }: { params: { email: string } } // Extracting the email parameter from the route
) {
  // Query the database for the user by email
  const user = await prisma.user.findUnique({
    where: { email: params.email },
  });

  // If user not found, return a 404 response
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  // Return the user data as a JSON response
  return NextResponse.json({ user });
}

// **PUT Request** — Update user data
export async function PUT(
  request: Request, // The incoming HTTP request
  { params }: { params: { email: string } } // Extracting the email parameter from the route
) {
  const email = params.email;

  // Validate that the content type is multipart/form-data
  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("multipart/form-data")) {
    return NextResponse.json(
      { message: "Invalid content type, expected multipart/form-data" },
      { status: 400 } // Bad Request
    );
  }

  // Ensure the upload directory exists
  await ensureUploadDir();

  // Parse form data from the request
  const formData = await request.formData();
  const updates: UserUpdateInput = {}; // Object to store user updates

  // Process text fields in the form data
  formData.forEach((value, key) => {
    if (key === "availabilityFrom" || key === "availabilityTo") {
      // Handle date fields, converting them to Date objects or setting to null if invalid
      const dateValue = new Date(value as string);
      updates[key] = isNaN(dateValue.getTime())
        ? { set: null }
        : { set: dateValue };
    } else if (key !== "image") {
      // For other keys (excluding "image"), store their values as strings
      updates[key] = value as string;
    }
  });

  // Process the image file if provided
  const imageFile = formData.get("image");
  if (imageFile instanceof File) {
    // Generate a unique filename and path for the uploaded image
    const fileName = `${Date.now()}-${imageFile.name}`;
    const imagePath = `/uploads/${fileName}`;
    const fileBuffer = await imageFile.arrayBuffer();
    await fs.writeFile(path.join(uploadDir, fileName), Buffer.from(fileBuffer));
    updates.image = imagePath; // Update the user's image path
  }

  // Check if the user exists in the database
  const existingUser = await prisma.user.findUnique({
    where: { email: email },
  });

  if (!existingUser) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  try {
    // Update the user's data in the database
    const updatedUser = await prisma.user.update({
      where: { email: email },
      data: updates,
    });

    // Return the updated user data
    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    console.error("Update failed:", error);
    return NextResponse.json(
      { message: "Update failed", error },
      { status: 500 } // Internal Server Error
    );
  }
}

// **DELETE Request** — Delete user by email
export async function DELETE(
  _: Request, // The incoming HTTP request (unused in this case)
  { params }: { params: { email: string } } // Extracting the email parameter from the route
) {
  const email = params.email;

  try {
    // Check if the user exists in the database
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Delete the user from the database
    await prisma.user.delete({
      where: { email: email },
    });

    // Return a success response
    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 } // OK
    );
  } catch (error) {
    console.error("Delete failed:", error);
    return NextResponse.json(
      { message: "Delete failed", error },
      { status: 500 } // Internal Server Error
    );
  }
}
