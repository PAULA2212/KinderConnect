// Importa el componente LottieAnimation que se utiliza para mostrar animaciones Lottie
const LottieAnimation = () => {
    // Retorna el JSX que define la estructura de la animación
    return (
        <div 
            style={{ 
                width: '100%', // El div ocupará todo el ancho del contenedor padre
                height: '100%', // El div ocupará toda la altura del contenedor padre
                display: 'flex', // Utiliza Flexbox para alinear el contenido
                justifyContent: 'center', // Centra horizontalmente el contenido
                alignItems: 'center' // Centra verticalmente el contenido
            }}
        >
            <lottie-player
                src="/Animation.json" // Ruta del archivo de animación Lottie en formato JSON
                background="transparent" // Establece el fondo de la animación como transparente
                speed="1" // Velocidad de reproducción de la animación (1 es la velocidad normal)
                style={{ 
                    width: '100%', // El reproductor de Lottie ocupará todo el ancho disponible
                    height: '95%' // El reproductor de Lottie ocupará el 95% de la altura del div contenedor
                }} 
                loop // Indica que la animación se repetirá en bucle
                autoplay // Indica que la animación comenzará a reproducirse automáticamente
            ></lottie-player>
        </div>
    );
};

// Exporta el componente para que pueda ser utilizado en otras partes de la aplicación
export default LottieAnimation;


