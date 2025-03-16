import React, { useState } from 'react';
import { X } from 'lucide-react';

interface AppointmentPanelProps {
  onClose: () => void;
}

interface Appointment {
  id: number;
  patientName: string;
  date: string;
  time: string;
  status: string;
  reason: string;
}

// Mock data for appointments
const mockAppointments = [
  {
    id: 1,
    patientName: 'John Doe',
    date: '2024-03-20',
    time: '09:00',
    status: 'Confirmed',
    reason: 'Initial Consultation'
  },
  {
    id: 2,
    patientName: 'Jane Smith',
    date: '2024-03-21',
    time: '14:30',
    status: 'Pending',
    reason: 'Follow-up'
  },
];

const AppointmentPanel: React.FC<AppointmentPanelProps> = ({ onClose }) => {
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [filter, setFilter] = useState('all');
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);

  const filteredAppointments = appointments.filter(appointment => {
    if (filter === 'all') return true;
    return appointment.status.toLowerCase() === filter.toLowerCase();
  });

  const handleEdit = (appointment: Appointment) => {
    setEditingAppointment(appointment);
  };

  const handleSaveEdit = () => {
    if (editingAppointment) {
      setAppointments(appointments.map(apt => 
        apt.id === editingAppointment.id ? editingAppointment : apt
      ));
      setEditingAppointment(null);
    }
  };

  const handleCancel = (appointmentId: number) => {
    setAppointments(appointments.map(apt => 
      apt.id === appointmentId ? { ...apt, status: 'Cancelled' } : apt
    ));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-4xl w-full m-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Appointment Panel</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="mb-6">
          <label htmlFor="filter" className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Status
          </label>
          <select
            id="filter"
            className="w-full md:w-48 rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Appointments</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reason
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAppointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {editingAppointment?.id === appointment.id ? (
                      <input
                        type="text"
                        value={editingAppointment.patientName}
                        onChange={(e) => setEditingAppointment({
                          ...editingAppointment,
                          patientName: e.target.value
                        })}
                        className="border rounded px-2 py-1"
                      />
                    ) : (
                      appointment.patientName
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {editingAppointment?.id === appointment.id ? (
                      <input
                        type="date"
                        value={editingAppointment.date}
                        onChange={(e) => setEditingAppointment({
                          ...editingAppointment,
                          date: e.target.value
                        })}
                        className="border rounded px-2 py-1"
                      />
                    ) : (
                      appointment.date
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {editingAppointment?.id === appointment.id ? (
                      <input
                        type="time"
                        value={editingAppointment.time}
                        onChange={(e) => setEditingAppointment({
                          ...editingAppointment,
                          time: e.target.value
                        })}
                        className="border rounded px-2 py-1"
                      />
                    ) : (
                      appointment.time
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${appointment.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 
                        appointment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'}`}>
                      {appointment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {editingAppointment?.id === appointment.id ? (
                      <input
                        type="text"
                        value={editingAppointment.reason}
                        onChange={(e) => setEditingAppointment({
                          ...editingAppointment,
                          reason: e.target.value
                        })}
                        className="border rounded px-2 py-1"
                      />
                    ) : (
                      appointment.reason
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {editingAppointment?.id === appointment.id ? (
                      <button
                        onClick={handleSaveEdit}
                        className="text-green-600 hover:text-green-900 mr-3"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEdit(appointment)}
                        className="text-emerald-600 hover:text-emerald-900 mr-3"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => handleCancel(appointment.id)}
                      className="text-red-600 hover:text-red-900"
                      disabled={appointment.status === 'Cancelled'}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AppointmentPanel;