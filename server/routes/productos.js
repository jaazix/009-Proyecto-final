const express = require('express');
const _ = require('underscore');
const app = express();
const Productos = require('../models/productos');
// ya esta el GET
app.get('/productos', (req, res) => {
    let desde = req.query.desde || 0;
    let hasta = req.query.hasta || 5;
    Productos.find({})
        .skip(Number(desde))
        .limit(Number(hasta))
        .populate('productos', 'nombre')
        .exec((err, productos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ocurrio algo al listar los productos',
                    err
                });
            }
            res.json({
                ok: true,
                msg: 'Productos listadas con exito',
                conteo: productos.length,
                productos
            });
        });
});
// ya esta el POST
app.post('/productos', (req, res) => {
    let body = req.body;
    let prod = new Productos({
        nombre: body.nombre,
        precioUni: body.precioUni,
        categoria: req.body.categoria,
        usuario: req.body.usuario
    });

    prod.save((err, prodDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Error al insertar el producto',
                err
            });
        }
        res.json({
            ok: true,
            msg: 'Producto insertada con exito',
            prodDB
        });
    });
});

app.put('/productos/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'usuario']);

    Productos.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, prodDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al momento de actualizar',
                err
            });
        }
        res.json({
            ok: true,
            msg: 'El producto fue actualizada con exito',
            prodDB
        });
    });
});
//ya esta el DELETE
app.delete('/productos/:id', (req, res) => {
    let id = req.params.id;

    Productos.findByIdAndRemove(id, { context: 'query' }, (err, prodDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al momento de eliminar un producto',
                err
            });
        }
        res.json({
            ok: true,
            msg: 'El producto fue eliminada con exito',
            prodDB
        });
    });
});

module.exports = app;