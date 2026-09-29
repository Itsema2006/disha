import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { RoleSwitcherBanner } from './components/common/RoleSwitcherBanner';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { PermissionGuard } from './components/common/PermissionGuard';

// Screens
import { LandingScreen } from './components/screens/LandingScreen';
import { LoginScreen } from './components/screens/LoginScreen';
import { ExecutiveDashboard } from './components/screens/ExecutiveDashboard';
import { AiVoiceReceptionist } from './components/screens/AiVoiceReceptionist';
import { AppointmentManagement } from './components/screens/AppointmentManagement';
import { WhatsappAutomationDashboard } from './components/screens/WhatsappAutomation';
import { PatientManagement } from './components/screens/PatientManagement';
import { DiagnosticReports } from './components/screens/DiagnosticReports';
import { PatientPortal } from './components/screens/PatientPortal';
import { AnalyticsDashboard } from './components/screens/AnalyticsDashboard';
import { RoleMatrixScreen } from './components/screens/RoleMatrixScreen';
import { UserJourneysScreen } from './components/screens/UserJourneysScreen';
import { PermissionManagement } from './components/screens/PermissionManagement';
import { AuditLogsScreen } from './components/screens/AuditLogsScreen';
import { SystemFlowDiagram } from './components/screens/SystemFlowDiagram';
import { BillingScreen } from './components/screens/BillingScreen';
import { LogIn, Home } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { isAuthenticated, activeModule, currentRole, logout } = useApp();
  const [showLanding, setShowLanding] = useState<boolean>(true);
  const [showLoginScreen, setShowLoginScreen] = useState<boolean>(false);

  React.useEffect(() => {
    if (isAuthenticated) {
      setShowLoginScreen(false);
    }
  }, [isAuthenticated]);

  // If user is on landing page
  if (showLanding) {
    return (
      <LandingScreen 
        onGetConnected={() => {
          setShowLanding(false);
          setShowLoginScreen(true);
        }} 
      />
    );
  }

  // If user clicked Get Connected or is logging in
  if (showLoginScreen || !isAuthenticated) {
    return (
      <div className="relative">
        <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 flex items-center justify-between border-b border-slate-800">
          <button 
            onClick={() => {
              setShowLanding(true);
              setShowLoginScreen(false);
            }}
            className="flex items-center gap-1.5 text-sky-400 hover:text-white font-semibold transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>← Back to Disha Landing Screen</span>
          </button>
          <span className="text-[11px] text-slate-400">Disha Diagnostic Centre • Tariff & Staff Portal</span>
        </div>

        <LoginScreen />
      </div>
    );
  }

  // Render patient portal view directly if active role is patient
  if (currentRole === 'patient') {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col">
        <RoleSwitcherBanner />
        <Header />
        <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
          <PatientPortal />
        </main>
      </div>
    );
  }

  const renderModuleScreen = () => {
    switch (activeModule) {
      case 'dashboard':
        return <ExecutiveDashboard />;
      case 'appointments':
        return <AppointmentManagement />;
      case 'patients':
        return <PatientManagement />;
      case 'ai_receptionist':
        return <AiVoiceReceptionist />;
      case 'whatsapp':
        return <WhatsappAutomationDashboard />;
      case 'reports':
      case 'samples_tests':
        return <DiagnosticReports />;
      case 'billing':
        return <BillingScreen />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'staff':
      case 'settings':
        return <PermissionManagement />;
      case 'audit_logs':
        return <AuditLogsScreen />;
      case 'system_flow':
        return <SystemFlowDiagram />;
      case 'role_matrix':
        return <RoleMatrixScreen />;
      case 'user_journeys':
        return <UserJourneysScreen />;
      default:
        return <ExecutiveDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-sky-100 selection:text-sky-900">
      <RoleSwitcherBanner />
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
          <PermissionGuard module={activeModule}>
            {renderModuleScreen()}
          </PermissionGuard>
        </main>
      </div>
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}

export default App;
