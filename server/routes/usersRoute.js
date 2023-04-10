const router = require('express').Router();
const userService = require('../services/userService');
const db = require('../models');


router.get('/', (req, res) => {
  userService.getAll().then((result) => {
    res.status(result.status).json(result.data);
  });
});

router.get('/getCarts', (req, res) => {
  userService.getAllCarts().then((result) => {
    res.status(result.status).json(result.data);
  });
});

router.get('/allCarts', (req, res) => {
  userService.getAllCarts().then((result) => {
    res.status(result.status).json(result.data);
  });
});



router.get('/:id/getCart', (req, res) => {
    const user = req.params.id;
    userService.getCart(user).then((result) => {
      res.status(result.status).json(result.data);
    });
  });


router.post('/', (req, res) => {
  const user = req.body;
  userService.create(user).then((result) => {
    res.status(result.status).json(result.data);
  });
});


router.put('/:id', (req, res) => {
  const user = req.body;
  const id = req.params.id;
  if (!id) {
    res.status(400).json('ID is required.');
  } else {
    db.user
      .update(user, {
        where: {id: id},
      })
      .then((result) => {
        res.send('User has been updated.');
      });
  }
});


router.delete('/', (req, res) => {
  const user = req.body.id;
  userService.destroy(user).then((result) => {
    res.status(result.status).json(result.data);
  });
});





module.exports = router;