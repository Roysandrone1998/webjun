const Home = () => {
  return (
    <main style={styles.mainContainer}>
      
      {/* SECCIÓN 1: HERO (Imagen de nubes y frase principal) */}
      <section style={styles.heroSection}>
        <div style={styles.overlayContent}>
          <p style={styles.prefrase}>¿Qué</p>
          <h1 style={styles.mainFrase}>necesitás</h1>
          <p style={styles.postfrase}>hoy?</p>
          
          <div style={styles.separatorHero}></div>
          
          <p style={styles.subtextHero}>La salida es adentro.</p>
          <p style={styles.subtextItalicHero}>Y no tenés que ir solo.</p>
        </div>
      </section>

      {/* SECCIÓN 2: BORDO (Frase de impacto con el color profundo de marca) */}
      <section style={styles.bordoSection}>
        <div style={styles.bordoContent}>
          <p style={styles.bordoPrefrase}>Un espacio de contención holística</p>
          <h2 style={styles.bordoFrase}>Abrazar el proceso, sanar desde la raíz.</h2>
          <div style={styles.separatorBordo}></div>
          <p style={styles.bordoSubtext}>
            Acompañamos tu camino integrando cuerpo, mente, nutrición y propósito.
          </p>
        </div>
      </section>

      {/* SECCIÓN 3: FUTURA SECCIÓN (Espacio preparado para lo que siga abajo) */}
      {/* 
      <section style={styles.nextSection}>
         Acá podés meter las grillas de equipo, áreas o tarjetas más adelante 
      </section> 
      */}

    </main>
  );
};

const styles = {
  mainContainer: {
    width: '100%',
    boxSizing: 'border-box'
  },
  
  /* ==================== SECCIÓN 1: HERO ==================== */
  heroSection: {
    height: '100vh',
    width: '100%',
    backgroundImage: "url('/cielo.jpg')", // Ajustá si usás subcarpeta como /img/cielo.jpg
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: '#3B1D28' // Texto en Bordo sobre fondo claro
  },
  overlayContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0 20px',
    paddingTop: '80px' // Espacio para que la Navbar fija no tape el texto
  },
  prefrase: {
    fontSize: '1.2rem',
    fontStyle: 'italic',
    margin: 0,
    opacity: 0.8
  },
  mainFrase: {
    fontSize: '5rem',
    fontWeight: '300',
    margin: '0.2rem 0',
    letterSpacing: '-1px',
    fontStyle: 'italic'
  },
  postfrase: {
    fontSize: '1.2rem',
    fontStyle: 'italic',
    margin: 0,
    opacity: 0.8
  },
  separatorHero: {
    width: '40px',
    height: '1px',
    backgroundColor: '#3B1D28',
    margin: '2rem 0',
    opacity: 0.4
  },
  subtextHero: {
    fontSize: '1.3rem',
    margin: '0.2rem 0',
    fontWeight: '400'
  },
  subtextItalicHero: {
    fontSize: '1.3rem',
    margin: '0.2rem 0',
    fontStyle: 'italic',
    fontWeight: '400'
  },

  /* ==================== SECCIÓN 2: BORDO ==================== */
  bordoSection: {
    minHeight: '80vh', // O 100vh si querés que vuelva a ocupar la pantalla entera
    width: '100%',
    backgroundColor: '#3B1D28', // Color Bordo oficial (Fondos oscuros / impacto)
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: '6rem 20px',
    boxSizing: 'border-box'
  },
  bordoContent: {
    maxWidth: '800px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  bordoPrefrase: {
    color: '#D4A882', // Terracota claro para acentos suaves
    fontSize: '1.1rem',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    fontWeight: '500',
    margin: 0
  },
  bordoFrase: {
    color: '#F7F4F2', // Crema para máxima legibilidad sobre fondo oscuro
    fontSize: '3.2rem',
    fontWeight: '300',
    fontStyle: 'italic',
    margin: '1.5rem 0',
    lineHeight: '1.2'
  },
  separatorBordo: {
    width: '60px',
    height: '1px',
    backgroundColor: '#ECE6E3', // Arena para el separador sutil
    margin: '1.5rem 0',
    opacity: 0.3
  },
  bordoSubtext: {
    color: '#ECE6E3', // Arena para texto secundario
    fontSize: '1.2rem',
    fontWeight: '300',
    lineHeight: '1.6',
    maxWidth: '600px',
    margin: 0
  }
};

export default Home;