import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Modal, Form, Button } from 'react-bootstrap'
import { useState } from 'react'
import { addAllergen } from '../../services/Allergies/addAllergenService'
import {toast, ToastContainer} from 'react-toastify'
export default function AllergiesModal({kid, onAddAllergy}) {
    const [showModal, setShowModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [allergen, setAllergen] = useState(null)
    const [grade, setGrade] = useState(null)

    const handleShow = () => { setShowModal(true) }
    const handleClose = () => { setShowModal(false) }

    const handleSubmit = async(event) =>{
        event.preventDefault();
        const data = {
            allergen: allergen,
            grade: grade,
            idKid: kid.id_niño
        }
        setLoading(true)
        try{
            await addAllergen(data)
            toast.success('La nueva alergia se agrego correctamente', {autoClose: 3000})
            onAddAllergy()
            setShowModal(false)
        }catch (error){
            console.log(error)
            toast.error('Ha habido un error al intentar agregar la alergia', {autoClose: 3000})
        }finally{
            setLoading(false)
        }
    }


    return (
        <>
            <button className='kinder-button' onClick={handleShow}>
                <FontAwesomeIcon icon={faPlus} /> Añadir alergia
            </button>
            <Modal show={showModal} onHide={handleClose} className='kinder-modal'>
                <Modal.Header closeButton>
                    <Modal.Title>Añadir una alergia</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit} method='post'>
                        <Form.Group controlId='allergen'>
                            <Form.Label>Alergeno</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Soja, pescado, cacahuetes.."
                                name="allergen"
                                onChange={(e)=>{setAllergen(e.target.value)}}
                                required />
                        </Form.Group>
                        <Form.Group controlId='grade'>
                            <Form.Label>Grado</Form.Label>
                            <Form.Control
                                as='select'
                                name="grade"
                                onChange={(e) =>{setGrade(e.target.value)}}
                                required>
                                    <option value=''>Seleccione...</option>
                                    <option value='leve'>Leve</option>
                                    <option value='moderado'>Moderado</option>
                                    <option value='grave'>Grave</option>
                            </Form.Control>
                        </Form.Group>
                        <Modal.Footer>
                            <Button  type='submit' disabled={loading}>
                                {loading ? 'Enviando' : 'Enviar'}
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
            <ToastContainer/>
        </>

    )
}