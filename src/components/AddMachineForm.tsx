
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { machines } from "@/data/mockData";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères.",
  }),
  reference: z.string().min(2, {
    message: "La référence doit contenir au moins 2 caractères.",
  }),
  location: z.string().min(2, {
    message: "L'emplacement doit être spécifié.",
  }),
  installationDate: z.string().min(1, {
    message: "La date d'installation est requise.",
  }),
  status: z.enum(["operational", "maintenance", "broken"], {
    required_error: "L'état de la machine doit être sélectionné.",
  }),
});

type AddMachineFormProps = {
  onSuccess?: () => void;
};

const AddMachineForm = ({ onSuccess }: AddMachineFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      reference: "",
      location: "",
      installationDate: new Date().toISOString().split('T')[0],
      status: "operational",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      // In a real app, you would call an API here
      console.log("Adding new machine:", values);
      
      // Add the machine to the list (for demo purposes)
      const newMachine = {
        id: (machines.length + 1).toString(),
        name: values.name,
        reference: values.reference,
        location: values.location,
        installationDate: values.installationDate,
        status: values.status as 'operational' | 'maintenance' | 'broken',
      };
      
      machines.push(newMachine);
      
      // Show success message
      toast({
        title: "Machine ajoutée",
        description: "La nouvelle machine a été ajoutée avec succès.",
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom de la machine</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Machine CNC Alpha" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="reference"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Référence</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: CNC-2023-A" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>État</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez l'état" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="operational">Opérationnel</SelectItem>
                    <SelectItem value="maintenance">En maintenance</SelectItem>
                    <SelectItem value="broken">En panne</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Emplacement</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Atelier Principal - Zone A" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="installationDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date d'installation</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
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
            {isSubmitting ? "Création en cours..." : "Créer la machine"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddMachineForm;
