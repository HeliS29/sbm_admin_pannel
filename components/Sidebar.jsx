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
  Pencil,
  Tags,
  PhoneOutgoing,
  Home
} from 'lucide-react';

// Optional: Import context for real user/logout info
import { AuthContext } from '../components/context/AuthContext';

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { user, logout } = React.useContext(AuthContext);
  const location = window.location.pathname;
  const [formState, setFormState] = useState({
      full_name: "",
      email: "",
      username: "",
      organization: "",
      designation: "",
      phone: "",
      password: ""
    });

  useEffect(() => {
    const checkMobileScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobileScreen();
    window.addEventListener("resize", checkMobileScreen);
    return () => window.removeEventListener("resize", checkMobileScreen);
  }, []);
  useEffect(() => {
      async function fetchProfile() {
        if (!user?.id) return; // Wait until user is available
  
        try {
          const res = await fetch(`https://api.interactivv.pro/admin/admin/${user.id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });
  
          if (!res.ok) throw new Error('Failed to fetch profile');
  
          const data = await res.json();
          console.log(data.full_name,"sidebar")
          setFormState({
            full_name: data.full_name,
            email: data.email || '',
            username: data.username || '',
            organization: data.organization || '',
            designation: data.designation || '',
            phone: data.phone || '',
            password: ''  // Never prefill password
          });
          console.log(formState,"formStateformState")
  
        } catch (err) {
          setUpdateError(err.message);
        }
      }
  
      fetchProfile();
    }, [user?.id]);
  

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
          <h1 className="text-xl font-bold text-white">Dashboard</h1>
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
              <p className="text-sm font-semibold text-gray-900 truncate">{formState.full_name}</p>
                {/* <p className="text-xs text-gray-500 truncate">{user?.email}</p> */}
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav className="px-4 py-6 space-y-2">
            <NavLink href="/chat" icon={MessageCircle} label="WhatsApp Chats" />
            <NavLink href="/assistants" icon={Bot} label="Assistant" />
            <NavLink href="/vapi_call_logs" icon={PhoneCall} label="Call Logs" />
            <NavLink href="/phone_numbers" icon={Phone} label="Phone Numbers" />
            <NavLink href="/outbound_campaigns" icon={PhoneOutgoing} label="Outbound" />
            <NavLink href="/tags" icon={Tags} label="Tags" />
            <NavLink href="/widget" icon={Pencil} label="Widget" />
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
