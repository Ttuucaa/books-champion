import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState(1);
  const [pageCount, setPageCount] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [summary, setSummary] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) {
      toast.error("El título y el autor son obligatorios.");
      return;
    }
    const newBook = {
      title,
      author,
      rating: Number(rating),
      pageCount: Number(pageCount),
      imageUrl,
      summary,
      available: true
    };
    toast.success("Libro agregado correctamente");
    setTimeout(() => {
      navigate("/dashboard", { state: { newBook } });
    }, 1200);
  };

  return (
    <div style={{ maxWidth: 500, margin: "40px auto" }}>
      <h2>Agregar libro</h2>
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
        <Button variant="success" type="submit">Agregar</Button>
        <Button variant="secondary" style={{marginLeft: 10}} onClick={() => navigate("/dashboard")}>Cancelar</Button>
      </Form>
    </div>
  );
};

export default AddBook;
