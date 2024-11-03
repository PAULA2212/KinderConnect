/* Importación de Contextos y Componentes necesarios para el Diario */
import { KidContext } from "../../Context/KidContext";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import ParentsDiaryForm from "./ParentsDiaryForm";
import TeachersDiaryForm from "./TeachersDiaryForm";
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Diary.css';
import TeachersDiaryData from "./TeachersDiaryData";
import ParentsDiaryData from "./ParentsDiaryData";

/**
 * Componente principal `Diary`
 * Este componente maneja la visualización y edición del diario de comunicación,
 * permitiendo a los usuarios progenitores o educadores ver y editar datos específicos de su rol.
 * Verifica si se ha seleccionado un niño y ajusta el contenido de acuerdo con el tipo de perfil.
 */
export default function Diary() {
    // Obtiene el tipo de perfil de usuario del contexto de usuario
    const { profileType } = useContext(UserContext);

    // Obtiene el niño seleccionado del contexto de niño
    const { kid } = useContext(KidContext);
    console.log(kid); // Debugging: Muestra el objeto `kid` actual en la consola

    return (
        <>
            {/* Verifica si hay un niño seleccionado. Si no, muestra un mensaje informativo */}
            {kid === null ? (
                <>
                    <h1 className="kinder-title"><FontAwesomeIcon icon={faBook} /> Diario de comunicación</h1>
                    <div>
                        <p>Debes seleccionar un niño para poder acceder a sus datos.</p>
                    </div>
                </>
            ) : (
                <>
                    {/* Muestra el nombre del niño en el título si se seleccionó un niño */}
                    <h1 className="kinder-title"><FontAwesomeIcon icon={faBook} /> Diario de comunicación de {kid.nombre}</h1>

                    {/* Renderiza el contenido para progenitores si el perfil de usuario es "progenitor" */}
                    {profileType === 'progenitor' && (
                        <>
                            <ParentsDiaryForm kid={kid}/>
                            <ParentsDiaryData kid={kid}/>
                        </>
                    )}

                    {/* Renderiza el contenido para educadores si el perfil de usuario es "educador" */}
                    {profileType === 'educador' && (
                        <>
                            <TeachersDiaryForm kid={kid}/>
                            <TeachersDiaryData kid={kid}/>
                        </>
                    )}
                </>
            )}
        </>
    );
}
