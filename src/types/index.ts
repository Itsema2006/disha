export type Role = 
  | 'owner' 
  | 'ops_manager' 
  | 'receptionist' 
  | 'lab_tech' 
  | 'pathologist' 
  | 'accounts' 
  | 'patient';

export type PermissionLevel = 'full' | 'view' | 'action' | 'none';

export type ModuleKey = 
  | 'landing'
  | 'dashboard' 
  | 'appointments' 
  | 'patients' 
  | 'ai_receptionist' 
  | 'whatsapp' 
  | 'samples_tests' 
  | 'reports' 
  | 'billing' 
  | 'analytics' 
  | 'staff' 
  | 'settings'
  | 'audit_logs'
  | 'system_flow'
  | 'role_matrix'
  | 'user_journeys';

export interface StaffUser {
  id: string;
  name: string;
  role: Role;
  roleTitle: string;
  email: string;
  mobile: string;
  department: string;
  avatar: string;
  status: 'Active' | 'On Leave' | 'Inactive';
  lastActive: string;
}

export interface Patient {
  id: string;
  name: string;
  phone: string;
  email?: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  address: string;
  bloodGroup: string;
  lastVisit: string;
  testsCount: number;
  reportStatus: 'Delivered' | 'Ready' | 'Pending Verification' | 'Processing';
  totalBilling: number;
  notes?: string;
}

export type AppointmentStatus = 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled';

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  phone: string;
  testName: string;
  doctorName: string;
  dateTime: string;
  timeSlot: string;
  status: AppointmentStatus;
  notes?: string;
  createdVia: 'AI Voice' | 'WhatsApp' | 'Reception' | 'Patient Portal';
  amount: number;
}

export type ReportStatus = 'Draft' | 'Under Review' | 'Verified' | 'Delivered';

export interface TestResultItem {
  parameter: string;
  value: string;
  unit: string;
  refRange: string;
  status: 'Normal' | 'High' | 'Low';
}

export interface DiagnosticReport {
  id: string;
  reportNumber: string;
  patientId: string;
  patientName: string;
  patientAge: number;
  patientGender: string;
  testName: string;
  category: 'Haematology' | 'Biochemistry' | 'Radiology' | 'Endocrinology' | 'Microbiology';
  sampleDate: string;
  reportedDate: string;
  technicianName: string;
  pathologistName: string;
  status: ReportStatus;
  deliveryMethod?: 'WhatsApp' | 'Email' | 'Handover' | 'Portal';
  deliveryTimestamp?: string;
  results: TestResultItem[];
  pathologistRemarks?: string;
}

export interface AiCallRecord {
  id: string;
  callerName: string;
  phone: string;
  timestamp: string;
  duration: string;
  reason: 'Appointment booking' | 'Test information' | 'Report status' | 'Price enquiry' | 'General enquiry';
  status: 'AI Handled' | 'Transferred to Staff' | 'Missed';
  aiSummary: string;
  transcript: { sender: 'AI' | 'Caller'; text: string; time: string }[];
  appointmentCreated?: string;
}

export interface WhatsappAutomation {
  id: string;
  title: string;
  type: 'appointment_confirmation' | 'reminder_24h' | 'reminder_2h' | 'report_ready' | 'post_visit';
  triggerEvent: string;
  active: boolean;
  messagesSentToday: number;
  template: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  staffName: string;
  role: string;
  action: string;
  module: string;
  recordId: string;
  status: 'Success' | 'Denied' | 'Warning';
}

export interface RoleMatrixRow {
  role: Role;
  roleTitle: string;
  permissions: Record<ModuleKey, PermissionLevel>;
}

export interface UserJourneyStep {
  stepNumber: number;
  title: string;
  description: string;
  targetModule: ModuleKey;
  targetAction?: string;
}

export interface UserJourney {
  role: Role;
  title: string;
  steps: UserJourneyStep[];
}
