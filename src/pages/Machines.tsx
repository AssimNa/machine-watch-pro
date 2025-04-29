
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, Filter, Edit3, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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
        return <Badge className="bg-green-600 text-white">Opérationnel</Badge>;
      case 'maintenance':
        return <Badge className="bg-yellow-500 text-black">En maintenance</Badge>;
      case 'broken':
        return <Badge className="bg-red-600 text-white">En panne</Badge>;
      case 'offline':
        return <Badge className="bg-gray-400 text-white">Hors ligne</Badge>;
      default:
        return <Badge>Inconnu</Badge>;
    }
  };

  // Function to format the date to a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Machines</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-1 h-4 w-4" />
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
          <span className="text-sm text-muted-foreground hidden sm:inline">Filtrer par état:</span>
          <div className="flex gap-2 flex-wrap">
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

      {/* Machine cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMachines.length > 0 ? (
          filteredMachines.map((machine) => (
            <Card key={machine.id} className="overflow-hidden">
              <Link to={`/machines/${machine.id}`} className="block">
                <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                  {machine.image ? (
                    <img 
                      src={machine.image} 
                      alt={machine.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-gray-400 text-center p-4">
                      <span className="block">Aucune image</span>
                      <span className="text-xs">{machine.name}</span>
                    </div>
                  )}
                </div>
              </Link>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <Link to={`/machines/${machine.id}`} className="text-lg font-semibold text-primary hover:underline">
                    {machine.name}
                  </Link>
                  <div>
                    {getMachineStatusBadge(machine.status)}
                  </div>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Modèle:</span> {machine.reference}
                  </div>
                  <div>
                    <span className="font-medium">Localisation:</span> {machine.location}
                  </div>
                  <div>
                    <span className="font-medium">Service:</span> {machine.department || 'Non assigné'}
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4 text-xs text-gray-500">
                  <div>
                    <span className="block">Dernière maintenance:</span>
                    <span className="font-medium">
                      {machine.lastMaintenance ? formatDate(machine.lastMaintenance) : 'Jamais'}
                    </span>
                  </div>
                  <div>
                    <span className="block">Prochaine:</span>
                    <span className="font-medium">
                      {machine.nextMaintenance ? formatDate(machine.nextMaintenance) : 'Non planifiée'}
                    </span>
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" size="sm" className="h-8 px-2">
                    <Edit3 className="h-3.5 w-3.5 mr-1" />
                    Modifier
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 px-2 text-red-500 hover:text-red-700 hover:border-red-300">
                    <Trash2 className="h-3.5 w-3.5 mr-1" />
                    Supprimer
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full h-48 bg-gray-50 flex items-center justify-center rounded-lg">
            <p className="text-gray-500">Aucune machine trouvée.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Machines;
