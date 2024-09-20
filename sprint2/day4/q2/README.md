## Implement JWT Authentication with Refresh Tokens using Passport.js

Implement JWT authentication in your CRUD application for Products/Posts/Todos using Passport.js. The goal is to secure all routes exc using refresh tokens.

## Requirements:

- Passport.js for JWT Authentication:
  Use Passport.js to protect all routes except the homepage.
  Ensure protected routes are not accessible without a valid JWT token.
  Configure Passport.js to accept the JWT token in the HTTP header as Authorization: Bearer <token>.
- Token Expiry:
  Set the expiry of the JWT access token to 1 hour.
  Utilize the JWT library's expiry feature to manage token validity.
- Refresh Tokens:
  Implement refresh tokens to allow users to obtain new access tokens without re-authentication.
  Generate a refresh token upon user login along with the access token.
  Store refresh tokens securely.
  Set the expiry of the refresh token to 7 days.
  Provide an endpoint to issue new access tokens using a valid refresh token.
  Invalidate the refresh token upon user logout.

## Endpoints:

User Registration:
POST /register
Request Body: { "username": "string", "password": "string" } Response: 201 Created on success, error message on failure.
User Login:
POST /login
Request Body: { "username": "string", "password": "string" }
Response: 200 OK with access token and refresh token on success, error message on failure.
Protected CRUD Routes:
Example routes: GET /products, POST /products, PUT /products/:id, DELETE /products/:id
Require Authorization: Bearer <access_token> in headers.
Refresh Token:
