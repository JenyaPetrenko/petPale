//useSession, fetch data, loading, error handling

"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ProfileView from "./ProfileView";

export default function ProfileContainer() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (session?.user?.email) {
      fetch(`/api/users/${session.user.email}`)
        .then((res) => res.json())
        .then((data) => setUser(data.user));
    }
  }, [session?.user?.email]);

  if (status === "loading") return <p className="p-4">Loading...</p>;
  if (!session)
    return <p className="p-4">You must be logged in to view this page.</p>;
  if (!user) return <p className="p-4">Loading user data...</p>;

  return <ProfileView user={user} />;
}
