import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../api/axios'; // Importación de tu cliente Axios configurado

const MiQNH = () => {
  const navigate = useNavigate();

  // --- ESTADOS DE LA INTERFAZ ---
  const [pestaña, setPestaña] = useState('agenda');
  const [usuario, setUsuario] = useState(null);

  // --- ESTADOS DE DATOS (DIARIO, PREGUNTAS, AGENDA) ---
  const [nota, setNota] = useState('');
  const [pregunta, setPregunta] = useState('');
  const [diaSeleccionado, setDiaSeleccionado] = useState(null);

  const [anotacionesCalendario, setAnotacionesCalendario] = useState({
    '2': [{ id: 1, tipo: 'Cita médica', hora: '10:00', texto: 'consulta con yani' }]
  });

  const [nuevoTextoCita, setNuevoTextoCita] = useState('');
  const [nuevaHoraCita, setNuevaHoraCita] = useState('10:00');
  const [nuevoTipoCita, setNuevoTipoCita] = useState('Cita médica');

  const [listaPreguntas, setListaPreguntas] = useState([
    { id: 1, fecha: 'Preparando el encuentro', texto: '¿Cómo afecta el cansancio físico a la gestión emocional?' }
  ]);

  // Iniciamos con array vacío para llenarlo dinámicamente desde el backend
  const [listaDiario, setListaDiario] = useState([]);

  // --- 1. EFECTO PARA CARGAR EL USUARIO AL ENTRAR ---
  useEffect(() => {
    const userStorage = localStorage.getItem('user');
    if (userStorage) {
      try {
        const userParsed = JSON.parse(userStorage);
        setUsuario(userParsed);
      } catch (error) {
        console.error("Error parseando el usuario", error);
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  // --- 2. EFECTO PARA CARGAR LAS NOTAS DESDE MONGODB ---
  useEffect(() => {
    if (pestaña === 'diario') {
      const cargarNotas = async () => {
        try {
          const token = localStorage.getItem('token');
          if (!token) return;

          const config = {
            headers: { Authorization: `Bearer ${token}` }
          };

          const { data } = await clienteAxios.get('/notes', config);
          setListaDiario(data); // Reemplazamos la lista por lo que viene de la DB
        } catch (error) {
          console.error("Error al cargar notas desde el servidor:", error);
        }
      };
      cargarNotas();
    }
  }, [pestaña]);

  // --- 3. LÓGICA DE CIERRE DE SESIÓN ---
  const cerrarSesion = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // --- 4. MANEJO DE GUARDADO (HACIA EL SERVER Y LOCAL) ---
  const manejarGuardar = async (tipo) => {
    if (tipo === 'diario') {
      if (!nota.trim()) return;
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };

        const nuevaNotaParaDB = {
          content: nota, // Coincide con tu esquema del Back
          dateStr: new Date().toLocaleString('es-AR', { dateStyle: 'long' }).toUpperCase()
        };

        // Guardamos en la base de datos de MongoDB
        const { data } = await clienteAxios.post('/notes', nuevaNotaParaDB, config);
        
        // El back nos devuelve la nota creada con su id de Mongo, la agregamos arriba de la lista
        setListaDiario([data, ...listaDiario]);
        setNota('');
        alert('Entrada del diario guardada en la nube ☁️');
      } catch (error) {
        console.error("Error al guardar la nota:", error);
        alert('Error al guardar la nota en el servidor');
      }
    } else if (tipo === 'preguntas') {
      if (!pregunta.trim()) return;
      const nuevaPregunta = {
        id: Date.now(),
        fecha: 'Dudas actuales',
        texto: pregunta
      };
      setListaPreguntas([nuevaPregunta, ...listaPreguntas]);
      setPregunta('');
      alert('Pregunta guardada correctamente');
    }
  };

  const guardarAnotacionCalendario = () => {
    if (!nuevoTextoCita.trim()) return;
    const nuevaCita = {
      id: Date.now(),
      tipo: nuevoTipoCita,
      hora: nuevaHoraCita,
      texto: nuevoTextoCita
    };
    const citasDelDia = anotacionesCalendario[diaSeleccionado] || [];
    setAnotacionesCalendario({
      ...anotacionesCalendario,
      [diaSeleccionado]: [...citasDelDia, nuevaCita]
    });
    setNuevoTextoCita('');
    setDiaSeleccionado(null);
  };

  const abrirModal = (num) => {
    if (!num) return;
    setDiaSeleccionado(num);
  };

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
        
        {/* SECCIÓN: AGENDA */}
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
                <h3 style={styles.mesTitulo}>Mayo 2026</h3>
              </div>
              <div style={styles.gridCalendario}>
                {['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB', 'DOM'].map(dia => (
                  <div key={dia} style={styles.diaHeader}>{dia}</div>
                ))}
                {[null, null, null, null, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31].map((num, i) => {
                  const tieneEventos = num && anotacionesCalendario[num]?.length > 0;
                  return (
                    <div 
                      key={i} 
                      style={{ ...styles.celdaDia, cursor: num ? 'pointer' : 'default' }}
                      onClick={() => abrirModal(num)}
                    >
                      {num && <span style={styles.numeroDia}>{num}</span>}
                      {tieneEventos && <div style={styles.eventoPunto}></div>}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* MODAL AGENDA */}
            {diaSeleccionado && (
              <div style={styles.overlay}>
                <div style={styles.modal}>
                  <button style={styles.closeBtn} onClick={() => setDiaSeleccionado(null)}>✕</button>
                  <span style={styles.modalSub}>DÍA {diaSeleccionado} · MAYO 2026</span>
                  <h3 style={styles.modalTitle}>Anotaciones</h3>
                  <div style={styles.containerNotasExistentes}>
                    {anotacionesCalendario[diaSeleccionado]?.map((cita) => (
                      <div key={cita.id} style={styles.notaExistente}>
                        <span style={styles.tipoCita}>{cita.tipo.toUpperCase()} · {cita.hora}</span>
                        <p style={styles.textoCita}>{cita.texto}</p>
                      </div>
                    ))}
                  </div>
                  <div style={styles.formAgregar}>
                    <input style={styles.inputModal} placeholder="Ej. Consulta médica" value={nuevoTextoCita} onChange={(e) => setNuevoTextoCita(e.target.value)} />
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
                  <div key={n._id || n.id} style={styles.entradaPrevia}>
                    <span style={styles.fechaHistorial}>{n.dateStr || n.fecha}</span>
                    <p style={styles.textoHistorial}>{n.content || n.texto}</p>
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
  calendarioHeader: { padding: '2rem', borderBottom: '1px solid #EAE6DF' },
  mesTitulo: { fontSize: '1.8rem', fontWeight: '300' },
  gridCalendario: { display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', backgroundColor: '#EAE6DF', gap: '1px' },
  diaHeader: { backgroundColor: '#F9F7F4', padding: '1rem', textAlign: 'center', fontSize: '0.7rem', color: '#8A857C' },
  celdaDia: { backgroundColor: '#fff', minHeight: '100px', padding: '1rem', position: 'relative' },
  numeroDia: { fontSize: '0.9rem' },
  eventoPunto: { width: '8px', height: '8px', backgroundColor: '#7B3E3E', borderRadius: '50%', position: 'absolute', bottom: '10px', left: '10px' },
  overlay: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
  modal: { backgroundColor: '#fff', padding: '3rem', borderRadius: '4px', width: '450px', position: 'relative' },
  closeBtn: { position: 'absolute', top: '20px', right: '20px', border: 'none', background: 'none', cursor: 'pointer' },
  modalTitle: { fontSize: '1.8rem', marginBottom: '2rem' },
  diarioContainer: { maxWidth: '800px' },
  inputCard: { backgroundColor: '#fff', border: '1px solid #EAE6DF', padding: '2rem' },
  textarea: { width: '100%', border: 'none', outline: 'none', fontSize: '1.2rem', minHeight: '200px', resize: 'none' },
  btnGuardar: { backgroundColor: '#7B3E3E', color: '#fff', border: 'none', padding: '1rem 2rem', cursor: 'pointer', marginTop: '1rem' },
  historial: { marginTop: '3rem' },
  entradaPrevia: { borderBottom: '1px solid #EAE6DF', paddingBottom: '2rem', marginBottom: '2rem' },
  textoHistorial: { fontSize: '1.1rem', color: '#2D3A2A' }
};

export default MiQNH;