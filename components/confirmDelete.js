import { Modal, Button } from 'react-bootstrap';

// Modal to confirm the deleting of service
class ConfirmDeleteModal extends React.Component {
  render() {
    return (
      <Modal
        {...this.props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered >
        <Modal.Header
          closeButton>
          <h4>Delete Service</h4>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this service?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.onHide}>Cancel</Button>
          <Button
            variant="danger"
            type="submit"
            onClick={this.props.onHide} >
            Remove Service
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ConfirmDeleteModal;
