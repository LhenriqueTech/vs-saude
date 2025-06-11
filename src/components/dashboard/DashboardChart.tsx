import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { dia: 'Seg', consultas: 5 },
  { dia: 'Ter', consultas: 8 },
  { dia: 'Qua', consultas: 4 },
  { dia: 'Qui', consultas: 9 },
  { dia: 'Sex', consultas: 6 },
];

const DashboardChart = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-full mt-6">
      <h3 className="text-gray-500 text-sm mb-4">Consultas da Semana</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="dia" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="consultas" stroke="#2563eb" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardChart;
