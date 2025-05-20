// lib/auth.ts - This file contains the configuration for NextAuth, including the authentication providers and session management.

// Importing types and modules required for NextAuth configuration
import { AuthOptions } from "next-auth"; // Type definition for NextAuth configuration
import CredentialsProvider from "next-auth/providers/credentials"; // A provider for email/password-based authentication
import { PrismaAdapter } from "@next-auth/prisma-adapter"; // Adapter to integrate NextAuth with a Prisma database
import prisma from "@/lib/prisma"; // Custom Prisma client instance for database access
import { compare } from "bcryptjs"; // Utility to compare plain text and hashed passwords

// Exporting authentication options configured for NextAuth
export const authOptions: AuthOptions = {
  // Configuring Prisma as the adapter for NextAuth to work with the database
  adapter: PrismaAdapter(prisma),

  // Configuring session management
  session: {
    strategy: "jwt", // Using JSON Web Tokens (JWT) for session storage instead of database sessions
  },

  // Defining authentication providers
  providers: [
    // Adding the CredentialsProvider for email/password authentication
    CredentialsProvider({
      name: "Credentials", // Name of the provider
      // Specifying the fields required for login
      credentials: {
        email: { label: "Email", type: "text" }, // Email input field
        password: { label: "Password", type: "password" }, // Password input field
      },
      // Function to verify user credentials during login
      async authorize(credentials) {
        // Ensure both email and password are provided
        if (!credentials?.email || !credentials?.password) return null;

        // Fetch the user from the database using Prisma
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }, // Find a user by their email
        });

        // If no user is found or the user doesn't have a password (e.g., social login), return null
        if (!user || !user.password) return null;

        // Compare the provided password with the stored hashed password
        const isValid = await compare(credentials.password, user.password);
        if (!isValid) return null; // If the password is invalid, return null

        // If authentication is successful, return an object with user details
        return { id: user.id, name: user.name, email: user.email }; // This object will be available in NextAuth session
      },
    }),
  ],
};
