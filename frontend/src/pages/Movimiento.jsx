import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import clienteAxios from '../api/axios';

const Movimiento = () => {
  const [articulosMovimiento, setArticulosMovimiento] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. TRAER LOS CONTENIDOS DESDE MONGO
  useEffect(() => {
    const cargarMovimiento = async () => {
      try {
        const { data } = await clienteAxios.get('/content');
        // Filtramos de forma exacta: Sección 'cuerpo' y categoría 'movimiento'
        const filtrados = data.filter(
          item => item.section === 'cuerpo' && item.category === 'movimiento'
        );
        setArticulosMovimiento(filtrados);
      } catch (error) {
        console.error("Error al cargar la sección de Movimiento:", error);
      } finally {
        setLoading(false);
      }
    };
    cargarMovimiento();
  }, []);

  return (
    <div style={styles.container}>
      {/* Botón para volver al panel de Cuerpo */}
      <Link to="/pacientes/cuerpo" style={styles.volverLink}>
        ← VOLVER A CUERPO
      </Link>

      {/* Cabecera de la sección */}
      <header style={styles.header}>
        <span style={styles.subtitulo}>SISI IZAGUIRRE</span>
        <h1 style={styles.titulo}>Movimiento</h1>
        <p style={styles.bajada}>
          Rutinas, enfoques prácticos e información sobre la actividad física y el movimiento consciente.
        </p>
      </header>

      {/* Listado dinámico de los informes/rutinas */}
      <div style={styles.listaArticulos}>
        {loading ? (
          <p style={styles.aviso}>Cargando recursos...</p>
        ) : articulosMovimiento.length > 0 ? (
          articulosMovimiento.map((art, index) => (
            <div key={art._id} style={styles.filaArticulo}>
              
              <div style={styles.leftFila}>
                <span style={styles.numeroFila}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span style={styles.tagFila}>PRÁCTICA</span>
                <span style={styles.tituloFila}>{art.title}</span>
              </div>

              <div style={styles.rightFila}>
                <span style={styles.descripcionFila}>{art.description}</span>
              </div>

            </div>
          ))
        ) : (
          <p style={styles.aviso}>
            No hay actividades ni guías de movimiento cargadas por el momento.
          </p>
        )}
      </div>
    </div>
  );
};

// Estilos adaptados milimétricamente al bloque de Movimiento
const styles = {
  container: { 
    padding: '4rem 10%', 
    backgroundColor: '#FAF8F5', 
    minHeight: 'calc(100vh - 70px)', 
    fontFamily: 'sans-serif' 
  },
  volverLink: {
    textDecoration: 'none',
    color: '#A6B09B',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    letterSpacing: '1px',
    display: 'inline-block',
    marginBottom: '2rem'
  },
  header: {
    marginBottom: '4rem',
    maxWidth: '700px'
  },
  subtitulo: {
    fontSize: '0.75rem',
    letterSpacing: '2px',
    color: '#A6B09B',
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
    color: '#A6B09B',
    border: '1px solid #A6B09B',
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

export default Movimiento;