import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, Mail, MessageSquare, Menu, X, Award, Heart, Brain, Salad, Apple, Utensils, ChevronRight } from 'lucide-react';
import AppointmentPanel from './components/AppointmentPanel';
import BookingForm from './components/BookingForm';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [showPanel, setShowPanel] = useState(false);

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
              <a href="#home" className="text-gray-700 hover:text-emerald-600">Home</a>
              <a href="#services" className="text-gray-700 hover:text-emerald-600">Serviços</a>
              <a href="#about" className="text-gray-700 hover:text-emerald-600">Sobre</a>
              <a href="#testimonials" className="text-gray-700 hover:text-emerald-600">Depoimentos</a>
              <button 
                onClick={() => setShowBooking(true)}
                className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700"
              >
                Faça Agendamento
              </button>
              <button 
                onClick={() => setShowPanel(true)}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200"
              >
                Appointment Panel
              </button>
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
              <a href="#home" className="block px-3 py-2 text-gray-700 hover:text-emerald-600">Home</a>
              <a href="#services" className="block px-3 py-2 text-gray-700 hover:text-emerald-600">Serviços</a>
              <a href="#about" className="block px-3 py-2 text-gray-700 hover:text-emerald-600">Sobre</a>
              <a href="#testimonials" className="block px-3 py-2 text-gray-700 hover:text-emerald-600">Depoimentos</a>
              <button 
                onClick={() => setShowBooking(true)}
                className="w-full text-left px-3 py-2 text-gray-700 hover:text-emerald-600"
              >
                Faça Agendamento
              </button>
              <button 
                onClick={() => setShowPanel(true)}
                className="w-full text-left px-3 py-2 text-gray-700 hover:text-emerald-600"
              >
                Appointment Panel
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div id="home" className="relative">
        <img 
          src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=2000&q=80" 
          alt="Doctor's office" 
          className="w-full h-[600px] object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Transforme sua Saúde <span className="text-emerald-400">Nutrologia</span>
            </h1>
            <p className="text-xl mb-8 max-w-2xl">
            Experimente um aconselhamento nutricional personalizado que o capacita a fazer mudanças duradouras no estilo de vida. Nossa abordagem baseada em evidências ajuda você a alcançar saúde e bem-estar ideais.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => setShowBooking(true)}
                className="bg-emerald-600 text-white px-8 py-3 rounded-md text-lg hover:bg-emerald-700 transition"
              >
                Marque uma Consulta
              </button>
              <a 
                href="#learn-more" 
                className="bg-white text-emerald-600 px-8 py-3 rounded-md text-lg hover:bg-emerald-50 transition flex items-center justify-center"
              >
                Saiba Mais <ChevronRight className="ml-2" size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-12 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-emerald-600 mb-2">1000+</div>
              <div className="text-gray-600">Pacientes Satisfeitos</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-emerald-600 mb-2">15+</div>
              <div className="text-gray-600">Anos de Experiência</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-emerald-600 mb-2">24/7</div>
              <div className="text-gray-600">Online Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section id="services" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Comprehensive Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer a wide range of nutrition services tailored to your individual needs and goals.
              Our evidence-based approach ensures you receive the highest quality care.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
              <Calendar className="w-12 h-12 text-emerald-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Nutritional Assessment</h3>
              <p className="text-gray-600 mb-4">Comprehensive evaluation of your dietary habits, health history, and nutritional needs.</p>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-center">
                  <ChevronRight className="text-emerald-600 mr-2" size={16} />
                  Body composition analysis
                </li>
                <li className="flex items-center">
                  <ChevronRight className="text-emerald-600 mr-2" size={16} />
                  Dietary recall assessment
                </li>
                <li className="flex items-center">
                  <ChevronRight className="text-emerald-600 mr-2" size={16} />
                  Nutritional deficiency screening
                </li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
              <Utensils className="w-12 h-12 text-emerald-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Personalized Meal Planning</h3>
              <p className="text-gray-600 mb-4">Custom meal plans designed to meet your specific health goals and dietary preferences.</p>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-center">
                  <ChevronRight className="text-emerald-600 mr-2" size={16} />
                  Weekly meal schedules
                </li>
                <li className="flex items-center">
                  <ChevronRight className="text-emerald-600 mr-2" size={16} />
                  Shopping lists
                </li>
                <li className="flex items-center">
                  <ChevronRight className="text-emerald-600 mr-2" size={16} />
                  Recipe recommendations
                </li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
              <MessageSquare className="w-12 h-12 text-emerald-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Ongoing Support</h3>
              <p className="text-gray-600 mb-4">Regular check-ins and adjustments to ensure you stay on track with your goals.</p>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-center">
                  <ChevronRight className="text-emerald-600 mr-2" size={16} />
                  Progress monitoring
                </li>
                <li className="flex items-center">
                  <ChevronRight className="text-emerald-600 mr-2" size={16} />
                  Plan adjustments
                </li>
                <li className="flex items-center">
                  <ChevronRight className="text-emerald-600 mr-2" size={16} />
                  Email support
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Why Choose NutroHealth?</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <Award className="text-emerald-600 mr-4 mt-1" size={24} />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Expert Team</h3>
                    <p className="text-gray-600">Our certified nutritionists have years of experience in helping clients achieve their health goals.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Heart className="text-emerald-600 mr-4 mt-1" size={24} />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Personalized Care</h3>
                    <p className="text-gray-600">We create customized nutrition plans that fit your lifestyle, preferences, and health objectives.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Brain className="text-emerald-600 mr-4 mt-1" size={24} />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Evidence-Based Approach</h3>
                    <p className="text-gray-600">Our recommendations are based on the latest scientific research and proven nutritional principles.</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1594498653385-d5172c532c00?auto=format&fit=crop&w=800&q=80"
                alt="Nutritionist consulting with client"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100&q=80"
                  alt="Client"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold">Sarah Johnson</h4>
                  <p className="text-gray-600 text-sm">Weight Management Client</p>
                </div>
              </div>
              <p className="text-gray-600">
                "Working with NutroHealth has been life-changing. Their personalized approach helped me achieve my weight goals while developing healthy eating habits that stick."
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80"
                  alt="Client"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold">Michael Chen</h4>
                  <p className="text-gray-600 text-sm">Sports Nutrition Client</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The team's expertise in sports nutrition has significantly improved my athletic performance. Their guidance has been invaluable in my training journey."
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80"
                  alt="Client"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold">Emma Davis</h4>
                  <p className="text-gray-600 text-sm">Wellness Program Client</p>
                </div>
              </div>
              <p className="text-gray-600">
                "I appreciate their holistic approach to nutrition and wellness. They don't just focus on diet but consider your entire lifestyle and goals."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-emerald-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Health?</h2>
          <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
            Take the first step towards a healthier lifestyle. Schedule your consultation today and let us help you achieve your nutrition goals.
          </p>
          <button
            onClick={() => setShowBooking(true)}
            className="bg-white text-emerald-600 px-8 py-3 rounded-md text-lg hover:bg-emerald-50 transition"
          >
            Book Your Consultation
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">NutroHealth</h3>
              <p className="text-gray-300">Expert nutritional care for a healthier tomorrow.</p>
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
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#home" className="text-gray-300 hover:text-white">Home</a></li>
                <li><a href="#services" className="text-gray-300 hover:text-white">Services</a></li>
                <li><a href="#about" className="text-gray-300 hover:text-white">About</a></li>
                <li><a href="#testimonials" className="text-gray-300 hover:text-white">Testimonials</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-300">
                  <Phone size={16} className="mr-2" />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <Mail size={16} className="mr-2" />
                  <span>contact@nutrohealth.com</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <Clock size={16} className="mr-2" />
                  <span>Mon-Fri: 9:00 AM - 6:00 PM</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
              <form className="space-y-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button
                  type="submit"
                  className="w-full bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; {new Date().getFullYear()} NutroHealth. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Booking Form Modal */}
      {showBooking && (
        <BookingForm onClose={() => setShowBooking(false)} />
      )}

      {/* Appointment Panel Modal */}
      {showPanel && (
        <AppointmentPanel onClose={() => setShowPanel(false)} />
      )}
    </div>
  );
}

export default App;