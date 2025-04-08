import { collection, addDoc, getDocs, updateDoc, doc, query, where, Timestamp } from 'firebase/firestore';
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
      console.log('Iniciando criação da consulta:', appointmentData);
      
      // Validar dados antes de enviar
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

      console.log('Dados formatados para envio:', consultaData);
      
      const docRef = await addDoc(collection(db, COLLECTION_NAME), consultaData);
      console.log('Consulta criada com sucesso. ID:', docRef.id);
      
      return docRef.id;
    } catch (error) {
      console.error('Erro detalhado ao criar consulta:', error);
      if (error instanceof Error) {
        console.error('Mensagem de erro:', error.message);
        console.error('Stack trace:', error.stack);
      }
      throw error;
    }
  },

  async getAppointments() {
    try {
      console.log('Buscando todas as consultas...');
      const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
      const consultas = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Appointment[];
      console.log('Consultas encontradas:', consultas.length);
      return consultas;
    } catch (error) {
      console.error('Erro ao buscar consultas:', error);
      throw error;
    }
  },

  async updateAppointmentStatus(appointmentId: string, status: Appointment['status']) {
    try {
      console.log('Atualizando status da consulta:', appointmentId, status);
      const appointmentRef = doc(db, COLLECTION_NAME, appointmentId);
      await updateDoc(appointmentRef, { status });
      console.log('Status atualizado com sucesso');
    } catch (error) {
      console.error('Erro ao atualizar status da consulta:', error);
      throw error;
    }
  },

  async getAppointmentsByStatus(status: Appointment['status']) {
    try {
      console.log('Buscando consultas por status:', status);
      const q = query(
        collection(db, COLLECTION_NAME),
        where('status', '==', status)
      );
      const querySnapshot = await getDocs(q);
      const consultas = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Appointment[];
      console.log('Consultas encontradas:', consultas.length);
      return consultas;
    } catch (error) {
      console.error('Erro ao buscar consultas por status:', error);
      throw error;
    }
  }
}; 