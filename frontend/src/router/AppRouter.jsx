import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from '../components/Layout.jsx';
import { ProtectedRoute } from '../components/ProtectedRoute.jsx';
import { LoginPage } from '../pages/LoginPage.jsx';
import { DashboardPage } from '../pages/DashboardPage.jsx';
import { UsersPage } from '../pages/UsersPage.jsx';
import { VehiclesPage } from '../pages/VehiclesPage.jsx';
import { ShiftsPage } from '../pages/ShiftsPage.jsx';
import { DocksPage } from '../pages/DocksPage.jsx';
import { LoadOrdersPage } from '../pages/LoadOrdersPage.jsx';

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="vehicles" element={<VehiclesPage />} />
        <Route path="shifts" element={<ShiftsPage />} />
        <Route path="docks" element={<DocksPage />} />
        <Route path="load-orders" element={<LoadOrdersPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);
