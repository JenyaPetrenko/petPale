// app/api/usersList/route.ts
//api to get all users
// Importing Next.js's NextResponse to handle API responses
import { NextResponse } from "next/server";

// Importing the Prisma client instance for database access
import prisma from "@/lib/prisma";

// Asynchronous function to handle GET requests
export async function GET() {
  try {
    // Query the database to fetch all users
    const users = await prisma.user.findMany({
      select: {
        id: true, // Include the user's ID in the result
        name: true, // Include the user's name
        role: true, // Include the user's role (e.g., owner, sitter)
        location: true, // Include the user's location
        image: true, // Include the user's profile image
        petType: true, // Include the type of pet associated with the user (added field)
      },
    });

    // Return the list of users as a JSON response
    return NextResponse.json({ users });
  } catch (error) {
    // Log the error to the server console for debugging purposes
    console.error("Error fetching users:", error);

    // If an error occurs, return a 500 (Internal Server Error) response
    return NextResponse.json(
      { message: "Error fetching users", error }, // Response body includes the error message and error object
      { status: 500 } // HTTP status code 500 (Internal Server Error)
    );
  }
}
