import { useEffect, useState } from 'react';
import { httpClient } from '../api/http.js';

export const CrudPage = ({ title, endpoint, fields }) => {
  const initialState = fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {});
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState(initialState);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  const loadData = async () => {
    try {
      const response = await httpClient.get(endpoint);
      setRows(response.data.data);
    } catch (_error) {
      setError('No fue posible cargar la información.');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const onChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const resetForm = () => {
    setForm(initialState);
    setEditingId(null);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      if (editingId) {
        await httpClient.put(`${endpoint}/${editingId}`, form);
      } else {
        await httpClient.post(endpoint, form);
      }
      await loadData();
      resetForm();
    } catch (_error) {
      setError('No fue posible guardar el registro.');
    }
  };

  const onEdit = (row) => {
    setEditingId(row.id);
    const nextForm = { ...initialState };
    fields.forEach((field) => {
      nextForm[field.name] = row[field.name] || '';
    });
    setForm(nextForm);
  };

  const onDelete = async (id) => {
    if (!window.confirm('¿Confirma la eliminación del registro?')) return;

    try {
      await httpClient.delete(`${endpoint}/${id}`);
      await loadData();
    } catch (_error) {
      setError('No fue posible eliminar el registro.');
    }
  };

  return (
    <div>
      <h2 className="mb-3">{title}</h2>

      <div className="card mb-4">
        <div className="card-body">
          <form className="row g-3" onSubmit={onSubmit}>
            {fields.map((field) => (
              <div className="col-md-4" key={field.name}>
                <label className="form-label">{field.label}</label>
                <input
                  className="form-control"
                  type={field.type || 'text'}
                  name={field.name}
                  value={form[field.name]}
                  onChange={onChange}
                  required={field.required}
                />
              </div>
            ))}
            <div className="col-12 d-flex gap-2">
              <button className="btn btn-primary" type="submit">
                {editingId ? 'Actualizar' : 'Crear'}
              </button>
              <button className="btn btn-secondary" type="button" onClick={resetForm}>
                Limpiar
              </button>
            </div>
          </form>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead>
            <tr>
              <th>ID</th>
              {fields.map((field) => (
                <th key={field.name}>{field.label}</th>
              ))}
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                {fields.map((field) => (
                  <td key={field.name}>{String(row[field.name] ?? '')}</td>
                ))}
                <td>
                  <div className="d-flex gap-2">
                    <button className="btn btn-sm btn-outline-primary" onClick={() => onEdit(row)}>
                      Editar
                    </button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(row.id)}>
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
