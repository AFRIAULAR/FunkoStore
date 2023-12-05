const express = require('express');

module.exports = {
admin: (req,res) => {
    res.render('admin/listado.ejs')
},
create:(req,res) => {
    res.render('admin/create.ejs')
},
creating: (req,res) => res.send ('Admin creando producto'), /*envio de datos*/
editItem: (req,res) => {
    res.render('admin/edit.ejs')
}, 
editingItem: (req,res) => res.send ('Admin ctualizando item'), /*actualizar o crear datos*/
delete: (req,res) => res.send ('administrador eliminando item'), /*eliminar recursos del servidor*/
}