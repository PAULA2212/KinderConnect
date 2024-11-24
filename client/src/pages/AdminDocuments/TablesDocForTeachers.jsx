// TablesDocForTeachers.jsx

// Importamos los componentes necesarios de Bootstrap como Tabs, Tab, Table y Button, 
// junto con FontAwesome para los iconos de descarga y eliminación de archivos.
import { Tabs, Tab, Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faFile, faTrash } from "@fortawesome/free-solid-svg-icons";
import useTablesDocForTeachers from "./useTablesDocForTeachers"; // Importamos el hook personalizado para gestionar la lógica de documentos

// Componente que muestra los documentos de los niños y del educador en formato tabulado.
// Recibe las propiedades `kidDocs`, `teacherDocs` y `onAddorDelDocs` para manejar la interacción con los documentos.
export default function TablesDocForTeachers({ kidDocs, teacherDocs, onAddorDelDocs }) {
    
    // Usamos el hook `useTablesDocForTeachers` para obtener las funciones `handleDownload` (descargar documentos)
    // y `handleDelete` (borrar documentos), que se ejecutarán cuando el usuario interactúe con la tabla.
    const { handleDownload, handleDelete } = useTablesDocForTeachers(onAddorDelDocs);

    return (
        <>
            {/* Título de la página con un icono de archivo */}
            <h1 className="kinder-title"><FontAwesomeIcon icon={faFile} />  Documentos administrativos</h1>
            {/* Uso de tabs para separar los documentos de los niños y los documentos del educador */}
            <Tabs defaultActiveKey="1" className='m-3'>
                
                {/* Primer tab: Documentos de los niños */}
                <Tab eventKey="1" title="Documentos de los niños">
                    {/* Tabla que lista los documentos de los niños */}
                    <Table striped bordered hover>
                        {/* Si hay documentos de los niños, los mostramos en la tabla */}
                        {kidDocs && kidDocs.length > 0 ? (
                            <>
                                <thead>
                                    <tr>
                                        <th>Nombre archivo</th>
                                        <th>Fecha</th>
                                        <th>Descargar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {kidDocs.map((doc) => (
                                        <tr key={doc.id_doc}>
                                            <td>{doc.nombre}</td>
                                            {/* Formateamos la fecha de subida */}
                                            <td>{new Date(doc.fecha_subida).toLocaleDateString()}</td>
                                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                                {/* Botón para descargar el documento */}
                                                <Button onClick={() => handleDownload(doc.URL)} variant="link">
                                                    <FontAwesomeIcon
                                                        icon={faDownload}
                                                        style={{ cursor: 'pointer', color: 'green' }}
                                                    />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </>
                        ) : (
                            // Si no hay documentos, mostramos un mensaje indicándolo
                            <tbody>
                                <tr>
                                    <td colSpan="3" style={{ textAlign: 'center' }}>
                                        No hay documentos disponibles.
                                    </td>
                                </tr>
                            </tbody>
                        )}
                    </Table>
                </Tab>

                {/* Segundo tab: Documentos del educador */}
                <Tab eventKey="2" title={'Tus documentos'}>
                    {/* Tabla que lista los documentos subidos por el educador */}
                    <Table striped bordered hover>
                        {/* Si hay documentos del educador, los mostramos en la tabla */}
                        {teacherDocs && teacherDocs.length > 0 ? (
                            <>
                                <thead>
                                    <tr>
                                        <th>Nombre archivo</th>
                                        <th>Fecha</th>
                                        <th>Descargar</th>
                                        <th>Borrar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {teacherDocs.map((doc) => (
                                        <tr key={doc.id_doc}>
                                            <td>{doc.nombre}</td>
                                            {/* Formateamos la fecha de subida */}
                                            <td>{new Date(doc.fecha_subida).toLocaleDateString()}</td>
                                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                                {/* Botón para descargar el documento */}
                                                <Button onClick={() => handleDownload(doc.URL)} variant="link">
                                                    <FontAwesomeIcon
                                                        icon={faDownload}
                                                        style={{ cursor: 'pointer', color: 'green' }} />
                                                </Button>
                                            </td>
                                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                                {/* Icono de papelera para eliminar el documento */}
                                                <FontAwesomeIcon
                                                    icon={faTrash}
                                                    style={{ cursor: 'pointer', color: 'red' }}
                                                    onClick={() => handleDelete(doc.id_doc)} // Llama a la función de borrado
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </>
                        ) : (
                            // Si no hay documentos, mostramos un mensaje indicándolo
                            <tbody>
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>
                                        No hay documentos disponibles.
                                    </td>
                                </tr>
                            </tbody>
                        )}
                    </Table>
                </Tab>
            </Tabs>
        </>
    );
}
