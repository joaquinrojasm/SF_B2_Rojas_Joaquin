const formulario = document.querySelector('#registro-form');
const campoNombre = document.querySelector('#nombre');
const listaEstudiantes = document.querySelector('#estudiantes');
const estadoRegistro = document.querySelector('#registro-estado');

campoNombre.addEventListener('input', () => {
  campoNombre.setCustomValidity('');
  estadoRegistro.textContent = '';
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
  formulario.reset();
  campoNombre.focus();
});
