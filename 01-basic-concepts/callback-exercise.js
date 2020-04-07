// Vamos a declarar 2 arrays, cada empleado se relaciona con su salario por el mismo id.
let empleados = [{ id: 1, nombre: 'Gandalf' }, { id: 2, nombre: 'Aragorn' }, { id: 3, nombre: 'Légolas' }];
let salarios = [{ id: 1, salario: 300 }, { id: 2, salario: 280 }];

/*  EJERCICIO
    Respuesta en caso de no encontrar: 'No se encontró un salario para el empleado Gandalf'
    Respuesta en caso de todo bien: {nombre: 'Gandalf', salario: 300}
*/

let callback4Salary = (err, infoData) => {
    if (err)
        return console.log(err);

    console.log(`${infoData.nombre} ${infoData.salario}`);
};

let getSalario = (empleado, callbackFunc) => {
    let salarioDB = salarios.find(salario => salario.id === empleado.id);

    if (!salarioDB)
        callbackFunc(`No se encontró un salario para el empleado ${empleado.nombre}`);
    else
        callbackFunc(null, {
            nombre: empleado.nombre,
            salario: salarioDB.salario
        });
}

let getEmpleado = (id, callbackFunc) => {
    let empleadoDB = empleados.find(empleado => empleado.id === id);

    if (!empleadoDB) // empleadoDB == null
        callbackFunc(`No existe empleado con id ${id}`);
    else
        callbackFunc(null, empleadoDB);
}

let callbackEmpleadoFunc =
    (err, empleado) => {
        if (err)
            return console.log(err);

        //console.log(empleado);
        getSalario(empleado, callback4Salary);
    };

getEmpleado(1, callbackEmpleadoFunc);
getEmpleado(2, callbackEmpleadoFunc);
getEmpleado(3, callbackEmpleadoFunc);
getEmpleado(23, callbackEmpleadoFunc);

/*
getSalario({ id: 1, nombre: 'Gandalf' }, callback4Salary);
getSalario({ id: 3, nombre: 'Légolas' }, callback4Salary);
getSalario({ id: 23, nombre: 'RatoncitoPerez' }, callback4Salary);
*/