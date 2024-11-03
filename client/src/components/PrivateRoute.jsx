import { Navigate } from 'react-router-dom'; // Importa el componente Navigate para redireccionar a otras rutas

/**
 * PrivateRoute Component
 * 
 * Este componente se utiliza para proteger rutas que requieren autenticación. 
 * Comprueba si el usuario está autenticado mediante la verificación de un token 
 * de autenticación almacenado en el sessionStorage. Si el usuario está 
 * autenticado, renderiza los hijos (children) del componente; de lo contrario, 
 * redirige al usuario a la página de inicio ("/").
 */

export default function PrivateRoute({ children }) {
    const isAuthenticated = Boolean(sessionStorage.getItem('authToken')); // Verifica si existe un token de autenticación en sessionStorage
    return isAuthenticated ? children : <Navigate to="/" />; // Si está autenticado, muestra los hijos; de lo contrario, redirige
}
