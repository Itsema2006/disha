import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Role } from '../../types';
import { ShieldCheck, Lock, Mail, Phone, CheckCircle, ArrowRight, Activity, Stethoscope, Sparkles } from 'lucide-react';

export const LoginScreen: React.FC = () => {
  const { loginAsRole, staffUsers, patients, showToast } = useApp();
  const [emailOrPhone, setEmailOrPhone] = useState('rahul.sharma@dishadiagnostic.in');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);
  const [selectedRole, setSelectedRole] = useState<Role>('receptionist');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // First try finding in staff users
    const staffMatch = staffUsers.find(
      s => s.email.toLowerCase() === emailOrPhone.toLowerCase() || s.mobile === emailOrPhone
    );
    if (staffMatch) {
      loginAsRole(staffMatch.role);
      return;
    }

    // Next try finding in patients
    const patientMatch = patients.find(
      p => p.email?.toLowerCase() === emailOrPhone.toLowerCase() || p.phone === emailOrPhone
    );
    if (patientMatch) {
      loginAsRole('patient');
      return;
    }

    // Fallback to the dropdown selected role if no email match, or show error
    if (emailOrPhone.trim() === '') {
      loginAsRole(selectedRole);
    } else {
      showToast('Invalid email or mobile. Could not find a matching user for role-based login.');
      // Still log them in via the dropdown selection as a fallback for the demo
      loginAsRole(selectedRole);
    }
  };

  const roleDemoCards: { role: Role; name: string; title: string; color: string }[] = [
    { role: 'owner', name: 'Dr. Ananya Deshmukh', title: 'Owner / Chief Admin', color: 'bg-purple-50 text-purple-700 border-purple-200' },
    { role: 'ops_manager', name: 'Vikram Patil', title: 'Operations Manager', color: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
    { role: 'receptionist', name: 'Rahul Sharma', title: 'Receptionist', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { role: 'lab_tech', name: 'Priya Shinde', title: 'Lab Technician', color: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
    { role: 'pathologist', name: 'Dr. Rajesh Mehta', title: 'Pathologist (MD)', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
    { role: 'accounts', name: 'Suresh Kulkarni', title: 'Accounts & Billing', color: 'bg-amber-50 text-amber-700 border-amber-200' },
    { role: 'patient', name: 'Rohan Joshi', title: 'Patient (Mobile Portal)', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center p-4 selection:bg-emerald-500 selection:text-white">
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 text-gray-800 border border-gray-700/50">
        
        {/* Left Side: Healthcare Hero & Branding */}
        <div className="lg:col-span-6 bg-gradient-to-br from-gray-900 via-emerald-950 to-cyan-950 p-8 lg:p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl -ml-20 -mb-20"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-400 flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-emerald-500/30">
                D
              </div>
              <div>
                <h1 className="font-bold text-2xl text-white tracking-tight">Disha Diagnostic Centre</h1>
                <p className="text-emerald-300 text-xs font-medium">Tarabai Park, Kolhapur • Maharashtra</p>
              </div>
            </div>

            <div className="mt-12 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Next-Gen Healthcare Management Platform</span>
              </div>
              <h2 className="text-3xl font-extrabold text-white leading-tight">
                AI Voice & WhatsApp Automated Diagnostics
              </h2>
              <p className="text-gray-300 text-xs leading-relaxed">
                Empowering doctors, lab staff, and patients with instant AI receptionist booking, WhatsApp report delivery, automated reminders, and real-time clinical workflows.
              </p>
            </div>

            {/* Visual Healthcare Features */}
            <div className="mt-8 grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <div className="font-bold text-white">AI Voice Reception</div>
                  <div className="text-[10px] text-gray-400">24/7 Phone Booking</div>
                </div>
              </div>

              <div className="p-3 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                <div>
                  <div className="font-bold text-white">WhatsApp Automation</div>
                  <div className="text-[10px] text-gray-400">Instant Reports & Reminders</div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-10 pt-6 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-400">
            <span>ISO 9001:2015 NABL Accredited Lab</span>
            <span>Kolhapur, MH</span>
          </div>
        </div>

        {/* Right Side: Login Form & Role Quick Redirect */}
        <div className="lg:col-span-6 p-8 lg:p-12 flex flex-col justify-between bg-white">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900 tracking-tight">Staff & Patient Login</h3>
              <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                Production Demo
              </span>
            </div>
            <p className="text-gray-500 text-xs mt-1">Enter credentials or select a role to test role-based redirects.</p>

            {/* Login Form */}
            <form onSubmit={handleLoginSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Email / Mobile Number</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -trangray-y-1/2" />
                  <input
                    type="text"
                    value={emailOrPhone}
                    onChange={e => setEmailOrPhone(e.target.value)}
                    placeholder="Enter email or mobile..."
                    className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -trangray-y-1/2" />
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                    className="rounded text-emerald-600 focus:ring-emerald-500 border-gray-300"
                  />
                  <span>Remember me</span>
                </label>
                <button type="button" className="text-emerald-600 font-semibold hover:underline">
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-semibold py-3 px-4 rounded-xl text-xs shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all"
              >
                <span>Login</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Quick Role Selection for Prototype Evaluation */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-gray-800 uppercase tracking-wider">Quick Demo Login By Role</span>
                <span className="text-[10px] text-gray-500">Auto-redirects to role dashboard</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                {roleDemoCards.map(r => (
                  <button
                    key={r.role}
                    type="button"
                    onClick={() => {
                      setSelectedRole(r.role);
                      loginAsRole(r.role);
                    }}
                    className={`p-2.5 rounded-xl border text-left transition-all hover:scale-[1.02] ${r.color} ${
                      selectedRole === r.role ? 'ring-2 ring-emerald-500 font-bold shadow-xs' : ''
                    }`}
                  >
                    <div className="font-semibold">{r.name}</div>
                    <div className="text-[10px] opacity-80 mt-0.5">{r.title}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 text-center text-[11px] text-gray-400">
            Disha Diagnostic Centre, Tarabai Park, Kolhapur • Powered by Antigravity AI
          </div>
        </div>

      </div>
    </div>
  );
};
