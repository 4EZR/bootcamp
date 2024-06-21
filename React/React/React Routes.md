react routes itu install dari react-router-dom  


example:
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import NotFound from '../pages/NotFound';
import MainLayout from '../layouts/MainLayout';

const AppRoutes = () => (
  <Router>
    <MainLayout>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route component={NotFound} />
      </Switch>
    </MainLayout>
  </Router>
);

export default AppRoutes;

