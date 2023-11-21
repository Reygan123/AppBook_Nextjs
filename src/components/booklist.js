// components/BookList.js
import React from 'react';

const BookList = ({ books }) => {
  return (
    <ul>
      {books.map(book => (
        <li key={book.id}>{book.title}</li>
      ))}
    </ul>
  );
};

export default BookList;
