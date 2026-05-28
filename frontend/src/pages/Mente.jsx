// src/pages/Mente.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Mente = () => {
  const [seccionAbierta, setSeccionAbierta] = useState(null);

  const manejarDespliegue = (seccion) => {
    setSeccionAbierta(seccionAbierta === seccion ? null : seccion);
  };

  // Datos mockeados basados exactamente en tu diseño para la lista de "noticias"
  const contenidosMente = {
    mirada: {
      titulo: 'Mirada médica',
      colorHeader: '#5B7485',
      articulos: [
        { id: '01', tag: 'DIAGNÓSTICO', titulo: 'Entendiendo la perspectiva clínica', tiempo: '5 min' },
        { id: '02', tag: 'INFO', titulo: 'Tratamientos integrales actuales', tiempo: '12 min' }
      ]
    },
    sintomatologia: {
      titulo: 'Sintomatología',
      colorHeader: '#5B7485', // Usa el color azul grisáceo que se ve en la captura image_85e662.jpg
      articulos: [
        { id: '01', tag: 'GUÍA', titulo: 'Reconocer los síntomas sin asustarse', tiempo: '8 min' },
        { id: '02', tag: 'LISTA', titulo: 'Cuándo consultar de urgencia', tiempo: '10 min' },
        { id: '03', tag: 'REGISTRO', titulo: 'Diario de síntomas', tiempo: 'Plantilla' }
      ]
    },
    emociones: {
      titulo: 'Emociones',
      colorHeader: '#7B7570', // Tono gris/tierra oscuro
      articulos: [
        { id: '01', tag: 'PRÁCTICA', titulo: 'Volver al centro • 7 minutos', tiempo: '7 min' },
        { id: '02', tag: 'GESTIÓN', titulo: 'Identificación de disparadores emocionales', tiempo: '6 min' }
      ]
    }
  };

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
          <button onClick={() => manejarDespliegue('mirada')} style={{ ...styles.enterButton, color: '#FFF' }}>
            {seccionAbierta === 'mirada' ? 'OCULTAR ↑' : 'ENTRAR →'}
          </button>
        </div>

        {/* Tarjeta 2 */}
        <div style={{ ...styles.card, borderColor: '#A6A6A6' }}>
          <div>
            <span style={styles.author}>EQUIPO QNH</span>
            <h2 style={styles.cardTitle}>Sintomatología</h2>
          </div>
          <button onClick={() => manejarDespliegue('sintomatologia')} style={{ ...styles.enterButton, color: '#555' }}>
            {seccionAbierta === 'sintomatologia' ? 'OCULTAR ↑' : 'ENTRAR →'}
          </button>
        </div>

        {/* Tarjeta 3 */}
        <div style={{ ...styles.card, borderColor: '#DCA88A' }}>
          <div>
            <span style={{ ...styles.author, color: '#BA8D72' }}>JOSEFINA BRUNET</span>
            <h2 style={styles.cardTitle}>Emociones</h2>
          </div>
          <button onClick={() => manejarDespliegue('emociones')} style={{ ...styles.enterButton, color: '#DCA88A' }}>
            {seccionAbierta === 'emociones' ? 'OCULTAR ↑' : 'ENTRAR →'}
          </button>
        </div>
      </div>

      {/* SECCIÓN DESPLEGABLE DINÁMICA (TIPO NOTICIAS) */}
      {seccionAbierta && contenidosMente[seccionAbierta] && (
        <div style={styles.desplegableWrapper}>
          
          {/* Cabecera del desplegable */}
          <div style={{ ...styles.headerDesplegable, backgroundColor: contenidosMente[seccionAbierta].colorHeader }}>
            <h2 style={styles.headerTitle}>{contenidosMente[seccionAbierta].titulo}</h2>
          </div>

          {/* Listado de filas/artículos */}
          <div style={styles.listaArticulos}>
            {contenidosMente[seccionAbierta].articulos.map((art) => (
              <div key={art.id} style={styles.filaArticulo}>
                
                <div style={styles.leftFila}>
                  <span style={styles.numeroFila}>{art.id}</span>
                  <span style={styles.tagFila}>{art.tag}</span>
                  <span style={styles.tituloFila}>{art.titulo}</span>
                </div>

                <div style={styles.rightFila}>
                  <span style={styles.tiempoFila}>{art.tiempo}</span>
                  <Link to={`/pacientes/mente/${seccionAbierta}/${art.id}`} style={styles.linkAbrir}>
                    ABRIR →
                  </Link>
                </div>

              </div>
            ))}
          </div>

        </div>
      )}
    </div>
  );
};

// Estilos adaptados milimétricamente al layout de Figma
const styles = {
  container: { padding: '2rem 10%', backgroundColor: '#FAF8F5', minHeight: 'calc(100vh - 70px)', fontFamily: 'sans-serif' },
  subTabs: { display: 'flex', gap: '30px', borderBottom: '1px solid #EAE6DF', marginBottom: '3rem', paddingBottom: '0.5rem' },
  tabLink: { textDecoration: 'none', color: '#8A857C', fontSize: '0.95rem', fontWeight: '500', paddingBottom: '0.5rem' },
  tabActive: { color: '#2D3A2A', borderBottom: '2px solid #2D3A2A' },
  cardsGrid: { display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '3rem' },
  card: { flex: '1 1 30%', minWidth: '280px', height: '280px', borderWidth: '1px', borderStyle: 'solid', padding: '2.5rem', display: 'flex', flexDirection: 'column', justifycontent: 'space-between' },
  author: { fontSize: '0.75rem', letterSpacing: '2px', color: '#8A857C', display: 'block', marginBottom: '1rem', textTransform: 'uppercase' },
  cardTitle: { fontSize: '2.5rem', fontWeight: '300', margin: 0, color: '#2D3A2A', lineHeight: '1.2' },
  enterButton: { background: 'none', border: 'none', padding: 0, fontSize: '0.85rem', letterSpacing: '1.5px', fontWeight: '600', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit' },
  
  // Estilos nuevos para el listado colapsable
  desplegableWrapper: { marginTop: '2rem', backgroundColor: '#FAF8F5', border: '1px solid #E2DEC9', borderRadius: '4px', overflow: 'hidden' },
  headerDesplegable: { padding: '3.5rem 4rem', display: 'flex', alignItems: 'center' },
  headerTitle: { color: '#FFF', fontSize: '3.5rem', fontWeight: '300', margin: 0 },
  listaArticulos: { backgroundColor: '#FAF8F5', padding: '1rem 4rem' },
  filaArticulo: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.8rem 0', borderBottom: '1px solid #EAE6DF' },
  leftFila: { display: 'flex', alignItems: 'center', gap: '2.5rem' },
  numeroFila: { fontSize: '0.9rem', color: '#8A857C', fontWeight: '500' },
  tagFila: { fontSize: '0.7rem', color: '#8A857C', border: '1px solid #8A857C', padding: '4px 14px', borderRadius: '15px', fontWeight: '500', letterSpacing: '1px' },
  tituloFila: { fontSize: '1.25rem', color: '#2D3A2A', fontWeight: '400' },
  rightFila: { display: 'flex', alignItems: 'center', gap: '4rem' },
  tiempoFila: { fontSize: '0.9rem', color: '#8A857C' },
  linkAbrir: { textDecoration: 'none', fontSize: '0.8rem', fontWeight: '600', color: '#8A857C', letterSpacing: '1px' }
};

export default Mente;