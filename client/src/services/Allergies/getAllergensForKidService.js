import axiosInstance from "../../utils/axiosInstance"

export const getAllergensForKid = async (id) => {
    try {
        const response = await axiosInstance(`/getAllergens/${id}`);
        return response.data
    }catch (error){
        console.error("Error get allergen:", error.message);
        throw new Error("Error get allergen");
    }
    
}