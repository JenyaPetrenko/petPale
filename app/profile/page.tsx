//users profile page
// app/profile/page.tsx

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
//import img
import Image from "next/image";
import Navbar from "@/components/Navbar";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return (
      <p className="p-4 text-center">
        You must be logged in to view this page.
      </p>
    );
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return <p className="p-4 text-center">User not found.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded mt-10">
      <Navbar />
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Role:</strong> {user.role}
      </p>
      <p>
        <strong>Phone:</strong> {user.phone}
      </p>
      <p>
        <strong>Location:</strong> {user.location}
      </p>

      {user.role === "owner" && (
        <>
          <h2 className="text-xl font-semibold mt-4">Pet Info</h2>
          <p>
            <strong>Type:</strong> {user.petType}
          </p>
          <p>
            <strong>Name:</strong> {user.petName}
          </p>
          <p>
            <strong>Age:</strong> {user.petAge}
          </p>
          <p>
            <strong>Breed:</strong> {user.petBreed}
          </p>
          <p>
            <strong>Gender:</strong> {user.petGender}
          </p>
          <p>
            <strong>Availability:</strong> {user.availability}
          </p>
          {user.petImage && (
            <div className="mt-2">
              <Image
                src={user.petImage}
                alt="Pet"
                className="max-w-xs rounded"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
