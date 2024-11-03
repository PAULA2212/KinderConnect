// Importa ReactDOM para renderizar la aplicación en el DOM
import ReactDOM from 'react-dom/client';
// Importa el componente principal de la aplicación
import App from './App.jsx';
// Importa estilos globales
import './index.css';
// Importa el enrutador de React para manejar la navegación
import { BrowserRouter } from 'react-router-dom';
// Importa los estilos de FontAwesome para iconos
import '@fortawesome/fontawesome-free/css/all.css';
// Importa el proveedor de contexto para el usuario
import { UserProvider } from './Context/UserContext.jsx';

// Crea la raíz de la aplicación y renderiza el componente principal
ReactDOM.createRoot(document.getElementById('root')).render(
  // Envuelve la aplicación en el enrutador para habilitar la navegación
  <BrowserRouter>
      {/* Proveedor de contexto para el usuario, accesible en toda la aplicación */}
      <UserProvider>
        {/* Componente principal de la aplicación */}
        <App/>
      </UserProvider>
  </BrowserRouter>,
);
