import React, { useState } from 'react';
import { X, Calendar, Clock, Mail, Phone, User, FileText } from 'lucide-react';
import InputMask from 'react-input-mask';
import { appointmentService } from '../services/appointmentService';

interface BookingFormProps {
  onClose: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    reason: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validar campos antes de enviar
      if (!formData.name || !formData.email || !formData.phone || 
          !formData.date || !formData.time || !formData.reason) {
        setError('Por favor, preencha todos os campos.');
        return;
      }

      // Validar formato do telefone
      const phoneNumbers = formData.phone.replace(/\D/g, '');
      if (phoneNumbers.length < 10) {
        setError('Por favor, insira um número de telefone válido.');
        return;
      }

      console.log('Enviando dados do formulário:', {
        nomePaciente: formData.name,
        email: formData.email,
        telefone: formData.phone,
        data: formData.date,
        horario: formData.time,
        motivo: formData.reason
      });

      await appointmentService.createAppointment({
        nomePaciente: formData.name,
        email: formData.email,
        telefone: formData.phone,
        data: formData.date,
        horario: formData.time,
        motivo: formData.reason
      });

      console.log('Consulta agendada com sucesso!');
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Erro detalhado ao agendar consulta:', error);
      if (error instanceof Error) {
        setError(`Erro ao agendar consulta: ${error.message}`);
      } else {
        setError('Ocorreu um erro ao agendar a consulta. Por favor, tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md max-h-[95vh] overflow-y-auto m-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Agendar Consulta</h2>
            <p className="text-sm text-gray-500 mt-1">Preencha os dados para agendar sua consulta</p>
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 transition-colors"
            disabled={loading}
          >
            <X size={20} />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded-r-md">
            {error}
          </div>
        )}

        {success ? (
          <div className="text-center p-6 bg-emerald-50 rounded-lg">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="mb-2 text-emerald-600 font-semibold text-lg">
              Consulta agendada com sucesso!
            </div>
            <p className="text-gray-600 text-sm">
              Em breve entraremos em contato para confirmar seu agendamento.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nome Completo
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="name"
                  required
                  className="block w-full pl-10 rounded-md border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 text-sm py-2"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={loading}
                  placeholder="Digite seu nome completo"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    required
                    className="block w-full pl-10 rounded-md border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 text-sm py-2"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={loading}
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div className="relative">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Telefone
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-4 w-4 text-gray-400" />
                  </div>
                  <InputMask
                    mask="(99) 99999-9999"
                    type="tel"
                    id="phone"
                    required
                    className="block w-full pl-10 rounded-md border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 text-sm py-2"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    disabled={loading}
                    placeholder="(00) 00000-0000"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                  Data
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="block w-full pl-10 rounded-md border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 text-sm py-2"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="relative">
                <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                  Horário
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Clock className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="time"
                    id="time"
                    required
                    className="block w-full pl-10 rounded-md border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 text-sm py-2"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

            <div className="relative">
              <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
                Motivo da Consulta
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 pt-2 pointer-events-none">
                  <FileText className="h-4 w-4 text-gray-400" />
                </div>
                <textarea
                  id="reason"
                  rows={3}
                  className="block w-full pl-10 rounded-md border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 text-sm py-2"
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  disabled={loading}
                  placeholder="Descreva brevemente o motivo da sua consulta"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 text-white py-2.5 px-4 rounded-md hover:bg-emerald-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center justify-center space-x-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Agendando...</span>
                </>
              ) : (
                <>
                  <Calendar className="h-4 w-4" />
                  <span>Agendar Consulta</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default BookingForm;