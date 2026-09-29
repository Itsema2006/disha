import React from 'react';
import { useApp } from '../../context/AppContext';
import { ModuleKey } from '../../types';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  PhoneCall, 
  MessageSquare, 
  FileText, 
  CreditCard, 
  BarChart3, 
  UserCheck, 
  ShieldCheck, 
  Settings, 
  FileCheck2, 
  GitMerge, 
  Grid3X3, 
  Compass, 
  Lock,
  ChevronRight
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { activeModule, setActiveModule, currentRole, checkPermission } = useApp();

  interface NavItem {
    key: ModuleKey;
    label: string;
    icon: React.ElementType;
    badge?: string;
  }

  const allNavItems: NavItem[] = [
    { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { key: 'appointments', label: 'Appointments', icon: Calendar, badge: 'Today' },
    { key: 'patients', label: 'Patient Database', icon: Users },
    { key: 'ai_receptionist', label: 'AI Voice Receptionist', icon: PhoneCall, badge: 'Live AI' },
    { key: 'whatsapp', label: 'WhatsApp Automation', icon: MessageSquare },
    { key: 'reports', label: 'Diagnostic Reports', icon: FileText, badge: 'Verification' },
    { key: 'billing', label: 'Billing & Invoices', icon: CreditCard },
    { key: 'analytics', label: 'Business Analytics', icon: BarChart3 },
    { key: 'staff', label: 'Staff & Permissions', icon: UserCheck },
    { key: 'audit_logs', label: 'System Audit Logs', icon: FileCheck2 },
    { key: 'system_flow', label: 'End-to-End Workflow', icon: GitMerge },
    { key: 'role_matrix', label: 'Role Flow Matrix', icon: Grid3X3, badge: 'RBAC' },
    { key: 'user_journeys', label: 'Guided Journeys', icon: Compass, badge: '7 Roles' },
    { key: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-gray-300 min-h-[calc(100vh-4rem)] flex flex-col border-r border-gray-800 shrink-0 select-none">
      <div className="p-4 border-b border-gray-800/80">
        <div className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
          Logged-In Staff Role
        </div>
        <div className="mt-1 font-semibold text-white text-sm flex items-center justify-between">
          <span className="capitalize">{currentRole.replace('_', ' ')}</span>
          <span className="text-[10px] bg-gray-800 text-gray-400 px-2 py-0.5 rounded border border-gray-700">
            RBAC Active
          </span>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {allNavItems.map(item => {
          const perm = checkPermission(item.key);
          const isDenied = perm === 'none';
          const isReadOnly = perm === 'view' || perm === 'action';
          const isActive = activeModule === item.key;

          const ItemIcon = item.icon;

          return (
            <button
              key={item.key}
              onClick={() => setActiveModule(item.key)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all group ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20 font-semibold'
                  : isDenied
                  ? 'text-gray-500 hover:bg-gray-800/50 hover:text-gray-400 opacity-60'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <ItemIcon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : isDenied ? 'text-gray-600' : 'text-gray-400 group-hover:text-emerald-400'}`} />
                <span className="truncate">{item.label}</span>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                {isDenied && <span title="Permission Denied for current role"><Lock className="w-3 h-3 text-rose-400/70" /></span>}
                {item.badge && !isDenied && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-gray-800 text-emerald-400 border border-gray-700'
                  }`}>
                    {item.badge}
                  </span>
                )}
                <ChevronRight className={`w-3 h-3 ${isActive ? 'text-white' : 'text-gray-600 group-hover:text-gray-400'}`} />
              </div>
            </button>
          );
        })}
      </nav>

      {/* Sidebar Footer info */}
      <div className="p-3 m-3 bg-gray-800/60 rounded-xl border border-gray-700/60 text-center text-[11px] text-gray-400">
        <p className="font-semibold text-gray-200">Disha Diagnostic Centre</p>
        <p className="text-[10px] text-gray-400 mt-0.5">Kolhapur SaaS Healthcare v2.4</p>
        <div className="mt-2 pt-2 border-t border-gray-700/50 text-[10px] text-emerald-400 font-mono">
          🟢 Production Demo
        </div>
      </div>
    </aside>
  );
};
