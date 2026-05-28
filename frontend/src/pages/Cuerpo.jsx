
// src/pages/Cuerpo.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Cuerpo = () => {
  // Estado para controlar si se muestra el contenido de movimiento abajo
  const [verMovimiento, setVerMovimiento] = useState(false);

  return (
    <div style={styles.container}>
      {/* Sub-navegación interna de Pacientes */}
      <div style={styles.subTabs}>
        <Link to="/pacientes/cuerpo" style={{ ...styles.tabLink, ...styles.tabActive }}>QNH Cuerpo</Link>
        <Link to="/pacientes/mente" style={styles.tabLink}>QNH Mente</Link>
        <Link to="/pacientes/proposito" style={styles.tabLink}>QNH Propósito</Link>
      </div>

      {/* Contenedor de las Tarjetas */}
      <div style={styles.cardsGrid}>
        
        {/* Tarjeta 1: Nutrición (Esta sí te redirige) */}
        <div style={{ ...styles.card, borderColor: '#dca88a' }}>
          <div>
            <span style={styles.author}>YANINA GALIZZI</span>
            <h2 style={styles.cardTitle}>Nutrición</h2>
          </div>
          <Link to="/pacientes/cuerpo/nutricion" style={{ ...styles.enterLink, color: '#dca88a' }}>
            ENTRAR →
          </Link>
        </div>

        {/* Tarjeta 2: Movimiento (Esta despliega abajo) */}
        <div style={{ ...styles.card, borderColor: '#a6b09b' }}>
          <div>
            <span style={styles.author}>SISI IZAGUIRRE</span>
            <h2 style={styles.cardTitle}>Movimiento</h2>
          </div>
          <button 
            onClick={() => setVerMovimiento(!verMovimiento)} 
            style={{ ...styles.enterButton, color: '#a6b09b' }}
          >
            {verMovimiento ? 'OCULTAR ↑' : 'ENTRAR →'}
          </button>
        </div>

      </div>

      {/* Sección desplegable de Movimiento (Aparece abajo de las tarjetas) */}
      {verMovimiento && (
        <div style={styles.desplegableMovimiento}>
          <h3 style={{ color: '#2D3A2A', marginTop: 0 }}>Sección Movimiento - Sisi Izaguirre</h3>
          <p style={{ color: '#666', lineHeight: '1.6' }}>
            Acá va todo el contenido, rutinas, enfoques o información sobre la actividad física 
            y el movimiento consciente que quieras mostrar directamente sin cambiar de ruta.
          </p>
        </div>
      )}
    </div>
  );
};

// Estilos actualizados
const styles = {
  container: {
    padding: '2rem 10%',
    backgroundColor: '#FAF8F5',
    minHeight: 'calc(100vh - 70px)',
    fontFamily: 'sans-serif'
  },
  subTabs: {
    display: 'flex',
    gap: '30px',
    borderBottom: '1px solid #EAE6DF',
    marginBottom: '3rem',
    paddingBottom: '0.5rem'
  },
  tabLink: {
    textDecoration: 'none',
    color: '#8A857C',
    fontSize: '0.95rem',
    fontWeight: '500',
    paddingBottom: '0.5rem',
  },
  tabActive: {
    color: '#2D3A2A',
    borderBottom: '2px solid #2D3A2A',
  },
  cardsGrid: {
    display: 'flex',
    gap: '2rem',
    flexWrap: 'wrap',
    marginBottom: '2rem'
  },
  card: {
    flex: '1 1 45%',
    minWidth: '300px',
    height: '280px',
    borderWidth: '1px',
    borderStyle: 'solid',
    padding: '2.5rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  author: {
    fontSize: '0.75rem',
    letterSpacing: '2px',
    color: '#8A857C',
    display: 'block',
    marginBottom: '1rem',
    textTransform: 'uppercase'
  },
  cardTitle: {
    fontSize: '3rem',
    fontWeight: '300',
    margin: 0,
    color: '#2D3A2A'
  },
  enterLink: {
    textDecoration: 'none',
    fontSize: '0.85rem',
    letterSpacing: '1.5px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  enterButton: {
    background: 'none',
    border: 'none',
    padding: 0,
    fontSize: '0.85rem',
    letterSpacing: '1.5px',
    fontWeight: '600',
    cursor: 'pointer',
    textAlign: 'left',
    fontFamily: 'inherit'
  },
  desplegableMovimiento: {
    marginTop: '2rem',
    padding: '2rem',
    border: '1px solid #a6b09b',
    backgroundColor: '#fff',
    borderRadius: '4px',
    animation: 'fadeIn 0.3s ease-in-out' // Podés meterle una animación simple después con CSS
  }
};

export default Cuerpo;