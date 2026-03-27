import { CrudPage } from '../components/CrudPage.jsx';

const fields = [
  { name: 'full_name', label: 'Nombre completo', required: true },
  { name: 'email', label: 'Correo', required: true, type: 'email' },
  { name: 'password_hash', label: 'Hash contraseña', required: true },
  { name: 'role', label: 'Rol', required: true }
];

export const UsersPage = () => <CrudPage title="Gestión de Usuarios" endpoint="/users" fields={fields} />;
