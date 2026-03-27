package com.optilogistics.dao;

import com.optilogistics.modelo.Vehiculo;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 * Capa DAO para la entidad Vehiculo.
 * Contiene operaciones CRUD utilizando PreparedStatement.
 */
public class VehiculoDAO {

    private static final String SQL_INSERTAR = "INSERT INTO vehiculos (placa, conductor, empresa_transportadora, estado) VALUES (?, ?, ?, ?)";
    private static final String SQL_LISTAR = "SELECT id, placa, conductor, empresa_transportadora, estado FROM vehiculos ORDER BY id DESC";
    private static final String SQL_OBTENER_POR_ID = "SELECT id, placa, conductor, empresa_transportadora, estado FROM vehiculos WHERE id = ?";
    private static final String SQL_ACTUALIZAR = "UPDATE vehiculos SET placa = ?, conductor = ?, empresa_transportadora = ?, estado = ? WHERE id = ?";
    private static final String SQL_ELIMINAR = "DELETE FROM vehiculos WHERE id = ?";

    public boolean insertar(Vehiculo vehiculo) {
        try (Connection conexion = ConexionBD.obtenerConexion();
             PreparedStatement sentencia = conexion.prepareStatement(SQL_INSERTAR)) {

            sentencia.setString(1, vehiculo.getPlaca());
            sentencia.setString(2, vehiculo.getConductor());
            sentencia.setString(3, vehiculo.getEmpresaTransportadora());
            sentencia.setString(4, vehiculo.getEstado());

            return sentencia.executeUpdate() > 0;
        } catch (SQLException ex) {
            ex.printStackTrace();
            return false;
        }
    }

    public List<Vehiculo> listar() {
        List<Vehiculo> vehiculos = new ArrayList<>();

        try (Connection conexion = ConexionBD.obtenerConexion();
             PreparedStatement sentencia = conexion.prepareStatement(SQL_LISTAR);
             ResultSet resultado = sentencia.executeQuery()) {

            while (resultado.next()) {
                Vehiculo vehiculo = new Vehiculo();
                vehiculo.setId(resultado.getInt("id"));
                vehiculo.setPlaca(resultado.getString("placa"));
                vehiculo.setConductor(resultado.getString("conductor"));
                vehiculo.setEmpresaTransportadora(resultado.getString("empresa_transportadora"));
                vehiculo.setEstado(resultado.getString("estado"));
                vehiculos.add(vehiculo);
            }
        } catch (SQLException ex) {
            ex.printStackTrace();
        }

        return vehiculos;
    }

    public Vehiculo obtenerPorId(int id) {
        Vehiculo vehiculo = null;

        try (Connection conexion = ConexionBD.obtenerConexion();
             PreparedStatement sentencia = conexion.prepareStatement(SQL_OBTENER_POR_ID)) {

            sentencia.setInt(1, id);
            try (ResultSet resultado = sentencia.executeQuery()) {
                if (resultado.next()) {
                    vehiculo = new Vehiculo();
                    vehiculo.setId(resultado.getInt("id"));
                    vehiculo.setPlaca(resultado.getString("placa"));
                    vehiculo.setConductor(resultado.getString("conductor"));
                    vehiculo.setEmpresaTransportadora(resultado.getString("empresa_transportadora"));
                    vehiculo.setEstado(resultado.getString("estado"));
                }
            }
        } catch (SQLException ex) {
            ex.printStackTrace();
        }

        return vehiculo;
    }

    public boolean actualizar(Vehiculo vehiculo) {
        try (Connection conexion = ConexionBD.obtenerConexion();
             PreparedStatement sentencia = conexion.prepareStatement(SQL_ACTUALIZAR)) {

            sentencia.setString(1, vehiculo.getPlaca());
            sentencia.setString(2, vehiculo.getConductor());
            sentencia.setString(3, vehiculo.getEmpresaTransportadora());
            sentencia.setString(4, vehiculo.getEstado());
            sentencia.setInt(5, vehiculo.getId());

            return sentencia.executeUpdate() > 0;
        } catch (SQLException ex) {
            ex.printStackTrace();
            return false;
        }
    }

    public boolean eliminar(int id) {
        try (Connection conexion = ConexionBD.obtenerConexion();
             PreparedStatement sentencia = conexion.prepareStatement(SQL_ELIMINAR)) {

            sentencia.setInt(1, id);
            return sentencia.executeUpdate() > 0;
        } catch (SQLException ex) {
            ex.printStackTrace();
            return false;
        }
    }
}
