import { useState, useEffect } from 'react';
import { getKidsForParents } from '../../services/KidProfileService';

/**
 * Hook personalizado para gestionar los perfiles de niños asociados a un usuario progenitor.
 *
 * @param {Object} user - Objeto de usuario actual, debe contener `id_progenitor`.
 * @returns {Object} - Contiene los perfiles de niños (`niños`) y una función para actualizar (`fetchNiños`).
 */
export function useKidProfileParents(user) {
    const [niños, setNiños] = useState([]);

    /**
     * Obtiene los datos de los niños asociados al progenitor actual desde el servicio.
     * 
     * @returns {Promise<void>} - Actualiza el estado `niños` con los perfiles formateados.
     */
    const fetchNiños = async () => {
        try {
            const response = await getKidsForParents(user.id_progenitor);
            console.log("la respuesta", response)
            const formattedNiños = response.kids.map(niño => ({
                ...niño,
                fecha_nac: niño.fecha_nac.split('T')[0]
            }));
            setNiños(formattedNiños);
            console.log("Niños obtenidos y formateados:", formattedNiños); // Verifica que los datos estén asignados correctamente
        } catch (error) {
            console.error('Error al obtener los niños:', error);
        }
    };
    

    // Ejecuta fetchNiños al montar si el usuario está definido y contiene `id_progenitor`
    useEffect(() => {
        console.log("User:", user); // Agregar esta línea para verificar
        if (user && user.id_progenitor) {
            fetchNiños();
        }
    }, [user]);

    return { niños, fetchNiños };
}
