import axiosInstance from "../utils/axiosInstance"; // Importa la instancia de Axios configurada

/**
 * Agrega un nuevo libro al sistema.
 * 
 * @param {FormData} formData - Datos del libro en formato FormData, incluyendo archivos como imágenes o PDF.
 * @returns {Promise<object>} - Devuelve los datos de la respuesta de la API con los detalles del libro agregado.
 * @throws {Error} - Lanza un error si la solicitud para agregar el libro falla.
 */
export const addBook = async (formData) => {
    try {
        // Realiza la solicitud POST al endpoint del backend para agregar un libro
        const response = await axiosInstance.post('/addBook', formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Configura el encabezado para datos tipo FormData
            },
        });
        return response.data; // Devuelve solo los datos de la respuesta (response.data)
    } catch (error) {
        console.error('Error en la solicitud para agregar el libro:', error); // Log del error en caso de fallo
        throw error; // Lanza el error para que el componente que llama pueda manejarlo
    }
};

/**
 * Obtiene la lista de libros disponibles.
 * 
 * @returns {Promise<object>} - Devuelve los datos de la respuesta de la API con la lista de libros.
 * @throws {Error} - Lanza un error si la solicitud para obtener los libros falla.
 */
export const getBooks = async () => {
    try {
        // Realiza la solicitud GET al endpoint del backend para obtener los libros
        const response = await axiosInstance.get('/books');
        return response; // Devuelve la respuesta completa de la solicitud (se recomienda revisar si solo se necesita response.data)
    } catch (error) {
        console.error("Error get books:", error.message); // Log del error en caso de fallo
        throw new Error("Error get books"); // Lanza el error para que el componente que llama pueda manejarlo
    }
};
