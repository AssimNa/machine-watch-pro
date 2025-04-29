
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { machines, users, interventions } from "@/data/mockData";

const formSchema = z.object({
  machineId: z.string({
    required_error: "Veuillez sélectionner une machine.",
  }),
  technicianId: z.string({
    required_error: "Veuillez sélectionner un technicien.",
  }),
  type: z.enum(["preventive", "corrective"], {
    required_error: "Veuillez sélectionner un type d'intervention.",
  }),
  priority: z.enum(["low", "medium", "high", "critical"], {
    required_error: "Veuillez sélectionner un niveau de priorité.",
  }),
  startDate: z.string().min(1, {
    message: "La date de début est requise.",
  }),
  description: z.string().min(10, {
    message: "La description doit contenir au moins 10 caractères.",
  }),
});

type AddInterventionFormProps = {
  machineId?: string;
  onSuccess?: () => void;
};

const AddInterventionForm = ({ machineId, onSuccess }: AddInterventionFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Filter technicians from users
  const technicians = users.filter(user => user.role === "technician");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      machineId: machineId || "",
      technicianId: "",
      type: "preventive",
      priority: "medium",
      startDate: new Date().toISOString().split('T')[0],
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      // In a real app, you would call an API here
      console.log("Adding new intervention:", values);
      
      // Add the intervention to the list (for demo purposes)
      const newIntervention = {
        id: (interventions.length + 1).toString(),
        machineId: values.machineId,
        technicianId: values.technicianId,
        type: values.type as 'preventive' | 'corrective',
        status: 'pending' as const,
        startDate: values.startDate,
        description: values.description,
        priority: values.priority as 'low' | 'medium' | 'high' | 'critical',
      };
      
      interventions.push(newIntervention);
      
      // Show success message
      toast({
        title: "Intervention créée",
        description: "La nouvelle intervention a été créée avec succès.",
      });
      
      setIsSubmitting(false);
      
      // Call success callback if provided
      if (onSuccess) {
        onSuccess();
      }
    }, 1000);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="machineId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Machine</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!!machineId}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez une machine" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {machines.map((machine) => (
                    <SelectItem key={machine.id} value={machine.id}>
                      {machine.name} ({machine.reference})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type d'intervention</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="preventive">Préventive</SelectItem>
                    <SelectItem value="corrective">Corrective</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Priorité</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez une priorité" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="low">Basse</SelectItem>
                    <SelectItem value="medium">Moyenne</SelectItem>
                    <SelectItem value="high">Haute</SelectItem>
                    <SelectItem value="critical">Critique</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date de l'intervention</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="technicianId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Technicien</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un technicien" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {technicians.map((tech) => (
                      <SelectItem key={tech.id} value={tech.id}>
                        {tech.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Décrivez l'intervention, les actions à réaliser, et les pièces nécessaires..." 
                  className="min-h-[120px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onSuccess}>
            Annuler
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Création en cours..." : "Créer l'intervention"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddInterventionForm;
