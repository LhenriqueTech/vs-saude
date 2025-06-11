import { Consulta } from '../../types/Consulta';

interface Props {
  consulta: Consulta;
  onEdit: () => void;
  onDelete: () => void;
}

const formatarDataHoraBR = (data: string) => {
  return new Date(data).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const ConsultaCard = ({ consulta, onEdit, onDelete }: Props) => {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <p className="text-sm text-gray-500 mb-1">
        <strong>Data:</strong> {formatarDataHoraBR(consulta.data)}
      </p>
      <p className="text-sm text-gray-700 mb-1">
        <strong>Queixa:</strong> {consulta.queixa}
      </p>
      <p className="text-sm text-gray-700 mb-1">
        <strong>Receita:</strong> {consulta.receita}
      </p>
      <p className="text-sm text-gray-700 mb-3">
        <strong>Exames:</strong> {consulta.exames}
      </p>

      <div className="flex justify-end gap-2">
        <button
          onClick={onEdit}
          className="text-sm text-blue-600 hover:underline"
        >
          Editar
        </button>
        <button
          onClick={onDelete}
          className="text-sm text-red-600 hover:underline"
        >
          Excluir
        </button>
      </div>
    </div>
  );
};

export default ConsultaCard;
