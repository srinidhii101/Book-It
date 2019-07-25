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
import { getCartList, emptyCart } from '../functions/cart';
import Router from 'next/router';

var paymentSuccess = true;
const STRIPE_KEY = process.env.STRIPE_KEY;

class Checkout extends React.Component {
  /* If you need to track variables, put them here in state */
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      dropdownOpen: false,
      services: [],
      firstName: '',
      lastName: '',
      province: '',
      city: '',
      street: '',
      postalCode: '',
      phone: '',
      email: '',
      companyName: '',
      additionalInfo: '',
      total: 0
    };

    this.toggle = this.toggle.bind(this);
    this.handleFirstNameChange=this.handleFirstNameChange.bind(this);
  }

  componentDidMount() {
    //getting the order obj
    if(getCartList.length > 1) {
      fetch('http://localhost:3001/api/services/list/'+getCartList().map(x=>x.id))
        .then((data) => data.json())
        .then((res) => this.setState({ ...this.state, services: res.data }))
        .then(()=> {
          let total = 0;
          this.state.services.map(x=>{total += x.price * 1.15});
          this.setState({ ...this.state, total: total });
        })
        .catch((err)=>{toast.warn("There were issues connecting to the server. Please check your connection.")});

      //load default info if it exists
      fetch('http://localhost:3001/api/users/'+checkUserId())
        .then((data) => data.json())
        .then((res) => this.setState({
          ...this.state,
          firstName: res.data[0].info.firstName || '',
          lastName: res.data[0].info.lastName || '',
          province: res.data[0].info.province || '',
          city: res.data[0].info.city || '',
          street: res.data[0].info.street || '',
          postalCode: res.data[0].info.postalCode || '',
          phone: res.data[0].info.phone || '',
          email: res.data[0].info.email || '',
          companyName: res.data[0].info.companyName || '',
          additionalInfo: res.data[0].info.additionalInfo || '',
         }))
        .catch((err)=>{console.log(err);});
    }
  }

    // This method is callback for Pay with card button
    onToken = (token, addresses) => {
      let orderedServices = [];
      this.state.services.map(x=> orderedServices.push({'name': x.name, 'description': x.description, 'price': x.price, 'created': Date.now()}));
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
          "additionalInfo": this.state.additionalInfo,
          "total": this.state.total,
          "bookings": orderedServices
        });
      } catch (exception) {
        paymentSuccess = false;
      }
      if (paymentSuccess) {
        toast.success("Thank you! A receipt has been emailed to your address.");
      } else {
        toast.error("The payment service is down, please try again!");
      }

      // Start for reloading the page when payment is successful
      // Reference: https://guide.freecodecamp.org/javascript/location-reload-method/
      setTimeout(function () {
        Router.push('/');
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
                    {this.state.services &&
                      this.state.services.map((service, index)=> {
                        return (
                          <ListGroupItem action key={index}><span className="text-primary">${service.price}</span> {service.name}</ListGroupItem>
                        );
                      })
                    }
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
                        defaultValue={this.state.firstName}
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
                        defaultValue={this.state.lastName}
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
                        defaultValue={this.state.companyName}
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
                        defaultValue={this.state.province}
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
                        defaultValue={this.state.city}
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
                        defaultValue={this.state.street}
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
                        defaultValue={this.state.postalCode}
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
                        defaultValue={this.state.phone}
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
                        defaultValue={this.state.email}
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
                      <Input
                        type="textarea"
                        value={this.state.additionalInfo}
                        onChange={this.handleAdditionalInfoChange}/>
                    </FormGroup>

                    <FormGroup className="checkoutTotalGroup">
                      <Label>Your Total:</Label><br/>
                      <h1 id="totalAmount">${this.state.total}</h1>
                      <StripeCheckout
                        name="Book it"
                        description="Thanks for supporting Local!"
                        label="Pay with 💳"
                        email={this.state.email}
                        amount={this.state.total * 100}
                        disabled={!this.isValidForm() || this.state.services.length < 1}
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
