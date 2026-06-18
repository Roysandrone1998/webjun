import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  // Comprobar si hay un usuario en el localStorage al cargar la barra
  useEffect(() => {
    const userStorage = localStorage.getItem('user');
    if (userStorage && userStorage !== "undefined") {
      try {
        setUsuario(JSON.parse(userStorage));
      } catch (e) {
        console.error("Error en storage");
        localStorage.removeItem('user');
      }
    }
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUsuario(null);
    navigate('/login');
  };

  const cerrarMenu = () => setMenuAbierto(false);

  return (
    <nav style={styles.nav}>
      <div className="logo" style={styles.logo}>
        <Link to="/" style={styles.linkLogo}>Q N H</Link>
      </div>
      
      <ul style={styles.ul}>
        <li><Link to="/" style={styles.link}>Home</Link></li>
        
        <li 
          style={styles.dropdownContainer}
          onMouseEnter={() => setMenuAbierto(true)}
          onMouseLeave={() => setMenuAbierto(false)}
        >
          <span style={styles.link}>Paciente ▾</span>
          
          {menuAbierto && (
            <ul style={styles.dropdownMenu}>
              <li style={styles.dropdownItem}>
                <Link to="/pacientes/cuerpo" style={styles.linkSub} onClick={cerrarMenu}>Cuerpo</Link>
              </li>
              <li style={styles.dropdownItem}>
                <Link to="/pacientes/mente" style={styles.linkSub} onClick={cerrarMenu}>Mente</Link>
              </li>
              <li style={styles.dropdownItem}>
                <Link to="/pacientes/proposito" style={styles.linkSub} onClick={cerrarMenu}>Propósito</Link>
              </li>
            </ul>
          )}
        </li>

        <li><Link to="/acompañante" style={styles.link}>Acompañante</Link></li>
        <li><Link to="/equipo" style={styles.link}>Equipo</Link></li>
        <li><Link to="/miqnh" style={styles.link}>MiQNH</Link></li>
      </ul>

      {/* LÓGICA DINÁMICA DEL BOTÓN */}
      {usuario ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span style={{ fontSize: '0.9rem', color: '#3B1D28', fontWeight: '500' }}>
            Hola, {usuario.name}
          </span>
          <button onClick={cerrarSesion} style={styles.botonCerrar}>Salir</button>
        </div>
      ) : (
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <button style={styles.botonIngresar}>Ingresar</button>
        </Link>
      )}
    </nav>
  );
};

const styles = {
  nav: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: '1rem 5%', 
    // Fondo blanco traslúcido basado en tu paleta
    backgroundColor: 'rgba(247, 244, 242, 0.65)', 
    // Efecto de desenfoque del fondo (Glassmorphism)
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)', // Soporte para Safari
    borderBottom: '1px solid rgba(236, 230, 227, 0.5)', // Usamos Arena con opacidad
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000
  },
  logo: { fontWeight: 'bold', fontSize: '1.5rem' },
  linkLogo: { textDecoration: 'none', color: '#3B1D28' }, // Bordo para contraste
  ul: { 
    display: 'flex', 
    gap: '2.5rem', 
    listStyle: 'none', 
    alignItems: 'center', 
    margin: 0, 
    padding: 0 
  },
  link: { textDecoration: 'none', color: '#3B1D28', cursor: 'pointer', fontWeight: '500', opacity: 0.85 },
  dropdownContainer: { position: 'relative', cursor: 'pointer' },
  dropdownMenu: { 
    position: 'absolute', 
    top: '100%', 
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'rgba(247, 244, 242, 0.95)', // Crema sólido para el menú flotante
    boxShadow: '0px 8px 24px rgba(59, 29, 40, 0.12)', // Sombra usando base Bordo
    listStyle: 'none', 
    padding: '10px 0', 
    minWidth: '160px', 
    borderRadius: '12px', 
    zIndex: 100,
    marginTop: '10px'
  },
  dropdownItem: { padding: '10px 20px' },
  linkSub: { textDecoration: 'none', color: '#3B1D28', display: 'block', fontWeight: '500' },
  botonIngresar: { 
    padding: '8px 25px', 
    borderRadius: '25px', 
    border: '1px solid #3B1D28', // Bordo
    backgroundColor: 'transparent', 
    cursor: 'pointer', 
    color: '#3B1D28', 
    fontWeight: '500',
    transition: '0.3s ease'
  },
  botonCerrar: {
    padding: '6px 15px', 
    borderRadius: '15px', 
    border: '1px solid #864048', // QNH Acompañantes como variante rojiza para salir
    backgroundColor: 'transparent', 
    cursor: 'pointer', 
    color: '#864048', 
    fontSize: '0.8rem',
    fontWeight: '500'
  }
};

export default Navbar;