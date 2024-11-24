import { faTrash } from "@fortawesome/free-solid-svg-icons"; // Icono de la papelera para eliminar datos
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Componente para renderizar íconos de Font Awesome
import { Table } from "react-bootstrap"; // Componente de tabla de Bootstrap
import { deleteData } from "../../services/GrowthChartsService"; // Servicio para manejar las solicitudes de eliminación de datos
import { toast } from 'react-toastify';

/**
 * Componente GrowthTable
 *
 * Este componente renderiza una tabla que muestra los datos de crecimiento
 * (peso o altura) de un niño específico. Permite eliminar registros
 * mediante un icono de papelera.
 *
 * @param {Object} props - Props del componente.
 * @param {Array} props.values - Lista de valores (peso o altura) a mostrar en la tabla.
 * @param {Function} props.setValues - Función para actualizar los valores en el estado.
 * @param {String} props.type - Tipo de dato ('peso' o 'altura').
 * @param {Object} props.kid - Objeto que contiene información del niño.
 * @returns {JSX.Element} - Renderiza la tabla de datos de crecimiento o un mensaje si no hay datos.
 */
export default function GrowthTable({ values, setValues, type, kid, profileType }) {
    // Verifica si no hay datos disponibles y muestra un mensaje correspondiente
    if (values.length === 0) {
        return <p className='m-2'>Aún no hay datos de {type} para {kid.nombre}.</p>;
    }

    /**
     * Maneja la eliminación de un registro de peso o altura.
     * 
     * @param {Number} id - ID del registro a eliminar.
     */
    const handleDelete = async (id) => {
        try {
            // Define la URL de la API en función del tipo de dato
            const apiURL = type === 'peso' ? `/deleteWeight/${id}` : `/deleteHeight/${id}`;
            // Realiza la solicitud para eliminar el dato
            await deleteData(apiURL);
            // Filtra el registro eliminado del estado local
            setValues(prevValues => prevValues.filter(item => item.id_registro !== id));
            toast.success("La medida ha sido eliminada correctamente")
        } catch (error) {
            console.error('Error al eliminar el dato:', error);
            //mensaje de error
            toast.error("No se pudo eliminar la medida en este momento")
        }
    };

    // Renderiza la tabla con los datos de crecimiento
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>{type === 'peso' ? 'Peso' : 'Altura'}</th> {/* Encabezado de la columna para peso o altura */}
                    <th>Fecha</th> {/* Encabezado de la columna para la fecha */}
                    {profileType === "progenitor" && (
                        <th>Eliminar</th>
                    )} {/* Encabezado de la columna para la acción de eliminar */}
                </tr>
            </thead>
            <tbody>
                {values.map((value) => (
                    <tr key={value.id_registro}>
                        <td>{value.valor}</td> {/* Valor de peso o altura */}
                        <td>{new Date(value.fecha).toLocaleDateString()}</td> {/* Formateo de la fecha a un formato legible */}
                        {profileType === "progenitor" &&
                            (
                                <td style={{ textAlign: 'center' }}>
                            <FontAwesomeIcon
                                icon={faTrash} // Icono de papelera para eliminar
                                onClick={() => handleDelete(value.id_registro)} // Llama a la función de eliminación al hacer clic
                            />
                        </td>
                            )
                        }
                        
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}
