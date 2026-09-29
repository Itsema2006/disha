import React from 'react';
import { useApp } from '../../context/AppContext';
import { ModuleKey } from '../../types';
import { GitMerge, ArrowRight, User, PhoneCall, Calendar, FlaskConical, Stethoscope, MessageSquare, CreditCard, BarChart3, ShieldCheck, Download } from 'lucide-react';

export const SystemFlowDiagram: React.FC = () => {
  const { setActiveModule, showToast } = useApp();

  interface FlowStep {
    id: string;
    title: string;
    sub: string;
    icon: React.ElementType;
    module: ModuleKey;
    color: string;
  }

  const mainJourney: FlowStep[] = [
    { id: '1', title: 'PATIENT', sub: 'Phone Call / Portal', icon: User, module: 'patient_portal' as any, color: 'bg-emerald-600 text-white' },
    { id: '2', title: 'AI VOICE / WHATSAPP', sub: '24/7 Automated Intake', icon: PhoneCall, module: 'ai_receptionist', color: 'bg-emerald-600 text-white' },
    { id: '3', title: 'RECEPTIONIST', sub: 'Patient Reg & Confirmation', icon: Calendar, module: 'appointments', color: 'bg-cyan-600 text-white' },
    { id: '4', title: 'LAB TECHNICIAN', sub: 'Sample & Results Entry', icon: FlaskConical, module: 'reports', color: 'bg-indigo-600 text-white' },
    { id: '5', title: 'PATHOLOGIST', sub: 'Clinical Verification', icon: Stethoscope, module: 'reports', color: 'bg-purple-600 text-white' },
    { id: '6', title: 'WHATSAPP AUTOMATION', sub: 'PDF Report Delivery', icon: MessageSquare, module: 'whatsapp', color: 'bg-emerald-700 text-white' },
    { id: '7', title: 'PATIENT PORTAL', sub: 'Secure Download', icon: Download, module: 'reports', color: 'bg-emerald-700 text-white' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <GitMerge className="w-5 h-5 text-emerald-600" />
            <h2 className="text-xl font-bold text-slate-900">End-to-End Healthcare System Workflow Diagram</h2>
          </div>
          <p className="text-slate-500 text-xs mt-0.5">
            Complete architectural mapping from patient intake to clinical verification, billing, and executive dashboard analytics.
          </p>
        </div>

        <span className="px-3 py-1.5 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-xl text-xs font-semibold">
          💡 Click any node to open that module
        </span>
      </div>

      {/* Main Patient Journey Pipeline Visual */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider text-slate-500">
          1. Main Patient Clinical Journey Flow
        </h3>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-3 overflow-x-auto py-4">
          {mainJourney.map((step, idx) => {
            const StepIcon = step.icon;
            return (
              <React.Fragment key={step.id}>
                <div 
                  onClick={() => {
                    setActiveModule(step.module === ('patient_portal' as any) ? 'dashboard' : step.module);
                    showToast(`Navigated to ${step.title}`);
                  }}
                  className={`p-4 rounded-2xl shadow-md border cursor-pointer hover:scale-105 transition-all text-center min-w-[140px] flex-1 ${step.color}`}
                >
                  <StepIcon className="w-6 h-6 mx-auto mb-2 opacity-90" />
                  <div className="font-extrabold text-xs tracking-tight">{step.title}</div>
                  <div className="text-[10px] opacity-80 mt-0.5">{step.sub}</div>
                </div>

                {idx < mainJourney.length - 1 && (
                  <ArrowRight className="w-5 h-5 text-slate-400 shrink-0 hidden lg:block" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Parallel Operational & Billing Pipelines */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Financial Flow */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-emerald-600" />
            <span>2. Financial & Accounts Workflow</span>
          </h3>

          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2 text-xs text-emerald-950">
            <div className="flex items-center justify-between font-bold">
              <span>PATIENT PAYMENT</span>
              <ArrowRight className="w-4 h-4 text-emerald-600" />
              <span>ACCOUNTS</span>
              <ArrowRight className="w-4 h-4 text-emerald-600" />
              <span>INVOICE / RECEIPT</span>
            </div>
            <p className="text-[11px] text-emerald-800">
              UPI, QR & Cash collections logged instantly into Accounts ledger with GST compliance.
            </p>
          </div>
        </div>

        {/* Executive Analytics Flow */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-emerald-600" />
            <span>3. Executive Analytics & Governance</span>
          </h3>

          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2 text-xs text-emerald-950">
            <div className="flex items-center justify-between font-bold">
              <span>ALL OPERATIONAL DATA</span>
              <ArrowRight className="w-4 h-4 text-emerald-600" />
              <span>OPS MANAGER</span>
              <ArrowRight className="w-4 h-4 text-emerald-600" />
              <span>EXECUTIVE DASHBOARD</span>
            </div>
            <p className="text-[11px] text-emerald-800">
              Real-time aggregation of AI calls, turnaround time, report statuses & revenue KPIs for Owner/Admin.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
