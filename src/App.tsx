import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Phone, Mail, MessageSquare, Menu, X, Award, Heart, Brain, Salad, Apple, Utensils, ChevronRight } from 'lucide-react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';
import AppointmentPanel from './components/AppointmentPanel';
import BookingForm from './components/BookingForm';
import LoginForm from './components/LoginForm';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async (email: string, password: string) => {
    setShowLogin(false);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setIsAuthenticated(false);
      setShowPanel(false);
    } catch (error) {
      // Tratar erro silenciosamente
    }
  };

  // Se ainda está carregando, pode mostrar um spinner ou tela de loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  // Se estiver mostrando o formulário de login, renderiza apenas ele
  if (showLogin) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-emerald-600">VS Saúde</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-700 hover:text-emerald-600">Início</a>
              <a href="#services" className="text-gray-700 hover:text-emerald-600">Serviços</a>
              <a href="#about" className="text-gray-700 hover:text-emerald-600">Sobre</a>
              <a href="#testimonials" className="text-gray-700 hover:text-emerald-600">Depoimentos</a>
              <button 
                onClick={() => setShowBooking(true)}
                className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700"
              >
                Agendar Consulta
              </button>
              {isAuthenticated ? (
                <>
                  <button 
                    onClick={() => navigate('/dashboard')}
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200"
                  >
                    Painel de Consultas
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="text-gray-700 hover:text-emerald-600"
                  >
                    Sair
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => setShowLogin(true)}
                  className="text-gray-700 hover:text-emerald-600"
                >
                  Área do Médico
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#home" className="block px-3 py-2 text-gray-700 hover:text-emerald-600">Início</a>
              <a href="#services" className="block px-3 py-2 text-gray-700 hover:text-emerald-600">Serviços</a>
              <a href="#about" className="block px-3 py-2 text-gray-700 hover:text-emerald-600">Sobre</a>
              <a href="#testimonials" className="block px-3 py-2 text-gray-700 hover:text-emerald-600">Depoimentos</a>
              <button 
                onClick={() => setShowBooking(true)}
                className="w-full text-left px-3 py-2 text-gray-700 hover:text-emerald-600"
              >
                Agendar Consulta
              </button>
              {isAuthenticated ? (
                <>
                  <button 
                    onClick={() => setShowPanel(true)}
                    className="w-full text-left px-3 py-2 text-gray-700 hover:text-emerald-600"
                  >
                    Painel de Consultas
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 text-gray-700 hover:text-emerald-600"
                  >
                    Sair
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => setShowLogin(true)}
                  className="w-full text-left px-3 py-2 text-gray-700 hover:text-emerald-600"
                >
                  Área do Médico
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div id="home" className="relative h-[600px] bg-gradient-to-r from-emerald-800 to-emerald-600">
        <div className="absolute inset-0">
          <img 
            src="./image/Blog-MedCof-59.png" 
            alt="Dr. Vinícius Sousa" 
            className="w-full h-full object-cover mix-blend-overlay opacity-35"
          />
        </div>
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Transforme sua Saúde com o <span className="text-emerald-300">Dr. Vinícius Sousa</span>
            </h1>
            <p className="text-xl mb-8 max-w-2xl">
              Experimente um aconselhamento nutricional personalizado que o capacita a fazer mudanças duradouras no estilo de vida. Nossa abordagem baseada em evidências ajuda você a alcançar saúde e bem-estar ideais.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => setShowBooking(true)}
                className="bg-emerald-500 text-white px-8 py-3 rounded-md text-lg hover:bg-emerald-600 transition-all duration-300 flex items-center justify-center group"
              >
                Marque uma Consulta 
                <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </button>
              <a 
                href="#about" 
                className="bg-white text-emerald-600 px-8 py-3 rounded-md text-lg hover:bg-emerald-50 transition-all duration-300 flex items-center justify-center group"
              >
                Conheça o Médico
                <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-12 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-emerald-600 mb-2">1000+</div>
              <div className="text-gray-600">Pacientes Satisfeitos</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-emerald-600 mb-2">15+</div>
              <div className="text-gray-600">Anos de Experiência</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-emerald-600 mb-2">24/7</div>
              <div className="text-gray-600">Suporte Online</div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section id="services" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nossos Serviços Abrangentes</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Oferecemos uma ampla gama de serviços nutricionais adaptados às suas necessidades e objetivos individuais.
              Nossa abordagem baseada em evidências garante que você receba o mais alto padrão de cuidado.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition flex flex-col h-full">
              <div className="flex items-center justify-center mb-6">
                <Calendar className="w-12 h-12 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center">Avaliação Nutricional</h3>
              <p className="text-gray-600 mb-6 text-center">Avaliação abrangente dos seus hábitos alimentares, histórico de saúde e necessidades nutricionais.</p>
              <ul className="text-gray-600 space-y-4 mt-auto">
                <li className="flex items-center">
                  <ChevronRight className="text-emerald-600 mr-2 flex-shrink-0" size={16} />
                  <span>Análise de composição corporal</span>
                </li>
                <li className="flex items-center">
                  <ChevronRight className="text-emerald-600 mr-2 flex-shrink-0" size={16} />
                  <span>Avaliação de recordatório alimentar</span>
                </li>
                <li className="flex items-center">
                  <ChevronRight className="text-emerald-600 mr-2 flex-shrink-0" size={16} />
                  <span>Triagem de deficiências nutricionais</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition flex flex-col h-full">
              <div className="flex items-center justify-center mb-6">
                <Utensils className="w-12 h-12 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center">Plano Alimentar Personalizado</h3>
              <p className="text-gray-600 mb-6 text-center">Planos de refeições personalizados projetados para atender aos seus objetivos específicos de saúde e preferências alimentares.</p>
              <ul className="text-gray-600 space-y-4 mt-auto">
                <li className="flex items-center">
                  <ChevronRight className="text-emerald-600 mr-2 flex-shrink-0" size={16} />
                  <span>Cronograma semanal de refeições</span>
                </li>
                <li className="flex items-center">
                  <ChevronRight className="text-emerald-600 mr-2 flex-shrink-0" size={16} />
                  <span>Listas de compras</span>
                </li>
                <li className="flex items-center">
                  <ChevronRight className="text-emerald-600 mr-2 flex-shrink-0" size={16} />
                  <span>Recomendações de receitas</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition flex flex-col h-full">
              <div className="flex items-center justify-center mb-6">
                <MessageSquare className="w-12 h-12 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center">Acompanhamento Contínuo</h3>
              <p className="text-gray-600 mb-6 text-center">Acompanhamentos regulares e ajustes para garantir que você permaneça no caminho certo com seus objetivos.</p>
              <ul className="text-gray-600 space-y-4 mt-auto">
                <li className="flex items-center">
                  <ChevronRight className="text-emerald-600 mr-2 flex-shrink-0" size={16} />
                  <span>Monitoramento de progresso</span>
                </li>
                <li className="flex items-center">
                  <ChevronRight className="text-emerald-600 mr-2 flex-shrink-0" size={16} />
                  <span>Ajustes no plano</span>
                </li>
                <li className="flex items-center">
                  <ChevronRight className="text-emerald-600 mr-2 flex-shrink-0" size={16} />
                  <span>Suporte por email</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Conheça o Dr. Vinícius Sousa</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Médico especializado em nutrologia, dedicado a ajudar seus pacientes a alcançarem uma vida mais saudável através de uma abordagem personalizada e baseada em evidências.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="aspect-w-4 aspect-h-5 rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="./image/dr-vinicius-profile.JPG" 
                  alt="Dr. Vinícius Sousa" 
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">
                Experiência e Dedicação
              </h3>
              <p className="text-gray-600">
                Com formação especializada em nutrologia, o Dr. Vinícius Sousa tem se dedicado a ajudar seus pacientes a alcançarem seus objetivos de saúde através de uma abordagem personalizada e cientificamente fundamentada.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors duration-300">
                  <div className="text-emerald-600 font-bold text-xl mb-1">5+ Anos</div>
                  <div className="text-sm text-gray-600">de Experiência</div>
                </div>
                <div className="p-4 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors duration-300">
                  <div className="text-emerald-600 font-bold text-xl mb-1">1000+</div>
                  <div className="text-sm text-gray-600">Pacientes Atendidos</div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Especialidades:</h4>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-600 group">
                    <ChevronRight className="text-emerald-600 mr-2 group-hover:translate-x-1 transition-transform" size={16} />
                    Nutrologia Clínica
                  </li>
                  <li className="flex items-center text-gray-600 group">
                    <ChevronRight className="text-emerald-600 mr-2 group-hover:translate-x-1 transition-transform" size={16} />
                    Emagrecimento
                  </li>
                  <li className="flex items-center text-gray-600 group">
                    <ChevronRight className="text-emerald-600 mr-2 group-hover:translate-x-1 transition-transform" size={16} />
                    Reeducação Alimentar
                  </li>
                  <li className="flex items-center text-gray-600 group">
                    <ChevronRight className="text-emerald-600 mr-2 group-hover:translate-x-1 transition-transform" size={16} />
                    Tratamento de Obesidade
                  </li>
                </ul>
              </div>

              <button
                onClick={() => setShowBooking(true)}
                className="bg-emerald-600 text-white px-6 py-3 rounded-md hover:bg-emerald-700 transition-all duration-300 flex items-center group"
              >
                Agende sua Consulta 
                <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">O que Nossos Clientes Dizem</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col">
              <div className="flex items-center mb-6">
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100&q=80"
                  alt="Cliente"
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-lg">Maria Silva</h4>
                  <p className="text-gray-600">Cliente de Controle de Peso</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Trabalhar com a VS Saúde foi transformador. Sua abordagem personalizada me ajudou a atingir meus objetivos de peso enquanto desenvolvia hábitos alimentares saudáveis que permanecem."
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col">
              <div className="flex items-center mb-6">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80"
                  alt="Cliente"
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-lg">Pedro Santos</h4>
                  <p className="text-gray-600">Cliente de Nutrição Esportiva</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "A experiência da equipe em nutrição esportiva melhorou significativamente meu desempenho atlético. A orientação deles tem sido fundamental na minha jornada de treinos."
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col">
              <div className="flex items-center mb-6">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80"
                  alt="Cliente"
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-lg">Ana Oliveira</h4>
                  <p className="text-gray-600">Cliente do Programa de Bem-estar</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Aprecio muito a abordagem holística para nutrição e bem-estar. Eles não focam apenas na dieta, mas consideram todo o seu estilo de vida e objetivos."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-emerald-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Pronto para Transformar sua Saúde?</h2>
          <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
            Dê o primeiro passo em direção a um estilo de vida mais saudável. Agende sua consulta hoje e deixe-nos ajudá-lo a alcançar seus objetivos nutricionais.
          </p>
          <button
            onClick={() => setShowBooking(true)}
            className="bg-white text-emerald-600 px-8 py-3 rounded-md text-lg hover:bg-emerald-50 transition"
          >
            Agende sua Consulta
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">VS Saúde</h3>
              <p className="text-gray-300">Cuidado nutricional especializado para um amanhã mais saudável.</p>
              <div className="mt-4 flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white">
                  <Award size={24} />
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <Heart size={24} />
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <Apple size={24} />
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
              <ul className="space-y-2">
                <li><a href="#home" className="text-gray-300 hover:text-white">Início</a></li>
                <li><a href="#services" className="text-gray-300 hover:text-white">Serviços</a></li>
                <li><a href="#about" className="text-gray-300 hover:text-white">Sobre</a></li>
                <li><a href="#testimonials" className="text-gray-300 hover:text-white">Depoimentos</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contato</h4>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-300">
                  <Phone size={16} className="mr-2" />
                  <span>+55 (11) 1234-5678</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <Mail size={16} className="mr-2" />
                  <span>contato@vssaúde.com.br</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <Clock size={16} className="mr-2" />
                  <span>Seg-Sex: 9:00 - 18:00</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
              <form className="space-y-2">
                <input
                  type="email"
                  placeholder="Digite seu email"
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button
                  type="submit"
                  className="w-full bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700"
                >
                  Inscrever-se
                </button>
              </form>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; {new Date().getFullYear()} VS Saúde. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Booking Form Modal */}
      {showBooking && (
        <BookingForm onClose={() => setShowBooking(false)} />
      )}

      {/* Appointment Panel Modal */}
      {showPanel && isAuthenticated && (
        <AppointmentPanel onClose={() => setShowPanel(false)} />
      )}
    </div>
  );
}

export default App;