import axiosInstance from "../../utils/axiosInstance";

export const addFood = async (data) => {
    try {
        const response = await axiosInstance.post('/addFood', data);
        return response.data; // Devuelve la respuesta si es necesario
    } catch (error) {
        console.error("Error adding food:", error.message);
        throw new Error("Error adding food"); // Lanza el error para que el componente pueda manejarlo
    }
}