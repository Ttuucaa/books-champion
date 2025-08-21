import React from "react";
import BookItem from "../bookItem/BookItem";

const BookList = ({ books, onBookSelect }) => {
  if (books.length === 0) {
    return <p>No hay lecturas disponibles</p>
  }
  return (
    <div className="book-list">
      {books.map((book) => (
        <BookItem
          key={book.id}
          title={book.title}
          author={book.author}
          rating={book.rating}
          imageUrl={book.imageUrl}
          pageCount={book.pageCount}
          available={book.available}
          onSelect={onBookSelect}
        />
      ))}
    </div>
  );
};

export default BookList;
