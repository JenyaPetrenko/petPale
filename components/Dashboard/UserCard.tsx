// //component/Dashboard/UserCard.tsx

// import Link from "next/link";
// import Button from "@/components/Button";
// import Image from "next/image";

// interface User {
//   id: string;
//   name: string;
//   role: string;
//   location?: string;
//   image?: string;
// }

// interface UserCardProps {
//   user: User;
// }

// export default function UserCard({ user }: UserCardProps) {
//   return (
//     <div
//       key={user.id}
//       className="bg-white shadow-md rounded-lg p-6 text-center border border-gray-200 hover:shadow-lg transition-shadow"
//     >
//       {/* Зображення профілю */}
//       {user.image ? (
//         <div className="flex justify-center mb-4">
//           <Image
//             src={user.image}
//             alt={`${user.name}'s profile`}
//             width={100}
//             height={100}
//             className="rounded"
//           />
//         </div>
//       ) : (
//         <div className="flex justify-center mb-4">
//           <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center">
//             <span className="text-gray-500 text-sm">No Image</span>
//           </div>
//         </div>
//       )}

//       {/* Інформація про користувача */}
//       <h3 className="text-xl font-semibold text-gray-900 mb-2">{user.name}</h3>
//       <p className="text-gray-600 mb-2">{user.role}</p>
//       {user.location && (
//         <p className="text-sm text-gray-500 mb-4">
//           Location: {user.location}
//         </p>
//       )}

//       {/* Кнопка для перегляду профілю */}
//       <Link href={`/dashboard/${user.id}`}>
//         <Button>View Profile</Button>
//       </Link>
//     </div>
//   );
// }
