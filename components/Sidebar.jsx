import React from 'react';
import { AuthContext } from '../components/context/AuthContext';
function Sidebar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  const location = window.location.pathname;
  const { user, logout } = React.useContext(AuthContext);

  React.useEffect(() => {
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
    logout();
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
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary text-white">
              <i className="fas fa-user"></i>
            </div>
            <div>
              <p className="text-sm font-semibold">{user?.full_name}</p>
              <p className="text-xs text-gray-400">{user?.email}</p>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="space-y-1">
            <a 
              href="/"
              className={`py-2 px-4 rounded text-gray-300 hover:bg-gray-800 hover:text-white flex items-center space-x-3 transition-colors ${location === '/' ? 'bg-gray-800 text-white' : ''}`}
            >
              <i className="fas fa-tachometer-alt w-5"></i>
              <span>Dashboard</span>
            </a>
            <a 
              href="/chat"
              className={`py-2 px-4 rounded text-gray-300 hover:bg-gray-800 hover:text-white flex items-center space-x-3 transition-colors ${location === '/chat' ? 'bg-gray-800 text-white' : ''}`}
            >
              <i className="fab fa-whatsapp w-5"></i>
              <span>WhatsApp Chats</span>
            </a>
            <a 
              href="/profile"
              className={`py-2 px-4 rounded text-gray-300 hover:bg-gray-800 hover:text-white flex items-center space-x-3 transition-colors ${location === '/profile' ? 'bg-gray-800 text-white' : ''}`}
            >
              <i className="fas fa-user w-5"></i>
              <span>My Profile</span>
            </a>
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
export default Sidebar;