import axiosInstance from "../../utils/axiosInstance";

export const getImagesForKid = async (idKid) => {
    try{
        const response = await axiosInstance.get(`/getImages/${idKid}`)
        console.log("id",  idKid)
        console.log('Respuesta completa de la API:', response); // Imprime la respuesta completa para revisión
        console.log('Datos devueltos:', response.data);
        return response.data
    } catch (error){
        console.error("Error get images:", error.message);
        throw new Error("Error get imagess");
    }
}
