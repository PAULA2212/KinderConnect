// Importa el paquete canvas-confetti para mostrar efectos de confeti en el canvas
import confetti from 'canvas-confetti';

// Función para activar el efecto de confeti
export const triggerConfetti = () => {
    // Llama a la función confetti con una configuración personalizada
    confetti({
        particleCount: 200, // Número de partículas de confeti a generar
        spread: 120, // Ángulo de dispersión del confeti en grados
        origin: { y: 0.6 }, // Origen de la dispersión (posiciona el confeti en el eje Y)
        colors: ['#b9f0ea', '#f0e5b9', '#3dc0c0', '#f0b9eb'], // Colores de las partículas de confeti
        gravity: 0.5, // Fuerza de gravedad que afecta la caída del confeti
        shapes: ['circle'], // Forma de las partículas de confeti (en este caso, círculos)
        scalar: 1.5 // Escala del tamaño de las partículas
    });
};
