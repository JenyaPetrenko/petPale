//app/api/auth/register/route.ts

// Importing necessary modules and libraries
import { NextResponse } from "next/server"; // For sending responses in Next.js API routes
import { mkdir, writeFile } from "fs/promises"; // For creating directories and writing files
import { hash } from "bcryptjs"; // For securely hashing passwords
import prisma from "@/lib/prisma"; // Prisma client for database operations
import path from "path"; // For handling file paths

// Handling POST requests for user registration
export async function POST(req: Request) {
  try {
    // Parsing form data from the incoming HTTP request
    const formData = await req.formData();

    // Extracting required user fields from the form data
    const name = formData.get("name") as string; // Name of the user
    const email = formData.get("email") as string; // Email of the user
    const password = formData.get("password") as string; // Password for the account
    const role = formData.get("role") as string; // Role of the user (e.g., "owner", "sitter")
    const location = formData.get("location") as string; // Location of the user
    const phone = formData.get("phone") as string; // Optional phone number
    const availabilityFrom = formData.get("availabilityFrom") as string; // Start of availability
    const availabilityUntil = formData.get("availabilityUntil") as string; // End of availability

    // Extracting owner-specific fields (only applicable if the user is an "owner")
    const petType = formData.get("petType") as string; // Type of pet (e.g., dog, cat)
    const petName = formData.get("petName") as string; // Name of the pet
    const petAge = formData.get("petAge") as string; // Age of the pet
    const petBreed = formData.get("petBreed") as string; // Breed of the pet
    const petGender = formData.get("petGender") as string; // Gender of the pet

    // Handling file uploads (e.g., profile picture or pet image)
    const file = formData.get("image") as File | null;

    // Validating required fields
    if (!name || !email || !password || !location) {
      return NextResponse.json(
        { message: "Missing required fields" }, // Informing the client of missing data
        { status: 400 } // Bad Request
      );
    }

    // Ensuring the password meets minimum length requirements
    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters" },
        { status: 400 } // Bad Request
      );
    }

    // Checking if the email is already registered in the database
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already in use" },
        { status: 409 } // Conflict
      );
    }

    let imageUrl = ""; // Variable to hold the uploaded image URL

    // Handling image file uploads
    if (file && file.type.startsWith("image/")) {
      const bytes = await file.arrayBuffer(); // Convert image file to an ArrayBuffer
      const buffer = Buffer.from(bytes); // Convert ArrayBuffer to a Node.js Buffer
      const uploadsDir = path.join(process.cwd(), "public/uploads"); // Directory for storing uploads
      await mkdir(uploadsDir, { recursive: true }); // Ensure the directory exists
      const filePath = path.join(uploadsDir, file.name); // Full path for the uploaded file
      await writeFile(filePath, buffer); // Write the file to the uploads directory
      imageUrl = `/uploads/${file.name}`; // URL path to access the uploaded image
    }

    // Hashing the user's password for secure storage in the database
    const hashedPassword = await hash(password, 10);

    // Creating a new user in the database using Prisma
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword, // Storing the hashed password
        role,
        location,
        phone: phone || null, // Optional field
        image: imageUrl || null, // Optional field
        availabilityFrom: availabilityFrom ? new Date(availabilityFrom) : null, // Convert to Date object
        availabilityTo: availabilityUntil ? new Date(availabilityUntil) : null, // Convert to Date object
        // Additional fields for the "owner" role
        ...(role === "owner" && {
          petType,
          petName,
          petAge,
          petBreed,
          petGender,
        }),
      },
    });

    // Sending a success response with the created user's data
    return NextResponse.json(
      { message: "User registered successfully", user: newUser },
      { status: 201 } // Created
    );
  } catch (error) {
    // Logging the error for debugging purposes
    console.error("Error during registration:", error);

    // Sending an error response to the client
    return NextResponse.json(
      {
        message: "Internal server error",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 } // Internal Server Error
    );
  }
}
