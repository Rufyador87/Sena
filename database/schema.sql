CREATE DATABASE optilogistics;
\c optilogistics;

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(120) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(30) NOT NULL CHECK (role IN ('conductor', 'operador', 'facturador', 'coordinador', 'seguridad')),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS vehicles (
    id SERIAL PRIMARY KEY,
    plate VARCHAR(20) NOT NULL UNIQUE,
    driver_name VARCHAR(120) NOT NULL,
    carrier_company VARCHAR(120) NOT NULL,
    status VARCHAR(30) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS docks (
    id SERIAL PRIMARY KEY,
    code VARCHAR(20) NOT NULL UNIQUE,
    description VARCHAR(160) NOT NULL,
    status VARCHAR(30) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS shifts (
    id SERIAL PRIMARY KEY,
    vehicle_id INT NOT NULL REFERENCES vehicles(id),
    dock_id INT NOT NULL REFERENCES docks(id),
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    status VARCHAR(30) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS load_orders (
    id SERIAL PRIMARY KEY,
    order_number VARCHAR(30) NOT NULL UNIQUE,
    vehicle_id INT NOT NULL REFERENCES vehicles(id),
    shift_id INT NOT NULL REFERENCES shifts(id),
    operation_type VARCHAR(30) NOT NULL CHECK (operation_type IN ('carga', 'descarga')),
    status VARCHAR(30) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
