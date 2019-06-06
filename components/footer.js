import { Navbar, Nav } from 'react-bootstrap';

//Footer structure
function Footer() {
  return (
    <div className="navigationFooter">
      <Navbar collapseOnSelect expand="lg" sticky="bottom">
        <Nav className="flex justify-content-end">
          <Nav.Item>
            <Nav.Link eventKey="link-1" className="navigationFooterLink">&copy; 2019 Book it</Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar>
    </div>
  );
}

export default Footer;
