import { Navigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
export default function PrivateRoute ({ children }) {
    const isAuthenticated = Boolean(sessionStorage.getItem('authToken'));
    return isAuthenticated ? children : <Navigate to="/" />;
}
