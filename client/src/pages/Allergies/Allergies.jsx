import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";  // Importa el componente de iconos de FontAwesome
import { faPersonDotsFromLine } from "@fortawesome/free-solid-svg-icons";  // Importa el icono específico de FontAwesome
import { useContext } from "react";  // Importa el hook useContext de React
import { KidContext } from '../../Context/KidContext';  // Ruta correcta al contexto
import { UserContext } from "../../Context/UserContext";  // Importa el contexto del usuario
import AllergiesModal from "./AllergiesModal";  // Importa el modal para agregar alergias
import AllergiesTable from "./AllergiesTable";  // Importa el componente para mostrar las alergias en tablas
import useAllergies from "./useAllergies";  // Importa el custom hook para manejar alergias
import './allergies.css';  // Importa el archivo de estilos CSS para este componente

// Componente principal para mostrar y gestionar las alergias de un niño
export default function Allergies() {
    const { kid } = useContext(KidContext);  // Obtenemos el niño actual del contexto
    const { profileType } = useContext(UserContext);  // Obtenemos el tipo de perfil del usuario (progenitor, educador, etc.)

    // Usamos el hook customizado para obtener la información de las alergias
    const {
        allergies,  // Todas las alergias
        graveAllergies,  // Alergias graves
        moderateAllergies,  // Alergias moderadas
        mildAllergies,  // Alergias leves
        loading,  // Estado de carga
        error,  // Error si ocurre
        refreshAllergies,  // Función para refrescar la lista de alergias
    } = useAllergies(kid);  // Ejecutamos el hook

    // Si no hay un niño seleccionado, mostramos un mensaje de advertencia
    if (kid === null) {
        return (
            <>
                <h1 className="kinder-title"><FontAwesomeIcon icon={faPersonDotsFromLine} /> Alergias</h1>
                <div>
                    <p>Debes seleccionar un niño para poder acceder a sus datos.</p>  {/* Mensaje de advertencia */}
                </div>
            </>
        );
    }

    // Si los datos están cargando, mostramos un indicador de carga
    if (loading) {
        return <p>Cargando alergias...</p>;
    }

    // Si ocurre un error, mostramos el mensaje de error
    if (error) {
        return <p>{error}</p>;
    }

    // Si hay un niño seleccionado y los datos están cargados, mostramos la información
    return (
        <>
            {/* Título con el nombre del niño */}
            <h1 className="kinder-title"><FontAwesomeIcon icon={faPersonDotsFromLine} /> Alergias de {kid.nombre}</h1>

            {/* Si el perfil es de tipo progenitor, mostramos el modal para agregar alergias */}
            {profileType === 'progenitor' && (
                <AllergiesModal kid={kid} onAddAllergy={refreshAllergies} />  
            )}

            {/* Contenedor para las tablas que muestran las alergias divididas por severidad */}
            <div className="tables-container">
                <AllergiesTable type='grave' values={graveAllergies} />  {/* Tabla para las alergias graves */}
                <AllergiesTable type='moderada' values={moderateAllergies} />  {/* Tabla para las alergias moderadas */}
                <AllergiesTable type='leve' values={mildAllergies} />  {/* Tabla para las alergias leves */}
            </div>
        </>
    );
}
