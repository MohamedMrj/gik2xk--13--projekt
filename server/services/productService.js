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

async function addToCart(userId, productId, quantity) {
  const cart = await db.cart.findOne({
    where: { userId },
    include: [{
      model: db.product,
      where: { id: productId },
    }],
  });

  if (cart && cart.products.length > 0) {
    // User already has the product in their cart
    const cartRow = cart.products[0].cartRow;
    cartRow.quantity += quantity;
    await cartRow.save();
    return { status: 200, data: cart };
  } else {
    // User does not have the product in their cart
    const product = await db.product.findByPk(productId);
    if (!product) {
      return { status: 404, data: 'Product not found' };
    }
    const newCartRow = await db.cartRow.create({ quantity });
    await newCartRow.setCart(cart);
    await newCartRow.setProduct(product);
    return { status: 200, data: cart };
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