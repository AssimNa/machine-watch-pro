
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, CheckCircle, Clock, Wrench, ClipboardList } from "lucide-react";
import { machines, interventions } from "@/data/mockData";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalMachines: 0,
    operationalMachines: 0,
    maintenanceMachines: 0,
    brokenMachines: 0,
    pendingInterventions: 0,
    completedInterventions: 0,
  });

  useEffect(() => {
    // Calculate dashboard stats
    const operationalMachines = machines.filter(m => m.status === 'operational').length;
    const maintenanceMachines = machines.filter(m => m.status === 'maintenance').length;
    const brokenMachines = machines.filter(m => m.status === 'broken').length;
    const pendingInterventions = interventions.filter(i => 
      i.status === 'pending' || i.status === 'in_progress'
    ).length;
    const completedInterventions = interventions.filter(i => i.status === 'completed').length;

    setStats({
      totalMachines: machines.length,
      operationalMachines,
      maintenanceMachines,
      brokenMachines,
      pendingInterventions,
      completedInterventions,
    });
  }, []);

  // Get critical interventions (high or critical priority and pending or in_progress)
  const criticalInterventions = interventions.filter(i => 
    (i.priority === 'high' || i.priority === 'critical') && 
    (i.status === 'pending' || i.status === 'in_progress')
  );

  // Get upcoming maintenance interventions (preventive and pending)
  const upcomingMaintenances = interventions.filter(i => 
    i.type === 'preventive' && i.status === 'pending'
  );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Tableau de bord</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Machines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalMachines}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.operationalMachines} Opérationnelles, {stats.brokenMachines} En panne
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Interventions en attente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingInterventions}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Interventions complétées</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedInterventions}</div>
            <p className="text-xs text-muted-foreground mt-1">Mois en cours</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Machines en maintenance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.maintenanceMachines}</div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Alertes et notifications</h2>
        
        {criticalInterventions.length > 0 ? (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Interventions critiques</AlertTitle>
            <AlertDescription>
              {criticalInterventions.length} intervention(s) critique(s) en attente
            </AlertDescription>
          </Alert>
        ) : (
          <Alert>
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertTitle>Aucune intervention critique</AlertTitle>
            <AlertDescription>
              Toutes les interventions critiques sont traitées
            </AlertDescription>
          </Alert>
        )}

        {upcomingMaintenances.length > 0 && (
          <Alert>
            <Clock className="h-4 w-4" />
            <AlertTitle>Maintenances à venir</AlertTitle>
            <AlertDescription>
              {upcomingMaintenances.length} maintenance(s) préventive(s) planifiée(s)
            </AlertDescription>
          </Alert>
        )}
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Gestion des machines</CardTitle>
            <CardDescription>
              Consultez et gérez vos équipements
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-end">
            <Link
              to="/machines"
              className="flex items-center text-primary hover:underline"
            >
              <span className="mr-1">Voir les machines</span>
              <Wrench className="h-4 w-4" />
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Interventions</CardTitle>
            <CardDescription>
              Suivez les interventions en cours et planifiées
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-end">
            <Link
              to="/interventions"
              className="flex items-center text-primary hover:underline"
            >
              <span className="mr-1">Voir les interventions</span>
              <ClipboardList className="h-4 w-4" />
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
