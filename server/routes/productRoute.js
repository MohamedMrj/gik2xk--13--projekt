const router = require('express').Router();
const productService = require('../services/productService');
const db = require('../models');


router.get('/', (req, res) => {
  productService.getAll().then((result) => {
    res.status(result.status).json(result.data);
  });
});


router.post('/', (req, res) => {
  const product = req.body;
  productService.create(product).then((result) => {
    res.status(result.status).json(result.data);
  });
});



router.get('/:id', (req, res) => {
  const id = req.params.id;

  productService.getProductById(id).then((result) => {
    res.status(result.status).json(result.data);
  });
});


router.delete('/', (req, res) => {
  const id = req.body.id;
  productService.destroy(id).then((result) => {
    res.status(result.status).json(result.data);
  });
});


router.put('/:id', (req, res) => {
  const product = req.body;
  const id = req.params.id;
  if (!id) {
    res.status(400).json('ID is required.');
  } else {
    db.product
      .update(product, {
        where: {id: id},
      })
      .then((result) => {
        res.json(result);
      });
  }
});

router.post('/:id/addRating', (req, res) => {
  const id = req.params.id;
  const rating = req.body;

  productService.addRating(id, rating).then((result) => {
    res.status(result.status).json(result.data);
  });
});


router.get('/:id/getRating', (req, res) => {
  const id = req.params.id;

  productService.getRatingByID(id).then((result) => {
    res.status(result.status).json(result.data);
  });
});


router.post('/:id/addToCart', (req, res) => {
  const product_id = req.params.id;
  const user_id = req.body.user_id;
  const quantity = req.body.quantity;

  productService.addToCart(user_id, product_id, quantity).then((result) => {
    res.status(result.status).json(result.data);
  });
});

module.exports = router;