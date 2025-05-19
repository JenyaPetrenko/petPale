//lib/fetchUser.ts

export async function fetchUserById(userId: string) {
  try {
    const response = await fetch(`/api/usersList/${userId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch user data: ${response.statusText}`);
    }

    const data = await response.json();
    return data.user || null;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}
