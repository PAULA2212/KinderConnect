import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importa el icono de FontAwesome
import { faGlasses } from '@fortawesome/free-solid-svg-icons'; // Importa el icono específico (gafas)
import BookModalForm from './BookModalForm'; // Importa el componente del formulario de libro
import BookList from './BookList'; // Importa el componente de lista de libros
import useBookClub from './useBookClub'; // Importa el custom hook

export default function BookClub() {
  const { books, loading, handleBookAdded } = useBookClub(); // Usa el custom hook

  return (
    <>
      <h1 className='kinder-title'>
        <FontAwesomeIcon icon={faGlasses} /> Club de lectura
      </h1>
      <BookModalForm onBookAdded={handleBookAdded} /> {/* Pasa la función de manejo de libro añadido */}
      {books.length === 0 ?
        <p>Aun no hay libros en el club de lectura</p> :
        <BookList books={books} loading={loading} /> } {/* Pasa los libros y el estado de carga */}
    </>
  );
}
