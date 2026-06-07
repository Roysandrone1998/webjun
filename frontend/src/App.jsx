import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Equipo from './pages/Equipo';
import Biografia from './pages/Biografia';
import MiQNH from './pages/MiQNH';
// Importamos los nuevos componentes
import Cuerpo from './pages/Cuerpo';
import Mente from './pages/Mente';
import Proposito from './pages/Proposito';
import Nutricion from './pages/Nutricion';
import Acompañantes from './pages/Acompañantes';
import Login from "./pages/Login";
import Register from './pages/Register';
import AdminPanel from './pages/AdminPanel';
import AdminLogin from './pages/AdminLogin';
import Movimiento from './pages/Movimiento';
import MiradaMedica from './pages/MiradaMedica';
import Sintomatologia from './pages/Sintomatologia';
import Emociones from './pages/Emociones';

// MIDDLEWARE DE PROTECCIÓN PARA EL PANEL (Lee el token aislado de la Admin)
const GuardianAdmin = ({ children }) => {
  const adminToken = localStorage.getItem('adminToken');
  const isAdmin = localStorage.getItem('isAdmin');

  // Si no se logueó mediante la URL secreta de AdminLogin, lo rebota al login administrativo
  if (!adminToken || isAdmin !== 'true') {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/equipo" element={<Equipo />} />
        <Route path="/acompañante" element={<Acompañantes />} />
        <Route path='/miqnh' element={<MiQNH />} />
        
        {/* Rutas de Pacientes */}
        <Route path="/pacientes/cuerpo" element={<Cuerpo />} />
        <Route path="/pacientes/mente" element={<Mente />} />
        <Route path="/pacientes/proposito" element={<Proposito />} />
        <Route path="/pacientes/cuerpo/nutricion" element={<Nutricion />} />
        
        {/* CORREGIDO: Se arregló el typo de '/paciwnte' y se cerró correctamente la etiqueta */}
        <Route path="/pacientes/cuerpo/movimiento" element={<Movimiento />} />
        <Route path="/pacientes/mente/mirada-medica" element={<MiradaMedica />} />
<Route path="/pacientes/mente/sintomatologia" element={<Sintomatologia />} />
<Route path="/pacientes/mente/emociones" element={<Emociones />} />
        
        {/* Biografías, Login y Registro General */}
        <Route path="/equipo/:id" element={<Biografia />} />
        <Route path="/login" element={<Login />} />
        <Route path='/register' element={<Register />} />

        {/* --- FLUJO DE ADMINISTRACIÓN EXCLUSIVO --- */}
        {/* 1. La URL de entrada para loguearse (Muestra el formulario de AdminLogin) */}
        <Route path="/admin" element={<AdminLogin />} />
        
        {/* 2. La URL del panel protegido (Muestra el formulario de carga si pasó el Guardián) */}
        <Route 
          path="/admin/panel" 
          element={
            <GuardianAdmin>
              <AdminPanel />
            </GuardianAdmin>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;