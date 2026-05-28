import { Link } from 'react-router-dom';
// Si instalas swiper, importarías los componentes aquí. 
// Por ahora te armo la estructura base.

const Equipo = () => {
  const medicos = [
    { id: 'sandra-ostoich', nombre: 'Sandra Ostoich', especialidad: 'Mirada Médica', img: '/assets/sandra.jpg' },
    { id: 'yanina-galizzi', nombre: 'Yanina Galizzi', especialidad: 'Nutrición', img: '/assets/yanina.jpg' },
    { id: 'sisi-izaguirre', nombre: 'Sisi Izaguirre', especialidad: 'Movimiento', img: '/assets/sisi.jpg' },
    { id: 'josefina-brunet', nombre: 'Josefina Brunet', especialidad: 'Emociones', img: '/assets/josefina.jpg' },
    { id: 'ari-dell-aquila', nombre: 'Ari Dell’Aquila', especialidad: 'Energía', img: '/assets/ari.jpg' },
    { id: 'equipo-qnh', nombre: 'Equipo QNH', especialidad: 'Sintomatología', img: '/assets/equipo.jpg' },
  ];

  return (
    <div style={styles.container}>
      
      {/* SECCIÓN 1: CARRUSEL (Placeholder) */}
      <div style={styles.carruselContainer}>
        <div style={styles.carruselSlide}>
          <h2 style={styles.carruselText}>Nuestro Compromiso</h2>
          {/* Aquí irían las imágenes pasando */}
          <img src="https://via.placeholder.com/1200x400" alt="Banner Equipo" style={styles.carruselImg} />
        </div>
      </div>

      {/* SECCIÓN 2: GRID DE CARDS */}
      <div style={styles.grid}>
        {medicos.map((medico) => (
          <Link key={medico.id} to={`/equipo/${medico.id}`} style={styles.card}>
            <div style={styles.imgWrapper}>
              <img src={medico.img} alt={medico.nombre} style={styles.medicoImg} />
            </div>
            <div style={styles.info}>
              <span style={styles.especialidadTag}>{medico.especialidad}</span>
              <h3 style={styles.nombreMed}>{medico.nombre}</h3>
              <span style={styles.verMas}>VER BIOGRAFÍA →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: { backgroundColor: '#FAF8F5', minHeight: '100vh', paddingBottom: '4rem' },
  carruselContainer: { width: '100%', height: '400px', backgroundColor: '#5B7485', marginBottom: '4rem', overflow: 'hidden', position: 'relative' },
  carruselImg: { width: '100%', height: '100%', objectFit: 'cover', opacity: '0.6' },
  carruselText: { position: 'absolute', bottom: '10%', left: '10%', color: '#fff', fontSize: '3rem', fontWeight: '300', zIndex: 2 },
  
  grid: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
    gap: '2.5rem', 
    padding: '0 10%',
    maxWidth: '1400px',
    margin: '0 auto'
  },
  card: { 
    textDecoration: 'none', 
    backgroundColor: '#fff', 
    border: '1px solid #EAE6DF', 
    borderRadius: '8px', 
    overflow: 'hidden',
    transition: 'transform 0.3s ease',
    display: 'block'
  },
  imgWrapper: { width: '100%', height: '250px', backgroundColor: '#f0f0f0' },
  medicoImg: { width: '100%', height: '100%', objectFit: 'cover' },
  info: { padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  especialidadTag: { fontSize: '0.7rem', color: '#8A857C', letterSpacing: '1px', textTransform: 'uppercase' },
  nombreMed: { fontSize: '1.4rem', color: '#2D3A2A', margin: 0, fontWeight: '400' },
  verMas: { fontSize: '0.75rem', fontWeight: '600', color: '#BA8D72', marginTop: '1rem' }
};

export default Equipo;