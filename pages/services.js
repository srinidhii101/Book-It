/* Login Page */
import DefaultLayout from '../layouts/default';
import { isPositiveNumber, isEmptyString } from '../functions/validate';

import { ToastContainer, toast } from 'react-toastify';
import '../node_modules/react-toastify/dist/ReactToastify.css';
import { Modal, ModalHeader, ModalBody, ModalTitle, ModalFooter, Button, Form, FormGroup, Label, Input, FormFeedback, FormText, InputGroup, InputGroupAddon, Container, Row, Col, ListGroup, ListGroupItem, Nav, NavItem } from 'reactstrap';
import Dropzone from 'react-dropzone';
import request from 'superagent';

//Cloudinary constants
const CLOUDINARY_UPLOAD_PRESET = 'ml_default';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/kirby-cloud/image/upload';


class Login extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      uploadedFile: null,
      uploadedFileCloudinaryUrl: '',
      addServiceName: '',
      addServiceDescription: '',
      addServicePrice: 0,
      serviceName: "Larry's Landscaping",
      serviceDescription: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      servicePrice: 0,
      addServiceModal: false,
      deleteServiceModal: false,
      confirmDeleteModalShow: false
     };

     this.addServiceToggle = this.addServiceToggle.bind(this);
     this.deleteServiceToggle = this.deleteServiceToggle.bind(this);
  }

  addServiceToggle() {
    this.setState(prevState => ({
      addServiceModal: !prevState.addServiceModal
    }));
  }

  deleteServiceToggle() {
    this.setState(prevState => ({
      deleteServiceModal: !prevState.deleteServiceModal
    }));
  }

  //Setting the uploaded file
  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });

    this.handleImageUpload(files[0]);
  }

  //handling sending the image to cloudinary
  handleImageUpload(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                        .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== '') {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url
        });
      }
    });
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
  handleAddServiceNameChange = (e) => {
    this.setState({ ...this.state, addServiceName: e.currentTarget.value});
  }
  handleAddServiceDescriptionChange = (e) => {
    this.setState({ ...this.state, addServiceDescription: e.currentTarget.value});
  }
  handleAddServicePriceChange = (e) => {
    this.setState({ ...this.state, addServicePrice: e.currentTarget.value});
  }

  //Handling the submit event in the application
  handleEditServiceSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    if(!isEmptyString(this.state.serviceName) && isPositiveNumber(this.state.servicePrice)) {
      // TODO: Make this a toast
      toast.success("The service has been updated!");
    }
  }

  handleAddServiceFormSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    if(!isEmptyString(this.state.addServiceName) && isPositiveNumber(this.state.addServicePrice)) {
      // TODO: actually apply changes to the JSON object
      toast.success("The service has been added!");
      this.setState({
        ...this.state,
        addServiceModal: false,
        addServiceName: '',
        addServicePrice: 0,
        addServiceDescription: '',
        uploadedFile: null,
        uploadedFileCloudinaryUrl: ''
      });
    }
  }

  handleDeleteServiceFormCancel(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      ...this.state,
      deleteServiceModal: false,
    });
  }

  handleDeleteServiceFormConfirm(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      ...this.state,
      deleteServiceModal: false,
    });

    // TODO: actually delete it
    toast.success("The service has been deleted!");

  }

  render() {
    const { serviceName, servicePrice, serviceDescription, addServiceName, addServicePrice, addServiceDescription } = this.state;
    const closeAddServiceButton = <button className="close" onClick={this.addServiceToggle}>&times;</button>;
    const closeDeleteServiceButton = <button className="close" onClick={this.deleteServiceToggle}>&times;</button>;
    /* Wrapping the form with a navigation and footer */
    return (
      <DefaultLayout>
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
              name="editServiceForm"
              noValidate
              validated={(!isEmptyString(this.state.serviceName) && isPositiveNumber(this.state.servicePrice)).toString()} >

                <Nav className="serviceNav">
                  <NavItem>
                    <h3>Edit Service</h3>
                  </NavItem>
                  <NavItem className="ml-auto">
                    <Button
                      color="success"
                      onClick={() => this.setState({ addServiceModal: true })}>
                      Add New Service
                    </Button>
                  </NavItem>
                </Nav>

                <Container className="mt-8">
                  <Row>
                    <Col s={12} lg={6}>
                      {/* Service name and service picture */}
                      <FormGroup className="mb-8">
                        <Label className="text-muted">Service Name</Label>
                        <Input type="text"
                        placeholder="Service Name"
                        defaultValue={serviceName}
                        onChange={this.handleServiceNameChange}
                        valid={!isEmptyString(this.state.serviceName)}
                        invalid={isEmptyString(this.state.serviceName)} />
                        <FormFeedback type="invalid">
                            Please enter a name for your service.
                        </FormFeedback>
                      </FormGroup>
                      <div className="serviceImage backgroundImage mb-8">
                      </div>
                    </Col>

                    <Col s={12} lg={6}>
                      {/* Price of Service */}
                      <Label className="text-muted">Service Price</Label>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">$
                        </InputGroupAddon>
                        <Input
                          type="number"
                          defaultValue={servicePrice}
                          min="0"
                          onChange={this.handleServicePriceChange}
                          valid={isPositiveNumber(this.state.servicePrice)}
                          invalid={!isPositiveNumber(this.state.servicePrice)} />
                        <InputGroupAddon addonType="append">.00
                        </InputGroupAddon>
                        <FormFeedback type="invalid">
                            Please enter positive number.
                        </FormFeedback>
                      </InputGroup>

                      {/* Description of Service */}
                      <FormGroup>
                        <Label className="text-muted">Service Description</Label>
                        <Input
                          type="textarea"
                          valid={true}
                          rows={8}
                          onChange={this.handleServiceDescriptionChange}
                          defaultValue={serviceDescription} />
                      </FormGroup>

                      {/* Register and Login Buttons */}
                      <div className="loginButtons">
                        <Button
                          color="danger"
                          type="button"
                          onClick={() => this.setState({ deleteServiceModal: true })} >
                          Delete Service
                        </Button>
                        <Button
                          color="primary"
                          type="button"
                          onClick={this.handleEditServiceSubmit.bind(this)}
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

        {/* Add Service Modal */}
        <Modal isOpen={this.state.addServiceModal} toggle={this.addServiceToggle}>
          <ModalHeader toggle={this.addServiceToggle} close={closeAddServiceButton}>
            Add a Service
          </ModalHeader>
          <ModalBody>
            <Form
            name="addServiceForm"
            noValidate
            validated={(!isEmptyString(this.state.addServiceName) && isPositiveNumber(servicePrice)).toString()}
            onSubmit={e => this.handleSubmit(e)} >

              {/* Service Name */}
              <FormGroup>
                <Label>Service Name</Label>
                <Input
                  type="text"
                  placeholder="Enter the service name"
                  required
                  autoFocus
                  valid={!isEmptyString(this.state.addServiceName)}
                  invalid={isEmptyString(this.state.addServiceName)}
                  onChange={this.handleAddServiceNameChange} />
                <FormFeedback type="invalid">
                    Please enter a name for your service.
                </FormFeedback>
              </FormGroup>

              {/* Price */}
              <Label>Service Price</Label>
              <InputGroup className="mb-3">
                <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                <Input
                  type="number"
                  defaultValue="0"
                  min="0"
                  onChange={this.handleAddServicePriceChange}
                  valid={isPositiveNumber(this.state.addServicePrice)}
                  invalid={!isPositiveNumber(this.state.addServicePrice)} />
                <InputGroupAddon addonType="append">.00</InputGroupAddon>
                <FormFeedback type="invalid">
                    Please enter positive number.
                </FormFeedback>
              </InputGroup>

              {/* Text area */ }
              <FormGroup>
                <Label>Service Description</Label>
                <Input type="textarea"
                  valid={true}
                  rows={3}
                  onChange={this.handleAddServiceDescriptionChange}/>
              </FormGroup>

              {/* Drop or click to add photos in this area */ }
              <Dropzone
                onDrop={this.onImageDrop.bind(this)}
                accept="image/*"
                multiple={false} >
                  {({getRootProps, getInputProps}) => {
                    return (
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        {
                          <p className="dropArea">Try dropping the image here, or click to select the image to upload.</p>
                        }
                      </div>
                    )
                }}
              </Dropzone>

              {/* Previewing image */}
              <div>
                {this.state.uploadedFileCloudinaryUrl === '' ? null :
                <div>
                  <p><span className="text-muted">Image Preview: </span>{this.state.uploadedFile.name}</p>
                  <img className="dropAreaImage" src={this.state.uploadedFileCloudinaryUrl} />
                </div>}
              </div>

              {/* Reusing login code to position buttons */}
              <div className="loginButtons mt-8">
                <Button
                  color="success"
                  type="button"
                  onClick={this.handleAddServiceFormSubmit.bind(this)}
                  >
                  Create Service
                </Button>
              </div>

            </Form>
          </ModalBody>
        </Modal>

        {/* Delete Service Modal */}
        <Modal
          isOpen={this.state.deleteServiceModal}
          toggle={this.deleteServiceToggle}>
          <ModalHeader
            toggle={this.deleteServiceToggle}
            close={closeDeleteServiceButton}>
            Delete Service
          </ModalHeader>
          <ModalBody>
            <p>Are you sure you want to delete this service?</p>
          </ModalBody>
          <ModalFooter>
            <Button
              color="secondary"
              onClick={this.handleDeleteServiceFormCancel.bind(this)}>Cancel</Button>
            <Button
              color="danger"
              type="submit"
              onClick={this.handleDeleteServiceFormConfirm.bind(this)} >
              Remove Service
            </Button>
          </ModalFooter>
        </Modal>

        <ToastContainer autoClose={5000}/>
      </DefaultLayout>
    );
  }
}

export default Login;
