import express from 'express';

import { data } from '../data.js';
import Product from '../model/Product.js';

const productRouter = express.Router();

productRouter.get('/', (req, res) => {
  const { category } = req.query;
  res.send(
    category
      ? data.products.filter((x) => x.category === category)
      : data.products,
  );
});

productRouter.get('/', async (req, res) => {
  const { category } = req.query;
  const products = await Product.find(category ? { category } : {});
  res.send(products);
});

productRouter.get('/seed', async (req, res) => {
  const products = await Product.insertMany(data.products);
  res.send({ products });
});

productRouter.post('/', async (req, res) => {
  const newProduct = new Product(req.body);
  const savedProduct = await newProduct.save();
  res.send(savedProduct);
});
productRouter.get('/:id', async (req, res) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);
  res.send(deletedProduct);
});
export default productRouter;
