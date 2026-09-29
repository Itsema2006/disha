import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Patient } from '../../types';
import { 
  Users, 
  Search, 
  Plus, 
  Phone, 
  Mail, 
  MapPin, 
  FileText, 
  Calendar, 
  CreditCard, 
  MessageSquare, 
  Activity, 
  X, 
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

export const PatientManagement: React.FC = () => {
  const { patients, appointments, reports, currentRole, checkPermission, setActiveModule } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(patients[0]);

  const canViewBilling = checkPermission('billing') !== 'none';
  const canViewClinical = checkPermission('reports') !== 'none';

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.phone.includes(searchTerm) ||
    p.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Patient Database & Profiles</h2>
          <p className="text-gray-500 text-xs mt-0.5">
            Centralized health records, test history, diagnostic reports & WhatsApp communication log.
          </p>
        </div>

        <div className="relative max-w-md w-full">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by Patient ID, Name, or Mobile Phone..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>
      </div>

      {/* Main Grid: Patient Database Table & Detailed Profile Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Patient Table */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-bold text-gray-900 text-sm">Patient Directory ({filteredPatients.length})</h3>
            <span className="text-xs text-gray-400">Kolhapur Registry</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-500 font-semibold uppercase text-[10px] border-b border-gray-100">
                <tr>
                  <th className="p-3">Patient ID</th>
                  <th className="p-3">Name & Info</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Last Visit</th>
                  <th className="p-3">Tests</th>
                  <th className="p-3">Report Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                {filteredPatients.map(pat => (
                  <tr 
                    key={pat.id}
                    onClick={() => setSelectedPatient(pat)}
                    className={`cursor-pointer transition-colors ${
                      selectedPatient?.id === pat.id ? 'bg-emerald-50/80 font-semibold text-emerald-900' : 'hover:bg-gray-50'
                    }`}
                  >
                    <td className="p-3 font-mono font-bold text-emerald-700">{pat.id}</td>
                    <td className="p-3">
                      <div className="font-bold text-gray-900">{pat.name}</div>
                      <div className="text-[10px] text-gray-400 font-normal">{pat.age} yrs • {pat.gender}</div>
                    </td>
                    <td className="p-3 text-gray-600">{pat.phone}</td>
                    <td className="p-3 text-gray-500">{pat.lastVisit}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-800 font-semibold text-[10px]">
                        {pat.testsCount} tests
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        pat.reportStatus === 'Delivered' ? 'bg-emerald-100 text-emerald-800' :
                        pat.reportStatus === 'Ready' ? 'bg-emerald-100 text-emerald-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {pat.reportStatus}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button className="text-emerald-600 hover:underline text-[11px] font-semibold">
                        View Profile →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Deep-Dive Patient Profile Panel */}
        {selectedPatient && (
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-5">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-400 flex items-center justify-center text-white font-bold text-xl shadow-md">
                  {selectedPatient.name.charAt(0)}
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-emerald-600 uppercase tracking-wider">
                    {selectedPatient.id} • {selectedPatient.bloodGroup}
                  </span>
                  <h3 className="font-bold text-gray-900 text-base">{selectedPatient.name}</h3>
                  <p className="text-gray-500 text-xs">{selectedPatient.age} Yrs • {selectedPatient.gender} • Kolhapur</p>
                </div>
              </div>
            </div>

            {/* Basic Info Cards */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 space-y-1">
                <div className="text-gray-400 text-[10px] font-semibold">CONTACT PHONE</div>
                <div className="font-semibold text-gray-800 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{selectedPatient.phone}</span>
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 space-y-1">
                <div className="text-gray-400 text-[10px] font-semibold">EMAIL ADDRESS</div>
                <div className="font-semibold text-gray-800 truncate flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate">{selectedPatient.email || 'N/A'}</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 text-xs space-y-1">
              <div className="text-gray-400 text-[10px] font-semibold">RESIDENTIAL ADDRESS</div>
              <div className="font-semibold text-gray-800 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{selectedPatient.address}</span>
              </div>
            </div>

            {/* Test & Report History */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <h4 className="font-bold text-gray-900">Diagnostic Reports & Tests</h4>
                <button onClick={() => setActiveModule('reports')} className="text-emerald-600 hover:underline text-[11px] font-semibold">
                  Open Lab Worklist →
                </button>
              </div>

              <div className="p-3 bg-emerald-50/70 border border-emerald-100 rounded-xl text-xs space-y-2">
                <div className="flex items-center justify-between font-bold text-emerald-900">
                  <span>CBC + HbA1c & Fasting Glucose</span>
                  <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded text-[10px]">Verified</span>
                </div>
                <p className="text-gray-600 text-[11px]">Pathologist: Dr. Rajesh Mehta • Sample 21 Sep 08:35 AM</p>
                <div className="pt-2 border-t border-emerald-200/60 flex items-center justify-between">
                  <span className="text-[10px] text-gray-500">Report ID: DDC/2026/09/RX221</span>
                  <button onClick={() => setActiveModule('reports')} className="px-2 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[10px] font-semibold">
                    View PDF Report
                  </button>
                </div>
              </div>
            </div>

            {/* Billing Summary (Permission aware) */}
            <div className="space-y-2">
              <h4 className="font-bold text-gray-900 text-xs">Billing & Invoices</h4>
              {canViewBilling ? (
                <div className="p-3 bg-gray-900 text-white rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <div className="text-[10px] text-gray-400">Total Lifetime Billing</div>
                    <div className="text-base font-extrabold text-white">₹{selectedPatient.totalBilling.toLocaleString('en-IN')}</div>
                  </div>
                  <button onClick={() => setActiveModule('billing')} className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-white rounded-lg font-bold text-[11px]">
                    View Invoices
                  </button>
                </div>
              ) : (
                <div className="p-3 bg-gray-100 text-gray-500 rounded-xl text-xs flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-amber-600" />
                  <span>Billing data hidden for non-finance roles.</span>
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
