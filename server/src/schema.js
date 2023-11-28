const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    Users: [User!]!
    Todos: [Todo!]!
    todoList: [Todo!]!
    todoByOwnerId(ownerid: ID!): [Todo!]!
    userByEmail(email: String!): [User!]!
  }

  type Mutation {
    signup(input: SignupInput): User
    createTodo(text: String!, completed: Boolean!, ownerid: ID!): Todo!
    updateTodo(id: ID!, text: String, completed: Boolean): Todo!
    deleteTodo(id: ID!): Todo
    completeTodo(id: ID!): Todo
  }

  input SignupInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  type AuthPayload {
    token: String
    user: User
  }

  type Todo {
    id: ID
    text: String!
    completed: Boolean!
    datetime: String!
    ownerid: ID!
  }
`;

module.exports = typeDefs;
