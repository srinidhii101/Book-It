/* This gives the header, navigation, and footer */
import DefaultLayout from '../layouts/default';

/* Put the reactstrap components in here that are needed */
import { Modal, Progress, ModalHeader, ModalBody, ModalTitle, ModalFooter, Button, Form, FormGroup, Label, Input, FormFeedback, FormText, InputGroup, InputGroupAddon, Container, Row, Col, ListGroup, ListGroupItem, Nav, NavItem } from 'reactstrap';
import {ToastContainer, toast} from 'react-toastify';
class Browse extends React.Component {

  HandleBookService(e) {
  	e.preventDefault();
  	e.stopPropagation();
  	toast.success("The service has been added to your cart.");
  }

  render() {
    return (
      <DefaultLayout>
        {/* Your HTML/JSX goes here... */}
        <Container fluid={true} className="mt-16">
          <Row>
            {/* Sidebar */}
            <Col sm={4} className="searchContentContainer">
              {/* Bottom display lists */}
              <Container>
                <Row>
                  <Col>
                     <Input type="search" placeholder="Search service here..." />
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
                    <h3>Service Information</h3>

                  </NavItem>
                  <NavItem className="ml-auto">
                    <Button
                      color="success"
                      onClick={this.HandleBookService.bind(this)}>
                      Add to Cart
                    </Button>
                  </NavItem>
                </Nav>
                <Container className="mt-8">
                  <Row>
                    <Col s={12} lg={6}>
                      {/* Service name and service picture */}
                      <FormGroup className="mb-8">
                        <Label className="text-muted">Service Name : Larry's Towing</Label>
                        <FormFeedback type="invalid">
                          Please enter a name for your service.
                        </FormFeedback>
                      </FormGroup>
                      <div className="serviceImage backgroundImage mb-8"></div>
                      <Progress value={70} />
                      <p> Rating is 3.5 out of 5 stars</p>
                    </Col>
                    <Col s={12} lg={6}>
                      {/* Price of Service */}
                      <Label className="text-muted">Service Price: $150 </Label>
                      {/* Description of Service */}
                      <FormGroup>
                        <Label className="text-muted">Service Description</Label>
                        <Input
                          type="textarea"
                          readOnly
                          defaultValue="Lorem Ipsum is simple a dummy text of printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500's, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem ipsum passages and more recently with the desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                          rows='10'/>
                      </FormGroup>
                      <p>Reviews:</p>
                      <FormGroup>
                        <ListGroupItem action>Rating : 4/5</ListGroupItem>
                        <ListGroupItem action> Would You Use the Service Again: Yes </ListGroupItem>
                      </FormGroup>
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

export default Browse;
