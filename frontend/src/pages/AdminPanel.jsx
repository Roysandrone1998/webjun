import { useState } from 'react';
import clienteAxios from '../api/axios';

const AdminPanel = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // --- ÁRBOL DE CATEGORÍAS CORREGIDO (TU LOGICA EXACTA) ---
  const [seccionPrincipal, setSeccionPrincipal] = useState('cuerpo');
  const [subSeccion, setSubSeccion] = useState('nutricion');

  // Control dinámico de las subsecciones según la sección principal elegida
  const manejarCambioSeccion = (e) => {
    const seccion = e.target.value;
    setSeccionPrincipal(seccion);
    
    // Seteamos la subsección por defecto de cada una para que nunca viaje vacía
    if (seccion === 'cuerpo') {
      setSubSeccion('nutricion');
    } else if (seccion === 'mente') {
      setSubSeccion('emociones');
    } else if (seccion === 'proposito') {
      setSubSeccion('proposito-general');
    } else if (seccion === 'acompañantes') {
      setSubSeccion('herramientas');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) return alert('No se encontró sesión de administrador activa.');

      const config = { headers: { Authorization: `Bearer ${token}` } };

      const nuevoRecurso = {
        title,
        description,
        section: seccionPrincipal, // cuerpo, mente, proposito, acompañantes
        category: subSeccion       // nutricion, movimiento, emociones, mirada-medica, sintomatologia, proposito-general, herramientas, informes
      };
      
      await clienteAxios.post('/content', nuevoRecurso, config);
      
      alert('¡Contenido guardado exitosamente en MongoDB! 🚀');
      setTitle('');
      setDescription('');
    } catch (error) {
      alert(error.response?.data?.message || 'Error al guardar el recurso.');
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <span style={styles.sub}>GESTOR DE CONTENIDOS PRIVADO</span>
        <h2 style={styles.title}>Cargar Nuevo Material</h2>

        <label style={styles.label}>Título</label>
        <input 
          style={styles.input} 
          placeholder="Ej: Plan alimentario basal / Meditación guiada" 
          value={title} onChange={(e) => setTitle(e.target.value)} required 
        />

        <label style={styles.label}>Contenido o Descripción corta</label>
        <textarea 
          style={styles.textarea} 
          placeholder="Ingresá el texto, notas o resumen aquí..." 
          value={description} onChange={(e) => setDescription(e.target.value)} required 
        />

        {/* SELECTOR 1: SECCIÓN PRINCIPAL */}
        <label style={styles.label}>¿A qué Sección va?</label>
        <select style={styles.select} value={seccionPrincipal} onChange={manejarCambioSeccion}>
          <option value="cuerpo">Sección Cuerpo</option>
          <option value="mente">Sección Mente</option>
          <option value="proposito">Sección Propósito</option>
          <option value="acompañantes">Sección Acompañantes</option>
        </select>

        {/* SELECTOR 2: SUBSECCIONES EXACTAS */}
        <label style={styles.label}>¿A qué Subsección pertenece?</label>
        
        {seccionPrincipal === 'cuerpo' && (
          <select style={styles.select} value={subSeccion} onChange={(e) => setSubSeccion(e.target.value)}>
            <option value="nutricion">Nutrición</option>
            <option value="movimiento">Movimiento</option>
          </select>
        )}

        {seccionPrincipal === 'mente' && (
          <select style={styles.select} value={subSeccion} onChange={(e) => setSubSeccion(e.target.value)}>
            <option value="emociones">Emociones</option>
            <option value="mirada-medica">Mirada Médica</option>
            <option value="sintomatologia">Sintomatología</option>
          </select>
        )}

        {seccionPrincipal === 'proposito' && (
          <select style={styles.select} value={subSeccion} onChange={(e) => setSubSeccion(e.target.value)}>
            <option value="proposito-general">Única (Contenido de Propósitos)</option>
          </select>
        )}

        {seccionPrincipal === 'acompañantes' && (
          <select style={styles.select} value={subSeccion} onChange={(e) => setSubSeccion(e.target.value)}>
            <option value="herramientas">Herramientas</option>
            <option value="informes">Informes</option>
          </select>
        )}

        <button type="submit" style={styles.btn}>Guardar y Publicar</button>
      </form>
    </div>
  );
};

const styles = {
  container: { minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FAF8F5', padding: '3rem 0' },
  form: { backgroundColor: '#FFF', padding: '3.5rem', borderRadius: '4px', border: '1px solid #EAE6DF', width: '540px', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' },
  sub: { color: '#7B3E3E', fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '0.5rem', textAlign: 'center' },
  title: { fontSize: '2.2rem', fontWeight: '300', color: '#2D3A2A', marginBottom: '2.5rem', textAlign: 'center', margin: 0 },
  label: { fontSize: '0.8rem', fontWeight: 'bold', color: '#8A857C', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' },
  input: { padding: '12px', marginBottom: '1.8rem', border: '1px solid #EAE6DF', borderRadius: '4px', outline: 'none', fontSize: '1rem', fontFamily: 'inherit' },
  textarea: { padding: '12px', marginBottom: '1.8rem', border: '1px solid #EAE6DF', borderRadius: '4px', outline: 'none', fontSize: '1rem', minHeight: '120px', resize: 'none', fontFamily: 'inherit' },
  select: { padding: '12px', marginBottom: '1.8rem', border: '1px solid #EAE6DF', borderRadius: '4px', outline: 'none', fontSize: '1rem', color: '#2D3A2A', backgroundColor: '#fff', fontFamily: 'inherit' },
  btn: { padding: '14px', backgroundColor: '#7B3E3E', color: '#FFF', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem', fontWeight: '600', marginTop: '1rem' }
};

export default AdminPanel;