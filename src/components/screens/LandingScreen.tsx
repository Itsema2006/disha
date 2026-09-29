import React from 'react';
import { Footer } from '../layout/Footer';
import { useApp } from '../../context/AppContext';
import { 
  MapPin, 
  Phone, 
  Mail, 
  ChevronDown, 
  Stethoscope, 
  Activity, 
  Pill, 
  FileText, 
  ArrowRight, 
  MessageCircle, 
  Send,
  Calendar,
  PhoneCall,
  Sparkles
} from 'lucide-react';

interface LandingScreenProps {
  onGetConnected: () => void;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({ onGetConnected }) => {
  const { loginAsRole, setActiveModule } = useApp();

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans selection:bg-emerald-600 selection:text-white animate-fadeIn pb-12">
      
      {/* Top Utility Bar (Slate Gray) */}
      <div className="bg-gray-100 border-b border-gray-200 text-gray-600 text-xs py-2 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          
          {/* Left Contact Details */}
          <div className="flex flex-wrap items-center gap-4 text-[11px] font-medium">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Tarabai Park, Opp. District Court, Kolhapur 416003</span>
            </div>
            <div className="hidden md:flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>+91 0231 2654321</span>
            </div>
            <div className="hidden lg:flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>contact@dishadiagnostic.in</span>
            </div>
          </div>

          {/* Right Social & Language */}
          <div className="flex items-center gap-4 text-[11px]">
            <div className="flex items-center gap-2.5 text-gray-500">
              <span className="w-5 h-5 rounded-full bg-gray-200 hover:bg-emerald-600 hover:text-white flex items-center justify-center cursor-pointer transition-colors text-[10px]">f</span>
              <span className="w-5 h-5 rounded-full bg-gray-200 hover:bg-emerald-600 hover:text-white flex items-center justify-center cursor-pointer transition-colors text-[10px]">📷</span>
              <span className="w-5 h-5 rounded-full bg-gray-200 hover:bg-emerald-600 hover:text-white flex items-center justify-center cursor-pointer transition-colors text-[10px]">💬</span>
              <span className="w-5 h-5 rounded-full bg-gray-200 hover:bg-emerald-600 hover:text-white flex items-center justify-center cursor-pointer transition-colors text-[10px]">📲</span>
            </div>

            <div className="h-3 w-px bg-gray-300"></div>

            <div className="flex items-center gap-1 cursor-pointer hover:text-emerald-700 font-semibold text-[11px]">
              <span>Eng</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </div>
          </div>

        </div>
      </div>

      {/* Main Header / Navigation Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-700 to-cyan-500 flex items-center justify-center text-white font-serif font-bold text-2xl shadow-md">
              D
            </div>
            <div>
              <div className="font-extrabold text-emerald-950 text-xl tracking-tight leading-none font-serif">
                Disha
              </div>
              <div className="text-[10px] uppercase font-bold tracking-widest text-gray-500 mt-0.5">
                Diagnostic Centre • Kolhapur
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center gap-7 text-xs font-semibold text-gray-600">
            <a href="#home" className="text-emerald-700 font-bold border-b-2 border-emerald-600 pb-0.5">Home</a>
            <div className="flex items-center gap-1 cursor-pointer hover:text-emerald-700 transition-colors">
              <span>About Us</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </div>
            <div className="flex items-center gap-1 cursor-pointer hover:text-emerald-700 transition-colors">
              <span>Pathologists & Doctors</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </div>
            <a href="#services" className="hover:text-emerald-700 transition-colors">Departments</a>
            <div className="flex items-center gap-1 cursor-pointer hover:text-emerald-700 transition-colors">
              <span>AI Voice & WhatsApp</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </div>
            <a href="#packages" className="hover:text-emerald-700 transition-colors">Health Packages</a>
            <a href="#contact" className="hover:text-emerald-700 transition-colors">Contact Us</a>
          </div>

          {/* Schedule Appointment / Get Connected Button */}
          <button
            onClick={onGetConnected}
            className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg text-xs shadow-md transition-all flex items-center gap-2 hover:scale-105"
          >
            <span>Get Connected</span>
          </button>

        </div>
      </header>

      {/* Main Container Wrapper */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 mt-6">
        
        {/* Large Rounded Hero Banner (Blue Theme with Doctor Overlay) */}
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-cyan-950 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl min-h-[420px] flex flex-col justify-center">
          
          {/* Subtle Background Pattern */}
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-600/30 via-transparent to-transparent pointer-events-none"></div>

          {/* Content Left Column */}
          <div className="max-w-xl relative z-10 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-200 text-xs font-semibold backdrop-blur-md border border-white/15">
              <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
              <span>NABL Accredited & AI Voice Automated Diagnostics</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight">
              Trusted healthcare for you & your family
            </h2>

            <p className="text-emerald-100 text-sm sm:text-base leading-relaxed max-w-lg font-normal">
              Quality healthcare with experienced doctors, modern pathology facilities, AI voice receptionist, and instant WhatsApp report delivery in Kolhapur.
            </p>

            <div className="pt-2">
              <button
                onClick={onGetConnected}
                className="px-6 py-3 bg-white hover:bg-gray-100 text-emerald-950 font-extrabold rounded-xl text-xs shadow-lg transition-all hover:scale-105 inline-flex items-center gap-2"
              >
                <span>Book an Appointment</span>
              </button>
            </div>
          </div>

          {/* Right Doctor Image Overlay */}
          <div className="absolute right-0 bottom-0 top-0 w-1/2 hidden md:flex items-end justify-end pr-8 pointer-events-none">
            <div className="relative w-full max-w-md h-full flex items-end justify-center">
              <img
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600"
                alt="Professional Doctor"
                className="h-[92%] object-cover object-top rounded-b-3xl filter drop-shadow-2xl border-b-4 border-emerald-500/40"
                style={{
                  maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)',
                  WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)'
                }}
              />
            </div>
          </div>

        </div>

        {/* 4 Overlapping Floating Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 -mt-10 relative z-20 px-2 sm:px-4">
          
          {/* Card 1: Doctor Consultation */}
          <div 
            onClick={onGetConnected}
            className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200/80 hover:shadow-xl transition-all cursor-pointer group hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-all">
              <Stethoscope className="w-6 h-6" />
            </div>

            <h3 className="font-bold text-gray-900 text-base mb-1">Doctor Consultation</h3>
            <p className="text-gray-500 text-xs mb-4">Book specialist pathologists & physicians in Kolhapur.</p>

            <div className="text-xs font-bold text-emerald-700 group-hover:text-emerald-800 flex items-center gap-1">
              <span>Find Doctors</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* Card 2: Health Package */}
          <div 
            onClick={onGetConnected}
            className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200/80 hover:shadow-xl transition-all cursor-pointer group hover:-translate-y-1 relative overflow-hidden"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-all">
              <Activity className="w-6 h-6" />
            </div>

            <h3 className="font-bold text-gray-900 text-base mb-1">Health Package</h3>
            <p className="text-gray-500 text-xs mb-4">Sr. Citizen & Full Body 62-Test comprehensive checkup.</p>

            <div className="text-xs font-bold text-emerald-700 group-hover:text-emerald-800 flex items-center gap-1">
              <span>View Plans</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* Card 3: Buy Medicine / Diagnostic Tests */}
          <div 
            onClick={onGetConnected}
            className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200/80 hover:shadow-xl transition-all cursor-pointer group hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-all">
              <Pill className="w-6 h-6" />
            </div>

            <h3 className="font-bold text-gray-900 text-base mb-1">Diagnostic Tests</h3>
            <p className="text-gray-500 text-xs mb-4">CBC, Lipid, HbA1c, Thyroid & Radiology MRI services.</p>

            <div className="text-xs font-bold text-emerald-700 group-hover:text-emerald-800 flex items-center gap-1">
              <span>Explore Tests</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* Card 4: View Health Record */}
          <div 
            onClick={onGetConnected}
            className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200/80 hover:shadow-xl transition-all cursor-pointer group hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-all">
              <FileText className="w-6 h-6" />
            </div>

            <h3 className="font-bold text-gray-900 text-base mb-1">View Health Record</h3>
            <p className="text-gray-500 text-xs mb-4">Download verified PDF diagnostic reports & history.</p>

            <div className="text-xs font-bold text-emerald-700 group-hover:text-emerald-800 flex items-center gap-1">
              <span>View Reports</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

        </div>

      </main>

      {/* Additional Healthcare Information Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 mt-16 space-y-8">
        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-widest">
              AI Voice & WhatsApp Automation
            </span>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">
              Connect to Disha Diagnostic Platform
            </h3>
            <p className="text-gray-500 text-xs mt-1 max-w-xl">
              Log in to test role-based workflows for Doctors, Lab Techs, Receptionists, Accounts & Admin.
            </p>
          </div>

          <button
            onClick={onGetConnected}
            className="px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs shadow-md transition-all flex items-center gap-2 hover:scale-105 shrink-0"
          >
            <span>Get Connected → Login Screen</span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <Footer className="mt-16" />
    </div>
  );
};
