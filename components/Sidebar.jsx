// import React from 'react';
// import { AuthContext } from '../components/context/AuthContext';
// function Sidebar() {
//   const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
//   const [isMobile, setIsMobile] = React.useState(false);
//   const location = window.location.pathname;
//   const { user, logout } = React.useContext(AuthContext);

//   React.useEffect(() => {
//     const checkMobileScreen = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     checkMobileScreen();
//     window.addEventListener("resize", checkMobileScreen);
//     return () => window.removeEventListener("resize", checkMobileScreen);
//   }, []);

//   const toggleMobileMenu = () => {
//     setMobileMenuOpen(!mobileMenuOpen);
//   };

//   const handleLogout = () => {
//     logout();
//   };

//   return (
//     <div className="bg-gray-900 text-white w-full md:w-64 flex-shrink-0 h-auto md:h-screen">
//       <div className="px-6 py-4 bg-gray-900 flex items-center justify-between md:justify-start">
//         <h1 className="text-xl font-bold">Admin Dashboard</h1>
//         <button 
//           className="md:hidden text-gray-300 hover:text-white"
//           onClick={toggleMobileMenu}
//         >
//           <i className="fas fa-bars"></i>
//         </button>
//       </div>
      
//       {(mobileMenuOpen || !isMobile) && (
//         <div className="md:block px-6 py-4">
//           {/* User Profile Section */}
//           <div className="mb-6 flex items-center space-x-3">
//             <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary text-white">
//               <i className="fas fa-user"></i>
//             </div>
//             <div>
//               <p className="text-sm font-semibold">{user?.full_name}</p>
//               <p className="text-xs text-gray-400">{user?.email}</p>
//             </div>
//           </div>
          
//           {/* Navigation */}
//           <nav className="space-y-1">
//             {/* <a 
//               href="/"
//               className={`py-2 px-4 rounded text-gray-300 hover:bg-gray-800 hover:text-white flex items-center space-x-3 transition-colors ${location === '/' ? 'bg-gray-800 text-white' : ''}`}
//             >
//               <i className="fas fa-tachometer-alt w-5"></i>
//               <span>Dashboard</span>
//             </a> */}
//             <a 
//               href="/chat"
//               className={`py-2 px-4 rounded text-gray-300 hover:bg-gray-800 hover:text-white flex items-center space-x-3 transition-colors ${location === '/chat' ? 'bg-gray-800 text-white' : ''}`}
//             >
//               <i className="fab fa-whatsapp w-5"></i>
//               <span>WhatsApp Chats</span>
//             </a>
//             {/* <a 
//               href="/call_logs"
//               className={`py-2 px-4 rounded text-gray-300 hover:bg-gray-800 hover:text-white flex items-center space-x-3 transition-colors ${location === '/chat' ? 'bg-gray-800 text-white' : ''}`}
//             >
//               <i className="fab fa-whatsapp w-5"></i>
//               <span>Call Logs</span>
//             </a> */}
//              <a 
//               href="/assistants"
//               className={`py-2 px-4 rounded text-gray-300 hover:bg-gray-800 hover:text-white flex items-center space-x-3 transition-colors ${location === '/profile' ? 'bg-gray-800 text-white' : ''}`}
//             >
//               <i className="fas fa-user w-5"></i>
//               <span>Assistant</span>
//             </a>
            
//             <a 
//               href="/vapi_call_logs"
//               className={`py-2 px-4 rounded text-gray-300 hover:bg-gray-800 hover:text-white flex items-center space-x-3 transition-colors ${location === '/profile' ? 'bg-gray-800 text-white' : ''}`}
//             >
//               <i className="fas fa-user w-5"></i>
//               <span>Call Logs</span>
//             </a>
//             <a 
//               href="/phone_numbers"
//               className={`py-2 px-4 rounded text-gray-300 hover:bg-gray-800 hover:text-white flex items-center space-x-3 transition-colors ${location === '/chat' ? 'bg-gray-800 text-white' : ''}`}
//             >
//               <i className="fab fa-whatsapp w-5"></i>
//               <span>Phone Number</span>
//             </a>
//             <a 
//               href="/"
//               className={`py-2 px-4 rounded text-gray-300 hover:bg-gray-800 hover:text-white flex items-center space-x-3 transition-colors ${location === '/profile' ? 'bg-gray-800 text-white' : ''}`}
//             >
//               <i className="fas fa-user w-5"></i>
//               <span>My Profile</span>
//             </a>
//             <a 
//               href="#" 
//               onClick={handleLogout}
//               className="py-2 px-4 rounded text-gray-300 hover:bg-gray-800 hover:text-white flex items-center space-x-3 transition-colors"
//             >
//               <i className="fas fa-sign-out-alt w-5"></i>
//               <span>Logout</span>
//             </a>
//           </nav>
//         </div>
//       )}
//     </div>
//   );
// }
// export default Sidebar;


// Sidebar.jsx

import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  MessageCircle, 
  Bot, 
  Phone, 
  PhoneCall, 
  User, 
  LogOut,
  Home
} from 'lucide-react';

// Optional: Import context for real user/logout info
import { AuthContext } from '../components/context/AuthContext';

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { user, logout } = React.useContext(AuthContext);
  const location = window.location.pathname;

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
    logout();
  };

  const NavLink = ({ href, icon: Icon, label }) => {
    const isActive = location === href;
    return (
      <a
        href={href}
        className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
          isActive
            ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
            : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
        }`}
      >
        <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-blue-500'}`} />
        <span>{label}</span>
        {isActive && <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full"></div>}
      </a>
    );
  };

  return (
    <div className="bg-white border-r border-gray-200 w-full md:w-72 flex-shrink-0 h-auto md:h-screen shadow-lg fixed">
      {/* Header */}
      <div className="px-6 py-5 bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-between md:justify-start">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
            <Home className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
        </div>
        <button 
          className="md:hidden text-white hover:text-blue-100 transition-colors"
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {(mobileMenuOpen || !isMobile) && (
        <div className="md:block">
          {/* User Info */}
          <div className="px-6 py-6 bg-gray-50 border-b border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{user?.full_name}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav className="px-4 py-6 space-y-2">
            <NavLink href="/chat" icon={MessageCircle} label="WhatsApp Chats" />
            <NavLink href="/assistants" icon={Bot} label="Assistant" />
            <NavLink href="/vapi_call_logs" icon={PhoneCall} label="Call Logs" />
            <NavLink href="/phone_numbers" icon={Phone} label="Phone Numbers" />
            <NavLink href="/" icon={User} label="My Profile" />

            {/* Logout */}
            <div className="pt-4 mt-6 border-t border-gray-200">
              <button
                onClick={handleLogout}
                className="group w-full flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-200"
              >
                <LogOut className="w-5 h-5 mr-3 text-gray-400 group-hover:text-red-500" />
                <span>Logout</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
