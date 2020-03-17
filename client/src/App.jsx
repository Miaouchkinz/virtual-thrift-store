import React from 'react';
import { Route, Switch, Link, BrowserRouter as Router } from 'react-router-dom'
import Feed from './components/Feed'
import Header from './components/Header'
import Landing from './components/Landing'
import useApplicationData from '../src/hooks/useApplicationData';

function App() {
  const { state, dispatch } = useApplicationData();

  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route path="/feed">
            <Feed clothing={state.clothing} />
          </Route>
        </Switch>
        <footer></footer>
      </div>
    </Router>
  )
};

export default App;
