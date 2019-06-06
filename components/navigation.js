import Header from './header';
import Link from 'next/link';

import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';

//Top navigation of the application
function Navigation() {
  return (
    <div className="navigationHeader">
      <Header />
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark" fixed="top">
        <Link href="/">
          <a>
            <Navbar.Brand>
              Book it
            </Navbar.Brand>
          </a>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <NavDropdown title="Account" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/admin" disabled>Admin</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/my-account" disabled>My Account</NavDropdown.Item>
              <NavDropdown.Item href="/register">Register</NavDropdown.Item>
              <NavDropdown.Item href="/login">Login</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/browse" disabled>Browse</Nav.Link>
            <Nav.Link href="/services">Manage Services</Nav.Link>
            <Nav.Link eventKey={2} href="/cart" className="mr-sm-2" disabled>
              Cart
            </Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" disabled />
            <Button variant="success" disabled>Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Navigation;
