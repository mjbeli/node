// const multiplicarOp = require('./operators/multiplicar');
//// Ahora se pueden usar los elementos del module.exports
//// de ./operators/multiplocar.js de la siguiente forma: 
// multiplicarOp.crearArchivo(base)
//    .then(archivo => { console.log(`Creado el archivo ${archivo}!!!`); });

// Otra forma de importar sería usando la desestructuración:
const { crearArchivo } = require('./operators/multiplicar'); // Ahora se puede usar directamente como se muestra más abajo.

let base = '7';
crearArchivo(base)
    .then(archivo => { console.log(`Creado el archivo ${archivo}!!!`); })
    .catch(err => { console.log(err); });