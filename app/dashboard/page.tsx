//app/dashboard/page.tsx
//dashboard page with a list of users

import UserList from "@/components/Dashboard/UsersList"; // імпортуємо компонент з переліченням користувачів
import Navbar from "@/components/Navbar"; // імпортуємо компонент Navbar
import Footer from "@/components/Footer"; // імпортуємо компонент Footer

export default function Dashboard() {
  return (
    <div>
      <Navbar />
      {/* Додайте тут ваші стилі для заголовка */}
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      {/* Виведення списку користувачів */}
      <UserList />
      <Footer></Footer>
    </div>
  );
}
