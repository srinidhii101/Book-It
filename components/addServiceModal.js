//local imports
import { isPositiveNumber } from '../functions/validate';

//module imports
import { Modal, Button, Form, InputGroup, Image } from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import request from 'superagent';

//Cloudinary constants
const CLOUDINARY_UPLOAD_PRESET = 'ml_default';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/kirby-cloud/image/upload';

//Add Service Modal Class
class AddServiceModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      uploadedFile: null,
      uploadedFileCloudinaryUrl: '',
      serviceName: '',
      serviceDescription: '',
      servicePrice: 0
    };
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

  //handlers to update the form fields with state
  handleServiceNameChange = (e) => {
    this.setState({ ...this.state, serviceName: e.currentTarget.value});
  }
  handleServiceDescriptionChange = (e) => {
    this.setState({ ...this.state, serviceDescription: e.currentTarget.value});
  }
  handleServicePriceChange = (e) => {
    this.setState({ ...this.state, servicePrice: e.currentTarget.value});
  }

  //handle submit and check for a valid form
  handleSubmit(e) {
    if(this.state.serviceName.length > 0 && isPositiveNumber(this.state.servicePrice)) {
      // TODO: Make this a toast
      alert("Service has been added!");
    }
    else {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  render() {
    //setting state
    const { serviceName, serviceDescription, servicePrice } = this.state;

    return (
      <Modal
        {...this.props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add a Service
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form
          noValidate
          validated={this.state.serviceName.length > 0 && isPositiveNumber(servicePrice)}
          onSubmit={e => this.handleSubmit(e)} >

            {/* Username */}
            <Form.Group controlId="serviceName">
              <Form.Label>Service Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the service name"
                required
                autoFocus
                isInvalid={this.state.serviceName.length < 1}
                onChange={this.handleServiceNameChange} />
              <Form.Control.Feedback type="invalid">
                  Please enter a name for your service.
              </Form.Control.Feedback>
            </Form.Group>

            {/* Price */}
            <Form.Label>Service Price</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text>$</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="number"
                defaultValue="0"
                min="0"
                onChange={this.handleServicePriceChange}
                isValid={isPositiveNumber(this.state.servicePrice)}
                isInvalid={!isPositiveNumber(this.state.servicePrice)} />
              <InputGroup.Append>
                <InputGroup.Text>.00</InputGroup.Text>
              </InputGroup.Append>
              <Form.Control.Feedback type="invalid">
                  Please enter positive number.
              </Form.Control.Feedback>
            </InputGroup>

            {/* Text area */ }
            <Form.Group controlId="serviceTextarea">
              <Form.Label>Service Description</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                isValid={true}
                onChange={this.handleServiceDescriptionChange} />
            </Form.Group>

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
                <Image className="dropAreaImage" src={this.state.uploadedFileCloudinaryUrl} fluid />
              </div>}
            </div>

            {/* Reusing login code to position buttons */}
            <div className="loginButtons mt-8">
              <Button
                variant="success"
                type="submit"
                >
                Create Service
              </Button>
            </div>

          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default AddServiceModal;
