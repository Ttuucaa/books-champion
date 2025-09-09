import { useState } from 'react';
import BookSearch from '../BookSearch/BookSearch';
import BookList from '../bookList/BookList';
import BookForm from '../bookForm/bookForm';

const Books = ({ books, onBookDeleted, onBookUpdated, onBookAdded }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showBookForm, setShowBookForm] = useState(false);
    const [editingBook, setEditingBook] = useState(null);

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const handleBookSelect = (bookId) => {
        const book = books.find(b => b.id === bookId);
        setEditingBook(book);
        setShowBookForm(true);
    };

    const handleAddBookClick = () => {
        setEditingBook(null);
        setShowBookForm(true);
    };

    const handleFormSubmit = (bookData) => {
        if (editingBook) {
            onBookUpdated && onBookUpdated(bookData);
        } else {
            onBookAdded && onBookAdded(bookData);
        }
        setShowBookForm(false);
        setEditingBook(null);
    };

    const handleCancel = () => {
        setShowBookForm(false);
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
            <button
                id="add-book-btn"
                className="btn btn-success mb-3"
                style={{ display: 'none' }}
                onClick={handleAddBookClick}
            >
                Agregar libro
            </button>
            <BookList books={filteredBooks} onBookSelect={handleBookSelect} onBookDeleted={onBookDeleted} />
            {showBookForm && (
                <BookForm
                    book={editingBook}
                    isEditing={!!editingBook}
                    onSubmit={handleFormSubmit}
                    onCancel={handleCancel}
                />
            )}
        </div>
    );
};

export default Books;
