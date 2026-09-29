import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DiagnosticReport, ReportStatus } from '../../types';
import { 
  FileText, 
  Search, 
  CheckCircle2, 
  Clock, 
  Send, 
  Download, 
  Eye, 
  ShieldCheck, 
  Edit3, 
  Printer, 
  X, 
  Sparkles, 
  FileCheck2,
  FileSpreadsheet
} from 'lucide-react';

export const DiagnosticReports: React.FC = () => {
  const { 
    reports, 
    updateReportStatus, 
    sendReportWhatsApp, 
    showToast, 
    addAuditLog, 
    currentRole, 
    checkPermission 
  } = useApp();

  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [previewReport, setPreviewReport] = useState<DiagnosticReport | null>(null);
  const [pathologistRemarksInput, setPathologistRemarksInput] = useState('');

  const canLabSubmit = currentRole === 'lab_tech' || currentRole === 'owner';
  const canPathologistApprove = currentRole === 'pathologist' || currentRole === 'owner';

  const pendingCount = reports.filter(r => r.status === 'Draft' || r.status === 'Under Review').length;
  const readyCount = reports.filter(r => r.status === 'Verified').length;
  const deliveredCount = reports.filter(r => r.status === 'Delivered').length;

  const filteredReports = reports.filter(rep => {
    const matchesSearch = rep.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          rep.reportNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          rep.testName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || rep.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const handleApproveReport = (reportId: string) => {
    updateReportStatus(reportId, 'Verified', pathologistRemarksInput || 'Approved & Verified by Pathologist');
    setPreviewReport(null);
    showToast(`Approved Report #${reportId}`);
  };

  const handleDownloadPDF = (rep: DiagnosticReport) => {
    showToast(`Downloading official PDF for Report ${rep.reportNumber}...`);
    addAuditLog(`Downloaded PDF report`, 'Diagnostic Reports', rep.id);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-gray-900">Diagnostic Reports Lifecycle Pipeline</h2>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              NABL Verified
            </span>
          </div>
          <p className="text-gray-500 text-xs mt-0.5">
            Four-stage clinical pipeline: Draft → Under Review → Verified → Delivered
          </p>
        </div>

        {/* Top 3 Counters */}
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-xl text-xs font-semibold text-amber-900 flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-600" />
            <span>Pending Review: {pendingCount}</span>
          </div>
          <div className="px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Ready: {readyCount}</span>
          </div>
          <div className="px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-900 flex items-center gap-2">
            <Send className="w-4 h-4 text-emerald-600" />
            <span>Delivered: {deliveredCount}</span>
          </div>
        </div>
      </div>

      {/* Tabs & Search */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'All Reports' },
            { id: 'Draft', label: 'Drafts (Lab Tech)' },
            { id: 'Under Review', label: 'Under Pathologist Review' },
            { id: 'Verified', label: 'Verified & Ready' },
            { id: 'Delivered', label: 'Delivered to Patient' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all shrink-0 ${
                activeTab === tab.id 
                  ? 'bg-emerald-600 text-white shadow-xs' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative max-w-xs w-full">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search report #, patient or test..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:bg-white outline-none"
          />
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 font-semibold uppercase text-[10px] border-b border-gray-100">
              <tr>
                <th className="p-3">Report Number</th>
                <th className="p-3">Patient Name</th>
                <th className="p-3">Test / Category</th>
                <th className="p-3">Sample Date</th>
                <th className="p-3">Pipeline Status</th>
                <th className="p-3">Delivery</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
              {filteredReports.map(rep => (
                <tr key={rep.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-3 font-mono font-bold text-emerald-700">{rep.reportNumber}</td>
                  <td className="p-3">
                    <div className="font-bold text-gray-900">{rep.patientName}</div>
                    <div className="text-[10px] text-gray-400 font-normal">{rep.patientAge} yrs • {rep.patientGender}</div>
                  </td>
                  <td className="p-3">
                    <div className="text-gray-900 font-semibold">{rep.testName}</div>
                    <div className="text-[10px] text-gray-400 font-normal">{rep.category}</div>
                  </td>
                  <td className="p-3 text-gray-600">{rep.sampleDate}</td>
                  <td className="p-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      rep.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' :
                      rep.status === 'Verified' ? 'bg-emerald-100 text-emerald-800' :
                      rep.status === 'Under Review' ? 'bg-amber-100 text-amber-800' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {rep.status}
                    </span>
                  </td>
                  <td className="p-3">
                    {rep.deliveryMethod ? (
                      <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{rep.deliveryMethod}</span>
                      </span>
                    ) : (
                      <span className="text-gray-400 text-[10px]">Pending release</span>
                    )}
                  </td>
                  <td className="p-3 text-right space-x-2">
                    <button
                      onClick={() => setPreviewReport(rep)}
                      className="px-2.5 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-semibold rounded text-[11px]"
                    >
                      View Report
                    </button>

                    {rep.status === 'Verified' && (
                      <button
                        onClick={() => sendReportWhatsApp(rep.id)}
                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded text-[11px]"
                      >
                        Send WhatsApp
                      </button>
                    )}

                    {rep.status === 'Draft' && canLabSubmit && (
                      <button
                        onClick={() => updateReportStatus(rep.id, 'Under Review')}
                        className="px-2.5 py-1 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded text-[11px]"
                      >
                        Submit for Review
                      </button>
                    )}

                    {rep.status === 'Under Review' && canPathologistApprove && (
                      <button
                        onClick={() => updateReportStatus(rep.id, 'Verified')}
                        className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded text-[11px]"
                      >
                        Approve Report
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PDF Report Viewer Modal */}
      {previewReport && (
        <div className="fixed inset-0 bg-gray-900/70 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-8 shadow-2xl border border-gray-200 max-h-[90vh] overflow-y-auto">
            {/* Header / Modal Close */}
            <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-emerald-600" />
                <div>
                  <h3 className="font-bold text-gray-900 text-base">Disha Diagnostic Centre PDF Viewer</h3>
                  <p className="text-gray-500 text-xs">Report ID: {previewReport.reportNumber}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDownloadPDF(previewReport)}
                  className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-xs font-semibold flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </button>
                <button
                  onClick={() => setPreviewReport(null)}
                  className="p-1.5 text-gray-400 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Official PDF Document Layout */}
            <div className="border-2 border-gray-200 rounded-xl p-8 bg-white text-gray-800 space-y-6 shadow-sm">
              {/* Letterhead Header */}
              <div className="flex items-center justify-between border-b-2 border-emerald-600 pb-4">
                <div>
                  <h1 className="font-bold text-2xl text-emerald-900 tracking-tight">DISHA DIAGNOSTIC CENTRE</h1>
                  <p className="text-xs text-gray-600 font-medium">NABL Accredited • ISO 9001:2015 Certified Pathology Laboratory</p>
                  <p className="text-[11px] text-gray-500">Opp. District Court, Tarabai Park, Kolhapur 416003 • Tel: +91 0231 2654321</p>
                </div>
                <div className="text-right">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-600 to-cyan-500 text-white font-bold text-xl flex items-center justify-center ml-auto">
                    D
                  </div>
                  <span className="text-[10px] text-emerald-700 font-bold block mt-1">✓ Verified Digital Report</span>
                </div>
              </div>

              {/* Patient Details Grid */}
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="text-gray-400 text-[10px] block font-semibold">PATIENT NAME</span>
                  <span className="font-bold text-gray-900">{previewReport.patientName}</span>
                </div>
                <div>
                  <span className="text-gray-400 text-[10px] block font-semibold">AGE / GENDER</span>
                  <span className="font-semibold text-gray-800">{previewReport.patientAge} Yrs / {previewReport.patientGender}</span>
                </div>
                <div>
                  <span className="text-gray-400 text-[10px] block font-semibold">SAMPLE DATE</span>
                  <span className="font-semibold text-gray-800">{previewReport.sampleDate}</span>
                </div>
                <div>
                  <span className="text-gray-400 text-[10px] block font-semibold">REPORT DATE</span>
                  <span className="font-semibold text-gray-800">{previewReport.reportedDate}</span>
                </div>
              </div>

              {/* Test Name Header */}
              <div className="bg-emerald-900 text-white p-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-between">
                <span>TEST: {previewReport.testName}</span>
                <span className="text-[10px] font-normal text-emerald-200">CATEGORY: {previewReport.category}</span>
              </div>

              {/* Results Table */}
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-gray-100 text-gray-700 font-bold border-b border-gray-300">
                  <tr>
                    <th className="p-2.5">TEST PARAMETER</th>
                    <th className="p-2.5 text-center">OBSERVED VALUE</th>
                    <th className="p-2.5 text-center">UNIT</th>
                    <th className="p-2.5 text-right">REFERENCE RANGE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 font-medium text-gray-800">
                  {previewReport.results.map((res, idx) => (
                    <tr key={idx} className={res.status !== 'Normal' ? 'bg-rose-50/70 font-bold text-rose-900' : ''}>
                      <td className="p-2.5">{res.parameter}</td>
                      <td className="p-2.5 text-center font-bold text-sm">
                        {res.value} {res.status !== 'Normal' && <span className="text-rose-600 text-xs">(*)</span>}
                      </td>
                      <td className="p-2.5 text-center text-gray-500 font-mono text-[11px]">{res.unit}</td>
                      <td className="p-2.5 text-right text-gray-600 font-mono text-[11px]">{res.refRange}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pathologist Remarks */}
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-1 text-xs">
                <h4 className="font-bold text-gray-900">PATHOLOGIST CLINICAL REMARKS:</h4>
                <p className="text-gray-700 leading-relaxed italic">{previewReport.pathologistRemarks || 'No abnormal findings reported.'}</p>
              </div>

              {/* Footer Signatures */}
              <div className="pt-6 border-t border-gray-300 flex items-center justify-between text-xs">
                <div>
                  <p className="text-gray-400 text-[10px]">LAB TECHNICIAN</p>
                  <p className="font-bold text-gray-800">{previewReport.technicianName}</p>
                </div>

                <div className="text-right">
                  <div className="font-serif italic text-emerald-900 font-bold text-sm">Dr. Rajesh Mehta</div>
                  <p className="font-bold text-gray-900 text-xs">DR. RAJESH MEHTA (MD Pathologist)</p>
                  <p className="text-gray-500 text-[10px]">Reg #MCI-48291 • Chief Consultant Pathologist</p>
                </div>
              </div>
            </div>

            {/* Pathologist Approval Action inside modal if role permits */}
            {previewReport.status === 'Under Review' && canPathologistApprove && (
              <div className="mt-6 p-4 bg-indigo-50 border border-indigo-200 rounded-xl space-y-3">
                <h4 className="font-bold text-indigo-900 text-xs">Doctor / Pathologist Approval Action</h4>
                <input
                  type="text"
                  placeholder="Add optional pathologist remarks..."
                  value={pathologistRemarksInput}
                  onChange={e => setPathologistRemarksInput(e.target.value)}
                  className="w-full p-2 bg-white border border-indigo-200 rounded-lg text-xs outline-none"
                />
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => handleApproveReport(previewReport.id)}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg text-xs shadow-md"
                  >
                    ✓ Digitally Sign & Approve Report
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
