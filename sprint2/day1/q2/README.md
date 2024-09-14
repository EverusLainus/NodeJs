Problem Statement: Dynamic Queries with Mongoose

Objective: The objective of this assignment is to implement dynamic data retrieval using Mongoose in an Express.js application without explicitly defining Mongoose models in the server file. This approach leverages Mongoose's schemaless database queries without rigid model definitions.

The assignment emphasizes understanding flexible querying strategies, handling large datasets efficiently, and maintaining flexibility in database queries without rigid model definitions.
Endpoints to Implement: Students are required to create the following endpoint in their Express.js application:

1. Endpoint: /api/users
   • Method: GET
   • Query Parameters:
   • name : Optional parameter to filter users by name.
   • age : Optional parameter to filter users by age.
   • Purpose: Retrieves a list of users from the MongoDB database based on the provided query parameters.
   • Response: JSON array containing user data matching the query criteria.
2. Additional Requirements:
   • Validation: Validate input parameters to ensure they are within acceptable ranges.
   • Error Handling: Implement error handling for invalid queries or database errors.
