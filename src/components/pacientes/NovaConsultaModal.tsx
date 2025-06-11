import { useEffect, useState } from 'react';
import { Consulta } from '../../types/Consulta';

interface Props {
  onClose: () => void;
  onSave: (consulta: Consulta) => void;
  consulta?: Consulta | null;
}

const NovaConsultaModal = ({ onClose, onSave, consulta }: Props) => {
  const [queixa, setQueixa] = useState('');
  const [receita, setReceita] = useState('');
  const [exames, setExames] = useState('');
  const [dataHora, setDataHora] = useState('');

  useEffect(() => {
    if (consulta) {
      setQueixa(consulta.queixa);
      setReceita(consulta.receita);
      setExames(consulta.exames);
      setDataHora(consulta.data);
    } else {
      setDataHora(new Date().toISOString().slice(0, 16)); // formato ISO local
    }
  }, [consulta]);

  const handleSubmit = () => {
    const nova: Consulta = {
      id: consulta?.id || Date.now().toString(),
      data: dataHora,
      queixa,
      receita,
      exames,
    };
    onSave(nova);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">{consulta ? 'Editar Consulta' : 'Nova Consulta'}</h2>
        <div className="space-y-4">
          <input
            type="datetime-local"
            className="w-full border p-2 rounded"
            value={dataHora}
            onChange={(e) => setDataHora(e.target.value)}
          />
          <textarea
            placeholder="Queixa"
            className="w-full border p-2 rounded"
            value={queixa}
            onChange={(e) => setQueixa(e.target.value)}
          />
          <textarea
            placeholder="Receita"
            className="w-full border p-2 rounded"
            value={receita}
            onChange={(e) => setReceita(e.target.value)}
          />
          <textarea
            placeholder="Exames"
            className="w-full border p-2 rounded"
            value={exames}
            onChange={(e) => setExames(e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default NovaConsultaModal;