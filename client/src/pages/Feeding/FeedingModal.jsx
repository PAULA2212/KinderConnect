import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import {toast, ToastContainer} from 'react-toastify'
import {addFood} from '../../services/Feeding/addFoodService'

export default function FeedingModal ({kid, onAddFood}){

    const [food, setFood] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const openModal = () => { setShowModal(true) };
    const closeModal = () => { setShowModal(false) };
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            idKid: kid.id_niño,
            food: food
        }
        setLoading(true);
        try{
            await addFood(data);
             onAddFood();
            toast.success('El nuevo alimento se ha agredado a la lista.', {autoClose: 3000});
            setShowModal(false);
        }catch (error){
            console.log(error)
            toast.error('Ha habido un error al intentar agregar el alimento', {autoClose: 3000})
        }finally{
            setLoading(false)
        }
        }

    return (
        <>
        <button className='kinder-button' onClick={openModal}>
            <FontAwesomeIcon icon={faPlus}/> Añadir 
        </button>
        <Modal show={showModal} onHide={closeModal} className='kinder-modal'>
            <Modal.Header closeButton>
                <Modal.Title>Añadir un nuevo alimento</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId='food'>
                        <Form.Label>
                            Alimento
                        </Form.Label>
                        <Form.Control
                            type='text'
                            required
                            placeholder='zanahoria, lechuga, pavo, tomate..'
                            name='food'
                            onChange={(e)=>{setFood(e.target.value)}}
                        ></Form.Control>
                    </Form.Group>
                    <Modal.Footer>
                        <Button type='submit' disabled={loading}>
                            {loading ? 'Guardando..' : 'Guardar'}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
        <ToastContainer/>
        </>
    )


}