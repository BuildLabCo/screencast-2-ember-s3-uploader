import Controller from './controller';
import * as PolicyService from '../../services/policies';
import Path from 'path';
import pkg from './package.json';

let root = "/posts";

let index = (server, next) => {
  server.route([

    // INDEX
    {
      method: "GET",
      path:   root,
      config: {
        handler: Controller.index,
        bind:    Controller,
        description:  "The root route",
        notes:        "Returns the posts",
        plugins: {
          policies: PolicyService.withDefaults(server, [/* Custom Policies */])
        }
      }
    },

    // SIGN
    {
      method: "GET",
      path:   root + "/sign",
      config: {
        handler: Controller.sign,
        bind:    Controller
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