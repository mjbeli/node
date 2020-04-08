// Vamos a declarar 2 arrays, cada empleado se relaciona con su salario por el mismo id.
let empleados = [{ id: 1, nombre: 'Gandalf' }, { id: 2, nombre: 'Aragorn' }, { id: 3, nombre: 'Légolas' }];
let salarios = [{ id: 1, salario: 300 }, { id: 2, salario: 280 }];

let getEmpleado = async(id) => {
        let empleadoDB = empleados.find(empleado => empleado.id === id);

        if (!empleadoDB)
            throw new Error(`No existe empleado con id ${id}`);
        else
            return empleadoDB;
    } // Fin getEmpleado.

let getSalario = async(empleado) => {

        let salarioDB = salarios.find(salario => salario.id === empleado.id);

        if (!salarioDB)
            throw new Error(`No se encontró un salario para el empleado ${empleado.nombre}`);
        else
            return { nombre: empleado.nombre, salario: salarioDB.salario };
    } // Fin getSalario

let getInfo = async(id) => {
    let empleado = await getEmpleado(id);
    let infoData = await getSalario(empleado);

    return `El salario de ${infoData.nombre} es ${infoData.salario} monedas de oro`;
}

getInfo(2)
    .then(msg => { console.log(msg); })
    .catch(err => { console.log(err); });