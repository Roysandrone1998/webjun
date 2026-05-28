import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Equipo from './pages/Equipo';
import Biografia from './pages/Biografia';
// Importamos los nuevos componentes
import Cuerpo from './pages/Cuerpo';
import Mente from './pages/Mente';
import Proposito from './pages/Proposito';
import Nutricion from './pages/Nutricion';
import Acompañantes from './pages/Acompañantes';
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/equipo" element={<Equipo />} />
        <Route path="/acompañante" element={<Acompañantes />} />
        {/* Rutas de Pacientes */}
        <Route path="/pacientes/cuerpo" element={<Cuerpo />} />
        <Route path="/pacientes/mente" element={<Mente />} />
        <Route path="/pacientes/proposito" element={<Proposito />} />
        <Route path="/pacientes/cuerpo/nutricion" element={<Nutricion />} />
        <Route path="/equipo/:id" element={<Biografia />} />
      </Routes>
    </Router>
  );
}

export default App;