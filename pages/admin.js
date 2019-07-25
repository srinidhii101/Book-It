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
      users: [],
      userIndex: 0,
      role: "customer",
      email: "",
      searchResults: [],
      searchInput: ""
    };
  }

  // Search input changed
  handleSearchInputChange(e) {
    if(e.currentTarget.value.length > 0) {
      let results= this.state.searchResults.filter(users => users.email.toLowerCase().includes(e.currentTarget.value.toLowerCase()));
      this.setState({ ...this.state, "searchInput": e.currentTarget.value, "searchResults": results })
    }
    else {
      this.setState({...this.state, "searchInput": '', "searchResults": this.state.users});
    }
  }

  //when the component mounts, redirecting if the user does not possess the correct permissions.
  componentDidMount() {
    if(checkRole(['admin'])) {
      Router.push('/login');
    } else {
      fetch('http://localhost:3001/api/users/')
        .then((data) => data.json())
        .then((res) => this.setState({ users: res.data, searchResults: res.data  }))
        .then(() => this.loadFirstUser())
        .catch((err)=>{toast.warn("There were issues connecting to the server. Please check your connection.")});
    }
  }

  //save changes clicked
  async handleSaveChanges(e) {
    try {
      // hosted server : http://bluenose.cs.dal.ca:25057/api/users/
      let userUpdate = this.state.users[this.state.userIndex];
      userUpdate.role = this.state.role;
      const config = { headers: {'Content-Type': 'application/json'} };
      axios.put('http://localhost:3001/api/users/' + this.state.users[this.state.userIndex]._id, userUpdate, config).then(res=>{
        if(res.data.success) {
          this.forceUpdate();
          toast.success("The user has been successfully updated!");
        }
        else{
          toast.warn("There were issues updating the user.");
        }
      });
    }
    catch(err) {
      toast.warn("There were issues updating the user.");
      console.log(err);
    }
  }

  //loading the first user in the list of users
  loadFirstUser() {
    this.setState({
      ...this.state,
      role: this.state.users[0].role,
      email:this.state.users[0].email,
      userIndex: 0
    });
  }

  //when the
  onChangeOption(e) {
    if(e.target.value) {
      e.currentTarget.childNodes[0].innerHTML = e.target.value;
      //should do better at tracking this
    }
  }

  //no submit events
  handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  //selecting a new user from the sidebar
  handleUserIndexChange(index, e) {
    this.setState({
      ...this.state,
      role:this.state.users[e.currentTarget.id].role,
      email:this.state.users[e.currentTarget.id].email,
      userIndex: index
    });
  }

  //setting the local state when a user is changed
  async handleRoleChange(e) {
    this.setState({
      ...this.state,
      role: e.currentTarget.id,
      email: this.state.users[this.state.userIndex].email
    });
  }

  render() {
    return (
      <DefaultLayout>
        {/* Your HTML/JSX goes here... I'll probably do this one */}
        <Container fluid={true} className="mt-16">
          <Row>
            {/* Sidebar */}
            <Col md={4} className="searchContentContainer">
              {/* Bottom display lists */}
              <Container>
                <Row>
                  <Col>
                     <Input type="search" className="mt-1" placeholder="Search user here..."
                     autoFocus className="mt-1"
                    onChange={this.handleSearchInputChange.bind(this)}/>
                  </Col>
                </Row>
                <hr/>
                <Row>
                  <Col className="pb-16">
                    <label className="text-muted">Results:</label>
                    {/* Emulating an overflowing list of users */}
                    <ListGroup className="searchResultList mb-8">
                    {this.state.searchResults &&
                        this.state.searchResults.map((user, index) => {
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
            <Col md={8}>

              <Form
              name="editServiceForm">

                <Container>
                  <Row>
                    {/*}<Col lg={12} xl={8}>
                      <h3>Admin Panel</h3>
                      <Label className="text-muted">Manage User Orders:</Label>
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
                    </Col> */}

                    <Col lg={12} xl={4}>
                      {/* Price of Service */}
                      <Label className="text-muted">User Email:</Label>
                      <p>{this.state.email}</p>

                      <Label className="text-muted">Role:</Label><br/>
                      <ButtonGroup className="mb-8">
                        <Button active={this.state.role==="admin"} disabled={this.state.users.length < 1} id="admin" onClick={this.handleRoleChange.bind(this)}><FontAwesomeIcon className="icon-height" icon={faUserCog}/> Admin</Button>
                        <Button active={this.state.role==="vendor"} disabled={this.state.users.length < 1} id="vendor" onClick={this.handleRoleChange.bind(this)}><FontAwesomeIcon className="icon-height" icon={faUserTie}/> Vendor</Button>
                        <Button active={this.state.role==="customer"} disabled={this.state.users.length < 1} id="customer" onClick={this.handleRoleChange.bind(this)}><FontAwesomeIcon className="icon-height"icon={faUser}/> Customer</Button>
                      </ButtonGroup><br/>

                      <Button
                        color="success"
                        onClick={this.handleSaveChanges.bind(this)}
                        disabled={this.state.users.length < 1}>
                        Update Changes
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
