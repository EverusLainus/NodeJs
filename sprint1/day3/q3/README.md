# File Uploader Service

- Express server that handles file uploads via a POSt request and serve a simple HTML.

# Problem Statement

- serve a HTML form "/"
- handle file uploads via POST /upload
- Multer middleware
- Once the file has been processed by server, it needs to be uploaded to cloudinary and you need to store the url to send in the response.
- Provide feedback to user upon successful file upload with a status code of 200 and a confirmation message.

# Folder Structure:

- `src`
  - index.html - contains html for for file submission
  - index.js = the main server file
- uploads - storing uploaded filed

# Expected Behavious

- Get to "/" uplading respondin with code 200
- post

```
{
   "message": "file uploaded successfully",
   "imageUrl" : "<cloudinaryLink>"
}
```
