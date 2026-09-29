const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Publicar los archivos de la carpeta public
app.use(express.static(path.join(__dirname, "public")));

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});