import axiosInstance from "../../utils/axiosInstance";

export const getFoods = async (id) => {
    try{
        const response = await axiosInstance.get(`/getFoods/${id}`)
        console.log('Respuesta completa de la API:', response); // Imprime la respuesta completa para revisión
        console.log('Datos devueltos:', response.data);
        return response.data
    } catch (error){
        console.error("Error get foods:", error.message);
        throw new Error("Error get foods");
    }
}
