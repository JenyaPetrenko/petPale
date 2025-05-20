//app/dashboard/page.tsx
//dashboard page with a list of users
//To do: pagination, sorting, filtering, and searching

// Importing necessary components
import UserList from "@/components/Dashboard/UsersList"; // A component that renders the list of users
// A shared Footer component for the bottom section of the page

// The main function that defines the Dashboard page
export default function Dashboard() {
  return (
    <div>
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

      {/* UserList component to display the list of users */}
      <UserList />
    </div>
  );
}
