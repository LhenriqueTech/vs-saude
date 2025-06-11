import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import PacienteDetalhado from './pages/PacienteDetalhado';
import Pacientes from './pages/Pacientes';
import NovoPacienteForm from './components/pacientes/NovoPacienteForm';



import App from './App';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/pacientes/:id" element={<PacienteDetalhado />} />
      <Route path="/pacientes" element={<Pacientes />} />
      <Route path="/pacientes/novo" element={<NovoPacienteForm />} />
    </Routes>
  );
};

export default Router;
