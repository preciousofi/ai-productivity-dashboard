type SidebarProps = {
  darkMode: boolean;
  toggleTheme: () => void;
};

export default function Sidebar({
  darkMode,
  toggleTheme,
}: SidebarProps) {
  return (
    <aside
      className={`w-64 p-6 ${
        darkMode
          ? "bg-[#111827]"
          : "bg-white border-r"
      }`}
    >
      <h1 className="text-2xl font-bold mb-10">
        AI Manager
      </h1>

      <nav className="space-y-4">
        <p className="cursor-pointer hover:text-blue-400">
          Dashboard
        </p>

        <p className="cursor-pointer hover:text-blue-400">
          Tasks
        </p>

        <p className="cursor-pointer hover:text-blue-400">
          Analytics
        </p>

        <p className="cursor-pointer hover:text-blue-400">
          Settings
        </p>
      </nav>

      <button
        onClick={toggleTheme}
        className="mt-10 px-4 py-2 rounded-xl bg-blue-500 text-white"
      >
        Toggle Theme
      </button>
    </aside>
  );
}