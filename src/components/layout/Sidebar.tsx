import { LayoutDashboard, CalendarDays, Users, CreditCard, LogOut } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white border-r h-screen p-5 fixed">
      <h2 className="text-2xl font-bold mb-8 text-blue-600">VS Saúde</h2>
      <nav className="flex flex-col gap-4">
        <NavItem icon={<LayoutDashboard />} label="Dashboard" href="/dashboard" />
        <NavItem icon={<CalendarDays />} label="Agenda" href="/agenda" />
        <NavItem icon={<Users />} label="Pacientes" href="/pacientes" />
        <NavItem icon={<CreditCard />} label="Financeiro" href="/financeiro" />
        <NavItem icon={<LogOut />} label="Sair" href="/sair" />
      </nav>
    </aside>
  );
};

const NavItem = ({ icon, label, href }: { icon: JSX.Element; label: string; href: string }) => (
  <a href={href} className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition">
    {icon}
    <span>{label}</span>
  </a>
);

export default Sidebar;
