import { useState } from 'react';
import BookSearch from '../BookSearch/BookSearch';
import BookList from '../bookList/BookList';

const Books = ({ books, onBookDeleted }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <BookSearch onSearch={handleSearch} />
            <BookList books={filteredBooks} onBookDeleted={onBookDeleted} />
        </div>
    );
};

export default Books;
