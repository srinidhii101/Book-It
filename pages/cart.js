/* This gives the header, navigation, and footer */
import DefaultLayout from '../layouts/default';
import { ToastContainer, toast } from 'react-toastify';

/* Put the reactstrap components in here that are needed */
import Link from 'next/link';
import {  Progress, Modal, ModalHeader, ModalBody, ModalTitle, ModalFooter, Button, Form, FormGroup, Label, Input, Card, CardText, FormFeedback, FormText, InputGroup, InputGroupAddon, Container, Row, Col, ListGroup, ListGroupItem, Nav, NavItem } from 'reactstrap';

class Cart extends React.Component {
  /* If you need to track variables, put them here in state */
   constructor(...args) {
    super(...args);
     this.state = {
       removeFromCartModal: false
    };

    this.removeFromCartToggle = this.removeFromCartToggle.bind(this);
   }

   removeFromCartToggle() {
    this.setState(prevState => ({
      removeFromCartModal: !prevState.removeFromCartModal
    }));
   }

  handleRemoveFromCartCancel = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({...this.state, removeFromCartModal:false});
  }

  handleRemoveFromCartConfirm = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({...this.state, removeFromCartModal:false});
    toast.success("The item has been removed from your cart");
  }

  render() {
    const closeRemoveFromCart = <button className="close" onClick={this.removeFromCartToggle}>&times;</button>;

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
                    <label className="text-muted">Orders:</label>
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
                    <h3>Cart</h3>
                  </NavItem>
                  <NavItem className="ml-auto">
                  <Button type="button" onClick={()=>this.setState({removeFromCartModal:true})} className="float-left btn-danger delete">Remove from Cart</Button>&nbsp;
                  <Link href="/checkout">
                    <Button
                      color="success"
                      onClick={() => this.setState({ addServiceModal: true })}>
                       Proceed to checkout
                    </Button>
                  </Link>
                  </NavItem>
                </Nav>

                <Container className="mt-8">
                  <Row>
                    <Col s={12} lg={6}>
                      {/* Service name and service picture */}
                      <FormGroup className="mb-8">
                        <Label className="text-muted">Service Name:</Label>
                        <p>Larry&apos;s Landscaping</p>
                      </FormGroup>
                      <div className="serviceImage backgroundImage mb-8"></div>
                      <Progress value={75} />
                      <p>Rating: 4 out of 5</p>
                    </Col>

                    <Col s={12} lg={6}>
                      {/* Price of Service */}
                      <Label className="text-muted">Service Price:</Label>
                      <p>$100.00</p>
                      <Label className="text-muted">Ordered Date:</Label>
                      <p>2019-06-20 </p>

                      {/* Description of Service */}
                      <Label className="text-muted">Service Description:</Label>
                      <p className="mb-16">Keeping landscape healthy, clean, safe and attractive for homes, schools, hotels, offices, etc</p>
                      <hr />
                      <Label className="mt-8 text-muted">Reviews:</Label><br/>
                      <strong className="mb-0">4/5</strong>
                      <p>Would use again!</p><br/>
                    </Col>
                  </Row>
                </Container>
              </Form>
            </Col>
          </Row>
        </Container>

        <Modal
          isOpen={this.state.removeFromCartModal}
          toggle={this.removeFromCartToggle}>
          <ModalHeader
            toggle={this.removeFromCartToggle}
            close={closeRemoveFromCart}>
            Remove from Cart
          </ModalHeader>
          <ModalBody>
            <p>Are you sure you want to remove this service from the cart? </p>
          </ModalBody>
          <ModalFooter>
            <Button
              color="secondary"
              type="button"
              onClick={this.handleRemoveFromCartCancel.bind(this)}>
              Cancel
            </Button>
            <Button
              color="danger"
              type="button"
              onClick={this.handleRemoveFromCartConfirm.bind(this)}>
              Remove Service
            </Button>
          </ModalFooter>
        </Modal>
        <ToastContainer autoClose={5000} />
      </DefaultLayout>
    );
  }
}

export default Cart;
