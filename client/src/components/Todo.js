import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Card from "react-bootstrap/Card";
import {
  GET_TODOS,
  ADD_TODO,
  DELETE_TODO,
  COMPLETE_TODO,
} from "../plugins/queries";

const Todo = () => {
  const user = useSelector((state) => state.user);
  const ownderId = user.id;
  const { loading, error, data } = useQuery(GET_TODOS, {
    variables: { ownerid: ownderId },
  });
  const [addTodo] = useMutation(ADD_TODO);
  const [deleteTodo] = useMutation(DELETE_TODO);
  const [completeTodo] = useMutation(COMPLETE_TODO);
  let navigate = useNavigate();

  const [state, setState] = useState({
    userInput: "",
  });

  const updateInput = (value) => {
    setState({
      userInput: value,
    });
  };

  const handleAddTodo = async () => {
    try {
      if (state.userInput) {
        const createdTodo = await addTodo({
          variables: {
            text: state.userInput,
            completed: false,
            ownerid: user.id,
          },
          refetchQueries: [
            {
              query: GET_TODOS,
              variables: { ownerid: ownderId },
            },
          ],
        });
        console.log(createdTodo);
        state.userInput = "";
      } else {
        alert("Please add note");
      }
    } catch (error) {
      console.error("Mutation error:", error);
    }
  };

  const handleDeleteTodo = (id) => {
    deleteTodo({
      variables: { id },
      refetchQueries: [
        {
          query: GET_TODOS,
          variables: { ownerid: ownderId },
        },
      ],
    });
  };

  const handleCompleteTodo = (id) => {
    completeTodo({
      variables: { id },
      refetchQueries: [
        {
          query: GET_TODOS,
          variables: { ownerid: ownderId },
        },
      ],
    });
  };

  const completedButton = (id, prop) => {
    const completedBtn = prop ? (
      <Button variant="warning" disabled="disabled">
        Completed
      </Button>
    ) : (
      <Button variant="warning" onClick={() => handleCompleteTodo(id)}>
        Complete
      </Button>
    );

    return completedBtn;
  };

  if (loading)
    return (
      <>
        <Container style={{ backgroundColor: "#fff" }}>
          <Row
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "3rem",
              fontWeight: "bolder",
              backgroundColor: "#FFF",
            }}
          >
            <p>Loading...</p>
          </Row>
        </Container>
      </>
    );

  if (error) {
    console.log(error);
    setTimeout(function () {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("redux_user");
      navigate("/");
    }, 3000);
    return (
      <>
        <Container style={{ backgroundColor: "#fff" }}>
          <Row
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "3rem",
              fontWeight: "bolder",
              backgroundColor: "#FFF",
            }}
          >
            <p>Logging out...</p>
          </Row>
        </Container>
      </>
    );
  }

  return (
    <Container style={{ backgroundColor: "#fff" }} className="mb-5">
      <hr />
      <Row className="justify-content-md-center ">
        <Col md="6">
          <InputGroup className="my-5">
            <FormControl
              placeholder="Add Note . . . "
              value={state.userInput}
              onChange={(item) => updateInput(item.target.value)}
              aria-label="add something"
              aria-describedby="basic-addon2"
              style={{ borderRadius: 4, height: 40 }}
              onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
            />
            <Button
              className="mainBtn"
              style={{ width: 100, height: 40 }}
              onClick={() => handleAddTodo()}
            >
              Add note
            </Button>
          </InputGroup>
        </Col>
      </Row>
      <Row>
        {data.todoByOwnerId.map((todo) => (
          <Col md="4" key={todo.id}>
            <Card
              style={{
                backgroundColor: "#23aaaa",
                color: "#fff",
                borderRadius: 5,
                border: "none",
              }}
              className="mb-3"
            >
              <Card.Body>
                <Card.Text className="h5">{todo.text}</Card.Text>
                <Card.Text style={{ fontSize: 10 }}>
                  Added: {todo.datetime}
                </Card.Text>
                {completedButton(todo.id, todo.completed)}
                <Button
                  variant="link"
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Todo;
