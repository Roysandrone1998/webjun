import { Link } from 'react-router-dom';

const Mente = () => {
  return (
    <div style={styles.container}>
      {/* Sub-navegación interna de Pacientes */}
      <div style={styles.subTabs}>
        <Link to="/pacientes/cuerpo" style={styles.tabLink}>QNH Cuerpo</Link>
        <Link to="/pacientes/mente" style={{ ...styles.tabLink, ...styles.tabActive }}>QNH Mente</Link>
        <Link to="/pacientes/proposito" style={styles.tabLink}>QNH Propósito</Link>
      </div>

      {/* Contenedor de las Tres Tarjetas */}
      <div style={styles.cardsGrid}>
        {/* Tarjeta 1 */}
        <div style={{ ...styles.card, backgroundColor: '#5B7485', borderColor: '#5B7485' }}>
          <div>
            <span style={{ ...styles.author, color: '#CDD6DC' }}>SANDRA OSTOICH</span>
            <h2 style={{ ...styles.cardTitle, color: '#FFF' }}>Mirada médica</h2>
          </div>
          <Link to="/pacientes/mente/mirada-medica" style={{ ...styles.enterLink, color: '#FFF' }}>
            ENTRAR →
          </Link>
        </div>

        {/* Tarjeta 2 */}
        <div style={{ ...styles.card, borderColor: '#A6A6A6' }}>
          <div>
            <span style={styles.author}>EQUIPO QNH</span>
            <h2 style={styles.cardTitle}>Sintomatología</h2>
          </div>
          <Link to="/pacientes/mente/sintomatologia" style={{ ...styles.enterLink, color: '#555' }}>
            ENTRAR →
          </Link>
        </div>

        {/* Tarjeta 3 */}
        <div style={{ ...styles.card, borderColor: '#DCA88A' }}>
          <div>
            <span style={{ ...styles.author, color: '#BA8D72' }}>JOSEFINA BRUNET</span>
            <h2 style={styles.cardTitle}>Emociones</h2>
          </div>
          <Link to="/pacientes/mente/emociones" style={{ ...styles.enterLink, color: '#DCA88A' }}>
            ENTRAR →
          </Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '2rem 10%', backgroundColor: '#FAF8F5', minHeight: 'calc(100vh - 70px)', fontFamily: 'sans-serif' },
  subTabs: { display: 'flex', gap: '30px', borderBottom: '1px solid #EAE6DF', marginBottom: '3rem', paddingBottom: '0.5rem' },
  tabLink: { textDecoration: 'none', color: '#8A857C', fontSize: '0.95rem', fontWeight: '500', paddingBottom: '0.5rem' },
  tabActive: { color: '#2D3A2A', borderBottom: '2px solid #2D3A2A' },
  cardsGrid: { display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '3rem' },
  card: { flex: '1 1 30%', minWidth: '280px', height: '280px', borderWidth: '1px', borderStyle: 'solid', padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: 'transparent' },
  author: { fontSize: '0.75rem', letterSpacing: '2px', color: '#8A857C', display: 'block', marginBottom: '1rem', textTransform: 'uppercase' },
  cardTitle: { fontSize: '2.5rem', fontWeight: '300', margin: 0, color: '#2D3A2A', lineHeight: '1.2' },
  enterLink: { textDecoration: 'none', fontSize: '0.85rem', letterSpacing: '1.5px', fontWeight: '600' }
};

export default Mente;