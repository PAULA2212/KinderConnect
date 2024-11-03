/* eslint-disable react/prop-types */

import BookCard from './BookCard';
import { Container, Row } from 'react-bootstrap';

export default function BookList({ books, loading }) {

  return (
    <Container>
      <Row className="justify-content-center">
        {loading ? (
          <div>Loading...</div>
        ) : (
          books.map((book) => (
              <BookCard  key={book.id_registro} book={book} />
          ))
        )}
      </Row>
    </Container>
  );
}
