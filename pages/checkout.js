/* This file will be used to implement the
 **payments feature of the application
 **Author - Manpreet Singh (B00821998) */
import DefaultLayout from '../layouts/default';
import { Col,ButtonDropdown,Dropdown,ListGroup,ListGroupItem,DropdownMenu,DropdownItem,DropdownToggle, Row, Button, Form, FormGroup, Label, Input, FormText,FormFeedback,Container } from 'reactstrap';
import StripeCheckout from 'react-stripe-checkout';
import { isValidPhone, isValidEmail, isEmptyString, isPostalCodeValid } from '../functions/validate';
import axios from 'axios';
import { checkUserId } from '../functions/auth';
import { ToastContainer,toast } from 'react-toastify';
import '../node_modules/react-toastify/dist/ReactToastify.css';

var paymentSuccess = true;
const STRIPE_KEY = process.env.STRIPE_KEY;

class Checkout extends React.Component {
  /* If you need to track variables, put them here in state */
   constructor(props) {
     super(props);
     this.toggle = this.toggle.bind(this);
     this.handleFirstNameChange=this.handleFirstNameChange.bind(this);
     this.state = {
      isOpen: false,
      dropdownOpen: false,
      firstName: '',
      lastName:'',
      province:'',
      city:'',
      street:'',
      postalCode:'',
      phone:'',
      email:'',
      companyName:'',
      additionalInfo:''
    };
   }

    // This method is callback for Pay with card button
    onToken = (token, addresses) => {
      try {
        axios.put('http://localhost:3001/api/payment/' + checkUserId(), {
          "firstName": this.state.firstName,
          "lastName": this.state.lastName,
          "companyName": this.state.companyName,
          "province": this.state.province,
          "city": this.state.city,
          "street": this.state.street,
          "postalCode": this.state.postalCode,
          "phone": this.state.phone,
          "email": this.state.email,
          "additionalInfo": this.state.additionalInfo
        });
      } catch (exception) {
        paymentSuccess = false;
      }
      if (paymentSuccess) {
        toast.success("Payment Successful and receipt has been emailed to you.");
      } else {
        toast.error("Payment Service is down, please try again !!!");
      }

      // Start for reloading the page when payment is successful
      // Reference: https://guide.freecodecamp.org/javascript/location-reload-method/
      setTimeout(function () {
        window.location.reload();
      }, 3000);
      // End for reloading the page when payment is successful

    };

  handleFirstNameChange = (e) => {
    this.setState({ ...this.state, firstName: e.currentTarget.value})
  }
  handleLastNameChange = (e) => {
    this.setState({ ...this.state, lastName: e.currentTarget.value})
  }
  handleProvinceChange = (e) => {
    this.setState({ ...this.state, province: e.currentTarget.value})
  }
  handleCityChange = (e) => {
    this.setState({ ...this.state, city: e.currentTarget.value})
  }
  handleStreetChange = (e) => {
    this.setState({ ...this.state, street: e.currentTarget.value})
  }
  handlePostalCodeChange = (e) => {
    this.setState({ ...this.state, postalCode: e.currentTarget.value})
  }
  handlePhoneChange = (e) => {
    this.setState({ ...this.state, phone: e.currentTarget.value})
  }
  handleEmailChange = (e) => {
    this.setState({ ...this.state, email: e.currentTarget.value})
  }

  handleCompanyNameChange = (e) => {
    this.setState({ ...this.state, companyName: e.currentTarget.value})
  }

  handleAdditionalInfoChange = (e) => {
    this.setState({ ...this.state, additionalInfo: e.currentTarget.value})
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  isValidForm() {
    return !isEmptyString(this.state.firstName) && !isEmptyString(this.state.lastName) && !isEmptyString(this.state.province) && !isEmptyString(this.state.city) &&
      !isEmptyString(this.state.street) && isPostalCodeValid(this.state.postalCode) && isValidPhone(this.state.phone) && isValidEmail(this.state.email);
  }

  handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  render() {
    const { firstName,lastName,province,validForm,town,street,postalCode,phone} = this.state;
    return (
      <DefaultLayout>
        <Container
          fluid={true}
          className="mt-8">
          <Row>

            <Col md={3} className="paymentContentContainer">
              <Row>
                <Col className="pb-16">
                  <Label className="text-muted">Cart Details:</Label>
                  <ListGroup className="searchResultList mb-8">
                    <ListGroupItem action active>20$ - Haircut</ListGroupItem>
                    <ListGroupItem action>100$ - Gym</ListGroupItem>
                    <ListGroupItem action>100$ - Tutor</ListGroupItem>
                  </ListGroup>
                </Col>
              </Row>
            </Col>

            <Col md={5}>
              <Form
              noValidate
              validated={this.isValidForm().toString()}
              onSubmit={this.handleSubmit.bind(this)}>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label>First Name:</Label>
                      <Input
                        type="text"
                        placeholder="Enter your first name"
                        required
                        autoFocus
                        valid={!isEmptyString(this.state.firstName)}
                        invalid={isEmptyString(this.state.firstName)}
                        onChange={this.handleFirstNameChange}/>
                        <FormFeedback>
                          Please enter first name.
                        </FormFeedback>
                    </FormGroup>
                  </Col>

                  <Col md={6}>
                    <FormGroup>
                      <Label>Last Name:</Label>
                      <Input
                        type="text"
                        placeholder="Enter your last name"
                        required
                        valid={!isEmptyString(this.state.lastName)}
                        invalid={isEmptyString(this.state.lastName)}
                        onChange={this.handleLastNameChange} />
                      <FormFeedback type="invalid">
                        Please enter last name.
                      </FormFeedback>
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col md={12}>
                    <FormGroup>
                      <Label>Company Name:</Label>
                      <Input
                        type="text"
                        placeholder="Enter your company name"
                        onChange={this.handleCompanyNameChange} />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col md={12}>
                    <FormGroup>
                      <Label>Country:</Label>
                      <Dropdown
                        isOpen={this.state.isOpen}
                        toggle={this.toggle}>
                        <DropdownToggle caret disabled color="light">Canada</DropdownToggle>
                      </Dropdown>
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label>Province:</Label>
                      <Input
                        type="text"
                        placeholder="Enter Province"
                        required
                        valid={!isEmptyString(this.state.province)}
                        invalid={isEmptyString(this.state.province)}
                        onChange={this.handleProvinceChange} />
                      <FormFeedback type="invalid">
                        Please enter province.
                      </FormFeedback>
                    </FormGroup>
                  </Col>

                  <Col md={6}>
                    <FormGroup>
                      <Label>Town/City:</Label>
                      <Input
                        type="text"
                        placeholder="Enter town name"
                        required
                        valid={!isEmptyString(this.state.city)}
                        invalid={isEmptyString(this.state.city)}
                        onChange={this.handleCityChange} />
                      <FormFeedback>
                        Please enter town name.
                      </FormFeedback>
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col md={12}>
                    <FormGroup>
                      <Label>Street Address:</Label>
                      <Input
                        type="text"
                        placeholder="Enter street name"
                        required
                        valid={!isEmptyString(this.state.street)}
                        invalid={isEmptyString(this.state.street)}
                        onChange={this.handleStreetChange}/>
                      <FormFeedback type="none">
                        Please enter street.
                      </FormFeedback>
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label>Postal Code:</Label>
                      <Input
                        type="text"
                        placeholder="Enter your postal code"
                        required
                        valid={isPostalCodeValid(this.state.postalCode)}
                        invalid={!isPostalCodeValid(this.state.postalCode)}
                        onChange={this.handlePostalCodeChange} />
                      <FormFeedback>
                        Please enter postal code.
                      </FormFeedback>
                    </FormGroup>
                  </Col>

                  <Col md={6}>
                    <FormGroup>
                      <Label>Phone Number:</Label>
                      <Input
                        type="text"
                        placeholder="Enter your phone number"
                        required
                        valid={isValidPhone(this.state.phone)}
                        invalid={!isValidPhone(this.state.phone)}
                        onChange={this.handlePhoneChange} />
                      <FormFeedback>
                        Please enter phone number.
                      </FormFeedback>
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </Col>

            <Col md={4}>
              <Form onSubmit={this.handleSubmit.bind(this)}>
                <Row>
                  <Col md={12}>
                    <FormGroup>
                      <Label>Email Address:</Label>
                      <Input
                        type="email"
                        required
                        placeholder="example@bookit.com"
                        valid={isValidEmail(this.state.email)}
                        invalid={!isValidEmail(this.state.email)}
                        onChange={this.handleEmailChange} />
                      <FormFeedback type="invalid">
                        Please enter a valid email.
                      </FormFeedback>
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col md={12}>
                    <FormGroup>
                      <Label>Additional Information:</Label>
                      <Input type="textarea"
                      onChange={this.handleAdditionalInfoChange}/>
                    </FormGroup>

                    <FormGroup className="checkoutTotalGroup">
                      <Label>Your Total:</Label><br/>
                      <h1 id="totalAmount">$220</h1>
                      <StripeCheckout
                        name="Book it"
                        description="Thanks for supporting Local!"
                        label="Pay with 💳"
                        email={this.state.email}
                        amount={22000}
                        disabled={!this.isValidForm()}
                        stripeKey={STRIPE_KEY}
                        token={this.onToken}
                        zipcode />
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Container>
        <ToastContainer autoClose={5000}/>
      </DefaultLayout>
    );
  }
}

export default Checkout;
