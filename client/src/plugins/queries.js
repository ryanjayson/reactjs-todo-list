import { gql } from "@apollo/client";

export const GET_TODOS = gql`
  query GetTodos($ownerid: ID!) {
    todoByOwnerId(ownerid: $ownerid) {
      id
      text
      completed
      datetime
    }
  }
`;

export const ADD_TODO = gql`
  mutation AddTodo($text: String!, $completed: Boolean!, $ownerid: ID!) {
    createTodo(text: $text, completed: $completed, ownerid: $ownerid) {
      id
      text
      completed
      ownerid
    }
  }
`;

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      id
      text
      completed
    }
  }
`;

export const COMPLETE_TODO = gql`
  mutation CompleteTodo($id: ID!) {
    completeTodo(id: $id) {
      id
      text
      completed
    }
  }
`;
