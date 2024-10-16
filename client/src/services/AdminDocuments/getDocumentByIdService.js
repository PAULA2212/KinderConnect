import axiosInstance from "../../utils/axiosInstance";

export const getDocumentById = async (id, type) => {

    try {
        const response = await axiosInstance.get(`/getDocumentById/${id}/${type}`);
        return response.data; // Devuelve la respuesta si es necesario
    } catch (error) {
        console.error("Error getting document:", error.message);
        throw new Error("Error getting document"); // Lanza el error para que el componente pueda manejarlo
    }
}