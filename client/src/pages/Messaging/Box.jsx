import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table, Modal, Button } from "react-bootstrap"; // Importar componentes necesarios
import useBox from './useBox'; // Importar el hook personalizado
import './Box.css'; // Importar estilos personalizados

export default function Box({ messages, type, user, profileType }) {
    // Usar el hook useBox para manejar la lógica
    const {
        potentialSenders,
        dataLoading,
        selectedMessage,
        showModal,
        setShowModal,
        findSenderName,
        findRecipientName,
        handleUpdate,
    } = useBox(messages, type, user, profileType);

    return (
        <div className="box-container">
            <Table striped hover className="kinder-table">
                <thead>
                    <tr>
                        <th>Asunto</th>
                        <th>Fecha</th>
                        {type === "entrada" && <th>Remitente</th>}
                        {type === "salida" && <th>Receptor</th>}
                        <th style={{ textAlign: 'center' }}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {messages && messages.length > 0 ? (
                        messages.map((message) => (
                            <tr key={message.id_mensaje} className={type === "entrada" && !message.leido ? 'unread-message' : ''}>
                                <td>{message.asunto}</td>
                                <td>{new Date(message.fecha_hora).toLocaleDateString()}</td>
                                {type === "entrada" && (
                                    <td>{findSenderName(message.id_emisor)}</td>
                                )}
                                {type === "salida" && (
                                    <td>{findRecipientName(message.id_receptor)}</td>
                                )}
                                <td style={{ textAlign: 'center' }}>
                                    <FontAwesomeIcon
                                        className="icon-eye"
                                        icon={faEye}
                                        onClick={() => handleUpdate(message.id_mensaje)} />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" style={{ textAlign: 'center' }}>No hay mensajes disponibles</td>
                        </tr>
                    )}
                </tbody>

            </Table>

            {/* Modal para mostrar el contenido del mensaje */}
            <Modal show={showModal} onHide={() => setShowModal(false)} className="kinder-modal">
                <Modal.Header closeButton>
                    <Modal.Title>{selectedMessage?.asunto}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p><strong>Fecha:</strong> {new Date(selectedMessage?.fecha_hora).toLocaleString()}</p>
                    <p><strong>Contenido:</strong></p>
                    <p>{selectedMessage?.contenido}</p> {/* Mostrar el contenido del mensaje */}
                </Modal.Body>
                <Modal.Footer>
                    <Button className="kinder-button" variant="secondary" onClick={() => setShowModal(false)}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
