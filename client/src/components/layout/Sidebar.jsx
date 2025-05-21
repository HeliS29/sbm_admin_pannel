import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";

export default function Sidebar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();

  useEffect(() => {
    const checkMobileScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobileScreen();
    window.addEventListener("resize", checkMobileScreen);
    return () => window.removeEventListener("resize", checkMobileScreen);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="bg-gray-900 text-white w-full md:w-64 flex-shrink-0 h-auto md:h-screen">
      <div className="px-6 py-4 bg-gray-900 flex items-center justify-between md:justify-start">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <button 
          className="md:hidden text-gray-300 hover:text-white"
          onClick={toggleMobileMenu}
        >
          <i className="fas fa-bars"></i>
        </button>
      </div>
      
      {(mobileMenuOpen || !isMobile) && (
        <div className="md:block px-6 py-4">
          {/* User Profile Section */}
          <div className="mb-6 flex items-center space-x-3">
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80" 
              alt="User profile" 
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-semibold">{user?.full_name}</p>
              <p className="text-xs text-gray-400">{user?.email}</p>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="space-y-1">
            <Link href="/">
              <a className={`py-2 px-4 rounded text-gray-300 hover:bg-gray-800 hover:text-white flex items-center space-x-3 transition-colors ${location === '/' ? 'bg-gray-800 text-white' : ''}`}>
                <i className="fas fa-tachometer-alt w-5"></i>
                <span>Dashboard</span>
              </a>
            </Link>
            <Link href="/chat">
              <a className={`py-2 px-4 rounded text-gray-300 hover:bg-gray-800 hover:text-white flex items-center space-x-3 transition-colors ${location === '/chat' ? 'bg-gray-800 text-white' : ''}`}>
                <i className="fab fa-whatsapp w-5"></i>
                <span>WhatsApp Chats</span>
              </a>
            </Link>
            <Link href="/profile">
              <a className={`py-2 px-4 rounded text-gray-300 hover:bg-gray-800 hover:text-white flex items-center space-x-3 transition-colors ${location === '/profile' ? 'bg-gray-800 text-white' : ''}`}>
                <i className="fas fa-user w-5"></i>
                <span>My Profile</span>
              </a>
            </Link>
            <a 
              href="#" 
              onClick={handleLogout}
              className="py-2 px-4 rounded text-gray-300 hover:bg-gray-800 hover:text-white flex items-center space-x-3 transition-colors"
            >
              <i className="fas fa-sign-out-alt w-5"></i>
              <span>Logout</span>
            </a>
          </nav>
        </div>
      )}
    </div>
  );
}
