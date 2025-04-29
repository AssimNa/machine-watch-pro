import { User } from "@/types";

export type MachineStatusType = "operational" | "maintenance" | "broken" | "offline";

export type Machine = {
  id: string;
  name: string;
  reference: string;
  location: string;
  department: string;
  installationDate: string;
  lastMaintenance: string;
  nextMaintenance: string;
  status: MachineStatusType;
  image: string;
  technicalDocUrl?: string; // Added this optional property
};

export type Intervention = {
  id: string;
  machineId: string;
  technicianId: string;
  type: "preventive" | "corrective";
  priority: "low" | "medium" | "high";
  status: "pending" | "in_progress" | "completed" | "cancelled";
  startDate: string;
  endDate: string | null;
  description: string;
  cost: number;
  parts: string[];
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  permissions: string[];
  name?: string; // Adding name property for compatibility
};

export const users: User[] = [
  {
    id: "u1",
    firstName: "Alice",
    lastName: "Smith",
    email: "alice.smith@example.com",
    role: "administrator",
    permissions: ["read", "write", "update", "delete"],
    name: "Alice Smith",
  },
  {
    id: "u2",
    firstName: "Bob",
    lastName: "Johnson",
    email: "bob.johnson@example.com",
    role: "manager",
    permissions: ["read", "write", "update"],
    name: "Bob Johnson",
  },
  {
    id: "u3",
    firstName: "Charlie",
    lastName: "Brown",
    email: "charlie.brown@example.com",
    role: "technician",
    permissions: ["read", "write"],
    name: "Charlie Brown",
  },
];

export const technicians = [
  {
    id: "t1",
    firstName: "David",
    lastName: "Williams",
    email: "david.williams@example.com",
    specialty: "Electrical",
    availability: true,
    name: "David Williams",
  },
  {
    id: "t2",
    firstName: "Emily",
    lastName: "Jones",
    email: "emily.jones@example.com",
    specialty: "Mechanical",
    availability: false,
    name: "Emily Jones",
  },
];

export const machines: Machine[] = [
  {
    id: "m1",
    name: "CNC Machine X7000",
    reference: "CNCX7000-123",
    location: "Production Hall A",
    department: "Manufacturing",
    installationDate: "2021-03-15",
    lastMaintenance: "2023-02-10",
    nextMaintenance: "2023-05-10",
    status: "operational",
    image: "https://images.unsplash.com/photo-1612968081277-a4b3ee4ae394?q=80&w=2003&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: "m2",
    name: "Hydraulic Press HP500",
    reference: "HP500-456",
    location: "Production Hall B",
    department: "Manufacturing",
    installationDate: "2020-06-22",
    lastMaintenance: "2023-01-05",
    nextMaintenance: "2023-04-05",
    status: "maintenance",
    image: "https://images.unsplash.com/photo-1620275765876-88e763c80678?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: "m3",
    name: "Assembly Robot AR200",
    reference: "AR200-789",
    location: "Assembly Line 1",
    department: "Assembly",
    installationDate: "2022-01-10",
    lastMaintenance: "2023-03-01",
    nextMaintenance: "2023-06-01",
    status: "broken",
    image: "https://images.unsplash.com/photo-1581093804475-577d72e13cfd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: "m4",
    name: "Laser Cutter LC1000",
    reference: "LC1000-101",
    location: "Cutting Department",
    department: "Manufacturing",
    installationDate: "2021-09-05",
    lastMaintenance: "2023-02-20",
    nextMaintenance: "2023-05-20",
    status: "operational",
    image: "https://images.unsplash.com/photo-1573298825661-bb2717599106?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: "m5",
    name: "Conveyor System CS500",
    reference: "CS500-202",
    location: "Packaging Area",
    department: "Logistics",
    installationDate: "2020-11-18",
    lastMaintenance: "2023-01-15",
    nextMaintenance: "2023-04-15",
    status: "operational",
    image: "https://images.unsplash.com/photo-1569135545544-e7bb01c2a024?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: "m6",
    name: "Industrial Oven IO300",
    reference: "IO300-303",
    location: "Heat Treatment Area",
    department: "Manufacturing",
    installationDate: "2022-02-28",
    lastMaintenance: "2023-03-10",
    nextMaintenance: "2023-06-10",
    status: "maintenance",
    image: "https://images.unsplash.com/photo-1518729597691-455180c7e0ec?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
  }
];

export const interventions = [
  {
    id: "i1",
    machineId: "m1",
    technicianId: "t1",
    type: "preventive",
    priority: "medium",
    status: "completed",
    startDate: "2023-02-10",
    endDate: "2023-02-10",
    description: "Scheduled maintenance and inspection.",
    cost: 500,
    parts: ["Filter", "Oil"],
  },
  {
    id: "i2",
    machineId: "m2",
    technicianId: "t2",
    type: "corrective",
    priority: "high",
    status: "in_progress",
    startDate: "2023-03-15",
    endDate: null,
    description: "Repair of hydraulic system failure.",
    cost: 1200,
    parts: ["Hydraulic Pump", "Seals"],
  },
  {
    id: "i3",
    machineId: "m3",
    technicianId: "t1",
    type: "corrective",
    priority: "high",
    status: "pending",
    startDate: "2023-03-20",
    endDate: null,
    description: "Troubleshooting and repair of robot arm malfunction.",
    cost: 800,
    parts: ["Servo Motor", "Wiring"],
  },
  {
    id: "i4",
    machineId: "m4",
    technicianId: "t2",
    type: "preventive",
    priority: "medium",
    status: "completed",
    startDate: "2023-02-20",
    endDate: "2023-02-20",
    description: "Laser alignment and lens cleaning.",
    cost: 300,
    parts: ["Lens Cleaning Solution"],
  },
  {
    id: "i5",
    machineId: "m5",
    technicianId: "t1",
    type: "preventive",
    priority: "low",
    status: "completed",
    startDate: "2023-01-15",
    endDate: "2023-01-15",
    description: "Belt inspection and lubrication.",
    cost: 150,
    parts: ["Lubricant"],
  },
  {
    id: "i6",
    machineId: "m6",
    technicianId: "t2",
    type: "corrective",
    priority: "medium",
    status: "completed",
    startDate: "2023-03-10",
    endDate: "2023-03-10",
    description: "Temperature sensor replacement.",
    cost: 400,
    parts: ["Temperature Sensor"],
  },
];

export const priorities = [
  {
    label: "High",
    value: "high",
  },
  {
    label: "Medium",
    value: "medium",
  },
  {
    label: "Low",
    value: "low",
  },
];

export const interventionTypes = [
  {
    label: "Preventive",
    value: "preventive",
  },
  {
    label: "Corrective",
    value: "corrective",
  },
];

export const interventionStatus = [
  {
    label: "Pending",
    value: "pending",
  },
  {
    label: "In Progress",
    value: "in_progress",
  },
  {
    label: "Completed",
    value: "completed",
  },
  {
    label: "Cancelled",
    value: "cancelled",
  },
];

export const getMachineById = (id: string): Machine | undefined => {
  return machines.find(machine => machine.id === id);
};

export const getInterventionsByMachineId = (machineId: string): Intervention[] => {
  return interventions.filter(intervention => intervention.machineId === machineId);
};

export const getUserById = (id: string): User | undefined => {
  // First check users array
  const user = users.find(user => user.id === id);
  if (user) return user;
  
  // Then check technicians array
  const technician = technicians.find(tech => tech.id === id);
  if (technician) return {
    id: technician.id,
    firstName: technician.firstName,
    lastName: technician.lastName,
    email: technician.email,
    role: "technician",
    permissions: ["read", "write"],
    name: `${technician.firstName} ${technician.lastName}`
  };
  
  return undefined;
};
