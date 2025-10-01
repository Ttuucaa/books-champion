import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Books from "../library/books/Books";
import { getBooks, addBook, deleteBook } from "./Dashboard.services.js";
import { errorToast, successToast } from "../library/notifications/notifications";

const Dashboard = ({ onLogout }) => {

  const [bookList, setBookList] = useState([]);
  useEffect(() => {
    getBooks({
      onSuccess: (data) => setBookList(data),
      onError: (error) => {
        console.error("Error fetching books:", error);
        errorToast(typeof error === 'string' ? error : error.message || "Error al cargar libros");
      }
    });
  }, []);

  const handleBookSaved = (book) => {
    console.log("Dashboard handleBookSaved called with:", book);
    
    addBook(book, {
      onSuccess: (message) => {
        console.log("addBook success:", message);
        setBookList(prev => {
          if (book.id) {
            // Actualizar libro existente
            return prev.map(b => b.id === book.id ? { ...b, ...book } : b);
          } else {
            // Agregar nuevo libro
            return [{ ...book, id: Math.random() }, ...prev];
          }
        });
        successToast(message || "Libro guardado exitosamente");
      },
      onError: (error) => {
        console.error("addBook error:", error);
        errorToast(typeof error === 'string' ? error : error.message || "Error al guardar libro");
      }
    });
  };

  const handleBookDeleted = (bookId) => {
    deleteBook(bookId, {
      onSuccess: () => {
        setBookList((prevBookList) =>
          prevBookList.filter((book) => book.id !== bookId)
        );
        successToast("Libro eliminado exitosamente");
      },
      onError: (error) => {
        console.error("Error deleting book:", error);
        errorToast(typeof error === 'string' ? error : error.message || "Error al eliminar libro");
      }
    });
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  // Estado para controlar el modal de agregar libro
  const [showAddBook, setShowAddBook] = useState(false);

  const handleAddBookClick = () => {
    console.log("Add book button clicked");
    setShowAddBook(true);
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
          onClick={handleAddBookClick}
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
        showAddBook={showAddBook}
        setShowAddBook={setShowAddBook}
      />
    </div>
  );
};

export default Dashboard;
