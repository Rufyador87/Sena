import { CrudPage } from '../components/CrudPage.jsx';

const fields = [
  { name: 'code', label: 'Código', required: true },
  { name: 'description', label: 'Descripción', required: true },
  { name: 'status', label: 'Estado', required: true }
];

export const DocksPage = () => <CrudPage title="Gestión de Muelles" endpoint="/docks" fields={fields} />;
