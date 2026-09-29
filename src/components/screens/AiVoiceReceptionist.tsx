import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AiCallRecord } from '../../types';
import { 
  PhoneCall, 
  PhoneIncoming, 
  PhoneForwarded, 
  PhoneMissed, 
  Clock, 
  Play, 
  Pause, 
  User, 
  Bot, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  FileText, 
  Send,
  Volume2
} from 'lucide-react';

export const AiVoiceReceptionist: React.FC = () => {
  const { aiCalls, isAiOnline, toggleAiStatus, showToast, addAuditLog, setActiveModule } = useApp();
  const [selectedCall, setSelectedCall] = useState<AiCallRecord>(aiCalls[0]);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const totalCalls = aiCalls.length;
  const aiHandled = aiCalls.filter(c => c.status === 'AI Handled').length;
  const transferred = aiCalls.filter(c => c.status === 'Transferred to Staff').length;
  const missed = aiCalls.filter(c => c.status === 'Missed').length;

  const handleAudioToggle = () => {
    const nextState = !isPlayingAudio;
    setIsPlayingAudio(nextState);
    if (nextState) {
      showToast(`Playing simulated voice recording for call with ${selectedCall.callerName}...`);
    }
  };

  const handleTransferToStaff = () => {
    showToast(`Call #${selectedCall.id} transferred to Senior Receptionist Rahul Sharma`);
    addAuditLog(`Transferred AI call #${selectedCall.id} to Receptionist`, 'AI Voice Receptionist', selectedCall.id);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner & Status Controls */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold shadow-inner">
            <PhoneCall className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900">AI Voice Receptionist Simulator</h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                Voice AI Engine v4.2
              </span>
            </div>
            <p className="text-slate-500 text-xs mt-0.5">
              Handles incoming voice calls in Marathi, Hindi & English for Disha Diagnostic Centre, Kolhapur.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleAiStatus}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border transition-all ${
              isAiOnline 
                ? 'bg-emerald-600 text-white border-emerald-700 shadow-md shadow-emerald-600/20'
                : 'bg-rose-600 text-white border-rose-700 shadow-md shadow-rose-600/20'
            }`}
          >
            <span className={`w-2.5 h-2.5 rounded-full ${isAiOnline ? 'bg-white animate-ping' : 'bg-white'}`} />
            <span>AI Receptionist Status: {isAiOnline ? 'ONLINE' : 'OFFLINE'}</span>
          </button>
        </div>
      </div>

      {/* 5 Call Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Total Calls Today</span>
            <PhoneIncoming className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900">{totalCalls}</div>
          <div className="mt-1 text-[10px] text-slate-400">Incoming calls</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>AI-Handled Calls</span>
            <Bot className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900">{aiHandled}</div>
          <div className="mt-1 text-[10px] text-emerald-600 font-medium">88% Resolution Rate</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Transferred to Staff</span>
            <PhoneForwarded className="w-4 h-4 text-amber-600" />
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900">{transferred}</div>
          <div className="mt-1 text-[10px] text-amber-600 font-medium">Transferred to Reception</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Missed Calls</span>
            <PhoneMissed className="w-4 h-4 text-rose-500" />
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900">{missed}</div>
          <div className="mt-1 text-[10px] text-rose-500 font-medium">Caller disconnected early</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Avg Call Duration</span>
            <Clock className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900">1m 52s</div>
          <div className="mt-1 text-[10px] text-slate-400">Efficient automated dialogue</div>
        </div>
      </div>

      {/* Main Grid: Call Table & Deep-Dive Call Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Recent Calls Table */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Recent Voice Calls</h3>
              <p className="text-slate-500 text-xs">Click any call to inspect conversation transcript & AI summary.</p>
            </div>
            <span className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full font-medium">
              Live Feed
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold uppercase text-[10px] border-b border-slate-100">
                <tr>
                  <th className="p-3">Patient Name</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Reason</th>
                  <th className="p-3">Duration</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {aiCalls.map(call => (
                  <tr 
                    key={call.id}
                    onClick={() => setSelectedCall(call)}
                    className={`cursor-pointer transition-colors ${
                      selectedCall.id === call.id ? 'bg-emerald-50/80 font-semibold text-emerald-900' : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="p-3 text-slate-900 font-bold">{call.callerName}</td>
                    <td className="p-3 text-slate-500">{call.phone}</td>
                    <td className="p-3">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                        {call.reason}
                      </span>
                    </td>
                    <td className="p-3 text-slate-600">{call.duration}</td>
                    <td className="p-3">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                        call.status === 'AI Handled' ? 'bg-emerald-100 text-emerald-800' :
                        call.status === 'Transferred to Staff' ? 'bg-amber-100 text-amber-800' :
                        'bg-rose-100 text-rose-800'
                      }`}>
                        {call.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button className="text-emerald-600 hover:text-emerald-800 font-semibold text-[11px]">
                        Inspect →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Call Detail & Transcript Panel */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-[10px] uppercase font-bold text-emerald-600 tracking-wider">
                Call Detail Panel #{selectedCall.id}
              </span>
              <h3 className="font-bold text-slate-900 text-base">{selectedCall.callerName}</h3>
              <p className="text-slate-500 text-xs">{selectedCall.phone} • {selectedCall.timestamp}</p>
            </div>

            <button
              onClick={handleTransferToStaff}
              className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1"
            >
              <PhoneForwarded className="w-3.5 h-3.5" />
              <span>Transfer Staff</span>
            </button>
          </div>

          {/* Audio Player Simulator */}
          <div className="bg-slate-900 text-white p-4 rounded-xl flex items-center justify-between gap-3 shadow-inner">
            <button
              onClick={handleAudioToggle}
              className="w-9 h-9 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center shrink-0 transition-all shadow-md"
            >
              {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>

            <div className="flex-1">
              <div className="flex items-center justify-between text-[10px] text-slate-300 mb-1">
                <span>Voice Recording Playback</span>
                <span>{selectedCall.duration}</span>
              </div>
              <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                <div className={`h-full bg-emerald-400 rounded-full ${isPlayingAudio ? 'w-2/3 transition-all duration-3000' : 'w-1/4'}`}></div>
              </div>
            </div>

            <Volume2 className="w-4 h-4 text-slate-400 shrink-0" />
          </div>

          {/* AI Summary Box */}
          <div className="p-3.5 bg-emerald-50 border border-emerald-100 rounded-xl space-y-1 text-xs">
            <div className="flex items-center gap-1.5 text-emerald-900 font-bold">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>AI Automated Summary & Action:</span>
            </div>
            <p className="text-slate-700 leading-relaxed">{selectedCall.aiSummary}</p>

            {selectedCall.appointmentCreated && (
              <div className="mt-2 pt-2 border-t border-emerald-200/60 flex items-center justify-between text-[11px]">
                <span className="text-emerald-800 font-semibold">Appointment Action Created:</span>
                <button 
                  onClick={() => setActiveModule('appointments')} 
                  className="px-2 py-0.5 rounded bg-emerald-600 text-white font-bold hover:underline"
                >
                  View #{selectedCall.appointmentCreated} →
                </button>
              </div>
            )}
          </div>

          {/* Full Conversation Transcript */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-400">
              Live Call Transcript
            </h4>

            <div className="max-h-64 overflow-y-auto space-y-2.5 pr-1 text-xs">
              {selectedCall.transcript.map((msg, idx) => (
                <div 
                  key={idx}
                  className={`p-3 rounded-xl max-w-[90%] text-xs leading-relaxed ${
                    msg.sender === 'AI' 
                      ? 'bg-slate-100 text-slate-800 border border-slate-200 ml-0 mr-auto'
                      : 'bg-emerald-600 text-white ml-auto mr-0 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] opacity-75 mb-1 font-semibold">
                    <span>{msg.sender === 'AI' ? '🤖 AI Receptionist' : `👤 Caller (${selectedCall.callerName})`}</span>
                    <span>{msg.time}</span>
                  </div>
                  <p>{msg.text}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
