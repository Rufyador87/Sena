# OptiLogistics - Módulo Web Full Stack

Módulo web empresarial para gestión logística en CEDI, con enfoque en:

- Gestión de turnos de atención.
- Asignación de muelles.
- Seguimiento operativo de vehículos.
- Administración de órdenes de carga/descarga.
- Control de acceso por roles.

Se implementó una arquitectura tipo **Clean + MVC por capas**:

- **Presentación**: React + Bootstrap.
- **Negocio**: Node.js + Express (servicios y controladores).
- **Persistencia**: PostgreSQL (repositorios SQL).

> Nota de ingeniería: al no contar con todos los artefactos del ciclo de vida en el repositorio, se infirió el dominio con prácticas típicas de operación logística empresarial (entidades, flujos CRUD, seguridad y trazabilidad base).

---

## Estructura del repositorio

```text
.
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── db/
│   │   ├── middlewares/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── router/
│   │   └── styles/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── database/
│   └── schema.sql
└── README.md
```

---

## Tecnologías

### Backend

- Node.js 20+
- Express
- PostgreSQL
- JWT para autenticación
- bcrypt para hash de contraseña

### Frontend

- React 18
- React Router DOM
- Axios
- Bootstrap 5
- Vite

---

## Funcionalidades implementadas

### Seguridad

- Login con JWT.
- Roles soportados: `conductor`, `operador`, `facturador`, `coordinador`, `seguridad`.
- Protección de rutas backend y frontend.
- Protección de vistas por sesión autenticada.

### CRUD REST completo

- `users`
- `vehicles`
- `shifts`
- `docks`
- `load_orders`

Operaciones soportadas en cada recurso:

- `POST /api/<resource>`
- `GET /api/<resource>`
- `GET /api/<resource>/:id`
- `PUT /api/<resource>/:id`
- `PATCH /api/<resource>/:id`
- `DELETE /api/<resource>/:id`

---

## Base de datos

1. Crear el esquema ejecutando:

```bash
psql -U postgres -f database/schema.sql
```

2. Crear primer usuario (bootstrap) con `POST /api/auth/register` y rol `coordinador` para gestionar alta de usuarios posteriores.

---

## Instalación y ejecución

### 1) Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

API disponible en:

```text
http://localhost:4000/api
```

### 2) Frontend

```bash
cd frontend
npm install
npm run dev
```

Aplicación disponible en:

```text
http://localhost:5173
```

---

## Estándares aplicados

- Convenciones de nombre consistentes (`camelCase`, `PascalCase`).
- Manejo estructurado de errores con middleware global.
- Separación por capas y responsabilidades.
- Endpoints REST alineados con buenas prácticas de mantenibilidad.
- Código orientado a extensibilidad para próximos módulos (KPIs, tablero en tiempo real, integración GPS).
