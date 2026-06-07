
import { Link } from 'react-router-dom';

const Cuerpo = () => {
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
        
        {/* Tarjeta 1: Nutrición */}
        <div style={{ ...styles.card, borderColor: '#dca88a' }}>
          <div>
            <span style={styles.author}>YANINA GALIZZI</span>
            <h2 style={styles.cardTitle}>Nutrición</h2>
          </div>
          <Link to="/pacientes/cuerpo/nutricion" style={{ ...styles.enterLink, color: '#dca88a' }}>
            ENTRAR →
          </Link>
        </div>

        {/* Tarjeta 2: Movimiento */}
        <div style={{ ...styles.card, borderColor: '#a6b09b' }}>
          <div>
            <span style={styles.author}>SISI IZAGUIRRE</span>
            <h2 style={styles.cardTitle}>Movimiento</h2>
          </div>
          {/* CORREGIDO: Ahora es un Link real que te redirecciona a la nueva página */}
          <Link to="/pacientes/cuerpo/movimiento" style={{ ...styles.enterLink, color: '#a6b09b' }}>
            ENTRAR →
          </Link>
        </div>

      </div>
    </div>
  );
};

// Estilos limpios y corregidos
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
  }
};

export default Cuerpo;