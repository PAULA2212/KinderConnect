import { useState } from "react";
import { sendMessageToAssistant } from "../../services/VirtualAssistant/virtualAsistantService";
import { faPaperPlane, faComments } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './VirtualAssistant.css'; // Asegúrate de importar el CSS

export default function VirtualAssistant() {
    const [messages, setMessages] = useState([
        { sender: 'assistant', text: '¡Hola! Soy un experto en desarrollo infantil, y estoy aquí para ayudarte. ¿En qué te puedo asistir hoy?' }
    ]);
    
    const [input, setInput] = useState('');

    const handleSend = async () => {
        if (!input) return;

        // Añade el mensaje del usuario a la lista
        setMessages((prevMessages) => [...prevMessages, { sender: 'user', text: input }]);

        try {
            const assistantReply = await sendMessageToAssistant(input);
            // Añade la respuesta del asistente
            setMessages((prevMessages) => [...prevMessages, { sender: 'assistant', text: assistantReply }]);
        } catch (error) {
            console.error('Error al enviar el mensaje:', error);
            // Si ocurre un error, muestra un mensaje en el chat
            setMessages((prevMessages) => [...prevMessages, { sender: 'assistant', text: 'Error al obtener respuesta.' }]);
        }

        setInput('');
    };

    return (
        <div className="container">
            <div className="card mt-5 shadow-lg">
                <div className="card-header text-white text-center" style={{ backgroundColor: '#035d6c' }}>
                    <h4 className="kinder-title"><FontAwesomeIcon icon={faComments} /> Asistente Virtual</h4>
                </div>
                <div className="card-body chat-box" style={{ height: '400px', overflowY: 'scroll' }}>
                    {messages.map((msg, index) => (
                        <div key={index} className={`d-flex mb-3 ${msg.sender === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
                            <div className={`message-bubble p-2 rounded ${msg.sender === 'user' ? 'bg-user' : 'bg-assistant'}`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="card-footer">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Escribe tu mensaje..."
                        />
                        <button className="btn" onClick={handleSend}>
                            <FontAwesomeIcon icon={faPaperPlane} style={{ color: '#035d6c', fontSize: '20px' }} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
