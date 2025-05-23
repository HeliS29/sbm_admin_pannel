import React from 'react';
import { AuthContext } from '../components/context/AuthContext';

function AuthPage() {
  const [currentView, setCurrentView] = React.useState("login");
  const [loginError, setLoginError] = React.useState("");
  const [registerError, setRegisterError] = React.useState("");
  const { user, login, register } = React.useContext(AuthContext);
  
  // Redirect if already authenticated
  React.useEffect(() => {
    if (user) {
      window.location.href = "/";
    }
  }, [user]);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError("");
    
    const formData = new FormData(e.target);
    const credentials = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    
    login(credentials).catch(error => {
      setLoginError(error.message || "Incorrect email or password");
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setRegisterError("");
    
    const formData = new FormData(e.target);
    const userData = {
      full_name: formData.get("full_name"),
      email: formData.get("email"),
      username: formData.get("username"),
      password: formData.get("password"),
      organization: formData.get("organization") || undefined,
      designation: formData.get("designation") || undefined,
      phone: formData.get("phone") || undefined,
    };
    
    register(userData).catch(error => {
      setRegisterError(error.message || "Email or username already registered");
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex w-full max-w-5xl shadow-xl rounded-xl overflow-hidden">
        {/* Form Section */}
        <div className="w-full lg:w-1/2 bg-white p-8 lg:p-12">
          {currentView === "login" ? (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                  Sign in to your account
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  Or
                  <button 
                    onClick={() => setCurrentView("register")}
                    className="ml-1 font-medium text-primary hover:text-indigo-500 cursor-pointer"
                  >
                    create a new account
                  </button>
                </p>
              </div>
              
              {loginError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                  <span>{loginError}</span>
                </div>
              )}
              
              <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                <div className="rounded-md -space-y-px">
                  <div className="mb-4">
                    <label htmlFor="email-address" className="sr-only">Email address</label>
                    <input 
                      id="email-address" 
                      name="email" 
                      type="email" 
                      required 
                      className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm" 
                      placeholder="Email address"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">Password</label>
                    <input 
                      id="password" 
                      name="password" 
                      type="password" 
                      required 
                      className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm" 
                      placeholder="Password"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input 
                      id="remember-me" 
                      name="remember-me" 
                      type="checkbox" 
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a href="#" className="font-medium text-primary hover:text-indigo-500">
                      Forgot your password?
                    </a>
                  </div>
                </div>

                <div>
                  <button 
                    type="submit" 
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <i className="fas fa-sign-in-alt"></i>
                    </span>
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                  Create new account
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  Or
                  <button 
                    onClick={() => setCurrentView("login")}
                    className="ml-1 font-medium text-primary hover:text-indigo-500 cursor-pointer"
                  >
                    sign in to existing account
                  </button>
                </p>
              </div>
              
              {registerError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                  <span>{registerError}</span>
                </div>
              )}
              
              <form className="mt-8 space-y-6" onSubmit={handleRegister}>
                <div className="rounded-md -space-y-px">
                  <div className="mb-4">
                    <label htmlFor="full-name" className="sr-only">Full Name</label>
                    <input 
                      id="full-name" 
                      name="full_name" 
                      type="text" 
                      required 
                      className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm" 
                      placeholder="Full Name"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="register-email" className="sr-only">Email address</label>
                    <input 
                      id="register-email" 
                      name="email" 
                      type="email" 
                      required 
                      className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm" 
                      placeholder="Email address"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="username" className="sr-only">Username</label>
                    <input 
                      id="username" 
                      name="username" 
                      type="text" 
                      required 
                      className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm" 
                      placeholder="Username"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="register-password" className="sr-only">Password</label>
                    <input 
                      id="register-password" 
                      name="password" 
                      type="password" 
                      required 
                      className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm" 
                      placeholder="Password"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="organization" className="sr-only">Organization</label>
                    <input 
                      id="organization" 
                      name="organization" 
                      type="text" 
                      className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm" 
                      placeholder="Organization (Optional)"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="designation" className="sr-only">Designation</label>
                    <input 
                      id="designation" 
                      name="designation" 
                      type="text" 
                      className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm" 
                      placeholder="Designation (Optional)"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="sr-only">Phone</label>
                    <input 
                      id="phone" 
                      name="phone" 
                      type="text" 
                      className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm" 
                      placeholder="Phone (Optional)"
                    />
                  </div>
                </div>

                <div>
                  <button 
                    type="submit" 
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <i className="fas fa-user-plus"></i>
                    </span>
                    Register
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
        
        {/* Hero Section */}
        <div className="hidden lg:block lg:w-1/2 bg-white p-12 text-gray-800">
  <div className="h-full flex flex-col justify-center items-start space-y-6">
   
    <h1 className="text-4xl font-bold text-blue-600">Your WhatsApp Admin Hub</h1>
    <p className="text-lg text-gray-700">
      Seamlessly manage conversations, track engagement, and empower your support team — all from a single dashboard.
    </p>
    <ul className="space-y-3">
      <li className="flex items-center">
        <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.121-4.121a1 1 0 011.414-1.414L8.414 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        Access and manage all customer chats in real time
      </li>
      <li className="flex items-center">
        <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.121-4.121a1 1 0 011.414-1.414L8.414 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        Track detailed message and media history
      </li>
      <li className="flex items-center">
        <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.121-4.121a1 1 0 011.414-1.414L8.414 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        Analyze customer interactions and metrics
      </li>
      <li className="flex items-center">
        <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.121-4.121a1 1 0 011.414-1.414L8.414 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        Assign roles, permissions, and manage team
      </li>
    </ul>
  </div>
</div>
      </div>
    </div>
  );
}
export default AuthPage;