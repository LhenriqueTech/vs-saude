import React, { useState } from 'react';
import { Lock, Mail, Stethoscope } from 'lucide-react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('Tentando fazer login com:', formData.email);
      
      if (!formData.email || !formData.password) {
        setError('Por favor, preencha todos os campos.');
        setLoading(false);
        return;
      }

      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      console.log('Login bem-sucedido:', userCredential.user.email);
      
      if (rememberMe) {
        // A persistência já está configurada no arquivo de configuração do Firebase
        console.log('Lembrar-me ativado');
      }

      onLogin(formData.email, formData.password);
    } catch (error: any) {
      console.error('Erro no login:', error);
      
      switch (error.code) {
        case 'auth/invalid-email':
          setError('O formato do email é inválido.');
          break;
        case 'auth/user-disabled':
          setError('Esta conta foi desativada. Entre em contato com o administrador.');
          break;
        case 'auth/user-not-found':
          setError('Não existe uma conta com este email.');
          break;
        case 'auth/wrong-password':
          setError('Senha incorreta. Tente novamente.');
          break;
        case 'auth/network-request-failed':
          setError('Erro de conexão. Verifique sua internet.');
          break;
        case 'auth/too-many-requests':
          setError('Muitas tentativas de login. Tente novamente mais tarde.');
          break;
        default:
          setError(`Erro ao fazer login: ${error.message}`);
          console.error('Erro detalhado:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-500 to-emerald-700 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="bg-white rounded-full p-3 shadow-lg">
            <Stethoscope size={40} className="text-emerald-600" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          VS Saúde
        </h2>
        <p className="mt-2 text-center text-sm text-emerald-100">
          Área do Médico
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-colors"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value.trim() })}
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-colors"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded transition-colors"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={loading}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Lembrar-me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-emerald-600 hover:text-emerald-500 transition-colors">
                  Esqueceu sua senha?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Entrando...
                  </div>
                ) : (
                  'Entrar'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm; 