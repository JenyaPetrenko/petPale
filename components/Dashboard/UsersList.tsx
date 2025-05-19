//components/Dashboard/UsersList.tsx

"use client";
import { useState, useEffect } from "react";
import Link from "next/link"; // Для лінку
import Button from "@/components/Button"; // Ваш компонент кнопки

export default function UserList() {
  interface User {
    id: string;
    name: string;
    role: string;
  }

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("/api/usersList")
      .then((res) => res.json())
      .then((data) => setUsers(data.users))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  return (
    <div>
      {users.map((user) => (
        <div key={user.id} className="user-item">
          <h3>{user.name}</h3>
          <p>{user.role}</p>
          <Link href={`/dashboard/${user.id}`}>
            <Button>View Profile</Button>
          </Link>
        </div>
      ))}
    </div>
  );
}
