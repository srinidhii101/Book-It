/* This gives the header, navigation, and footer */
import DefaultLayout from '../layouts/default';
import { Col,ButtonDropdown,Dropdown,ListGroup,ListGroupItem,DropdownMenu,DropdownItem,DropdownToggle, Row, Button, Form, FormGroup, Label, Input, FormText,FormFeedback,Container } from 'reactstrap';
import StripeCheckout from 'react-stripe-checkout';
import { isValidPhone,isValidEmail, isEmptyString ,isPostalCodeValid} from '../functions/validate';

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
      town:'',
      street:'',
      postalCode:'',
      phone:'',
      email:''
    };
   }

  onToken = (token,addresses) =>{
    //TODO
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

  handleTownChange = (e) => {
    this.setState({ ...this.state, town: e.currentTarget.value})
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

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
      dropdownOpen: !this.state.dropdownOpen
    });
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
              validated={(isValidEmail(this.state.email)).toString && (isPostalCodeValid(this.state.postalCode)).toString() && (isValidPhone(this.state.phone)).toString()}>
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
                        placeholder="Enter your company name" />
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
                        valid={!isEmptyString(this.state.town)}
                        invalid={isEmptyString(this.state.town)}
                        onChange={this.handleTownChange} />
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
              <Form>
                <Row>
                  <Col md={12}>
                    <FormGroup>
                      <Label>Email Address:</Label>
                      <Input
                        type="email"
                        placeholder="example@bookit.com"
                        valid={isValidEmail(this.state.email)}
                        invalid={!isValidEmail(this.state.email)}
                        required
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
                      <Input type="textarea"/>
                    </FormGroup>

                    <FormGroup className="font-bold">
                      <Label>Your Total: 220$</Label>
                    </FormGroup>

                    <FormGroup>
                      <StripeCheckout
                        name="Book it"
                        amount={22000}
                        //disabled={!(this.state.firstName && this.state.lastName && this.state.province && this.state.town && this.state.street && this.state.postalCode && this.state.phone && isValidEmail(this.state.email))}

                        stripeKey="pk_test_wXtDaiHSEDQ55g1paPXsydVJ00xeVKA6LM"
                        token={this.onToken}
                        zipcode />
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
