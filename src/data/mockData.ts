import { StaffUser, Patient, Appointment, DiagnosticReport, AiCallRecord, WhatsappAutomation, AuditLog, RoleMatrixRow, UserJourney } from '../types';

export const INITIAL_STAFF_USERS: StaffUser[] = [
  {
    id: 'STAFF-101',
    name: 'Dr. Ananya Deshmukh',
    role: 'owner',
    roleTitle: 'Owner / Chief Executive Admin',
    email: 'ananya@dishadiagnostic.in',
    mobile: '+91 98220 11111',
    department: 'Administration & Radiology',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=250',
    status: 'Active',
    lastActive: 'Just now'
  },
  {
    id: 'STAFF-102',
    name: 'Vikram Patil',
    role: 'ops_manager',
    roleTitle: 'Operations Manager',
    email: 'vikram.patil@dishadiagnostic.in',
    mobile: '+91 98220 22222',
    department: 'Operations',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=250',
    status: 'Active',
    lastActive: '5 mins ago'
  },
  {
    id: 'STAFF-103',
    name: 'Rahul Sharma',
    role: 'receptionist',
    roleTitle: 'Senior Receptionist',
    email: 'rahul.sharma@dishadiagnostic.in',
    mobile: '+91 98220 33333',
    department: 'Front Desk & Patient Care',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=250',
    status: 'Active',
    lastActive: 'Active now'
  },
  {
    id: 'STAFF-104',
    name: 'Priya Shinde',
    role: 'lab_tech',
    roleTitle: 'Chief Lab Technician',
    email: 'priya.shinde@dishadiagnostic.in',
    mobile: '+91 98220 44444',
    department: 'Haematology & Pathology Lab',
    avatar: 'https://images.unsplash.com/photo-1594824813566-78853974d6b7?auto=format&fit=crop&q=80&w=250',
    status: 'Active',
    lastActive: '12 mins ago'
  },
  {
    id: 'STAFF-105',
    name: 'Dr. Rajesh Mehta',
    role: 'pathologist',
    roleTitle: 'Consultant Pathologist (MD)',
    email: 'dr.mehta@dishadiagnostic.in',
    mobile: '+91 98220 55555',
    department: 'Clinical Pathology',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=250',
    status: 'Active',
    lastActive: 'Just now'
  },
  {
    id: 'STAFF-106',
    name: 'Suresh Kulkarni',
    role: 'accounts',
    roleTitle: 'Finance & Accounts Head',
    email: 'accounts@dishadiagnostic.in',
    mobile: '+91 98220 66666',
    department: 'Billing & Revenue',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    status: 'Active',
    lastActive: '1 hour ago'
  }
];

export const INITIAL_PATIENTS: Patient[] = [
  {
    id: 'PAT-1042',
    name: 'Rohan Joshi',
    phone: '+91 98220 12345',
    email: 'rohan.joshi@gmail.com',
    age: 38,
    gender: 'Male',
    address: 'Plot 45, Tarabai Park, Kolhapur',
    bloodGroup: 'O+',
    lastVisit: '2026-09-21',
    testsCount: 3,
    reportStatus: 'Ready',
    totalBilling: 2450,
    notes: 'Fasters glucose test. Fasted for 12 hours.'
  },
  {
    id: 'PAT-1043',
    name: 'Sunita Patil',
    phone: '+91 98220 23456',
    email: 'sunita.patil@yahoo.com',
    age: 52,
    gender: 'Female',
    address: 'Rajarampuri 5th Lane, Kolhapur',
    bloodGroup: 'B+',
    lastVisit: '2026-09-21',
    testsCount: 2,
    reportStatus: 'Pending Verification',
    totalBilling: 1800,
    notes: 'Thyroid evaluation, history of hypothyroidism.'
  },
  {
    id: 'PAT-1044',
    name: 'Amol Kadam',
    phone: '+91 98220 34567',
    email: 'kadam.amol@tech.in',
    age: 29,
    gender: 'Male',
    address: 'Shahupuri, Near Station, Kolhapur',
    bloodGroup: 'A+',
    lastVisit: '2026-09-20',
    testsCount: 1,
    reportStatus: 'Delivered',
    totalBilling: 850,
    notes: 'CBC routine fever checkup.'
  },
  {
    id: 'PAT-1045',
    name: 'Meena Deshmukh',
    phone: '+91 98220 45678',
    email: 'm.deshmukh@gmail.com',
    age: 61,
    gender: 'Female',
    address: 'Nagala Park, Kolhapur',
    bloodGroup: 'AB+',
    lastVisit: '2026-09-19',
    testsCount: 4,
    reportStatus: 'Delivered',
    totalBilling: 4200,
    notes: 'Comprehensive Sr. Citizen Package.'
  },
  {
    id: 'PAT-1046',
    name: 'Vinayak Pawar',
    phone: '+91 98220 56789',
    email: 'v.pawar@rediffmail.com',
    age: 45,
    gender: 'Male',
    address: 'Rankala Lake Road, Kolhapur',
    bloodGroup: 'O-',
    lastVisit: '2026-09-21',
    testsCount: 1,
    reportStatus: 'Processing',
    totalBilling: 3500,
    notes: 'MRI Knee right side.'
  },
  {
    id: 'PAT-1047',
    name: 'Swati Shinde',
    phone: '+91 98220 67890',
    email: 'swati.shinde@outlook.com',
    age: 34,
    gender: 'Female',
    address: 'Mangalwar Peth, Kolhapur',
    bloodGroup: 'A-',
    lastVisit: '2026-09-18',
    testsCount: 2,
    reportStatus: 'Delivered',
    totalBilling: 1600,
    notes: 'Vitamin D3 & B12 evaluation.'
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'APT-1042',
    patientId: 'PAT-1042',
    patientName: 'Rohan Joshi',
    phone: '+91 98220 12345',
    testName: 'CBC + HbA1c & Fasting Glucose',
    doctorName: 'Dr. Rajesh Mehta',
    dateTime: '2026-09-21',
    timeSlot: '08:30 AM',
    status: 'Completed',
    createdVia: 'AI Voice',
    amount: 1450,
    notes: 'Sample collected by Tech Priya'
  },
  {
    id: 'APT-1043',
    patientId: 'PAT-1043',
    patientName: 'Sunita Patil',
    phone: '+91 98220 23456',
    testName: 'Thyroid Profile & Lipid Panel',
    doctorName: 'Dr. Rajesh Mehta',
    dateTime: '2026-09-21',
    timeSlot: '09:15 AM',
    status: 'Completed',
    createdVia: 'WhatsApp',
    amount: 1800,
    notes: 'Under Pathologist review'
  },
  {
    id: 'APT-1044',
    patientId: 'PAT-1044',
    patientName: 'Amol Kadam',
    phone: '+91 98220 34567',
    testName: 'Complete Blood Count (CBC)',
    doctorName: 'Dr. Rajesh Mehta',
    dateTime: '2026-09-21',
    timeSlot: '11:00 AM',
    status: 'Confirmed',
    createdVia: 'AI Voice',
    amount: 450,
    notes: 'Patient confirmed via WhatsApp 2-hr reminder'
  },
  {
    id: 'APT-1045',
    patientId: 'PAT-1046',
    patientName: 'Vinayak Pawar',
    phone: '+91 98220 56789',
    testName: 'MRI Right Knee Joint',
    doctorName: 'Dr. Ananya Deshmukh',
    dateTime: '2026-09-21',
    timeSlot: '02:00 PM',
    status: 'Confirmed',
    createdVia: 'Reception',
    amount: 3500,
    notes: 'Fast 4 hours before MRI contrast'
  },
  {
    id: 'APT-1046',
    patientId: 'PAT-1047',
    patientName: 'Swati Shinde',
    phone: '+91 98220 67890',
    testName: 'Vitamin D3 & B12 Assay',
    doctorName: 'Dr. Rajesh Mehta',
    dateTime: '2026-09-22',
    timeSlot: '09:00 AM',
    status: 'Pending',
    createdVia: 'Patient Portal',
    amount: 1600,
    notes: 'Home sample collection requested'
  },
  {
    id: 'APT-1047',
    patientId: 'PAT-1045',
    patientName: 'Meena Deshmukh',
    phone: '+91 98220 45678',
    testName: 'Kidney Function Test (KFT)',
    doctorName: 'Dr. Rajesh Mehta',
    dateTime: '2026-09-21',
    timeSlot: '04:30 PM',
    status: 'Cancelled',
    createdVia: 'WhatsApp',
    amount: 1200,
    notes: 'Patient rescheduled due to travel'
  }
];

export const INITIAL_REPORTS: DiagnosticReport[] = [
  {
    id: 'REP-RX221',
    reportNumber: 'DDC/2026/09/RX221',
    patientId: 'PAT-1042',
    patientName: 'Rohan Joshi',
    patientAge: 38,
    patientGender: 'Male',
    testName: 'CBC + HbA1c & Fasting Glucose',
    category: 'Haematology',
    sampleDate: '2026-09-21 08:35 AM',
    reportedDate: '2026-09-21 11:15 AM',
    technicianName: 'Priya Shinde',
    pathologistName: 'Dr. Rajesh Mehta',
    status: 'Verified',
    deliveryMethod: 'WhatsApp',
    deliveryTimestamp: '2026-09-21 11:20 AM',
    pathologistRemarks: 'Haematological parameters are within normal limits. Glycated Haemoglobin (HbA1c) indicates good glycemic control.',
    results: [
      { parameter: 'Haemoglobin (Hb)', value: '14.8', unit: 'g/dL', refRange: '13.0 - 17.0', status: 'Normal' },
      { parameter: 'Total WBC Count', value: '7,400', unit: '/cumm', refRange: '4,000 - 11,000', status: 'Normal' },
      { parameter: 'Platelet Count', value: '2.45', unit: 'Lakh/cumm', refRange: '1.5 - 4.5', status: 'Normal' },
      { parameter: 'HbA1c (Glycated Hb)', value: '5.6', unit: '%', refRange: '< 5.7 (Normal)', status: 'Normal' },
      { parameter: 'Fasting Plasma Glucose', value: '94', unit: 'mg/dL', refRange: '70 - 99', status: 'Normal' }
    ]
  },
  {
    id: 'REP-RX222',
    reportNumber: 'DDC/2026/09/RX222',
    patientId: 'PAT-1043',
    patientName: 'Sunita Patil',
    patientAge: 52,
    patientGender: 'Female',
    testName: 'Thyroid Profile (T3, T4, TSH)',
    category: 'Endocrinology',
    sampleDate: '2026-09-21 09:20 AM',
    reportedDate: '2026-09-21 11:45 AM',
    technicianName: 'Priya Shinde',
    pathologistName: 'Dr. Rajesh Mehta',
    status: 'Under Review',
    pathologistRemarks: 'Elevated TSH levels observed. Clinical correlation with dosage adjustment advised.',
    results: [
      { parameter: 'Total Triiodothyronine (T3)', value: '1.10', unit: 'ng/mL', refRange: '0.8 - 2.0', status: 'Normal' },
      { parameter: 'Total Thyroxine (T4)', value: '6.4', unit: 'ug/dL', refRange: '5.1 - 14.1', status: 'Normal' },
      { parameter: 'Thyroid Stimulating Hormone (TSH)', value: '6.85', unit: 'uIU/mL', refRange: '0.4 - 4.2', status: 'High' }
    ]
  },
  {
    id: 'REP-RX220',
    reportNumber: 'DDC/2026/09/RX220',
    patientId: 'PAT-1044',
    patientName: 'Amol Kadam',
    patientAge: 29,
    patientGender: 'Male',
    testName: 'Complete Blood Count (CBC)',
    category: 'Haematology',
    sampleDate: '2026-09-20 11:10 AM',
    reportedDate: '2026-09-20 02:00 PM',
    technicianName: 'Priya Shinde',
    pathologistName: 'Dr. Rajesh Mehta',
    status: 'Delivered',
    deliveryMethod: 'WhatsApp',
    deliveryTimestamp: '2026-09-20 02:05 PM',
    pathologistRemarks: 'Mild leucocytosis noted. Viral screen suggested if fever persists.',
    results: [
      { parameter: 'Haemoglobin (Hb)', value: '13.2', unit: 'g/dL', refRange: '13.0 - 17.0', status: 'Normal' },
      { parameter: 'Total WBC Count', value: '12,200', unit: '/cumm', refRange: '4,000 - 11,000', status: 'High' },
      { parameter: 'Platelet Count', value: '1.95', unit: 'Lakh/cumm', refRange: '1.5 - 4.5', status: 'Normal' }
    ]
  },
  {
    id: 'REP-RX219',
    reportNumber: 'DDC/2026/09/RX219',
    patientId: 'PAT-1045',
    patientName: 'Meena Deshmukh',
    patientAge: 61,
    patientGender: 'Female',
    testName: 'Lipid Profile & Renal Function',
    category: 'Biochemistry',
    sampleDate: '2026-09-19 09:00 AM',
    reportedDate: '2026-09-19 01:30 PM',
    technicianName: 'Priya Shinde',
    pathologistName: 'Dr. Rajesh Mehta',
    status: 'Delivered',
    deliveryMethod: 'Handover',
    deliveryTimestamp: '2026-09-19 04:00 PM',
    pathologistRemarks: 'Serum Cholesterol moderately elevated. Renal parameters normal.',
    results: [
      { parameter: 'Serum Cholesterol', value: '235', unit: 'mg/dL', refRange: '< 200', status: 'High' },
      { parameter: 'Serum Triglycerides', value: '185', unit: 'mg/dL', refRange: '< 150', status: 'High' },
      { parameter: 'HDL Cholesterol', value: '48', unit: 'mg/dL', refRange: '> 40', status: 'Normal' },
      { parameter: 'Blood Urea Nitrogen', value: '14.2', unit: 'mg/dL', refRange: '7.0 - 20.0', status: 'Normal' },
      { parameter: 'Serum Creatinine', value: '0.85', unit: 'mg/dL', refRange: '0.6 - 1.1', status: 'Normal' }
    ]
  }
];

export const INITIAL_AI_CALLS: AiCallRecord[] = [
  {
    id: 'CALL-901',
    callerName: 'Rohan Joshi',
    phone: '+91 98220 12345',
    timestamp: '2026-09-21 08:12 AM',
    duration: '1m 45s',
    reason: 'Appointment booking',
    status: 'AI Handled',
    aiSummary: 'Patient requested fasting glucose and HbA1c test for 8:30 AM today. Confirmed 12-hour fasting requirement and created appointment APT-1042.',
    appointmentCreated: 'APT-1042',
    transcript: [
      { sender: 'AI', text: 'Namaskar! Welcome to Disha Diagnostic Centre, Tarabai Park, Kolhapur. I am your AI assistant. How may I help you today?', time: '08:12 AM' },
      { sender: 'Caller', text: 'Hello, I want to book a blood test for Fasting Blood Sugar and HbA1c today morning.', time: '08:12 AM' },
      { sender: 'AI', text: 'Sure! We have an open slot at 8:30 AM today with Dr. Rajesh Mehta. May I have your full name and address in Kolhapur?', time: '08:13 AM' },
      { sender: 'Caller', text: 'Rohan Joshi, Plot 45, Tarabai Park.', time: '08:13 AM' },
      { sender: 'AI', text: 'Thank you Mr. Rohan Joshi. I have booked your appointment for CBC, Fasting Glucose & HbA1c at 8:30 AM today. Total cost is ₹1,450. Please remain fasted for at least 10 hours. I have sent confirmation via WhatsApp.', time: '08:14 AM' }
    ]
  },
  {
    id: 'CALL-902',
    callerName: 'Prakash Patil',
    phone: '+91 98220 88990',
    timestamp: '2026-09-21 09:40 AM',
    duration: '2m 10s',
    reason: 'Price enquiry',
    status: 'AI Handled',
    aiSummary: 'Inquired about Full Body Senior Citizen Health Checkup package price and fasting instructions. Shared details & WhatsApp PDF brochure.',
    transcript: [
      { sender: 'AI', text: 'Namaskar! Disha Diagnostic Centre Kolhapur. How can I assist you?', time: '09:40 AM' },
      { sender: 'Caller', text: 'What is the price for Full Body Senior Citizen Checkup for my mother?', time: '09:40 AM' },
      { sender: 'AI', text: 'Our Senior Citizen Comprehensive Package includes 62 tests including CBC, Lipid, Liver, Kidney, Thyroid & HbA1c for ₹2,999. Would you like me to send the complete test list on WhatsApp?', time: '09:41 AM' },
      { sender: 'Caller', text: 'Yes please send on this mobile number.', time: '09:41 AM' }
    ]
  },
  {
    id: 'CALL-903',
    callerName: 'Sunita Patil',
    phone: '+91 98220 23456',
    timestamp: '2026-09-21 10:15 AM',
    duration: '3m 05s',
    reason: 'Report status',
    status: 'Transferred to Staff',
    aiSummary: 'Patient inquired about Thyroid report status. AI checked status (Under Pathologist Review) and transferred to receptionist Rahul for urgent clearance.',
    transcript: [
      { sender: 'AI', text: 'Namaskar! Welcome to Disha Diagnostic Centre. How can I help you?', time: '10:15 AM' },
      { sender: 'Caller', text: 'I gave sample for Thyroid test at 9:15 AM. Is my report ready? I need to show my doctor at 11:30 AM.', time: '10:15 AM' },
      { sender: 'AI', text: 'Let me check Mrs. Sunita Patil. Your test sample is currently under Dr. Rajesh Mehta\'s pathologist verification. Since you need it urgently, transferring your call to receptionist Rahul Sharma.', time: '10:16 AM' }
    ]
  },
  {
    id: 'CALL-904',
    callerName: 'Kiran Mane',
    phone: '+91 98220 99112',
    timestamp: '2026-09-21 11:02 AM',
    duration: '0m 45s',
    reason: 'General enquiry',
    status: 'Missed',
    aiSummary: 'Caller disconnected before AI could finalize response regarding MRI appointment timings.',
    transcript: [
      { sender: 'AI', text: 'Namaskar! Disha Diagnostic Centre Kolhapur.', time: '11:02 AM' },
      { sender: 'Caller', text: 'Do you have MRI scanning open on Sundays?', time: '11:02 AM' }
    ]
  }
];

export const INITIAL_WHATSAPP_AUTOMATIONS: WhatsappAutomation[] = [
  {
    id: 'WA-1',
    title: 'Instant Appointment Confirmation',
    type: 'appointment_confirmation',
    triggerEvent: 'When appointment is created via AI Voice, Portal or Reception',
    active: true,
    messagesSentToday: 42,
    template: `Namaskar {{patient_name}}! 🏥\nYour appointment at *Disha Diagnostic Centre, Kolhapur* is CONFIRMED.\n\n📅 Date: {{date}}\n⏰ Time: {{time}}\n🧪 Test: {{test_name}}\n📍 Location: Tarabai Park, Kolhapur\n\nFast for {{fasting_hours}} hours before your test.\nNeed help? Reply to this chat.`
  },
  {
    id: 'WA-2',
    title: '24-Hour Prior Reminder',
    type: 'reminder_24h',
    triggerEvent: '24 hours prior to scheduled appointment slot',
    active: true,
    messagesSentToday: 38,
    template: `Hello {{patient_name}}, friendly reminder of your diagnostic appointment tomorrow at {{time}} for {{test_name}} at Disha Diagnostic Centre, Kolhapur.\n\nPlease carry previous medical records if any.`
  },
  {
    id: 'WA-3',
    title: '2-Hour Prior Fasting & Location Reminder',
    type: 'reminder_2h',
    triggerEvent: '2 hours prior to scheduled appointment slot',
    active: true,
    messagesSentToday: 29,
    template: `Alert: {{patient_name}}, your test appointment is in 2 hours ({{time}}). Please head to Disha Diagnostic Centre, Tarabai Park, Kolhapur.\nGoogle Maps: https://maps.google.com/disha-kolhapur`
  },
  {
    id: 'WA-4',
    title: 'Diagnostic Report Ready & Secure Portal Link',
    type: 'report_ready',
    triggerEvent: 'When Pathologist verifies and approves diagnostic report',
    active: true,
    messagesSentToday: 54,
    template: `Dear {{patient_name}}, your test report for *{{test_name}}* is READY! 📄\n\nVerified by: {{pathologist_name}}\nReport ID: {{report_number}}\n\nClick secure link to view & download your PDF report:\n{{secure_portal_link}}\n\nDisha Diagnostic Centre, Kolhapur`
  },
  {
    id: 'WA-5',
    title: 'Post-Visit Feedback & Health Care Follow-up',
    type: 'post_visit',
    triggerEvent: '6 hours after report delivery',
    active: true,
    messagesSentToday: 21,
    template: `Dear {{patient_name}}, thank you for visiting Disha Diagnostic Centre Kolhapur. How was your experience today? Rate us from 1 to 5 stars by replying to this message.`
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'AUD-501',
    timestamp: '2026-09-21 11:16 AM',
    staffName: 'Priya Shinde',
    role: 'Lab Technician',
    action: 'Updated Sample & Result Data',
    module: 'Diagnostic Reports',
    recordId: 'REP-RX222',
    status: 'Success'
  },
  {
    id: 'AUD-502',
    timestamp: '2026-09-21 11:05 AM',
    staffName: 'Dr. Rajesh Mehta',
    role: 'Doctor / Pathologist',
    action: 'Verified & Approved Diagnostic Report',
    module: 'Diagnostic Reports',
    recordId: 'REP-RX221',
    status: 'Success'
  },
  {
    id: 'AUD-503',
    timestamp: '2026-09-21 10:42 AM',
    staffName: 'Rahul Sharma',
    role: 'Receptionist',
    action: 'Created New Appointment (Walk-in)',
    module: 'Appointments',
    recordId: 'APT-1045',
    status: 'Success'
  },
  {
    id: 'AUD-504',
    timestamp: '2026-09-21 09:15 AM',
    staffName: 'Vikram Patil',
    role: 'Operations Manager',
    action: 'Modified WhatsApp Automation Schedule',
    module: 'WhatsApp Automation',
    recordId: 'WA-3',
    status: 'Success'
  },
  {
    id: 'AUD-505',
    timestamp: '2026-09-21 08:30 AM',
    staffName: 'System AI Voice Assistant',
    role: 'AI Receptionist',
    action: 'Auto-Created Appointment from Call',
    module: 'AI Voice Receptionist',
    recordId: 'CALL-901',
    status: 'Success'
  }
];

export const ROLE_MATRIX_DATA: RoleMatrixRow[] = [
  {
    role: 'owner',
    roleTitle: 'Owner / Admin',
    permissions: {
      landing: 'full',
      dashboard: 'full',
      appointments: 'full',
      patients: 'full',
      ai_receptionist: 'full',
      whatsapp: 'full',
      samples_tests: 'full',
      reports: 'full',
      billing: 'full',
      analytics: 'full',
      staff: 'full',
      settings: 'full',
      audit_logs: 'full',
      system_flow: 'full',
      role_matrix: 'full',
      user_journeys: 'full'
    }
  },
  {
    role: 'ops_manager',
    roleTitle: 'Operations Manager',
    permissions: {
      landing: 'full',
      dashboard: 'full',
      appointments: 'full',
      patients: 'full',
      ai_receptionist: 'view',
      whatsapp: 'full',
      samples_tests: 'view',
      reports: 'view',
      billing: 'view',
      analytics: 'full',
      staff: 'none',
      settings: 'action',
      audit_logs: 'view',
      system_flow: 'full',
      role_matrix: 'full',
      user_journeys: 'full'
    }
  },
  {
    role: 'receptionist',
    roleTitle: 'Receptionist',
    permissions: {
      landing: 'full',
      dashboard: 'full',
      appointments: 'full',
      patients: 'action',
      ai_receptionist: 'view',
      whatsapp: 'action',
      samples_tests: 'none',
      reports: 'view',
      billing: 'none',
      analytics: 'none',
      staff: 'none',
      settings: 'none',
      audit_logs: 'none',
      system_flow: 'full',
      role_matrix: 'full',
      user_journeys: 'full'
    }
  },
  {
    role: 'lab_tech',
    roleTitle: 'Lab Technician',
    permissions: {
      landing: 'full',
      dashboard: 'full',
      appointments: 'view',
      patients: 'view',
      ai_receptionist: 'none',
      whatsapp: 'none',
      samples_tests: 'full',
      reports: 'action',
      billing: 'none',
      analytics: 'none',
      staff: 'none',
      settings: 'none',
      audit_logs: 'none',
      system_flow: 'full',
      role_matrix: 'full',
      user_journeys: 'full'
    }
  },
  {
    role: 'pathologist',
    roleTitle: 'Doctor / Pathologist',
    permissions: {
      landing: 'full',
      dashboard: 'full',
      appointments: 'view',
      patients: 'view',
      ai_receptionist: 'none',
      whatsapp: 'action',
      samples_tests: 'view',
      reports: 'full',
      billing: 'none',
      analytics: 'none',
      staff: 'none',
      settings: 'none',
      audit_logs: 'none',
      system_flow: 'full',
      role_matrix: 'full',
      user_journeys: 'full'
    }
  },
  {
    role: 'accounts',
    roleTitle: 'Accounts / Billing',
    permissions: {
      landing: 'full',
      dashboard: 'full',
      appointments: 'view',
      patients: 'view',
      ai_receptionist: 'none',
      whatsapp: 'none',
      samples_tests: 'none',
      reports: 'none',
      billing: 'full',
      analytics: 'full',
      staff: 'none',
      settings: 'none',
      audit_logs: 'view',
      system_flow: 'full',
      role_matrix: 'full',
      user_journeys: 'full'
    }
  }
];

export const USER_JOURNEYS: UserJourney[] = [
  {
    role: 'owner',
    title: 'Owner / Executive Admin Journey',
    steps: [
      { stepNumber: 1, title: 'Staff Login', description: 'Log in as Dr. Ananya Deshmukh (Owner)', targetModule: 'dashboard' },
      { stepNumber: 2, title: 'Executive Overview', description: 'Inspect Revenue, AI efficiency, today’s 62 appointments & report turnaround.', targetModule: 'dashboard' },
      { stepNumber: 3, title: 'Business Analytics', description: 'Review high-growth diagnostic test revenue & cancellation rates.', targetModule: 'analytics' },
      { stepNumber: 4, title: 'Staff & Role Permissions', description: 'Manage staff roles, department access, and security toggles.', targetModule: 'staff' },
      { stepNumber: 5, title: 'Audit Trail', description: 'Inspect real-time compliance audit logs for verified clinical reports.', targetModule: 'audit_logs' }
    ]
  },
  {
    role: 'receptionist',
    title: 'Receptionist Front-Desk Journey',
    steps: [
      { stepNumber: 1, title: 'Receptionist Login', description: 'Log in as Rahul Sharma (Receptionist)', targetModule: 'dashboard' },
      { stepNumber: 2, title: 'Appointment Scheduling', description: 'Filter today’s appointments, search patient Rohan Joshi.', targetModule: 'appointments' },
      { stepNumber: 3, title: 'Add Walk-in Appointment', description: 'Create new appointment for walk-in patient with fasting instructions.', targetModule: 'appointments' },
      { stepNumber: 4, title: 'Send WhatsApp Instant Confirmation', description: 'Trigger instant WhatsApp appointment voucher to patient.', targetModule: 'whatsapp' },
      { stepNumber: 5, title: 'AI Call Escalation Handover', description: 'View calls transferred from AI Receptionist requiring receptionist intervention.', targetModule: 'ai_receptionist' }
    ]
  },
  {
    role: 'lab_tech',
    title: 'Lab Technician Sample Journey',
    steps: [
      { stepNumber: 1, title: 'Lab Tech Login', description: 'Log in as Priya Shinde (Lab Technician)', targetModule: 'dashboard' },
      { stepNumber: 2, title: 'Today’s Samples Worklist', description: 'Check incoming blood samples for PAT-1043 (Sunita Patil).', targetModule: 'reports' },
      { stepNumber: 3, title: 'Sample Collection & Result Entry', description: 'Enter Haematology & Thyroid parameter values (T3, T4, TSH).', targetModule: 'reports' },
      { stepNumber: 4, title: 'Submit for Verification', description: 'Submit draft report for Pathologist clinical review.', targetModule: 'reports' }
    ]
  },
  {
    role: 'pathologist',
    title: 'Doctor / Pathologist Verification Journey',
    steps: [
      { stepNumber: 1, title: 'Pathologist Login', description: 'Log in as Dr. Rajesh Mehta (MD Pathologist)', targetModule: 'dashboard' },
      { stepNumber: 2, title: 'Reports Awaiting Verification', description: 'Filter reports under status "Under Review".', targetModule: 'reports' },
      { stepNumber: 3, title: 'Clinical Review & Remarks', description: 'Inspect test values against reference ranges and add clinical remarks.', targetModule: 'reports' },
      { stepNumber: 4, title: 'Approve & Release Report', description: 'Digitally sign & approve report. Automatically triggers WhatsApp delivery notification.', targetModule: 'reports' }
    ]
  },
  {
    role: 'accounts',
    title: 'Accounts & Billing Journey',
    steps: [
      { stepNumber: 1, title: 'Accounts Login', description: 'Log in as Suresh Kulkarni (Finance Head)', targetModule: 'billing' },
      { stepNumber: 2, title: 'Billing Dashboard', description: 'View total daily collections (₹48,900) & pending test dues.', targetModule: 'billing' },
      { stepNumber: 3, title: 'Invoice & Payment Receipt', description: 'Generate GST compliant invoice & payment receipt for PAT-1042.', targetModule: 'billing' }
    ]
  },
  {
    role: 'ops_manager',
    title: 'Operations Manager Monitoring Journey',
    steps: [
      { stepNumber: 1, title: 'Ops Login', description: 'Log in as Vikram Patil (Ops Manager)', targetModule: 'dashboard' },
      { stepNumber: 2, title: 'AI Voice Receptionist Performance', description: 'Monitor 88% AI call resolution rate & average duration.', targetModule: 'ai_receptionist' },
      { stepNumber: 3, title: 'WhatsApp Automation Controls', description: 'Verify 24-hr & 2-hr reminder message delivery rates.', targetModule: 'whatsapp' }
    ]
  },
  {
    role: 'patient',
    title: 'Patient Portal Mobile Journey',
    steps: [
      { stepNumber: 1, title: 'Patient Login / OTP', description: 'Patient Rohan Joshi (+91 98220 12345) logs into mobile portal.', targetModule: 'dashboard' },
      { stepNumber: 2, title: 'Book Test Appointment', description: 'Select diagnostic test, date, time slot & fasting preference.', targetModule: 'appointments' },
      { stepNumber: 3, title: 'View & Download Report', description: 'Open verified diagnostic report PDF with official Disha letterhead.', targetModule: 'reports' }
    ]
  }
];
