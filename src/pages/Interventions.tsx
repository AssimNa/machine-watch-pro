
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
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Plus, Filter } from "lucide-react";
import { interventions, machines, getUserById } from "@/data/mockData";
import AddInterventionForm from "@/components/AddInterventionForm";

const Interventions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Filter interventions based on search term, status filter, and type filter
  const filteredInterventions = interventions.filter(intervention => {
    const machine = machines.find(m => m.id === intervention.machineId);
    const technician = getUserById(intervention.technicianId);
    
    const searchFields = [
      machine?.name || '',
      machine?.reference || '',
      technician?.name || '',
      intervention.description
    ].map(field => field.toLowerCase());
    
    const matchesSearch = searchTerm === '' || 
      searchFields.some(field => field.includes(searchTerm.toLowerCase()));
    
    const matchesStatus = !filterStatus || intervention.status === filterStatus;
    const matchesType = !filterType || intervention.type === filterType;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getInterventionStatusBadge = (status: string) => {
    switch(status) {
      case 'pending':
        return <Badge variant="outline" className="border-yellow-500 text-yellow-700">En attente</Badge>;
      case 'in_progress':
        return <Badge className="bg-blue-600">En cours</Badge>;
      case 'completed':
        return <Badge className="bg-green-600">Terminée</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="border-gray-500 text-gray-700">Annulée</Badge>;
      default:
        return <Badge>Inconnu</Badge>;
    }
  };

  const getInterventionTypeBadge = (type: string) => {
    switch(type) {
      case 'preventive':
        return <Badge variant="outline" className="border-blue-500 text-blue-700">Préventive</Badge>;
      case 'corrective':
        return <Badge variant="outline" className="border-red-500 text-red-700">Corrective</Badge>;
      default:
        return <Badge variant="outline">Inconnu</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch(priority) {
      case 'low':
        return <Badge variant="outline" className="border-gray-400 text-gray-600">Basse</Badge>;
      case 'medium':
        return <Badge variant="outline" className="border-blue-400 text-blue-600">Moyenne</Badge>;
      case 'high':
        return <Badge variant="outline" className="border-orange-500 text-orange-700">Haute</Badge>;
      case 'critical':
        return <Badge className="bg-red-600">Critique</Badge>;
      default:
        return <Badge variant="outline">Inconnue</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Interventions</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nouvelle intervention
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Nouvelle intervention</DialogTitle>
            </DialogHeader>
            <AddInterventionForm onSuccess={() => setIsDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher dans les interventions..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex flex-col gap-4 md:flex-row md:justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Statut:</span>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={filterStatus === null ? "secondary" : "outline"}
                size="sm"
                onClick={() => setFilterStatus(null)}
              >
                Tous
              </Button>
              <Button
                variant={filterStatus === "pending" ? "secondary" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("pending")}
              >
                En attente
              </Button>
              <Button
                variant={filterStatus === "in_progress" ? "secondary" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("in_progress")}
              >
                En cours
              </Button>
              <Button
                variant={filterStatus === "completed" ? "secondary" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("completed")}
              >
                Terminée
              </Button>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Type:</span>
            <div className="flex gap-2">
              <Button
                variant={filterType === null ? "secondary" : "outline"}
                size="sm"
                onClick={() => setFilterType(null)}
              >
                Tous
              </Button>
              <Button
                variant={filterType === "preventive" ? "secondary" : "outline"}
                size="sm"
                onClick={() => setFilterType("preventive")}
              >
                Préventive
              </Button>
              <Button
                variant={filterType === "corrective" ? "secondary" : "outline"}
                size="sm"
                onClick={() => setFilterType("corrective")}
              >
                Corrective
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Machine</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Priorité</TableHead>
              <TableHead>Technicien</TableHead>
              <TableHead>Statut</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInterventions.length > 0 ? (
              filteredInterventions.map((intervention) => {
                const machine = machines.find(m => m.id === intervention.machineId);
                const technician = getUserById(intervention.technicianId);
                
                return (
                  <TableRow key={intervention.id}>
                    <TableCell>
                      <Link to={`/interventions/${intervention.id}`} className="text-primary hover:underline">
                        {new Date(intervention.startDate).toLocaleDateString()}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link to={`/machines/${machine?.id}`} className="text-primary hover:underline">
                        {machine?.name || 'Machine inconnue'}
                      </Link>
                    </TableCell>
                    <TableCell>{getInterventionTypeBadge(intervention.type)}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{intervention.description}</TableCell>
                    <TableCell>{getPriorityBadge(intervention.priority)}</TableCell>
                    <TableCell>{technician?.name || 'Non assigné'}</TableCell>
                    <TableCell>{getInterventionStatusBadge(intervention.status)}</TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  Aucune intervention trouvée.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Interventions;
