import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { appointmentService, Appointment } from '../services/appointmentService';

interface AppointmentPanelProps {
  onClose: () => void;
}

const AppointmentPanel: React.FC<AppointmentPanelProps> = ({ onClose }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filter, setFilter] = useState('all');
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      setLoading(true);
      const data = await appointmentService.getAppointments();
      setAppointments(data);
      setError('');
    } catch (error) {
      console.error('Erro ao carregar consultas:', error);
      setError('Erro ao carregar as consultas. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const filteredAppointments = appointments.filter(appointment => {
    if (filter === 'all') return true;
    return appointment.status.toLowerCase() === filter.toLowerCase();
  });

  const handleUpdateStatus = async (appointmentId: string, status: Appointment['status']) => {
    try {
      await appointmentService.updateAppointmentStatus(appointmentId, status);
      await loadAppointments(); // Recarrega a lista após atualização
      setError('');
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      setError('Erro ao atualizar o status da consulta. Por favor, tente novamente.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-4xl w-full m-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Painel de Consultas</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
            {error}
          </div>
        )}

        <div className="mb-8">
          <label htmlFor="filter" className="block text-sm font-medium text-gray-700 mb-2">
            Filtrar por Status
          </label>
          <select
            id="filter"
            className="w-full md:w-48 rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 py-2"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">Todas as Consultas</option>
            <option value="pending">Pendentes</option>
            <option value="confirmed">Confirmadas</option>
            <option value="cancelled">Canceladas</option>
          </select>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
          </div>
        ) : appointments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Nenhuma consulta encontrada.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nome do Paciente
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Horário
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contato
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Motivo
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAppointments.map((appointment) => (
                  <tr key={appointment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">
                        {appointment.nomePaciente}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-500">
                        {new Date(appointment.data).toLocaleDateString('pt-BR')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-500">
                        {appointment.horario}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${appointment.status === 'confirmada' ? 'bg-green-100 text-green-800' : 
                          appointment.status === 'pendente' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'}`}>
                        {appointment.status === 'confirmada' ? 'Confirmada' :
                         appointment.status === 'pendente' ? 'Pendente' : 'Cancelada'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        <div>{appointment.email}</div>
                        <div>{appointment.telefone}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-500">
                        {appointment.motivo}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {appointment.status === 'pendente' && (
                        <button
                          onClick={() => handleUpdateStatus(appointment.id!, 'confirmada')}
                          className="text-emerald-600 hover:text-emerald-900 mr-4"
                        >
                          Confirmar
                        </button>
                      )}
                      {appointment.status !== 'cancelada' && (
                        <button
                          onClick={() => handleUpdateStatus(appointment.id!, 'cancelada')}
                          className="text-red-600 hover:text-red-900"
                        >
                          Cancelar
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentPanel;