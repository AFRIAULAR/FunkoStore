const express = require('express');

module.exports = {
admin: (req,res) => res.send ('Pagina de administrador'), /*solicitud de datos*/
create:(req,res) => res.send ('Pagina de crear producto'),
creating: (req,res) => res.send ('Admin creando producto'), /*envio de datos*/
editItem: (req,res) => res.send ('Admin pagina de editar item'), 
editingItem: (req,res) => res.send ('Admin ctualizando item'), /*actualizar o crear datos*/
delete: (req,res) => res.send ('administrador eliminando item'), /*eliminar recursos del servidor*/
}