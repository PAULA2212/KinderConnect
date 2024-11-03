import imgMarca from '../../assets/imagenmarca.png';
import './Login.css';
import { Link } from 'react-router-dom';
import useLogin from './useLogin';

/**
 * Componente de interfaz de usuario para la página de inicio de sesión.
 * La lógica de autenticación está externalizada en el custom hook `useLogin` para
 * mantener el componente `Login` enfocado en la presentación.
 * 
 * Este componente muestra un formulario de inicio de sesión, incluyendo campos para
 * nombre de usuario y contraseña, y proporciona opciones de navegación para
 * registro y política de privacidad.
 */
export default function Login() {
    // Desestructuración de propiedades del hook personalizado `useLogin` para manejar el estado y las acciones
    const { dataUser, error, handleInputChange, onLoginSubmit } = useLogin();

    return (
        <div className='box'>
            <section className='loginbox'>
                <aside>
                    <div>
                        {/* Renderiza el logotipo de la aplicación */}
                        <img src={imgMarca} alt='Logotipo de KinderConnect' />
                    </div>
                </aside>
                <article>
                    <h2>Inicia sesión</h2>
                    {/* Formulario de inicio de sesión que ejecuta `onLoginSubmit` al enviar */}
                    <form method='post' onSubmit={onLoginSubmit}>
                        {/* Campo de entrada para el nombre de usuario */}
                        <label htmlFor='userName'>Nombre de usuario:</label>
                        <input
                            type='text'
                            name='userName'
                            value={dataUser.userName} // Vínculo al estado del hook `useLogin`
                            onChange={handleInputChange} // Manejador de cambios en el campo de usuario
                        />
                        {/* Campo de entrada para la contraseña */}
                        <label htmlFor='password'>Contraseña:</label>
                        <input
                            type='password'
                            name='password'
                            value={dataUser.password} // Vínculo al estado del hook `useLogin`
                            onChange={handleInputChange} // Manejador de cambios en el campo de contraseña
                        />
                        {/* Botón de envío del formulario */}
                        <button type='submit'>Iniciar sesión</button>
                    </form>
                    
                    {/* Renderizado condicional del mensaje de error, en caso de que exista */}
                    {error && <p className='error-message'>{error}</p>} 

                    {/* Enlaces para opciones adicionales */}
                    <p>¿Aún no tienes cuenta?</p>
                    <Link to="signup">Regístrate</Link>
                    <Link to="politica-privacidad">Política de privacidad</Link>
                </article>        
            </section>
        </div>
    );
}
