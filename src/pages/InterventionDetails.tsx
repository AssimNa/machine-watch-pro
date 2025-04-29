
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, ArrowLeft, Calendar, Clock, Wrench, User, FileText } from "lucide-react";
import { interventions, machines, users } from "@/data/mockData";
import { Intervention } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const InterventionDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [intervention, setIntervention] = useState<Intervention | null>(null);
  const [machine, setMachine] = useState<any>(null);
  const [technician, setTechnician] = useState<any>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    if (id) {
      const foundIntervention = interventions.find(i => i.id === id);
      if (foundIntervention) {
        setIntervention(foundIntervention);
        
        // Find related machine and technician
        const relatedMachine = machines.find(m => m.id === foundIntervention.machineId);
        const relatedTechnician = users.find(u => u.id === foundIntervention.technicianId);
        
        setMachine(relatedMachine);
        setTechnician(relatedTechnician);
      }
    }
  }, [id]);

  const updateInterventionStatus = (newStatus: 'pending' | 'in_progress' | 'completed' | 'cancelled') => {
    if (intervention) {
      // In a real app, you would call an API here
      console.log(`Updating intervention ${intervention.id} status to ${newStatus}`);
      
      // For now, just update the local state for demonstration
      const updatedIntervention = { ...intervention, status: newStatus };
      setIntervention(updatedIntervention);
      
      // Show toast notification
      toast({
        title: "Statut mis à jour",
        description: `L'intervention est maintenant ${getStatusText(newStatus)}`,
      });
    }
  };

  if (!intervention || !machine) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <AlertTriangle className="h-12 w-12 text-yellow-500 mb-4" />
        <h2 className="text-2xl font-bold">Intervention non trouvée</h2>
        <p className="text-muted-foreground mb-4">L'intervention demandée n'existe pas ou a été supprimée.</p>
        <Link to="/interventions">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à la liste des interventions
          </Button>
        </Link>
      </div>
    );
  }

  const getStatusText = (status: string) => {
    switch(status) {
      case 'pending': return 'en attente';
      case 'in_progress': return 'en cours';
      case 'completed': return 'terminée';
      case 'cancelled': return 'annulée';
      default: return 'état inconnu';
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
      {/* Header with back button */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Link to="/interventions">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Retour
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Intervention #{intervention.id}</h1>
          {getInterventionStatusBadge(intervention.status)}
        </div>
        
        {/* Status action buttons */}
        <div className="flex flex-wrap gap-2">
          {intervention.status !== 'in_progress' && intervention.status !== 'completed' && (
            <Button 
              variant="outline" 
              onClick={() => updateInterventionStatus('in_progress')}
            >
              Démarrer l'intervention
            </Button>
          )}
          
          {intervention.status !== 'completed' && intervention.status !== 'cancelled' && (
            <Button 
              variant="default" 
              onClick={() => updateInterventionStatus('completed')}
            >
              Marquer comme terminée
            </Button>
          )}
          
          {intervention.status !== 'cancelled' && intervention.status !== 'completed' && (
            <Button 
              variant="outline" 
              onClick={() => updateInterventionStatus('cancelled')}
            >
              Annuler l'intervention
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2" /> 
              Détails de l'intervention
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Description</p>
              <p className="mt-1">{intervention.description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Type</p>
                <div className="mt-1">{getInterventionTypeBadge(intervention.type)}</div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-muted-foreground">Priorité</p>
                <div className="mt-1">{getPriorityBadge(intervention.priority)}</div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Date début</p>
                <p className="flex items-center mt-1">
                  <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                  {new Date(intervention.startDate).toLocaleString()}
                </p>
              </div>
              
              {intervention.endDate && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Date fin</p>
                  <p className="flex items-center mt-1">
                    <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                    {new Date(intervention.endDate).toLocaleString()}
                  </p>
                </div>
              )}
            </div>
            
            {intervention.cost !== undefined && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">Coût</p>
                <p className="mt-1 font-semibold">{intervention.cost} €</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Sidebar information */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Wrench className="h-5 w-5 mr-2" />
                Machine
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Link 
                to={`/machines/${machine.id}`}
                className="flex items-center p-4 border rounded-md hover:bg-gray-50 transition-colors"
              >
                <div>
                  <h3 className="font-medium text-primary">{machine.name}</h3>
                  <p className="text-sm text-muted-foreground">{machine.reference}</p>
                  <p className="text-sm text-muted-foreground mt-1">{machine.location}</p>
                </div>
              </Link>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Technicien
              </CardTitle>
            </CardHeader>
            <CardContent>
              {technician ? (
                <div className="p-4 border rounded-md">
                  <h3 className="font-medium">{technician.name}</h3>
                  <p className="text-sm text-muted-foreground">{technician.email}</p>
                </div>
              ) : (
                <p className="text-muted-foreground">Aucun technicien assigné</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InterventionDetails;
