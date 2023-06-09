import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginSubmit = (event) => { //set event to prevent error from using global variable in strict mode
    event.preventDefault();
    fetch("http://localhost:5000/login", { //api to check login credintials using sql post method
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ customer_email: email, customer_password: password }) 
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Invalid credentials");
        }
      })
      .then((data) => {
        console.log("Login Successful");
        props.handleLogin(data.customer_ID);
        document.cookie = `isLoggedIn=true;`;
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Card.Body>
      <Card>
        <Card.Body>
          <h2>Login</h2>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
            </Form.Group>
            <Button className="btn-primary" variant="primary" type="submit" onClick={handleLoginSubmit}>
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Card.Body>
  );
};

export default Login;

