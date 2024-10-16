import axiosInstance from "../../utils/axiosInstance";

// Agrega la opción de devolver la respuesta y manejar errores mejor
export const addAllergen = async (data) => {
    try {
        const response = await axiosInstance.post('/addAllergen', data);
        return response.data; // Devuelve la respuesta si es necesario
    } catch (error) {
        console.error("Error adding allergen:", error.message);
        throw new Error("Error adding allergen"); // Lanza el error para que el componente pueda manejarlo
    }
}