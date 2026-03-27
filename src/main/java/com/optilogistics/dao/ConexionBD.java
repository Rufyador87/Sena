package com.optilogistics.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 * Clase utilitaria para centralizar la conexión JDBC a la base de datos.
 */
public final class ConexionBD {

    private static final String URL = "jdbc:mysql://localhost:3306/optilogistics?useSSL=false&serverTimezone=UTC";
    private static final String USUARIO = "root";
    private static final String CLAVE = "root";

    private ConexionBD() {
        // Evita instanciación
    }

    public static Connection obtenerConexion() throws SQLException {
        return DriverManager.getConnection(URL, USUARIO, CLAVE);
    }
}
