import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../api/axios';

const MiQNH = () => {
  const navigate = useNavigate();

  // --- ESTADOS DE LA INTERFAZ Y NAVEGACIÓN ---
  const [pestaña, setPestaña] = useState('agenda');
  const [usuario, setUsuario] = useState(null);

  // --- ESTADOS DEL CALENDARIO DINÁMICO ---
  // Iniciamos el calendario en el mes y año actuales reales
  const [fechaActual, setFechaActual] = useState(new Date());
  const [appointments, setAppointments] = useState([]); // Turnos que vienen del Back

  // --- ESTADOS DE FORMULARIOS Y MODALES ---
  const [nota, setNota] = useState('');
  const [pregunta, setPregunta] = useState('');
  const [diaSeleccionado, setDiaSeleccionado] = useState(null); // Guardará el número de día al hacer clic

  const [nuevoTextoCita, setNuevoTextoCita] = useState('');
  const [nuevaHoraCita, setNuevaHoraCita] = useState('10:00');
  const [nuevoTipoCita, setNuevoTipoCita] = useState('Cita médica');

  const [listaPreguntas, setListaPreguntas] = useState([
    { id: 1, fecha: 'Preparando el encuentro', texto: '¿Cómo afecta el cansancio físico a la gestión emocional?' }
  ]);
  const [listaDiario, setListaDiario] = useState([]);

  // --- 1. EFECTO: CARGAR EL USUARIO AL ENTRAR ---
  useEffect(() => {
    const userStorage = localStorage.getItem('user');
    if (userStorage) {
      try {
        setUsuario(JSON.parse(userStorage));
      } catch (error) {
        console.error("Error parseando el usuario", error);
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  // --- 2. EFECTO: CARGAR APPOINTMENTS (AGENDA) CUANDO CAMBIA EL MES/AÑO ---
  const cargarAppointments = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const mes = fechaActual.getMonth() + 1; // JS cuenta de 0 a 11
      const anio = fechaActual.getFullYear();

      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      // Hacemos el GET pasando query params: /api/appointments?month=5&year=2026
      const { data } = await clienteAxios.get(`/appointments?month=${mes}&year=${anio}`, config);
      setAppointments(data);
    } catch (error) {
      console.error("Error al cargar la agenda:", error);
    }
  };

  useEffect(() => {
    if (pestaña === 'agenda') {
      cargarAppointments();
    }
  }, [pestaña, fechaActual]);

  // --- 3. EFECTO: CARGAR LAS NOTAS DEL DIARIO ---
  useEffect(() => {
    if (pestaña === 'diario') {
      const cargarNotas = async () => {
        try {
          const token = localStorage.getItem('token');
          if (!token) return;
          const config = { headers: { Authorization: `Bearer ${token}` } };
          const { data } = await clienteAxios.get('/notes', config);
          setListaDiario(data);
        } catch (error) {
          console.error("Error al cargar notas:", error);
        }
      };
      cargarNotas();
    }
  }, [pestaña]);

  // --- LÓGICA DE NAVEGACIÓN DEL CALENDARIO ---
  const cambiarMes = (direccion) => {
    const nuevoMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth() + direccion, 1);
    setFechaActual(nuevoMes);
  };

  const irAlMesActual = () => {
    setFechaActual(new Date());
  };

  // --- CÁLCULOS MATEMÁTICOS DEL CALENDARIO (Explicación UTN 🎓) ---
  const anioActual = fechaActual.getFullYear();
  const mesActual = fechaActual.getMonth();

  // 1. Saber qué día de la semana arranca el mes (0: Dom, 1: Lun, etc.)
  // Ajustamos con (-1) o lógica personalizada para que el lunes sea el primer casillero
  const primerDiaIndex = new Date(anioActual, mesActual, 1).getDay();
  const indexAjustado = primerDiaIndex === 0 ? 6 : primerDiaIndex - 1; // Mapea para que LUN sea 0 y DOM sea 6

  // 2. Saber cuántos días reales tiene el mes en curso
  const totalDiasEnMes = new Date(anioActual, mesActual + 1, 0).getDate();

  // 3. Armamos el array combinando los casilleros vacíos del principio (null) + los números de los días
  const celdasCalendario = [];
  for (let i = 0; i < indexAjustado; i++) {
    celdasCalendario.push(null);
  }
  for (let d = 1; d <= totalDiasEnMes; d++) {
    celdasCalendario.push(d);
  }

  // --- LÓGICA DE GUARDAR NUEVA CITA EN LA BASE DE DATOS ---
  const guardarAnotacionCalendario = async () => {
    if (!nuevoTextoCita.trim()) return;
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };

      // Armamos un string de fecha ISO limpio (YYYY-MM-DD) usando el día seleccionado en el modal
      const mesFormateado = String(mesActual + 1).padStart(2, '0');
      const diaFormateado = String(diaSeleccionado).padStart(2, '0');
      const dateStr = `${anioActual}-${mesFormateado}-${diaFormateado}`;

      const nuevaCitaBack = {
        title: nuevoTextoCita,
        time: nuevaHoraCita,
        category: nuevoTipoCita,
        dateStr: dateStr
      };

      const { data } = await clienteAxios.post('/appointments', nuevaCitaBack, config);
      
      // Añadimos el nuevo turno al estado local para refrescar los puntitos en vivo
      setAppointments([...appointments, data]);
      setNuevoTextoCita('');
      setDiaSeleccionado(null);
      alert('Turno anotado con éxito 📌');
    } catch (error) {
      console.error(error);
      alert('Error al guardar el turno');
    }
  };

  // --- MANEJO DE GUARDADO DIARIO/PREGUNTAS ---
  const manejarGuardar = async (tipo) => {
    if (tipo === 'diario') {
      if (!nota.trim()) return;
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const nuevaNotaParaDB = {
          content: nota,
          dateStr: new Date().toLocaleString('es-AR', { dateStyle: 'long' }).toUpperCase()
        };
        const { data } = await clienteAxios.post('/notes', nuevaNotaParaDB, config);
        setListaDiario([data, ...listaDiario]);
        setNota('');
        alert('Entrada guardada en la nube ☁️');
      } catch (error) {
        alert('Error al guardar la nota');
      }
    } else if (tipo === 'preguntas') {
      if (!pregunta.trim()) return;
      const nuevaPregunta = { id: Date.now(), fecha: 'Dudas actuales', texto: pregunta };
      setListaPreguntas([nuevaPregunta, ...listaPreguntas]);
      setPregunta('');
      alert('Pregunta guardada');
    }
  };

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Obtener el nombre del mes en español para el título h3
  const nombreMes = fechaActual.toLocaleString('es-AR', { month: 'long' });

  return (
    <div style={styles.container}>
      {/* SIDEBAR IZQUIERDO */}
      <aside style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <div style={styles.avatarCircle}>
            {usuario ? usuario.name.charAt(0).toUpperCase() : '?'}
          </div>
          <h3 style={styles.userName}>{usuario ? usuario.name : 'Usuario'}</h3>
          <span style={styles.userDate}>EN QNH DESDE MAYO 2026</span>
        </div>
        <ul style={styles.menu}>
          <li style={pestaña === 'agenda' ? styles.itemActive : styles.item} onClick={() => setPestaña('agenda')}>Agenda</li>
          <li style={pestaña === 'diario' ? styles.itemActive : styles.item} onClick={() => setPestaña('diario')}>Diario</li>
          <li style={pestaña === 'recursos' ? styles.itemActive : styles.item} onClick={() => setPestaña('recursos')}>Recursos guardados</li>
          <li style={pestaña === 'preguntas' ? styles.itemActive : styles.item} onClick={() => setPestaña('preguntas')}>Preguntas para citas</li>
        </ul>
        <button style={styles.btnCerrar} onClick={cerrarSesion}>Cerrar sesión</button>
      </aside>

      {/* CONTENIDO DERECHO */}
      <main style={styles.content}>
        
        {/* SECCIÓN: AGENDA DINÁMICA */}
        {pestaña === 'agenda' && (
          <div style={styles.tabContainer}>
            <header style={styles.agendaHeader}>
              <span style={styles.agendaSub}>TU AGENDA</span>
              <h2 style={styles.agendaMainTitle}>
                Próximos turnos. <span style={styles.italic}>Sin apuro.</span>
              </h2>
            </header>

            <div style={styles.calendarioWrapper}>
              <div style={styles.calendarioHeader}>
                {/* Título dinámico que cambia de mes y año */}
                <h3 style={styles.mesTitulo}>{nombreMes.toUpperCase()} {anioActual}</h3>
                <div style={styles.navCalendario}>
                  <button style={styles.btnNav} onClick={() => cambiarMes(-1)}>←</button>
                  <button style={styles.btnHoy} onClick={irAlMesActual}>Hoy</button>
                  <button style={styles.btnNav} onClick={() => cambiarMes(1)}>→</button>
                </div>
              </div>

              <div style={styles.gridCalendario}>
                {['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB', 'DOM'].map(dia => (
                  <div key={dia} style={styles.diaHeader}>{dia}</div>
                ))}
                
                {celdasCalendario.map((num, i) => {
                  // Verificamos si este día específico tiene un turno guardado en el array que trajo el Back
                  const tieneEventos = num && appointments.some(app => {
                    const appDate = new Date(app.date);
                    return appDate.getDate() === num && appDate.getMonth() === mesActual;
                  });

                  return (
                    <div 
                      key={i} 
                      style={{ ...styles.celdaDia, cursor: num ? 'pointer' : 'default' }}
                      onClick={() => num && setDiaSeleccionado(num)}
                    >
                      {num && <span style={styles.numeroDia}>{num}</span>}
                      {tieneEventos && <div style={styles.eventoPunto}></div>}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* MODAL AGENDA DINÁMICO */}
            {diaSeleccionado && (
              <div style={styles.overlay}>
                <div style={styles.modal}>
                  <button style={styles.closeBtn} onClick={() => setDiaSeleccionado(null)}>✕</button>
                  <span style={styles.modalSub}>DÍA {diaSeleccionado} · {nombreMes.toUpperCase()} {anioActual}</span>
                  <h3 style={styles.modalTitle}>Anotaciones</h3>
                  
                  <div style={styles.containerNotasExistentes}>
                    {/* Filtramos en vivo las citas que pertenecen a este casillero numérico */}
                    {appointments.filter(app => new Date(app.date).getDate() === diaSeleccionado).length > 0 ? (
                      appointments
                        .filter(app => new Date(app.date).getDate() === diaSeleccionado)
                        .map((cita) => (
                          <div key={cita._id} style={styles.notaExistente}>
                            <span style={styles.tipoCita}>{cita.category?.toUpperCase()} · {cita.time}</span>
                            <p style={styles.textoCita}>{cita.title}</p>
                          </div>
                        ))
                    ) : (
                      <p style={{ color: '#8A857C', fontStyle: 'italic', fontSize: '0.9rem' }}>No hay actividades para este día.</p>
                    )}
                  </div>

                  <div style={styles.formAgregar}>
                    <div style={styles.row}>
                      <input style={styles.inputModal} placeholder="Ej. Consulta con Sandra" value={nuevoTextoCita} onChange={(e) => setNuevoTextoCita(e.target.value)} />
                      <input style={styles.inputTime} type="time" value={nuevaHoraCita} onChange={(e) => setNuevaHoraCita(e.target.value)} />
                    </div>
                    <select style={styles.selectModal} value={nuevoTipoCita} onChange={(e) => setNuevoTipoCita(e.target.value)}>
                      <option value="Cita médica">Cita médica</option>
                      <option value="Movimiento consciente">Movimiento consciente</option>
                      <option value="Espacio personal">Espacio personal</option>
                    </select>
                    <button style={styles.btnAnotar} onClick={guardarAnotacionCalendario}>Anotar</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* SECCIÓN: DIARIO */}
        {pestaña === 'diario' && (
          <div style={styles.diarioContainer}>
            <div style={styles.inputCard}>
              <textarea placeholder="Hoy..." style={styles.textarea} value={nota} onChange={(e) => setNota(e.target.value)} />
              <div style={styles.footerInput}>
                <button onClick={() => manejarGuardar('diario')} style={styles.btnGuardar}>Guardar entrada</button>
              </div>
            </div>
            <div style={styles.historial}>
              {listaDiario.length > 0 ? (
                listaDiario.map(n => (
                  <div key={n._id} style={styles.entradaPrevia}>
                    <span style={styles.fechaHistorial}>{n.dateStr}</span>
                    <p style={styles.textoHistorial}>{n.content}</p>
                  </div>
                ))
              ) : (
                <p style={{ color: '#8A857C', fontStyle: 'italic' }}>No hay entradas en el diario todavía.</p>
              )}
            </div>
          </div>
        )}

        {/* SECCIÓN: PREGUNTAS */}
        {pestaña === 'preguntas' && (
          <div style={styles.diarioContainer}>
             <h2 style={styles.agendaMainTitle}>Preguntas para citas</h2>
             <textarea style={{...styles.textarea, height: '100px', border: '1px solid #EAE6DF'}} value={pregunta} onChange={(e) => setPregunta(e.target.value)} />
             <button onClick={() => manejarGuardar('preguntas')} style={styles.btnGuardar}>Guardar pregunta</button>
             <div style={styles.historial}>
                {listaPreguntas.map(p => (
                  <div key={p.id} style={styles.entradaPrevia}>
                    <p style={styles.textoHistorial}>{p.texto}</p>
                  </div>
                ))}
             </div>
          </div>
        )}

      </main>
    </div>
  );
};

const styles = {
  container: { display: 'flex', minHeight: '100vh', backgroundColor: '#FAF8F5' },
  sidebar: { width: '280px', backgroundColor: '#F3F0EC', padding: '4rem 2rem', display: 'flex', flexDirection: 'column', borderRight: '1px solid #EAE6DF' },
  sidebarHeader: { marginBottom: '3rem' },
  avatarCircle: { width: '45px', height: '45px', borderRadius: '50%', backgroundColor: '#7B3E3E', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#FFF', marginBottom: '1rem', fontSize: '1.2rem', fontWeight: 'bold' },
  userName: { fontSize: '1.5rem', fontWeight: '400', color: '#2D3A2A', margin: '0 0 0.5rem 0' },
  userDate: { fontSize: '0.65rem', color: '#BA8D72', letterSpacing: '1px', fontWeight: 'bold' },
  menu: { listStyle: 'none', padding: 0, margin: 0, flex: 1 },
  item: { padding: '1.2rem 0', cursor: 'pointer', color: '#8A857C', transition: '0.3s' },
  itemActive: { padding: '1.2rem 0', cursor: 'pointer', color: '#2D3A2A', fontWeight: 'bold', borderBottom: '1px solid #2D3A2A' },
  btnCerrar: { background: 'none', border: 'none', textAlign: 'left', color: '#7B3E3E', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 'bold' },
  content: { flex: 1, padding: '4rem 6%' },
  tabContainer: { maxWidth: '1000px' },
  agendaHeader: { marginBottom: '3.5rem' },
  agendaSub: { color: '#BA8D72', fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '2px' },
  agendaMainTitle: { fontSize: '3.2rem', fontWeight: '300', color: '#2D3A2A' },
  italic: { fontStyle: 'italic', color: '#7B3E3E' },
  calendarioWrapper: { backgroundColor: '#fff', border: '1px solid #EAE6DF' },
  calendarioHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2rem', borderBottom: '1px solid #EAE6DF' },
  mesTitulo: { fontSize: '1.8rem', fontWeight: '300', color: '#2D3A2A', margin: 0 },
  navCalendario: { display: 'flex', gap: '0.5rem' },
  btnNav: { padding: '0.5rem 1rem', border: '1px solid #EAE6DF', backgroundColor: '#fff', cursor: 'pointer', fontWeight: 'bold' },
  btnHoy: { padding: '0.5rem 1.5rem', border: '1px solid #EAE6DF', backgroundColor: '#fff', cursor: 'pointer', color: '#8A857C' },
  gridCalendario: { display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', backgroundColor: '#EAE6DF', gap: '1px' },
  diaHeader: { backgroundColor: '#F9F7F4', padding: '1rem', textAlign: 'center', fontSize: '0.7rem', color: '#8A857C', fontWeight: 'bold' },
  celdaDia: { backgroundColor: '#fff', minHeight: '100px', padding: '1rem', position: 'relative' },
  numeroDia: { fontSize: '0.9rem' },
  eventoPunto: { width: '8px', height: '8px', backgroundColor: '#7B3E3E', borderRadius: '50%', position: 'absolute', bottom: '10px', left: '10px' },
  overlay: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
  modal: { backgroundColor: '#fff', padding: '3rem', borderRadius: '4px', width: '450px', position: 'relative' },
  closeBtn: { position: 'absolute', top: '20px', right: '20px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '1.2rem' },
  modalSub: { color: '#7B3E3E', fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '1.5px' },
  modalTitle: { fontSize: '1.8rem', marginBottom: '2rem' },
  containerNotasExistentes: { maxHeight: '150px', overflowY: 'auto', marginBottom: '1.5rem' },
  notaExistente: { borderLeft: '3px solid #5B7485', paddingLeft: '1rem', marginBottom: '1.5rem' },
  tipoCita: { fontSize: '0.75rem', color: '#8A857C', fontWeight: 'bold' },
  textoCita: { fontSize: '1.1rem', margin: '4px 0', color: '#2D3A2A' },
  formAgregar: { borderTop: '1px solid #EAE6DF', paddingTop: '1.5rem' },
  row: { display: 'flex', gap: '10px', marginBottom: '12px' },
  inputModal: { flex: 1, padding: '12px', border: '1px solid #EAE6DF', borderRadius: '4px', fontSize: '0.95rem', outline: 'none' },
  inputTime: { width: '100px', padding: '12px', border: '1px solid #EAE6DF', borderRadius: '4px', fontSize: '0.95rem', outline: 'none' },
  selectModal: { width: '100%', padding: '12px', border: '1px solid #EAE6DF', borderRadius: '4px', fontSize: '0.95rem', marginBottom: '20px', outline: 'none' },
  btnAnotar: { width: '100%', padding: '14px', backgroundColor: '#7B3E3E', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem', fontWeight: '500' },
  diarioContainer: { maxWidth: '800px' },
  inputCard: { backgroundColor: '#fff', border: '1px solid #EAE6DF', padding: '2rem' },
  textarea: { width: '100%', border: 'none', outline: 'none', fontSize: '1.2rem', minHeight: '200px', resize: 'none' },
  btnGuardar: { backgroundColor: '#7B3E3E', color: '#fff', border: 'none', padding: '1rem 2rem', cursor: 'pointer', marginTop: '1rem' },
  historial: { marginTop: '3rem' },
  entradaPrevia: { borderBottom: '1px solid #EAE6DF', paddingBottom: '2rem', marginBottom: '2rem' },
  textoHistorial: { fontSize: '1.1rem', color: '#2D3A2A' }
};

export default MiQNH;