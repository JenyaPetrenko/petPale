//app/dashboard/page.tsx
//dashboard page with a list of users

import UserList from "@/components/Dashboard/UsersList"; // імпортуємо компонент з переліченням користувачів

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      {/* Виведення списку користувачів */}
      <UserList />
    </div>
  );
}
