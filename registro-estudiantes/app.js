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

  estadoRegistro.textContent = `Se registró a ${nombre}.`;

  const estadoRegistro = document.querySelector('#registro-estado');

  formulario.reset();
  campoNombre.focus();

  estadoRegistro.textContent = '';
});