import { useState, useEffect } from 'react'; // Importa los hooks necesarios de React
import axiosInstance from '../../utils/axiosInstance'; // Importa la instancia de Axios
import { getBooks } from '../../services/BookClubService'; // Importa la función del servicio para obtener libros

/**
 * Custom hook para manejar la lógica del club de lectura.
 * @returns {Object} - Devuelve los libros, estado de carga y una función para actualizar la lista de libros.
 */
const useBookClub = () => {
  const [books, setBooks] = useState([]); // Estado para almacenar la lista de libros
  const [loading, setLoading] = useState(true); // Estado para manejar la carga

  // Función para obtener la lista inicial de libros
  const fetchBooks = async () => {
    setLoading(true); // Establece la carga a true al iniciar la búsqueda
    try {
      const response = await axiosInstance.get('/books'); // Llama a la API para obtener libros
      setBooks(response.data); // Actualiza el estado con los libros obtenidos
    } catch (error) {
      console.error('Error fetching books:', error); // Manejo de errores
    } finally {
      setLoading(false); // Finaliza la carga
    }
  };

  // Llama a la función fetchBooks al montar el componente
  useEffect(() => {
    fetchBooks();
  }, []);

  // Función para manejar la adición de un nuevo libro
  const handleBookAdded = async () => {
    try {
      const response = await getBooks(); // Llama al servicio para obtener la lista de libros actualizada
      setBooks(response.data); // Actualiza el estado con la nueva lista de libros
    } catch (error) {
      console.error('Error fetching books:', error); // Manejo de errores
    }
  };

  return {
    books, // Devuelve la lista de libros
    loading, // Devuelve el estado de carga
    handleBookAdded, // Devuelve la función para manejar la adición de un libro
  };
};

export default useBookClub;
