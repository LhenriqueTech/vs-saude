import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import { Paciente } from '../types/Paciente';
import { User } from 'lucide-react';

const Pacientes = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [pacientes] = useState<Paciente[]>([
    {
      id: '1',
      nome: 'Maria da Silva',
      cpf: '123.456.789-00',
      dataNascimento: '1985-07-10',
      ativo: true,
    },
    {
      id: '2',
      nome: 'João Pereira',
      cpf: '987.654.321-00',
      dataNascimento: '1992-11-22',
      ativo: true,
    },
    {
      id: '3',
      nome: 'Ana Souza',
      cpf: '456.789.123-00',
      dataNascimento: '1978-03-15',
      ativo: false,
    },
  ]);

  const pacientesFiltrados = pacientes.filter((p) =>
    p.nome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 w-full min-h-screen bg-gray-100">
        <Header />
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Pacientes</h2>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Buscar por nome ou CPF"
                className="px-4 py-2 border rounded-md w-64"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="px-4 py-2 border border-gray-500 text-gray-700 rounded hover:bg-gray-100">
                Compartilhar Prontuários
              </button>
              <button
                onClick={() => navigate('/pacientes/novo')}
                className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
              >
                Novo Paciente
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            {pacientesFiltrados.map((p) => (
              <div
                key={p.id}
                onClick={() => navigate(`/pacientes/${p.id}`)}
                className="flex items-center justify-between p-4 border-b hover:bg-gray-50 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-emerald-100 text-emerald-600 p-2 rounded-full">
                    <User size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{p.nome}</h3>
                    <p className="text-sm text-gray-500">
                      {p.ativo ? (
                        <span className="text-green-600 font-medium">Ativo</span>
                      ) : (
                        <span className="text-red-600 font-medium">Inativo</span>
                      )}{' '}
                      · CPF: {p.cpf}
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 items-center text-sm text-gray-600">
                  <span className="hover:text-emerald-600">Atendimentos</span>
                  <span className="hover:text-emerald-600">Exames</span>
                  <span className="hover:text-emerald-600">Formulários</span>
                  <span className="hover:text-emerald-600">Informações</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/pacientes/${p.id}?atendimento=true`);
                    }}
                    className="bg-black text-white px-3 py-1 rounded hover:opacity-90"
                  >
                    ▶ Iniciar Atendimento
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-sm text-gray-500 mt-4">
            Total de {pacientesFiltrados.length} registro
            {pacientesFiltrados.length !== 1 ? 's' : ''}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Pacientes;
