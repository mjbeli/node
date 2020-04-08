/*
Las promesas son una forma de evitar la anidación de callbacks conocida como callbackHell
*/

// Vamos a declarar 2 arrays, cada empleado se relaciona con su salario por el mismo id.
let empleados = [{ id: 1, nombre: 'Gandalf' }, { id: 2, nombre: 'Aragorn' }, { id: 3, nombre: 'Légolas' }];
let salarios = [{ id: 1, salario: 300 }, { id: 2, salario: 280 }];

let getEmpleado = (id) => {

        // Cada vez que se ejecute el siguiente new se va a ejecutar la
        // función de flecha que definimos dentro. Esa función va a recibir
        // dos parámetros que serán ambos funciones callback.
        return new Promise(
            (resolve, reject) => {
                let empleadoDB = empleados.find(empleado => empleado.id === id);

                if (!empleadoDB) // empleadoDB == null
                    reject(`No existe empleado con id ${id}`); // Callback que se ejecuta en caso de error.
                else
                    resolve(empleadoDB); // Callback que se ejecuta en caso de todo ok. 

                // reject y resolve siempre reciben 1 parámetro, en caso de devolver más de uno usar un objeto {x:x,y:y,z:z}
            }
        ); // Fin new Promise.

    } // Fin getEmpleado.

let getSalario = empleado => {

    return new Promise(
        (resolve, reject) => {
            let salarioDB = salarios.find(salario => salario.id === empleado.id);

            if (!salarioDB)
                reject(`No se encontró un salario para el empleado ${empleado.nombre}`);
            else
                resolve({ nombre: empleado.nombre, salario: salarioDB.salario });
        }
    ); // Fin new Promise
}

// Al invocar la función de flecha getEmpleado, se tendrá que usar then.
// El primer parámetro de then será la función que ejecutará el resolve.
// El segundo parámetro de then será la función que ejecutará el reject.
// Ambas funcione, resolve y reject reciben un parámetro.
// Esta versión no soluciona el anidamiento de callbackHell.
getEmpleado(1).then(
    empleado => {
        console.log(`Empleado encontrado con id ${empleado.id} y nombre ${empleado.nombre}`);
        getSalario(empleado).then(
            infoData => { console.log(`El empleado ${infoData.nombre} recibe ${infoData.salario} monedas de oro`); },
            err => { console.log(err); }
        );
    },
    err => { console.log(err); }
); // Fin then.

// Promesas encadenadas:
// El then sigue teniendo 2 funciones como parámetros, la primera es el resolve y la segundo el reject.
// Cuando la respuesta del resolve incluye otra promesa, se puede encadenar otro then que se ejecutará 
// como resolve de la promesa anidada.
getEmpleado(2).then(
        empleado => { return getSalario(empleado); } // No hace falta reject porque se ejecutará el catch para todos.
    ).then(infoData => { console.log(`El empleado ${infoData.nombre} recibe ${infoData.salario} monedas de oro`); })
    .catch(err => { console.log('Error: ', err); }); // Este es el código de los 2 reject (getEmpleado y getSalario).