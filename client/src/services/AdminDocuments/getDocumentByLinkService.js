import axiosInstance from "../../utils/axiosInstance";

export const getDocumentByLink = async (id, type) => {

    try {
        const response = await axiosInstance.get(`/getDocumentByLink/${id}/${type}`);
        return response.data; // Devuelve la respuesta si es necesario
    } catch (error) {
        console.error("Error getting document:", error.message);
        throw new Error("Error getting document"); // Lanza el error para que el componente pueda manejarlo
    }
}