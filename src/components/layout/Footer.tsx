import React from 'react';

export const Footer: React.FC<{ className?: string, theme?: 'light' | 'dark' }> = ({ className = '', theme = 'light' }) => {
  const isDark = theme === 'dark';
  
  return (
    <footer className={`w-full py-6 border-t mt-auto ${isDark ? 'border-gray-800 bg-transparent' : 'border-gray-200 bg-white/50 backdrop-blur-sm'} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-emerald-600 to-cyan-500 flex items-center justify-center text-white font-bold text-xs shadow-md">
              D
            </div>
            <span className={`font-bold text-sm tracking-tight ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Disha Diagnostic Centre</span>
          </div>
          <span className={`hidden md:inline ${isDark ? 'text-gray-700' : 'text-gray-300'}`}>|</span>
          <p className={`text-[11px] font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Tarabai Park, Kolhapur • Maharashtra
          </p>
        </div>
        
        <div className="flex flex-col items-center md:items-end gap-1">
          <p className={`text-[11px] font-medium ${isDark ? 'text-gray-400' : 'text-gray-400'}`}>
            &copy; {new Date().getFullYear()} Disha Diagnostic Centre. All rights reserved.
          </p>
          <p className={`text-[10px] ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            Powered by <span className="font-semibold text-emerald-600">Nextinnovations.pvt.ltd</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
