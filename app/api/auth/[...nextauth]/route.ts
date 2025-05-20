// app/api/auth/[...nextauth]/route.ts

// Importing the NextAuth library, which provides authentication functionality for Next.js applications
import NextAuth from "next-auth";

// Importing authentication options (configuration) from a separate file
// This includes providers, session management, and other settings
import { authOptions } from "@/lib/auth";

// Creating a NextAuth handler using the imported authentication options
// This handler is responsible for managing all authentication-related requests, such as login, logout, and session validation
const handler = NextAuth(authOptions);

// Exporting the handler for both GET and POST HTTP methods
// - GET: Used to fetch authentication/session information
// - POST: Used for login and other authentication requests
export { handler as GET, handler as POST };
