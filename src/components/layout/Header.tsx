import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Bell, MapPin, Activity, PhoneCall, ChevronDown, LogOut, CheckCircle2, User, ShieldAlert } from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    currentUser, 
    currentRole, 
    isAiOnline, 
    toggleAiStatus, 
    logout, 
    toastMessage,
    setActiveModule,
    loginAsRole
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const notifications = [
    { id: 1, title: 'New AI Voice Booking', desc: 'Rohan Joshi booked CBC test via AI Receptionist', time: '10 mins ago', type: 'ai' },
    { id: 2, title: 'Report Pending Verification', desc: 'Sunita Patil Thyroid report submitted by Lab Tech Priya', time: '25 mins ago', type: 'report' },
    { id: 3, title: 'WhatsApp Reminder Delivered', desc: '24-hr appointment reminder delivered to 38 patients', time: '1 hr ago', type: 'whatsapp' }
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      {/* Toast Banner if active */}
      {toastMessage && (
        <div className="bg-sky-600 text-white text-xs px-4 py-1.5 flex items-center justify-between font-medium animate-fadeIn">
          <div className="flex items-center gap-2 mx-auto">
            <CheckCircle2 className="w-4 h-4 text-sky-200" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left branding */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveModule('dashboard')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-teal-500 flex items-center justify-center text-white font-bold text-xl shadow-md shadow-sky-500/20">
            D
          </div>
          <div>
            <h1 className="font-bold text-slate-900 text-base leading-tight tracking-tight flex items-center gap-1.5">
              <span>Disha Diagnostic Centre</span>
              <span className="text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded bg-sky-100 text-sky-700 border border-sky-200">
                Kolhapur
              </span>
            </h1>
            <div className="flex items-center gap-1 text-slate-500 text-xs">
              <MapPin className="w-3 h-3 text-sky-600" />
              <span>Tarabai Park, Kolhapur</span>
            </div>
          </div>
        </div>

        {/* Middle Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-4 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search patient, phone, appointment ID, or report #..."
            className="w-full bg-slate-100/80 border border-slate-200 rounded-lg pl-9 pr-4 py-2 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setActiveModule('patients');
              }
            }}
          />
        </div>

        {/* Right Status Badges & Controls */}
        <div className="flex items-center gap-3">
          {/* AI Receptionist Live Status Indicator */}
          {currentRole !== 'patient' && (
            <button
              onClick={toggleAiStatus}
              title="Click to toggle AI Voice Receptionist status"
              className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 border transition-all ${
                isAiOnline 
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                  : 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${isAiOnline ? 'bg-emerald-500 animate-ping' : 'bg-rose-500'}`} />
              <PhoneCall className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">AI Reception: </span>
              <span>{isAiOnline ? 'ONLINE' : 'OFFLINE'}</span>
            </button>
          )}

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 relative transition-colors"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-sky-600 border-2 border-white rounded-full"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-fadeIn">
                <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="font-semibold text-slate-800 text-xs">Live System Notifications</h3>
                  <span className="text-[10px] text-sky-600 font-medium">3 New</span>
                </div>
                <div className="divide-y divide-slate-100">
                  {notifications.map(n => (
                    <div key={n.id} className="p-3 hover:bg-slate-50 transition-colors">
                      <p className="font-medium text-slate-800 text-xs">{n.title}</p>
                      <p className="text-slate-500 text-[11px] mt-0.5">{n.desc}</p>
                      <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 pl-2 py-1 pr-3 rounded-lg hover:bg-slate-100 transition-colors border border-slate-200/60"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover border border-sky-300"
              />
              <div className="text-left hidden lg:block">
                <div className="font-semibold text-slate-800 text-xs leading-none">{currentUser.name}</div>
                <div className="text-[10px] text-sky-700 font-medium leading-tight mt-0.5">{currentUser.roleTitle}</div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-fadeIn text-xs">
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="font-semibold text-slate-900">{currentUser.name}</p>
                  <p className="text-slate-500 text-[11px]">{currentUser.email}</p>
                  <span className="mt-1 inline-block px-2 py-0.5 rounded bg-sky-100 text-sky-800 font-medium text-[10px]">
                    Role: {currentUser.roleTitle}
                  </span>
                </div>
                
                <div className="py-1">
                  <button 
                    onClick={() => { setActiveModule('settings'); setShowUserMenu(false); }} 
                    className="w-full text-left px-4 py-1.5 text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>Profile Settings</span>
                  </button>
                  <button 
                    onClick={() => { setActiveModule('role_matrix'); setShowUserMenu(false); }} 
                    className="w-full text-left px-4 py-1.5 text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <ShieldAlert className="w-3.5 h-3.5 text-sky-600" />
                    <span>View Role Permission Matrix</span>
                  </button>
                </div>

                <div className="border-t border-slate-100 pt-1">
                  <button
                    onClick={() => { logout(); setShowUserMenu(false); }}
                    className="w-full text-left px-4 py-1.5 text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-medium"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
