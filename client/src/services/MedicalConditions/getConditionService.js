import axiosInstance from "../../utils/axiosInstance";
 
export const getConditions = async(id) => {
    try {
        const response = await axiosInstance(`/getConditions/${id}`);
        return response.data
    }catch (error){
        console.error("Error get condition:", error.message);
        throw new Error("Error get condition");
    }
}