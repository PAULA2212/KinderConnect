import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axiosInstance from '../../utils/axiosInstance';
import BookModalForm from './BookModalForm';
import BookList from './BookList';
import { faGlasses } from '@fortawesome/free-solid-svg-icons';

export default function BookClub() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the initial list of books
    const fetchBooks = async () => {
      try {
        const response = await axiosInstance.get('/books');
        setBooks(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching books:', error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []); // Fetch books on component mount

  const handleBookAdded = async () => {
    // Fetch the updated list of books after a book is added
    try {
      const response = await axiosInstance.get('/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  return (
    <>
      <h1 className='kinder-title'><FontAwesomeIcon icon={faGlasses}/> Club de lectura</h1>
      <BookModalForm onBookAdded={handleBookAdded} />
      <BookList books={books} loading={loading} />
    </>
  );
}
