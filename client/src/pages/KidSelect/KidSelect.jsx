import { useState, useEffect, useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import { UserContext } from '../../Context/UserContext';
import axiosInstance from '../../utils/axiosInstance';
import './KidSelect.css';
import { faChildren } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { KidContext } from '../../Context/KidContext';

export default function KidSelect() {
    const { user, profileType } = useContext(UserContext);
    const { reloadKid } = useContext(KidContext);
    const [kids, setKids] = useState([]);
    const [selectedKid, setSelectedKid] = useState('');
    const [isKidSaved, setIsKidSaved] = useState(false);
    const [showMessage, setShowMessage] = useState(false); // Nuevo estado para manejar la visibilidad del mensaje

    useEffect(() => {
        if (user && profileType) {
            const idUser = profileType === 'progenitor' ? user.id_progenitor : user.id_educador;

            const fetchKids = async () => {
                const apiRoute = profileType === 'progenitor' ? '/ninos_padres/' : '/ninos_educadores/';
                try {
                    const response = await axiosInstance.get(`${apiRoute}${idUser}`);
                    setKids(response.data);
                } catch (error) {
                    console.error('Error al obtener los niños:', error);
                }
            };

            fetchKids();
        }
    }, [user, profileType]);

    const handleKidSelect = (e) => {
        setSelectedKid(e.target.value);
        setIsKidSaved(false);
        setShowMessage(false); // Resetear la visibilidad del mensaje al seleccionar un nuevo niño
    };

    const handleSaveKid = () => {
        if (selectedKid && user && profileType) {
            const idUser = profileType === 'progenitor' ? user.id_progenitor : user.id_educador;
            sessionStorage.setItem(`idKid_${idUser}`, Number(selectedKid));
            console.log(`Id del niño seleccionado (${selectedKid}) guardado en sessionStorage`);
            setIsKidSaved(true);
            reloadKid();
            setShowMessage(true); // Mostrar el mensaje después de guardar
        }
    };

    // Obtener el id del niño guardado como número
    const idUser = profileType === 'progenitor' ? user?.id_progenitor : user?.id_educador;
    const savedIdKid = idUser ? Number(sessionStorage.getItem(`idKid_${idUser}`)) : null;

    // Obtener los datos del niño seleccionado
    const selectedKidData = kids.find(kid => kid.id_niño === savedIdKid);

    if (!user || !profileType) {
        return <p>Cargando...</p>;
    }

    return (
        <>
            <h3 className='kinder-title'><FontAwesomeIcon icon={faChildren} /> Seleccionar un niño</h3>
            {kids.length === 0 ? (
                <p>Aún no tienes niños vinculados a tu cuenta. <Link to="/layout/perfilniños">Vincular niño</Link></p>
            ) : (
                <Form className='select-form'>
                    <Form.Group>
                        <Form.Label>Selecciona un niño para la visualización de sus datos en la App:</Form.Label>
                        <Form.Control
                            as="select"
                            name="elegir_niño"
                            value={selectedKid}
                            onChange={handleKidSelect}
                            className="form-input"
                        >
                            <option value="">Seleccionar niño</option>
                            {kids.map((kid) => (
                                <option key={kid.id_niño} value={kid.id_niño}>
                                    {`${kid.nombre} ${kid.apellido_1} ${kid.apellido_2}`}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <div></div>       
                    <Button
                        onClick={handleSaveKid}
                        className="submit-button mt-3"
                    >
                      Guardar selección
                    </Button>
                </Form>
            )}

            {/* Mostrar mensaje solo si el niño ha sido guardado y el mensaje está activo */}
            <div></div>
            {isKidSaved && selectedKidData && showMessage && (
                <p className='selected-kid-message'>Vas a visualizar los datos del niño:<strong>{`  ${selectedKidData.nombre} ${selectedKidData.apellido_1} ${selectedKidData.apellido_2}`}</strong></p>
            )}
        </>
    );
}
