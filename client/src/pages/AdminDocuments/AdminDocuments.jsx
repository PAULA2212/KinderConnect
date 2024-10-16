import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { KidContext } from '../../Context/KidContext';
import { UserContext } from "../../Context/UserContext";
import { Link } from 'react-router-dom';
import ModalDocuments from "./ModalDocuments";
import TablesDocForTeachers from "./TablesDocForTeachers";
import TablesDocForParents from "./TablesDocForParents";
import { getDocumentById } from "../../services/AdminDocuments/getDocumentByIdService";
import { getDocumentByLink } from "../../services/AdminDocuments/getDocumentByLinkService";


export default function AdminDocuments() {
    const { kid } = useContext(KidContext);
    const { user, profileType } = useContext(UserContext);
    const [kidDocs, setKidDocs] = useState([]);
    const [teacherDocs, setTeacherDocs] = useState([]);
    const [teacherDocsByLink, setTeacherDocsByLink] = useState([]);
    const [kidDocsByLink, setKidDocsByLink] = useState([]);
    const [loading, setLoading] = useState(true);

    // Funciones para obtener documentos
    const fetchKidDocById = async () => {
        if (kid && kid.id_niño) {
            try {
                const data = await getDocumentById(kid.id_niño, "kid");
                setKidDocs(data);
            } catch (error) {
                console.error('Error al obtener documentos del niño:', error);
            }
        }
    };

    const fetchTeacherDocById = async () => {
        if (user && user.id_educador) {
            try {
                const data = await getDocumentById(user.id_educador, "educador");
                setTeacherDocs(data);
            } catch (error) {
                console.error('Error al obtener documentos del profesor:', error);
            }
        }
    };

    const fetchKidDocByTeacherLink = async () => {
        if (user && user.id_educador) {
            try {
                const data = await getDocumentByLink(user.id_educador, "educador");
                setKidDocsByLink(data);
            } catch (error) {
                console.error('Error al obtener documentos por link del profesor:', error);
            }
        }
    };

    const fetchTeacherDocByKidLink = async () => {
        if (kid && kid.id_niño) {
            try {
                const data = await getDocumentByLink(kid.id_niño, "kid");
                setTeacherDocsByLink(data);
            } catch (error) {
                console.error('Error al obtener documentos por link del niño:', error);
            }
        }
    };

    const fetchDataForEducator = async () => {
        await Promise.all([
            fetchTeacherDocById(),
            fetchKidDocByTeacherLink(),
        ]);
    };
    
    const fetchDataForParent = async () => {
        await Promise.all([
            fetchKidDocById(),
            fetchTeacherDocByKidLink(),
        ]);
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                if (profileType === 'educador') {
                    await fetchDataForEducator();
                } else if (profileType === 'progenitor' && kid) {
                    await fetchDataForParent();
                }
            } catch (error) {
                console.error("Error fetching documents:", error);
            } finally {
                setLoading(false);
            }
        };

        // Llama a fetchData solo cuando el usuario o el niño están disponibles.
        if ((profileType === 'educador' && user) || (profileType === 'progenitor' && kid)) {
            fetchData();
        }
    }, [kid, profileType, user]);

    const handleAddorDelDocs = async() => {
        if (profileType === 'educador') {
            await fetchDataForEducator();
        } else if (profileType === 'progenitor' && kid) {
            await fetchDataForParent();
        }
    };

    // Mostrar estado de carga
    if (loading) {
        return <p>Cargando documentos...</p>;
    }

    // Caso específico para progenitor sin niño seleccionado
    if (kid === null && profileType === "progenitor") {
        return (
            <>
                <h1 className="kinder-title"><FontAwesomeIcon icon={faFile} />  Documentos administrativos</h1>
                <div>
                    <p>Debes seleccionar un niño para poder acceder a sus datos.</p>
                    <Link to="/layout/elegirniño">Seleccionar niño</Link>
                </div>
            </>
        );
    }

    return (
        <>
            <h1 className="kinder-title"><FontAwesomeIcon icon={faFile} />  Documentos administrativos</h1>
            <ModalDocuments kid={kid} profileType={profileType} user={user} onAddDocument={handleAddorDelDocs} />
            {profileType === "educador" ? (
                <TablesDocForTeachers teacherDocs={teacherDocs} kidDocs={kidDocsByLink} onAddorDelDocs={handleAddorDelDocs}/>
            ) : (
                <TablesDocForParents kid={kid} kidDocs={kidDocs} teachersDocs={teacherDocsByLink} onAddorDelDocs={handleAddorDelDocs}/>
            )}
        </>
    );
}
