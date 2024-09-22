## User Management

• We will be having three roles - admin, managers, members.
What our application do ?
• Members can come to our platform and add their tasks for the day.
• members can have the ability to mark their tasks as completed or pending, initially the task should have be flagged as pending. They can also delete their tasks.
• Whenever a member mark his/her task as completed, with the timestamp we will mark that task as completed.
• Managers will be able to view any members task for the day.
• Member can only view their tasks.
• All the user of the app should be authorised before accessing it.
• There can be multiple managers.
• There can only be one admin.
• There can be multiple users.
• One user can have multiple tasks.
• Admin should be able to see the total number of tasks added per day.
• Average of tasks - completed/ total.
• Admin should be able to disable or able any user in the website.
• Task can have description and title.
Note

1. Use MongoDB to store data even locally is fine.
2. Submit the documentation around database design.
3. Use Winston for logging - log any errors in application to a collection in the DB.
4. Have a validation middleware which checks whether a user is authenticated or not.
5. Implement a rate limiter which limits each user's IP to make only 1 request for weather per 3 minutes. (Explore any rate-limiter package)
6. Keep a check for env, if all the variables are not present in the .env file so it should not start a server.
7. Follow all the best practices, such as following the MVC structure, storing all secret things in .env, committing regularly with proper git messages, clean code, etc.
