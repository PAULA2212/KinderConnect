/* import { UserContext } from "../../utils/Context/UserContext" */
import { KidContext } from "../../Context/KidContext"
import { useContext } from "react"
import { UserContext } from "../../Context/UserContext"
import ParentsDiaryForm from "./ParentsDiaryForm"
import TeachersDiaryForm from "./TeachersDiaryFrom"
import { Link } from "react-router-dom"
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Diary.css'
import TeachersDiaryData from "./TeachersDiaryData"
import ParentsDiaryData from "./ParentsDiaryData"


export default function Diary() {
    const { profileType } = useContext(UserContext)
    const { kid } = useContext(KidContext)
    console.log(kid)
    return (
        <>
    
            {/* Verificar si 'kid' es null */}
            {kid === null ? (
                <>
                <h1 className="kinder-title"><FontAwesomeIcon icon={faBook} />Diario de comunicación</h1>
                <div>
                    <p>Debes seleccionar un niño para poder acceder a sus datos.</p>
                    <Link to="/layout/elegirniño">Seleccionar niño</Link>
                </div>
                </>
            ) : (
                <>
                    <h1 className="kinder-title"><FontAwesomeIcon icon={faBook} />Diario de comunicación de {kid.nombre}</h1>
                    {profileType === 'progenitor' &&
                        (
                            <>
                                <ParentsDiaryForm />
                                <ParentsDiaryData/> 
                            </>
                        )}
                    {profileType === 'educador' && 
                    (
                    <>
                    <TeachersDiaryForm />
                    <TeachersDiaryData />
                    </>
                    )}
                </>
            )}
        </>

    )
}