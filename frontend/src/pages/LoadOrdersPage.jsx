import { CrudPage } from '../components/CrudPage.jsx';

const fields = [
  { name: 'order_number', label: 'Número orden', required: true },
  { name: 'vehicle_id', label: 'ID Vehículo', required: true, type: 'number' },
  { name: 'shift_id', label: 'ID Turno', required: true, type: 'number' },
  { name: 'operation_type', label: 'Tipo operación', required: true },
  { name: 'status', label: 'Estado', required: true }
];

export const LoadOrdersPage = () => (
  <CrudPage title="Gestión de Órdenes de Carga" endpoint="/load-orders" fields={fields} />
);
