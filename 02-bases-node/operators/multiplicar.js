// requires
const fs = require('fs'); // Library from Node. More info: https://nodejs.org/dist/latest-v12.x/docs/api/fs.html#fs_file_system
// const fs = require('express'); // Library external to node, pakage to install.
// const fs = require('./path/file'); // Our files. Personal libraries.


let crearArchivo = base => {
    return new Promise(
        (resolve, reject) => {

            if (!Number(base))
                return reject('No hemos recibido un número como parámetro');

            let dataToFile = '';

            for (let i = 1; i <= 10; i++) {
                dataToFile += `${base} * ${i} = ${base * i}\n`;
            }

            // Cuidado que el path es relativo al path del llamador, no al path de este fichero multiplicar.js
            fs.writeFile(`./archivos/tabla-${base}.txt`, dataToFile, (err) => {
                if (err)
                    reject(err);
                resolve(`tabla-${base}.txt`);
            });
        }
    );
}

// module exports es un objeto al que se le pueden agregar elementos que se puedan usar de forma global.
module.exports = {
    crearArchivo
    //, otraFuncion, otraFuncion2,...
    // Alternativa crearArchivoExposeName: crearArchivo  --> esto mapea el nombre interno 
    //                                                       con el que se expone.
}