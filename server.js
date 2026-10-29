const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Permitir recibir información JSON
app.use(express.json());

// Almacenamiento temporal de alumnos
let alumnos = [];
let siguienteId = 1;

// Obtener alumnos registrados
app.get("/api/alumnos", (req, res) => {
  res.json(alumnos);
});

// Registrar un alumno
app.post("/api/alumnos", (req, res) => {
  const { nombre, correo, telefono, nivel, intereses, motivo } = req.body;

  // Validar campos obligatorios
  if (
    !nombre ||
    !correo ||
    !telefono ||
    !nivel ||
    !Array.isArray(intereses) ||
    !motivo
  ) {
    return res.status(400).json({
      error: "Todos los campos son obligatorios."
    });
  }

  const nuevoAlumno = {
    id: siguienteId++,
    nombre,
    correo,
    telefono,
    nivel,
    intereses,
    motivo
  };

  alumnos.push(nuevoAlumno);

  res.status(201).json(nuevoAlumno);
});

// Eliminar alumno
app.delete("/api/alumnos/:id", (req, res) => {
  const id = Number(req.params.id);

  const alumnoExiste = alumnos.some(alumno => alumno.id === id);

  if (!alumnoExiste) {
    return res.status(404).json({
      error: "Alumno no encontrado."
    });
  }

  alumnos = alumnos.filter(alumno => alumno.id !== id);

  res.json({
    mensaje: "Alumno eliminado correctamente."
  });
});

// Publicar los archivos HTML, CSS y JavaScript
app.use(express.static(path.join(__dirname, "public")));

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});