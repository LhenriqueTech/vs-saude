interface CardResumoProps {
    titulo: string;
    valor: string | number;
  }
  
  const CardResumo = ({ titulo, valor }: CardResumoProps) => {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-xs">
        <h3 className="text-gray-500 text-sm">{titulo}</h3>
        <p className="text-2xl font-bold text-blue-600 mt-2">{valor}</p>
      </div>
    );
  };
  
  export default CardResumo;
  