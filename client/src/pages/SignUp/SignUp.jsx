import './SignUp.css';
import { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance'; // Asegúrate de que esta instancia esté configurada
import { useNavigate } from 'react-router';
export default function SignUp() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        userName: '',
        password: '',
        confirmPassword: '',
        perfil: ''
    });
    const [errors, setErrors] = useState({});
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handlePerfilChange = (e) => {
        setFormData({
            ...formData,
            perfil: e.target.value
        });
    };

    const validateForm = () => {
        const { userName, password, confirmPassword, perfil } = formData;
        const newErrors = {};
        
        // Validar nombre de usuario
        if (!userName) {
            newErrors.userName = 'Nombre de usuario es obligatorio';
        }
        
        // Validar contraseñas
        if (!password) {
            newErrors.password = 'Contraseña es obligatoria';
        }
        
        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Las contraseñas no coinciden';
        }
        
        // Validar perfil
        if (!perfil) {
            newErrors.perfil = 'Selecciona un perfil';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Realiza la petición de registro aquí
            axiosInstance.post('/register', formData)
                .then(response => {
                    console.log('Registro exitoso', response.data);
                    // Redirigir o mostrar mensaje de éxito
                    navigate('/');
                })
                .catch(error => {
                    console.error('Error en el registro', error);
                    // Mostrar mensaje de error
                });
        }
    };

    return (
        <section className='boox'>
            <section className="signupbox">
                <h2>Regístrate en KinderConnect</h2>
                <form method='post' onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='userName'>Nombre de usuario</label>
                        <input
                            type='text'
                            name='userName'
                            value={formData.userName}
                            onChange={handleInputChange}
                        />
                        {errors.userName && <p className='error-message'>{errors.userName}</p>}
                    </div>
                    <div>
                        <label htmlFor='password'>Contraseña:</label>
                        <input
                            type='password'
                            name='password'
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                        {errors.password && <p className='error-message'>{errors.password}</p>}
                    </div>
                    <div>
                        <label htmlFor='confirmPassword'>Repetir contraseña:</label>
                        <input
                            type='password'
                            name='confirmPassword'
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                        />
                        {errors.confirmPassword && <p className='error-message'>{errors.confirmPassword}</p>}
                    </div>
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="perfil"
                                value="educador"
                                onChange={handlePerfilChange}
                            />
                            Soy educador/educadora
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="perfil"
                                value="progenitor"
                                onChange={handlePerfilChange}
                            />
                            Soy padre/madre
                        </label>
                        {errors.perfil && <p className='error-message'>{errors.perfil}</p>}
                    </div>
                    <button type="submit">Crear cuenta</button>
                </form>
            </section>
        </section>
    );
}
