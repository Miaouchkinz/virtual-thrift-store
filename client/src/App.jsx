import React from 'react';
import { 
  BrowserRouter as Router, 
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home'
import Dashboard from './components/Dashboard'
import './App.scss';
import useApplicationData from './hooks/useApplicationData';

export default function App(props) {
 const { 
   state,
   handleLogin,
   handleLogout
  } = useApplicationData();

  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route 
            exact 
            path={"/"}
            render={props => (
              <Home 
                {...props}
                handleLogin={handleLogin}
                handleLogout={handleLogout}
                loggedInStatus={state.loggedInStatus}
              />
            )}>
          </Route>
          <Route exact path={"/dashboard"}>
            <Dashboard loggedInStatus={state.loggedInStatus}/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
