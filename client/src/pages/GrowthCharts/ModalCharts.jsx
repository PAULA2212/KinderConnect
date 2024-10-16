import { Modal, Form, Button } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';

export default function ModalChart({ type, kid, onAddData }) {
    const [showModal, setShowModal] = useState(false);
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false);
    const medida = type === 'peso' ? 'kg' : 'cm'
    const handleShow = () => { setShowModal(true); };
    const handleClose = () => { setShowModal(false); };

    // Se asegura que el 'event' es el primer argumento y maneja correctamente 'type' desde el prop.
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        // Validación simple para asegurar que el valor es numérico y no vacío.
        if (!value || isNaN(value)) {
            toast.error('Por favor, ingresa un valor válido.', { autoClose: 3000 });
            return;
        }

        // Se asegura que la URL de la API esté configurada correctamente en función del tipo.
        const apiURL = type === 'peso' ? '/addWeight' : '/addHeight';
        
        // Preparación de datos con el formato de fecha correcto.
        const data = {
            idKid: kid.id_niño,
            value: parseFloat(value).toFixed(2), // Asegura dos decimales y convierte a número
            fecha: new Date().toISOString() // Formato de fecha ISO
        };
        
        setLoading(true);
        try {
            await axiosInstance.post(apiURL, data);
            toast.success('El nuevo dato se ha añadido correctamente', { autoClose: 3000 });
            onAddData();
            setShowModal(false);
            setValue(''); // Resetea el valor después de añadirlo exitosamente
        } catch (error) {
            toast.error('No se ha podido añadir el nuevo dato. Inténtalo de nuevo.', { autoClose: 3000 });
            console.log('Error al guardar el dato:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button className='kinder-button' onClick={handleShow}>
                <FontAwesomeIcon icon={faPlus} /> Ingresar {type}
            </button>
            <Modal show={showModal} onHide={handleClose} className='kinder-modal'>
                <Modal.Header closeButton>
                    <Modal.Title>Añadir {type === 'peso' ? 'Peso' : 'Altura'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="valor">
                            <Form.Label>Valor</Form.Label>
                            <Form.Control
                                type="number"
                                step="0.01" // Permite hasta dos decimales
                                placeholder={`Escribe aquí la nueva medida de ${type} en ${medida}`}
                                name="valor"
                                value={value} // Asegúrate de que el valor sea una cadena vacía si es null
                                onChange={(e) => setValue(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Modal.Footer>
                            <Button
                                variant="primary"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? 'Guardando...' : 'Guardar'}
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}
