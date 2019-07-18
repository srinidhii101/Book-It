/* Login Page */
import DefaultLayout from '../layouts/default';
import { isPositiveNumber, isEmptyString } from '../functions/validate';
import { checkRole, checkUserId } from '../functions/auth';

//node modules imports
import { ToastContainer, toast } from 'react-toastify';
import '../node_modules/react-toastify/dist/ReactToastify.css';
import { Modal, ModalHeader, ModalBody, ModalTitle, ModalFooter, Button, Form, FormGroup, Label, Input, FormFeedback, FormText, InputGroup, InputGroupAddon, Container, Row, Col, ListGroup, ListGroupItem, Nav, NavItem, Fade } from 'reactstrap';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import Router from 'next/router';
import axios from 'axios';

//env constants
const CLOUDINARY_UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_UPLOAD_URL = process.env.CLOUDINARY_UPLOAD_URL;

class Login extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      uploadedFile: null,
      uploadedFileCloudinaryUrl: '',
      addServiceName: '',
      addServiceDescription: '',
      addServicePrice: 0,
      serviceName: '',
      serviceDescription: '',
      servicePrice: 0,
      serviceImagePath: '',
      serviceImageName: '',
      addServiceModal: false,
      deleteServiceModal: false,
      confirmDeleteModalShow: false,
      services: [],
      serviceIndex: 0
     };

     this.addServiceToggle = this.addServiceToggle.bind(this);
     this.deleteServiceToggle = this.deleteServiceToggle.bind(this);
  }

  //when the component mounts, redirecting if the user does not possess the correct permissions.
  componentDidMount() {
    if(checkRole(['admin', 'vendor'])) {
      Router.push('/login');
    }
    fetch('http://bluenose.cs.dal.ca:25057/api/users/'+ checkUserId() +'/services')
      .then((data) => data.json())
      .then((res) => this.setState({ services: res.data }))
      .then(() => this.loadService(0))
      .catch((err)=>{toast.warn("There were issues connecting to the server. Please check your connection.")});
  }

  //toggling add service modal
  addServiceToggle() {
    this.setState(prevState => ({
      addServiceModal: !prevState.addServiceModal
    }));
  }

  //toggling the deletion confirmation modal
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
    this.setState({ ...this.state, servicePrice: e.target.value});
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

  //Editting a selected service in the application
  handleEditServiceSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    if(!isEmptyString(this.state.serviceName) && isPositiveNumber(this.state.servicePrice)) {
      try {
        let serviceUpdate = this.state.services[this.state.serviceIndex];
        serviceUpdate.name = this.state.serviceName;
        serviceUpdate.price = this.state.servicePrice;
        serviceUpdate.description = this.state.serviceDescription;
        const config = { headers: {'Content-Type': 'application/json'} };
        axios.put('http://bluenose.cs.dal.ca:25057/api/services/' + this.state.services[this.state.serviceIndex]._id, serviceUpdate, config).then(res=>{
          if(res.data.success) {
            this.forceUpdate();
            toast.success("The service has been successfully updated!");
          }
          else{
            toast.warn("There were issues updating your service.");
          }
        });
      }
      catch(err) {
        toast.warn("There were issues updating your service.");
      }
    }
  }

  //Adding service to application
  async handleAddServiceFormSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    if(!isEmptyString(this.state.addServiceName) && isPositiveNumber(this.state.addServicePrice)) {
      // TODO: actually apply changes to the JSON object
      axios.defaults.headers.common = {};
      axios.defaults.headers.common.accept = "application/json";
      try {
        const service = {
          "user": checkUserId(),
          "lastBooked": null,
          "numberOfBookings": 0,
          "name": this.state.addServiceName,
          "description": this.state.addServiceDescription || '',
          "price": this.state.addServicePrice || 0,
          "cloud_name": this.state.uploadedFile ? this.state.uploadedFile.path : '',
          "cloud_url": this.state.uploadedFileCloudinaryUrl ? this.state.uploadedFileCloudinaryUrl : ''
        }
        const res = await axios.post('http://bluenose.cs.dal.ca:25057/api/services', service);
        if(res.data.success) {
          toast.success("The service has been added!");
          this.state.services.push(res.data.service);
          this.setState({
            ...this.state,
            addServiceModal: false,
            addServiceName: '',
            addServicePrice: 0,
            addServiceDescription: '',
            uploadedFile: null,
            uploadedFileCloudinaryUrl: '',
            serviceIndex: this.state.services.length - 1,
            serviceName: this.state.services[this.state.services.length-1].name || '',
            serviceDescription: this.state.services[this.state.services.length-1].description || '',
            servicePrice: this.state.services[this.state.services.length-1].price || 0,
            serviceImagePath: this.state.services[this.state.services.length-1].cloud_url || '',
            serviceImageName: this.state.services[this.state.services.length-1].cloud_name || '',
          });
          this.forceUpdate();
        }
        else {
          toast.warn("There were issues adding your service.");
        }
      }
      catch(err) {
        toast.warn("There were issues adding your service.");
      }
    }
  }

  //handle event for canceling the delete modal
  handleDeleteServiceFormCancel(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      ...this.state,
      deleteServiceModal: false,
    });
  }

  //deleting a service from the application
  handleDeleteServiceFormConfirm(e) {
    e.preventDefault();
    e.stopPropagation();
    if(this.state.services[this.state.serviceIndex]._id){
      const index = this.state.serviceIndex;
      axios.delete('http://bluenose.cs.dal.ca:25057/api/services/' + checkUserId() + '/' + this.state.services[index]._id).then(response => {
        this.state.services.splice(index, 1);
        this.setState({
          ...this.state,
          deleteServiceModal: false,
          serviceIndex: 0,
          serviceName: this.state.services[0].name || '',
          serviceDescription: this.state.services[0].description || '',
          servicePrice: this.state.services[0].price || 0,
          serviceImagePath: this.state.services[0].cloud_url || '',
          serviceImageName: this.state.services[0].cloud_name || '',
        });
        this.forceUpdate();
        toast.success("The service has been successfully deleted!");
      }).catch(err=> { toast.warn('There were issues connecting to the server.')});
    }
  }

  //helper function to choose to load a service at a certain index
  loadService(index) {
    this.setState({
      ...this.state,
      serviceName: this.state.services[index].name,
      serviceDescription: this.state.services[index].description || '',
      servicePrice: this.state.services[index].price || 0,
      serviceImagePath: this.state.services[index].cloud_url || '',
      serviceImageName: this.state.services[index].cloud_name || '',
      serviceIndex: index
    });
  }

  //handler for the event where a new service is clicked in the sidemenu
  handleServiceIndexChange(index, e) {
    this.setState({
      ...this.state,
      serviceName: this.state.services[e.currentTarget.id].name,
      serviceDescription: this.state.services[e.currentTarget.id].description || '',
      servicePrice: this.state.services[e.currentTarget.id].price || 0,
      serviceImagePath: this.state.services[e.currentTarget.id].cloud_url || '',
      serviceImageName: this.state.services[e.currentTarget.id].cloud_name || '',
      serviceIndex: index
    });
  }

  render() {
    //initialize values
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
                     <Input type="search" placeholder="Search..." autoFocus className="mt-1"/>
                  </Col>
                </Row>
                <hr/>
                <Row>
                  <Col className="pb-16">
                    <label className="text-muted">Results:</label>
                    <ListGroup className="searchResultList mb-8">
                    {/* Dynamically listed services */}
                      {this.state.services &&
                        this.state.services.map((service, index) => {
                          if(service) {
                            return (
                              <ListGroupItem
                                action
                                key={index}
                                id={index}
                                active={index == this.state.serviceIndex}
                                className="listItem"
                                onClick={this.handleServiceIndexChange.bind(this, index)}>
                                  {service.name}
                              </ListGroupItem>)
                          }
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
                        value={this.state.serviceName}
                        onChange={this.handleServiceNameChange}
                        valid={!isEmptyString(this.state.serviceName)}
                        invalid={isEmptyString(this.state.serviceName)} />
                        <FormFeedback type="invalid">
                            Please enter a name for your service.
                        </FormFeedback>
                      </FormGroup>

                      <Fade in>
                      {this.state.serviceImagePath &&
                        <img className="height-auto serviceImage mb-8" src={this.state.serviceImagePath} alt={this.state.serviceImageName} />
                      }
                      {!this.state.serviceImagePath &&
                        <div className="serviceImage backgroundImage mb-8"></div>
                      }
                      </Fade>
                    </Col>
                    <Col s={12} lg={6}>
                      {/* Price of Service */}
                      <Label className="text-muted">Service Price</Label>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">$
                        </InputGroupAddon>
                        <Input
                          type="number"
                          value={this.state.servicePrice}
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
                          value={this.state.serviceDescription} />
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
            validated={(!isEmptyString(this.state.addServiceName) && isPositiveNumber(this.state.addServicePrice)).toString()}
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
