import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { App } from '/imports/ui/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { renderRoutes } from "./routes.jsx";

Meteor.startup(() => {
  render(renderRoutes(), document.getElementById('react-root'));
});
