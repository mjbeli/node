// Aync-await

// Las funciones getNombre y getNombre2 hacen exactamente lo mismo, crear promesas.
// Al poner async estamos creando una promesa.
let getNombre = async() => {

    // Todos los errores que se produzcan en esta función entran por el catch. Por ejemplo los dos siguientes.
    //throw new Error('No se encontró nombre');
    //console.log(variableNoExiste);

    return 'MiNombre'; // El return de la función async es el resolve.
};

let getNombre2 = () => {
    return new Promise(
        (resolve, reject) => {
            resolve('MiNombre');
        }
    );
};

//console.log(getNombre2());

// Para que veamos que getNombre también es una promesa, podemos usar el then y catch.

getNombre()
    .then(nombre => { console.log(`Mi nombre es ${nombre}`); })
    .catch(err => { console.log(`Algo fue mal: ${err}`); })


/*
 * AWAIT: los await deben estar dentro de una función async. Los async pueden estar solos pero los await no.
 * Si la llamada a una función tiene delante la palabra 'await', 
 * Javascript no seguirá la ejecución hasta que haya terminado y devuelvo la ejecución de esa función.
 * Da la sensación de que es síncrono.
 */

let getNombre3 = () => {
    return new Promise(
        (resolve, reject) => { // resolve
            setTimeout(
                () => { resolve('otroNombre'); }, 3000);
        }
    );
};

getNombre3()
    .then(nombre => { console.log(`Mi nombre es ${nombre}`); })
    .catch(err => { console.log(`Algo fue mal: ${err}`); })

let getSaludo = async() => {
    let nombre = await getNombre3();
    return `Hola ${nombre}`;
}

getSaludo().then((mensaje) => { console.log(mensaje); });