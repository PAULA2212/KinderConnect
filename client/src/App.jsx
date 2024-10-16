import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import PrivateRoute from './components/PrivateRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './pages/Layout/Layout'
import Profile from './pages/Profile/Profile'
import Diary from './pages/Diary/Diary';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import KidProfile from './pages/KidProfile/KidProfile';
import KidSelect from './pages/KidSelect/KidSelect';
import { KidProvider } from './Context/KidContext';
import CalendarWithEvents from './pages/CalendarWithEvents/CalendarWithEvents';
import BookClub from './pages/BookClub/BookClub';
import DevelopmentalMilestones from './pages/DevelopmentalMilestones/DevelopmentalMilestones';
import PersonalGoals from './pages/PersonalGoals/PersonalGoals';
import Assessment from './pages/Assessment/Assessment';
import GrowthCharts from './pages/GrowthCharts/GrowthCharts';
import Allergies from './pages/Allergies/Allergies';
import MedicalConditions from './pages/MedicalConditions/MedicalCondition';
import Feeding from './pages/Feeding/Feeding';
import Gallery from './pages/Gallery/Gallery';
import AdminDocuments from './pages/AdminDocuments/AdminDocuments';
import { ToastContainer } from 'react-toastify';
import VirtualAssistant from './pages/VirtualAssistant.jsx/VirtualAssistant';

library.add(fas);

function App() {
    return (
        <KidProvider>
            <Suspense fallback={<p>Cargando...</p>}>
            <ToastContainer/>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="signUp" element={<SignUp />} />
                    <Route
                        path="layout"
                        element={
                            <PrivateRoute>
                                <Layout />
                            </PrivateRoute>
                        }
                    >
                        <Route path="perfil" element={<Profile/>} />
                        <Route path="perfilniños" element={<KidProfile />} />
                        <Route path="elegirniño" element={<KidSelect />} />
                        <Route path="diario" element={<Diary />} />
                        <Route path="calendario" element={<CalendarWithEvents/>} />
                        <Route path="club-lectura" element={<BookClub/>} />
                        <Route path="hitos-desarrollo" element={<DevelopmentalMilestones/>} />
                        <Route path="objetivos-personales" element={<PersonalGoals/>} />
                        <Route path="evaluaciones" element={<Assessment/>} />
                        <Route path="curvas-crecimiento" element={<GrowthCharts/>} />
                        <Route path="alergias" element={<Allergies/>} />
                        <Route path="condiciones-medicas" element={<MedicalConditions/>} />
                        <Route path='alimentacion' element={<Feeding/>}/>
                        <Route path='imagenes' element={<Gallery/>}/>
                        <Route path='archivos' element={<AdminDocuments/>}/>
                        <Route path='asistente-virtual' element={<VirtualAssistant/>}/>
                    </Route>
                </Routes>
            </Suspense>
        </KidProvider>
    );
}

export default App;