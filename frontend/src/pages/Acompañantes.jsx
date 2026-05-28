// src/pages/Acompañantes.jsx
import { Link } from 'react-router-dom';

const Acompañantes = () => {
  const listaAcompañantes = [
    { id: '01', tag: 'HERRAMIENTA', titulo: 'Cómo acompañar sin desaparecer', autor: 'Cecilia Moreira' },
    { id: '02', tag: 'HERRAMIENTA', titulo: 'Pedir ayuda también es cuidar', autor: 'Equipo QNH' },
    { id: '03', tag: 'INFORME', titulo: 'El impacto del diagnóstico en los vínculos', autor: 'Cecilia - Josefina' },
    { id: '04', tag: 'INFORME', titulo: 'Cuándo el cansancio del acompañante alerta', autor: 'Equipo QNH' },
    { id: '05', tag: 'NOTAS', titulo: 'Notas para quienes acompañan', autor: 'Cecilia Moreira' },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.listaContenedor}>
        {listaAcompañantes.map((item) => (
          <div key={item.id} style={styles.fila}>
            
            <div style={styles.left}>
              <span style={styles.numero}>{item.id}</span>
              <div style={styles.tagWrapper}>
                <span style={styles.tag}>{item.tag}</span>
              </div>
              <span style={styles.titulo}>{item.titulo}</span>
            </div>

            <div style={styles.right}>
              <span style={styles.autor}>{item.autor}</span>
              <Link to={`/acompañante/${item.id}`} style={styles.linkAbrir}>
                ABRIR →
              </Link>
            </div>

          </div>
        ))}
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
    margin: '0 auto'
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
    width: '120px', // Ancho fijo para que los títulos queden alineados
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
    display: 'inline-block'
  },
  titulo: {
    fontSize: '1.4rem',
    color: '#2D3A2A',
    fontWeight: '400'
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: '5rem'
  },
  autor: {
    fontSize: '0.9rem',
    color: '#8A857C',
    minWidth: '120px',
    textAlign: 'right'
  },
  linkAbrir: {
    textDecoration: 'none',
    fontSize: '0.8rem',
    fontWeight: '600',
    color: '#8A857C',
    letterSpacing: '1px'
  }
};

export default Acompañantes;