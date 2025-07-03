import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
// import HomePage from './pages/HomePage';
import Assistant from './pages/Assistant';
import ChatPage from './pages/ChatPage';
import ProfilePage from './pages/ProfilePage';
import NotFound from './pages/NotFound';
import { AuthContext } from './components/context/AuthContext';
import CallLogs from './components/CallLogs';
import VapiCall from './pages/VapiCall';
import PhoneNumber from './pages/PhoneNumber';
import TagManager from './pages/TaxManager';
import WidgetGenerator from './pages/WidgetGenerator';
import CampaignForm from './pages/CampaignForm';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

function App() {
  const authContextValue = React.useContext(AuthContext);

  return (
    <AuthContext.Provider value={authContextValue}>
      <Router>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/forget-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} /> 
          {/* <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} /> */}
          <Route path="/call_logs" element={<ProtectedRoute><CallLogs /></ProtectedRoute>} />
          <Route path="/chat" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
          <Route path="/" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/assistants" element={<ProtectedRoute><Assistant /></ProtectedRoute>} />
          <Route path="/vapi_call_logs" element={<ProtectedRoute><VapiCall /></ProtectedRoute>} />
          <Route path="/phone_numbers" element={<ProtectedRoute><PhoneNumber /></ProtectedRoute>} />
          <Route path="/tags" element={<ProtectedRoute><TagManager /></ProtectedRoute>} />
          <Route path="/widget" element={<ProtectedRoute><WidgetGenerator /></ProtectedRoute>} />
          <Route path="/outbound_campaigns" element={<ProtectedRoute><CampaignForm /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

function ProtectedRoute({ children }) {
  const { user, isLoading } = React.useContext(AuthContext);

  if (isLoading) return <div className="loading">Loading...</div>;

  return user ? children : <Navigate to="/auth" replace />;
}

export default App;
// import React from 'react';

// function App() {
//   return (
//     <div>
//       <h1>Hii — App is working!</h1>
//     </div>
//   );
// }

// export default App;