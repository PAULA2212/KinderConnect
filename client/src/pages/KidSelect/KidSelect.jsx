import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useKidSelect from './useKidSelect';
import './KidSelect.css';

/**
 * Componente KidSelect: permite al usuario seleccionar un niño para visualizar
 * su perfil en la aplicación. Usa el hook personalizado `useKidSelect` para gestionar
 * el estado de carga y la lógica de selección de niño.
 *
 * @returns {JSX.Element} Formulario de selección de niño o mensaje de "sin niños"
 */
export default function KidSelect() {
    const { kids, selectedKid, loading, handleKidSelect, handleSaveKid } = useKidSelect();

    // Muestra un mensaje de carga mientras se obtiene la lista de niños
    if (loading) {
        return <p>Cargando...</p>;
    }

    return (
        <>
            {kids.length === 0 ? (
                // Enlace para vincular un niño si la lista está vacía
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
                    <Button
                        onClick={handleSaveKid}
                        className="submit-button mt-3"
                    >
                        Guardar selección
                    </Button>
                </Form>
            )}
        </>
    );
}
