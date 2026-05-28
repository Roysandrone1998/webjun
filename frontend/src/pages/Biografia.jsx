// src/pages/Biografia.jsx
import { useParams } from 'react-router-dom';

const Biografia = () => {
  const { id } = useParams();

  // Diccionario de datos para las biografías
  const datosEquipo = {
    'sisi-izaguirre': {
      nombre: 'Sisi',
      subtitulo: 'QUIÉN SOY',
      descripcion: 'Acompaña procesos de vida desde el cuerpo, el movimiento consciente y la meditación, entendiendo al cuerpo como un espacio sensible que también recibe el impacto de lo que vivimos.',
      cita: 'En momentos difíciles, no se trata de exigir ni de forzar. Se trata de escuchar, sostener y permitir ir despacio.',
      foto: '/assets/sisi-editorial.jpg' // Reemplaza con tu imagen real
    },
    'sandra-ostoich': {
      nombre: 'Sandra',
      subtitulo: 'QUIÉN SOY',
      descripcion: 'Médica especialista en enfoques integrales de salud mental...',
      cita: 'La medicina es una herramienta para el bienestar humano.',
      foto: '/assets/sandra-editorial.jpg'
    },
    // Agregá el resto de los médicos aquí con el mismo formato
  };

  const persona = datosEquipo[id];

  if (!persona) return <div style={{ padding: '5rem' }}>Perfil no encontrado.</div>;

  return (
    <div style={styles.container}>
      {/* Columna Izquierda: Foto */}
      <div style={styles.colFoto}>
        <div style={styles.placeholderFoto}>
          {/* <img src={persona.foto} alt={persona.nombre} style={styles.img} /> */}
          <span style={styles.labelPlaceholder}>FOTO EDITORIAL · {persona.nombre.toUpperCase()}</span>
        </div>
      </div>

      {/* Columna Derecha: Texto */}
      <div style={styles.colTexto}>
        <span style={styles.subtitulo}>{persona.subtitulo}</span>
        <h1 style={styles.titulo}>Soy <span style={styles.italic}>{persona.nombre}.</span></h1>
        
        <p style={styles.descripcion}>
          {persona.descripcion}
        </p>

        <p style={styles.cita}>
          {persona.cita}
        </p>

        <button style={styles.botonAgendar}>
          Agendar una conversación
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    minHeight: 'calc(100vh - 80px)',
    backgroundColor: '#FAF8F5',
    fontFamily: 'serif', // Usá una fuente con serifa para que se parezca al diseño
  },
  colFoto: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
  },
  placeholderFoto: {
    width: '80%',
    height: '80%',
    backgroundColor: '#EAE6DF', // Color beige de fondo de la foto
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '4px'
  },
  labelPlaceholder: {
    color: '#8A857C',
    fontSize: '0.8rem',
    letterSpacing: '2px'
  },
  colTexto: {
    flex: 1,
    padding: '5rem 8% 5rem 2rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  subtitulo: {
    color: '#BA8D72', // Color tierra del "Quién soy"
    fontSize: '0.8rem',
    letterSpacing: '2px',
    fontWeight: 'bold',
    marginBottom: '1.5rem'
  },
  titulo: {
    fontSize: '4rem',
    fontWeight: '300',
    margin: '0 0 2rem 0',
    color: '#2D3A2A'
  },
  italic: {
    fontStyle: 'italic'
  },
  descripcion: {
    fontSize: '1.2rem',
    lineHeight: '1.8',
    color: '#555',
    marginBottom: '2rem',
    maxWidth: '500px'
  },
  cita: {
    fontSize: '1.2rem',
    lineHeight: '1.6',
    color: '#BA8D72',
    fontStyle: 'italic',
    marginBottom: '3rem',
    maxWidth: '500px'
  },
  botonAgendar: {
    width: 'fit-content',
    padding: '1rem 2rem',
    backgroundColor: 'transparent',
    border: '1px solid #CCC',
    borderRadius: '4px',
    cursor: 'pointer',
    color: '#555',
    fontSize: '0.9rem',
    transition: 'all 0.3s ease'
  }
};

export default Biografia;