import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';

const BookItem = ({ title, author, rating, pageCount, imageUrl, available, onSelect }) => {

    const handleSelect = () => {
        if (onSelect) {
            onSelect(title);
        }
    };

    return (
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
                    Calificación: {rating} estrellas
                    <br />
                    Páginas: {pageCount}
                </Card.Text>

                <Button onClick={handleSelect}>
                    Seleccionar libro
                </Button>

            </Card.Body>
        </Card>
    );
}
export default BookItem
