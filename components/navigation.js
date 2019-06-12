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
           <Link href="/" prefetch>
             <NavbarBrand className="text-light">
                Book-it
             </NavbarBrand>
           </Link>
           <NavbarToggler onClick={this.toggle} />
           <Collapse isOpen={this.state.isOpen} navbar>
             <Nav className="ml-auto" navbar>
               <NavItem>
                  <Link href="/services" prefetch>
                      <NavLink>
                        Services
                      </NavLink>
                  </Link>
               </NavItem>
               <NavItem>
                  <Link href="/browse" prefetch>
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
                   <Link href="/login" prefetch>
                     <DropdownItem>
                      <a>Login</a>
                     </DropdownItem>
                   </Link>
                   <Link href="/register" prefetch>
                     <DropdownItem>
                      <a>Register</a>
                     </DropdownItem>
                   </Link>

                   <DropdownItem divider />

                   <Link href="/admin" prefetch>
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
