// export const login = async (email: string, password: string) => {
//   const response = await fetch("/api/auth/login", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email, password }),
//   });

//   if (!response.ok) {
//     throw new Error("Invalid credentials");
//   }

//   return response.json();
// };

// export const register = async (data: {
//   name: string;
//   email: string;
//   password: string;
// }) => {
//   const response = await fetch("/api/auth/register", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   });

//   if (!response.ok) {
//     throw new Error("Registration failed");
//   }

//   return response.json();
// };
