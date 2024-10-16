import axiosInstance from "../../utils/axiosInstance";

export const addDocument = async (formData,profileType) => {

    const apiURL = profileType === "educador" ? "/addDocument" : "/addDocumentForKid"
    try {
        const response = await axiosInstance.post(apiURL, formData);
        return response.data; // Devuelve la respuesta si es necesario
    } catch (error) {
        console.error("Error adding document:", error.message);
        throw new Error("Error adding document"); // Lanza el error para que el componente pueda manejarlo
    }
}