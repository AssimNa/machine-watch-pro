
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Filter } from "lucide-react";
import { machines } from "@/data/mockData";
import AddMachineForm from "@/components/AddMachineForm";

const Machines = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Filter machines based on search term and status filter
  const filteredMachines = machines.filter(machine => {
    const matchesSearch = 
      machine.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      machine.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      machine.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !filterStatus || machine.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getMachineStatusBadge = (status: string) => {
    switch(status) {
      case 'operational':
        return <Badge className="bg-green-600">Opérationnelle</Badge>;
      case 'maintenance':
        return <Badge className="bg-blue-600">En maintenance</Badge>;
      case 'broken':
        return <Badge className="bg-red-600">En panne</Badge>;
      default:
        return <Badge>Inconnu</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Machines</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Ajouter une machine
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Nouvelle machine</DialogTitle>
            </DialogHeader>
            <AddMachineForm onSuccess={() => setIsDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher une machine..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Filtrer par état:</span>
          <div className="flex gap-2">
            <Button
              variant={filterStatus === null ? "secondary" : "outline"}
              size="sm"
              onClick={() => setFilterStatus(null)}
            >
              Tous
            </Button>
            <Button
              variant={filterStatus === "operational" ? "secondary" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("operational")}
            >
              Opérationnel
            </Button>
            <Button
              variant={filterStatus === "maintenance" ? "secondary" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("maintenance")}
            >
              Maintenance
            </Button>
            <Button
              variant={filterStatus === "broken" ? "secondary" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("broken")}
            >
              En panne
            </Button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Référence</TableHead>
              <TableHead>Localisation</TableHead>
              <TableHead>Installation</TableHead>
              <TableHead>État</TableHead>
              <TableHead>Dernière maintenance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMachines.length > 0 ? (
              filteredMachines.map((machine) => (
                <TableRow key={machine.id}>
                  <TableCell className="font-medium">
                    <Link to={`/machines/${machine.id}`} className="text-primary hover:underline">
                      {machine.name}
                    </Link>
                  </TableCell>
                  <TableCell>{machine.reference}</TableCell>
                  <TableCell>{machine.location}</TableCell>
                  <TableCell>{new Date(machine.installationDate).toLocaleDateString()}</TableCell>
                  <TableCell>{getMachineStatusBadge(machine.status)}</TableCell>
                  <TableCell>
                    {machine.lastMaintenance ? new Date(machine.lastMaintenance).toLocaleDateString() : 'Jamais'}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  Aucune machine trouvée.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Machines;
