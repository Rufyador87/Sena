# OptiLogistics - Módulo Web MVC (JDBC)

Aplicación web Java para la gestión logística con arquitectura **MVC**, enfocada en el módulo funcional de **Gestión de Vehículos** (registro, consulta, edición y eliminación).

## Tecnologías usadas

- Java 17
- Jakarta Servlet / JSP (Tomcat 10+)
- JDBC
- MySQL 8+
- Maven (empaquetado WAR)
- HTML + CSS

## Arquitectura del proyecto

```text
src/
└── main/
    ├── java/
    │   └── com/optilogistics/
    │       ├── modelo/       -> Entidades de dominio
    │       ├── dao/          -> Acceso a datos y conexión JDBC
    │       └── controlador/  -> Servlets (controladores MVC)
    └── webapp/
        ├── views/
        │   └── vehiculos/    -> Vistas JSP
        ├── css/              -> Estilos
        └── WEB-INF/
            └── web.xml
```

## Funcionalidad implementada

### Módulo: Gestión de Vehículos

- Crear vehículo
- Listar vehículos
- Editar vehículo
- Eliminar vehículo

## Configuración de base de datos

1. Crear base y tabla ejecutando:

```sql
source database/schema.sql
```

2. Ajustar credenciales JDBC en:

- `src/main/java/com/optilogistics/dao/ConexionBD.java`

> Por defecto:
> - URL: `jdbc:mysql://localhost:3306/optilogistics?useSSL=false&serverTimezone=UTC`
> - Usuario: `root`
> - Clave: `root`

## Ejecución

1. Compilar y empaquetar WAR:

```bash
mvn clean package
```

2. Desplegar `target/optilogistics.war` en Apache Tomcat.

3. Abrir en navegador:

```text
http://localhost:8080/optilogistics/vehiculos
```

## Buenas prácticas aplicadas

- Separación por capas (Modelo, DAO, Controlador, Vista)
- Uso de `PreparedStatement` para prevenir inyección SQL
- Uso de `try-with-resources` para cerrar conexiones y recursos JDBC
- Nombres de clases y métodos coherentes con estándares Java
- Código modular, legible y mantenible
