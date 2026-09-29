import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StaffUser } from '../../types';
import { UserCheck, ShieldCheck, Plus, Edit3, Lock, CheckCircle2, Search, Trash2 } from 'lucide-react';

export const PermissionManagement: React.FC = () => {
  const { staffUsers, showToast, addAuditLog, currentRole } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStaff = staffUsers.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.roleTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-emerald-600" />
            <h2 className="text-xl font-bold text-gray-900">Staff & Permission Management</h2>
          </div>
          <p className="text-gray-500 text-xs mt-0.5">
            Admin-only staff directory, role assignments, department scoping & security permission toggles.
          </p>
        </div>

        <button 
          onClick={() => showToast('Opened Add Staff Member Modal')}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-600/20"
        >
          <Plus className="w-4 h-4" />
          <span>Add Staff Member</span>
        </button>
      </div>

      {/* Staff Directory Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-bold text-gray-900 text-sm">Disha Diagnostic Staff Roster ({staffUsers.length})</h3>
          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter staff member or role..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 font-semibold uppercase text-[10px] border-b border-gray-100">
              <tr>
                <th className="p-3">Staff Name</th>
                <th className="p-3">Role Title</th>
                <th className="p-3">Department</th>
                <th className="p-3">Status</th>
                <th className="p-3">Last Active</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
              {filteredStaff.map(staff => (
                <tr key={staff.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-3 flex items-center gap-3">
                    <img src={staff.avatar} alt={staff.name} className="w-8 h-8 rounded-full object-cover border border-emerald-200" />
                    <div>
                      <div className="font-bold text-gray-900">{staff.name}</div>
                      <div className="text-[10px] text-gray-400 font-normal">{staff.email}</div>
                    </div>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold text-[10px]">
                      {staff.roleTitle}
                    </span>
                  </td>
                  <td className="p-3 text-gray-600">{staff.department}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                      {staff.status}
                    </span>
                  </td>
                  <td className="p-3 text-gray-500">{staff.lastActive}</td>
                  <td className="p-3 text-right space-x-2">
                    <button 
                      onClick={() => showToast(`Editing permissions for ${staff.name}`)}
                      className="text-emerald-600 hover:underline font-semibold"
                    >
                      Edit Role
                    </button>
                    <button 
                      onClick={() => showToast(`Manage security tokens for ${staff.name}`)}
                      className="text-gray-500 hover:text-gray-800 font-semibold"
                    >
                      Permissions
                    </button>
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
