import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FileCheck2, Search, Filter, ShieldCheck, CheckCircle2, AlertTriangle } from 'lucide-react';

export const AuditLogsScreen: React.FC = () => {
  const { auditLogs } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [moduleFilter, setModuleFilter] = useState('all');

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.staffName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.recordId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesModule = moduleFilter === 'all' || log.module === moduleFilter;
    return matchesSearch && matchesModule;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-sky-600" />
            <h2 className="text-xl font-bold text-slate-900">System Compliance Audit Logs</h2>
          </div>
          <p className="text-slate-500 text-xs mt-0.5">
            Immutable system audit trail tracking all clinical approvals, appointment updates, and RBAC actions.
          </p>
        </div>

        <span className="px-3 py-1.5 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-xl text-xs font-semibold flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Real-Time Audit Logging Active</span>
        </span>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="relative max-w-md w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search action, staff member, or record ID..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-500 font-semibold">Filter Module:</span>
          <select
            value={moduleFilter}
            onChange={e => setModuleFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs outline-none"
          >
            <option value="all">All Modules</option>
            <option value="Diagnostic Reports">Diagnostic Reports</option>
            <option value="Appointments">Appointments</option>
            <option value="AI Voice Receptionist">AI Voice Receptionist</option>
            <option value="WhatsApp Automation">WhatsApp Automation</option>
            <option value="Authentication">Authentication</option>
          </select>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900 text-white font-bold uppercase text-[10px]">
              <tr>
                <th className="p-3">Timestamp</th>
                <th className="p-3">Staff Member</th>
                <th className="p-3">Role Title</th>
                <th className="p-3">Action Description</th>
                <th className="p-3">Target Module</th>
                <th className="p-3">Record ID</th>
                <th className="p-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredLogs.map(log => (
                <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 text-slate-500 font-mono text-[11px]">{log.timestamp}</td>
                  <td className="p-3 font-bold text-slate-900">{log.staffName}</td>
                  <td className="p-3 text-slate-600">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 text-[10px] font-semibold">
                      {log.role}
                    </span>
                  </td>
                  <td className="p-3 font-semibold text-slate-900">{log.action}</td>
                  <td className="p-3 text-sky-700">{log.module}</td>
                  <td className="p-3 font-mono font-bold text-slate-600">{log.recordId}</td>
                  <td className="p-3 text-right">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      log.status === 'Success' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
