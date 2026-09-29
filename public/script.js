const API = "/api/alumnos";
const formulario = document.getElementById("formInscripcion");
const mensaje = document.getElementById("mensaje");
const tabla = document.getElementById("tablaAlumnos");

async function cargarAlumnos() {
  const respuesta = await fetch(API);
  const alumnos = await respuesta.json();

  tabla.innerHTML = "";
  alumnos.forEach(alumno => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${alumno.nombre}</td>
      <td>${alumno.correo}</td>
      <td>${alumno.nivel}</td>
      <td>${alumno.intereses}</td>
      <td><button class="btn-eliminar" data-id="${alumno.id}">Eliminar</button></td>
    `;
    tabla.appendChild(fila);
  });
}

formulario.addEventListener("submit", async (event) => {
  event.preventDefault();

  const intereses = [...document.querySelectorAll('input[name="intereses"]:checked')]
    .map(elemento => elemento.value);

  const datos = {
    nombre: document.getElementById("nombre").value.trim(),
    correo: document.getElementById("correo").value.trim(),
    telefono: document.getElementById("telefono").value.trim(),
    nivel: document.getElementById("nivel").value,
    intereses,
    motivo: document.getElementById("motivo").value.trim()
  };

  try {
    const respuesta = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos)
    });
    const resultado = await respuesta.json();

    if (!respuesta.ok) throw new Error(resultado.error || "No fue posible registrar.");

    mensaje.textContent = "Inscripción registrada correctamente.";
    formulario.reset();
    await cargarAlumnos();
  } catch (error) {
    mensaje.textContent = error.message;
  }
});

tabla.addEventListener("click", async (event) => {
  if (!event.target.matches(".btn-eliminar")) return;
  await fetch(`${API}/${event.target.dataset.id}`, { method: "DELETE" });
  await cargarAlumnos();
});

cargarAlumnos();
