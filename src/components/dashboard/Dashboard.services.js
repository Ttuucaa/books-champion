import { errorToast, successToast } from "../library/notifications/notifications.js";

const baseUrl = import.meta.env.VITE_BASE_SERVER_URL;

// Obtener todos los libros
export const getBooks = ({ onSuccess, onError }) => {
    fetch(`${baseUrl}/books`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("book-champions-token")}`
        }
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error(res.message || "Algo ha salido mal");
        }
    })
    .then(data => {
        if (onSuccess) {
            onSuccess([...data]);
        }
    })
    .catch(err => {
        if (onError) {
            onError(err);
        }
    });
};

// Agregar nuevo libro
export const addBook = (enteredBook, { onSuccess, onError }) => {
    if (!enteredBook.title || !enteredBook.author) {
        if (onError) {
            onError("El autor y/o título son requeridos");
        }
        return;
    }
    
    fetch(`${baseUrl}/books`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("book-champions-token")}`
        },
        body: JSON.stringify(enteredBook)
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error(res.message || "Algo ha salido mal");
        }
    })
    .then(data => {
        if (onSuccess) {
            onSuccess(data.title + " agregado correctamente");
        }
    })
    .catch(err => {
        if (onError) {
            onError(err);
        }
    });
};

// Eliminar libro
export const deleteBook = (bookId, { onSuccess, onError }) => {
    fetch(`${baseUrl}/books/${bookId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("book-champions-token")}`
        }
    })
    .then(res => {
        if (res.ok) {
            if (onSuccess) {
                onSuccess();
            }
        } else {
            throw new Error(res.message || "Error al eliminar libro");
        }
    })
    .catch(err => {
        if (onError) {
            onError(err);
        }
    });
};