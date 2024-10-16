/* eslint-disable react/prop-types */

import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card } from 'react-bootstrap';

export default function BookCard({ book }) {
  return (
    <Card className='kinder-card' style={{ width: '25rem', margin: '1rem' }}>
      {book.imagen_url ? (
        <div style={{ height: '490px'}}>
          <Card.Img variant="top" src={book.imagen_url} alt={book.titulo} className="img-fluid" style={{ objectFit: 'cover', height: '490px', marginTop: '10px' }}/>
        </div>
      ) : (
        <div style={{height: '490px', backgroundColor: '#b9f0ea', marginTop: '10px', borderRadius: '5px', opacity: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <FontAwesomeIcon icon={faBookOpen} size='7x' />
        </div>

      )}
      <Card.Body>
        <Card.Title>{book.titulo}</Card.Title>
        <Card.Text>{book.comentario}</Card.Text>
      </Card.Body>
    </Card>
  );
}
