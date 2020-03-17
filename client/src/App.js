import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import IndexPage from './index';
import Feed from './Feed'
import useApplicationData from './hooks/useApplicationData';

function App() {

  const { state, dispatch } = useApplicationData();

  return (
    <Router>
      <div>
        <Route exact path="/" component={() => <IndexPage state={state} dispatch={dispatch} />} />
        <Route path="/feed" component={() => <Feed state={state} dispatch={dispatch} />} />
      </div>
    </Router>
  )
};

export default App;

// BELOW WAS THERE BY DEFAULT IN INDEX.JS AT BEGINNING

