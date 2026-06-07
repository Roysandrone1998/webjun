import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import clienteAxios from '../api/axios';

const Proposito = () => {
  const [articulosProposito, setArticulosProposito] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. TRAER LOS CONTENIDOS DESDE MONGO
  useEffect(() => {
    const cargarProposito = async () => {
      try {
        const { data } = await clienteAxios.get('/content');
        // Filtramos de forma exacta por la sección principal 'proposito'
        const filtrados = data.filter(item => item.section === 'proposito');
        setArticulosProposito(filtrados);
      } catch (error) {
        console.error("Error al cargar la sección de Propósito:", error);
      } finally {
        setLoading(false);
      }
    };
    cargarProposito();
  }, []);

  return (
    <div style={styles.container}>
      {/* Sub-navegación interna de Pacientes */}
      <div style={styles.subTabs}>
        <Link to="/pacientes/cuerpo" style={styles.tabLink}>QNH Cuerpo</Link>
        <Link to="/pacientes/mente" style={styles.tabLink}>QNH Mente</Link>
        <Link to="/pacientes/proposito" style={{ ...styles.tabLink, ...styles.tabActive }}>QNH Propósito</Link>
      </div>

      {/* Cabecera de la sección */}
      <header style={styles.header}>
        <span style={styles.subtitulo}>DESARROLLO PERSONAL</span>
        <h1 style={styles.titulo}>Propósito</h1>
        <p style={styles.bajada}>
          Contenido enfocado en el autoconocimiento, la resignificación de objetivos y herramientas para tu día a día.
        </p>
      </header>

      {/* Listado dinámico de los informes/guías */}
      <div style={styles.listaArticulos}>
        {loading ? (
          <p style={styles.aviso}>Cargando recursos...</p>
        ) : articulosProposito.length > 0 ? (
          articulosProposito.map((art, index) => (
            <div key={art._id} style={styles.filaArticulo}>
              
              <div style={styles.leftFila}>
                <span style={styles.numeroFila}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span style={styles.tagFila}>ENFOQUE</span>
                <span style={styles.tituloFila}>{art.title}</span>
              </div>

              <div style={styles.rightFila}>
                <span style={styles.descripcionFila}>{art.description}</span>
              </div>

            </div>
          ))
        ) : (
          <p style={styles.aviso}>
            No hay contenido sobre propósitos cargado por el momento.
          </p>
        )}
      </div>
    </div>
  );
};

// Estilos consistentes con todo el ecosistema QNH
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
  header: {
    marginBottom: '4rem',
    maxWidth: '700px'
  },
  subtitulo: {
    fontSize: '0.75rem',
    letterSpacing: '2px',
    color: '#7B3E3E',
    fontWeight: 'bold',
    display: 'block',
    marginBottom: '0.5rem'
  },
  titulo: {
    fontSize: '3.5rem',
    fontWeight: '300',
    color: '#2D3A2A',
    margin: '0 0 1.5rem 0',
    lineHeight: '1.1'
  },
  bajada: {
    fontSize: '1.15rem',
    color: '#666',
    lineHeight: '1.6',
    margin: 0
  },
  listaArticulos: {
    borderTop: '2px solid #2D3A2A',
    marginTop: '2rem'
  },
  filaArticulo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '2rem 0',
    borderBottom: '1px solid #EAE6DF'
  },
  leftFila: {
    display: 'flex',
    alignItems: 'center',
    gap: '2.5rem'
  },
  numeroFila: {
    fontSize: '0.9rem',
    color: '#8A857C',
    fontWeight: '500'
  },
  tagFila: {
    fontSize: '0.7rem',
    color: '#7B3E3E',
    border: '1px solid #7B3E3E',
    padding: '4px 14px',
    borderRadius: '15px',
    fontWeight: '600',
    letterSpacing: '1px'
  },
  tituloFila: {
    fontSize: '1.3rem',
    color: '#2D3A2A',
    fontWeight: '400'
  },
  rightFila: {
    maxWidth: '50%'
  },
  descripcionFila: {
    fontSize: '0.95rem',
    color: '#8A857C',
    lineHeight: '1.5'
  },
  aviso: {
    color: '#8A857C',
    fontStyle: 'italic',
    padding: '2rem 0'
  }
};

export default Proposito;