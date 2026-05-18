import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  const [tab, setTab] = useState('login'); // 'login' | 'register'
  const [form, setForm] = useState({ email: '', password: '', nombre: '', confirm: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = 'Correo no válido';
    if (form.password.length < 6) errs.password = 'Mínimo 6 caracteres';
    if (tab === 'register' && !form.nombre.trim()) errs.nombre = 'Ingresa tu nombre';
    if (tab === 'register' && form.password !== form.confirm) errs.confirm = 'Las contraseñas no coinciden';
    setErrors(errs);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, var(--morado-o) 0%, #1a0820 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
    }}>
      <div style={{
        background: '#fff',
        borderRadius: 24,
        padding: '2.5rem 2rem',
        width: '100%',
        maxWidth: 420,
        boxShadow: '0 30px 80px rgba(0,0,0,.4)',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <img src="/img/logo-chinchitirapie.webp" alt="Logo" style={{ width: 80, height: 80, borderRadius: '50%', marginBottom: '.5rem' }} />
          <h1 style={{ fontFamily: 'Bangers, cursive', fontSize: '1.8rem', letterSpacing: 3, color: 'var(--morado-o)' }}>Chinchintirapie</h1>
          <p style={{ color: '#6f6259', fontSize: '.85rem' }}>Portal de la Escuela Carnavalera</p>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '2px solid rgba(44,26,14,.1)', marginBottom: '1.5rem' }}>
          {[['login', 'Ingresar'], ['register', 'Registrarse']].map(([key, label]) => (
            <button key={key} onClick={() => { setTab(key); setErrors({}); }}
              style={{
                flex: 1, padding: '.6rem', border: 'none', background: 'transparent',
                fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: '.95rem',
                cursor: 'pointer',
                color: tab === key ? 'var(--rojo)' : '#999',
                borderBottom: `3px solid ${tab === key ? 'var(--rojo)' : 'transparent'}`,
                marginBottom: -2, transition: 'all .2s',
              }}>
              {label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {tab === 'register' && (
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontWeight: 700, fontSize: '.88rem', color: 'var(--oscuro)' }}>Nombre completo</label>
              <input
                type="text"
                className={`login-input ${errors.nombre ? 'login-input-error' : ''}`}
                value={form.nombre}
                onChange={handleChange('nombre')}
                placeholder="Tu nombre"
              />
              {errors.nombre && <span style={{ color: 'var(--rojo)', fontSize: '.75rem' }}>{errors.nombre}</span>}
            </div>
          )}

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontWeight: 700, fontSize: '.88rem', color: 'var(--oscuro)' }}>Correo Electrónico</label>
            <input
              type="email"
              className={`login-input ${errors.email ? 'login-input-error' : ''}`}
              value={form.email}
              onChange={handleChange('email')}
              placeholder="tu@email.com"
            />
            {errors.email && <span style={{ color: 'var(--rojo)', fontSize: '.75rem' }}>{errors.email}</span>}
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontWeight: 700, fontSize: '.88rem', color: 'var(--oscuro)' }}>Contraseña</label>
            <input
              type="password"
              className={`login-input ${errors.password ? 'login-input-error' : ''}`}
              value={form.password}
              onChange={handleChange('password')}
              placeholder="••••••••"
            />
            {errors.password && <span style={{ color: 'var(--rojo)', fontSize: '.75rem' }}>{errors.password}</span>}
          </div>

          {tab === 'register' && (
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontWeight: 700, fontSize: '.88rem', color: 'var(--oscuro)' }}>Confirmar contraseña</label>
              <input
                type="password"
                className={`login-input ${errors.confirm ? 'login-input-error' : ''}`}
                value={form.confirm}
                onChange={handleChange('confirm')}
                placeholder="••••••••"
              />
              {errors.confirm && <span style={{ color: 'var(--rojo)', fontSize: '.75rem' }}>{errors.confirm}</span>}
            </div>
          )}

          {tab === 'login' && (
            <div style={{ textAlign: 'right', marginBottom: '1rem' }}>
              <button type="button" onClick={() => {}} style={{ background: 'none', border: 'none', color: 'var(--rojo)', fontSize: '.82rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'Nunito, sans-serif', padding: 0 }}>¿Olvidaste tu contraseña?</button>
            </div>
          )}

          <button type="submit" style={{
            width: '100%', padding: '.85rem',
            background: 'linear-gradient(135deg, var(--morado-o) 0%, var(--purpura) 100%)',
            color: 'var(--amarillo-e)',
            border: 'none', borderRadius: 12,
            fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: '1rem',
            cursor: 'pointer', letterSpacing: 1, transition: 'all .3s',
            boxShadow: '0 4px 12px rgba(62,15,66,.2)',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 18px rgba(62,15,66,.35)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(62,15,66,.2)'; }}
          >
            {tab === 'login' ? '🎭 Ingresar' : '🥁 Crear cuenta'}
          </button>
        </form>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 0 1rem', color: '#999', fontSize: '.8rem' }}>
          <div style={{ flex: 1, height: 1, background: 'rgba(44,26,14,.1)' }} />
          <span style={{ padding: '0 .75rem', fontWeight: 600 }}>o continuar con</span>
          <div style={{ flex: 1, height: 1, background: 'rgba(44,26,14,.1)' }} />
        </div>

        {/* Social Buttons Row */}
        <div style={{ display: 'flex', gap: '.75rem', marginBottom: '1rem' }}>
          <button type="button" onClick={() => {}} style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '.5rem',
            padding: '.65rem',
            borderRadius: 12,
            border: '2px solid rgba(44,26,14,.15)',
            background: '#fff',
            cursor: 'pointer',
            fontFamily: 'Nunito, sans-serif',
            fontWeight: 700,
            fontSize: '.85rem',
            color: 'var(--oscuro)',
            transition: 'all .2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--rojo)'; e.currentTarget.style.background = 'rgba(192,57,43,.04)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(44,26,14,.15)'; e.currentTarget.style.background = '#fff'; }}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" style={{ flexShrink: 0 }}>
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.69a5.74 5.74 0 0 1-2.5 3.77v3.13h4.05c2.37-2.19 3.74-5.39 3.74-8.75z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-4.05-3.13c-1.12.75-2.56 1.2-3.88 1.2-3.03 0-5.6-2.05-6.51-4.82H1.31v3.23A12 12 0 0 0 12 24z"/>
              <path fill="#FBBC05" d="M5.49 14.34A7.22 7.22 0 0 1 5.09 12c0-.82.14-1.61.39-2.34V6.43H1.31A12 12 0 0 0 0 12c0 2.07.53 4.02 1.31 5.77l4.18-3.43z"/>
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.31 6.43l4.18 3.23c.91-2.77 3.48-4.82 6.51-4.82z"/>
            </svg>
            Google
          </button>
          <button type="button" onClick={() => {}} style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '.5rem',
            padding: '.65rem',
            borderRadius: 12,
            border: '2px solid rgba(44,26,14,.15)',
            background: '#fff',
            cursor: 'pointer',
            fontFamily: 'Nunito, sans-serif',
            fontWeight: 700,
            fontSize: '.85rem',
            color: 'var(--oscuro)',
            transition: 'all .2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--purpura)'; e.currentTarget.style.background = 'rgba(156,65,150,.04)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(44,26,14,.15)'; e.currentTarget.style.background = '#fff'; }}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="#1877F2" style={{ flexShrink: 0 }}>
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Facebook
          </button>
        </div>

        {/* Guest Access Option */}
        <div style={{ marginTop: '1rem' }}>
          <button type="button" onClick={() => window.location.href = '/'} style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '.5rem',
            padding: '.75rem',
            borderRadius: 12,
            border: '2px dashed var(--dorado)',
            background: 'rgba(241,196,15,.04)',
            cursor: 'pointer',
            fontFamily: 'Nunito, sans-serif',
            fontWeight: 800,
            fontSize: '.9rem',
            color: 'var(--oscuro)',
            transition: 'all .3s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--dorado)'; e.currentTarget.style.color = 'var(--oscuro)'; e.currentTarget.style.borderStyle = 'solid'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(241,196,15,.04)'; e.currentTarget.style.color = 'var(--oscuro)'; e.currentTarget.style.borderStyle = 'dashed'; }}
          >
            🎭 Entrar como Invitado
          </button>
        </div>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '.85rem', color: '#999', marginBottom: 0 }}>
          <Link to="/" style={{ color: 'var(--rojo)', fontWeight: 700 }}>← Volver al inicio</Link>
        </p>
      </div>
    </div>
  );
}
