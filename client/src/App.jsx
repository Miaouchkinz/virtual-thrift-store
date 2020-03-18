import React, { useState, useEffect } from 'react';
import { 
  BrowserRouter as Router, 
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './components/Home'
import Dashboard from './components/Dashboard'
import './App.scss';
import useApplicationData from './hooks/useApplicationData';
import axios from 'axios';

export default function App(props) {
 const { state, dispatch } = useApplicationData();

 // TOFIX: NEED TO MOVE TO USEAPPDATA
  const [ userLogInfo, setUserLogInfo ] = useState({
    loggedInStatus: "NOT_LOGGED_IN",
    user: {}
  })

  useEffect(() => {
    axios.get("http://localhost:3001/logged_in", { withCredentials: true })
      .then(res => {
        if(res.data.logged_in && userLogInfo.loggedInStatus === "NOT_LOGGED_IN") {
          setUserLogInfo({
            loggedInStatus: "LOGGED_IN",
            user: res.data.user
          })
        } else if (!res.data.logged_in && userLogInfo.loggedInStatus === "LOGGED_IN") {
          setUserLogInfo({
            loggedInStatus: "NOT_LOGGED_IN",
            user: {}
          })  
        }
      })
      .catch(err => console.log("check login err", err));
  }, []);

  const handleLogin = (data) => {
    setUserLogInfo({
      loggedInStatus: "LOGGED_IN",
      user: data.user
    })
  }

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
                loggedInStatus={userLogInfo.loggedInStatus}
              />
            )}>
          </Route>
          <Route exact path={"/dashboard"}>
            <Dashboard loggedInStatus={userLogInfo.loggedInStatus}/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
