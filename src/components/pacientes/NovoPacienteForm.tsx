import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';
import Sidebar from '../layout/Sidebar';
import Header from '../layout/Header';

const NovoPacienteForm = () => {
  const navigate = useNavigate();
  const [aba, setAba] = useState<'basico' | 'adicional' | 'privado'>('basico');
  const [semEmail, setSemEmail] = useState(false);
  const [erros, setErros] = useState<string>('');

  const [form, setForm] = useState({
    nome: '',
    cpf: '',
    dataNascimento: '',
    sexo: '',
    prematuro: false,
    fadiga: false,
    tabagista: false,
    hdam: false,
    gravida: false,
    descendencia: '',
    comorbidades: '',
    celular: '',
    email: '',
    rg: '',
    cep: '',
    profissao: '',
    endereco: '',
    numero: '',
    complemento: '',
    nomeMae: '',
    nomePai: '',
    convenio: '',
    bairro: '',
    numeroCarteira: '',
    estado: '',
    cidade: '',
    tipo: '',
    informacoesAdicionais: '',
    alergias: '',
    vegano: '',
    observacoesPrivadas: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSalvar = () => {
    if (!form.nome.trim()) return setErros('O nome completo é obrigatório.');
    if (!form.dataNascimento) return setErros('A data de nascimento é obrigatória.');
    if (!form.cpf || form.cpf.includes('_')) return setErros('O CPF é obrigatório e deve estar completo.');
    if (!form.sexo) return setErros('Selecione o sexo.');
    if (!form.celular || form.celular.includes('_')) return setErros('O celular é obrigatório e deve estar completo.');
    if (!semEmail && !form.email.trim()) return setErros('O e-mail é obrigatório ou marque a opção "Não possui e-mail".');

    console.log('Paciente salvo:', form);
    alert('Paciente salvo com sucesso!');
    navigate('/pacientes');
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 w-full min-h-screen bg-gray-100">
        <Header />
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Novo Paciente</h2>

          <div className="flex mb-4 gap-2">
            <button className={`px-4 py-2 rounded ${aba === 'basico' ? 'bg-emerald-600 text-white' : 'bg-white border'}`} onClick={() => setAba('basico')}>Informações Básicas</button>
            <button className={`px-4 py-2 rounded ${aba === 'adicional' ? 'bg-emerald-600 text-white' : 'bg-white border'}`} onClick={() => setAba('adicional')}>Informações Adicionais</button>
            <button className={`px-4 py-2 rounded ${aba === 'privado' ? 'bg-emerald-600 text-white' : 'bg-white border'}`} onClick={() => setAba('privado')}>Informações Privadas</button>
          </div>

          {erros && <div className="text-red-600 mb-4">{erros}</div>}

          {aba === 'basico' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="nome" value={form.nome} onChange={handleChange} placeholder="Nome Completo" className="border p-2 rounded" />
              <InputMask mask="999.999.999-99" name="cpf" value={form.cpf} onChange={handleChange} placeholder="CPF" className="border p-2 rounded" />
              <input name="dataNascimento" type="date" value={form.dataNascimento} onChange={handleChange} className="border p-2 rounded" />
              <select name="sexo" value={form.sexo} onChange={handleChange} className="border p-2 rounded">
                <option value="">Sexo</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
              </select>
              <label><input type="checkbox" name="prematuro" checked={form.prematuro} onChange={handleChange} /> Prematuro</label>
              <label><input type="checkbox" name="fadiga" checked={form.fadiga} onChange={handleChange} /> Fadiga crônica</label>
              <label><input type="checkbox" name="tabagista" checked={form.tabagista} onChange={handleChange} /> Tabagista</label>
              <label><input type="checkbox" name="hdam" checked={form.hdam} onChange={handleChange} /> H.DAM</label>
              <label><input type="checkbox" name="gravida" checked={form.gravida} onChange={handleChange} /> Grávida</label>
              <input name="descendencia" value={form.descendencia} onChange={handleChange} placeholder="Descendência" className="border p-2 rounded" />
              <input name="comorbidades" value={form.comorbidades} onChange={handleChange} placeholder="Comorbidade" className="border p-2 rounded" />
              <InputMask mask="(99) 99999-9999" name="celular" value={form.celular} onChange={handleChange} placeholder="Celular" className="border p-2 rounded" />
              <input name="email" value={form.email} onChange={handleChange} placeholder="E-mail" className="border p-2 rounded" disabled={semEmail} />
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={semEmail} onChange={(e) => { setSemEmail(e.target.checked); if (e.target.checked) setForm({ ...form, email: '' }); }} /> Não possui e-mail
              </label>
            </div>
          )}

          {aba === 'adicional' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="rg" value={form.rg} onChange={handleChange} placeholder="RG" className="border p-2 rounded" />
              <input name="cep" value={form.cep} onChange={handleChange} placeholder="CEP" className="border p-2 rounded" />
              <input name="profissao" value={form.profissao} onChange={handleChange} placeholder="Profissão" className="border p-2 rounded" />
              <input name="endereco" value={form.endereco} onChange={handleChange} placeholder="Endereço" className="border p-2 rounded" />
              <input name="numero" value={form.numero} onChange={handleChange} placeholder="Número" className="border p-2 rounded" />
              <input name="complemento" value={form.complemento} onChange={handleChange} placeholder="Complemento" className="border p-2 rounded" />
              <input name="nomeMae" value={form.nomeMae} onChange={handleChange} placeholder="Nome da Mãe" className="border p-2 rounded" />
              <input name="nomePai" value={form.nomePai} onChange={handleChange} placeholder="Nome do Pai" className="border p-2 rounded" />
              <input name="convenio" value={form.convenio} onChange={handleChange} placeholder="Convênio" className="border p-2 rounded" />
              <input name="bairro" value={form.bairro} onChange={handleChange} placeholder="Bairro" className="border p-2 rounded" />
              <input name="numeroCarteira" value={form.numeroCarteira} onChange={handleChange} placeholder="Número da Carteira" className="border p-2 rounded" />
              <input name="estado" value={form.estado} onChange={handleChange} placeholder="Estado" className="border p-2 rounded" />
              <input name="cidade" value={form.cidade} onChange={handleChange} placeholder="Cidade" className="border p-2 rounded" />
              <input name="tipo" value={form.tipo} onChange={handleChange} placeholder="Tipo" className="border p-2 rounded" />
              <textarea name="informacoesAdicionais" value={form.informacoesAdicionais} onChange={handleChange} placeholder="Informações adicionais" className="border p-2 rounded col-span-2" />
            </div>
          )}

          {aba === 'privado' && (
            <div className="grid grid-cols-1 gap-4">
              <input name="alergias" value={form.alergias} onChange={handleChange} placeholder="Alergias" className="border p-2 rounded" />
              <label className="flex items-center gap-4">
                Vegano:
                <label><input type="radio" name="vegano" value="Sim" checked={form.vegano === 'Sim'} onChange={handleChange} /> Sim</label>
                <label><input type="radio" name="vegano" value="Não" checked={form.vegano === 'Não'} onChange={handleChange} /> Não</label>
              </label>
              <textarea name="observacoesPrivadas" value={form.observacoesPrivadas} onChange={handleChange} placeholder="Observações Privadas" className="border p-2 rounded h-32" />
            </div>
          )}

          <div className="flex justify-end gap-4 mt-6">
            <button onClick={handleSalvar} className="bg-emerald-600 text-white px-6 py-2 rounded hover:bg-emerald-700">
              Salvar Paciente
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NovoPacienteForm;
