// app/api/usersList/[id]/route.ts
//api to get user profile by id

// Importing Next.js's NextResponse to handle API responses
import { NextResponse } from "next/server";

// Importing the Prisma client instance for database access
import prisma from "@/lib/prisma";

export async function GET(
  req: Request, // Represents the incoming HTTP GET request
  { params }: { params: { id: string } } // Destructuring the route parameters to extract the 'id'
) {
  // Extract the 'id' parameter from the route
  const { id } = params;

  try {
    // Query the database using Prisma's 'findUnique' method to find a user by their unique 'id'
    const user = await prisma.user.findUnique({
      where: { id }, // Look for a user whose 'id' matches the provided 'id'
    });

    // If the user is not found, return a 404 (Not Found) response
    if (!user) {
      return NextResponse.json(
        { message: "User not found" }, // The response body with an error message
        { status: 404 } // HTTP status code 404 (Not Found)
      );
    }

    // If the user is found, return the user object in the response
    return NextResponse.json({ user }); // The response body includes the user data
  } catch (error) {
    // Log the error to the server console for debugging purposes
    console.error("Error fetching user profile:", error);

    // If an error occurs during the database query, return a 500 (Internal Server Error) response
    return NextResponse.json(
      { message: "Error fetching user profile", error }, // Response body includes the error message and error object
      { status: 500 } // HTTP status code 500 (Internal Server Error)
    );
  }
}
