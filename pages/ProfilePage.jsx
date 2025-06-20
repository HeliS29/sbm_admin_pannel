import React from 'react';
import { AuthContext } from '../components/context/AuthContext';
import Sidebar from '../components/Sidebar';

function ProfilePage() {
  const { user } = React.useContext(AuthContext);
  const [formState, setFormState] = React.useState({
    full_name: "",
    email: "",
    username: "",
    organization: "",
    designation: "",
    phone: "",
    password: ""
  });
  const [updateSuccess, setUpdateSuccess] = React.useState(false);
  const [updateError, setUpdateError] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Initialize form with user data
  React.useEffect(() => {
    async function fetchProfile() {
      if (!user?.id) return; // Wait until user is available

      try {
        const res = await fetch(`https://api.interactivv.pro//admin/admin/${user.id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!res.ok) throw new Error('Failed to fetch profile');

        const data = await res.json();

        setFormState({
          full_name: data.full_name || '',
          email: data.email || '',
          username: data.username || '',
          organization: data.organization || '',
          designation: data.designation || '',
          phone: data.phone || '',
          password: ''  // Never prefill password
        });

        setUpdateError(null);
      } catch (err) {
        setUpdateError(err.message);
      }
    }

    fetchProfile();
  }, [user?.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const updateProfile = async (adminId, updates) => {
    const res = await fetch(`https://api.interactivv.pro//admin/admin/${adminId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to update profile");
    }

    return await res.json();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUpdateSuccess(false);
    setUpdateError("");
    setIsSubmitting(true);

    const updates = { ...formState };
    if (!updates.password) {
      delete updates.password;
    }

    if (!user?.id) {
      setUpdateError("Admin ID not found");
      setIsSubmitting(false);
      return;
    }

    updateProfile(user.id, updates)
      .then(() => {
        setUpdateSuccess(true);
        setFormState(prev => ({ ...prev, password: "" }));
      })
      .catch(error => {
        setUpdateError(error.message || "Failed to update profile");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <Sidebar />

      <div className="flex-1 overflow-auto w-[calc(100%-18rem)] ml-[18rem]">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">My Profile</h2>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 sm:p-10 bg-gradient-to-r from-indigo-500 to-blue-600 text-white">
              <div className="flex flex-col sm:flex-row items-center">
                <div className="mb-4 sm:mb-0 sm:mr-6"></div>
                <div className="text-center sm:text-left">
                  <h3 className="text-2xl font-bold">{formState?.full_name}</h3>
                  {/* <p className="text-blue-100">{formState?.designation || "No designation"}</p> */}
                  {/* <div className="flex items-center justify-center sm:justify-start mt-2 space-x-2">
                    <span className="flex items-center text-sm">
                      <i className="fas fa-envelope mr-1"></i>
                      <span>{formState?.email}</span>
                    </span>
                    {formState?.phone && (
                      <span className="flex items-center text-sm">
                        <i className="fas fa-phone mr-1"></i>
                        <span>{formState?.phone}</span>
                      </span>
                    )}
                  </div> */}
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-10">
              {updateSuccess && (
                <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                  <span>Profile updated successfully!</span>
                </div>
              )}

              {updateError && (
                <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                  <span>{updateError}</span>
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

                <div className="flex justify-end">
                  <button 
                    type="submit" 
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
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

export default ProfilePage;
