/*
let y var sirven para declarar variables.
La diferencia principal es el ámbito en el que existen esas variables.
    - var no tiene el concepto de ámbito como lo podemos entender en otros lenguajes,
      si se declara una variable var dentro de un bloque 'if' esa variable seguirá existiendo
      después del bloque 'if'.
      let sí usa el concepto de ámbito y la variable anterior solo existirá dentro del 'if'.
      
    - Las variables var se pueden declarar tantas veces como se quiera, en cambio declarar
      más de una vez una variable con let producirá un error de sintaxis.

Vamos a ver ejemplos de esto:
*/

var num = 1;
let num2 = 5;

if (true) {
    var num = 2;
    let num2 = 6;
}

// let num2 = 7; This line produces SyntaxError: Identifier 'num2' has already been declared

console.log(`num = ${num}`); // prints 2
console.log(`num2 = ${num2}`); // prints 5, the second num2 variable only exists inside the 'if'