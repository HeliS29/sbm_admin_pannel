// Create an AuthContext for authentication state management
const AuthContext = React.createContext();

// Main App component
function App() {
  const [user, setUser] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [authError, setAuthError] = React.useState(null);

  // Check if user is logged in on app load
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      // Make API call to get user data using token from FastAPI backend
      fetch('http://localhost:8000/chat/admin/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(res => {
          if (!res.ok) {
            throw new Error('Session expired');
          }
          return res.json();
        })
        .then(userData => {
          setUser(userData);
        })
        .catch(err => {
          console.error('Auth error:', err);
          localStorage.removeItem('token');
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  // Login function
  const login = async (credentials) => {
    setAuthError(null);
    
    try {
      const response = await fetch('http://localhost:8000/chat/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.detail || 'Login failed');
      }
      
      // Save token
      localStorage.setItem('token', data.access_token);
      
      // Get user data
      const userResponse = await fetch('http://localhost:8000/chat/admin/me', {
        headers: {
          'Authorization': `Bearer ${data.access_token}`
        }
      });
      
      if (!userResponse.ok) {
        throw new Error('Failed to get user data');
      }
      
      const userData = await userResponse.json();
      setUser(userData);
      
      return data;
    } catch (error) {
      setAuthError(error.message);
      throw error;
    }
  };

  // Register function
  const register = async (userData) => {
    setAuthError(null);
    
    try {
      const response = await fetch('http://localhost:8000/chat/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.detail || 'Registration failed');
      }
      
      // Save token
      localStorage.setItem('token', data.access_token);
      
      // Get user data after registration
      const userResponse = await fetch('http://localhost:8000/chat/admin/me', {
        headers: {
          'Authorization': `Bearer ${data.access_token}`
        }
      });
      
      if (!userResponse.ok) {
        throw new Error('Failed to get user data');
      }
      
      const userDataResponse = await userResponse.json();
      setUser(userDataResponse);
      
      return data;
    } catch (error) {
      setAuthError(error.message);
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  // Update profile function
  const updateProfile = async (profileData) => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Not authenticated');
      }
      
      const response = await fetch(`http://localhost:8000/chat/admin/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profileData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.detail || 'Failed to update profile');
      }
      
      setUser(data);
      return data;
    } catch (error) {
      throw error;
    }
  };

  // Auth context provider value
  const authContextValue = {
    user,
    isLoading,
    authError,
    login,
    register,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      <Router>
        <Switch>
          <Route path="/auth" component={AuthPage} />
          <ProtectedRoute path="/" exact component={HomePage} />
          <ProtectedRoute path="/chat" component={ChatPage} />
          <ProtectedRoute path="/profile" component={ProfilePage} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

// Protected Route Component
function ProtectedRoute({ component: Component, ...rest }) {
  const { user, isLoading } = React.useContext(AuthContext);
  
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isLoading) {
          return (
            <div className="flex items-center justify-center min-h-screen">
              <i className="fas fa-spinner fa-spin text-primary text-4xl"></i>
            </div>
          );
        }
        
        return user ? (
          <Component {...props} />
        ) : (
          <Redirect to="/auth" />
        );
      }}
    />
  );
}