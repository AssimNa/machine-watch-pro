
import React, { useState } from "react";
import { Calendar, FileText, Download } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";

const Reports = () => {
  const [reportType, setReportType] = useState<string>("");
  const [exportFormat, setExportFormat] = useState<string>("");
  const [date, setDate] = useState<Date>();

  const reportTypes = [
    { id: "maintenance", name: "Maintenance Reports" },
    { id: "machine", name: "Machine Status Reports" },
    { id: "cost", name: "Cost Analysis Reports" },
    { id: "technician", name: "Technician Performance Reports" },
  ];

  const exportFormats = [
    { id: "pdf", name: "PDF", icon: FileText },
    { id: "word", name: "Word Document", icon: FileText },
    { id: "ppt", name: "PowerPoint", icon: FileText },
  ];

  const handleGenerateReport = () => {
    console.log("Generating report with:", { reportType, exportFormat, date: date ? format(date, "yyyy-MM-dd") : null });
    // Here would go the actual report generation logic
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Generate Reports</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Maintenance Reports</CardTitle>
            <CardDescription>Generate reports from maintenance data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="reportType" className="text-sm font-medium">
                Report Type
              </label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger id="reportType" className="w-full">
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="exportFormat" className="text-sm font-medium">
                Export Format
              </label>
              <Select value={exportFormat} onValueChange={setExportFormat}>
                <SelectTrigger id="exportFormat" className="w-full">
                  <SelectValue placeholder="Select export format" />
                </SelectTrigger>
                <SelectContent>
                  {exportFormats.map((format) => (
                    <SelectItem key={format.id} value={format.id}>
                      <div className="flex items-center">
                        <format.icon className="h-4 w-4 mr-2" />
                        {format.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="reportPeriod" className="text-sm font-medium">
                Report Period
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP", { locale: fr }) : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700" 
              onClick={handleGenerateReport}
              disabled={!reportType || !exportFormat || !date}
            >
              <Download className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
