import Ember from 'ember';
import EmberUploader from 'ember-uploader';

export default EmberUploader.FileField.extend({

  multiple:   true,
  onComplete: "onComplete",
  onProgress: "onProgress",
  
  url:        "/posts/sign",

  filesDidChange: (function() {
    var files     = this.get('files'),
        _this     = this,
        uploadUrl = this.get('url');

    var uploader = EmberUploader.S3Uploader.create({
      url: uploadUrl
    });

    uploader.on('didUpload', function(response) {
      var fullUrl = decodeURIComponent($(response).find('Location')[0].textContent),
          key     = decodeURIComponent($(response).find('Key')[0].textContent);

      Ember.debug("File Uploaded: " + fullUrl);
      _this.sendAction("onComplete", { url: fullUrl, key: key, field: _this.get('field') });
      
    });

    uploader.on("progress", function(e) {
      _this.sendAction("onProgress", e);
    });

    if (!Ember.isEmpty(files)) {
   
      // Throw in an each loop to upload multiple files
      _.each(files, (file) => {
        uploader.upload(file);
      });
      // uploader.upload(files[0]); // Uploader will send a sign request then upload to S3
    }
  }).observes('files')
});