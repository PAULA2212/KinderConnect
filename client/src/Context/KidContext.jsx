import { createContext, useState, useEffect, useContext } from "react";
import axiosInstance from "../utils/axiosInstance";
import { UserContext } from "./UserContext";

export const KidContext = createContext();

// eslint-disable-next-line react/prop-types
export const KidProvider = ({ children }) => {
    console.log('KidProvider: Component render start');
    
    const { user, profileType } = useContext(UserContext);
    const idUser = user ? (profileType === 'progenitor' ? user.id_progenitor : user.id_educador) : null;

    const [kid, setKid] = useState(null);
    const [sessionCleared, setSessionCleared] = useState(false); // Nuevo estado

    const fetchKidData = async (kidId) => {
        console.log('KidProvider: Fetching kid details for:', kidId);
        try {
            const response = await axiosInstance.get(`/contextokid/${kidId}`);
            console.log('KidProvider: Kid details fetched:', response.data);
            return response.data;
        } catch (error) {
            console.error('KidProvider: Error fetching kid details:', error);
            return null; // Return null if there's an error
        }
    };

    const loadKid = async () => {
        console.log('KidProvider: Checking session storage...');
        const storeKid = Number(sessionStorage.getItem(`idKid_${idUser}`));

        if (storeKid) {
            console.log('KidProvider: Kid found in session storage:', storeKid);
            const kidId = Number(storeKid); // Ensure the id is a number
            const kidData = await fetchKidData(kidId); // Fetch the kid data
            if (kidData) {
                setKid(kidData); // Update state with fetched data
                console.log('KidProvider: Setting kid state and scheduling sessionStorage cleanup');

                // Demorar la eliminación del idKid para permitir que se renderice el mensaje
                /* setTimeout(() => {
                    sessionStorage.removeItem(`idKid_${idUser}`);
                    console.log('KidProvider: idKid removed from sessionStorage');
                    setSessionCleared(true); // Actualizar estado indicando que se limpió el sessionStorage
                }, 3000); // 3 segundos de demora */
            }
        } else {
            console.log('KidProvider: No kid found in session storage');
            setKid(null);
        }
    };

    const reloadKid = () => {
        console.log('KidProvider: Reloading kid data');
        loadKid();
    }

    useEffect(() => {
        if (user) {
            console.log('KidProvider: User or profileType updated, loading kid data...');
            loadKid(); // Load kid data when the provider mounts or when user changes
        }
    }, [user]);

    return (
        <KidContext.Provider value={{ kid, reloadKid }}>
            {children}
        </KidContext.Provider>
    );
};
