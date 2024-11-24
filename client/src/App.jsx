// Importa componentes y funciones de React y otras librerías
import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login'; // Página de inicio de sesión
import SignUp from './pages/SignUp/SignUp'; // Página de registro
import PrivateRoute from './components/PrivateRoute'; // Componente para rutas privadas
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa estilos de Bootstrap
import Layout from './pages/Layout/Layout'; // Componente de diseño principal
import Profile from './pages/Profile/Profile'; // Página de perfil del usuario
import Diary from './pages/Diary/Diary'; // Página del diario
import { library } from '@fortawesome/fontawesome-svg-core'; // Biblioteca de iconos
import { fas } from '@fortawesome/free-solid-svg-icons'; // Conjunto de iconos sólidos
import KidProfile from './pages/KidProfile/KidProfile'; // Página de perfil del niño
import KidSelect from './pages/KidSelect/KidSelect'; // Página para seleccionar un niño
import { KidProvider } from './Context/KidContext'; // Proveedor de contexto para datos de niños
import CalendarWithEvents from './pages/CalendarWithEvents/CalendarWithEvents'; // Calendario con eventos
import BookClub from './pages/BookClub/BookClub'; // Página del club de lectura
import DevelopmentalMilestones from './pages/DevelopmentalMilestones/DevelopmentalMilestones'; // Hitos de desarrollo
import PersonalGoals from './pages/PersonalGoals/PersonalGoals'; // Página de objetivos personales
import Assessment from './pages/Assessment/Assessment'; // Página de evaluaciones
import GrowthCharts from './pages/GrowthCharts/GrowthCharts'; // Página de curvas de crecimiento
import Allergies from './pages/Allergies/Allergies'; // Página de alergias
import MedicalConditions from './pages/MedicalConditions/MedicalCondition'; // Página de condiciones médicas
import Feeding from './pages/Feeding/Feeding'; // Página de alimentación
import Gallery from './pages/Gallery/Gallery'; // Página de galería
import AdminDocuments from './pages/AdminDocuments/AdminDocuments'; // Página de documentos administrativos
import { ToastContainer } from 'react-toastify'; // Componente para notificaciones
import VirtualAssistant from './pages/VirtualAssistant.jsx/VirtualAssistant'; // Página del asistente virtual
import Messaging from './pages/Messaging/Messaging'; // Página de mensajería
import Welcome from './pages/Welcome/Welcome'; // Página de bienvenida
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy'; // Página de política de privacidad

// Agrega el conjunto de iconos sólidos a la biblioteca de FontAwesome
library.add(fas);

// Componente principal de la aplicación
function App() {
    return (
        // Proveedor de contexto para datos de niños
        <KidProvider>
            <Suspense fallback={<p>Cargando...</p>}> {/* Carga perezosa con un mensaje mientras se espera */}
                <ToastContainer/> {/* Contenedor para notificaciones */}
                <Routes>
                    {/* Rutas públicas */}
                    <Route path="/" element={<Login />} /> {/* Ruta para la página de inicio de sesión */}
                    <Route path="signUp" element={<SignUp />} /> {/* Ruta para la página de registro */}
                    <Route path='politica-privacidad' element={<PrivacyPolicy />} /> {/* Ruta para la política de privacidad */}
                    {/* Ruta privada que requiere autenticación */}
                    <Route
                        path="layout"
                        element={
                            <PrivateRoute>
                                <Layout /> {/* Componente principal que envuelve las rutas privadas */}
                            </PrivateRoute>
                        }>
                        {/* Rutas protegidas dentro de la sección privada */}
                        <Route index element={<Welcome/>} /> {/* Página de bienvenida dentro de layout */}
                        <Route path="perfil" element={<Profile/>} /> {/* Página de perfil del usuario */}
                        <Route path="perfilniños" element={<KidProfile />} /> {/* Página de perfil de niño */}
                        <Route path="elegirniño" element={<KidSelect />} /> {/* Página para seleccionar niño */}
                        <Route path="diario" element={<Diary />} /> {/* Página del diario */}
                        <Route path="calendario" element={<CalendarWithEvents/>} /> {/* Calendario con eventos */}
                        <Route path="club-lectura" element={<BookClub/>} /> {/* Página del club de lectura */}
                        <Route path="hitos-desarrollo" element={<DevelopmentalMilestones/>} /> {/* Hitos de desarrollo */}
                        <Route path="objetivos-personales" element={<PersonalGoals/>} /> {/* Objetivos personales */}
                        <Route path="evaluaciones" element={<Assessment/>} /> {/* Evaluaciones */}
                        <Route path="curvas-crecimiento" element={<GrowthCharts/>} /> {/* Curvas de crecimiento */}
                        <Route path="alergias" element={<Allergies/>} /> {/* Página de alergias */}
                        <Route path="condiciones-medicas" element={<MedicalConditions/>} /> {/* Condiciones médicas */}
                        <Route path='alimentacion' element={<Feeding/>}/> {/* Página de alimentación */}
                        <Route path='imagenes' element={<Gallery/>}/> {/* Página de galería */}
                        <Route path='archivos' element={<AdminDocuments/>}/> {/* Página de documentos administrativos */}
                        <Route path='asistente-virtual' element={<VirtualAssistant/>}/> {/* Página del asistente virtual */}
                        <Route path='mensajeria' element={<Messaging/>}/> {/* Página de mensajería */}
                    </Route>
                </Routes>
            </Suspense>
        </KidProvider>
    );
}

// Exporta el componente App como el componente principal
export default App;
