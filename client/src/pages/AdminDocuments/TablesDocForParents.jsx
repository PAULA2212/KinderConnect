import { Tabs, Tab, Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteDocument } from '../../services/AdminDocuments/deleteDocumentService';
import { toast } from 'react-toastify';
export default function TablesDocForParents({ kid, kidDocs, teachersDocs, onAddorDelDocs }) {
    console.log(kid)
    const handleDownload = (url) => {
        // Log para verificar la URL del documento
        console.log('URL del documento:', url);

        // Abre la URL en una nueva pestaña
        window.open(url, '_blank');
    };

    const handleDelete = async(id) => {
        // Lógica para borrar el documento
        console.log(`Borrar documento con ID: ${id}`);
        try{
            await deleteDocument(id, "kid");
            toast.success("Documento borrado correctamente.", { autoClose: 3000 });
            onAddorDelDocs();
        }catch (error) {
            toast.error("Hubo un error al borrar el documento.", { autoClose: 3000 });
        }
    };

    return (
        <>
        <Tabs defaultActiveKey="1" className='m-3'>
            <Tab eventKey="1" title="Documentos de los educadores">
                <Table striped bordered hover>
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
                                            <td>{new Date(doc.fecha_subida).toLocaleDateString()}</td>
                                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
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
            <Tab eventKey="2" title={`Documentos de ${kid.nombre}`}>
                <Table striped bordered hover>
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
                                        <td>{new Date(doc.fecha_subida).toLocaleDateString()}</td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            <Button onClick={() => handleDownload(doc.URL)} variant="link">
                                                <FontAwesomeIcon
                                                    icon={faDownload}
                                                    style={{ cursor: 'pointer', color: 'green' }} />
                                            </Button>
                                        </td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            <FontAwesomeIcon
                                                icon={faTrash}
                                                style={{ cursor: 'pointer', color: 'red' }}
                                                onClick={() => handleDelete(doc.id_doc)}
                                            />
                                        </td>
                                    </tr>
                                    ))}
                            </tbody>
                        </>
                        
                    ) : (
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
        </Tabs>
        </>
    );
}
