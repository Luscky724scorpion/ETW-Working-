import { Link } from "react-router";
import Container from "react-bootstrap/Container";

import Nav from "react-bootstrap/Nav";

import React from "react";

export default function NavBar() {
    
    
  return (
    <Nav
      className="styles.Nav"
      style={{ display: "flex", justifyContent: "space-evenly" }}
    >
      <Nav.Item >
        <Link to="/Wheel">Wheel</Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/Journal">Journal</Link>
      </Nav.Item>
      {/*<Nav.Item>
        <Link to="/Feelings">Feelings</Link>
      </Nav.Item>*/}
      <Nav.Item>
        {" "}
        <Link to="/Board">Board</Link>
      </Nav.Item>
      <Nav.Item>
        {" "}
        <Link to="/Logs">Logs</Link>
      </Nav.Item>
      <Nav.Item>
        {" "}
        <Link to="/login">Login</Link>
      </Nav.Item>
      <Nav.Item>
        {" "}
        <Link to="/register">Register</Link>
      </Nav.Item>
    </Nav>
  );
}
