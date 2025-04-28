
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button'; 
import { useAuth } from '../contexts/Authprovider';

function NavBar() { // Rename this to your actual component name
  const { token, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut();
    navigate('/login');
   
  };

  return (
  
    <Nav
      className="styles.Nav" 
      style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #ccc" }} 
    >
     
      {token && (
        <>
          <Nav.Item>
            {/* Use Nav.Link with as={Link} and to props */}
            <Nav.Link as={Link} to="/Wheel">Wheel</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/Journal">Journal</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/Board">Board</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/Logs">Logs</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            {/* Use a Button or a styled Nav.Link for logout */}
            <Button variant="outline-danger" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          
          </Nav.Item>
        </>
      )}

      {/* Links visible only when logged OUT */}
      {!token && (
        <>
          <Nav.Item>
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/register">Register</Nav.Link> {/* Or Signup */}
          </Nav.Item>
        </>
      )}
    </Nav>
  );
}

export default NavBar;