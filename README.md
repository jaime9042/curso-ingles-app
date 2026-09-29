# Inscripción al Curso de Inglés

Aplicación web académica con:
- HTML, CSS y JavaScript en el frontend.
- Node.js y Express en el backend.
- PostgreSQL como base de datos.
- Registro, consulta y eliminación de inscripciones.

## Archivos

- `public/index.html`
- `public/estilos.css`
- `public/script.js`
- `server.js`
- `package.json`

## Base de datos

La aplicación crea automáticamente la tabla `alumnos` al iniciar.

Necesita la variable de entorno:

`DATABASE_URL`

con la cadena de conexión de PostgreSQL.

## Ejecución

1. Instalar Node.js.
2. Abrir una terminal en esta carpeta.
3. Ejecutar `npm install`.
4. Configurar `DATABASE_URL`.
5. Ejecutar `npm start`.

Está preparada para desplegarse posteriormente en una plataforma que permita Node.js y PostgreSQL.
