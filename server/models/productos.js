const mongoose = require('mongoose');


let Schema = mongoose.Schema;

let productoSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    precioUni: {
        type: Number,
        unique: true
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria'
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    disponible: {
        type: Boolean,
        default: false
    }

});

module.exports = mongoose.model('producto', productoSchema);