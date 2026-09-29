import React from 'react';
import { useApp } from '../../context/AppContext';
import { CreditCard, IndianRupee, Download, CheckCircle2, Search, Plus } from 'lucide-react';

export const BillingScreen: React.FC = () => {
  const { showToast, addAuditLog } = useApp();

  const invoices = [
    { id: 'INV-2026-081', patient: 'Rohan Joshi', test: 'CBC + HbA1c & Fasting Glucose', amount: 1450, status: 'Paid', method: 'UPI / PhonePe', date: '2026-09-21' },
    { id: 'INV-2026-082', patient: 'Sunita Patil', test: 'Thyroid Profile & Lipid Panel', amount: 1800, status: 'Paid', method: 'Google Pay', date: '2026-09-21' },
    { id: 'INV-2026-083', patient: 'Amol Kadam', test: 'Complete Blood Count (CBC)', amount: 450, status: 'Paid', method: 'Cash', date: '2026-09-20' },
    { id: 'INV-2026-084', patient: 'Meena Deshmukh', test: 'Comprehensive Sr. Citizen Package', amount: 4200, status: 'Paid', method: 'Card Swipe', date: '2026-09-19' },
    { id: 'INV-2026-085', patient: 'Vinayak Pawar', test: 'MRI Right Knee Joint', amount: 3500, status: 'Pending', method: 'Pending at Counter', date: '2026-09-21' }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Billing & GST Invoice Management</h2>
          <p className="text-gray-500 text-xs mt-0.5">
            Finance ledger, UPI payments tracking, patient billing & tax invoice generation.
          </p>
        </div>

        <button 
          onClick={() => {
            showToast('Generated GST Payment Invoice #INV-2026-086');
            addAuditLog('Created New GST Invoice', 'Billing', 'INV-2026-086');
          }}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Invoice</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-bold text-gray-900 text-sm">Today's Invoices</h3>
          <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-full">
            Total Collections: ₹11,400
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 font-semibold uppercase text-[10px] border-b border-gray-100">
              <tr>
                <th className="p-3">Invoice ID</th>
                <th className="p-3">Patient</th>
                <th className="p-3">Diagnostic Test</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Payment Method</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
              {invoices.map(inv => (
                <tr key={inv.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-3 font-mono font-bold text-emerald-700">{inv.id}</td>
                  <td className="p-3 font-bold text-gray-900">{inv.patient}</td>
                  <td className="p-3 text-gray-800">{inv.test}</td>
                  <td className="p-3 font-bold text-gray-900">₹{inv.amount.toLocaleString('en-IN')}</td>
                  <td className="p-3 text-gray-600">{inv.method}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      inv.status === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button 
                      onClick={() => showToast(`Downloaded Receipt for ${inv.id}`)}
                      className="text-emerald-600 hover:underline font-semibold text-[11px]"
                    >
                      Download Receipt
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
