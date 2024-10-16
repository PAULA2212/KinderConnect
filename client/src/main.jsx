
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import '@fortawesome/fontawesome-free/css/all.css';
import { UserProvider } from './Context/UserContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <UserProvider>
        <App/>
      </UserProvider>
  </BrowserRouter>,
)
