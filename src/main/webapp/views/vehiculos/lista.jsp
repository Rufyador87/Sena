<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>OptiLogistics | Vehículos</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/styles.css">
</head>
<body>
<div class="contenedor">
    <h1>Gestión de Vehículos</h1>

    <div class="acciones-superiores">
        <a class="btn" href="${pageContext.request.contextPath}/vehiculos?accion=nuevo">+ Nuevo Vehículo</a>
    </div>

    <table>
        <thead>
        <tr>
            <th>ID</th>
            <th>Placa</th>
            <th>Conductor</th>
            <th>Transportadora</th>
            <th>Estado</th>
            <th>Acciones</th>
        </tr>
        </thead>
        <tbody>
        <c:forEach var="vehiculo" items="${listaVehiculos}">
            <tr>
                <td>${vehiculo.id}</td>
                <td>${vehiculo.placa}</td>
                <td>${vehiculo.conductor}</td>
                <td>${vehiculo.empresaTransportadora}</td>
                <td>${vehiculo.estado}</td>
                <td>
                    <a class="link-editar" href="${pageContext.request.contextPath}/vehiculos?accion=editar&id=${vehiculo.id}">Editar</a>
                    <a class="link-eliminar" href="${pageContext.request.contextPath}/vehiculos?accion=eliminar&id=${vehiculo.id}"
                       onclick="return confirm('¿Deseas eliminar este vehículo?');">Eliminar</a>
                </td>
            </tr>
        </c:forEach>
        </tbody>
    </table>
</div>
</body>
</html>
