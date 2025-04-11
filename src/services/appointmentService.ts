import { collection, addDoc, getDocs, updateDoc, doc, query, where, Timestamp, deleteDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export interface Appointment {
  id?: string;
  nomePaciente: string;
  email: string;
  telefone: string;
  data: string;
  horario: string;
  motivo: string;
  status: 'pendente' | 'confirmada' | 'cancelada';
  criadoEm: Timestamp;
}

const COLLECTION_NAME = 'consultas';

export const appointmentService = {
  async createAppointment(appointmentData: Omit<Appointment, 'id' | 'status' | 'criadoEm'>) {
    try {
      if (!appointmentData.nomePaciente || !appointmentData.email || 
          !appointmentData.telefone || !appointmentData.data || 
          !appointmentData.horario || !appointmentData.motivo) {
        throw new Error('Dados incompletos para criar consulta');
      }

      const consultaData = {
        ...appointmentData,
        status: 'pendente' as const,
        criadoEm: Timestamp.now()
      };
      
      const docRef = await addDoc(collection(db, COLLECTION_NAME), consultaData);
      return docRef.id;
    } catch (error) {
      throw error;
    }
  },

  async getAppointments() {
    try {
      const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
      const consultas = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Appointment[];
      return consultas;
    } catch (error) {
      throw error;
    }
  },

  async updateAppointmentStatus(appointmentId: string, status: Appointment['status']) {
    try {
      const appointmentRef = doc(db, COLLECTION_NAME, appointmentId);
      await updateDoc(appointmentRef, { status });
    } catch (error) {
      throw error;
    }
  },

  async deleteAppointment(appointmentId: string) {
    try {
      const appointmentRef = doc(db, COLLECTION_NAME, appointmentId);
      await deleteDoc(appointmentRef);
    } catch (error) {
      throw error;
    }
  },

  async getAppointmentsByStatus(status: Appointment['status']) {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where('status', '==', status)
      );
      const querySnapshot = await getDocs(q);
      const consultas = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Appointment[];
      return consultas;
    } catch (error) {
      throw error;
    }
  }
}; 