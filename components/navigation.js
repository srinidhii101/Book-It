import Header from './header';
import Link from 'next/link';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressBook } from '@fortawesome/free-solid-svg-icons'


export default class Navigation extends React.Component {
  constructor(props) {
     super(props);

     this.toggle = this.toggle.bind(this);
     this.state = {
       isOpen: false
     };
   }
   toggle() {
     this.setState({
       isOpen: !this.state.isOpen
     });
   }
   render() {
     return (
       <div>
        <Header/>
         <Navbar color="primary" dark expand="md" fixed={'top'}>
           <Link href="/">
             <NavbarBrand className="text-light">
                <FontAwesomeIcon icon={faAddressBook} className="mr-2"/>Book it!
             </NavbarBrand>
           </Link>
           <NavbarToggler onClick={this.toggle} />
           <Collapse isOpen={this.state.isOpen} navbar>
             <Nav className="ml-auto" navbar>
               <NavItem>
                  <Link href="/services">
                      <NavLink>
                        Services
                      </NavLink>
                  </Link>
               </NavItem>
               <NavItem>
                  <Link href="/browse">
                      <NavLink disabled>
                        Browse
                      </NavLink>
                  </Link>
               </NavItem>
               <UncontrolledDropdown nav inNavbar>
                 <DropdownToggle nav caret>
                   Account
                 </DropdownToggle>
                 <DropdownMenu right>
                   <Link href="/login">
                     <DropdownItem>
                      <a>Login</a>
                     </DropdownItem>
                   </Link>
                   <Link href="/register">
                     <DropdownItem>
                      <a>Register</a>
                     </DropdownItem>
                   </Link>
                   <Link href="/orders">
                     <DropdownItem>
                      <a>Orders</a>
                     </DropdownItem>
                   </Link>

                   <DropdownItem divider />

                   <Link href="/admin">
                     <DropdownItem disabled>
                      <a>Admin</a>
                     </DropdownItem>
                   </Link>

                 </DropdownMenu>
               </UncontrolledDropdown>
             </Nav>
           </Collapse>
         </Navbar>
       </div>
     );
   }
}
