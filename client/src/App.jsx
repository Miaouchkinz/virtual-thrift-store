import React from 'react';
import { 
  BrowserRouter as Router, 
  Switch,
  Route
} from "react-router-dom";
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import Header from "./components/Header";
import Feed from "./components/Feed";
import Login from './components/auth/Login';
import Registration from './components/auth/Registration';
import './App.scss';
import useApplicationData from './hooks/useApplicationData';

export default function App(props) {
 const { 
   state,
   handleSuccessfulAuth,
   handleLogout
  } = useApplicationData();
  
  return (
    <div className='App'>
      <Header />
      <Router>
        <Switch>
          <Route 
            exact 
            path={"/"}
            render={props => (
              <Landing 
                {...props}
                handleSuccessfulAuth={handleSuccessfulAuth}
                handleLogout={handleLogout}
              />
            )}>
          </Route>
          <Route exact path={"/login"} render={(props) => (
            <Login {...props} handleSuccessfulAuth={handleSuccessfulAuth}/>
          )}>
          </Route>
          <Route exact path={"/register"} render={(props => (
            <Registration {...props} handleSuccessfulAuth={handleSuccessfulAuth}/>
          ))}>
          </Route>
          <Route path="/feed">
            <Feed
              clothing={state.clothing}
              clothingCategories={state.clothingCategories}
            />
          </Route>
          <Route exact path={"/dashboard"}>
            <Dashboard loggedInStatus={state.loggedInStatus} handleLogout={handleLogout}/>
          </Route>
        </Switch>
      </Router>
      <footer></footer>
    </div>
  );
}
