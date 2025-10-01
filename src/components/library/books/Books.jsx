
import { useState, useEffect } from 'react';
import BookSearch from '../BookSearch/BookSearch';
import BookList from '../bookList/BookList';
import BookForm from '../bookForm/bookForm';

function Books({ books, onBookDeleted, onBookSaved, showAddBook, setShowAddBook }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [editingBook, setEditingBook] = useState(null);

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const handleBookSelect = (bookId) => {
        const book = books.find(b => b.id === bookId);
        setEditingBook(book);
        setShowAddBook(true);
    };

    const handleFormSubmit = (bookData) => {
        console.log("Books handleFormSubmit called with:", bookData);
        onBookSaved && onBookSaved(bookData);
        setShowAddBook(false);
        setEditingBook(null);
    };

    const handleCancel = () => {
        setShowAddBook(false);
        setEditingBook(null);
    };

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div style={{ marginTop: '-10px', marginBottom: '10px' }}>
                <BookSearch onSearch={handleSearch} />
            </div>
            <BookList books={filteredBooks} onBookSelect={handleBookSelect} onBookDeleted={onBookDeleted} />
            {/* Detalles del libro solo si se está editando y el form está visible */}
            {editingBook && showAddBook && (
                <div className="mb-3 p-3 border rounded bg-light">
                    <h4>Detalles del libro</h4>
                    <p><strong>Título:</strong> {editingBook.title}</p>
                    <p><strong>Autor:</strong> {editingBook.author}</p>
                    <p><strong>Páginas:</strong> {editingBook.pageCount}</p>
                    <p><strong>Resumen:</strong> {editingBook.summary}</p>
                </div>
            )}
            {showAddBook && (
                <BookForm
                    book={editingBook}
                    isEditing={!!editingBook}
                    onSubmit={handleFormSubmit}
                    onCancel={handleCancel}
                />
            )}
        </div>
    );
}

export default Books;
