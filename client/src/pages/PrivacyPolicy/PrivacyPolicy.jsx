import './PrivacyPolicy.css';
import { useNavigate } from 'react-router-dom';

export default function PrivacyPolicy() {
    const navigate = useNavigate(); // Hook para obtener la función de navegación

    return (
        <div className="privacy-policy-container">
            <h1 className="privacy-title">Política de Privacidad de KinderConnect</h1>
            
            <p>
                En KinderConnect, nos comprometemos a proteger la privacidad de nuestros usuarios. Esta política de privacidad describe cómo recopilamos, usamos y protegemos tu información personal.
            </p>

            <h2>1. Información que Recopilamos</h2>
            <p>
                Podemos recopilar la siguiente información:
            </p>
            <ul>
                <li><strong>Información personal:</strong> como nombre, dirección de correo electrónico y otros datos de contacto.</li>
                <li><strong>Datos sobre el uso de la aplicación:</strong> registros de actividades, estadísticas de uso y preferencias.</li>
                <li><strong>Información técnica:</strong> como la dirección IP, tipo de dispositivo y el sistema operativo utilizado.</li>
            </ul>

            <h2>2. Uso de la Información</h2>
            <p>
                Usamos la información que recopilamos para los siguientes fines:
            </p>
            <ul>
                <li>Proporcionar y mejorar nuestros servicios.</li>
                <li>Personalizar la experiencia del usuario.</li>
                <li>Gestionar las comunicaciones y notificaciones relacionadas con el uso de la plataforma.</li>
                <li>Cumplir con nuestras obligaciones legales.</li>
            </ul>

            <h2>3. Protección de tu Información</h2>
            <p>
                Implementamos medidas de seguridad técnicas y organizativas para proteger tu información contra accesos no autorizados, pérdidas, alteraciones o divulgación.
            </p>

            <h2>4. Compartir Información con Terceros</h2>
            <p>
                No vendemos, intercambiamos ni transferimos tu información personal a terceros, excepto cuando sea necesario para cumplir con la ley o proporcionar los servicios solicitados por el usuario.
            </p>

            <h2>5. Tus Derechos</h2>
            <p>
                Tienes derecho a acceder, corregir o eliminar tu información personal en cualquier momento. Si deseas ejercer estos derechos o tienes alguna duda sobre nuestra política de privacidad, puedes contactarnos a través de nuestro correo electrónico de soporte.
            </p>

            <h2>6. Cambios en la Política de Privacidad</h2>
            <p>
                Nos reservamos el derecho a actualizar esta política de privacidad en cualquier momento. Te notificaremos cualquier cambio importante a través de la plataforma o por correo electrónico.
            </p>

            <p>
                Si tienes alguna pregunta o inquietud sobre nuestra política de privacidad, no dudes en <a href="mailto:soporte@kinderconnect.com">contactarnos</a>.
            </p>

            {/* Botón para volver a la página anterior */}
            <button className="kinder-button" onClick={() => navigate(-1)}>
                Volver
            </button>
        </div>
    );
}
