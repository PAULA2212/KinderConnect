import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Modal, Form, Button } from 'react-bootstrap'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import {toast, ToastContainer} from 'react-toastify'
import { addMedicalCondition } from '../../services/MedicalConditions/addConditionService'


export default function MedicalModal({ kid, onAddCondition }) {
    const [showModal, setShowModal] = useState(false)
    const [title, setTitle] = useState(null)
    const [details, setDetails] = useState(null)
    const [loading, setLoading] = useState(false)



    const openModal = () => { setShowModal(true)}
    const closeModal = () => { setShowModal(false)}

    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = {
            kidId: kid.id_niño,
            title: title,
            details: details
        }
        setLoading(true);
        try{
            await addMedicalCondition(data);
            toast.success('Se ha guardado la nueva condicion médica', {autoClose: 3000})
            onAddCondition()
            closeModal()
        }catch (error){
            console.log(error)
            toast.error('No se ha podido guardar la nueva condicion médica', {autoClose: 3000})
        }finally{
            setLoading(false)
        }
    }

    return (
        <>
            <button className='kinder-button' onClick={openModal}>
                <FontAwesomeIcon icon={faPlus} /> Añadir
            </button>
            <Modal show={showModal} onHide={closeModal} className='kinder-modal'>
                <Modal.Header closeButton>
                    <Modal.Title>Añade una condicion médica</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId='title'>
                            <Form.Label>Condicion médica</Form.Label>
                            <Form.Control
                                type='text'
                                name='title'
                                required
                                onChange={(e) => setTitle(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId='details'>
                            <Form.Label>Detalles</Form.Label>
                            <Form.Control
                                as='textarea'
                                rows={6}  // Puedes ajustar el número de filas según el tamaño deseado
                                placeholder="Proporcione detalles adicionales sobre la enfermedad..."
                                name="details"
                                onChange={(e) => setDetails(e.target.value)}
                            />
                        </Form.Group>
                        <Modal.Footer>
                            <Button type='submit' disabled={loading} className='kinder-button'>
                                {loading ? 'Guardando' : 'Guardar'}
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
            <ToastContainer/>

        </>
    )

}