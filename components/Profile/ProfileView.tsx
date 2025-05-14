import Image from "next/image";
import type { User } from "@prisma/client"; // тип згенерований Prisma

import Navbar from "../Navbar";

export default function ProfileView({ user }: { user: User }) {
  return (
    <div>
      <header>
        <Navbar />
      </header>

      <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded mt-10">
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
                  width={200}
                  height={200}
                  className="rounded"
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
