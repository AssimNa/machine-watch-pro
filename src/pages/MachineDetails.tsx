
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Wrench, 
  FileText, 
  Calendar, 
  AlertTriangle, 
  MapPin, 
  Clock, 
  ArrowLeft, 
  Plus 
} from "lucide-react";
import { getMachineById, getInterventionsByMachineId, getUserById, Machine, Intervention } from "@/data/mockData";
import AddInterventionForm from "@/components/AddInterventionForm";

const MachineDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [machine, setMachine] = useState<Machine | null>(null);
  const [interventions, setInterventions] = useState<Intervention[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (id) {
      const foundMachine = getMachineById(id);
      if (foundMachine) {
        setMachine(foundMachine);
        setInterventions(getInterventionsByMachineId(id));
      }
    }
  }, [id]);

  if (!machine) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <AlertTriangle className="h-12 w-12 text-yellow-500 mb-4" />
        <h2 className="text-2xl font-bold">Machine non trouvée</h2>
        <p className="text-muted-foreground mb-4">La machine demandée n'existe pas ou a été supprimée.</p>
        <Link to="/machines">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à la liste des machines
          </Button>
        </Link>
      </div>
    );
  }

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

  return (
    <div className="space-y-6">
      {/* Header with back button */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Link to="/machines">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Retour
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">{machine.name}</h1>
          {getMachineStatusBadge(machine.status)}
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nouvelle intervention
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Nouvelle intervention pour {machine.name}</DialogTitle>
            </DialogHeader>
            <AddInterventionForm machineId={machine.id} onSuccess={() => setIsDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="details">
        <TabsList>
          <TabsTrigger value="details">Détails</TabsTrigger>
          <TabsTrigger value="interventions">Interventions ({interventions.length})</TabsTrigger>
          <TabsTrigger value="documentation">Documentation</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details" className="space-y-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Wrench className="h-5 w-5 mr-2" /> 
                  Informations de la machine
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Référence</p>
                  <p>{machine.reference}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Localisation</p>
                  <p className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                    {machine.location}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Date d'installation</p>
                  <p className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                    {new Date(machine.installationDate).toLocaleDateString()}
                  </p>
                </div>
                {machine.lastMaintenance && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Dernière maintenance</p>
                    <p className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                      {new Date(machine.lastMaintenance).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  État et statistiques
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">État actuel</p>
                  <div className="mt-1">{getMachineStatusBadge(machine.status)}</div>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Nombre d'interventions</p>
                  <p>{interventions.length}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Interventions préventives</p>
                  <p>{interventions.filter(i => i.type === 'preventive').length}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Interventions correctives</p>
                  <p>{interventions.filter(i => i.type === 'corrective').length}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="interventions" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Historique des interventions</CardTitle>
              <CardDescription>Liste des interventions pour cette machine</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Technicien</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Coût</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {interventions.length > 0 ? (
                      interventions.map((intervention) => {
                        const technician = getUserById(intervention.technicianId);
                        return (
                          <TableRow key={intervention.id}>
                            <TableCell>
                              <Link to={`/interventions/${intervention.id}`} className="text-primary hover:underline">
                                {new Date(intervention.startDate).toLocaleDateString()}
                              </Link>
                            </TableCell>
                            <TableCell>{getInterventionTypeBadge(intervention.type)}</TableCell>
                            <TableCell>{intervention.description}</TableCell>
                            <TableCell>{technician?.name || 'Inconnu'}</TableCell>
                            <TableCell>{getInterventionStatusBadge(intervention.status)}</TableCell>
                            <TableCell>{intervention.cost ? `${intervention.cost} €` : '-'}</TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          Aucune intervention trouvée pour cette machine.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documentation" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Documentation technique
              </CardTitle>
              <CardDescription>Manuels et documents techniques</CardDescription>
            </CardHeader>
            <CardContent>
              {machine.technicalDocUrl ? (
                <div className="flex items-center p-4 border rounded-md">
                  <FileText className="h-8 w-8 mr-4 text-primary" />
                  <div>
                    <h3 className="font-medium">Manuel technique</h3>
                    <p className="text-sm text-muted-foreground mb-2">Documentation officielle du fabricant</p>
                    <Button variant="outline" size="sm">
                      Télécharger le manuel
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">Aucune documentation disponible pour cette machine.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MachineDetails;
