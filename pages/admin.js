/* This gives the header, navigation, and footer */
import DefaultLayout from '../layouts/default';
import { checkRole } from '../functions/auth';
import axios from 'axios';


/* Put the reactstrap components in here that are needed */
import { Table, Button, Form, FormGroup, Label, Container, Row, Col, ListGroup, ListGroupItem, Input, Nav, NavItem, ButtonGroup, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import { ToastContainer, toast } from 'react-toastify';
import '../node_modules/react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserTie, faUserCog } from '@fortawesome/free-solid-svg-icons';
import Router from 'next/router';

class Admin extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      users:[],
      userIndex:0,
      role:"customer",
      email:""

    };
  }
  //when the component mounts, redirecting if the user does not possess the correct permissions.
  componentDidMount() {
    if(checkRole(['admin'])) {
      Router.push('/login');
    }
    fetch('http://localhost:3001/api/users/')
      .then((data) => data.json())
      .then((res) => this.setState({ users: res.data }))
      .then(() => this.loadFirstUser())
      .then(()=> console.log(this.state))
      .catch((err)=>{toast.warn("There were issues connecting to the server. Please check your connection.")});
  }

  handleSaveChanges() {
    toast.success("Changes have been successfully saved!");
  }

  loadFirstUser() {
    this.setState({
      ...this.state,
      role: this.state.users[0].role,
      email:this.state.users[0].email,
      userIndex: 0
    });
  }

  onChangeOption(e) {
    if(e.target.value) {
      e.currentTarget.childNodes[0].innerHTML = e.target.value;
      //should do better at tracking this
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
  }
  handleUserIndexChange(index, e) {
    this.setState({
      ...this.state,
      role:this.state.users[e.currentTarget.id].role,
      email:this.state.users[e.currentTarget.id].email,
      userIndex: index
    });
  }

  handleRoleChange = async (e) => {
   await axios.post('http://localhost:3001/api/users/update', {
        "email": this.state.email,
        "newRole": e.currentTarget.id
     });  

    this.setState({ ...this.state, role: e.currentTarget.id});

  }

  render() {
    /* Define variables here */
    //const { username, password } = this.state;

    return (
      <DefaultLayout>
        {/* Your HTML/JSX goes here... I'll probably do this one */}
        <Container fluid={true} className="mt-16">
          <Row>
            {/* Sidebar */}
            <Col sm={3} className="searchContentContainer">
              {/* Bottom display lists */}
              <Container>
                <Row>
                  <Col>
                     <Input type="search" placeholder="Search user here..." />
                  </Col>
                </Row>
                <hr/>
                <Row>
                  <Col className="pb-16">
                    <label className="text-muted">Results:</label>
                    {/* Emulating an overflowing list of users */}
                    <ListGroup className="searchResultList mb-8">
                    {this.state.users &&
                        this.state.users.map((user, index) => {
                          return (
                            <ListGroupItem
                              action
                              key={user._id}
                              id={index}
                              active={index == this.state.userIndex}
                              className="listItem"
                              onClick={this.handleUserIndexChange.bind(this, index)}>
                                {user.email}
                            </ListGroupItem>)
                        })
                      }

                    </ListGroup>
                  </Col>

                </Row>
              </Container>
            </Col>

            {/* Content */}
            <Col sm={9}>

              <Form
              name="editServiceForm">
                <Nav className="serviceNav">
                  <NavItem>
                    <h3>Admin Panel</h3>
                  </NavItem>
                </Nav>

                <Container className="mt-8">
                  <Row>
                    <Col s={12} lg={8}>
                      <Label className="text-muted">Manage User Orders:</Label>
                      {/* Service name and service picture */}
                      <Table bordered responsive hover className="">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Kirby's Electrical</td>
                            <td>2019-06-13</td>
                            <td>
                              <UncontrolledDropdown onClick={this.onChangeOption.bind(this)}>
                                <DropdownToggle caret color="light">
                                  In-progress
                                </DropdownToggle>
                                <DropdownMenu>
                                  <DropdownItem value="In-progress">In-progress</DropdownItem>
                                  <DropdownItem value="Pending">Pending</DropdownItem>
                                  <DropdownItem value="Completed">Completed</DropdownItem>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </td>
                          </tr>
                          <tr>
                            <td>Linda's Landscaping</td>
                            <td>2019-06-13</td>
                            <td>
                              <UncontrolledDropdown onClick={this.onChangeOption.bind(this)}>
                                <DropdownToggle caret color="light">
                                  In-progress
                                </DropdownToggle>
                                <DropdownMenu >
                                  <DropdownItem value="In-progress">In-progress</DropdownItem>
                                  <DropdownItem value="Pending">Pending</DropdownItem>
                                  <DropdownItem value="Completed">Completed</DropdownItem>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </td>
                          </tr>
                          <tr>
                            <td>Kyle's Tutoring</td>
                            <td>2019-06-13</td>
                            <td>
                              <UncontrolledDropdown onClick={this.onChangeOption.bind(this)}>
                                <DropdownToggle caret color="light">
                                  In-progress
                                </DropdownToggle>
                                <DropdownMenu>
                                  <DropdownItem value="In-progress">In-progress</DropdownItem>
                                  <DropdownItem value="Pending">Pending</DropdownItem>
                                  <DropdownItem value="Completed">Completed</DropdownItem>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </Col>

                    <Col s={12} lg={4}>
                      {/* Price of Service */}
                      <Label className="text-muted">User Email:</Label>
                      <p>{this.state.email}</p>

                      <Label className="text-muted">Role:</Label><br/>
                      <ButtonGroup className="mb-8">
                        <Button active={this.state.role==="admin"} id="admin" onClick={this.handleRoleChange.bind(this)}><FontAwesomeIcon className="icon-height" icon={faUserCog}/> Admin</Button>
                        <Button active={this.state.role==="vendor"} id="vendor" onClick={this.handleRoleChange.bind(this)}><FontAwesomeIcon className="icon-height" icon={faUserTie}/> Vendor</Button>
                        <Button active={this.state.role==="customer"} id="customer" onClick={this.handleRoleChange.bind(this)}><FontAwesomeIcon className="icon-height"icon={faUser}/> Customer</Button>
                      </ButtonGroup>

                      <Button
                        color="success"
                        onClick={this.handleSaveChanges}>
                        Update User Role
                      </Button>

                    </Col>

                  </Row>
                </Container>
              </Form>
            </Col>
          </Row>
        </Container>
        <ToastContainer autoClose={5000}/>
      </DefaultLayout>
    );
  }
}

export default Admin;
