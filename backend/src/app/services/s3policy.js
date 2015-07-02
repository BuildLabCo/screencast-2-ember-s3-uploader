import crypto from 'crypto';

export default (options = {}) => {

  if (!options.bucket) { return new Error("You must pass a bucket in the options list"); }
  if (!options.acl) { return new Error("You must pass a acl in the options list"); }
  if (!options.secret) { return new Error("You must pass an S3 secret in the options list"); }

  let policy = {
    expiration: options.expires || new Date(Date.now() + 120000),
    conditions: [
      { bucket: options.bucket },
      { acl: options.acl || 'public-read' },
      { expires: options.expires },
      { success_action_status: '201' },
      [ 'starts-with', '$key', '' ],
      [ 'starts-with', '$Content-Type', '' ],
      [ 'starts-with', '$Cache-Control', '' ],
      [ 'content-length-range', 0, options.length || 524288000 ]
    ]
  };

  let stringPolicy = JSON.stringify(policy);
  let base64Policy = Buffer(stringPolicy, "utf-8").toString("base64");

  let signature = crypto.createHmac("sha1", options.secret)
    .update(new Buffer(base64Policy, "utf-8")).digest("base64");

  // build the results object
  let s3Credentials = {
    policy:     base64Policy,
    signature:  signature
  };

  return s3Credentials;

};