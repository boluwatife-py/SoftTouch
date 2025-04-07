import { ReactNode, useEffect } from "react";
import Sidebar from "./Sidebar";

// Add Font Awesome
const addFontAwesome = () => {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
  document.head.appendChild(link);
};

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  useEffect(() => {
    addFontAwesome();
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-['Roboto'] bg-[#0A1533] text-[#D3D3D3]">
      <Sidebar />
      <main className="flex-1 md:ml-64 min-h-screen">
        {children}
      </main>
    </div>
  );
};

export default Layout;
