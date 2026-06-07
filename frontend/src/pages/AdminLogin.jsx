import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../api/axios';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const manejarLoginAdmin = async (e) => {
    e.preventDefault();
    try {
      // Usamos tu mismo endpoint de login
      const { data } = await clienteAxios.post('/auth/login', { email, password });
      
      // Validamos si el usuario devuelto realmente es admin en la base de datos
      if (data.role === 'admin' || data.user?.role === 'admin') {
        // Guardamos las credenciales de forma totalmente aislada para el Admin
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('isAdmin', 'true');
        
        alert('¡Bienvenida, Cecilia! Ingresando al Panel de Control... 🚀');
        navigate('/admin/panel');
      } else {
        alert('Acceso denegado: Esta cuenta no tiene permisos de administración.');
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Error al iniciar sesión como administrador.');
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={manejarLoginAdmin} style={styles.form}>
        <span style={styles.sub}>ACCESO PRIVADO</span>
        <h2 style={styles.title}>QNH Administración</h2>
        
        <label style={styles.label}>Correo electrónico</label>
        <input 
          type="email" 
          style={styles.input} 
          placeholder="admin@queunonoshagabien.com" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />

        <label style={styles.label}>Contraseña</label>
        <input 
          type="password" 
          style={styles.input} 
          placeholder="••••••••" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />

        <button type="submit" style={styles.btn}>Ingresar al Panel</button>
      </form>
    </div>
  );
};

const styles = {
  container: { minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FAF8F5' },
  form: { backgroundColor: '#FFF', padding: '3.5rem', borderRadius: '4px', border: '1px solid #EAE6DF', width: '420px', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' },
  sub: { color: '#7B3E3E', fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '0.5rem', textAlign: 'center' },
  title: { fontSize: '2rem', fontWeight: '300', color: '#2D3A2A', marginBottom: '2.5rem', textAlign: 'center', margin: 0 },
  label: { fontSize: '0.8rem', fontWeight: 'bold', color: '#8A857C', marginBottom: '0.5rem', textTransform: 'uppercase' },
  input: { padding: '12px', marginBottom: '1.8rem', border: '1px solid #EAE6DF', borderRadius: '4px', outline: 'none', fontSize: '1rem', fontFamily: 'inherit' },
  btn: { padding: '14px', backgroundColor: '#7B3E3E', color: '#FFF', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem', fontWeight: '600', marginTop: '1rem' }
};

export default AdminLogin;