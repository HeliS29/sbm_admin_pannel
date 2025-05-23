import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import ProfilePage from './pages/ProfilePage';
import NotFound from './pages/NotFound';
import { AuthContext } from './components/context/AuthContext';



function App() {
  const authContextValue = React.useContext(AuthContext); // just consume context

  return (
    <AuthContext.Provider value={authContextValue}>
      <Router>
        <Switch>
          <Route path="/auth" component={AuthPage} />
          <ProtectedRoute exact path="/" component={HomePage} />
          <ProtectedRoute path="/chat" component={ChatPage} />
          <ProtectedRoute path="/profile" component={ProfilePage} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

function ProtectedRoute({ component: Component, ...rest }) {
  const { user, isLoading } = React.useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoading ? (
          <div className="loading">Loading...</div>
        ) : user ? (
          <Component {...props} />
        ) : (
          <Redirect to="/auth" />
        )
      }
    />
  );
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