//components/Dashboard/UsersList.tsx - a list of users with filters

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Button from "@/components/Button";
import Image from "next/image";
import { User } from "@/utils/forms"; // import interface User

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]); //save users list
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]); //save filtered users list
  const [roleFilter, setRoleFilter] = useState<string>(""); // save role filter
  const [locationFilter, setLocationFilter] = useState<string>("");
  const [petTypeFilter, setPetTypeFilter] = useState<string>(""); //

  // Fetch the data from the API when the component mounts.
  useEffect(() => {
    fetch("/api/usersList") // Fetches the users from the `/api/usersList` endpoint.
      .then((res) => res.json()) // Parses the response as JSON.
      .then((data) => {
        setUsers(data.users); // Sets the full list of users.
        setFilteredUsers(data.users); // Initializes the filtered list as the full list.
      })
      .catch((error) => console.error("Error fetching users:", error)); // Logs any errors that occur during the fetch.
  }, []);

  // changes after every change in filters
  // Filter the user list whenever any of the filters or the user list changes.
  useEffect(() => {
    const filtered = users.filter((user) => {
      const matchRole = roleFilter ? user.role === roleFilter : true; // Check if the user's role matches the selected role filter.
      const matchLocation = locationFilter
        ? user.location?.toLowerCase().includes(locationFilter.toLowerCase()) // Check if the user's location includes the search term.
        : true;

      // check the type of pet
      const normalizedPetType = user.petType?.toLowerCase();
      const userPetType =
        normalizedPetType === "dog" ||
        normalizedPetType === "cat" ||
        normalizedPetType === "rabbit"
          ? normalizedPetType
          : "other";

      const matchPetType = petTypeFilter
        ? userPetType === petTypeFilter.toLowerCase() // Check if the user's pet type matches the selected pet type filter.
        : true;

      // A user passes the filter if they match all the active filters.
      return matchRole && matchLocation && matchPetType;
    });
    setFilteredUsers(filtered); // Update the filtered user list with the results.
  }, [roleFilter, locationFilter, petTypeFilter, users]); // Re-run the filter whenever the filters or the user list changes.

  if (users.length === 0) {
    return <p>Loading users...</p>;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-3xl font-bold text-[#426a5a] mb-6 border-b pb-2">
        Our pet lovers
      </h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2"
        >
          <option value="">All Roles</option>
          <option value="owner">Pet Owner</option>
          <option value="caretaker">Care Taker</option>
        </select>

        <input
          type="text"
          placeholder="Filter by location"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)} // update location filter
          className="border border-gray-300 rounded px-4 py-2"
        />

        <select
          value={petTypeFilter}
          onChange={(e) => setPetTypeFilter(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2"
        >
          <option value="">All Pet Types</option>
          <option value="cat">Cat</option>
          <option value="dog">Dog</option>
          <option value="rabbit">Rabbit</option>
          <option value="other">Other</option>
        </select>
      </div>

      {filteredUsers.length === 0 ? (
        <p>No users match the selected filters.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow flex items-center"
            >
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {user.name}
                </h3>
                <p className="text-gray-600 mb-2">{user.role}</p>
                {user.location && (
                  <p className="text-sm text-gray-500 mb-2">
                    Location: {user.location}
                  </p>
                )}
                {user.petType && (
                  <p className="text-sm text-gray-500 mb-4">
                    Pet Type: {user.petType}
                  </p>
                )}
                <Link href={`/dashboard/${user.id}`}>
                  <Button>View Profile</Button>
                </Link>
              </div>

              <div className="ml-4">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={`${user.name}'s profile`}
                    width={100}
                    height={100}
                    className="rounded"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">No Image</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
