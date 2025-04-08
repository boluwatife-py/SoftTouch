import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { LogOut, BarChart3, Server, Code } from "lucide-react";
import { Button } from "@/components/ui/button";

const Sidebar = () => {
  const [location] = useLocation();
  const { logoutMutation, user } = useAuth();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const navItems = [
    { href: "/admin", label: "API Endpoints", icon: <Server className="h-5 w-5 mr-3" /> },
    { href: "/admin/statistics", label: "Statistics", icon: <BarChart3 className="h-5 w-5 mr-3" /> },
  ];

  return (
    <aside className="w-full md:w-64 md:fixed md:h-full bg-[#0A1533] border-r border-gray-700 z-10 flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white flex items-center">
          <Code className="h-6 w-6 mr-3 text-[#00BFFF]" />
          <span>Softtouch Admin</span>
        </h1>
      </div>
      
      {user && (
        <div className="px-6 pb-4">
          <div className="bg-[#172554] rounded-md p-3 text-white text-sm">
            <div className="font-medium text-[#00BFFF]">Logged in as:</div>
            <div className="truncate">{user.username}</div>
          </div>
        </div>
      )}
      
      <nav className="flex-1">
        {navItems.map((item) => (
          <Link 
            key={item.href} 
            href={item.href}
            className={cn(
              "flex items-center py-3 px-6 hover:bg-[#1B263B] transition duration-200 border-l-4",
              location === item.href 
                ? "border-[#00BFFF] text-white bg-[#172554]" 
                : "border-transparent text-[#D3D3D3]"
            )}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>
      
      <div className="p-4 mt-auto">
        <Button 
          variant="outline" 
          className="w-full border-gray-700 text-white hover:bg-[#1B263B] hover:text-white flex items-center justify-center"
          onClick={handleLogout}
          disabled={logoutMutation.isPending}
        >
          <LogOut className="h-5 w-5 mr-2" />
          {logoutMutation.isPending ? "Logging out..." : "Logout"}
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
