const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../src/index");

const expect = chai.expect;
let tasks = [];
const testUser = {
  firstName: "John",
  lastName: "doe",
  email: "admin@gmail.com",
  password: "admin",
};

const testTask = {
  text: "Marketing",
  completed: false,
  ownerid: 0,
};

let { generatedToken, userid } = "";
chai.use(chaiHttp);

//CREATE USER | SIGNUP
describe("REST API: New User creation", () => {
  it("should create new user", (done) => {
    chai
      .request(app)
      .post("/signup")
      .send({
        user: testUser,
      })
      .end((err, res) => {
        // console.log("RESPONSE", res);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("user");
        done();
      });
  }).timeout(10000);
});

//LOGIN USER | LOGIN CREATED TEST USER
describe("REST API: User login", () => {
  it("should login newly created user", (done) => {
    chai
      .request(app)
      .post("/login")
      .send({ user: { name: testUser.email, password: testUser.password } })
      .end((err, res) => {
        // console.log("RESPONSE", res.body);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("user");
        expect(res.body).to.have.property("token");

        userid = res.body.user.id;
        generatedToken = res.body.token;

        done();
      });
  });
});

//GRAPHQL | CREATE TASK
describe("GraphQL API | Create task for a user", () => {
  it("should create a new task for new User", (done) => {
    const ADD_TODO = `
      mutation AddTodo($text: String!, $completed: Boolean!, $ownerid: ID!) {
        createTodo(text: $text, completed: $completed, ownerid: $ownerid) {
          id
          text
          completed
          ownerid
        }
      }
    `;
    //generated userid
    testTask.ownerid = userid;
    chai
      .request(app)
      .post("/graphql")
      .set({ Authorization: `Bearer ${generatedToken}` })
      .send({
        query: ADD_TODO,
        variables: testTask,
      })
      .end((err, res) => {
        if (err) {
          console.error(err);
          done(err);
        } else {
          // console.log("RESPONSE", res.body.data.createTodo);
          expect(res).to.have.status(200);
          expect(res.body.data.createTodo).to.have.property("id");
          done();
        }
      });
  });
});

// GET TASK
describe("GraphQL API | Get Tasks for a users", () => {
  it("should display the tasks for the new User", (done) => {
    const GET_TODOS = `
      query GetTodos($ownerid: ID!) {
        todoByOwnerId(ownerid: $ownerid) {
          id
          text
          completed
          datetime
        }
      }
    `;
    chai
      .request(app)
      .post("/graphql")
      .set({ Authorization: `Bearer ${generatedToken}` })
      .send({
        query: GET_TODOS,
        variables: { ownerid: userid },
      })
      .end((err, res) => {
        if (err) {
          console.error(err);
          done(err);
        } else {
          //Assign task to for delete (id)
          tasks = res.body.data.todoByOwnerId;
          console.log("RESPONSE", tasks);
          expect(res).to.have.status(200);
          expect(tasks[0]).to.have.property("id");
          done();
        }
      });
  });
});
// DELETE A TASK
describe("GraphQL API | Delete Tasks for a users", () => {
  it("should delete 1 task for the creted user", (done) => {
    const DELETE_TODO = `
      mutation DeleteTodo($id: ID!) {
        deleteTodo(id: $id) {
          id
          text
          completed
        }
      }
    `;

    chai
      .request(app)
      .post("/graphql")
      .set({ Authorization: `Bearer ${generatedToken}` })
      .send({
        query: DELETE_TODO,
        variables: { id: tasks[0].id },
      })
      .end((err, res) => {
        if (err) {
          console.error(err);
          done(err);
        } else {
          // console.log("RESPONSE", res.body.data.deleteTodo);
          expect(res).to.have.status(200);
          expect(res.body.data.deleteTodo).to.have.property("id");
          done();
        }
      });
  });
});
