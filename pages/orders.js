/* Login Page */
import DefaultLayout from '../layouts/default';
import { checkUserId } from '../functions/auth';

import { ToastContainer, toast } from 'react-toastify';
import '../node_modules/react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import { Container, Modal, ModalHeader, ModalBody, ModalTitle, ModalFooter, Label, ButtonGroup, Table, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';
import axios from 'axios';

class Orders extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = {
      rateServiceModal: false,
     };

     this.rateServiceToggle = this.rateServiceToggle.bind(this);
  }

  componentDidMount() {

    //load default info if it exists
    fetch('http://bluenose.cs.dal.ca:25057/api/users/'+checkUserId()+'/bookings')
      .then((data) => data.json())
      .then((res) => this.setState({
        ...this.state,
        bookings: res.data
      }))
      .catch((err)=>{console.log(err)});
  }

  rateServiceToggle() {
    this.setState(prevState => ({
      rateServiceModal: !prevState.rateServiceModal
    }));
  }

  confirmRating(e) {

    // userId: req.body.userId,
    // rating: req.body.rating,
    // description: '',
    // created: new Date()
    // const bookingUpdate = {'userId': checkUserId(), 'rating': e.target.innerText, 'description': '', 'created': new Date()}
    // axios.defaults.headers.common = {};
    // axios.defaults.headers.common.accept = "application/json";
    // console.log(this.state.bookings);
    // axios.put('http://bluenose.cs.dal.ca:25057/api/services/booking/' + this.state.bookings[e.target.id]._id, bookingUpdate, config).then(res=>{
    //   if(res.data.success) {
    //     this.forceUpdate();
        toast.success("Your rating of "+ e.target.innerText +" out of 5 has been recorded!");
    //   }
    //   else {
    //     toast.warn("There were issues updating the service.");
    //   }
    // });

    this.setState({
      ...this.state,
      rateServiceModal: false,
    });
  }

  render() {
    const closeRateServiceButton = <button className="close" onClick={this.rateServiceToggle}>&times;</button>;
    /* Wrapping the form with a navigation and footer */
    return (
      <DefaultLayout>
        <Container>
          {/* Page Title */}
          <h3 className="mt-16 loginFormTitle">Your Order History</h3>
          {/* Table */}
          <Table bordered responsive hover className="mt-8">
            <thead>
              <tr>
                <th>Date</th>
                <th>Vendor</th>
                <th>Description</th>
                <th>Add Rating</th>
              </tr>
            </thead>
            <tbody>
            {this.state.bookings &&
              this.state.bookings.map((booking, index)=> {
                return (
                  <tr key={index}>
                    <td>{new Date(booking.created).toUTCString()}</td>
                    <td>{booking.name}</td>
                    <td>{booking.description}</td>
                    <td>
                      <Button
                        color="primary"
                        id={index}
                        onClick={() => this.setState({ rateServiceModal: true })}>
                        Review Service
                      </Button>
                    </td>
                  </tr>
                );
              })
            }
            </tbody>
          </Table>
        </Container>

        {/* Delete Service Modal */}
        <Modal
          isOpen={this.state.rateServiceModal}
          toggle={this.rateServiceToggle}>
          <ModalHeader
            toggle={this.deleteServiceToggle}
            close={closeRateServiceButton}>
            Rate Service
          </ModalHeader>
          <ModalBody className="orderModalBody">
            <Label className="mt-8">How would you rate the service out of 5?</Label>
            <ButtonGroup size="lg" className="booking-rating">
              <Button color="light" onClick={this.confirmRating.bind(this)}>1</Button>
              <Button color="light" onClick={this.confirmRating.bind(this)}>2</Button>
              <Button color="light" onClick={this.confirmRating.bind(this)}>3</Button>
              <Button color="light" onClick={this.confirmRating.bind(this)}>4</Button>
              <Button color="light" onClick={this.confirmRating.bind(this)}>5</Button>
            </ButtonGroup>
          </ModalBody>
        </Modal>

        <ToastContainer autoClose={5000}/>
      </DefaultLayout>
    );
  }
}

export default Orders;
