import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import { useAuth } from "@/hooks/use-auth";

export default function ProfilePage() {
  const { user, updateProfileMutation } = useAuth();
  const [formState, setFormState] = useState({
    full_name: user?.full_name || "",
    email: user?.email || "",
    username: user?.username || "",
    organization: user?.organization || "",
    designation: user?.designation || "",
    phone: user?.phone || "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const updates = { ...formState };
    // Only include password if it's not empty
    if (!updates.password) {
      delete updates.password;
    }
    
    updateProfileMutation.mutate(updates);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">My Profile</h2>
          
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 sm:p-10 bg-gradient-to-r from-indigo-500 to-blue-600 text-white">
              <div className="flex flex-col sm:flex-row items-center">
                <div className="mb-4 sm:mb-0 sm:mr-6">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80" 
                    alt="Profile" 
                    className="w-24 h-24 rounded-full object-cover border-4 border-white"
                  />
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-2xl font-bold">{user?.full_name}</h3>
                  <p className="text-blue-100">{user?.designation || "No designation"}</p>
                  <div className="flex items-center justify-center sm:justify-start mt-2 space-x-2">
                    <span className="flex items-center text-sm">
                      <i className="fas fa-envelope mr-1"></i>
                      <span>{user?.email}</span>
                    </span>
                    {user?.phone && (
                      <span className="flex items-center text-sm">
                        <i className="fas fa-phone mr-1"></i>
                        <span>{user?.phone}</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 sm:p-10">
              {updateProfileMutation.isSuccess && (
                <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                  <span>Profile updated successfully!</span>
                </div>
              )}
              
              {updateProfileMutation.isError && (
                <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                  <span>{updateProfileMutation.error?.message || "Error updating profile"}</span>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="profile-full-name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      id="profile-full-name" 
                      name="full_name" 
                      value={formState.full_name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="profile-username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    <input 
                      type="text" 
                      id="profile-username" 
                      name="username" 
                      value={formState.username}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="profile-email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input 
                      type="email" 
                      id="profile-email" 
                      name="email" 
                      value={formState.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="profile-phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input 
                      type="text" 
                      id="profile-phone" 
                      name="phone" 
                      value={formState.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="profile-organization" className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
                    <input 
                      type="text" 
                      id="profile-organization" 
                      name="organization" 
                      value={formState.organization}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="profile-designation" className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
                    <input 
                      type="text" 
                      id="profile-designation" 
                      name="designation" 
                      value={formState.designation}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                    />
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <label htmlFor="profile-password" className="block text-sm font-medium text-gray-700 mb-1">Change Password</label>
                  <input 
                    type="password" 
                    id="profile-password" 
                    name="password" 
                    value={formState.password}
                    onChange={handleChange}
                    placeholder="Leave blank to keep current password" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  />
                </div>
                
                <div className="flex justify-end">
                  <button 
                    type="submit" 
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    disabled={updateProfileMutation.isPending}
                  >
                    {updateProfileMutation.isPending ? (
                      <>
                        <i className="fas fa-spinner fa-spin mr-2"></i>
                        Saving...
                      </>
                    ) : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
