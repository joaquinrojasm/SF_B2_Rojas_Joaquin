const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const { test } = require('node:test');
const { runInNewContext } = require('node:vm');

const script = readFileSync(join(__dirname, 'app.js'), 'utf8');

function iniciarFormulario() {
  const eventos = {};
  const estudiantes = [];
  const estado = { textContent: '' };
  const campo = {
    value: '',
    error: '',
    addEventListener(tipo, callback) { eventos[tipo] = callback; },
    setCustomValidity(mensaje) { this.error = mensaje; },
    reportValidity() {},
    focus() {},
  };
  const formulario = {
    addEventListener(tipo, callback) { eventos[tipo] = callback; },
    reset() { campo.value = ''; },
  };
  const elementos = {
    '#registro-form': formulario,
    '#nombre': campo,
    '#estudiantes': { append(item) { estudiantes.push(item.textContent); } },
    '#registro-estado': estado,
  };
  const document = {
    querySelector(selector) { return elementos[selector]; },
    createElement() { return { textContent: '' }; },
  };
  runInNewContext(script, { document }, { filename: 'app.js' });

  function registrar(valor) {
    campo.value = valor;
    eventos.input();
    eventos.submit({ preventDefault() {} });
  }

  return { registrar, campo, estudiantes, estado };
}

test('registra un nombre válido y mantiene la confirmación visible', () => {
  const { registrar, campo, estudiantes, estado } = iniciarFormulario();
  registrar('  Ana Torres  ');
  assert.deepEqual(estudiantes, ['Ana Torres']);
  assert.equal(campo.value, '');
  assert.equal(estado.textContent, 'Se registró a Ana Torres.');
});

test('rechaza un nombre vacío o compuesto solo por espacios', () => {
  const { registrar, campo, estudiantes, estado } = iniciarFormulario();
  for (const nombre of ['', '   ']) {
    registrar(nombre);
    assert.deepEqual(estudiantes, []);
    assert.equal(campo.error, 'Ingresa el nombre completo del estudiante.');
    assert.equal(estado.textContent, '');
  }
});
