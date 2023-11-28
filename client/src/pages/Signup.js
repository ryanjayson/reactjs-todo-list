import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../assets/Custom.css";
import SignupForm from "../components/SignupForm.js";
import Container from "react-bootstrap/Container";

function Register() {
  return (
    <>
      <div className="signup">
        <Container className="h-100">
          <div
            className="h-100"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <div
              style={{
                minWidth: "400px",
                textAlign: "center",
              }}
            >
              <SignupForm />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

export default Register;
