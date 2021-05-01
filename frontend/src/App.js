import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import Home from "./pages/Home.js";
import ResultPage from "./pages/ResultPage.js";

export default function App() {
  return (
    //Switch
    <Router>
      <Route exact path="/" component={Home} />
      <Route path="/result/" component={ResultPage} />
    </Router>
  );
}
