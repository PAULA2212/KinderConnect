import axiosInstance from "../../utils/axiosInstance";

export const deleteDocument = async(id, type) => {

    try {
        const response = await axiosInstance.delete(`/deleteDocument/${id}/${type}`);
        return response.data; // Devuelve la respuesta si es necesario
    } catch (error) {
        console.error("Error on delete document:", error.message);
        throw new Error("Error delete document"); // Lanza el error para que el componente pueda manejarlo
    }
}