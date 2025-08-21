import { useState } from 'react';
import './App.css';
import NewBook from './components/library/NewBook/NewBooks.jsx';
import Books from './components/library/books/Books.jsx';
import Login from './components/auth/login/Login.jsx';


const App = () => {
  const [books, setBooks] = useState([]);

  const handleBookAdded = (enteredBook) => {
    setBooks((prevBooks) => {
      return [enteredBook, ...prevBooks]
    })
  };

  return (
    <div>
      <h1 className='tituloo'>Books Champion App</h1>
      <div className="new-book-form-container">
        <NewBook onBookAdded={handleBookAdded} />
      </div>
      <Books />
      <Login />
    </div>
  )
}

export default App;
