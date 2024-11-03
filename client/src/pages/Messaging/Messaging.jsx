// Messaging.js
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalMessaging from "./ModalMessaging";
import { useContext } from "react";
import { UserContext } from '../../Context/UserContext';
import { useMessaging } from "./useMessaging"; // Importar el custom hook
import Box from "./Box";
import { Tab, Tabs } from "react-bootstrap";

/**
 * Messaging:
 * Componente principal de mensajería que muestra la bandeja de entrada y salida de mensajes,
 * y permite la creación de nuevos mensajes.
 *
 * @returns {JSX.Element} - Componente de mensajería.
 */
export default function Messaging() {
    const { user, profileType } = useContext(UserContext);
    const id = profileType === "educador" ? user?.id_educador : user?.id_progenitor;

    // Usar el custom hook para gestionar la lógica de mensajería
    const { inbox, outbox, handleAddMessage } = useMessaging(id);
    

    return (
        <>
            <h1 className="kinder-title">
                <FontAwesomeIcon icon={faEnvelope} /> Mensajería
            </h1>
            <ModalMessaging user={user} profileType={profileType} onAddMessage={handleAddMessage} />
            <Tabs defaultActiveKey="entrada" className='m-3'>
                <Tab eventKey="entrada" title="Bandeja de entrada">
                    <Box profileType={profileType} messages={inbox} user={user} type={"entrada"} />
                </Tab>
                <Tab eventKey="salida" title="Bandeja de salida">
                    <Box profileType={profileType} messages={outbox} user={user} type={"salida"} />
                </Tab>
            </Tabs>
        </>
    );
}
