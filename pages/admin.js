/* This gives the header, navigation, and footer */
import DefaultLayout from '../layouts/default';

/* Put the reactstrap components in here that are needed */
import { Modal, ModalHeader, ModalBody, ModalTitle, ModalFooter, Button, Form, FormGroup, Label, Input, FormFeedback, FormText, InputGroup, InputGroupAddon, Container, Row, Col, ListGroup, ListGroupItem, Nav, NavItem } from 'reactstrap';

class Admin extends React.Component {
  /* If you need to track variables, put them here in state */
  // constructor(...args) {
  //   super(...args);
  //   this.state = {
  //     username: '',
  //     password: ''
  //   };
  // }

  render() {
    /* Define variables here */
    //const { username, password } = this.state;

    return (
      <DefaultLayout>
        {/* Your HTML/JSX goes here... I'll probably do this one */}
        <Container fluid={true} className="mt-16">
          <Row>
            {/* Sidebar */}
            <Col sm={4} className="searchContentContainer">
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
            <Col sm={8}>

              <Form
              name="editServiceForm">
                <Nav className="serviceNav">
                  <NavItem>
                    <h3>Manage User</h3>
                  </NavItem>
                  <NavItem className="ml-auto">
                    <Button
                      color="success"
                      onClick={() => this.setState({ addServiceModal: true })}>
                      Add New Service
                    </Button>
                  </NavItem>
                </Nav>

                <Container className="mt-8">
                  <Row>
                    <Col s={12} lg={6}>
                      {/* Service name and service picture */}
                      <FormGroup className="mb-8">
                        <Label className="text-muted">User Name</Label>
                        <Input type="text" />
                        <FormFeedback type="invalid">
                            Please enter a name for your service.
                        </FormFeedback>
                      </FormGroup>
                      <div className="serviceImage backgroundImage mb-8">
                      </div>
                    </Col>

                    <Col s={12} lg={6}>
                      {/* Price of Service */}
                      <Label className="text-muted">Service Price</Label>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">$
                        </InputGroupAddon>
                        <Input />
                        <InputGroupAddon addonType="append">.00
                        </InputGroupAddon>
                        <FormFeedback type="invalid">
                            Please enter positive number.
                        </FormFeedback>
                      </InputGroup>

                      {/* Description of Service */}
                      <FormGroup>
                        <Label className="text-muted">Service Description</Label>
                        <Input
                          type="textarea" />
                      </FormGroup>

                    </Col>

                  </Row>
                </Container>
              </Form>
            </Col>
          </Row>
        </Container>
      </DefaultLayout>
    );
  }
}

export default Admin;
