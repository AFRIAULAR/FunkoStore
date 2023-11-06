

module.exports ={
    home: (req, res) =>{
        res.render('index.ejs')
    },
    contact: (req, res) => res.send("Pagina de Contacto"),
    about: (req, res) => res.send("Pagina Sobre Nosotros")
}
