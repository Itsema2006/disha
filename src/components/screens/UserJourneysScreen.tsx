import React from 'react';
import { useApp } from '../../context/AppContext';
import { USER_JOURNEYS } from '../../data/mockData';
import { Role } from '../../types';
import { Compass, Play, ArrowRight, CheckCircle2, ShieldCheck, UserCheck } from 'lucide-react';

export const UserJourneysScreen: React.FC = () => {
  const { startJourney, activeJourney, currentJourneyStepIndex, currentRole } = useApp();

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-sky-600" />
            <h2 className="text-xl font-bold text-slate-900">Role-to-Screen Guided User Journeys</h2>
          </div>
          <p className="text-slate-500 text-xs mt-0.5">
            Step-by-step interactive walkthrough runners for all 7 staff & patient roles outlined in spec.
          </p>
        </div>

        <span className="px-3 py-1.5 bg-amber-50 text-amber-900 border border-amber-200 rounded-xl text-xs font-semibold">
          ✨ Select any role journey below to start interactive walkthrough
        </span>
      </div>

      {/* 7 Role Journey Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {USER_JOURNEYS.map(j => {
          const isCurrentActive = activeJourney?.role === j.role;

          return (
            <div 
              key={j.role}
              className={`bg-white p-6 rounded-2xl border shadow-xs transition-all flex flex-col justify-between space-y-4 ${
                isCurrentActive ? 'border-amber-400 ring-2 ring-amber-300 shadow-md' : 'border-slate-200 hover:border-sky-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-sky-100 text-sky-800 border border-sky-200">
                    {j.role.replace('_', ' ')}
                  </span>
                  {isCurrentActive && (
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full animate-pulse">
                      Active Walkthrough
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-slate-900 text-base mt-2">{j.title}</h3>
                <p className="text-slate-500 text-xs mt-1">{j.steps.length} sequential workflow steps.</p>

                {/* Steps List */}
                <div className="mt-4 space-y-2 border-t border-slate-100 pt-3">
                  {j.steps.map((s, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs">
                      <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                        {s.stepNumber}
                      </span>
                      <div>
                        <div className="font-semibold text-slate-800">{s.title}</div>
                        <div className="text-[11px] text-slate-500">{s.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Start Walkthrough Button */}
              <button
                onClick={() => startJourney(j.role)}
                className="w-full py-2.5 bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-500 hover:to-teal-500 text-white font-bold rounded-xl text-xs shadow-md shadow-sky-600/20 flex items-center justify-center gap-2 transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Launch {j.title.split(' ')[0]} Journey</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
