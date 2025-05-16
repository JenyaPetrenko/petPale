//ProfileView.tsx

import Image from "next/image";
import type { User } from "@prisma/client"; // тип згенерований Prisma

import Navbar from "../Navbar";
import Footer from "../Footer";

export default function ProfileView({ user }: { user: User }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#f7f9f8]">
      <header>
        <Navbar />
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl  p-8">
          <h1 className="text-3xl font-bold text-[#426a5a] mb-6 border-b pb-2">
            My Profile
          </h1>

          <div className="space-y-4 text-gray-700">
            <p>
              <span className="font-semibold text-[#426a5a]">Name:</span>{" "}
              {user.name}
            </p>
            <p>
              <span className="font-semibold text-[#426a5a]">Email:</span>{" "}
              {user.email}
            </p>
            <p>
              <span className="font-semibold text-[#426a5a]">Role:</span>{" "}
              {user.role}
            </p>
            <p>
              <span className="font-semibold text-[#426a5a]">Phone:</span>{" "}
              {user.phone}
            </p>
            <p>
              <span className="font-semibold text-[#426a5a]">Location:</span>{" "}
              {user.location}
            </p>
          </div>

          {user.role === "owner" && (
            <>
              <h2 className="text-2xl font-semibold text-[#426a5a] mt-8 mb-4 border-b pb-2">
                Pet Information
              </h2>
              <div className="space-y-2 text-gray-700">
                <p>
                  <span className="font-semibold">Type:</span> {user.petType}
                </p>
                <p>
                  <span className="font-semibold">Name:</span> {user.petName}
                </p>
                <p>
                  <span className="font-semibold">Age:</span> {user.petAge}
                </p>
                <p>
                  <span className="font-semibold">Breed:</span> {user.petBreed}
                </p>
                <p>
                  <span className="font-semibold">Gender:</span>{" "}
                  {user.petGender}
                </p>
                <p>
                  <span className="font-semibold text-[#426a5a]">
                    Availability From:
                  </span>{" "}
                  {user.availabilityFrom
                    ? new Date(user.availabilityFrom).toLocaleDateString()
                    : "Not provided"}
                </p>
                <p>
                  <span className="font-semibold text-[#426a5a]">
                    Availability Until:
                  </span>{" "}
                  {user.availabilityTo
                    ? new Date(user.availabilityTo).toLocaleDateString()
                    : "Not provided"}
                </p>

                {user.image && (
                  <div className="mt-4">
                    <Image
                      src={user.image}
                      alt="Pet"
                      width={200}
                      height={200}
                      className="rounded-xl border"
                    />
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
