import Todo from "../components/Todo.js";
import Container from "react-bootstrap/Container";

const Dashboard = () => {
  return (
    <>
      <Container>
        <p className=" testimonial-banner-title mt-5">Your Task List</p>
      </Container>
      <Todo />
    </>
  );
};

export default Dashboard;
