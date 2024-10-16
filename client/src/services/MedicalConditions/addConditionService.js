import axiosInstance from '../../utils/axiosInstance'


export const addMedicalCondition = async(data) => {
    try {
        const response = await axiosInstance.post('/addMedicalCondition', data);
        return response.data; // Devuelve la respuesta si es necesario
    } catch (error) {
        console.error("Error adding condition:", error.message);
        throw new Error("Error adding condition"); // Lanza el error para que el componente pueda manejarlo
    }
    

}

