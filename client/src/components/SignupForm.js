import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";

const SignupForm = () => {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (
        !formData.email ||
        !formData.firstName ||
        !formData.lastName ||
        !formData.password
      ) {
        alert("Please check the fields");
        return false;
      }
      await axios
        .post(`${process.env.REACT_APP_SERVER_URL}signup`, { user: formData })
        .then((res) => {
          if (res.data.user) {
            navigate("/");
          } else {
            alert("Create user failed, please try again");
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            alert("Create user, please try again");
          } else {
            alert("Error occured, please try again");
          }
        });
    } catch (error) {
      alert("Error occured, please try again", error.message);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2
        className="mainText"
        style={{
          fontSize: "30px",
          fontWeight: 700,
          textShadow: "rgb(0, 0, 0) 1px 1px 0px",
        }}
      >
        List Your Task, Free!
      </h2>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control
          type="text"
          placeholder="Firstname"
          name="firstName"
          value={formData.firstName}
          className="customField"
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control
          type="text"
          placeholder="Lastname"
          name="lastName"
          value={formData.lastName}
          className="customField"
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control
          type="email"
          placeholder="Enter email"
          name="email"
          value={formData.email}
          className="customField"
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          className="customField"
          onChange={handleChange}
        />
      </Form.Group>

      <p style={{ fontSize: "12px", color: "#1f487c" }}>
        I have a license/permit & I read the{" "}
        <a href="/" className="mainLink">
          Terms and Conditions.
        </a>
      </p>
      <Button style={{ width: "104px" }} className="mainBtn" type="submit">
        Join Now!
      </Button>

      <p className="my-3">
        <a style={{ color: "#fff", textDecoration: "none" }} href="/">
          Back to Homapage
        </a>
      </p>
    </Form>
  );
};

export default SignupForm;
