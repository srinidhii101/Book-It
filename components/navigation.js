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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook } from '@fortawesome/free-solid-svg-icons';

import { checkRole, isLoggedIn, logout } from '../functions/auth';

export default class Navigation extends React.Component {
  constructor(props) {
     super(props);

     this.toggle = this.toggle.bind(this);
     this.state = {
       isOpen: false,
     };

     this.showAdmin = !checkRole(['admin']),
     this.showServices = !checkRole(['admin','vendor'])
   }

   toggle() {
     this.setState({
       isOpen: !this.state.isOpen
     });
   }

   handleLogout(e) {
     e.preventDefault();
     e.stopPropagation();
     logout();
   }

   render() {

     return (
       <div>
        <Header/>
         <Navbar color="primary" dark expand="md" fixed={'top'}>
           <Link href="/">
             <NavbarBrand className="text-light">
                <FontAwesomeIcon icon={faAddressBook} className="mr-2 logo-icon"/>Book it!
             </NavbarBrand>
           </Link>
           <NavbarToggler onClick={this.toggle} />
           <Collapse isOpen={this.state.isOpen} navbar>
             <Nav className="ml-auto" navbar>
               {this.showAdmin &&
                 <NavItem>
                   <Link href="/admin">
                     <NavLink>Admin</NavLink>
                   </Link>
                 </NavItem>
               }
               {this.showServices &&
                 <NavItem>
                    <Link href="/services">
                      <NavLink>
                        Services
                      </NavLink>
                    </Link>
                  </NavItem>
               }
               <NavItem>
                <Link href="/browse">
                  <NavLink>Browse</NavLink>
                </Link>
               </NavItem>
               <UncontrolledDropdown nav inNavbar>
                 <DropdownToggle nav caret>
                   Account
                 </DropdownToggle>
                 <DropdownMenu right>
                   <Link href="/cart">
                     <DropdownItem>
                      <a>Cart</a>
                     </DropdownItem>
                   </Link>
                   <Link href="/checkout">
                     <DropdownItem>
                      <a>Checkout</a>
                     </DropdownItem>
                   </Link>
                   <Link href="/orders">
                     <DropdownItem>
                      <a>Orders</a>
                     </DropdownItem>
                   </Link>
                 </DropdownMenu>
               </UncontrolledDropdown>

               {isLoggedIn() ?
                 <NavItem onClick={this.handleLogout.bind(this)}>
                  <Link href="/login">
                    <NavLink>
                      Logout
                    </NavLink>
                  </Link>
                 </NavItem>
                 :
                 <NavItem>
                    <Link href="/register">
                      <NavLink>
                        Register
                      </NavLink>
                    </Link>
                 </NavItem>
               }
             </Nav>
           </Collapse>
         </Navbar>
       </div>
     );
   }
}
