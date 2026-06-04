import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Agregamos Link acá
import clienteAxios from '../api/axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
try {
      const { data } = await clienteAxios.post('/auth/login', { email, password });
      
      console.log("Data recibida:", data); 

      // Como los datos vienen sueltos, 'data' ya contiene el nombre, id, etc.
      localStorage.setItem('token', data.token); 
      
      // Guardamos el objeto entero (que tiene name, email, role, etc.)
      localStorage.setItem('user', JSON.stringify(data));
      
      // Usamos data.name directamente
      alert(`¡Bienvenido, ${data.name}!`); 
      
      navigate('/miqnh');
    } catch (error) {
      console.error("Error en el login:", error);
      alert(error.response?.data?.message || 'Error al iniciar sesión');
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <span style={styles.sub}>ACCESO PRIVADO</span>
        <h2 style={styles.title}>Ingresar a Mi QNH</h2>
        
        <input 
          type="email" 
          placeholder="Tu correo" 
          style={styles.input} 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input 
          type="password" 
          placeholder="Tu contraseña" 
          style={styles.input} 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        <button type="submit" style={styles.btn}>Entrar</button>

        {/* LINK AL REGISTRO */}
        <p style={styles.textRegistro}>
          ¿No tenés cuenta? <Link to="/register" style={styles.link}>Registrate acá</Link>
        </p>
      </form>
    </div>
  );
};

const styles = {
  container: { height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FAF8F5' },
  form: { backgroundColor: '#FFF', padding: '3rem', borderRadius: '4px', border: '1px solid #EAE6DF', width: '400px', display: 'flex', flexDirection: 'column' },
  sub: { color: '#BA8D72', fontSize: '0.7rem', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '1rem', textAlign: 'center' },
  title: { fontSize: '2rem', fontWeight: '300', color: '#2D3A2A', marginBottom: '2rem', textAlign: 'center' },
  input: { padding: '12px', marginBottom: '1.5rem', border: '1px solid #DDD', borderRadius: '4px', outline: 'none' },
  btn: { padding: '12px', backgroundColor: '#7B3E3E', color: '#FFF', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem', marginBottom: '1.5rem' },
  
  // Estilos para el nuevo texto
  textRegistro: { textAlign: 'center', fontSize: '0.9rem', color: '#8A857C', margin: 0 },
  link: { color: '#7B3E3E', fontWeight: 'bold', textDecoration: 'none', marginLeft: '5px' }
};

export default Login;