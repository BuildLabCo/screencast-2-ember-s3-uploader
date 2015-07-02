import Controller from './controller';
import * as PolicyService from '../../services/policies';
import Path from 'path';
import pkg from './package.json';

let root = "/";

let index = (server, next) => {

  server.route([

    // GET
    {
      method: "GET",
      path:   root,
      config: {
        handler: Controller.index,
        bind:    Controller,
        description:  "The root route",
        notes:        "Simply returns a welcome message",
        plugins: {
          policies: PolicyService.withDefaults(server, [/* Custom Policies */])
        }
      }
    }

  ]);

  next();

};

let register = (server, options, next) => {
  // Add this plugin after mrhorse has loaded
  server.after(index, 'mrhorse');
  next();
};

register.attributes = { pkg: pkg };

export { register };