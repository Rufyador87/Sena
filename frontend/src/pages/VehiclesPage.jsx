import { CrudPage } from '../components/CrudPage.jsx';

const fields = [
  { name: 'plate', label: 'Placa', required: true },
  { name: 'driver_name', label: 'Conductor', required: true },
  { name: 'carrier_company', label: 'Transportadora', required: true },
  { name: 'status', label: 'Estado', required: true }
];

export const VehiclesPage = () => <CrudPage title="Gestión de Vehículos" endpoint="/vehicles" fields={fields} />;
