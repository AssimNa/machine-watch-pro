// Types
export interface Machine {
  id: string;
  name: string;
  reference: string;
  location: string;
  installationDate: string;
  technicalDocUrl?: string;
  image?: string;
  status: 'operational' | 'maintenance' | 'broken';
  lastMaintenance?: string;
  nextMaintenance?: string;
  department?: string;
}

export type InterventionType = 'preventive' | 'corrective';
export type InterventionStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';

export interface Intervention {
  id: string;
  machineId: string;
  technicianId: string;
  type: InterventionType;
  status: InterventionStatus;
  startDate: string;
  endDate?: string;
  cost?: number;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'technician' | 'manager' | 'admin';
}

// Mock data
export const machines = [
  {
    id: "1",
    name: "CNC Mill T-800",
    reference: "CNC-800-X",
    location: "Building A - Floor 2",
    department: "Production",
    installationDate: "2022-01-15",
    lastMaintenance: "2023-01-05",
    nextMaintenance: "2023-07-10",
    status: "operational",
    image: "/lovable-uploads/b6cb4be3-9631-48b3-9988-f0956cc84f18.png"
  },
  {
    id: "2",
    name: "Hydraulic Press HP-5000",
    reference: "HP-5000-A",
    location: "Building B - Floor 1",
    department: "Fabrication",
    installationDate: "2021-08-23",
    lastMaintenance: "2023-02-12",
    nextMaintenance: "2023-06-12",
    status: "maintenance",
    image: null
  },
  {
    id: "3",
    name: "Laser Cutter LC-X2",
    reference: "LC-X2-Ultra",
    location: "Building A - Floor 1",
    department: "Precision Cutting",
    installationDate: "2022-05-17",
    lastMaintenance: "2023-03-01",
    nextMaintenance: "2023-09-01",
    status: "operational",
    image: null
  },
  {
    id: "4",
    name: "Metal Testing Unit MTU-7",
    reference: "MTU-7-Pro",
    location: "Building C - Lab Area",
    department: "Quality Control",
    installationDate: "2021-11-30",
    lastMaintenance: "2023-01-18",
    nextMaintenance: "2023-07-18",
    status: "broken",
    image: null
  },
  {
    id: "5",
    name: "Robotic Arm RA-9",
    reference: "RA-9-Plus",
    location: "Building B - Floor 2",
    department: "Assembly",
    installationDate: "2022-03-24",
    lastMaintenance: "2023-02-28",
    nextMaintenance: "2023-06-28",
    status: "offline",
    image: null
  },
  {
    id: "6",
    name: "Industrial Furnace IF-3000",
    reference: "IF-3000-HT",
    location: "Building D - Heat Treatment",
    department: "Heat Treatment",
    installationDate: "2021-07-12",
    lastMaintenance: "2023-04-10",
    nextMaintenance: "2023-10-10",
    status: "operational",
    image: null
  }
];

export const interventions: Intervention[] = [
  {
    id: '1',
    machineId: '2',
    technicianId: '1',
    type: 'preventive',
    status: 'in_progress',
    startDate: '2023-07-15T09:00:00',
    description: 'Maintenance préventive - Changement des filtres et lubrification',
    priority: 'medium',
  },
  {
    id: '2',
    machineId: '3',
    technicianId: '2',
    type: 'corrective',
    status: 'pending',
    startDate: '2023-07-16T10:30:00',
    description: 'Panne hydraulique - Fuite au niveau du vérin principal',
    priority: 'high',
  },
  {
    id: '3',
    machineId: '5',
    technicianId: '1',
    type: 'preventive',
    status: 'completed',
    startDate: '2023-07-10T14:00:00',
    endDate: '2023-07-10T16:30:00',
    cost: 350,
    description: 'Maintenance préventive - Vérification tension courroie et alignement',
    priority: 'low',
  },
  {
    id: '4',
    machineId: '1',
    technicianId: '3',
    type: 'corrective',
    status: 'completed',
    startDate: '2023-07-08T11:00:00',
    endDate: '2023-07-08T14:15:00',
    cost: 520,
    description: 'Remplacement moteur broche suite à surchauffe',
    priority: 'critical',
  },
  {
    id: '5',
    machineId: '4',
    technicianId: '2',
    type: 'preventive',
    status: 'cancelled',
    startDate: '2023-07-12T09:00:00',
    description: 'Calibration des axes du robot - Annulé car machine en production',
    priority: 'medium',
  },
];

export const users: User[] = [
  {
    id: '1',
    name: 'Thomas Durand',
    email: 'thomas.durand@example.com',
    role: 'technician',
  },
  {
    id: '2',
    name: 'Sophie Martin',
    email: 'sophie.martin@example.com',
    role: 'technician',
  },
  {
    id: '3',
    name: 'Jean Dupont',
    email: 'jean.dupont@example.com',
    role: 'manager',
  },
  {
    id: '4',
    name: 'Admin',
    email: 'admin@example.com',
    role: 'admin',
  },
];

// Helper function to get machine by ID
export const getMachineById = (id: string): Machine | undefined => {
  return machines.find(machine => machine.id === id);
};

// Helper function to get interventions by machine ID
export const getInterventionsByMachineId = (machineId: string): Intervention[] => {
  return interventions.filter(intervention => intervention.machineId === machineId);
};

// Helper function to get user by ID
export const getUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id);
};
