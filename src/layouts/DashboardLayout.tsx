
import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { LayoutDashboard, Wrench, ClipboardList, Settings, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const DashboardLayout = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { name: 'Tableau de bord', path: '/', icon: LayoutDashboard },
    { name: 'Machines', path: '/machines', icon: Wrench },
    { name: 'Interventions', path: '/interventions', icon: ClipboardList },
    { name: 'Paramètres', path: '/settings', icon: Settings },
  ];

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-primary text-white shadow-md h-16 flex items-center px-4 sticky top-0 z-50">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden text-white hover:bg-primary-700"
              onClick={toggleSidebar}
            >
              {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
            <h1 className="text-xl font-bold">Machine Watch Pro</h1>
          </div>
          <div>
            {/* Placeholder for user profile/settings */}
            <Button variant="ghost" size="icon" className="text-white hover:bg-primary-700">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside 
          className={cn(
            "bg-white shadow-lg w-64 flex-shrink-0 fixed h-[calc(100vh-4rem)] mt-16 z-40 transition-all duration-300",
            sidebarOpen ? "left-0" : "-left-64",
            "md:left-0"
          )}
        >
          <nav className="p-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link 
                    to={item.path}
                    className={cn(
                      "flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors",
                      location.pathname === item.path ? "bg-primary text-white hover:bg-primary-700" : ""
                    )}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className="mr-2 h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main 
          className={cn(
            "flex-grow transition-all duration-300 mt-16 p-6",
            "md:ml-64"
          )}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
