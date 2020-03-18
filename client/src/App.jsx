import React from 'react';
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

export default function App() {
  const { state, dispatch } = useApplicationData();

  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route exact path={"/"}><Home/></Route>
          <Route exact path={"/dashboard"}><Dashboard/></Route>
        </Switch>
      </Router>
    </div>
  );
}
