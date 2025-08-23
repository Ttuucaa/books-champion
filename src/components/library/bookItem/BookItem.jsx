import React, { useState } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { StarFill,Star } from 'react-bootstrap-icons';
import MyModal from '../../ui/MyModal';

const BookItem = ({ id, title, author, rating, pageCount, imageUrl, available, onSelect, onBookDeleted }) => {
    const [showModal, setShowModal] = useState(false);

    const handleSelect = () => {
        if (onSelect) {
            onSelect(title);
        }
    };
    const handleDelete = () => {
        onBookDeleted(id);
        setShowModal(false);
    };

    return (
        <>
            <Card style={{ width: '20rem' }} className="book-item">
                <Card.Img
                    variant="top"
                    height="400"
                    src={imageUrl !== "" ? imageUrl : "https://via.placeholder.com/150"}
                />

                <Card.Body>

                    <Card.Title>{title}</Card.Title>

                    <Card.Text>

                        <div className="mb-2">
                            {
                                available ?
                                    <Badge bg="success">Disponible</Badge> :
                                    <Badge bg="danger">No disponible</Badge>
                            }
                        </div>


                        Autor: {author}
                        <br />
                        Calificación:&nbsp;
                        {Array.from({ length: 5 }, (_, i) => (
                            i < rating ? <StarFill key={i} color="gold" /> : <Star key={i} />
                        ))}

                        <br />
                        Páginas: {pageCount}
                    </Card.Text>

                    <Button onClick={handleSelect}>
                        Seleccionar libro
                    </Button>
                    <button onClick={() => setShowModal(true)} className="btn btn-danger ms-2">
                        Eliminar libro
                    </button>

                </Card.Body>
            </Card>
            <MyModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleDelete}
                title="Confirmar eliminación"
                body={`¿Estás seguro de que deseas eliminar el libro "${title}"?`}
            />
        </>
    );
}
export default BookItem
