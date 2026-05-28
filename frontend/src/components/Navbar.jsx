import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);

  // Función para cerrar el menú cuando elegís una opción
  const cerrarMenu = () => setMenuAbierto(false);

  return (
    <nav style={styles.nav}>
      <div className="logo" style={styles.logo}>
        <Link to="/" style={styles.linkLogo}>Q N H</Link>
      </div>
      
      <ul style={styles.ul}>
        <li><Link to="/" style={styles.link}>Home</Link></li>
        
        {/* Dropdown Pacientes */}
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

      <button style={styles.botonIngresar}>Ingresar</button>
    </nav>
  );
};

const styles = {
  nav: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: '1rem 5%', 
    backgroundColor: '#fff', 
    borderBottom: '1px solid #eee', 
    position: 'relative' 
  },
  logo: { fontWeight: 'bold', fontSize: '1.5rem' },
  linkLogo: { textDecoration: 'none', color: 'black' },
  ul: { 
    display: 'flex', 
    gap: '20px', // Reduje un poco el gap para que entren todos los items
    listStyle: 'none', 
    alignItems: 'center',
    margin: 0,
    padding: 0
  },
  link: { textDecoration: 'none', color: '#555', cursor: 'pointer', fontWeight: '500' },
  dropdownContainer: { position: 'relative', cursor: 'pointer', paddingBottom: '5px' },
  dropdownMenu: {
    position: 'absolute',
    top: '100%',
    left: '0',
    backgroundColor: '#fff',
    boxShadow: '0px 8px 16px rgba(0,0,0,0.1)',
    listStyle: 'none',
    padding: '10px 0',
    minWidth: '150px',
    borderRadius: '8px',
    zIndex: 100,
  },
  dropdownItem: { padding: '10px 20px' },
  linkSub: { textDecoration: 'none', color: '#666', display: 'block' },
  botonIngresar: { 
    padding: '8px 25px', 
    borderRadius: '25px', 
    border: '1px solid #2d3a2a', 
    backgroundColor: 'transparent', 
    cursor: 'pointer', 
    color: '#2d3a2a',
    fontWeight: '500'
  }
};

export default Navbar;