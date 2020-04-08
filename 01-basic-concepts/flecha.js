// Traditional function definition.
// function sumar(a, b) { return a + b; }

// Función de flecha.
// let sumar = (a, b) => { return a + b; }

// Cuando la función de flecha consta de solo una línea y además es un return:
let sumar = (a, b) => a + b;

console.log(sumar(3, 4));

// Función flecha sin parámetros
// let saludar = () => 'Hola mundo';

// Función flecha con un solo parámetro (se pueden omitir los paréntesis)
let saludar = nombre => `Hola ${ nombre }`;

console.log(saludar('Manolo'));



let persona = {
    nombre: 'Gandalf',
    mote: 'El Gris',
    profesion: 'mago aventurero',
    getDescription: () => `${this.nombre} ${this.mote} ${this.profesion}` // esto imprime undefined undefined undefined
        /*
        Si usamos "this" dentro de una función de flecha en una estructura
        no hacemos referencia a las variables de la estructura, sino a una
        variable "this" fuera de la estructura. Por eso en este caso al ejecutar
        este getDescription() obtenemos 'undefined', porque no hay variable
        this fuera de la estructura.

        Habría que NO usar una función de flecha, si no una normal:
        getDescription() {return `${this.nombre} ${this.mote} ${this.profesion}`}
        */
};

console.log(persona.getDescription());