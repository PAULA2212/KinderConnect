// TablesDocForParents.jsx

// Importamos los componentes necesarios de Bootstrap para tabs, tablas, botones y FontAwesome para los iconos.
// También usamos un hook personalizado `useTablesDocForParents` para gestionar la lógica relacionada con las acciones sobre los documentos.
import { Tabs, Tab, Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faFile, faTrash } from "@fortawesome/free-solid-svg-icons";
import useTablesDocForParents from "./useTablesDocForParents"; // Hook personalizado para manejar acciones

// Componente que muestra los documentos relacionados con los educadores y los del niño en un formato tabulado.
// Recibe las propiedades `kid`, `kidDocs`, `teachersDocs`, y `onAddorDelDocs` para manejar la interacción con los documentos.
export default function TablesDocForParents({ kid, kidDocs, teachersDocs, onAddorDelDocs }) {
    
    // Usamos el hook `useTablesDocForParents` para obtener las funciones `handleDownload` (descarga de documentos)
    // y `handleDelete` (borrar documentos). Estas funciones se ejecutarán cuando los usuarios interactúen con la tabla.
    const { handleDownload, handleDelete } = useTablesDocForParents(onAddorDelDocs); // Hook personalizado
    // Si el usuario es un progenitor y no tiene un niño seleccionado, mostramos un mensaje
    // que indica que debe seleccionar un niño para ver los documentos.
    if (kid === null ) {
        return (
            <>
                <h1 className="kinder-title"><FontAwesomeIcon icon={faFile} />  Documentos administrativos</h1>
                <div>
                    <p>Debes seleccionar un niño para poder acceder a sus datos.</p>
                </div>
            </>
        );
    }
    return (
        <>
            {/* Título de la página con un icono de archivo */}
            <h1 className="kinder-title"><FontAwesomeIcon icon={faFile} />  Documentos administrativos</h1>
            {/* Uso de tabs para separar los documentos de educadores y del niño */}
            <Tabs defaultActiveKey="1" className='m-3'>
                
                {/* Primer tab: Documentos de los educadores */}
                <Tab eventKey="1" title="Documentos de los educadores">
                    {/* Tabla que lista los documentos de los educadores */}
                    <Table striped bordered hover>
                        {/* Si hay documentos de educadores, los mostramos en la tabla */}
                        {teachersDocs && teachersDocs.length > 0 ? (
                            <>
                                <thead>
                                    <tr>
                                        <th>Nombre archivo</th>
                                        <th>Fecha</th>
                                        <th>Descargar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {teachersDocs.map((doc) => (
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

                {/* Segundo tab: Documentos del niño seleccionado */}
                <Tab eventKey="2" title={`Documentos de ${kid.nombre}`}>
                    {/* Tabla que lista los documentos del niño */}
                    <Table striped bordered hover>
                        {/* Si hay documentos del niño, los mostramos en la tabla */}
                        {kidDocs && kidDocs.length > 0 ? (
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
                                                        style={{ cursor: 'pointer', color: 'green' }} />
                                                </Button>
                                            </td>
                                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                                {/* Icono de papelera para borrar el documento */}
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
