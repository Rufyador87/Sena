import { CrudPage } from '../components/CrudPage.jsx';

const fields = [
  { name: 'vehicle_id', label: 'ID Vehículo', required: true, type: 'number' },
  { name: 'dock_id', label: 'ID Muelle', required: true, type: 'number' },
  { name: 'start_time', label: 'Inicio', required: true, type: 'datetime-local' },
  { name: 'end_time', label: 'Fin', required: true, type: 'datetime-local' },
  { name: 'status', label: 'Estado', required: true }
];

export const ShiftsPage = () => <CrudPage title="Gestión de Turnos" endpoint="/shifts" fields={fields} />;
