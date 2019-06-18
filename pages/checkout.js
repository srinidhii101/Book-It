/* This gives the header, navigation, and footer */
import DefaultLayout from '../layouts/default';
import { Col,ButtonDropdown,DropdownMenu,DropdownItem,DropdownToggle, Row, Button, Form, FormGroup, Label, Input, FormText,FormFeedback,Container } from 'reactstrap';
import StripeCheckout from 'react-stripe-checkout';
/* Put the reactstrap components in here that are needed */
//import {  } from 'reactstrap';

class Checkout extends React.Component {
  /* If you need to track variables, put them here in state */
   constructor(props) {
     super(props);
     this.toggle = this.toggle.bind(this);

     this.state = {
      isOpen: false,
      dropdownOpen: false
    };
   }

  onToken = (token,addresses) =>{
    //TODO
  };
  
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    /* Define variables here */
    //const { username, password } = this.state;

    return (
      <DefaultLayout>
        <Container fluid={true} className="mt-8">
        <Row>
        <Col sm={2} className="paymentContentContainer">
        </Col>
        <Col sm={6}>
        <Form>
        {/* Username */}
        <Row>
        <Col md={5}>
            <FormGroup>
              <Label>First Name:</Label>
              <Input type="text" placeholder="Enter your first name" required/>

            </FormGroup>
            </Col>
          
          <Col md={5}>
            <FormGroup>
              <Label>Last Name:</Label>
              <Input type="text" placeholder="Enter your last name" required/>
            </FormGroup>
            </Col>
        </Row>
        <Row>
        <Col md={10}>
            <FormGroup>
              <Label>Company Name:</Label>
              <Input type="text" placeholder="Enter your company name" required/>
            </FormGroup>
            </Col>
        </Row>
        <Row>
        <Col md={5}>       
        <FormGroup>
          <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle caret>Select Country</DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Select Country</DropdownItem>
            <DropdownItem>Canada</DropdownItem>
            </DropdownMenu>
            </ButtonDropdown>
        </FormGroup>
            </Col>
        <Row>
        </Row>
        </Row>
        <Row>
        <Col md={5}>
            <FormGroup>
              <Label>Province:</Label>
              <Input type="text" placeholder="Enter Province" required/>

            </FormGroup>
            </Col>
          
          <Col md={5}>
            <FormGroup>
              <Label>Town/City:</Label>
              <Input type="text" placeholder="Enter town name" required/>
            </FormGroup>
            </Col>
        </Row>
        <Row>
        <Col md={10}>
            <FormGroup>
              <Label>Street Address:</Label>
              <Input type="text" placeholder="Enter street name" required/>
            </FormGroup>
            </Col>
        </Row>
       <Row>
        <Col md={5}>
            <FormGroup>
              <Label>Postal Code:</Label>
              <Input type="text" placeholder="Enter your postal code" required/>

            </FormGroup>
            </Col>
          
          <Col md={5}>
            <FormGroup>
              <Label>Phone Number:</Label>
              <Input type="text" placeholder="Enter your phone number" required/>
            </FormGroup>
            </Col>
        </Row>
        </Form>
        </Col>
        <Col sm={4}>
        <Form >
        <Row>
        <Col md={10}>
            <FormGroup>
              <Label>Email Address:</Label>
              <Input type="email" placeholder="abc@xyz.com" required/>
            </FormGroup>
            </Col>
        </Row>
        
        <Row>
        <Col md={10}>
            <FormGroup>
              <Label>Additional Information:</Label>
              <Input type="textarea" required/>
            </FormGroup>
            
            <FormGroup className="font-bold">
              <Label>Your Total: 240$</Label>
            </FormGroup>
        
            <FormGroup>
            <StripeCheckout
              stripeKey="pk_test_wXtDaiHSEDQ55g1paPXsydVJ00xeVKA6LM"
              token={this.onToken}
              zipcode
            />
      </FormGroup> 
      </Col>
        </Row> 
        </Form>
        
        </Col>
        </Row>
        </Container>
      </DefaultLayout>
    );
  }
}

export default Checkout;
