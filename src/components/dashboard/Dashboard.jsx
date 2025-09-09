import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Books from "../library/books/Books";
import { successToast } from "../library/notifications/notifications";

const Dashboard = ({ onLogout }) => {

  const [bookList, setBookList] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/books")
      .then(res => res.json())
      .then(data => setBookList(data))
      .catch(err => console.error("Error fetching books:", err));
  }, []);

  const handleBookSaved = async (book) => {
    try {
      let response;
      if (book.id) {
        response = await fetch(`http://localhost:3000/books/${book.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(book)
        });
      } else {
        response = await fetch('http://localhost:3000/books', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(book)
        });
      }
      if (!response.ok) throw new Error('Error en la operacion');
      const savedBook = await response.json();
      setBookList(prev => {
        if (book.id) {
          return prev.map(b => b.id === book.id ? { ...b, ...savedBook } : b);
        } else {
          return [{ ...savedBook, id: Math.random() }, ...prev];
        }
      });
      successToast('Libro guardado correctamente');
    } catch (error) {
      console.error("Error saving book:", error);
    }
  };

  const handleBookDeleted = async (bookId) => {
  try {
    const response = await fetch(`http://localhost:3000/books/${bookId}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Error al eliminar el libro');
    setBookList((prevBookList) =>
      prevBookList.filter((book) => book.id !== bookId)
    );
    // Opcional: notificación de éxito
    // successToast('Libro eliminado correctamente');
  } catch (error) {
    console.error('Error eliminando libro:', error);
    // Opcional: notificación de error
    // errorToast('No se pudo eliminar el libro');
  }
};

  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };



  // Handler para el botón agregar libro
  let addBookClickHandler = null;
  const setAddBookClickHandler = (handler) => {
    addBookClickHandler = handler;
  };

  return (
    <div>
      {/* Título arriba de todo */}
      <h2 className="text-center" style={{ marginTop: '18px', marginBottom: '10px' }}>Book champions app</h2>
      {/* Navbar pequeña con ambos botones */}
      <div className="d-flex justify-content-end align-items-center" style={{ gap: '8px', marginBottom: '18px' }}>
        <Button
          id="add-book-btn"
          className="btn btn-success"
          style={{ marginRight: '8px' }}
          onClick={() => addBookClickHandler && addBookClickHandler()}
        >
          Agregar libro
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={handleLogout}
        >
          Cerrar sesión
        </Button>
      </div>
      {/* Libros debajo de la navbar */}
      <Books
        books={bookList}
        onBookDeleted={handleBookDeleted}
        onBookSaved={handleBookSaved}
        setAddBookClickHandler={setAddBookClickHandler}
      />
    </div>
  );
};

export default Dashboard;
