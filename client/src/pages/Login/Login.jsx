import imgMarca from '../../assets/imagenmarca.png';
import { useState, useContext } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { UserContext } from '../../Context/UserContext';

export default function Login() {
    const [dataUser, setDataUser] = useState({ userName: '', password: '' });
    const [error, setError] = useState(''); // Estado para el mensaje de error
    const navigate = useNavigate();
    const { reloadUser } = useContext(UserContext);

    const handleInputChange = ({ target }) => {
        const { name, value } = target;
        setDataUser({
            ...dataUser,
            [name]: value
        });
    };

    const onLoginSubmit = (e) => {
        e.preventDefault();
        axiosInstance.post('/login', dataUser)
            .then(({ data }) => {
                console.log(data);
                // Almacenar el token en sessionStorage
                sessionStorage.setItem('authToken', data.token);

                // Almacenar los datos del usuario en sessionStorage
                sessionStorage.setItem('user', JSON.stringify(data));

                // Recargar el contexto del usuario
                reloadUser();

                // Navegar a la página de layout
                navigate('/layout');
            })
            .catch(({ response }) => {
                console.log(response);
                if (response.status === 401) {
                    setError('Credenciales incorrectas'); // Establecer mensaje de error
                } else {
                    setError('Error al iniciar sesión'); // Mensaje para otros errores
                }
            });
    };

    return (
        <div className='box'>
            <section className='loginbox'>
                <aside>
                    <div>
                        <img src={imgMarca} alt='Logotipo de KinderConnect' />
                    </div>
                </aside>
                <article>
                    <h2>Inicia sesión</h2>
                    <form method='post' onSubmit={onLoginSubmit}>
                        <label htmlFor='userName'>Nombre de usuario:</label>
                        <input
                            type='text'
                            name='userName'
                            value={dataUser.userName}
                            onChange={handleInputChange}
                        />
                        <label htmlFor='password'>Contraseña:</label>
                        <input
                            type='password'
                            name='password'
                            value={dataUser.password}
                            onChange={handleInputChange}
                        />
                        <button type='submit'>Iniciar sesión</button>
                    </form>
                    {error && <p className='error-message'>{error}</p>} 
                    <p>¿Aún no tienes cuenta?</p>
                    <Link to="signup">Regístrate</Link>
                </article>        
            </section>
        </div>
    );
}
