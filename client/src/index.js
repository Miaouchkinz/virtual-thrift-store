import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import App from './App';
import Feed from './Feed'
import './index.scss';


const routing = (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/feed" component={Feed} />
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

