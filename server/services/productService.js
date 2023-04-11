const {createResponseSuccess, createResponseError, createResponseMessage} = require('../helpers/responseHelper');
const db = require('../models');


async function addRating(id, rating) {
  if (!id) {
    return createResponseError(422, 'Id is required');
  }
  try {
    rating.productId = id;
    await db.rating.create(rating);

    const productWithRating = await db.product.findOne({
      where: {id},
      include: [db.rating],
    });

    return createResponseSuccess(productWithRating);
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}


async function destroy(id) {
  try {
    const product = await db.product.findOne({where: {id}});
    await product.destroy();
    return createResponseMessage(200, 'Product deleted');
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function create(product) {
  try {
    const newProduct = await db.product.create(product);
    return createResponseSuccess(newProduct);
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function getAll() {
  try {
    const allProducts = await db.product.findAll({
      include: [
        {
          model: db.rating,
          required: false,
        },
      ],
    });

    return createResponseSuccess(allProducts);
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}


async function getProductById(id) {
  try {
    const product = await db.product.findOne({
      where: {id},
      include: [db.rating],
    });
    return createResponseSuccess(product);
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function addToCart(user_id, product_id, quantity) {
  try {

    const cart = await _findOrCreateCart(user_id);

    const product = await db.product.findByPk(product_id);

    let cartRow = await db.cartRow.findOne({
      where: {
        cartId: cart.id,
        productId: product.id,
      },
    });
    if (cartRow) {
      return createResponseError(422, 'Product already in cart');
    } else {
      cartRow = await db.cartRow.create({
        quantity,
        productId: product.id,
        cartId: cart.id,
      });
    }

    return createResponseSuccess(cartRow);
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function _findOrCreateCart(user_id) {
  try {

    const cart = await db.cart.findOne({
      where: {
        user_id,
        paid: false,
      },
    });

    if (cart) {
      return cart;
    } else {

      const newCart = await db.cart.create({
        userId: user_id,
        paid: false,
      });
      return newCart;
    }
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function getRatingById(id) {
  try {
    const rating = await db.rating.findAll({
      where: {id},
    });
    return createResponseSuccess(rating);
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}


module.exports = {
  create,
  getAll,
  addToCart,
  getRatingById,
  getProductById,
  addRating,
  destroy,
};