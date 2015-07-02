import Hapi from 'hapi';
import Glue from 'glue';
import Path from 'path';
import * as AppConfig from './app/config';
import DotEnv from 'dot-env';

const glueOptions = {
  relativeTo: Path.join(__dirname, "/app")
};

Glue.compose(AppConfig.manifest, glueOptions, (err, server)  => {

  if (err) {
    console.log(err);
    process.exit(1);
  }

  server.on('request-internal', (req, event, tags) => {
    if (tags.error && tags.state)
      console.error(event);
  });

  server.start(() => {
    console.log("Hapi server started at: " + server.info.uri + " on port " + server.info.port);
  });

});