import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { WhatsappAutomation } from '../../types';
import { 
  MessageSquare, 
  Send, 
  CheckCheck, 
  ToggleLeft, 
  ToggleRight, 
  Edit3, 
  Sparkles, 
  Phone, 
  BellRing, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Eye,
  Smartphone
} from 'lucide-react';

export const WhatsappAutomationDashboard: React.FC = () => {
  const { 
    whatsappAutomations, 
    toggleWhatsappAutomation, 
    updateWhatsappTemplate, 
    showToast, 
    addAuditLog, 
    checkPermission 
  } = useApp();

  const [editingAutomation, setEditingAutomation] = useState<WhatsappAutomation | null>(null);
  const [templateText, setTemplateText] = useState('');
  
  // Live test send state
  const [testPhone, setTestPhone] = useState('+91 98220 12345');
  const [testMessage, setTestMessage] = useState('Namaskar Rohan Joshi! Your diagnostic report for CBC + HbA1c at Disha Diagnostic Centre, Kolhapur is READY. View PDF: https://disha-kolhapur.in/r/RX221');

  const canConfigure = checkPermission('whatsapp') !== 'view';

  const handleEditOpen = (auto: WhatsappAutomation) => {
    setEditingAutomation(auto);
    setTemplateText(auto.template);
  };

  const handleTemplateSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAutomation) return;
    updateWhatsappTemplate(editingAutomation.id, templateText);
    setEditingAutomation(null);
  };

  const handleTestSend = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(`📲 Test WhatsApp message sent to ${testPhone} successfully!`);
    addAuditLog(`Sent test WhatsApp message to ${testPhone}`, 'WhatsApp Automation', 'WA-TEST');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-cyan-900 to-gray-900 text-white p-6 rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-2 border border-emerald-500/30">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Official WhatsApp Business API • Meta Certified</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight">WhatsApp Appointment & Report Automation</h2>
          <p className="text-emerald-100 text-xs mt-0.5">
            Automate vouchers, 24h/2h reminders, PDF report links & post-visit feedback for Kolhapur patients.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 rounded-xl bg-emerald-500/30 text-emerald-200 border border-emerald-400/30 text-xs font-bold flex items-center gap-1.5">
            <CheckCheck className="w-4 h-4 text-emerald-400" />
            <span>Delivery Rate: 99.2%</span>
          </span>
        </div>
      </div>

      {/* Top 5 Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 text-xs">
            <span>Messages Today</span>
            <Send className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 text-2xl font-bold text-gray-900">194</div>
          <div className="mt-1 text-[10px] text-emerald-600 font-medium">+18% vs average</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 text-xs">
            <span>Delivery Rate</span>
            <CheckCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 text-2xl font-bold text-gray-900">99.2%</div>
          <div className="mt-1 text-[10px] text-gray-400">Meta API Live Status</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 text-xs">
            <span>Appointment Reminders</span>
            <BellRing className="w-4 h-4 text-amber-600" />
          </div>
          <div className="mt-2 text-2xl font-bold text-gray-900">67</div>
          <div className="mt-1 text-[10px] text-amber-600 font-medium">24h & 2h reminders</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 text-xs">
            <span>Report Notifications</span>
            <FileText className="w-4 h-4 text-purple-600" />
          </div>
          <div className="mt-2 text-2xl font-bold text-gray-900">54</div>
          <div className="mt-1 text-[10px] text-purple-600 font-medium">Secure PDF link</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 text-xs">
            <span>Follow-up Messages</span>
            <MessageSquare className="w-4 h-4 text-cyan-600" />
          </div>
          <div className="mt-2 text-2xl font-bold text-gray-900">21</div>
          <div className="mt-1 text-[10px] text-cyan-600 font-medium">Post-visit feedback</div>
        </div>
      </div>

      {/* Main Grid: 5 Automation Cards + Live Test Sandbox */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Automation Cards */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-900 text-sm">Automated WhatsApp Workflows</h3>
            <span className="text-xs text-gray-500">5 Rules Configured</span>
          </div>

          <div className="space-y-4">
            {whatsappAutomations.map(auto => (
              <div 
                key={auto.id}
                className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs hover:border-emerald-300 transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${auto.active ? 'bg-emerald-500 animate-ping' : 'bg-gray-300'}`} />
                    <h4 className="font-bold text-gray-900 text-sm">{auto.title}</h4>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-gray-500 font-medium">
                      {auto.messagesSentToday} sent today
                    </span>

                    {canConfigure && (
                      <button
                        onClick={() => toggleWhatsappAutomation(auto.id)}
                        className={`text-2xl transition-all ${auto.active ? 'text-emerald-600' : 'text-gray-300'}`}
                        title="Toggle Active State"
                      >
                        {auto.active ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8" />}
                      </button>
                    )}
                  </div>
                </div>

                <div className="text-xs text-gray-500">
                  <strong>Trigger:</strong> {auto.triggerEvent}
                </div>

                {/* Template Message Box */}
                <div className="p-3.5 bg-emerald-50/70 border border-emerald-100 rounded-xl font-mono text-[11px] text-gray-800 whitespace-pre-line leading-relaxed">
                  {auto.template}
                </div>

                <div className="flex items-center justify-between pt-1 text-xs">
                  <span className={`font-semibold ${auto.active ? 'text-emerald-700' : 'text-gray-400'}`}>
                    Status: {auto.active ? 'ACTIVE AUTOMATION' : 'PAUSED'}
                  </span>

                  {canConfigure && (
                    <button
                      onClick={() => handleEditOpen(auto)}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-semibold flex items-center gap-1.5 transition-all"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-gray-600" />
                      <span>Edit Template</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Test WhatsApp Sandbox */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
          <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-emerald-600" />
              <h3 className="font-bold text-gray-900 text-sm">Send Instant WhatsApp Message</h3>
            </div>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
              Meta API Sandbox
            </span>
          </div>

          <form onSubmit={handleTestSend} className="space-y-3 text-xs">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Recipient Mobile Phone (+91)</label>
              <input
                type="text"
                required
                value={testPhone}
                onChange={e => setTestPhone(e.target.value)}
                placeholder="+91 98220 12345"
                className="w-full p-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">WhatsApp Message Body</label>
              <textarea
                rows={5}
                required
                value={testMessage}
                onChange={e => setTestMessage(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-xl font-mono text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
              ></textarea>
            </div>

            {/* Simulated Phone Screen Preview */}
            <div className="p-4 bg-emerald-950 rounded-2xl text-white space-y-2">
              <div className="flex items-center justify-between text-[10px] text-emerald-400 font-bold">
                <span>📱 WhatsApp Preview</span>
                <span>Disha Diagnostic Verified ✓</span>
              </div>
              <div className="p-3 bg-cyan-900/90 rounded-xl text-[11px] leading-relaxed text-emerald-50 font-sans border border-cyan-700">
                {testMessage}
                <div className="mt-1 text-[9px] text-emerald-300 text-right">11:42 AM ✓✓</div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Send WhatsApp Test Message</span>
            </button>
          </form>
        </div>

      </div>

      {/* Edit Automation Template Modal */}
      {editingAutomation && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-200">
            <h3 className="font-bold text-gray-900 text-base mb-1">Edit Template: {editingAutomation.title}</h3>
            <p className="text-gray-500 text-xs mb-4">Use variables like {'{{patient_name}}'}, {'{{date}}'}, {'{{time}}'}, {'{{secure_portal_link}}'}.</p>

            <form onSubmit={handleTemplateSave} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Message Template Content</label>
                <textarea
                  rows={8}
                  value={templateText}
                  onChange={e => setTemplateText(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl font-mono text-xs focus:ring-2 focus:ring-emerald-500 outline-none leading-relaxed"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingAutomation(null)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl shadow-md"
                >
                  Save Template
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
