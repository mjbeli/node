/*
    'persona' is NOT a class. It's only a variable that is an structure.
    Has 3 variables and 1 function that return a string.
*/

let persona = {
    nombre: 'Gandalf',
    mote: 'El Gris',
    profesion: 'mago aventurero',
    getDescription: function() {
            // It's mandatory to use 'this' for reference variables inside this structure.
            return `${this.nombre} ${this.mote} ${this.profesion}`

        }
        /*
        Different sintax (note that here we don`t have ': function'):
        getDescription() {
            return `${this.nombre} ${this.mote} ${this.profesion}`
        }
        */
};

console.log(persona.getDescription());


// We can map variables inside a structure like this:
let { nombre, mote, profesion } = persona;
console.log(nombre);

// Map using other variables names (explicit mapping)
let {
    nombre: MiNombreVar,
    mote: MiMoteVar,
    profesion: MiProfesionVar
} = persona;

console.log(MiProfesionVar);