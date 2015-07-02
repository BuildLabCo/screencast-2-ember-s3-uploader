import startDb from './helpers/startDb';
import Post from '../../app/models/post';
import Promise from 'bluebird';
import Fastimage from 'fastimage';

startDb
  .then(() => {

    let images, promises = [];

    Post
      .run()
      .then((posts) => {

        posts.forEach((post) => {
          console.log("Processing: " + post.id);
          let path  = `http://buildlab-screencast-assets.s3.amazonaws.com/posts-base/images/medium/med_${post.image}`;
          Fastimage
            .info(path)
            .then(function(info) {
              post.height = info.height;
              post.width = info.width;
              post.aspectRatio = info.height / info.width;
              promises.push(post.save());
            });
        });


        Promise.all(promises).then(() => {
          console.log("DONE!");
        });
        // console.log(posts.length);
        // process.exit(1);
      })

  });