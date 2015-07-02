### Image Uploader:

Install:
```
npm install --save-dev ember-cli-uploader
ember generate ember-cli-uploader
```

Run:
```
ember generate component file-upload
//put into app/components/file-upload.js
```

Show the app again. "We've got out photo blog here but it'd be nice to upload images". So let's add a file input and a label to get started.

```html
  <div id="image-upload-wrapper">
    <label for="new-post">Upload An Image</label>
    <input type="file" name="new-post" id="new-post" />
  </div>
```

Add in some css
```
#image-upload-wrapper
  input[type="file"]
    display: none
  
  label
    display: block
    background: #04c868
    color: #fff
    border-radius: 3px
    padding: 10px
    text-align: center
    cursor: pointer
```

Voila. Our upload button. When I click it triggers the file dialog but then after I select the file, as expected, nothing happens.

[SLIDE]
Traditionally, we'd use a file input, select that file and then upload to the server. The server then takes that file and uploads it again to S3. In our case, we want our user's experience to be faster.

[SLIDE]
Instead of uploading to our server, we're going to upload directly to S3. So we're going to be using Joshua Borton's ember-upload plugin.

Install the plugin (ember-cli-upload)

```
npm install --save-dev ember-cli-uploader
ember generate ember-cli-uploader
```

Rename the generated component to be s3-upload

Put in the basics with an alert instead of uploader.upload(files[0])

The ember-uploader comes a regular Uploader that will upload content directly to your server. That's what we have now:

```
EmberUploader.Uploader.create();
```

So when i try to upload a file, it will post that file directly to my server for me.

But I want to post to s3, so let's change over the Uploader to use the S3 uploader.

To ensure secure uploads, there are a few steps both on the front and backend that we need to take. But let's see what happens when we try to upload this file

[CONSOLE]

We can see in the console that we're getting a 404 at /sign. EXPLAIN request signing (show node service)

Implement the request signing endpoint (node)
Quickly show the S3Policy service and explain that this is a nodeified version of the ruby code on the wiki (show the wiki)


So let's try again. Looks like it's failing.

By default, ember-uploader tries to hit the /sign endpoint, but we set ours up at /posts/sign. Now update the uploader with the endpoint /posts/sign

Now the upload should work. BUT WAIT --> AMAZON CORS. So add in the CORS configuration

Now back to the app -> upload is working
we can see that the response status is 201 as we defined in our signing process

So now, let's add an alert when our upload completed. Show how to parse the URL and the key from the XML -> Add the alert, upload file. Now refactor as an action and move the handler up to the controller. Implement the imageUploadComplete (currently in the route).

NOTE: That we are using this.controllerFor in the controller only to clarify for the screencast. Since we are jumping around between files, even though we are already in our controller, I just wanted to be more clear as to where the properties that we're setting are.

Now we can see when we upload an image, it's added to our view

Now let's add in a little progress indicator to the button.
First add the onProgress action and console out the progress
Show the console
Now create a controller prop for the percentageComplete (default null)
Add the percentageComplete to the button (with the if statement to hide if null)
Now add the action in your controller to set that property
Now in the template, add the onProgress attr to the component
Now in the component, add the onProgress property
In the component update the onProgress action to send the onProgress action
Show that it's working
Go back to the controller and add a Math.round
Now it's working!

Now let's just clean up and hide the upload % if it's null.
And then after an upload is complete, let's reset the imageUploadPercentage to null

Finally, what if we want to upload multiple images?
Right now with the way we've coded our component, we just take the first file. So let's update the component to allow for multiple files to be uploaded. (add the multiple attr, loop through the images)

It's working. 

We can see in the console that a separate sign request is made for each image, it's uploaded to S3 and we're done. Now We should probably update our progress indicator to be individual progress bars for each file, but I'll leave that to you.

The ember-uploader is a great little library and thanks to Josh and all of the other contributors on it.
[SHOW GITHUB CONTRIBUTOR PAGE]
[SHOW JOSH BORTON TWITTER / GITHUB]

[SHOW BUILDLAB CLOSING TAG]