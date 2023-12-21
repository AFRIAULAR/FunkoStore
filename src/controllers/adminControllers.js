const productService = require('../services/productService');

module.exports = {
  admin: async (req, res) => {
    try {
      const products = await productService.getProducts();
      res.render('admin/listado.ejs', { products: products});
    } catch (error) {
      console.error('Error al obtener el producto:', error);
      res.status(500).send('Error al obtener el producto');
    }
  },
  collections: async(req,res) => {
    try {
      const collections = await productService.getCollections();
      res.render('admin/collections.ejs', { collections: collections });
    } catch (error) {
      console.error('Error al obtener las colecciones:', error);
      res.status(500).send('Error al obtener las colecciones');
    }
  },
  create: (req, res) => {
    res.render('admin/create.ejs'
    )
  },
  creating: async (req, res) => {
    const item = req.body;
    const files = req.files;
    await itemsService.createItem(item, files);
    res.redirect('/admin');
  },
  editItem: async (req, res) => {
    const id = req.params.id;
    const { data: categories } = await productService.getCategories();
    const { data: licences } = await productService.getLicenceByProductId();
    const { data } = await ItemsService.getItem(id);
    console.log(categories, licences);
    res.render('./admin/edit', {
      view: {
        title: `Edit Product #${id} | Admin Funkoshop`
      },
      item: data[0],
      categories,
      licences
    });
  },

  editingItem: async (req, res) => {
    const id = req.params.id;
    const item = req.body;

    await ItemsService.edit(item, id);
    res.redirect('/admin');
  },
  delete: async (req, res) => {
    try {
      const productId = req.params.id
      await productService.deleteProductById(productId)
      const referer = req.headers.referer || '/';
      res.redirect(referer);
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      res.status(500).send('Error al eliminar el producto');
    }
  }, /*eliminar recursos del servidor*/
}