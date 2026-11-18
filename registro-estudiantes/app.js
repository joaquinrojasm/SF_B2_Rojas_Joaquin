const formulario = document.querySelector('#registro-form');
const campoNombre = document.querySelector('#nombre');
const listaEstudiantes = document.querySelector('#estudiantes');

campoNombre.addEventListener('input', () => {
  campoNombre.setCustomValidity('');
});

formulario.addEventListener('submit', (evento) => {
  evento.preventDefault();

  const nombre = campoNombre.value.trim();

  if (nombre === '') {
    campoNombre.setCustomValidity('Ingresa el nombre completo del estudiante.');
    campoNombre.reportValidity();
    return;
  }

  const estudiante = document.createElement('li');
  estudiante.textContent = nombre;
  listaEstudiantes.append(estudiante);

  formulario.reset();
  campoNombre.focus();
});