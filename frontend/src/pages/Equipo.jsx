import { Link } from 'react-router-dom';

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
      
      {/* SECCIÓN 1: CABECERA BLANCA (Muchas miradas. Un solo enfoque.) */}
      <section style={styles.headerSeccion}>
        <div style={styles.headerContenedor}>
          <div style={styles.colMinima}>
            <span style={styles.tagElEquipo}>EL EQUIPO</span>
          </div>
          <div style={styles.colPrincipal}>
            <h1 style={styles.principalTitulo}>
              Muchas miradas.<br />
              Un solo <span style={styles.bordoText}>enfoque.</span>
            </h1>
            <p style={styles.principalSubtitulo}>
              Cada miembro del equipo aporta una mirada. Y cada uno tiene un color que lo acompaña 
              — crea identidad individual y, al mismo tiempo, unidad de marca.
            </p>
          </div>
        </div>
      </section>

      {/* SECCIÓN 2: BLOQUE BORDÓ (Cómo nació QNH) */}
      <section style={styles.bloqueBordo}>
        <div style={styles.bordoContenedor}>
          
          {/* Columna Izquierda: Título grande */}
          <div style={styles.bordoColIzquierda}>
            <span style={styles.bordoSubtitulo}>CÓMO NACIÓ QNH</span>
            <h2 style={styles.bordoFrase}>
              Este espacio nació cuando <span style={styles.italicText}>yo también</span> necesité compañía.
            </h2>
          </div>

          {/* Columna Derecha: Relato en dos párrafos */}
          <div style={styles.bordoColDerecha}>
            <p style={styles.bordoParrafo}>
              Acompañé a Martín, el padre de mi hija, durante su enfermedad crónica y su final de vida. 
              En ese camino entendí algo que nadie me había dicho: que muchas veces uno no encuentra 
              herramientas para transitar esos procesos.
            </p>
            <p style={styles.bordoParrafo}>
              Con el tiempo entendí que la pregunta — <span style={styles.italicText}>¿qué necesitás que haga?</span> 
              — también podía ser un espacio para otros. Un lugar donde atravesar procesos de vida sin 
              apuro y sin soledad.
            </p>
            <span style={styles.firmaFundadora}>CECILIA MOREIRA · FUNDADORA</span>
          </div>

        </div>
      </section>

      {/* SECCIÓN 3: GRID DE TARJETAS DE MÉDICOS */}
      <section style={styles.seccionGrid}>
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
      </section>

    </div>
  );
};

const styles = {
  container: { backgroundColor: '#FAF8F5', minHeight: '100vh', paddingBottom: '6rem', fontFamily: 'sans-serif' },
  
  // --- Estilos Sección 1 (Header Blanco) ---
  headerSeccion: { backgroundColor: '#FAF8F5', padding: '8rem 10% 6rem 10%' },
  headerContenedor: { maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '4rem' },
  colMinima: { width: '150px', flexShrink: 0 },
  tagElEquipo: { color: '#7B2E2E', fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '2px' },
  colPrincipal: { flexGrow: 1, maxWidth: '750px' },
  principalTitulo: { fontSize: '3.6rem', fontWeight: '300', color: '#2D3A2A', margin: '0 0 2rem 0', lineHeight: '1.1' },
  bordoText: { color: '#7B2E2E', fontStyle: 'italic' },
  principalSubtitulo: { fontSize: '1.2rem', color: '#8A857C', lineHeight: '1.6', margin: 0 },

  // --- Estilos Sección 2 (Bloque Bordó) ---
  bloqueBordo: { backgroundColor: '#7B2E2E', padding: '6rem 10%' },
  bordoContenedor: { maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '5rem' },
  bordoColIzquierda: { flex: '1 1 450px', display: 'flex', flexDirection: 'column', gap: '1.5rem' },
  bordoSubtitulo: { color: '#FAF8F5', opacity: 0.6, fontSize: '0.7rem', fontWeight: 'bold', letterSpacing: '2px' },
  bordoFrase: { color: '#FAF8F5', fontSize: '2.6rem', fontWeight: '300', margin: 0, lineHeight: '1.25' },
  italicText: { fontStyle: 'italic', fontWeight: '400' },
  bordoColDerecha: { flex: '1 1 500px', display: 'flex', flexDirection: 'column', gap: '2rem', justifyContent: 'center' },
  bordoParrafo: { color: '#FAF8F5', opacity: 0.85, fontSize: '1.1rem', lineHeight: '1.7', margin: 0, fontWeight: '300' },
  firmaFundadora: { color: '#FAF8F5', opacity: 0.6, fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '1px', marginTop: '1rem' },

  // --- Estilos Sección 3 (Grid de Cards) ---
  seccionGrid: { padding: '6rem 10% 0 10%' },
  grid: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
    gap: '3rem', 
    maxWidth: '1200px',
    margin: '0 auto'
  },
  card: { 
    textDecoration: 'none', 
    backgroundColor: '#fff', 
    border: '1px solid #EAE6DF', 
    borderRadius: '4px', 
    overflow: 'hidden',
    transition: 'transform 0.2s ease',
    display: 'block'
  },
  imgWrapper: { width: '100%', height: '320px', backgroundColor: '#F3F0EC' },
  medicoImg: { width: '100%', height: '100%', objectFit: 'cover' },
  info: { padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  especialidadTag: { fontSize: '0.75rem', color: '#BA8D72', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: '600' },
  nombreMed: { fontSize: '1.5rem', color: '#2D3A2A', margin: 0, fontWeight: '400' },
  verMas: { fontSize: '0.8rem', fontWeight: '600', color: '#8A857C', marginTop: '1.5rem' }
};

export default Equipo;