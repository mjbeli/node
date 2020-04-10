// Si la variable del puerto existe en el entorno en el que estemos ejecutando, 
// entonces se coge ese valor. Si no existe se coge por defecte 3000 
// (en local por ejemplo tomará el valor 3000)
process.env.PORT = process.env.PORT || 3000;