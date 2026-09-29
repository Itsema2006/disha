import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Calendar, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  FileText, 
  PhoneCall, 
  MessageSquare, 
  IndianRupee, 
  TrendingUp, 
  Users, 
  Plus, 
  Send, 
  Eye, 
  ChevronRight, 
  Activity, 
  ShieldAlert, 
  ArrowUpRight,
  Filter
} from 'lucide-react';

export const ExecutiveDashboard: React.FC = () => {
  const { 
    appointments, 
    reports, 
    aiCalls, 
    patients, 
    setActiveModule, 
    currentRole, 
    checkPermission,
    addAppointment,
    addPatient,
    showToast
  } = useApp();

  const [showAddAptModal, setShowAddAptModal] = useState(false);
  const [showAddPatientModal, setShowAddPatientModal] = useState(false);

  // New Appointment Form State
  const [newPatientName, setNewPatientName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newTestName, setNewTestName] = useState('CBC + Fasting Glucose');

  const canViewRevenue = checkPermission('billing') !== 'none';

  const totalAppointments = appointments.length;
  const completedApts = appointments.filter(a => a.status === 'Completed').length;
  const pendingApts = appointments.filter(a => a.status === 'Pending' || a.status === 'Confirmed').length;
  const cancelledApts = appointments.filter(a => a.status === 'Cancelled').length;

  const reportsPending = reports.filter(r => r.status === 'Draft' || r.status === 'Under Review').length;
  const reportsDelivered = reports.filter(r => r.status === 'Delivered').length;

  const aiHandledCalls = aiCalls.filter(c => c.status === 'AI Handled').length;
  const totalCalls = aiCalls.length;
  const aiEfficiencyRate = totalCalls > 0 ? Math.round((aiHandledCalls / totalCalls) * 100) : 88;

  const totalRevenue = appointments.reduce((sum, a) => sum + (a.status !== 'Cancelled' ? a.amount : 0), 0);

  const handleBookAptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPatientName || !newPhone) return;
    addAppointment({
      patientName: newPatientName,
      phone: newPhone,
      testName: newTestName,
      status: 'Confirmed',
      createdVia: 'Reception'
    });
    setNewPatientName('');
    setNewPhone('');
    setShowAddAptModal(false);
  };

  const handleAddPatientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPatientName || !newPhone) return;
    addPatient({
      name: newPatientName,
      phone: newPhone,
      age: 40,
      gender: 'Male'
    });
    setNewPatientName('');
    setNewPhone('');
    setShowAddPatientModal(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner & Quick Actions */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-cyan-900 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 backdrop-blur-3xl -skew-x-12 transform translate-x-12"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/10 text-emerald-200 text-xs font-medium mb-2 border border-white/10">
              <Activity className="w-3.5 h-3.5 text-cyan-300" />
              <span>Kolhapur Diagnostic Centre Operations • Live</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              {currentRole === 'owner' ? 'Executive Management Overview' : 'Clinic Operations Dashboard'}
            </h2>
            <p className="text-emerald-200 text-xs mt-1">
              Real-time monitoring for AI voice calls, WhatsApp bookings, lab reports & patient analytics.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setShowAddAptModal(true)}
              className="px-3.5 py-2 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-emerald-600/30 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>

            <button
              onClick={() => setShowAddPatientModal(true)}
              className="px-3.5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md transition-all"
            >
              <Users className="w-4 h-4" />
              <span>Add Patient</span>
            </button>

            <button
              onClick={() => setActiveModule('whatsapp')}
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Send WhatsApp</span>
            </button>

            <button
              onClick={() => setActiveModule('reports')}
              className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-white/20 transition-all"
            >
              <Eye className="w-4 h-4" />
              <span>View Reports</span>
            </button>
          </div>
        </div>
      </div>

      {/* Top 9 Metrics KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        
        {/* Appointments Today */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-emerald-300 transition-all cursor-pointer" onClick={() => setActiveModule('appointments')}>
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Appointments Today</span>
            <Calendar className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900">{totalAppointments}</div>
          <div className="mt-1 text-[11px] text-emerald-600 font-medium flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" />
            <span>+14% vs yesterday</span>
          </div>
        </div>

        {/* Completed Appointments */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-emerald-300 transition-all">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Completed</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900">{completedApts}</div>
          <div className="mt-1 text-[11px] text-slate-500 font-medium">Tests processed</div>
        </div>

        {/* Pending Appointments */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-amber-300 transition-all">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Pending / Confirmed</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900">{pendingApts}</div>
          <div className="mt-1 text-[11px] text-amber-600 font-medium">Awaiting patient arrival</div>
        </div>

        {/* Cancelled Appointments */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-rose-300 transition-all">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Cancelled</span>
            <XCircle className="w-4 h-4 text-rose-500" />
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900">{cancelledApts}</div>
          <div className="mt-1 text-[11px] text-rose-500 font-medium">Low (4.2% rate)</div>
        </div>

        {/* Reports Pending */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-purple-300 transition-all cursor-pointer" onClick={() => setActiveModule('reports')}>
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Reports Pending</span>
            <FileText className="w-4 h-4 text-purple-600" />
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900">{reportsPending}</div>
          <div className="mt-1 text-[11px] text-purple-600 font-medium">Under Pathologist Review</div>
        </div>

        {/* Reports Delivered */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-cyan-300 transition-all cursor-pointer" onClick={() => setActiveModule('reports')}>
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Reports Delivered</span>
            <FileText className="w-4 h-4 text-cyan-600" />
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900">{reportsDelivered}</div>
          <div className="mt-1 text-[11px] text-emerald-600 font-medium">Via WhatsApp & Portal</div>
        </div>

        {/* AI Calls Handled */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-emerald-300 transition-all cursor-pointer" onClick={() => setActiveModule('ai_receptionist')}>
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>AI Calls Handled</span>
            <PhoneCall className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900">{totalCalls}</div>
          <div className="mt-1 text-[11px] text-emerald-600 font-medium">{aiEfficiencyRate}% Resolution Rate</div>
        </div>

        {/* WhatsApp Conversations */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-emerald-300 transition-all cursor-pointer" onClick={() => setActiveModule('whatsapp')}>
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>WhatsApp Sent</span>
            <MessageSquare className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900">194</div>
          <div className="mt-1 text-[11px] text-emerald-600 font-medium">99.2% Delivery Rate</div>
        </div>

        {/* Revenue Summary (Role Guarded) */}
        <div className="col-span-2 bg-gradient-to-tr from-slate-900 to-slate-800 text-white p-4 rounded-xl shadow-md border border-slate-700 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1 text-xs text-emerald-400 font-semibold">
              <IndianRupee className="w-3.5 h-3.5" />
              <span>Today's Total Collections</span>
            </div>
            {canViewRevenue ? (
              <>
                <div className="text-2xl font-extrabold text-white mt-1">₹{totalRevenue.toLocaleString('en-IN')}</div>
                <div className="text-[11px] text-emerald-400 mt-0.5">85% Paid via UPI & QR</div>
              </>
            ) : (
              <div className="mt-2 text-xs text-amber-300 bg-amber-950/60 border border-amber-500/40 px-2 py-1 rounded">
                Restricted • Finance Access Only
              </div>
            )}
          </div>
          <button
            onClick={() => setActiveModule('analytics')}
            className="p-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-white transition-all text-xs flex items-center gap-1"
          >
            <span>Analytics</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Visual Charts & Graphs Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Appointment & Patient Trend Line Graph (Custom SVG Visualization) */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Appointment & Diagnostic Patient Trend</h3>
              <p className="text-slate-500 text-xs">Hourly distribution of patient arrivals and AI voice bookings today in Kolhapur.</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 font-medium text-emerald-700">
                <span className="w-3 h-3 rounded-full bg-emerald-600"></span>
                Completed
              </span>
              <span className="flex items-center gap-1.5 font-medium text-cyan-700">
                <span className="w-3 h-3 rounded-full bg-cyan-500"></span>
                AI Voice Booked
              </span>
            </div>
          </div>

          {/* Clean SVG Area Chart */}
          <div className="h-48 w-full relative pt-4">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 500 150">
              <defs>
                <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="tealGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="0" y1="30" x2="500" y2="30" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="70" x2="500" y2="70" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="110" x2="500" y2="110" stroke="#f1f5f9" strokeWidth="1" />

              {/* Sky Line Area (Completed) */}
              <path
                d="M 0 120 Q 80 40, 160 70 T 320 30 T 500 90 L 500 140 L 0 140 Z"
                fill="url(#skyGrad)"
              />
              <path
                d="M 0 120 Q 80 40, 160 70 T 320 30 T 500 90"
                fill="none"
                stroke="#10b981"
                strokeWidth="3"
              />

              {/* Teal Line (AI Booked) */}
              <path
                d="M 0 130 Q 80 80, 160 50 T 320 40 T 500 60"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="2.5"
                strokeDasharray="4 2"
              />

              {/* Data points */}
              <circle cx="160" cy="70" r="4" fill="#10b981" className="animate-ping" />
              <circle cx="160" cy="70" r="4" fill="#10b981" />
              <circle cx="320" cy="30" r="4" fill="#10b981" />
              <circle cx="320" cy="40" r="4" fill="#06b6d4" />
            </svg>

            {/* X Axis Labels */}
            <div className="flex justify-between text-[10px] text-slate-400 mt-2 font-mono">
              <span>08:00 AM</span>
              <span>10:00 AM</span>
              <span>12:00 PM</span>
              <span>02:00 PM</span>
              <span>04:00 PM</span>
              <span>06:00 PM</span>
            </div>
          </div>
        </div>

        {/* AI Voice Call Statistics Widget */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm">AI Receptionist Performance</h3>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
              99.8% Uptime
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
              <div>
                <div className="font-semibold text-slate-800">Total Calls Today</div>
                <div className="text-[11px] text-slate-500">84 calls processed</div>
              </div>
              <span className="font-bold text-slate-900 text-sm">84</span>
            </div>

            <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-100 flex items-center justify-between">
              <div>
                <div className="font-semibold text-emerald-900">AI Handled (Automated)</div>
                <div className="text-[11px] text-emerald-700">74 appointments & info</div>
              </div>
              <span className="font-bold text-emerald-900 text-sm">88%</span>
            </div>

            <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-100 flex items-center justify-between">
              <div>
                <div className="font-semibold text-amber-900">Transferred to Staff</div>
                <div className="text-[11px] text-amber-700">7 complex clinical queries</div>
              </div>
              <span className="font-bold text-amber-900 text-sm">8.3%</span>
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => setActiveModule('ai_receptionist')}
                className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl text-xs transition-all flex items-center justify-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                <span>Open Dedicated AI Calling Page</span>
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Recent Appointments & Recent Activity Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Recent Appointments Table */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Recent Appointments</h3>
              <p className="text-slate-500 text-xs">Today's patient schedule at Tarabai Park centre</p>
            </div>
            <button
              onClick={() => setActiveModule('appointments')}
              className="text-xs text-emerald-600 font-semibold hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold uppercase text-[10px] border-b border-slate-100">
                <tr>
                  <th className="p-3">Patient</th>
                  <th className="p-3">Test / Service</th>
                  <th className="p-3">Time Slot</th>
                  <th className="p-3">Channel</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                {appointments.slice(0, 5).map(apt => (
                  <tr key={apt.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3 font-semibold text-slate-900">
                      <div>{apt.patientName}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{apt.phone}</div>
                    </td>
                    <td className="p-3 text-slate-800">{apt.testName}</td>
                    <td className="p-3 text-slate-600">{apt.timeSlot}</td>
                    <td className="p-3">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                        {apt.createdVia}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                        apt.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                        apt.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' :
                        apt.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                        'bg-rose-100 text-rose-800'
                      }`}>
                        {apt.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => setActiveModule('patients')}
                        className="text-emerald-600 hover:text-emerald-800 text-[11px] font-semibold"
                      >
                        View Profile
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Patient Activity Feed */}
        <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm">Live Patient Activity</h3>
            <span className="text-[10px] text-slate-400">Real-time</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex gap-3 items-start">
              <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                WA
              </div>
              <div>
                <p className="text-slate-800 font-medium">Diagnostic Report Delivered</p>
                <p className="text-[11px] text-slate-500">Report #DDC/2026/09/RX221 sent via WhatsApp to Rohan Joshi.</p>
                <span className="text-[10px] text-slate-400">2 mins ago</span>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                AI
              </div>
              <div>
                <p className="text-slate-800 font-medium">New Call Handled by AI</p>
                <p className="text-[11px] text-slate-500">Prakash Patil inquired about Senior Citizen checkup pricing.</p>
                <span className="text-[10px] text-slate-400">18 mins ago</span>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                MD
              </div>
              <div>
                <p className="text-slate-800 font-medium">Report Verified by Pathologist</p>
                <p className="text-[11px] text-slate-500">Dr. Rajesh Mehta approved Thyroid profile for Sunita Patil.</p>
                <span className="text-[10px] text-slate-400">35 mins ago</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Book Appointment Modal */}
      {showAddAptModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="font-bold text-slate-900 text-base mb-1">Book New Diagnostic Appointment</h3>
            <p className="text-slate-500 text-xs mb-4">Creates appointment and sends instant WhatsApp confirmation voucher.</p>

            <form onSubmit={handleBookAptSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Patient Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kadam"
                  value={newPatientName}
                  onChange={e => setNewPatientName(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Mobile Phone (+91)</label>
                <input
                  type="text"
                  required
                  placeholder="+91 98220 12345"
                  value={newPhone}
                  onChange={e => setNewPhone(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Diagnostic Test / Service</label>
                <select
                  value={newTestName}
                  onChange={e => setNewTestName(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none bg-white"
                >
                  <option value="CBC + Fasting Glucose">CBC + Fasting Glucose (₹1,450)</option>
                  <option value="Comprehensive Lipid Profile">Comprehensive Lipid Profile (₹1,200)</option>
                  <option value="Thyroid Profile (T3, T4, TSH)">Thyroid Profile (T3, T4, TSH) (₹950)</option>
                  <option value="MRI Right Knee Joint">MRI Right Knee Joint (₹3,500)</option>
                </select>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddAptModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl shadow-md"
                >
                  Confirm & Send WhatsApp
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Patient Modal */}
      {showAddPatientModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="font-bold text-slate-900 text-base mb-1">Register New Patient</h3>
            <p className="text-slate-500 text-xs mb-4">Add patient record to Disha Diagnostic database.</p>

            <form onSubmit={handleAddPatientSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Patient Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Swati Pawar"
                  value={newPatientName}
                  onChange={e => setNewPatientName(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Mobile Phone Number</label>
                <input
                  type="text"
                  required
                  placeholder="+91 98220 99887"
                  value={newPhone}
                  onChange={e => setNewPhone(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddPatientModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-xl shadow-md"
                >
                  Register Patient
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
