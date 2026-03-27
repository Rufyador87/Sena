CREATE DATABASE IF NOT EXISTS optilogistics CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE optilogistics;

CREATE TABLE IF NOT EXISTS vehiculos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    placa VARCHAR(20) NOT NULL UNIQUE,
    conductor VARCHAR(120) NOT NULL,
    empresa_transportadora VARCHAR(120) NOT NULL,
    estado VARCHAR(30) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
