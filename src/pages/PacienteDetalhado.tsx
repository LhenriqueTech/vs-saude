import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import {
  User,
  Calendar,
  Phone,
  ClipboardList,
  Trash2,
  Edit,
  FileText,
  Stethoscope,
  MessageCircle,
  ArrowLeft,
} from 'lucide-react';

const PacienteDetalhado = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const pacienteLocal = localStorage.getItem('pacienteSelecionado');
  const paciente = pacienteLocal
    ? JSON.parse(pacienteLocal)
    : {
        id: id || '',
        nome: 'Paciente não encontrado',
        dataNascimento: '',
        cpf: '',
        sexo: '',
        convenio: '',
        diagnostico: '',
        vegano: false,
        alergias: '',
        observacoes: '',
        observacoesPrivadas: '',
        ultimaConsulta: '',
        celular: '',
      };

  const formatarData = (data: string) => {
    if (!data) return 'Não informado';
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
  };

  const handleExcluir = () => {
    const confirmar = confirm('Tem certeza que deseja excluir este paciente?');
    if (confirmar) {
      localStorage.removeItem('pacienteSelecionado');
      alert('Paciente excluído!');
      navigate('/pacientes');
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 w-full min-h-screen bg-gray-100">
        <Header />
        <div className="p-6">
          {/* Topo */}
          <div className="flex items-center justify-between border-b pb-2 mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-100 text-emerald-600 p-2 rounded-full">
                <User size={24} />
              </div>
              <h2 className="text-lg font-semibold text-gray-800">
                {paciente.nome}
              </h2>
            </div>
            <button
              onClick={() => history.back()}
              className="text-sm text-gray-600 hover:text-emerald-600 flex items-center"
            >
              <ArrowLeft className="mr-1" size={16} /> Voltar
            </button>
          </div>

          {/* Colunas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Dados */}
            <div>
              <h3 className="text-md font-semibold mb-3 border-b pb-1">
                Dados do Paciente
              </h3>
              <p><strong>Mãe:</strong> Não informado</p>
              <p><strong>Pai:</strong> Não informado</p>
              <p><strong>Data de Nasc.:</strong> {formatarData(paciente.dataNascimento)}</p>
              <p><strong>CPF:</strong> {paciente.cpf || 'Não informado'}</p>
              <p><strong>Convênio:</strong> {paciente.convenio || 'Não informado'}</p>
              <p><strong>Sexo:</strong> {paciente.sexo || 'Não informado'}</p>
              <p><strong>Última Consulta:</strong> {formatarData(paciente.ultimaConsulta)}</p>
              <p><strong>Último Diagnóstico:</strong> {paciente.diagnostico || 'Nenhum'}</p>
              <p><strong>Vegano:</strong> {paciente.vegano ? 'Sim' : 'Não'}</p>
              <p><strong>Alergias:</strong> {paciente.alergias || 'Nenhuma'}</p>
              <p><strong>Observações:</strong> {paciente.observacoes || 'Nenhuma'}</p>
              <p><strong>Privadas:</strong> {paciente.observacoesPrivadas || 'Nenhuma'}</p>
            </div>

            {/* Contato */}
            <div>
              <h3 className="text-md font-semibold mb-3 border-b pb-1">Contatos</h3>
              <p><strong>Telefone:</strong> {paciente.celular || 'Não informado'}</p>
              <p><strong>Easy Patient:</strong> <span className="text-xs bg-gray-200 px-2 py-1 rounded">PRO</span> <span className="text-xs bg-blue-200 px-2 py-1 rounded ml-1">BETA</span></p>
              <p><strong>Agendamento Online:</strong> Não habilitado</p>
              <p><strong>LGPD:</strong> <a href="#" className="text-emerald-600 hover:underline">Abrir</a></p>
            </div>

            {/* Opções */}
            <div>
              <h3 className="text-md font-semibold mb-3 border-b pb-1">Opções</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li onClick={() => navigate(`/agenda/novo?pacienteId=${paciente.id}`)} className="flex items-center gap-2 cursor-pointer hover:text-emerald-600"><Calendar size={16} /> Novo Agendamento</li>
                <li onClick={() => window.open(`https://wa.me/55${paciente.celular || ''}`, '_blank')} className="flex items-center gap-2 cursor-pointer hover:text-emerald-600"><Phone size={16} /> Abrir WhatsApp</li>
                <li onClick={() => navigate(`/pacientes/${paciente.id}?aba=atendimentos`)} className="flex items-center gap-2 cursor-pointer hover:text-emerald-600"><Stethoscope size={16} /> Atendimentos</li>
                <li onClick={() => navigate(`/pacientes/${paciente.id}?aba=formularios`)} className="flex items-center gap-2 cursor-pointer hover:text-emerald-600"><ClipboardList size={16} /> Formulários</li>
                <li onClick={() => navigate(`/pacientes/editar/${paciente.id}`)} className="flex items-center gap-2 cursor-pointer hover:text-emerald-600"><Edit size={16} /> Editar</li>
                <li onClick={() => navigate(`/pacientes/${paciente.id}?aba=anotacoes`)} className="flex items-center gap-2 cursor-pointer hover:text-emerald-600"><MessageCircle size={16} /> Anotações</li>
                <li onClick={() => navigate(`/agenda?pacienteId=${paciente.id}`)} className="flex items-center gap-2 cursor-pointer hover:text-emerald-600"><Calendar size={16} /> Agendamentos</li>
                <li onClick={() => navigate(`/pacientes/${paciente.id}?aba=exames`)} className="flex items-center gap-2 cursor-pointer hover:text-emerald-600"><FileText size={16} /> Exames & Gráficos</li>
                <li onClick={() => navigate(`/pacientes/${paciente.id}?aba=documentos`)} className="flex items-center gap-2 cursor-pointer hover:text-emerald-600"><FileText size={16} /> Documentos</li>
                <li onClick={handleExcluir} className="flex items-center gap-2 text-red-600 cursor-pointer hover:underline"><Trash2 size={16} /> Excluir</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PacienteDetalhado;