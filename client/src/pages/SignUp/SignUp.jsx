import './SignUp.css';
import { useSignUp } from './useSignUp';

/**
 * Componente `SignUp` que proporciona una interfaz para el registro de nuevos usuarios en la plataforma.
 * Incluye campos de formulario para nombre de usuario, contraseña, confirmación de contraseña, y tipo de perfil (educador o progenitor).
 * La lógica de estado y manejo de eventos se gestiona a través del hook `useSignUp`.
 *
 * @returns {JSX.Element} - Retorna el formulario de registro con validaciones y manejo de errores.
 */
export default function SignUp() {
    // Extrae métodos y datos de `useSignUp` para manejar el estado y la lógica del formulario de registro
    const {
        handleInputChange,    // Función para manejar cambios en los campos de entrada del formulario
        handlePerfilChange,   // Función para manejar cambios en la selección del perfil (educador o progenitor)
        handleSubmit,         // Función para manejar el envío del formulario
        errors,               // Objeto que contiene los mensajes de error para validación de formulario
        formData              // Objeto que contiene los valores de los campos del formulario
    } = useSignUp();

    return (
        <section className='boox'>
            <section className="signupbox">
                <h2>Regístrate en KinderConnect</h2>
                
                {/* Formulario de registro, maneja el envío con `handleSubmit` */}
                <form method='post' onSubmit={handleSubmit}>
                    
                    {/* Campo de entrada para el nombre de usuario */}
                    <div>
                        <label htmlFor='userName'>Nombre de usuario</label>
                        <input
                            type='text'
                            name='userName'
                            value={formData.userName}
                            onChange={handleInputChange} // Controla los cambios en el campo de nombre de usuario
                        />
                        {errors.userName && <p className='error-message'>{errors.userName}</p>} {/* Muestra el mensaje de error, si existe */}
                    </div>

                    {/* Campo de entrada para la contraseña */}
                    <div>
                        <label htmlFor='password'>Contraseña:</label>
                        <input
                            type='password'
                            name='password'
                            value={formData.password}
                            onChange={handleInputChange} // Controla los cambios en el campo de contraseña
                        />
                        {errors.password && <p className='error-message'>{errors.password}</p>} {/* Muestra el mensaje de error, si existe */}
                    </div>

                    {/* Campo de entrada para la confirmación de contraseña */}
                    <div>
                        <label htmlFor='confirmPassword'>Repetir contraseña:</label>
                        <input
                            type='password'
                            name='confirmPassword'
                            value={formData.confirmPassword}
                            onChange={handleInputChange} // Controla los cambios en el campo de confirmación de contraseña
                        />
                        {errors.confirmPassword && <p className='error-message'>{errors.confirmPassword}</p>} {/* Muestra el mensaje de error, si existe */}
                    </div>

                    {/* Opciones de radio para selección de perfil */}
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="perfil"
                                value="educador"
                                onChange={handlePerfilChange} // Controla la selección de perfil como educador
                            />
                            Soy educador/educadora
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="perfil"
                                value="progenitor"
                                onChange={handlePerfilChange} // Controla la selección de perfil como progenitor
                            />
                            Soy padre/madre
                        </label>
                        {errors.perfil && <p className='error-message'>{errors.perfil}</p>} {/* Muestra el mensaje de error, si existe */}
                    </div>

                    {/* Botón de envío para crear la cuenta */}
                    <button type="submit">Crear cuenta</button>
                </form>
            </section>
        </section>
    );
}
