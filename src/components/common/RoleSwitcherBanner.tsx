import React from 'react';
import { useApp } from '../../context/AppContext';
import { Role } from '../../types';
import { ShieldCheck, UserCheck, Play, ArrowRight, X, AlertTriangle, Eye, CheckCircle } from 'lucide-react';

export const RoleSwitcherBanner: React.FC = () => {
  const { 
    currentRole, 
    loginAsRole, 
    activeJourney, 
    currentJourneyStepIndex, 
    nextJourneyStep, 
    prevJourneyStep, 
    endJourney,
    startJourney 
  } = useApp();

  const rolesList: { role: Role; label: string; icon: string }[] = [
    { role: 'owner', label: '👑 Owner / Admin', icon: '👑' },
    { role: 'ops_manager', label: '⚙️ Ops Manager', icon: '⚙️' },
    { role: 'receptionist', label: '📋 Receptionist', icon: '📋' },
    { role: 'lab_tech', label: '🧪 Lab Tech', icon: '🧪' },
    { role: 'pathologist', label: '🩺 Pathologist', icon: '🩺' },
    { role: 'accounts', label: '💳 Accounts', icon: '💳' },
    { role: 'patient', label: '📱 Patient Portal', icon: '📱' },
  ];

  return (
    <div className="bg-gray-900 text-gray-100 shadow-md border-b border-gray-800 text-xs px-4 py-2 flex flex-col md:flex-row items-center justify-between gap-3 select-none">
      <div className="flex items-center gap-2">
        <span className="bg-emerald-500/20 text-emerald-400 font-semibold px-2 py-0.5 rounded flex items-center gap-1 border border-emerald-500/30">
          <ShieldCheck className="w-3.5 h-3.5" />
          Interactive Role Tester
        </span>
        <span className="hidden sm:inline text-gray-400">Switch role to test dynamic navigation & permissions:</span>
      </div>

      <div className="flex items-center gap-1.5 flex-wrap">
        {rolesList.map(r => (
          <button
            key={r.role}
            onClick={() => loginAsRole(r.role)}
            className={`px-2.5 py-1 rounded-md transition-all font-medium flex items-center gap-1 ${
              currentRole === r.role
                ? 'bg-emerald-600 text-white shadow-sm ring-1 ring-emerald-300 font-semibold scale-105'
                : 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white border border-gray-700'
            }`}
          >
            <span>{r.icon}</span>
            <span>{r.label.split(' ')[1]}</span>
          </button>
        ))}
      </div>

      {activeJourney ? (
        <div className="bg-amber-950/80 border border-amber-500/40 rounded-lg px-3 py-1 flex items-center gap-2 animate-pulse-subtle">
          <span className="text-amber-400 font-medium">
            Step {activeJourney.steps[currentJourneyStepIndex].stepNumber}/{activeJourney.steps.length}: {activeJourney.steps[currentJourneyStepIndex].title}
          </span>
          <div className="flex items-center gap-1 ml-2">
            <button 
              onClick={prevJourneyStep}
              disabled={currentJourneyStepIndex === 0}
              className="px-1.5 py-0.5 bg-amber-800 hover:bg-amber-700 text-white rounded text-[10px] disabled:opacity-50"
            >
              Back
            </button>
            <button 
              onClick={nextJourneyStep}
              className="px-2 py-0.5 bg-amber-500 hover:bg-amber-400 text-gray-950 font-bold rounded text-[10px] flex items-center gap-1"
            >
              <span>{currentJourneyStepIndex === activeJourney.steps.length - 1 ? 'Finish' : 'Next'}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
            <button 
              onClick={endJourney}
              className="p-0.5 hover:bg-amber-900 text-amber-300 rounded ml-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => startJourney(currentRole)}
          className="bg-cyan-600 hover:bg-cyan-500 text-white font-medium px-2.5 py-1 rounded-md flex items-center gap-1 shadow-sm transition-all"
        >
          <Play className="w-3 h-3 fill-white" />
          <span>Walkthrough Guided Journey</span>
        </button>
      )}
    </div>
  );
};
