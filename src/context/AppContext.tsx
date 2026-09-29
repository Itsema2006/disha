import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Role, 
  StaffUser, 
  Patient, 
  Appointment, 
  DiagnosticReport, 
  AiCallRecord, 
  WhatsappAutomation, 
  AuditLog, 
  ModuleKey, 
  PermissionLevel, 
  UserJourney, 
  AppointmentStatus,
  ReportStatus 
} from '../types';
import { 
  INITIAL_STAFF_USERS, 
  INITIAL_PATIENTS, 
  INITIAL_APPOINTMENTS, 
  INITIAL_REPORTS, 
  INITIAL_AI_CALLS, 
  INITIAL_WHATSAPP_AUTOMATIONS, 
  INITIAL_AUDIT_LOGS, 
  ROLE_MATRIX_DATA, 
  USER_JOURNEYS 
} from '../data/mockData';

interface AppContextType {
  currentRole: Role;
  currentUser: StaffUser;
  activeModule: ModuleKey;
  isAuthenticated: boolean;
  isAiOnline: boolean;
  toastMessage: string | null;
  activeJourney: UserJourney | null;
  currentJourneyStepIndex: number;
  
  // Navigation
  setActiveModule: (module: ModuleKey) => void;
  loginAsRole: (role: Role) => void;
  logout: () => void;
  toggleAiStatus: () => void;
  showToast: (msg: string) => void;
  
  // Data lists
  staffUsers: StaffUser[];
  patients: Patient[];
  appointments: Appointment[];
  reports: DiagnosticReport[];
  aiCalls: AiCallRecord[];
  whatsappAutomations: WhatsappAutomation[];
  auditLogs: AuditLog[];
  
  // Data Mutators
  addAppointment: (apt: Partial<Appointment>) => void;
  updateAppointmentStatus: (id: string, status: AppointmentStatus) => void;
  addPatient: (patient: Partial<Patient>) => void;
  updateReportStatus: (id: string, status: ReportStatus, pathologistRemarks?: string) => void;
  sendReportWhatsApp: (reportId: string) => void;
  toggleWhatsappAutomation: (id: string) => void;
  updateWhatsappTemplate: (id: string, template: string) => void;
  addAuditLog: (action: string, module: string, recordId: string, status?: 'Success' | 'Denied' | 'Warning') => void;
  
  // Permission helper
  checkPermission: (module: ModuleKey, roleOverride?: Role) => PermissionLevel;
  
  // Guided Journey Helpers
  startJourney: (role: Role) => void;
  nextJourneyStep: () => void;
  prevJourneyStep: () => void;
  endJourney: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<Role>('owner');
  const [currentUser, setCurrentUser] = useState<StaffUser>(INITIAL_STAFF_USERS[0]);
  const [activeModule, setActiveModule] = useState<ModuleKey>('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAiOnline, setIsAiOnline] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  const [staffUsers, setStaffUsers] = useState<StaffUser[]>(INITIAL_STAFF_USERS);
  const [patients, setPatients] = useState<Patient[]>(INITIAL_PATIENTS);
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [reports, setReports] = useState<DiagnosticReport[]>(INITIAL_REPORTS);
  const [aiCalls, setAiCalls] = useState<AiCallRecord[]>(INITIAL_AI_CALLS);
  const [whatsappAutomations, setWhatsappAutomations] = useState<WhatsappAutomation[]>(INITIAL_WHATSAPP_AUTOMATIONS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);
  
  const [activeJourney, setActiveJourney] = useState<UserJourney | null>(null);
  const [currentJourneyStepIndex, setCurrentJourneyStepIndex] = useState<number>(0);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const addAuditLog = (action: string, module: string, recordId: string, status: 'Success' | 'Denied' | 'Warning' = 'Success') => {
    const newLog: AuditLog = {
      id: `AUD-${Math.floor(100 + Math.random() * 900)}`,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) + ' today',
      staffName: currentRole === 'patient' ? 'Patient Portal User' : currentUser.name,
      role: currentRole === 'patient' ? 'Patient' : currentUser.roleTitle,
      action,
      module,
      recordId,
      status
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const checkPermission = (module: ModuleKey, roleOverride?: Role): PermissionLevel => {
    const roleToTest = roleOverride || currentRole;
    if (roleToTest === 'patient') {
      if (['dashboard', 'appointments', 'reports', 'user_journeys', 'system_flow'].includes(module)) {
        return 'view';
      }
      return 'none';
    }
    const roleRow = ROLE_MATRIX_DATA.find(r => r.role === roleToTest);
    if (!roleRow) return 'none';
    return roleRow.permissions[module] || 'none';
  };

  const loginAsRole = (role: Role) => {
    setCurrentRole(role);
    setIsAuthenticated(true);
    if (role === 'patient') {
      setCurrentUser({
        id: 'PAT-1042',
        name: 'Rohan Joshi',
        role: 'patient',
        roleTitle: 'Patient User',
        email: 'rohan.joshi@gmail.com',
        mobile: '+91 98220 12345',
        department: 'Patient',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
        status: 'Active',
        lastActive: 'Just now'
      });
      setActiveModule('dashboard');
      showToast('Logged in as Patient: Rohan Joshi (+91 98220 12345)');
      addAuditLog('Logged into Patient Portal', 'Patient Portal', 'PAT-1042');
      return;
    }

    const matchedStaff = staffUsers.find(s => s.role === role) || staffUsers[0];
    setCurrentUser(matchedStaff);
    
    // Set appropriate initial module based on role
    if (role === 'accounts') {
      setActiveModule('billing');
    } else if (role === 'lab_tech') {
      setActiveModule('samples_tests');
    } else {
      setActiveModule('dashboard');
    }
    
    showToast(`Logged in as ${matchedStaff.name} (${matchedStaff.roleTitle})`);
    addAuditLog(`Logged in as ${matchedStaff.roleTitle}`, 'Authentication', matchedStaff.id);
  };

  const logout = () => {
    addAuditLog('Logged out of system', 'Authentication', currentUser.id);
    setIsAuthenticated(false);
    showToast('Logged out safely.');
  };

  const toggleAiStatus = () => {
    const newStatus = !isAiOnline;
    setIsAiOnline(newStatus);
    showToast(`AI Voice Receptionist is now ${newStatus ? 'ONLINE' : 'OFFLINE'}`);
    addAuditLog(`Changed AI Receptionist status to ${newStatus ? 'ONLINE' : 'OFFLINE'}`, 'AI Voice Receptionist', 'SYS-AI');
  };

  const addAppointment = (aptData: Partial<Appointment>) => {
    const newId = `APT-${Math.floor(1000 + Math.random() * 9000)}`;
    const newApt: Appointment = {
      id: newId,
      patientId: aptData.patientId || `PAT-${Math.floor(1000 + Math.random() * 9000)}`,
      patientName: aptData.patientName || 'New Patient',
      phone: aptData.phone || '+91 98220 00000',
      testName: aptData.testName || 'Routine Diagnostic Test',
      doctorName: aptData.doctorName || 'Dr. Rajesh Mehta',
      dateTime: aptData.dateTime || new Date().toISOString().split('T')[0],
      timeSlot: aptData.timeSlot || '10:00 AM',
      status: aptData.status || 'Confirmed',
      createdVia: aptData.createdVia || (currentRole === 'patient' ? 'Patient Portal' : 'Reception'),
      amount: aptData.amount || 1200,
      notes: aptData.notes || 'Created via platform UI'
    };
    setAppointments(prev => [newApt, ...prev]);
    showToast(`Appointment ${newId} created for ${newApt.patientName}`);
    addAuditLog(`Created Appointment #${newId}`, 'Appointments', newId);

    // Auto trigger WhatsApp confirmation
    showToast(`📱 WhatsApp confirmation sent to ${newApt.phone}`);
  };

  const updateAppointmentStatus = (id: string, status: AppointmentStatus) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
    showToast(`Appointment ${id} status updated to ${status}`);
    addAuditLog(`Updated Appointment status to ${status}`, 'Appointments', id);
  };

  const addPatient = (patientData: Partial<Patient>) => {
    const newId = `PAT-${Math.floor(1000 + Math.random() * 9000)}`;
    const newPat: Patient = {
      id: newId,
      name: patientData.name || 'New Patient',
      phone: patientData.phone || '+91 98220 00000',
      email: patientData.email || '',
      age: patientData.age || 35,
      gender: patientData.gender || 'Male',
      address: patientData.address || 'Kolhapur',
      bloodGroup: patientData.bloodGroup || 'O+',
      lastVisit: new Date().toISOString().split('T')[0],
      testsCount: 1,
      reportStatus: 'Pending Verification',
      totalBilling: patientData.totalBilling || 1200,
      notes: patientData.notes || 'Registered'
    };
    setPatients(prev => [newPat, ...prev]);
    showToast(`Patient ${newPat.name} registered successfully`);
    addAuditLog(`Registered new patient ${newPat.name}`, 'Patients', newId);
  };

  const updateReportStatus = (id: string, status: ReportStatus, pathologistRemarks?: string) => {
    setReports(prev => prev.map(r => {
      if (r.id === id) {
        return {
          ...r,
          status,
          pathologistRemarks: pathologistRemarks !== undefined ? pathologistRemarks : r.pathologistRemarks,
          deliveryTimestamp: status === 'Delivered' ? new Date().toLocaleString() : r.deliveryTimestamp
        };
      }
      return r;
    }));
    showToast(`Report ${id} status moved to ${status}`);
    addAuditLog(`Updated Report status to ${status}`, 'Diagnostic Reports', id);

    if (status === 'Verified') {
      showToast(`📱 Diagnostic Report Ready alert sent via WhatsApp to patient!`);
    }
  };

  const sendReportWhatsApp = (reportId: string) => {
    const rep = reports.find(r => r.id === reportId);
    if (!rep) return;
    setReports(prev => prev.map(r => r.id === reportId ? { ...r, status: 'Delivered', deliveryMethod: 'WhatsApp', deliveryTimestamp: new Date().toLocaleTimeString() } : r));
    showToast(`📲 Report ${rep.reportNumber} sent successfully via WhatsApp to ${rep.patientName}`);
    addAuditLog(`Sent Report via WhatsApp`, 'Diagnostic Reports', reportId);
  };

  const toggleWhatsappAutomation = (id: string) => {
    setWhatsappAutomations(prev => prev.map(w => {
      if (w.id === id) {
        const active = !w.active;
        showToast(`WhatsApp Automation "${w.title}" is now ${active ? 'ACTIVE' : 'PAUSED'}`);
        addAuditLog(`Toggled WhatsApp Automation to ${active ? 'ACTIVE' : 'PAUSED'}`, 'WhatsApp Automation', id);
        return { ...w, active };
      }
      return w;
    }));
  };

  const updateWhatsappTemplate = (id: string, template: string) => {
    setWhatsappAutomations(prev => prev.map(w => w.id === id ? { ...w, template } : w));
    showToast(`Template updated for WhatsApp automation`);
    addAuditLog(`Updated message template`, 'WhatsApp Automation', id);
  };

  const startJourney = (role: Role) => {
    const found = USER_JOURNEYS.find(j => j.role === role);
    if (found) {
      setActiveJourney(found);
      setCurrentJourneyStepIndex(0);
      loginAsRole(role);
      setActiveModule(found.steps[0].targetModule);
      showToast(`Started Guided User Journey: ${found.title}`);
    }
  };

  const nextJourneyStep = () => {
    if (!activeJourney) return;
    if (currentJourneyStepIndex < activeJourney.steps.length - 1) {
      const nextIdx = currentJourneyStepIndex + 1;
      setCurrentJourneyStepIndex(nextIdx);
      const step = activeJourney.steps[nextIdx];
      setActiveModule(step.targetModule);
      showToast(`Step ${step.stepNumber}: ${step.title}`);
    } else {
      showToast(`Completed Guided User Journey! 🎉`);
      setActiveJourney(null);
    }
  };

  const prevJourneyStep = () => {
    if (!activeJourney) return;
    if (currentJourneyStepIndex > 0) {
      const prevIdx = currentJourneyStepIndex - 1;
      setCurrentJourneyStepIndex(prevIdx);
      const step = activeJourney.steps[prevIdx];
      setActiveModule(step.targetModule);
    }
  };

  const endJourney = () => {
    setActiveJourney(null);
    setCurrentJourneyStepIndex(0);
    showToast('Exited Guided User Journey');
  };

  return (
    <AppContext.Provider value={{
      currentRole,
      currentUser,
      activeModule,
      isAuthenticated,
      isAiOnline,
      toastMessage,
      activeJourney,
      currentJourneyStepIndex,
      setActiveModule,
      loginAsRole,
      logout,
      toggleAiStatus,
      showToast,
      staffUsers,
      patients,
      appointments,
      reports,
      aiCalls,
      whatsappAutomations,
      auditLogs,
      addAppointment,
      updateAppointmentStatus,
      addPatient,
      updateReportStatus,
      sendReportWhatsApp,
      toggleWhatsappAutomation,
      updateWhatsappTemplate,
      addAuditLog,
      checkPermission,
      startJourney,
      nextJourneyStep,
      prevJourneyStep,
      endJourney
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
