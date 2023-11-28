const express = require("express");
require("dotenv").config();
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const typeDefs = require("./schema");
const bcrypt = require("bcrypt");
const resolvers = require("./resolvers");
const bodyParser = require("body-parser");
const app = express();
const { request, gql } = require("graphql-request");
const jwt = require("jsonwebtoken");
const authenticateToken = require("./utils/tokenUtil");

const PORT = process.env.PORT;
const HOST = process.env.HOST;

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // context: ({ req, res }) => {
  //   if (req.body.query.includes("createTodo")) {
  //     authenticateToken(req, res, () => {});

  //     console.log("myRES", res);
  //   }

  //   return { res };
  // },
});

const GRAPHQL_ENDPOINT = `${HOST}:${PORT}${server.graphqlPath}`;

app.post("/login", async (req, res) => {
  try {
    const { name, password } = req.body.user;

    if (!name || !password) {
      res.status(401);
      res.send({ user: {} });
    }
    const USER_QUERY = gql`
      query UserByEmail($email: String!) {
        userByEmail(email: $email) {
          id
          email
          firstName
          lastName
          password
        }
      }
    `;

    request(GRAPHQL_ENDPOINT, USER_QUERY, { email: name }).then((data) => {
      if (data.userByEmail[0]) {
        //check if valid password with same user by email
        const validPassword = bcrypt.compareSync(
          password,
          data.userByEmail[0].password
        );

        if (!validPassword) {
          throw new Error("Invalid username or password");
        }
        // Generate JWT token upon successful login
        const token = jwt.sign(
          { userId: data.userByEmail[0].id },
          process.env.MY_SECRET,
          {
            expiresIn: "1h",
          }
        );
        // console.log("TOKEN ", token);

        res.status(200);
        res.send({ user: data.userByEmail[0], token: token });
      } else {
        res.status(401);
        res.send({ user: {} });
      }
    });
  } catch (error) {
    res.status(500);
    res.send({ message: error });
  }
});

app.post("/signup", async (req, res) => {
  try {
    const user = req.body.user;

    if (!user.firstName || !user.lastName || !user.email || !user.password) {
      res.status(401);
      res.send({ user: {} });
    }
    const SIGNUP_MUTATION = gql`
      mutation Signup($input: SignupInput!) {
        signup(input: $input) {
          id
          firstName
          lastName
          email
        }
      }
    `;

    request(GRAPHQL_ENDPOINT, SIGNUP_MUTATION, { input: user }).then((data) => {
      if (data) {
        res.status(200);
        res.json({ user: data }).send();
      }
    });
  } catch (error) {
    res.status(500);
    res.send({ message: error.message });
  }
});

app.post("/graphql", authenticateToken, async (req, res, next) => {
  //addded middleware for authentication
  try {
    next();
  } catch (error) {
    res.status(500);
    res.send({ message: error.message });
  }
});

server.start().then((res) => {
  server.applyMiddleware({ app });
  app.listen({ port: PORT }, () =>
    console.log(`Server running at ${HOST}:${PORT}${server.graphqlPath}`)
  );
});

module.exports = app;
