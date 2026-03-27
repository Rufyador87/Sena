import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(form.email, form.password);
      navigate('/');
    } catch (_e) {
      setError('No fue posible iniciar sesión, verifica tus credenciales.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="card shadow-sm p-4" style={{ maxWidth: '420px', width: '100%' }}>
        <h3 className="mb-3">Ingreso a OptiLogistics</h3>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label">Correo</label>
            <input className="form-control" name="email" type="email" value={form.email} onChange={onChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              className="form-control"
              name="password"
              type="password"
              value={form.password}
              onChange={onChange}
              required
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <button className="btn btn-primary w-100" disabled={loading}>
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  );
};
