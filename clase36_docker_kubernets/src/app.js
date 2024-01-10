import express from 'express';
const app = express()
app.get('/', (req, res) => res.send('<h1>[R2] My Servive 🔥</h1>'))
app.listen(8080, () => console.log('(8081) Running 🏃...'))

/**
 * 
 * === Construir la imagen
 * docker build -t r2service .
 * 
 * === Ver lista de imagenes
 * docker images
 * 
 * === Crear un contenedor a partir de la imagen
 * docker run -p 8080:8080 --name mycontainer r2service
 * 
 * === Ver la lista de contenedores corriendo
 * docker ps
 * 
 * === Ver la lista de todos los contenedores
 * docler ps -a
 * 
 * ********************************* PASOS PARA SUBIR A DOCKER HUB **********************
 * 
 * === Login con Docker
 * docker login
 * 
 * === Asignamos una version a la imagen
 * docker run -p 8080:8080 --name mycontainer r2service
 * 
 * === Subir la imagen que versionamos
 * docker push arturoverbel/r2service:1.0.0
 * 
 * === Correr una imagen que se subio
 * docker run -p 8081:8080 --name mycontainer22 -d arturoverbel/r2service:1.0.0
 * 
 */