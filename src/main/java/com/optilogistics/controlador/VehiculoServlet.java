package com.optilogistics.controlador;

import com.optilogistics.dao.VehiculoDAO;
import com.optilogistics.modelo.Vehiculo;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

/**
 * Controlador MVC para el módulo de gestión de vehículos.
 */
@WebServlet("/vehiculos")
public class VehiculoServlet extends HttpServlet {

    private final VehiculoDAO vehiculoDAO = new VehiculoDAO();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String accion = request.getParameter("accion");

        if (accion == null || accion.isBlank()) {
            accion = "listar";
        }

        switch (accion) {
            case "nuevo":
                mostrarFormularioNuevo(request, response);
                break;
            case "editar":
                mostrarFormularioEdicion(request, response);
                break;
            case "eliminar":
                eliminarVehiculo(request, response);
                break;
            default:
                listarVehiculos(request, response);
                break;
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        String accion = request.getParameter("accion");

        if ("insertar".equals(accion)) {
            insertarVehiculo(request, response);
        } else if ("actualizar".equals(accion)) {
            actualizarVehiculo(request, response);
        } else {
            response.sendRedirect(request.getContextPath() + "/vehiculos");
        }
    }

    private void listarVehiculos(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setAttribute("listaVehiculos", vehiculoDAO.listar());
        request.getRequestDispatcher("/views/vehiculos/lista.jsp").forward(request, response);
    }

    private void mostrarFormularioNuevo(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setAttribute("vehiculo", new Vehiculo());
        request.setAttribute("modo", "crear");
        request.getRequestDispatcher("/views/vehiculos/formulario.jsp").forward(request, response);
    }

    private void mostrarFormularioEdicion(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        int id = Integer.parseInt(request.getParameter("id"));
        Vehiculo vehiculo = vehiculoDAO.obtenerPorId(id);

        request.setAttribute("vehiculo", vehiculo);
        request.setAttribute("modo", "editar");
        request.getRequestDispatcher("/views/vehiculos/formulario.jsp").forward(request, response);
    }

    private void insertarVehiculo(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Vehiculo vehiculo = construirVehiculoDesdeRequest(request, false);
        vehiculoDAO.insertar(vehiculo);
        response.sendRedirect(request.getContextPath() + "/vehiculos");
    }

    private void actualizarVehiculo(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Vehiculo vehiculo = construirVehiculoDesdeRequest(request, true);
        vehiculoDAO.actualizar(vehiculo);
        response.sendRedirect(request.getContextPath() + "/vehiculos");
    }

    private void eliminarVehiculo(HttpServletRequest request, HttpServletResponse response) throws IOException {
        int id = Integer.parseInt(request.getParameter("id"));
        vehiculoDAO.eliminar(id);
        response.sendRedirect(request.getContextPath() + "/vehiculos");
    }

    private Vehiculo construirVehiculoDesdeRequest(HttpServletRequest request, boolean incluirId) {
        Vehiculo vehiculo = new Vehiculo();

        if (incluirId) {
            vehiculo.setId(Integer.parseInt(request.getParameter("id")));
        }

        vehiculo.setPlaca(request.getParameter("placa"));
        vehiculo.setConductor(request.getParameter("conductor"));
        vehiculo.setEmpresaTransportadora(request.getParameter("empresaTransportadora"));
        vehiculo.setEstado(request.getParameter("estado"));

        return vehiculo;
    }
}
