import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../Context/UserContext';
import { KidContext } from '../../Context/KidContext';
import { getKidsForParents, getKidsForTeachers } from '../../services/KidProfileService';

/**
 * Hook personalizado para gestionar la selección de un niño y su carga de datos.
 * Este hook maneja el estado de carga, obtiene la lista de niños del usuario
 * (según su tipo de perfil), y permite la selección de un niño, guardando la
 * selección en el almacenamiento de sesión.
 *
 * @returns {object} { kids, selectedKid, loading, handleKidSelect, handleSaveKid }
 */
export default function useKidSelect() {
    const { user, profileType } = useContext(UserContext);
    const { reloadKid } = useContext(KidContext);

    const [kids, setKids] = useState([]);
    const [selectedKid, setSelectedKid] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); // Para manejar errores de carga

    useEffect(() => {
        // Solo ejecuta la carga de datos si el usuario y el tipo de perfil están definidos
        if (user && profileType) {
            const idUser = profileType === 'progenitor' ? user.id_progenitor : user.id_educador;

            const fetchKids = async () => {
                try {
                    setLoading(true);
                    const response = profileType === "progenitor"
                        ? await getKidsForParents(idUser)
                        : await getKidsForTeachers(idUser);

                    // Verifica que response.kids sea un array y que tenga elementos
                    if (Array.isArray(response.kids) && response.kids.length > 0) {
                        setKids(response.kids);
                    } else {
                        setKids([]); // Limpia la lista de niños si no hay resultados
                        console.warn('No se encontraron niños en la respuesta:', response);
                    }
                } catch (error) {
                    console.error('Error al obtener los niños:', error);
                    setError('Error al cargar los niños.'); // Establece un mensaje de error
                } finally {
                    setLoading(false);
                }
            };

            fetchKids();
        }
    }, [user, profileType, reloadKid]); // Agregado reloadKid si es necesario

    // Maneja la selección de un niño en el formulario
    const handleKidSelect = (e) => {
        setSelectedKid(e.target.value);
    };

    // Guarda el Code del niño seleccionado en el sessionStorage y recarga el contexto
    const handleSaveKid = () => {
        if (selectedKid && user && profileType) {
            const idUser = profileType === 'progenitor' ? user.id_progenitor : user.id_educador;
            sessionStorage.setItem(`idKid_${idUser}`, Number(selectedKid));
            reloadKid();
        }
    };

    return { kids, selectedKid, loading, error, handleKidSelect, handleSaveKid };
}
