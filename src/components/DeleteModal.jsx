import React from "react";
import { Modal, Button } from "bootstrap";

function DeleteModal({ show, onHide, onDelete }) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      backdrop="static"
      keyboard={false}
      aria-labelledby="modal-title"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="modal-title">Delete User</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteModal;
