import mongoose from 'mongoose';

const orderSchema = mongoose.Schema(
  {
    number: { type: Number, default: 0 },
    paymentType: { type: String },
    orderType: { type: String, default: false },
    isPaid: { type: Boolean, default: false },
    isReady: { type: Boolean, default: false },
    isProgress: { type: Boolean, default: false },
    isCanceled: { type: Boolean, default: false },
    isDelivered: { type: Boolean, default: false },
    totalPrice: Number,
    taxPrice: Number,
    orderItems: [
      {
        name: String,
        price: Number,
        quantity: Number,
      },
    ],
  },
  {
    timestamps: true,
  },
);
const Order = mongoose.model('order', orderSchema);
export default Order;
