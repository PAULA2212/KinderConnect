import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table } from "react-bootstrap";
import axiosInstance from "../../utils/axiosInstance";

export default function GrowthTable({ values, setValues, type, kid }) {
    if (values.length === 0) {
        return <p className='m-2'>Aún no hay datos de {type} para {kid.nombre}.</p>;
    }
    const handleDelete = async (id) => {
        try {
            const apiURL = type === 'peso' ? `/deleteWeight/${id}` : `/deleteHeight/${id}`;
            await axiosInstance.delete(apiURL);
            // Filtra el registro eliminado del estado local
            setValues(prevValues => prevValues.filter(item => item.id_registro !== id));
        } catch (error) {
            console.error('Error al eliminar el dato:', error);
            // Aquí puedes añadir un mensaje de error o notificación
        }
    };
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>{type === 'peso' ? 'Peso' : 'Altura'}</th>
                    <th>Fecha</th>
                    <th>Eliminar</th>
                </tr>
            </thead>
            <tbody>
                {values.map((value) => (
                    <tr key={value.id_registro}>
                        <td>{value.valor}</td>
                        <td>{new Date(value.fecha).toLocaleDateString()}</td> {/* Formateo de la fecha */}
                        <td style={{ textAlign: 'center' }}>
                            <FontAwesomeIcon
                                icon={faTrash}
                                onClick={() => handleDelete(value.id_registro)} /></td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}