import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  IndianRupee, 
  Clock, 
  PhoneCall, 
  MessageSquare, 
  XCircle, 
  Calendar,
  Activity,
  Award,
  ArrowUpRight
} from 'lucide-react';

export const AnalyticsDashboard: React.FC = () => {
  const { currentRole, checkPermission } = useApp();
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly' | 'annual'>('monthly');

  const canViewRevenue = checkPermission('billing') !== 'none';

  const mostRequestedTests = [
    { name: 'Complete Blood Count (CBC)', count: 485, share: '32%', trend: '+14%' },
    { name: 'Fasting Glucose & HbA1c', count: 320, share: '21%', trend: '+18%' },
    { name: 'Comprehensive Lipid Profile', count: 240, share: '16%', trend: '+8%' },
    { name: 'Thyroid Panel (T3, T4, TSH)', count: 195, share: '13%', trend: '+22%' },
    { name: 'Vitamin D3 & B12 Assay', count: 140, share: '9%', trend: '+12%' },
    { name: 'Renal Function Test (KFT)', count: 100, share: '7%', trend: '+5%' }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Business Analytics & Growth Dashboard</h2>
          <p className="text-slate-500 text-xs mt-0.5">
            Operational KPIs, revenue trends, test popularity & turnaround time analysis for Kolhapur.
          </p>
        </div>

        {/* Period Selector */}
        <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 border border-slate-200 text-xs">
          {(['daily', 'weekly', 'monthly', 'annual'] as const).map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 rounded-lg font-semibold uppercase text-[10px] tracking-wider transition-all ${
                period === p ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* 8 Metric KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Appointments</span>
            <Calendar className="w-4 h-4 text-sky-600" />
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900">1,480</div>
          <div className="mt-1 text-[10px] text-emerald-600 font-medium flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" />
            <span>+18% {period}</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Patient Growth</span>
            <Users className="w-4 h-4 text-teal-600" />
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900">+24%</div>
          <div className="mt-1 text-[10px] text-teal-600 font-medium">New patient registration</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Total Revenue</span>
            <IndianRupee className="w-4 h-4 text-emerald-600" />
          </div>
          {canViewRevenue ? (
            <>
              <div className="mt-2 text-2xl font-bold text-slate-900">₹18.4 Lakhs</div>
              <div className="mt-1 text-[10px] text-emerald-600 font-medium">+15.2% YoY growth</div>
            </>
          ) : (
            <div className="mt-2 text-xs text-amber-600 font-semibold">Restricted</div>
          )}
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Avg Turnaround Time</span>
            <Clock className="w-4 h-4 text-purple-600" />
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900">3.4 Hours</div>
          <div className="mt-1 text-[10px] text-purple-600 font-medium">Sample to verified PDF</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>AI Voice Call Handling</span>
            <PhoneCall className="w-4 h-4 text-sky-600" />
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900">88.0%</div>
          <div className="mt-1 text-[10px] text-sky-600 font-medium">Automated resolution</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>WhatsApp Engagement</span>
            <MessageSquare className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900">99.2%</div>
          <div className="mt-1 text-[10px] text-emerald-600 font-medium">Delivery success</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Cancellation Rate</span>
            <XCircle className="w-4 h-4 text-rose-500" />
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900">4.2%</div>
          <div className="mt-1 text-[10px] text-emerald-600 font-medium">-1.8% drop via reminders</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Repeat Patient Index</span>
            <Award className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900">68%</div>
          <div className="mt-1 text-[10px] text-indigo-600 font-medium">High patient loyalty</div>
        </div>

      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Most Requested Tests Breakdown */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Most Requested Diagnostic Tests</h3>
              <p className="text-slate-500 text-xs">Volume distribution across Kolhapur pathology categories</p>
            </div>
            <span className="text-xs bg-slate-100 text-slate-700 font-bold px-2.5 py-1 rounded-full">
              Volume Rank
            </span>
          </div>

          <div className="space-y-3 text-xs">
            {mostRequestedTests.map((test, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between font-medium">
                  <span className="text-slate-800 font-bold">{test.name}</span>
                  <span className="text-slate-600">{test.count} tests ({test.share})</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden flex">
                  <div 
                    className="bg-gradient-to-r from-sky-600 to-teal-500 rounded-full" 
                    style={{ width: test.share }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Turnaround Time (TAT) & Efficiency Breakdown */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-sm">Turnaround Time (TAT) Pipeline</h3>
            <p className="text-slate-500 text-xs">Average processing duration by diagnostic stage</p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
              <div>
                <div className="font-semibold text-slate-800">1. Sample Collection</div>
                <div className="text-[11px] text-slate-500">Reception & phlebotomy</div>
              </div>
              <span className="font-bold text-sky-700">15 Mins</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
              <div>
                <div className="font-semibold text-slate-800">2. Lab Test Processing</div>
                <div className="text-[11px] text-slate-500">Haematology / Biochemistry analyzer</div>
              </div>
              <span className="font-bold text-teal-700">1.8 Hours</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
              <div>
                <div className="font-semibold text-slate-800">3. Pathologist Clinical Review</div>
                <div className="text-[11px] text-slate-500">Dr. Rajesh Mehta verification</div>
              </div>
              <span className="font-bold text-indigo-700">45 Mins</span>
            </div>

            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center justify-between">
              <div>
                <div className="font-semibold text-emerald-900">4. WhatsApp PDF Delivery</div>
                <div className="text-[11px] text-emerald-700">Instant automated broadcast</div>
              </div>
              <span className="font-bold text-emerald-900">&lt; 30 Secs</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
