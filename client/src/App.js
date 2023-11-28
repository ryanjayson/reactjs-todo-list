import React from "react";
import "./Custom.css";
import Header from "./components/Header";
import Main from "./components/list";
import Footer from "./components/Footer";
import SignupForm from "./components/signupForm.js";

function App() {
  return (
    <div className="App">
      <Header />
      <Main />
      <SignupForm />
      <Footer />
    </div>
  );
}

export default App;
