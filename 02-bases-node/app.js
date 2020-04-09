// const multiplicarOp = require('./operators/multiplicar');
//// Ahora se pueden usar los elementos del module.exports
//// de ./operators/multiplocar.js de la siguiente forma: 
// multiplicarOp.crearArchivo(base)
//    .then(archivo => { console.log(`Creado el archivo ${archivo}!!!`); });

// Otra forma de importar sería usando la desestructuración:
const { crearArchivo } = require('./operators/multiplicar'); // Ahora se puede usar directamente como se muestra más abajo.

// Recibir parámetro por consola. 
//console.log(process.argv);
// let argv = process.argv;
// let parametro = argv[2];
// let base = parametro.split('=')[1];
//node app --base=8
// Hacerlo de esta forma requiere mucha validación de lo que recibimos
// por la línea de comandos, ¿es correcto el nombre del parámetro? ¿es lo que esperamos?

crearArchivo(base)
    .then(archivo => { console.log(`Creado el archivo ${archivo}!!!`); })
    .catch(err => { console.log(err); });