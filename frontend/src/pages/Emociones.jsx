import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import clienteAxios from '../api/axios';

const Emociones = () => {
  const [articulos, setArticulos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarContenido = async () => {
      try {
        const { data } = await clienteAxios.get('/content');
        const filtrados = data.filter(
          item => item.section === 'mente' && item.category === 'emociones'
        );
        setArticulos(filtrados);
      } catch (error) {
        console.error("Error al cargar Emociones:", error);
      } finally {
        setLoading(false);
      }
    };
    cargarContenido();
  }, []);

  return (
    <div style={styles.container}>
      <Link to="/pacientes/mente" style={styles.volverLink}>← VOLVER A MENTE</Link>
      <header style={styles.header}>
        <span style={styles.subtitulo}>JOSEFINA BRUNET</span>
        <h1 style={styles.titulo}>Emociones</h1>
        <p style={styles.bajada}>Prácticas de gestión emocional, identificación de disparadores y técnicas para volver al centro.</p>
      </header>

      <div style={styles.listaArticulos}>
        {loading ? (
          <p style={styles.aviso}>Cargando recursos...</p>
        ) : articulos.length > 0 ? (
          articulos.map((art, index) => (
            <div key={art._id} style={styles.filaArticulo}>
              <div style={styles.leftFila}>
                <span style={styles.numeroFila}>{String(index + 1).padStart(2, '0')}</span>
                <span style={styles.tagFila}>GESTIÓN</span>
                <span style={styles.tituloFila}>{art.title}</span>
              </div>
              <div style={styles.rightFila}>
                <span style={styles.descripcionFila}>{art.description}</span>
              </div>
            </div>
          ))
        ) : (
          <p style={styles.aviso}>No hay herramientas emocionales cargadas por el momento.</p>
        )}
      </div>
    </div>
  );
};

// Estilos compartidos (Tono Tierra #DCA88A)
const styles = {
  container: { padding: '4rem 10%', backgroundColor: '#FAF8F5', minHeight: 'calc(100vh - 70px)', fontFamily: 'sans-serif' },
  volverLink: { textDecoration: 'none', color: '#DCA88A', fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '1px', display: 'inline-block', marginBottom: '2rem' },
  header: { marginBottom: '4rem', maxWidth: '700px' },
  subtitulo: { fontSize: '0.75rem', letterSpacing: '2px', color: '#DCA88A', fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' },
  titulo: { fontSize: '3.5rem', fontWeight: '300', color: '#2D3A2A', margin: '0 0 1.5rem 0', lineHeight: '1.1' },
  bajada: { fontSize: '1.15rem', color: '#666', lineHeight: '1.6', margin: 0 },
  listaArticulos: { borderTop: '2px solid #2D3A2A', marginTop: '2rem' },
  filaArticulo: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2rem 0', borderBottom: '1px solid #EAE6DF' },
  leftFila: { display: 'flex', alignItems: 'center', gap: '2.5rem' },
  numeroFila: { fontSize: '0.9rem', color: '#8A857C', fontWeight: '500' },
  tagFila: { fontSize: '0.7rem', color: '#DCA88A', border: '1px solid #DCA88A', padding: '4px 14px', borderRadius: '15px', fontWeight: '600', letterSpacing: '1px' },
  tituloFila: { fontSize: '1.3rem', color: '#2D3A2A', fontWeight: '400' },
  rightFila: { maxWidth: '50%' },
  descripcionFila: { fontSize: '0.95rem', color: '#8A857C', lineHeight: '1.5' },
  aviso: { color: '#8A857C', fontStyle: 'italic', padding: '2rem 0' }
};

export default Emociones;