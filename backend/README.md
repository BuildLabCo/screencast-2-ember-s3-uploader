# Hapi Skeleton

This is a skeleton application for getting up and running quickly with HAPIjs. Fully supports ES6 (babel).
---

Running
---

Server:
```
npm start or gulp serve
```

Build:
```
npm run build or gulp build
```

Test:
To run all tests one time:

```
$ gulp test
```

To run in TDD mode (watches for file changes and re-runs tests)
```
$ gulp tdd
```


### Folder Structure:

#### src/

Contains all source code

#### src/server.js

Contains the server setup. Uses Glue to compose server instances.

#### src/app

Contains all application specific source code

#### src/app/config

Contains configuration options (database, plugins etc..)

#### src/app/initializers

Initializer plugins. This is where things like database connections go.

#### src/app/lib

Custom Plugins and additional custom libraries

#### src/app/models

All model configurations. These should be created as Hapi plugins and added to the config/manifest

#### src/app/pods

This is where our route and handlers go. 