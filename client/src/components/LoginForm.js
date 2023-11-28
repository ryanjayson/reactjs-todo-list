import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { setUser } from "../store/action";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import logo from "../assets/logo.png";

const Login = ({ user, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = { name: email, password: password };
      await axios
        .post(`${process.env.REACT_APP_SERVER_URL}login`, { user })
        .then((res) => {
          if (res.status === 200) {
            const authToken = res.data.token;
            console.log(authToken);
            localStorage.setItem("auth_token", authToken);

            handleSetUser(res.data.user);
            navigate("/dashboard");
          } else {
            alert("Cannot validate your credential, pleas try again");
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            alert("Cannot validate your credential, please try again");
          } else {
            alert("Error occured, please try again");
          }
        });
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  const handleSetUser = (user) => {
    setUser(user);
  };

  return (
    <div style={{ backgroundColor: "#fff" }}>
      <div
        style={{ backgroundColor: "#d4d4d4", textAlign: "center" }}
        className="p-2"
      >
        <img
          src={logo}
          className="app-logo"
          alt="logo"
          style={{ width: 120, height: 40 }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "center",
        }}
        className="p-4"
      >
        <div className="facebookBtn my-2">
          <span style={{ fontWeight: "bold", marginRight: "6px" }}>f</span>
          <span>Connect with Facebook</span>
        </div>
        <div className="my-4" style={{ display: "flex" }}>
          <div className="login-line-height">&nbsp;</div>
          <span className="login-or-height" style={{ color: "#96a5b5" }}>
            OR
          </span>
          <div className="login-line-height">&nbsp;</div>
        </div>

        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="customField"
              style={{ borderRadius: 2, height: 40 }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="customField"
              style={{ borderRadius: 2, height: 40 }}
            />
          </Form.Group>

          <div className="mt-2">
            <p className="mb-2 mt-4">
              Forgot your password?
              <a href="/register" className="mainLink">
                &nbsp; Click here
              </a>
            </p>
            <p className="">
              Don't have an account?
              <a href="/register" className="mainLink">
                &nbsp; Sign up
              </a>
            </p>
          </div>

          <Button type="submit" className="my-2 mainBtn">
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = {
  setUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
