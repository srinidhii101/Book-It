/* This gives the header, navigation, and footer */
import DefaultLayout from '../layouts/default';
import { checkRole } from '../functions/auth';

/* Put the reactstrap components in here that are needed */
import { Table, Button, Form, FormGroup, Label, Container, Row, Col, ListGroup, ListGroupItem, Input, Nav, NavItem, ButtonGroup, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import { ToastContainer, toast } from 'react-toastify';
import '../node_modules/react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserTie, faUserCog } from '@fortawesome/free-solid-svg-icons';
import Router from 'next/router';

class Admin extends React.Component {
  //when the component mounts, redirecting if the user does not possess the correct permissions.
  componentDidMount() {
    if(checkRole(['admin'])) {
      Router.push('/login');
    }
  }

  handleSaveChanges() {
    toast.success("Changes have been successfully saved!");
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
                    {/* Emulating an overflowing list of services */}
                    <ListGroup className="searchResultList mb-8">
                      <ListGroupItem action active>Larry's Landscaping</ListGroupItem>
                      <ListGroupItem action>Haircuts</ListGroupItem>
                      <ListGroupItem action>Techical Support</ListGroupItem>
                      <ListGroupItem action>Landscaping</ListGroupItem>
                      <ListGroupItem action>Haircuts</ListGroupItem>
                      <ListGroupItem action>Landscaping</ListGroupItem>
                      <ListGroupItem action>Haircuts</ListGroupItem>
                      <ListGroupItem action>Techical Support</ListGroupItem>
                      <ListGroupItem action>Landscaping</ListGroupItem>
                      <ListGroupItem action>Haircuts</ListGroupItem>
                      <ListGroupItem action>Landscaping</ListGroupItem>
                      <ListGroupItem action>Haircuts</ListGroupItem>
                      <ListGroupItem action>Techical Support</ListGroupItem>
                      <ListGroupItem action>Landscaping</ListGroupItem>
                      <ListGroupItem action>Haircuts</ListGroupItem>
                      <ListGroupItem action>Landscaping</ListGroupItem>
                      <ListGroupItem action>Haircuts</ListGroupItem>
                      <ListGroupItem action>Techical Support</ListGroupItem>
                      <ListGroupItem action>Landscaping</ListGroupItem>
                      <ListGroupItem action>Haircuts</ListGroupItem>
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
                      <p>kr732968@dal.ca</p>

                      <Label className="text-muted">Role:</Label><br/>
                      <ButtonGroup className="mb-8">
                        <Button color="primary"><FontAwesomeIcon className="icon-height" icon={faUserCog}/> Admin</Button>
                        <Button color="light"><FontAwesomeIcon className="icon-height" icon={faUserTie}/> Vendor</Button>
                        <Button color="light"><FontAwesomeIcon className="icon-height"icon={faUser}/> Customer</Button>
                      </ButtonGroup>

                      <Button
                        color="success"
                        onClick={this.handleSaveChanges}>
                        Add New Service
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
