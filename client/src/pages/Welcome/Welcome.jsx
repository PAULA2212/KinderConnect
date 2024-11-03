import './Welcome.css'; // Importa el archivo CSS para aplicar estilos personalizados al componente
import LottieAnimation from '../../utils/lottieanimation'; // Importa el componente de animación Lottie

// Componente Welcome
// Este componente se encarga de mostrar una pantalla de bienvenida al usuario.
// Se utiliza principalmente para mejorar la experiencia visual de la aplicación
// mediante animaciones dinámicas que capturan la atención del usuario.
export default function Welcome() {
    return (
        <div className="welcome-container"> {/* Contenedor principal para la pantalla de bienvenida */}
            {/* Renderiza múltiples animaciones de Lottie para un efecto visual atractivo */}
            <LottieAnimation /> {/* Primera instancia de la animación */}
            <LottieAnimation /> {/* Segunda instancia de la animación */}
            <LottieAnimation /> {/* Tercera instancia de la animación */}
            
            {/* Texto que se superpone sobre las animaciones, proporcionando un mensaje de bienvenida */}
            <div className='tracking-in-expand'> {/* Clase CSS que probablemente agrega una animación o efecto de entrada al texto */}
                <p>¡Bienvenido!</p> {/* Mensaje de bienvenida al usuario */}
            </div>
        </div>
    );
}
