Setting up express server and integrating morgan logger middleware to log HTTP requests.

- handle four http method

  - get
  - post
  - put
  - delete

- get request

  - / :
  - /get-users:

- post request

  - /add-user

- put request

  - /user/:id

- delete request

  - /user/:id

- integrate Morgan Logger Middleware

- append the logs to access.log in src

  - method
  - status
  - content-length
  - time-taken
  - data
  - http version
  - url
  - new line

- log matches output
