import { useState, useEffect } from 'react';
import clienteAxios from '../api/axios';

const Acompañantes = () => {
  const [listaAcompañantes, setListaAcompañantes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar recursos desde MongoDB
  useEffect(() => {
    const fetchRecursos = async () => {
      try {
        const { data } = await clienteAxios.get('/content');
        // FILTRADO: Nos quedamos solo con los que pertenecen a la sección de acompañantes
        const filtrados = data.filter(item => item.section === 'acompañantes');
        setListaAcompañantes(filtrados);
      } catch (error) {
        console.error("Error al traer recursos del servidor", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecursos();
  }, []);

  // FILTRADO POR CATEGORÍA REAL (Coincide al 100% con tu AdminPanel nuevo)
  const herramientas = listaAcompañantes.filter(item => item.category === 'herramientas');
  const informes = listaAcompañantes.filter(item => item.category === 'informes');

  const renderFila = (item, index, esInforme) => (
    <div key={item._id} style={styles.fila}>
      <div style={styles.left}>
        {/* Generamos un índice visual autoincremental (01, 02...) */}
        <span style={styles.numero}>{String(index + 1).padStart(2, '0')}</span>
        <div style={styles.tagWrapper}>
          <span style={styles.tag}>
            {esInforme ? 'INFORME' : 'HERRAMIENTA'}
          </span>
        </div>
        <span style={styles.titulo}>{item.title}</span>
      </div>

      <div style={styles.right}>
        {/* Mostramos la descripción o contenido corto directo de la DB */}
        <span style={styles.descripcion}>{item.description}</span>
      </div>
    </div>
  );

  return (
    <div style={styles.container}>
      <div style={styles.listaContenedor}>
        
        {/* BLOQUE DE INFORMES */}
        <section style={styles.bloque}>
          <h2 style={styles.bloqueTitulo}>Informes</h2>
          <div style={styles.bloqueContenido}>
            {loading ? (
              <p style={styles.aviso}>Cargando informes...</p>
            ) : informes.length > 0 ? (
              informes.map((item, index) => renderFila(item, index, true))
            ) : (
              <p style={styles.aviso}>No hay informes publicados.</p>
            )}
          </div>
        </section>

        {/* BLOQUE DE HERRAMIENTAS */}
        <section style={styles.bloque}>
          <h2 style={styles.bloqueTitulo}>Herramientas</h2>
          <div style={styles.bloqueContenido}>
            {loading ? (
              <p style={styles.aviso}>Cargando herramientas...</p>
            ) : herramientas.length > 0 ? (
              herramientas.map((item, index) => renderFila(item, index, false))
            ) : (
              <p style={styles.aviso}>No hay herramientas publicadas.</p>
            )}
          </div>
        </section>

      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '4rem 10%',
    backgroundColor: '#FAF8F5',
    minHeight: 'calc(100vh - 80px)',
    fontFamily: 'sans-serif'
  },
  listaContenedor: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '4rem'
  },
  bloque: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  bloqueTitulo: {
    fontSize: '2rem',
    fontWeight: '300',
    color: '#2D3A2A',
    margin: 0,
    borderBottom: '2px solid #2D3A2A',
    paddingBottom: '0.5rem',
    width: 'fit-content'
  },
  bloqueContenido: {
    display: 'flex',
    flexDirection: 'column'
  },
  fila: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '2rem 0',
    borderBottom: '1px solid #EAE6DF'
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    gap: '3rem'
  },
  numero: {
    fontSize: '0.9rem',
    color: '#8A857C',
    fontWeight: '500'
  },
  tagWrapper: {
    width: '120px',
  },
  tag: {
    fontSize: '0.7rem',
    color: '#8A857C',
    border: '1px solid #8A857C',
    padding: '4px 12px',
    borderRadius: '15px',
    fontWeight: '500',
    letterSpacing: '1px',
    textAlign: 'center',
    display: 'inline-block',
    width: '100%',
    boxSizing: 'border-box'
  },
  titulo: {
    fontSize: '1.4rem',
    color: '#2D3A2A',
    fontWeight: '400'
  },
  right: {
    maxWidth: '50%',
    textAlign: 'right'
  },
  descripcion: {
    fontSize: '0.95rem',
    color: '#8A857C',
    lineHeight: '1.5'
  },
  aviso: {
    color: '#8A857C',
    fontStyle: 'italic',
    padding: '1rem 0'
  }
};

export default Acompañantes;