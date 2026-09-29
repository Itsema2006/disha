import React from 'react';
import { useApp } from '../../context/AppContext';
import { ROLE_MATRIX_DATA } from '../../data/mockData';
import { Role, ModuleKey, PermissionLevel } from '../../types';
import { ShieldCheck, Grid3X3, CheckCircle2, Eye, Zap, Lock, ArrowRight, Sparkles } from 'lucide-react';

export const RoleMatrixScreen: React.FC = () => {
  const { loginAsRole, currentRole, setActiveModule, showToast } = useApp();

  const moduleHeaders: { key: ModuleKey; label: string }[] = [
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'appointments', label: 'Appointments' },
    { key: 'patients', label: 'Patients' },
    { key: 'ai_receptionist', label: 'AI Reception' },
    { key: 'whatsapp', label: 'WhatsApp' },
    { key: 'samples_tests', label: 'Samples/Tests' },
    { key: 'reports', label: 'Reports' },
    { key: 'billing', label: 'Billing' },
    { key: 'analytics', label: 'Analytics' },
    { key: 'staff', label: 'Staff' },
    { key: 'settings', label: 'Settings' },
  ];

  const renderBadge = (perm: PermissionLevel) => {
    switch (perm) {
      case 'full':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px] border border-emerald-200">
            🟢 Full
          </span>
        );
      case 'view':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px] border border-emerald-200">
            🔵 View
          </span>
        );
      case 'action':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-amber-100 text-amber-800 font-bold text-[10px] border border-amber-200">
            🟡 Action
          </span>
        );
      case 'none':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-rose-50 text-rose-700 font-bold text-[10px] border border-rose-200">
            🔴 No Access
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Grid3X3 className="w-5 h-5 text-emerald-600" />
            <h2 className="text-xl font-bold text-gray-900">Interactive Role-to-Screen Flow Matrix</h2>
          </div>
          <p className="text-gray-500 text-xs mt-0.5">
            Role-Based Access Control (RBAC) security matrix mapping 6 clinic roles across 11 platform modules.
          </p>
        </div>

        <div className="px-3 py-1.5 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-xl text-xs font-semibold">
          💡 Click any Role row to test that role instantly
        </div>
      </div>

      {/* Permission Legend */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs flex flex-wrap items-center justify-between gap-4 text-xs">
        <span className="font-bold text-gray-800 uppercase tracking-wider text-[10px]">Permission Legend:</span>
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="text-sm">🟢</span>
            <span className="font-semibold text-gray-800">Full Access</span>
            <span className="text-gray-400 text-[11px]">(Create, Read, Update, Delete, Approve)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-sm">🔵</span>
            <span className="font-semibold text-gray-800">View / Limited</span>
            <span className="text-gray-400 text-[11px]">(Read-only inspection)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-sm">🟡</span>
            <span className="font-semibold text-gray-800">Action-Specific</span>
            <span className="text-gray-400 text-[11px]">(Task-scoped workflows)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-sm">🔴</span>
            <span className="font-semibold text-gray-800">No Access</span>
            <span className="text-gray-400 text-[11px]">(HTTP 403 Forbidden screen)</span>
          </div>
        </div>
      </div>

      {/* Interactive Matrix Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-gray-900 text-white font-bold uppercase text-[10px]">
              <tr>
                <th className="p-3.5 sticky left-0 bg-gray-900 z-10">Staff Role</th>
                {moduleHeaders.map(m => (
                  <th 
                    key={m.key} 
                    onClick={() => setActiveModule(m.key)}
                    className="p-3 text-center cursor-pointer hover:bg-gray-800 transition-colors"
                    title={`Click to open ${m.label}`}
                  >
                    {m.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 font-medium">
              {ROLE_MATRIX_DATA.map(row => (
                <tr 
                  key={row.role}
                  className={`transition-colors ${
                    currentRole === row.role ? 'bg-emerald-50/90 font-bold border-l-4 border-l-emerald-600' : 'hover:bg-gray-50'
                  }`}
                >
                  {/* Role Name */}
                  <td className="p-3.5 sticky left-0 bg-white shadow-xs z-10 font-bold text-gray-900">
                    <button
                      onClick={() => {
                        loginAsRole(row.role);
                        showToast(`Switched active role to ${row.roleTitle}`);
                      }}
                      className="text-left hover:text-emerald-600 flex items-center gap-1.5 group"
                    >
                      <span>{row.roleTitle}</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-600" />
                    </button>
                    <div className="text-[10px] text-gray-400 font-normal">Click row to test</div>
                  </td>

                  {/* Modules Permissions */}
                  {moduleHeaders.map(m => {
                    const perm = row.permissions[m.key];
                    return (
                      <td 
                        key={m.key} 
                        onClick={() => {
                          loginAsRole(row.role);
                          setActiveModule(m.key);
                        }}
                        className="p-3 text-center cursor-pointer hover:bg-gray-100 transition-colors"
                      >
                        {renderBadge(perm)}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
