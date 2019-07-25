/* This gives the header, navigation, and footer */
import DefaultLayout from '../layouts/default';
import { getCartList, removeFromCart } from '../functions/cart';

/* Put the reactstrap components in here that are needed */
import { Modal, Progress, ModalHeader, ModalBody, ModalTitle, ModalFooter, Button, Form, FormGroup, Label, Input, FormFeedback, FormText, InputGroup, InputGroupAddon, Container, Row, Col, ListGroup, ListGroupItem, Nav, NavItem, Fade } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import Router from 'next/router';

class Cart extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      searchResults:[],
      searchInput:[],
      serviceName: '',
      serviceDescription: '',
      servicePrice: 0,
      serviceImagePath: '',
      serviceImageName: '',
      serviceReviews: [],
      services: [],
      serviceIndex: 0
     };
  }

  componentDidMount() {
    if(getCartList().length > 1) {
      fetch('http://localhost:3001/api/services/list/'+getCartList().map(x=>x.id))
        .then((data) => data.json())
        .then((res) => this.setState({ services: res.data, searchResults: res.data }))
        .then(()=> this.loadService(0))
        .catch((err)=>{toast.warn("There were issues connecting to the server. Please check your connection.")});
    }
  }

  handleSearchInputChange(e) {
    if(e.currentTarget.value.length > 0) {
      let results = this.state.services.filter(service => service.name.toLowerCase().includes(e.currentTarget.value.toLowerCase()) || service.description.toLowerCase().includes(e.currentTarget.value.toLowerCase()));
      this.setState({ ...this.state, "searchInput": e.currentTarget.value, "searchResults": results })
    }
    else {
      this.setState({...this.state, "searchInput": '', "searchResults": this.state.services});
    }
  }

  //helper function to choose to load a service at a certain index
  loadService(index) {
    //null check
    if(this.state.services.length > 0) {
      this.setState({
        ...this.state,
        serviceId: this.state.services[index]._id,
        serviceName: this.state.services[index].name,
        serviceDescription: this.state.services[index].description || '',
        servicePrice: this.state.services[index].price || 0,
        serviceImagePath: this.state.services[index].cloud_url || '',
        serviceImageName: this.state.services[index].cloud_name || '',
        serviceReviews: this.state.services[index].reviews || [],
        serviceIndex: index
      });
    }
  }

  //handler for the event where a new service is clicked in the sidemenu
  handleServiceIndexChange(index, e) {
    this.setState({
      ...this.state,
      serviceId: this.state.searchResults[index]._id,
      serviceName: this.state.searchResults[index].name,
      serviceDescription: this.state.searchResults[index].description || '',
      servicePrice: this.state.searchResults[index].price || 0,
      serviceImagePath: this.state.searchResults[index].cloud_url || '',
      serviceImageName: this.state.searchResults[index].cloud_name || '',
      serviceReviews: this.state.services[index].reviews || [],
      serviceIndex: index
    });
  }

  handleCheckout(e) {
  	e.preventDefault();
  	e.stopPropagation();
    Router.push('/checkout');
  }

  handleRemoveFromCart(e) {
    e.preventDefault();
    e.stopPropagation();
    removeFromCart(this.state.serviceIndex);

    if(this.state.services.length > 1) {
      this.state.services.splice(this.state.serviceIndex, 1),
      this.setState({
        ...this.state,
        serviceIndex: 0,
        serviceName: this.state.services[0].name || '',
        serviceDescription: this.state.services[0].description || '',
        servicePrice: this.state.services[0].price || 0,
        serviceImagePath: this.state.services[0].cloud_url || '',
        serviceImageName: this.state.services[0].cloud_name || '',
        serviceReviews: this.state.services[0].reviews || [],
      });
    }
    else {
      this.setState({
        ...this.state,
        services: [],
        serviceIndex: 0,
        serviceName: '',
        serviceDescription: '',
        servicePrice: 0,
        serviceImagePath: '',
        serviceImageName: '',
        serviceReviews: [],
        searchResults:[],
      });
    }

    this.forceUpdate();
  }

  getAverageRating() {
    if(this.state.serviceReviews.length > 0) {
      let reviewTotal = 0;
      this.state.serviceReviews.map(x=> reviewTotal += x.rating)
      return reviewTotal / this.state.serviceReviews.length;
    }
    return 0;
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
                     <Input type="search"
                      placeholder="Search your cart..."
                      autoFocus className="mt-1"
                      onChange={this.handleSearchInputChange.bind(this)}/>
                  </Col>
                </Row>
                <hr/>
                <Row>
                  <Col className="pb-16">
                    <label className="text-muted">Results:</label>
                    {/* Emulating an overflowing list of services */}
                    <ListGroup className="searchResultList mb-8">
                      {this.state.searchResults &&
                        this.state.searchResults.map((service, index) => {
                          if(service) {
                          return (
                            <ListGroupItem
                              action
                              key={service._id}
                              id={index}
                              active={index == this.state.serviceIndex}
                              className="listItem"
                              onClick={this.handleServiceIndexChange.bind(this, index)}>
                                {service.name}
                            </ListGroupItem>
                          )}
                        })
                      }
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
                    <h3>{this.state.serviceName}</h3>
                  </NavItem>
                  <NavItem className="ml-auto">
                    <Button
                      color="danger"
                      disabled={this.state.services.length < 1}
                      onClick={this.handleRemoveFromCart.bind(this)}>
                      Remove from Cart
                    </Button>
                    &nbsp;
                    <Button
                      color="primary"
                      disabled={this.state.services.length < 1}
                      onClick={this.handleCheckout.bind(this)}>
                      Proceed to Checkout
                    </Button>
                  </NavItem>
                </Nav>
                <Container className="mt-8">
                  <Row>
                    <Col s={12} lg={6}>
                      {/* Service name and service picture */}
                      <Fade in>
                      {this.state.serviceImagePath &&
                        <img className="height-auto serviceImage mb-8" src={this.state.serviceImagePath} alt={this.state.serviceImageName} />
                      }
                      {!this.state.serviceImagePath &&
                        <div className="serviceImage backgroundImage mb-8"></div>
                      }
                      </Fade>
                      <Progress value={this.getAverageRating() * 20} />
                      <p>With <span className="text-primary">{this.state.serviceReviews.length}</span> reviews, the average rating is <span className="text-primary">{this.getAverageRating() + "/5"}</span> stars.</p>
                    </Col>
                    <Col s={12} lg={6}>
                      {/* Price of Service */}
                      <Label className="text-muted">Service Price: <span className="text-primary">${this.state.servicePrice}</span></Label>
                      {/* Description of Service */}
                      <FormGroup>
                        <Label className="text-muted">Service Description:</Label>
                        <Input
                          type="textarea"
                          readOnly
                          value={this.state.serviceDescription}
                          rows={8} />
                      </FormGroup>
                      <Label className="text-muted">Reviews:</Label>
                      <FormGroup>
                        {this.state.serviceReviews &&
                          this.state.serviceReviews.map((review, index) => {
                            if(review) {
                            return (
                              <ListGroupItem action key={index}>
                                <span className="text-primary">{review.rating}/5</span>: {review.description}
                              </ListGroupItem>
                            )}
                          })
                        }
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

export default Cart;
