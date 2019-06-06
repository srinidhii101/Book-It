/* Login Page */
import DefaultLayout from '../layouts/default';
import AddServiceModal from '../components/addServiceModal';
import ConfirmDeleteModal from '../components/confirmDelete';
import { isPositiveNumber } from '../functions/validate';

import { ToastContainer, toast } from 'react-toastify';
import '../node_modules/react-toastify/dist/ReactToastify.css';
import { Container, Row, Col, Form, ListGroup, Button, Nav, FormControl, Image, InputGroup } from 'react-bootstrap';
// import Router from 'next/router';

class Login extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      addServiceModalShow: false,
      confirmDeleteModalShow: false,
      serviceName: "Larry's Landscaping",
      serviceDescription: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      servicePrice: 0
     };
  }

  //Handlers to keep the state up to date of the latest values
  handleServiceNameChange = (e) => {
    this.setState({ ...this.state, serviceName: e.currentTarget.value});
  }
  handleServiceDescriptionChange = (e) => {
    this.setState({ ...this.state, serviceDescription: e.currentTarget.value});
  }
  handleServicePriceChange = (e) => {
    this.setState({ ...this.state, servicePrice: e.currentTarget.value});
  }

  //Handling the submit event in the application
  handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    if(this.state.serviceName.length > 0 && isPositiveNumber(this.state.servicePrice)) {
      // TODO: Make this a toast
      toast.success("The service has been updated!");
    }
  }

  render() {
    let addServiceModalClose = () => this.setState({ addServiceModalShow: false });
    let confirmDeleteModalClose = () => this.setState({ confirmDeleteModalShow: false });
    const { serviceName, servicePrice, serviceDescription } = this.state;

    /* Wrapping the form with a navigation and footer */
    return (
      <DefaultLayout>
        <Container fluid="true" className="mt-16">
          <Row>
            {/* Sidebar */}
            <Col sm={4} className="searchContentContainer">
              {/* Bottom display lists */}
              <Container>
                <Row>
                  <Col>
                     <Form.Control type="search" placeholder="Search service here..." />
                  </Col>
                </Row>
                <hr/>
                <Row>
                  <Col className="pb-16">
                    <label className="text-muted">Results:</label>
                    {/* Emulating an overflowing list of services */}
                    <ListGroup className="searchResultList mb-8">
                      <ListGroup.Item action active>Larry's Landscaping</ListGroup.Item>
                      <ListGroup.Item action>Haircuts</ListGroup.Item>
                      <ListGroup.Item action>Techical Support</ListGroup.Item>
                      <ListGroup.Item action>Landscaping</ListGroup.Item>
                      <ListGroup.Item action>Haircuts</ListGroup.Item>
                      <ListGroup.Item action>Landscaping</ListGroup.Item>
                      <ListGroup.Item action>Haircuts</ListGroup.Item>
                      <ListGroup.Item action>Techical Support</ListGroup.Item>
                      <ListGroup.Item action>Landscaping</ListGroup.Item>
                      <ListGroup.Item action>Haircuts</ListGroup.Item>
                      <ListGroup.Item action>Landscaping</ListGroup.Item>
                      <ListGroup.Item action>Haircuts</ListGroup.Item>
                      <ListGroup.Item action>Techical Support</ListGroup.Item>
                      <ListGroup.Item action>Landscaping</ListGroup.Item>
                      <ListGroup.Item action>Haircuts</ListGroup.Item>
                      <ListGroup.Item action>Landscaping</ListGroup.Item>
                      <ListGroup.Item action>Haircuts</ListGroup.Item>
                      <ListGroup.Item action>Techical Support</ListGroup.Item>
                      <ListGroup.Item action>Landscaping</ListGroup.Item>
                      <ListGroup.Item action>Haircuts</ListGroup.Item>
                    </ListGroup>
                  </Col>

                </Row>
              </Container>
            </Col>

            {/* Content */}
            <Col sm={8}>

              <Form
              noValidate
              validated={!serviceName.length == 0 && isPositiveNumber(this.state.servicePrice).toString()}
              onSubmit={e => this.handleSubmit(e)} >

                <Nav className="serviceNav">
                  <Nav.Item>
                    <h3>Edit Service</h3>
                  </Nav.Item>
                  <Nav.Item className="ml-auto">
                    <Button
                      variant="success"
                      onClick={() => this.setState({ addServiceModalShow: true })}>
                      Add New Service
                    </Button>
                  </Nav.Item>
                </Nav>

                <Container className="mt-16">
                  <Row>
                    <Col s={12} lg={6}>
                      {/* Service name and service picture */}
                      <Form.Group className="mb-8">
                        <Form.Label className="text-muted">Service Name</Form.Label>
                        <FormControl type="text"
                        placeholder="Service Name"
                        defaultValue={serviceName}
                        onChange={this.handleServiceNameChange}
                        isInvalid={this.state.serviceName.length == 0} />
                        <Form.Control.Feedback type="invalid">
                            Please enter a name for your service.
                        </Form.Control.Feedback>
                      </Form.Group>
                      <div className="serviceImage backgroundImage mb-8">
                      </div>
                    </Col>

                    <Col s={12} lg={6}>
                      {/* Price of Service */}
                      <Form.Label className="text-muted">Service Price</Form.Label>
                      <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                          <InputGroup.Text>$</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                          type="number"
                          defaultValue={servicePrice}
                          min="0"
                          onChange={this.handleServicePriceChange}
                          isInvalid={!isPositiveNumber(this.state.servicePrice)} />
                        <InputGroup.Append>
                          <InputGroup.Text>.00</InputGroup.Text>
                        </InputGroup.Append>
                        <Form.Control.Feedback type="invalid">
                            Please enter positive number.
                        </Form.Control.Feedback>
                      </InputGroup>

                      {/* Description of Service */}
                      <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label className="text-muted">Service Description</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows="8"
                          onChange={this.handleServiceDescriptionChange}
                          defaultValue={serviceDescription} />
                      </Form.Group>

                      {/* Register and Login Buttons */}
                      <div className="loginButtons">
                        <Button
                          variant="danger"
                          type="button"
                          onClick={() => this.setState({ confirmDeleteModalShow: true })} >
                          Delete Service
                        </Button>
                        <Button
                          variant="primary"
                          type="submit"
                          className="loginButton">
                            Save Changes
                        </Button>
                      </div>

                    </Col>

                  </Row>
                </Container>
              </Form>
            </Col>
          </Row>
        </Container>

        {/* Modal for adding services */}
        <AddServiceModal
          show={this.state.addServiceModalShow}
          onHide={addServiceModalClose}
        />
        {/* Modal for confirming the deletion of a service */}
        <ConfirmDeleteModal
          show={this.state.confirmDeleteModalShow}
          onHide={confirmDeleteModalClose}
        />
        <ToastContainer autoClose={5000}/>
      </DefaultLayout>
    );
  }
}

export default Login;
