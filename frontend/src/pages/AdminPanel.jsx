import { useState, useEffect } from 'react';
import clienteAxios from '../api/axios';

const AdminPanel = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [seccionPrincipal, setSeccionPrincipal] = useState('cuerpo');
  const [subSeccion, setSubSeccion] = useState('nutricion');
  
  // NUEVO ESTADO: Para listar y administrar los contenidos existentes
  const [todosLosContenidos, setTodosLosContenidos] = useState([]);

  // 1. LEER TODOS LOS RECURSOS DE MONGO APENAS INICIA EL PANEL
  const traerContenidos = async () => {
    try {
      const { data } = await clienteAxios.get('/content');
      setTodosLosContenidos(data);
    } catch (error) {
      console.error("Error al traer los contenidos para el panel:", error);
    }
  };

  useEffect(() => {
    traerContenidos();
  }, []);

  const manejarCambioSeccion = (e) => {
    const seccion = e.target.value;
    setSeccionPrincipal(seccion);
    
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

  // 2. LOGICA PARA ENVIAR EL NUEVO RECURSO
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) return alert('No se encontró sesión de administrador activa.');

      const config = { headers: { Authorization: `Bearer ${token}` } };

      const nuevoRecurso = {
        title,
        description,
        section: seccionPrincipal,
        category: subSeccion
      };
      
      await clienteAxios.post('/content', nuevoRecurso, config);
      
      alert('¡Contenido guardado exitosamente! 🚀');
      setTitle('');
      setDescription('');
      
      // Recargamos la lista en pantalla para que aparezca el nuevo artículo recién creado
      traerContenidos();
    } catch (error) {
      alert(error.response?.data?.message || 'Error al guardar el recurso.');
    }
  };

  // 3. NUEVA LÓGICA: BORRAR RECURSO CON MIDDLEWARE DE SEGURIDAD
  const handleEliminar = async (id, tituloItem) => {
    // Un cartel nativo de confirmación para evitar clicks accidentales
    const confirmar = window.confirm(`¿Estás segura de que querés eliminar definitivamente: "${tituloItem}"?`);
    if (!confirmar) return;

    try {
      const token = localStorage.getItem('adminToken');
      const config = { headers: { Authorization: `Bearer ${token}` } };

      await clienteAxios.delete(`/content/${id}`, config);
      
      alert('Contenido eliminado.');
      
      // Refrescamos el estado filtrando el item borrado para que desaparezca al toque de la UI
      setTodosLosContenidos(todosLosContenidos.filter(item => item._id !== id));
    } catch (error) {
      alert(error.response?.data?.message || 'Error al intentar eliminar el recurso.');
    }
  };

  return (
    <div style={styles.container}>
      {/* SECCIÓN A: FORMULARIO DE CARGA */}
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

        <label style={styles.label}>¿A qué Sección va?</label>
        <select style={styles.select} value={seccionPrincipal} onChange={manejarCambioSeccion}>
          <option value="cuerpo">Sección Cuerpo</option>
          <option value="mente">Sección Mente</option>
          <option value="proposito">Sección Propósito</option>
          <option value="acompañantes">Sección Acompañantes</option>
        </select>

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

      {/* SECCIÓN B: TABLA / LISTADO DE MODERACIÓN DE CONTENIDOS EN VIVO */}
      <div style={styles.listSection}>
        <h3 style={styles.listTitle}>Material Publicado Activo ({todosLosContenidos.length})</h3>
        <p style={styles.listSubtitle}>Acá podés revisar todo lo que está subido a la web y eliminar lo que ya no sirva o esté desactualizado.</p>
        
        <div style={styles.tableWrapper}>
          {todosLosContenidos.length === 0 ? (
            <p style={{ color: '#8A857C', fontStyle: 'italic' }}>No hay contenidos cargados en la base de datos.</p>
          ) : (
            todosLosContenidos.map((item) => (
              <div key={item._id} style={styles.row}>
                <div style={styles.rowInfo}>
                  <div style={styles.badgeWrapper}>
                    <span style={styles.sectionBadge}>{item.section}</span>
                    <span style={styles.categoryBadge}>{item.category}</span>
                  </div>
                  <h4 style={styles.itemTitle}>{item.title}</h4>
                  <p style={styles.itemDesc}>{item.description}</p>
                </div>
                <button 
                  onClick={() => handleEliminar(item._id, item.title)} 
                  style={styles.deleteBtn}
                >
                  ELIMINAR
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#FAF8F5', padding: '4rem 2rem', gap: '4rem' },
  form: { backgroundColor: '#FFF', padding: '3.5rem', borderRadius: '4px', border: '1px solid #EAE6DF', width: '100%', maxWidth: '540px', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' },
  sub: { color: '#7B3E3E', fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '0.5rem', textAlign: 'center' },
  title: { fontSize: '2.2rem', fontWeight: '300', color: '#2D3A2A', marginBottom: '2.5rem', textAlign: 'center', margin: 0 },
  label: { fontSize: '0.8rem', fontWeight: 'bold', color: '#8A857C', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' },
  input: { padding: '12px', marginBottom: '1.8rem', border: '1px solid #EAE6DF', borderRadius: '4px', outline: 'none', fontSize: '1rem', fontFamily: 'inherit' },
  textarea: { padding: '12px', marginBottom: '1.8rem', border: '1px solid #EAE6DF', borderRadius: '4px', outline: 'none', fontSize: '1rem', minHeight: '120px', resize: 'none', fontFamily: 'inherit' },
  select: { padding: '12px', marginBottom: '1.8rem', border: '1px solid #EAE6DF', borderRadius: '4px', outline: 'none', fontSize: '1rem', color: '#2D3A2A', backgroundColor: '#fff', fontFamily: 'inherit' },
  btn: { padding: '14px', backgroundColor: '#7B3E3E', color: '#FFF', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem', fontWeight: '600', marginTop: '1rem' },
  
  // Estilos del panel de control/moderación de abajo
  listSection: { backgroundColor: '#FFF', padding: '3.5rem', borderRadius: '4px', border: '1px solid #EAE6DF', width: '100%', maxWidth: '900px', boxSizing: 'border-box' },
  listTitle: { fontSize: '1.8rem', fontWeight: '300', color: '#2D3A2A', margin: '0 0 0.5rem 0' },
  listSubtitle: { fontSize: '0.95rem', color: '#8A857C', margin: '0 0 2.5rem 0', lineHeight: '1.5' },
  tableWrapper: { display: 'flex', flexDirection: 'column' },
  row: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 0', borderBottom: '1px solid #EAE6DF', gap: '2rem' },
  rowInfo: { display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 },
  badgeWrapper: { display: 'flex', gap: '0.5rem' },
  sectionBadge: { fontSize: '0.65rem', fontWeight: 'bold', backgroundColor: '#2D3A2A', color: '#FFF', padding: '2px 8px', borderRadius: '3px', textTransform: 'uppercase', letterSpacing: '0.5px' },
  categoryBadge: { fontSize: '0.65rem', fontWeight: 'bold', backgroundColor: '#FAF8F5', color: '#8A857C', border: '1px solid #EAE6DF', padding: '2px 8px', borderRadius: '3px', textTransform: 'uppercase', letterSpacing: '0.5px' },
  itemTitle: { fontSize: '1.2rem', fontWeight: '400', color: '#2D3A2A', margin: 0 },
  itemDesc: { fontSize: '0.9rem', color: '#666', margin: 0, lineHeight: '1.4' },
  deleteBtn: { backgroundColor: 'transparent', color: '#7B3E3E', border: '1px solid #7B3E3E', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '1px', transition: 'all 0.2s ease', ':hover': { backgroundColor: '#7B3E3E', color: '#FFF' } }
};

export default AdminPanel;