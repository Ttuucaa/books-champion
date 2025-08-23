import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const MyModal = ({ show, onClose, onConfirm, title, body }) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title || "Confirmar acción"}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>{body || "¿Estás seguro de que querés eliminar este libro?"}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          Aceptar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MyModal;
