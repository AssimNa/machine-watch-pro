
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
export const machines: Machine[] = [
  {
    id: '1',
    name: 'Machine CNC Alpha',
    reference: 'CNC-2023-A',
    location: 'Atelier Principal - Zone A',
    installationDate: '2023-01-15',
    technicalDocUrl: '/docs/cnc-alpha-manual.pdf',
    status: 'operational',
    lastMaintenance: '2023-06-10',
  },
  {
    id: '2',
    name: 'Fraiseuse Beta',
    reference: 'FR-2021-B',
    location: 'Atelier Principal - Zone B',
    installationDate: '2021-05-22',
    technicalDocUrl: '/docs/fraiseuse-beta-manual.pdf',
    status: 'maintenance',
    lastMaintenance: '2023-05-05',
  },
  {
    id: '3',
    name: 'Presse Hydraulique Delta',
    reference: 'PH-2020-D',
    location: 'Atelier Secondaire',
    installationDate: '2020-11-30',
    technicalDocUrl: '/docs/presse-delta-manual.pdf',
    status: 'broken',
    lastMaintenance: '2023-04-15',
  },
  {
    id: '4',
    name: 'Robot Soudeur Gamma',
    reference: 'RS-2022-G',
    location: 'Atelier Principal - Zone C',
    installationDate: '2022-08-17',
    technicalDocUrl: '/docs/robot-gamma-manual.pdf',
    status: 'operational',
    lastMaintenance: '2023-07-01',
  },
  {
    id: '5',
    name: 'Convoyeur Omega',
    reference: 'CV-2019-O',
    location: 'Ligne d\'assemblage',
    installationDate: '2019-03-10',
    technicalDocUrl: '/docs/convoyeur-omega-manual.pdf',
    status: 'operational',
    lastMaintenance: '2023-06-20',
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
