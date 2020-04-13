const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator'); // npm i mongoose-unique-validator --save

// Enumerado que define los roles.
let rolesValidos = {
    values: ['USER_ROLE', 'ADMIN_ROLE'],
    message: '{VALUE} no es un rol válido.' // Mensaje de error, se sustituye {VALUE}
};

let Schema = mongoose.Schema;


let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'] // Mensaje que se devuelve cuando no se cumple el required.
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Correo es obligatorio']
    },
    password: {
        type: String,
        required: [true, 'Contraseña obligatoria']
    },
    img: {
        type: String
            // , required: false --> por defecto requerido el falso, no hace falta ponerlo.
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

// Sobrescribimos el método ToJSON para nunca devolver el campo password. Se llamará cada vez que hagamos un .json().
// No usar función de flecha porque necesitamos el this.
usuarioSchema.methods.ToJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
};

// Decir a este esquema que use un plugin en concreto.
usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' }); // Mongoose sustituirá automáticamente {PATH} por el email.

// Exportamos este modelo para que esté disponible.
module.exports = mongoose.model('Usuario', // Nombre que tendrá el modelo en el resto de ficheros una vez exportado.
    usuarioSchema // Nombre de la variable del modelo que estamos exportando.
);