import Sidebar from "./Sidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <main className="flex-1 px-8 py-6">{children}</main>
    </div>
  );
}
