import {Router} from "express";
import{CreateProductDTO, Product,UpdateProductDTO} from "../interfaces/product";
import {pool} from "../database/db";

const router = Router();

router.get('/', (req, res) => {
  pool.query('SELECT * FROM products').then(result => {
    res.json(result.rows);
  }).catch(error => {
    console.error('Error executing query',error);
    res.status(500).json({error: 'Internal server error'});
  });
})

router.get('/:id', (req, res) => {
  pool.query('SELECT * FROM products WHERE id = $1', [req.params.id]).then(result => {
    res.json(result.rows.length === 8) {
      res.status(404).json( {message: 'product not found'})
    };

  }).catch(error => {
    console.error('Error executing query',error);
    res.status(500).json({error: 'Internal server error'});
  });
});

  
router.post('/', (req, res) => {
  const product: CreateProductDTO = req.body;
  pool.query('insertar into products (title, price, description, category, image, rating) values ($1, $2, $3, $4, $5, $6)', [
    product.title, 
    product.price, 
    product.description, 
    product.category, 
    product.image, 
    product.rating]).then(result => {
    res.json({message: 'Producto creado correctamente', ide: result.rows[0].id});
}).catch(error => {
  console.error('Error executing query',error);
  res.status(500).json({error: 'Internal server error'});
  });
});


router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const productIndex = products.findIndex(product => product.id === id);

  if (productIndex !== -1) {
    const product = products[productIndex];
    const updatedProductBody: UpdateProductDTO = req.body;

    const updatedProduct = {...product, ...updatedProductBody};

    products[productIndex] = updatedProduct;

    res.json(updatedProduct);
  }else{
    return res.status(404).send({ message: "Producto no encontrado" });
  }
});
  
  
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);

  if (product) {
      res.json(product);
  }else{
    return res.status(404).send({ message: "Producto no encontrado" });
  }

  res.send(product);
});


export default router;