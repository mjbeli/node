console.log('Inicio del programa'); // First print

setTimeout(
    function() { console.log('Primer timeout'); } // LAST print
    , 1000);

setTimeout(
    function() { console.log('Segundo timeout'); } // Third print. 
    , 0);

setTimeout(
    function() { console.log('Tercer timeout'); } // Fourth print
    , 0);

console.log('Fin del programa'); // Second print

/*
    Este fichero se ejecuta dentro de una pila de procesos 'main' que se va ejecutando de forma tradicional.
Por otro lado la función setTimeout pertenece a las Apis de node, por lo que al ejecutarse esa línea
se registra y se queda esperando hasta que pasan los milisegundos especificados. Una vez pasa el tiempo
se ejecuta la función definida como primer parámetro, pero la función no se 'envía' a la pila de procesos
sino que se envía a una pila de callbacks que se ejecutará cuando termine toda la pila de procesos (todo el main).

Por este motivo se imprime en segundo lugar el "Fin del programa", porque el resto se envía a la pila de callbacks,
que se ejecutará después de terminar la pila de procesos.
*/