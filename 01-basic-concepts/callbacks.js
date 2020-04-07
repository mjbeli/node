// Callback es una función que se ejecuta cuando algo sucede.


setTimeout(
    () => { console.log('Hola mundo'); } // Esta función de flecha es un callback, se ejecuta cuando pasa 1 segundo.
    , 1000
);

// Vamos a definir una función de flecha cuyo segundo parámetro es una función.
let getUserById = (id, callbackFunction) => {

    // Simulamos recuperar el usuario de alguna forma.
    let usuario = {
        nombre: 'Gandalf',
        id // Esto es como poner id: id (al ser el nombre de la variable igual al nombre del parámetro no hace falta el mapeo explícito)
    }

    // Después de 'recuperar' el usuario, cuando tengamos el usuario, 
    // vamos a llamar a la función de callback. Vamos a simular un error para el id = 10.
    if (id === 10)
        callbackFunction(`El usuario ${id} no existe.`); // primer parámetro instanciado, error. El segundo queda a null.
    else
        callbackFunction(null, usuario); // error a null.
}


// función de flecha que se ejecutará dentro del getUserById
// vemos dentro de la función getUserById que la función tiene que recibir un parámetro.
// Convención en las funciones callback es que el primer parámetro sea un posible error.
let myCustomCallback = (err, user) => {
    if (err) // Esto es lo mismo que "err!=null"
        return console.log('Error: ', err);

    console.log('Usuario recuperado: ', user);
};

// Vamos a invocar a la función getUserById
getUserById(10, myCustomCallback);
getUserById(32, myCustomCallback);