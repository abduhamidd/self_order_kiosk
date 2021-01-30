import mongoose from 'mongoose';
const productSchema = mongoose.Schema({
  name: String,
  description: String,
  image: String,
  price: Number,
  calorie: Number,
  category: String,
});
const Product = mongoose.model('products', productSchema);
export default Product;
