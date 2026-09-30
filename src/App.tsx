import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { RoleSwitcherBanner } from './components/common/RoleSwitcherBanner';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
        <div className="bg-gray-900 text-gray-300 text-xs py-2 px-4 flex items-center justify-between border-b border-gray-800">
          <button 
            onClick={() => {
              setShowLanding(true);
              setShowLoginScreen(false);
            }}
            className="flex items-center gap-1.5 text-emerald-400 hover:text-white font-semibold transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>← Back to Disha Landing Screen</span>
          </button>
          <span className="text-[11px] text-gray-400">Disha Diagnostic Centre • Tariff & Staff Portal</span>
        </div>

        <LoginScreen />
        <Footer theme="dark" className="border-t border-gray-800" />
      </div>
    );
  }

  // Render patient portal view directly if active role is patient
  if (currentRole === 'patient') {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col">
        <RoleSwitcherBanner />
        <Header />
        <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full flex flex-col">
          <div className="flex-1">
            <PatientPortal />
          </div>
          <Footer className="mt-8 !bg-transparent border-t border-gray-800" theme="dark" />
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
    <div className="min-h-screen bg-gray-50 flex flex-col selection:bg-emerald-100 selection:text-emerald-900">
      <RoleSwitcherBanner />
      <Header onMenuClick={() => setIsSidebarOpen(true)} />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <main className="min-w-0 flex-1 p-3 sm:p-6 lg:p-8 overflow-y-auto w-full flex flex-col">
          <div className="max-w-7xl mx-auto w-full flex-1">
            <PermissionGuard module={activeModule}>
              {renderModuleScreen()}
            </PermissionGuard>
          </div>
          <Footer className="mt-8" />
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
