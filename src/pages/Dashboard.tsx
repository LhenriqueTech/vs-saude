import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import CardResumo from '../components/dashboard/CardResumo';
import DashboardChart from '../components/dashboard/DashboardChart';

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 w-full min-h-screen bg-gray-100">
        <Header />
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Visão Geral</h2>
          <div className="flex flex-wrap gap-6">
            <CardResumo titulo="Consultas Hoje" valor={12} />
            <CardResumo titulo="Pacientes Ativos" valor={248} />
            <CardResumo titulo="Faturamento Mensal" valor="R$ 18.750,00" />
          </div>
          <DashboardChart />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
