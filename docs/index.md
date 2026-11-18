# Registro de estudiantes

**Autor:** Joaquín Alonso Rojas Morales  
**Curso:** Software Factory

El módulo permite registrar nombres de estudiantes, validar el campo y mostrar el resultado en una lista. Los registros se conservan mientras la página permanece abierta.

- [Ejecución local](#ejecución-local)
- [Ramas y versiones](#ramas-y-versiones)
- [Docker](#docker)
- [Integración continua](#integración-continua)

## Ejecución local

```powershell
git clone https://github.com/joaquinrojasm/SF_B2_Rojas_Joaquin.git
cd SF_B2_Rojas_Joaquin
Start-Process .\registro-estudiantes\index.html
```

Al registrar Ana Torres, el nombre aparece en la lista y se muestra la confirmación. El formulario rechaza un campo vacío o compuesto solo por espacios.

## Ramas y versiones

El desarrollo se realiza en `feature/xyz`. Se abre un pull request hacia `develop` para revisar los cambios y luego otro de `develop` hacia `main`. En el historial, cada commit identifica un cambio concreto. Las versiones estables se identifican con etiquetas en `main`.

## Docker

```powershell
docker build -t registro-estudiantes:1.0.0 ./registro-estudiantes
docker run -d --name registro-estudiantes -p 127.0.0.1:8080:80 registro-estudiantes:1.0.0
docker ps --filter name=registro-estudiantes
docker logs registro-estudiantes
docker image ls registro-estudiantes:1.0.0
```

Abra http://127.0.0.1:8080. NGINX atiende el puerto 80 dentro del contenedor. Si el puerto 8080 está ocupado, use 127.0.0.1:8081:80. Si Docker no encuentra el daemon, abra Docker Desktop y compruebe su estado con `docker info`.

Para recrear el contenedor, ejecute `docker stop registro-estudiantes` y `docker rm registro-estudiantes`, luego repita el comando de ejecución con la misma imagen.

## Integración continua

GitHub Actions ejecuta la comprobación de sintaxis y las pruebas en los pushes a `feature/xyz` y en los pull requests hacia `develop` y `main`. Los resultados aparecen en el log del job `verificar-registro`.

```powershell
node --check registro-estudiantes/app.js
node --test registro-estudiantes/app.test.cjs
```

El resultado esperado es dos pruebas aprobadas. La publicación de esta guía se configura en GitHub Pages desde la carpeta `docs` de `main`.
