
import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { LayoutDashboard, Wrench, ClipboardList, History, BarChart3, Settings, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const DashboardLayout = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Machines', path: '/machines', icon: Wrench },
    { name: 'Maintenance', path: '/interventions', icon: ClipboardList },
    { name: 'Historique', path: '/history', icon: History },
    { name: 'Rapports', path: '/reports', icon: BarChart3 },
    { name: 'Paramètres', path: '/settings', icon: Settings },
  ];

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 text-gray-800 shadow-sm h-16 flex items-center px-4 sticky top-0 z-50">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={toggleSidebar}
            >
              {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
            <h1 className="text-xl font-bold">Machine Watch Pro</h1>
          </div>
          <div>
            {/* Placeholder for user profile/settings */}
            <Button variant="outline" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside 
          className={cn(
            "bg-[#1A1F2C] text-white w-64 flex-shrink-0 fixed h-[calc(100vh-4rem)] mt-16 z-40 transition-all duration-300",
            sidebarOpen ? "left-0" : "-left-64",
            "md:left-0"
          )}
        >
          <nav className="p-4">
            <div className="flex items-center space-x-2 mb-8">
              <div className="bg-blue-500 p-2 rounded-md">
                <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white">MaintLink</span>
            </div>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link 
                    to={item.path}
                    className={cn(
                      "flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors",
                      location.pathname === item.path ? "bg-blue-600 text-white hover:bg-blue-700" : "text-gray-300"
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
          {/* Logout button at bottom */}
          <div className="absolute bottom-4 left-4 right-4">
            <Button variant="destructive" className="w-full">
              <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              Déconnexion
            </Button>
          </div>
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
