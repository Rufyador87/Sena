import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const navItems = [
  { to: '/users', label: 'Usuarios' },
  { to: '/vehicles', label: 'Vehículos' },
  { to: '/shifts', label: 'Turnos' },
  { to: '/docks', label: 'Muelles' },
  { to: '/load-orders', label: 'Órdenes de carga' }
];

export const Layout = () => {
  const { user, logout } = useAuth();

  return (
    <div className="container-fluid p-0">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <Link className="navbar-brand" to="/">
          OptiLogistics
        </Link>
        <div className="collapse navbar-collapse show">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {navItems.map((item) => (
              <li className="nav-item" key={item.to}>
                <Link className="nav-link" to={item.to}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <span className="text-white me-3">{user?.fullName}</span>
          <button className="btn btn-outline-light btn-sm" onClick={logout}>
            Salir
          </button>
        </div>
      </nav>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};
