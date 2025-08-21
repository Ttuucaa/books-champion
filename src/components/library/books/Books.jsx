import { useState } from 'react';
import BookSearch from '../BookSearch/BookSearch';
import BookList from '../bookList/BookList';

export const BOOKS = [
    {
        id: Math.random().toString(),
        title: "100 Años de Soledad",
        author: "Gabriel Garcia Marquez",
        rating: 5,
        pageCount: 410,
        imageUrl: "https://www.rae.es/sites/default/files/portada_cien_anos_de_soledad_0.jpg",
        available: true
    },
    {
        id: Math.random().toString(),
        title: "El Aleph",
        author: "Jorge Luis Borges",
        rating: 4.5,
        pageCount: 300,
        imageUrl: "https://images.cdn3.buscalibre.com/fit-in/360x360/ab/b1/abb1e18f6c89a6dd0f021a63514759a9.jpg",
        available: false
    },
    {
        id: Math.random().toString(),
        title: "Rayuela",
        author: "Julio Cortázar",
        rating: 4,
        pageCount: 600,
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Rayuela_JC.png",
        available: true
    },
    {
        id: Math.random().toString(),
        title: "Don Quijote de la Mancha",
        author: "Miguel de Cervantes",
        rating: 5,
        pageCount: 800,
        imageUrl: "https://www.elejandria.com/covers/Don_Quijote_de_la_Mancha-Cervantes_Miguel-lg.png",
        available: true
    }
];

const Books = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const filteredBooks = BOOKS.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <BookSearch onSearch={handleSearch} />
            <BookList books={filteredBooks} />
        </div>
    );
};

export default Books;
