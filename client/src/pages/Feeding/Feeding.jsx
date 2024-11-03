import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils, faSearch } from "@fortawesome/free-solid-svg-icons";
import FeedingModal from "./FeedingModal";
import FeedingList from "./FeedingList";
import { useFeeding } from "./useFeeding";

/**
 * Componente `Feeding` para mostrar la sección de alimentación de un niño específico.
 * Permite a los usuarios, dependiendo de su perfil, agregar alimentos a la lista y buscar alimentos
 * en tiempo real mediante un campo de búsqueda.
 *
 * @returns {JSX.Element} - Interfaz de usuario para la alimentación de un niño.
 */
export default function Feeding () {
    // Accede a datos y funciones del hook `useFeeding` para la gestión de alimentos
    const {
        kid,
        profileType,
        handleAddFood,
        filteredFoods,
        setSearchTerm,
        searchTerm
    } = useFeeding();

    // Muestra un mensaje de selección si no hay un niño seleccionado en el contexto
    if (kid === null) {
        return (
            <>
                <h1 className="kinder-title"><FontAwesomeIcon icon={faUtensils} />  Alimentación</h1>
                <div>
                    <p>Debes seleccionar un niño para poder acceder a sus datos.</p>
                </div>
            </>
        );
    }

    // Renderiza la interfaz principal cuando se ha seleccionado un niño
    return (
        <>
            {/* Título de la sección, que incluye el nombre del niño y un ícono */}
            <h1 className="kinder-title"><FontAwesomeIcon icon={faUtensils} />  Alimentación de {kid.nombre}</h1>

            {/* Condicional para mostrar el modal de agregar alimentos si el usuario es "progenitor" */}
            {profileType === 'progenitor' && (
                <FeedingModal kid={kid} onAddFood={handleAddFood} />
            )}

            {/* Campo de búsqueda de alimentos, con ícono y estilos personalizados */}
            <div style={{ position: 'relative', marginBottom: '20px', marginTop: '20px'}}>
                <input
                    type="text"
                    placeholder="Buscar alimentos..."
                    value={searchTerm}
                    onChange={(e) => { setSearchTerm(e.target.value); }}
                    className="form-input"
                    style={{
                        padding: '8px 40px 8px 30px', // Espacio para el ícono de búsqueda
                        width: '100%',
                    }}
                />
                <FontAwesomeIcon 
                    icon={faSearch} 
                    style={{ 
                        position: 'absolute', 
                        left: '10px', 
                        top: '50%', 
                        transform: 'translateY(-50%)', 
                        color: '#888' 
                    }} 
                />
            </div>

            {/* Componente `FeedingList` que muestra la lista de alimentos filtrados */}
            <FeedingList foods={filteredFoods} />
        </>
    );
}
