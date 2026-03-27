<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>OptiLogistics | Formulario Vehículo</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/styles.css">
</head>
<body>
<div class="contenedor formulario">
    <h1>
        <c:choose>
            <c:when test="${modo == 'editar'}">Editar Vehículo</c:when>
            <c:otherwise>Registrar Vehículo</c:otherwise>
        </c:choose>
    </h1>

    <form method="post" action="${pageContext.request.contextPath}/vehiculos">
        <c:if test="${modo == 'editar'}">
            <input type="hidden" name="id" value="${vehiculo.id}">
        </c:if>

        <input type="hidden" name="accion" value="${modo == 'editar' ? 'actualizar' : 'insertar'}">

        <label for="placa">Placa:</label>
        <input id="placa" type="text" name="placa" required value="${vehiculo.placa}">

        <label for="conductor">Conductor:</label>
        <input id="conductor" type="text" name="conductor" required value="${vehiculo.conductor}">

        <label for="empresaTransportadora">Empresa transportadora:</label>
        <input id="empresaTransportadora" type="text" name="empresaTransportadora" required value="${vehiculo.empresaTransportadora}">

        <label for="estado">Estado:</label>
        <select id="estado" name="estado" required>
            <option value="PROGRAMADO" ${vehiculo.estado == 'PROGRAMADO' ? 'selected' : ''}>Programado</option>
            <option value="EN_MUELLE" ${vehiculo.estado == 'EN_MUELLE' ? 'selected' : ''}>En muelle</option>
            <option value="DESPACHADO" ${vehiculo.estado == 'DESPACHADO' ? 'selected' : ''}>Despachado</option>
        </select>

        <div class="acciones-formulario">
            <button type="submit" class="btn">
                <c:choose>
                    <c:when test="${modo == 'editar'}">Actualizar</c:when>
                    <c:otherwise>Guardar</c:otherwise>
                </c:choose>
            </button>
            <a class="btn-secundario" href="${pageContext.request.contextPath}/vehiculos">Cancelar</a>
        </div>
    </form>
</div>
</body>
</html>
