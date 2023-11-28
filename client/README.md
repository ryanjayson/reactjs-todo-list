# Task List Web App

[TOCM]

**TECHNOLOGIES**

- reactJS
- nodeJS
- express
- mysql
- sql
- apollo graphql
- redux-react
- jwt
- bootsrap
- Mocha Chai (Testing)

**_Features:_**

- Create new user
- Sign-in user
- Create task (linked to user)
- List all task
- Delete test
- Complete task
- JWTAuthorization

# **Database setup**

1. Go to db directory
   `>cd db`
2. Change environment variables
   Locate .env file and update the following based on your MySQL server connection

   PORT=your_port
   MYSQL_HOST=your_host
   MYSQL_USER=your_user
   MYSQL_PASSWORD=your_password

3. Run the following command to seed database
   `npm run seed `
4. Output should be:
   `Database 'database name' and 2 Tables (user and todos) created successfully `
5. Please verify in your MySQL if the database and table was created

# ** Starting server**

6.  Go to server directory
    `>cd server`
7.  Change environment variables
    Locate .env file and change the following based on your MySQL server connection (where you run and added database earlier )
    MYSQL_HOST=your_host
    MYSQL_USER=your_user
    MYSQL_PASSWORD=your_password

Please leave the MYSQL_DATABASE=mydbtask

_OPTIONAL_
You can change the secret and salt round variables, these are for the token and hashing of password, you leave it as it is

    MY_SECRET=secret
    SALT_ROUND=10

8. Start the server
   `>npm run serve`
9. Output should be:
   `Server running at http://localhost:4000/graphql`

# **Starting client**

1. Go to client directory
   `>cd client`
2. Start the app with the command
   `>npm run start`
3. Output should be:
   ` >simple-todo-react@0.1.0 start`
   `>react-scripts start`

# **Test**

Tests for REST /signup and /login API endpoint and
CreateTodo, DeleteTodo, and TodoByOwnerId (List of Task) GraphQL API (mutation and Query)

1. Go to server directory to test APIs
   `>cd server`
1. Run the test with the command
   `>npm run test`

It should show the test and results with 5 passing

REST API: New User creation
REST API: User login
GraphQL API | Create task for a user
GraphQL API | Get Tasks for a users '
GraphQL API | Delete Tasks for a users

5 passing
