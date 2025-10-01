
import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";

const BookForm = ({ book, isEditing = false, onSubmit, onCancel }) => {
  const safeBook = book || {};
  const [title, setTitle] = useState(safeBook.title || "");
  const [author, setAuthor] = useState(safeBook.author || "");
  const [rating, setRating] = useState(safeBook.rating || 1);
  const [pageCount, setPageCount] = useState(safeBook.pageCount || "");
  const [imageUrl, setImageUrl] = useState(safeBook.imageUrl || "");
  const [summary, setSummary] = useState(safeBook.summary || "");

  useEffect(() => {
    const b = book || {};
    setTitle(b.title || "");
    setAuthor(b.author || "");
    setRating(b.rating || 1);
    setPageCount(b.pageCount || "");
    setImageUrl(b.imageUrl || "");
    setSummary(b.summary || "");
  }, [book]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("BookForm handleSubmit called with:", { title, author, rating, pageCount, imageUrl, summary });
    
    if (!title.trim() || !author.trim()) {
      console.log("Validation failed: title or author empty");
      // Aquí deberías usar errorToast de notifications.js
      return;
    }
    
    const bookData = {
      ...book,
      title,
      author,
      rating: Number(rating),
      pageCount: Number(pageCount),
      imageUrl,
      summary,
      available: true,
    };
    
    console.log("Calling onSubmit with bookData:", bookData);
    onSubmit(bookData);
  };

  return (
    <div style={{ maxWidth: 500, margin: "40px auto" }}>
      <h2>{isEditing ? "Editar libro" : "Agregar libro"}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Título</Form.Label>
          <Form.Control value={title} onChange={e => setTitle(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Autor</Form.Label>
          <Form.Control value={author} onChange={e => setAuthor(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Rating</Form.Label>
          <Form.Control type="number" min={1} max={5} value={rating} onChange={e => setRating(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Páginas</Form.Label>
          <Form.Control type="number" value={pageCount} onChange={e => setPageCount(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Imagen (URL)</Form.Label>
          <Form.Control value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Resumen</Form.Label>
          <Form.Control as="textarea" rows={3} value={summary} onChange={e => setSummary(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit">
          {isEditing ? "Editar lectura" : "Agregar lectura"}
        </Button>
        <Button variant="secondary" style={{ marginLeft: 10 }} onClick={onCancel}>
          Cancelar
        </Button>
      </Form>
    </div>
  );
};

export default BookForm;
