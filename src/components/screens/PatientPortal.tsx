import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Smartphone, 
  Calendar, 
  FileText, 
  Download, 
  PhoneCall, 
  MapPin, 
  ShieldCheck, 
  Plus, 
  CheckCircle2, 
  Clock, 
  MessageSquare,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const PatientPortal: React.FC = () => {
  const { appointments, reports, addAppointment, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'book' | 'reports' | 'history'>('dashboard');

  // Booking Form State
  const [testName, setTestName] = useState('CBC + Fasting Glucose');
  const [date, setDate] = useState('2026-09-22');
  const [timeSlot, setTimeSlot] = useState('09:00 AM');

  const upcomingApt = appointments.find(a => a.patientName === 'Rohan Joshi' && a.status !== 'Cancelled');
  const patientReport = reports.find(r => r.patientName === 'Rohan Joshi');

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAppointment({
      patientName: 'Rohan Joshi',
      phone: '+91 98220 12345',
      testName,
      dateTime: date,
      timeSlot,
      status: 'Confirmed',
      createdVia: 'Patient Portal'
    });
    showToast(`Appointment booked successfully! Confirmation sent on WhatsApp.`);
    setActiveTab('dashboard');
  };

  return (
    <div className="max-w-md mx-auto my-4 space-y-4 animate-fadeIn">
      {/* Mobile Device Frame Header */}
      <div className="bg-gradient-to-r from-sky-600 via-sky-700 to-teal-700 text-white p-5 rounded-3xl shadow-xl space-y-3 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white text-sky-700 font-bold text-lg flex items-center justify-center shadow-md">
              D
            </div>
            <div>
              <h2 className="font-bold text-base tracking-tight">Disha Diagnostic Centre</h2>
              <p className="text-[11px] text-sky-200">Patient Portal • Kolhapur</p>
            </div>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-bold border border-white/20">
            Self-Service
          </span>
        </div>

        {/* Patient Profile Card */}
        <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 flex items-center justify-between text-xs">
          <div>
            <div className="font-bold text-white text-sm">Namaskar, Rohan Joshi!</div>
            <div className="text-sky-200 text-[11px] mt-0.5">+91 98220 12345 • O+ Blood</div>
          </div>
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold">
            RJ
          </div>
        </div>
      </div>

      {/* Mobile Portal Navigation Tabs */}
      <div className="bg-white p-1.5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-around text-xs font-semibold">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex-1 py-2 rounded-xl transition-all ${
            activeTab === 'dashboard' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Home
        </button>
        <button
          onClick={() => setActiveTab('book')}
          className={`flex-1 py-2 rounded-xl transition-all ${
            activeTab === 'book' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Book Test
        </button>
        <button
          onClick={() => setActiveTab('reports')}
          className={`flex-1 py-2 rounded-xl transition-all ${
            activeTab === 'reports' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          My Reports
        </button>
      </div>

      {/* Tab 1: Patient Dashboard */}
      {activeTab === 'dashboard' && (
        <div className="space-y-4">
          {/* Quick Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setActiveTab('book')}
              className="p-4 bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-2xl text-left space-y-1 transition-all"
            >
              <div className="w-8 h-8 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold">
                <Plus className="w-4 h-4" />
              </div>
              <div className="font-bold text-slate-900 text-xs mt-2">Book Appointment</div>
              <div className="text-[10px] text-slate-500">Select test & timing</div>
            </button>

            <button
              onClick={() => setActiveTab('reports')}
              className="p-4 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-2xl text-left space-y-1 transition-all"
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                <FileText className="w-4 h-4" />
              </div>
              <div className="font-bold text-slate-900 text-xs mt-2">View Diagnostic Reports</div>
              <div className="text-[10px] text-slate-500">Download PDF instantly</div>
            </button>
          </div>

          {/* Upcoming Appointment Card */}
          {upcomingApt && (
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900">Upcoming Appointment</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  {upcomingApt.status}
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl space-y-1 text-xs border border-slate-100">
                <div className="font-bold text-slate-900">{upcomingApt.testName}</div>
                <div className="text-slate-600 flex items-center gap-1.5 text-[11px]">
                  <Clock className="w-3.5 h-3.5 text-sky-600" />
                  <span>{upcomingApt.dateTime} at {upcomingApt.timeSlot}</span>
                </div>
                <div className="text-slate-500 text-[10px]">Doctor: {upcomingApt.doctorName}</div>
              </div>

              <div className="text-[11px] text-sky-700 bg-sky-50 p-2 rounded-lg font-medium border border-sky-100">
                ⚠️ Fasting requirement: Remain fasted for 10-12 hours before test time.
              </div>
            </div>
          )}

          {/* Diagnostic Centre Contact Card */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs text-xs space-y-2">
            <h4 className="font-bold text-slate-900">Disha Diagnostic Centre Kolhapur</h4>
            <div className="flex items-center gap-2 text-slate-600 text-[11px]">
              <MapPin className="w-4 h-4 text-sky-600 shrink-0" />
              <span>Tarabai Park, Opp. District Court, Kolhapur</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600 text-[11px]">
              <PhoneCall className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Call Centre: +91 0231 2654321 / +91 98220 11111</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Book Appointment */}
      {activeTab === 'book' && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-sm">Book Diagnostic Test</h3>

          <form onSubmit={handleBookSubmit} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Select Test Package</label>
              <select
                value={testName}
                onChange={e => setTestName(e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-xl bg-white outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="CBC + HbA1c & Fasting Glucose">CBC + Fasting Glucose (₹1,450)</option>
                <option value="Thyroid Profile (T3, T4, TSH)">Thyroid Profile (T3, T4, TSH) (₹950)</option>
                <option value="Comprehensive Lipid Profile">Comprehensive Lipid Profile (₹1,200)</option>
                <option value="Full Body Senior Checkup">Full Body Senior Checkup (₹2,999)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Preferred Date</label>
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Preferred Time Slot</label>
              <select
                value={timeSlot}
                onChange={e => setTimeSlot(e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-xl bg-white outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="08:00 AM">08:00 AM (Morning Fasting Slot)</option>
                <option value="09:30 AM">09:30 AM</option>
                <option value="11:00 AM">11:00 AM</option>
                <option value="04:00 PM">04:00 PM</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Confirm & Send WhatsApp Voucher</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Tab 3: Reports */}
      {activeTab === 'reports' && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-sm">Your Verified Diagnostic Reports</h3>

          {patientReport ? (
            <div className="p-4 bg-sky-50 border border-sky-200 rounded-2xl space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sky-900">{patientReport.testName}</span>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                  VERIFIED
                </span>
              </div>

              <div className="text-slate-600 text-[11px] space-y-0.5">
                <p>Report Number: {patientReport.reportNumber}</p>
                <p>Reported Date: {patientReport.reportedDate}</p>
                <p>Pathologist: {patientReport.pathologistName}</p>
              </div>

              <div className="pt-2 border-t border-sky-200 flex items-center gap-2">
                <button
                  onClick={() => showToast(`Opening PDF Report ${patientReport.reportNumber}...`)}
                  className="flex-1 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl text-center text-xs shadow-xs"
                >
                  Download Official PDF
                </button>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-500">No reports found for this profile.</p>
          )}
        </div>
      )}

    </div>
  );
};
