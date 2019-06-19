/* Login Page */
import DefaultLayout from '../layouts/default';

import { ToastContainer, toast } from 'react-toastify';
import '../node_modules/react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import { Container, Modal, ModalHeader, ModalBody, ModalTitle, ModalFooter, Label, ButtonGroup, Table, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';

class Orders extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = {
      rateServiceModal: false,
     };

     this.rateServiceToggle = this.rateServiceToggle.bind(this);
  }

  rateServiceToggle() {
    this.setState(prevState => ({
      rateServiceModal: !prevState.rateServiceModal
    }));
  }

  onChangeOption(e) {
    if(e.target.value) {
      e.currentTarget.childNodes[0].innerHTML = e.target.value;
      //should do better at tracking this
    }
  }

  handleSaveChanges() {
    toast.success("Changes have been successfully saved!");
  }

  handleRateServiceFormConfirm(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      ...this.state,
      rateServiceModal: false,
    });

    toast.success("The service has been deleted!");

  }

  confirmRating(e) {
    this.setState({
      ...this.state,
      rateServiceModal: false,
    });

    console.dir(e.target.innerText);

    toast.success("Your rating of "+ e.target.innerText +" out of 5 has been recorded!");
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
                <th>Status</th>
                <th>Add Rating</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">2019-06-13</th>
                <td>Oskof Electricals</td>
                <td>Create an additional power point.</td>
                <td>
                  <UncontrolledDropdown onClick={this.onChangeOption.bind(this)}>
                    <DropdownToggle caret color="light">
                      In-progress
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem value="In-progress">In-progress</DropdownItem>
                      <DropdownItem value="Pending">Pending</DropdownItem>
                      <DropdownItem value="Completed">Completed</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </td>
                <td>
                  <Button
                    color="primary"
                    onClick={() => this.setState({ rateServiceModal: true })}>
                    Review Service
                  </Button>
                </td>
              </tr>
              <tr>
                <th scope="row">2019-06-13</th>
                <td>Oskof Electricals</td>
                <td>Create an additional power point.</td>
                <td>
                  <UncontrolledDropdown onClick={this.onChangeOption.bind(this)}>
                    <DropdownToggle caret color="light">
                      In-progress
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem value="In-progress">In-progress</DropdownItem>
                      <DropdownItem value="Pending">Pending</DropdownItem>
                      <DropdownItem value="Completed">Completed</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </td>
                <td>
                  <Button
                    color="primary"
                    onClick={() => this.setState({ rateServiceModal: true })}>
                    Review Service
                  </Button>
                </td>
              </tr>
              <tr>
                <th scope="row">2019-06-13</th>
                <td>Oskof Electricals</td>
                <td>Create an additional power point.</td>
                <td>
                  <UncontrolledDropdown onClick={this.onChangeOption.bind(this)}>
                    <DropdownToggle caret color="light">
                      In-progress
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem value="In-progress">In-progress</DropdownItem>
                      <DropdownItem value="Pending">Pending</DropdownItem>
                      <DropdownItem value="Completed">Completed</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </td>
                <td>
                  <Button
                    color="primary"
                    onClick={() => this.setState({ rateServiceModal: true })}>
                    Review Service
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>

          <Button
            color="success"
            className="float-right"
            onClick={this.handleSaveChanges}>
            Save Changes
          </Button>
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
            <ButtonGroup size="lg">
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
