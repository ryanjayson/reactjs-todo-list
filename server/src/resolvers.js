const transactionQuery = require("./utils/dbconn");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let todoList = [];

const resolvers = {
  Query: {
    todoList: async () => {
      try {
        const sql = `SELECT * FROM todos`;
        const results = await transactionQuery(sql);
        todoList = results;
        return results;
      } catch (error) {
        console.error("Error executing query:", error);
      }
      return [];
    },
    todoByOwnerId: async (_, { ownerid }) => {
      try {
        const sql = `SELECT * FROM todos WHERE ownerid = ?`;
        const results = await transactionQuery(sql, ownerid);
        return results;
      } catch (error) {
        console.error("Error executing query:", error);
      }
      return [];
    },
    userByEmail: async (_, { email }) => {
      try {
        const sql = `SELECT * FROM users WHERE email = ?`;
        const results = await transactionQuery(sql, email);
        return results;
      } catch (error) {
        console.error("Error executing query:", error);
      }
      return [];
    },
  },
  Mutation: {
    signup: async (_, { input }) => {
      let newUser = {};
      try {
        const { firstName, lastName, email, password } = input;
        const sql = `INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)`;
        const hashedPass = bcrypt.hashSync(password, 10);

        const result = await transactionQuery(sql, [
          firstName,
          lastName,
          email,
          hashedPass,
        ]);
        newUser = {
          id: result.insertId,
          firstName,
          lastName,
          email,
        };
      } catch (error) {
        console.error("Error executing query:", error);
      }
      return newUser;
    },
    //TODO
    createTodo: async (_, { text, completed, ownerid }) => {
      let newTodo = {};
      try {
        const sql = `INSERT INTO todos (text, completed, dateTime, ownerid) VALUES (?, ?, now(), ?)`;
        const result = await transactionQuery(sql, [text, false, ownerid]);
        newTodo = {
          id: result.insertId,
          text,
          completed,
          ownerid,
        };
      } catch (error) {
        console.error("Error executing query:", error);
      }
      return newTodo;
    },
    deleteTodo: async (_, { id }) => {
      try {
        const sql = `DELETE FROM todos WHERE id = ?`;
        const result = await transactionQuery(sql, id);

        if (result.affectedRows === 1) {
          const deletedTask = {
            id: id,
            text: "DELETED",
            completed: false,
          };
          return deletedTask;
        }
      } catch (error) {
        console.error("Error executing query:", error);
        return {};
      }
      return {};
    },
    completeTodo: async (_, { id }) => {
      const updateTodo = todoList.find((todo) => todo.id === id);
      try {
        const sql = `UPDATE todos SET completed = true WHERE id = ?`;
        const result = await transactionQuery(sql, id);
      } catch (error) {
        console.error("Error executing query:", error);
      }
      return updateTodo;
    },
  },
};

module.exports = resolvers;
