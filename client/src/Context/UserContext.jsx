import { createContext, useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';

export const UserContext = createContext();

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
    console.log('UserProvider: Component render start');

    const [user, setUser] = useState(null);
    const [profileType, setProfileType] = useState(''); // Inicialmente vacío, se establecerá desde parsedUser
    const [loading, setLoading] = useState(true);

    const fetchUserDetails = async (userId, perfil) => {
        console.log('UserProvider: Fetching user details for:', userId, perfil);
        try {
            const response = await axiosInstance.get(`/detalleUsuario/${userId}/${perfil}`);
            console.log('UserProvider: User details fetched:', response.data);
            return response.data;
        } catch (error) {
            console.error('UserProvider: Error fetching user details:', error);
            return null; // Retorna null si hay un error
        }
    };

    const loadUser = async () => {
        console.log('UserProvider: Checking session storage...');
        const storedUser = sessionStorage.getItem('user');

        if (storedUser) {
            console.log('UserProvider: User found in session storage:', storedUser);
            const parsedUser = JSON.parse(storedUser);
            const userId = parsedUser.id;
            const userProfile = parsedUser.perfil; // Extrae perfil del parsedUser

            setProfileType(userProfile); // Establece el tipo de perfil

            const userData = await fetchUserDetails(userId, userProfile);
            if (userData) {
                console.log('UserProvider: Setting user details:', userData);
                setUser(userData);
            } else {
                setUser(null); // Si no se obtienen datos, establece user como null
            }
        } else {
            console.log('UserProvider: No user found in session storage.');
            setUser(null);
            setProfileType(''); // Configura profileType como vacío si no se encuentra el usuario
        }
        setLoading(false);
    };

    useEffect(() => {
        loadUser();
    }, []); // Se ejecuta solo una vez al montar el componente

    const clearUser = () => {
        console.log('UserProvider: Clearing user data');
        setUser(null);
        setProfileType(''); // Limpia el tipo de perfil
        sessionStorage.removeItem('user');
    };

    const reloadUser = () => {
        console.log('UserProvider: Reloading user data');
        loadUser(); // Recarga la información del usuario
    };

    return (
        <UserContext.Provider value={{ user, profileType, clearUser, loading, reloadUser }}>
            {children}
        </UserContext.Provider>
    );
};
