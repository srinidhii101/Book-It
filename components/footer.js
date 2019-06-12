import { Navbar, NavItem, NavLink } from 'reactstrap';

//Footer structure
function Footer() {
  return (
    <div className="navigationFooter">
      <Navbar sticky={"bottom"}>
        <NavLink disabled>&copy; 2019 Book it</NavLink>
      </Navbar>
    </div>
  );
}

export default Footer;
