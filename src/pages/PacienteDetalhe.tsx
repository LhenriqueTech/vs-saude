import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import { useState } from 'react';
import { Consulta } from '../types/Consulta';
import { Paciente } from '../types/Paciente';
import ConsultaCard from '../components/pacientes/ConsultaCard';
import NovaConsultaModal from '../components/pacientes/NovaConsultaModal';

const PacienteDetalhe = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [paciente, setPaciente] = useState<Paciente>({
    id: id || '',
    nome: 'Maria da Silva',
    cpf: '123.456.789-00',
    dataNascimento: '1985-07-10',
    ativo: true,
  });

  const [consultas, setConsultas] = useState<Consulta[]>([
    {
      id: '1',
      data: '2024-04-30T21:00',
      queixa: 'Dor de cabeça constante',
      receita: 'Dipirona 500mg',
      exames: 'Tomografia',
    },
    {
      id: '2',
      data: '2024-03-14T21:00',
      queixa: 'Fadiga muscular',
      receita: 'Reposição vitamínica',
      exames: 'Exame de sangue completo',
    },
  ]);

  const [mostrarModal, setMostrarModal] = useState(false);
  const [consultaParaEditar, setConsultaParaEditar] = useState<Consulta | null>(null);

  const calcularIdade = (data: string) => {
    const nascimento = new Date(data);
    const hoje = new Date();
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const m = hoje.getMonth() - nascimento.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) idade--;
    return idade;
  };

  const excluirConsulta = (id: string) => {
    const confirmar = window.confirm('Tem certeza que deseja excluir esta consulta?');
    if (confirmar) {
      setConsultas((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const editarConsulta = (consulta: Consulta) => {
    setConsultaParaEditar(consulta);
    setMostrarModal(true);
  };

  const salvarConsulta = (nova: Consulta) => {
    if (consultaParaEditar) {
      setConsultas((prev) =>
        prev.map((c) => (c.id === nova.id ? nova : c))
      );
    } else {
      setConsultas([...consultas, nova]);
    }
    setConsultaParaEditar(null);
    setMostrarModal(false);
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 w-full min-h-screen bg-gray-100">
        <Header />
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{paciente.nome}</h2>
              <p className="text-sm text-gray-600">
                CPF: {paciente.cpf} · Idade: {calcularIdade(paciente.dataNascimento)}
              </p>
              <p className="text-sm mt-1">
                Status:{' '}
                <span className={`font-semibold ${paciente.ativo ? 'text-green-600' : 'text-red-500'}`}>
                  {paciente.ativo ? 'Ativo' : 'Inativo'}
                </span>
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setMostrarModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Nova Consulta
              </button>
              <button
                onClick={() => setPaciente({ ...paciente, ativo: !paciente.ativo })}
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                {paciente.ativo ? 'Inativar' : 'Ativar'}
              </button>
              <button
                onClick={() => {
                  const confirmar = window.confirm('Tem certeza que deseja excluir este paciente?');
                  if (confirmar) navigate('/pacientes');
                }}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Excluir
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Voltar
              </button>
            </div>
          </div>

          <h3 className="text-lg font-semibold mb-3 text-gray-700">Histórico de Consultas</h3>
          <div className="space-y-4">
            {consultas.map((c) => (
              <ConsultaCard
                key={c.id}
                consulta={c}
                onEdit={() => editarConsulta(c)}
                onDelete={() => excluirConsulta(c.id)}
              />
            ))}
          </div>
        </div>

        {mostrarModal && (
          <NovaConsultaModal
            onClose={() => {
              setMostrarModal(false);
              setConsultaParaEditar(null);
            }}
            onSave={salvarConsulta}
            consulta={consultaParaEditar}
          />
        )}
      </main>
    </div>
  );
};

export default PacienteDetalhe;