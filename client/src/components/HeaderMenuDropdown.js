import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { clearuser } from "../store/action";
import { useLocation } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import InputGroup from "react-bootstrap/InputGroup";
import Modal from "react-bootstrap/Modal";
import LoginForm from "../components/LoginForm.js";

function HeaderMenuDropdown(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [currentPage, setCurrentPage] = useState("");
  const location = useLocation();
  let navigate = useNavigate();

  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location]);

  const isMenuItemVisible = (page) => {
    return page === currentPage;
  };

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("redux_user");
    clearuser();
    navigate("/");
  };

  return (
    <>
      <div>
        <InputGroup className="mb-3 mt-1">
          <DropdownButton
            variant="warning"
            className="primary-btn"
            title="Menu"
            id="input-group-menu"
            style={{ borderRadius: 4 }}
          >
            <i class="fa fa-heart"></i>
            <Dropdown.Item
              href="/"
              style={{
                display: isMenuItemVisible("/") ? "none" : "block",
              }}
            >
              Home
            </Dropdown.Item>
            <Dropdown.Item
              href="/dashboard"
              style={{
                display: isMenuItemVisible("/dashboard") ? "none" : "block",
              }}
            >
              Dashboard
            </Dropdown.Item>
            <Dropdown.Item
              onClick={handleShow}
              style={{
                display: isMenuItemVisible("/dashboard") ? "none" : "block",
              }}
            >
              Login
            </Dropdown.Item>
            <Dropdown.Item
              href="/register"
              style={{
                display: isMenuItemVisible("/dashboard") ? "none" : "block",
              }}
            >
              Sign Up
            </Dropdown.Item>
            <Dropdown.Item
              onClick={handleLogout}
              style={{
                display: isMenuItemVisible("/") ? "none" : "block",
              }}
            >
              Log out
            </Dropdown.Item>
          </DropdownButton>
        </InputGroup>
      </div>

      <Modal
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
        id="loginModal"
      >
        <LoginForm />
      </Modal>
    </>
  );
}
const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = {
  clearuser,
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderMenuDropdown);
