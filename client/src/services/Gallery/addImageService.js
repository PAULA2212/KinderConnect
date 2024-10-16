import axiosInstance from "../../utils/axiosInstance";

export const addImage = async (data) => {
    try {
        const response = await axiosInstance.post('/addImage', data);
        return response.data; // Devuelve la respuesta si es necesario
    } catch (error) {
        console.error("Error adding image:", error.message);
        throw new Error("Error adding image"); // Lanza el error para que el componente pueda manejarlo
    }
}