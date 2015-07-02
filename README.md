## Upload images directly to S3 with ember

The screencast for this code is located [Here](http://buildlab.co/u/validkeys/channels/1/episodes/upload-files-directly-to-s3-with-ember)

The backend is a HapiJS API. To get startedm ensure that you have rethink db installed on your computer.

For macs using homebrew:

```
$ brew install rethinkdb
```

For everyone else, checkout the [rethinkdb install page](http://rethinkdb.com/docs/install/):

```
$ cd backend/
$ npm install
$ npm run createPosts
$ npm run sizeImages
$ gulp serve
```

The API should be up and running now. 

To get the Ember app running:

```
$ cd frontend/
$ npm install && bower install
$ ember s
```

The front end should be up and running for you now.