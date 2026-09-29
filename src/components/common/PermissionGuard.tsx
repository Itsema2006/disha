import React from 'react';
import { useApp } from '../../context/AppContext';
import { ModuleKey } from '../../types';
import { ShieldAlert, Lock, ArrowLeft, RefreshCw, KeyRound } from 'lucide-react';

interface PermissionGuardProps {
  module: ModuleKey;
  children: React.ReactNode;
}

export const PermissionGuard: React.FC<PermissionGuardProps> = ({ module, children }) => {
  const { checkPermission, currentRole, loginAsRole, setActiveModule, currentUser } = useApp();

  const permission = checkPermission(module);

  if (permission === 'none') {
    return (
      <div className="p-8 max-w-4xl mx-auto my-12 bg-white rounded-2xl border border-gray-200 shadow-xl text-center animate-fadeIn">
        <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 mx-auto mb-4 shadow-inner">
          <Lock className="w-8 h-8" />
        </div>
        
        <div className="inline-block px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-semibold mb-3">
          HTTP 403 Forbidden • Access Restricted
        </div>

        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          You don't have permission to access this section
        </h2>

        <p className="text-gray-600 text-sm max-w-lg mx-auto mt-2 leading-relaxed">
          The current logged-in role <strong className="text-gray-900 font-semibold">{currentUser.roleTitle} ({currentRole})</strong> is restricted from accessing the <strong className="capitalize text-gray-900 font-semibold">{module.replace('_', ' ')}</strong> module based on Disha Diagnostic Centre security policy.
        </p>

        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-600 max-w-md mx-auto text-left space-y-2">
          <div className="flex items-center gap-2 text-gray-800 font-semibold">
            <KeyRound className="w-4 h-4 text-emerald-600" />
            <span>Authorized Roles for this module:</span>
          </div>
          <p className="text-gray-500">
            Owner/Admin, Operations Manager or relevant departmental staff. Contact your administrator if access is required.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setActiveModule('dashboard')}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-xs font-medium flex items-center gap-2 shadow-sm transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Dashboard</span>
          </button>
          
          <button
            onClick={() => loginAsRole('owner')}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-medium flex items-center gap-2 shadow-sm transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Switch to Owner Role (Full Access)</span>
          </button>
          
          <button
            onClick={() => setActiveModule('role_matrix')}
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-medium flex items-center gap-2 shadow-sm transition-all"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Inspect RBAC Flow Matrix</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {permission === 'view' && (
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between text-xs text-amber-800 animate-fadeIn">
          <div className="flex items-center gap-2 font-medium">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Read-Only Access:</strong> You are viewing this module under <span className="underline">{currentUser.roleTitle}</span> permissions. Action/editing controls are disabled.
            </span>
          </div>
          <button 
            onClick={() => loginAsRole('owner')}
            className="text-amber-900 hover:underline text-[11px] font-bold"
          >
            Switch to Admin →
          </button>
        </div>
      )}
      {children}
    </div>
  );
};
