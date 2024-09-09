const express = require('express'); // instancio express en una  variable
const app = express(); // almaceno una estancia de express en la variable app para que sea invocada
const controllers = require('./src/controller/controllers');
const path = require('path');

// Middleware para parsear datos de formularios
app.use(express.urlencoded({ extended: true }));

// Middleware para parsear JSON
app.use(express.json());

// configuro el motor ejs
app.set('view engine','ejs');

// Configura la carpeta 'public' para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, './src/views'));

// configuro las rutas
app.use('/',controllers);


// dejo escuchando a express por el puerto 3500 para realizar la conectividad
app.listen(3500,() => {
    console.log('Servidor Activo');
});