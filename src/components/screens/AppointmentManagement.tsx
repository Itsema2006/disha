import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Appointment, AppointmentStatus } from '../../types';
import { 
  Calendar, 
  Plus, 
  Search, 
  Filter, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  User, 
  Phone, 
  FileText, 
  CalendarDays,
  Send,
  MoreVertical,
  Check,
  RotateCcw
} from 'lucide-react';

export const AppointmentManagement: React.FC = () => {
  const { 
    appointments, 
    addAppointment, 
    updateAppointmentStatus, 
    showToast, 
    addAuditLog, 
    checkPermission,
    setActiveModule 
  } = useApp();

  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [calendarView, setCalendarView] = useState<'day' | 'week' | 'month'>('day');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [doctorFilter, setDoctorFilter] = useState<string>('all');

  const [showAddModal, setShowAddModal] = useState(false);
  const [rescheduleApt, setRescheduleApt] = useState<Appointment | null>(null);

  // New Appointment Form
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [testName, setTestName] = useState('CBC + HbA1c & Fasting Glucose');
  const [doctorName, setDoctorName] = useState('Dr. Rajesh Mehta');
  const [dateTime, setDateTime] = useState('2026-09-21');
  const [timeSlot, setTimeSlot] = useState('10:30 AM');

  const canEdit = checkPermission('appointments') !== 'view';

  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          apt.phone.includes(searchTerm) ||
                          apt.testName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || apt.status === statusFilter;
    const matchesDoctor = doctorFilter === 'all' || apt.doctorName === doctorFilter;
    return matchesSearch && matchesStatus && matchesDoctor;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !phone) return;
    addAppointment({
      patientName,
      phone,
      testName,
      doctorName,
      dateTime,
      timeSlot,
      status: 'Confirmed',
      createdVia: 'Reception'
    });
    setPatientName('');
    setPhone('');
    setShowAddModal(false);
  };

  const handleRescheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rescheduleApt) return;
    updateAppointmentStatus(rescheduleApt.id, 'Confirmed');
    showToast(`Rescheduled Appointment #${rescheduleApt.id} to ${timeSlot}`);
    addAuditLog(`Rescheduled Appointment #${rescheduleApt.id}`, 'Appointments', rescheduleApt.id);
    setRescheduleApt(null);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header & Controls */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Appointment Management & Calendar</h2>
          <p className="text-gray-500 text-xs mt-0.5">
            Manage diagnostic bookings, confirm walk-ins, and send WhatsApp reminder vouchers.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* View Mode Toggle */}
          <div className="bg-gray-100 p-1 rounded-xl flex items-center gap-1 border border-gray-200">
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'list' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              List View
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'calendar' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Calendar View
            </button>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Appointment</span>
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search patient, phone, or test name..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>

        <div className="flex items-center gap-3">
          {viewMode === 'calendar' && (
            <div className="bg-gray-100 p-0.5 rounded-lg border border-gray-200 flex items-center">
              <button 
                onClick={() => setCalendarView('day')} 
                className={`px-2.5 py-1 text-[11px] font-bold rounded ${calendarView === 'day' ? 'bg-emerald-600 text-white' : 'text-gray-600'}`}
              >
                Day
              </button>
              <button 
                onClick={() => setCalendarView('week')} 
                className={`px-2.5 py-1 text-[11px] font-bold rounded ${calendarView === 'week' ? 'bg-emerald-600 text-white' : 'text-gray-600'}`}
              >
                Week
              </button>
              <button 
                onClick={() => setCalendarView('month')} 
                className={`px-2.5 py-1 text-[11px] font-bold rounded ${calendarView === 'month' ? 'bg-emerald-600 text-white' : 'text-gray-600'}`}
              >
                Month
              </button>
            </div>
          )}

          <div className="flex items-center gap-2">
            <span className="text-gray-500 font-semibold">Status:</span>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-700 outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-gray-500 font-semibold">Doctor:</span>
            <select
              value={doctorFilter}
              onChange={e => setDoctorFilter(e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-700 outline-none"
            >
              <option value="all">All Doctors</option>
              <option value="Dr. Rajesh Mehta">Dr. Rajesh Mehta</option>
              <option value="Dr. Ananya Deshmukh">Dr. Ananya Deshmukh</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main View Display */}
      {viewMode === 'list' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAppointments.map(apt => (
            <div 
              key={apt.id} 
              className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase text-gray-400 font-mono">#{apt.id}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    apt.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                    apt.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' :
                    apt.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                    'bg-rose-100 text-rose-800'
                  }`}>
                    {apt.status}
                  </span>
                </div>

                <h3 className="font-bold text-gray-900 text-base mt-2">{apt.patientName}</h3>
                
                <div className="mt-2 space-y-1 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span>{apt.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="font-medium text-gray-800">{apt.testName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span>{apt.dateTime} at <strong>{apt.timeSlot}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span>Assigned: {apt.doctorName}</span>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-[11px]">
                  <span className="text-gray-400">Created via:</span>
                  <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-700 font-semibold border border-gray-200">
                    {apt.createdVia}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-gray-100 flex items-center gap-2">
                {apt.status === 'Confirmed' && canEdit && (
                  <button
                    onClick={() => updateAppointmentStatus(apt.id, 'Completed')}
                    className="flex-1 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg text-xs transition-all flex items-center justify-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Mark Completed</span>
                  </button>
                )}

                {apt.status === 'Pending' && canEdit && (
                  <button
                    onClick={() => updateAppointmentStatus(apt.id, 'Confirmed')}
                    className="flex-1 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg text-xs transition-all flex items-center justify-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Confirm</span>
                  </button>
                )}

                {canEdit && (
                  <button
                    onClick={() => setRescheduleApt(apt)}
                    className="py-1.5 px-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg text-xs transition-all"
                  >
                    Reschedule
                  </button>
                )}

                {apt.status !== 'Cancelled' && canEdit && (
                  <button
                    onClick={() => updateAppointmentStatus(apt.id, 'Cancelled')}
                    className="py-1.5 px-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg text-xs font-semibold"
                    title="Cancel Appointment"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Calendar View Simulator */
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-emerald-600" />
              <span>Interactive Calendar ({calendarView.toUpperCase()} VIEW) • September 2026</span>
            </h3>
            <span className="text-xs text-emerald-600 font-semibold">Disha Tarabai Park Schedule</span>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold text-gray-500 py-2 border-b border-gray-100">
            <div>Mon (21)</div>
            <div>Tue (22)</div>
            <div>Wed (23)</div>
            <div>Thu (24)</div>
            <div>Fri (25)</div>
            <div>Sat (26)</div>
            <div>Sun (27)</div>
          </div>

          <div className="grid grid-cols-7 gap-2 min-h-[300px] text-xs">
            {/* Monday 21 (Today) */}
            <div className="p-2 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-2">
              <div className="font-bold text-emerald-900 text-center border-b border-emerald-200/60 pb-1">
                Today (6 Apt)
              </div>

              {appointments.map(apt => (
                <div key={apt.id} className="p-2 bg-white rounded-lg border border-emerald-200 shadow-2xs space-y-1 text-[11px]">
                  <div className="font-bold text-gray-900 truncate">{apt.patientName}</div>
                  <div className="text-emerald-700 font-medium truncate">{apt.testName}</div>
                  <div className="text-gray-500 font-mono text-[10px]">{apt.timeSlot}</div>
                </div>
              ))}
            </div>

            {/* Tue - Sun empty slots */}
            {[22, 23, 24, 25, 26, 27].map(day => (
              <div key={day} className="p-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-400 text-center">
                <div className="font-medium text-[11px] mb-2">{day} Sep</div>
                <div className="text-[10px] text-gray-400">Available slots</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Appointment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200">
            <h3 className="font-bold text-gray-900 text-base mb-1">Create New Appointment</h3>
            <p className="text-gray-500 text-xs mb-4">Add walk-in or phone booking to schedule.</p>

            <form onSubmit={handleCreateSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Patient Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Patil"
                  value={patientName}
                  onChange={e => setPatientName(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">Mobile Number</label>
                <input
                  type="text"
                  required
                  placeholder="+91 98220 12345"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">Test Name</label>
                <input
                  type="text"
                  required
                  value={testName}
                  onChange={e => setTestName(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Time Slot</label>
                  <input
                    type="text"
                    value={timeSlot}
                    onChange={e => setTimeSlot(e.target.value)}
                    className="w-full p-2.5 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Assigned Doctor</label>
                  <select
                    value={doctorName}
                    onChange={e => setDoctorName(e.target.value)}
                    className="w-full p-2.5 border border-gray-300 rounded-xl outline-none bg-white"
                  >
                    <option value="Dr. Rajesh Mehta">Dr. Rajesh Mehta</option>
                    <option value="Dr. Ananya Deshmukh">Dr. Ananya Deshmukh</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl shadow-md"
                >
                  Create Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {rescheduleApt && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200">
            <h3 className="font-bold text-gray-900 text-base mb-1">Reschedule Appointment #{rescheduleApt.id}</h3>
            <p className="text-gray-500 text-xs mb-4">Patient: {rescheduleApt.patientName}</p>

            <form onSubmit={handleRescheduleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">New Time Slot</label>
                <select
                  value={timeSlot}
                  onChange={e => setTimeSlot(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-xl bg-white outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="11:30 AM">11:30 AM</option>
                  <option value="02:30 PM">02:30 PM</option>
                  <option value="05:00 PM">05:00 PM</option>
                </select>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setRescheduleApt(null)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl shadow-md"
                >
                  Save New Time
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
