import { Button, Card, Col, Form, Row } from "react-bootstrap";
import React, { useState } from "react";

const NewBook = ({ onBookAdded }) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [rating, setRating] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [imageUrl, setImageUrl] = useState("");
    const [available, setAvailable] = useState(false);

    const handleChangeTitle = (event) => {
        setTitle(event.target.value);
    }
    const handleChangeAuthor = (event) => {
        setAuthor(event.target.value);
    }
    const handleChangeRating = (event) => {
        setRating(event.target.value);
    }
    const handleChangePageCount = (event) => {
        setPageCount(event.target.value);
    }
    const handleChangeImageUrl = (event) => {
        setImageUrl(event.target.value);
    }
    const handleAvailabilityChange = (event) => {
        setAvailable(event.target.checked);
    }

    const handleAddBook = (event) => {
        event.preventDefault();
        const bookData = {
            id: Math.random().toString(),
            title,
            author,
            rating: parseInt(rating),
            pageCount: parseInt(pageCount, 10),
            imageUrl,
            available
        }
        onBookAdded(bookData);
        setTitle("");
        setAuthor("");
        setRating(0);
        setPageCount(0);
        setImageUrl("");
        setAvailable(false);
    }

    return (
        <Card className="m-4 w-50" bg="success">
            <Card.Body>
                <Form className="text-white" onSubmit={handleAddBook}>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="title">
                                <Form.Label>Título</Form.Label>
                                <Form.Control type="text" placeholder="Ingresar título"
                                    value={title}
                                    onChange={handleChangeTitle} />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="author">
                                <Form.Label>Autor</Form.Label>
                                <Form.Control type="text" placeholder="Ingresar autor"
                                    value={author}
                                    onChange={handleChangeAuthor} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="rating">
                                <Form.Label>Puntuación</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Ingresar cantidad de estrellas"
                                    max={5}
                                    min={0}
                                    value={rating}
                                    onChange={handleChangeRating}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="pageCount">
                                <Form.Label>Cantidad de páginas</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Ingresar cantidad de páginas"
                                    min={1}
                                    value={pageCount}
                                    onChange={handleChangePageCount}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="justify-content-between">
                        <Form.Group className="mb-3" controlId="imageUrl">
                            <Form.Label>URL de imagen</Form.Label>
                            <Form.Control type="text" placeholder="Ingresar url de imagen"
                                value={imageUrl}
                                onChange={handleChangeImageUrl} />
                        </Form.Group>
                    </Row>
                    <Row className="justify-content-end">
                        <Col md={3} className="d-flex flex-column justify-content-end align-items-end">
                            <Form.Check
                                type="switch"
                                id="available"
                                className="mb-3"
                                label="¿Disponible?"
                                checked={available}
                                onChange={handleAvailabilityChange}
                            />
                            <Button variant="primary" type="submit">
                                Seleccionar libro
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    );
};


export default NewBook;
