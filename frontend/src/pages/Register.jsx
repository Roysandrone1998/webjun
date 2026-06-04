import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../api/axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await clienteAxios.post('/auth/register', { name, email, password });
      alert('Usuario creado con éxito. Ahora podés loguearte.');
      navigate('/login');
    } catch (error) {
      alert(error.response?.data?.message || 'Error al registrarse');
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <span style={styles.sub}>NUEVA CUENTA</span>
        <h2 style={styles.title}>Registrarse en QNH</h2>
        <input type="text" placeholder="Nombre completo" style={styles.input} value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Correo electrónico" style={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Contraseña (mín. 6 caracteres)" style={styles.input} value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" style={styles.btn}>Crear cuenta</button>
      </form>
    </div>
  );
};


const styles = { container: { height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FAF8F5' },
  form: { backgroundColor: '#FFF', padding: '3rem', borderRadius: '4px', border: '1px solid #EAE6DF', width: '400px', display: 'flex', flexDirection: 'column' },
  sub: { color: '#BA8D72', fontSize: '0.7rem', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '1rem', textAlign: 'center' },
  title: { fontSize: '2rem', fontWeight: '300', color: '#2D3A2A', marginBottom: '2rem', textAlign: 'center' },
  input: { padding: '12px', marginBottom: '1.5rem', border: '1px solid #DDD', borderRadius: '4px', outline: 'none' },
  btn: { padding: '12px', backgroundColor: '#7B3E3E', color: '#FFF', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem' } }; 

export default Register;