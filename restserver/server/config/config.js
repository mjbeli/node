// Si la variable del puerto existe en el entorno en el que estemos ejecutando, 
// entonces se coge ese valor. Si no existe se coge por defecte 3000 
// (en local por ejemplo tomará el valor 3000)
process.env.PORT = process.env.PORT || 3000;

// ============================
//  Entorno
// ============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// ============================
//  Base de datos
// ============================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'Connection to Production DB';
}
process.env.URLDB = urlDB;