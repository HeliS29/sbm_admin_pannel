
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
    <div className="min-h-screen flex items-center justify-center bg-blue-50 py-12 px-4 sm:px-6 lg:px-8"> {/* Lighter blue background for the entire page */}
      <div className="w-full max-w-md bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-blue-100 animate-fade-in"> {/* Single, centered card, softer shadow, subtle border */}
        {currentView === "login" ? (
          <div className="space-y-8"> {/* Increased spacing */}
            <div className="text-center">
              <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">
                Welcome Back!
              </h2>
              <p className="mt-3 text-md text-gray-600">
                Sign in to continue to your dashboard.
              </p>
              <button
                onClick={() => setCurrentView("register")}
                className="mt-4 font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Or create a new account
              </button>
            </div>

            {loginError && (
              <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg relative text-sm animate-shake" role="alert">
                <span>{loginError}</span>
              </div>
            )}

            <form className="mt-10 space-y-6" onSubmit={handleLogin}>
              <div>
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  required
                  className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-md transition-all duration-200"
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
                  className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-md transition-all duration-200"
                  placeholder="Password"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="forget-password" className="font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-md font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <i className="fas fa-sign-in-alt text-lg"></i>
                  </span>
                  Sign In
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="space-y-8"> {/* Increased spacing */}
            <div className="text-center">
              <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">
                Create New Account
              </h2>
              <p className="mt-3 text-md text-gray-600">
                Join us to get started with your dashboard.
              </p>
              <button
                onClick={() => setCurrentView("login")}
                className="mt-4 font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Or sign in to existing account
              </button>
            </div>

            {registerError && (
              <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg relative text-sm animate-shake" role="alert">
                <span>{registerError}</span>
              </div>
            )}

            <form className="mt-10 space-y-5" onSubmit={handleRegister}> {/* Slightly tighter spacing for more fields */}
              <div>
                <label htmlFor="full-name" className="sr-only">Full Name</label>
                <input
                  id="full-name"
                  name="full_name"
                  type="text"
                  required
                  className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-md transition-all duration-200"
                  placeholder="Full Name"
                />
              </div>
              <div>
                <label htmlFor="register-email" className="sr-only">Email address</label>
                <input
                  id="register-email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-md transition-all duration-200"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="username" className="sr-only">Username</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-md transition-all duration-200"
                  placeholder="Username"
                />
              </div>
              <div>
                <label htmlFor="register-password" className="sr-only">Password</label>
                <input
                  id="register-password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-md transition-all duration-200"
                  placeholder="Password"
                />
              </div>
              <div>
                <label htmlFor="organization" className="sr-only">Organization</label>
                <input
                  id="organization"
                  name="organization"
                  type="text"
                  required
                  className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-md transition-all duration-200"
                  placeholder="Organization"
                />
              </div>
              <div>
                <label htmlFor="designation" className="sr-only">Designation</label>
                <input
                  id="designation"
                  name="designation"
                  type="text"
                  className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-md transition-all duration-200"
                  placeholder="Designation (Optional)"
                />
              </div>
              <div>
                <label htmlFor="phone" className="sr-only">Phone</label>
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-md transition-all duration-200"
                  placeholder="Phone (Optional)"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-md font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <i className="fas fa-user-plus text-lg"></i>
                  </span>
                  Register
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthPage;