import Post from '../../models/post';
import PostSerializer from '../../serializers/post';
import moment from 'moment';
import S3PolicyService from '../../services/s3policy';

let controller = {

  index: (req, reply, next) => {
    Post
      .limit(60)
      .run()
      .then((posts) => {
        reply({posts: new PostSerializer(posts).serialize()});
      });
  },


  sign: (req, reply, next) => {

    let expires = new Date(Date.now() + 120000);

    let creds = S3PolicyService({
      secret:   process.env.S3_SECRET,
      acl:      "public-read",
      bucket:   process.env.S3_BUCKET,
      expires:  expires
    });

    reply({
      "acl":            "public-read",
      "awsaccesskeyid": process.env.S3_KEY,
      "bucket":         process.env.S3_BUCKET,
      "Cache-Control":  "max-age=630720000, public",
      "Content-Type":   req.query.type,
      "expires":        expires,
      "key":            "posts-base/images/originals/" + req.query.name,
      "policy":         creds.policy,
      "signature":      creds.signature,
      "success_action_status": "201",
    });
  }

};

export default controller;