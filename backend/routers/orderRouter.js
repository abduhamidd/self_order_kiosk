import express from 'express';
import Order from '../model/Order.js';

const orderRouter = express.Router();

orderRouter.get('/', async (req, res) => {
  const orders = await Order.find({ isDelivered: false, isCanceled: false });
  res.send(orders);
});

orderRouter.post('/', async (req, res) => {
  const lastOrder = await Order.find().sort({ number: -1 }).limit(1);
  const lastNumber = lastOrder.length === 0 ? 0 : lastOrder[0].number;
  if (
    !req.body.orderType ||
    !req.body.paymentType ||
    !req.body.orderItems ||
    !req.body.orderItems.length === 0
  ) {
    return res.send({ message: 'Data is required' });
  }
  const order = await Order({ ...req.body, number: lastNumber + 1 }).save();
  res.send(order);
});

orderRouter.put('/:id', async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    if (req.body.action === 'ready') {
      order.isReady = true;
      order.inProgress = false;
    } else if (req.body.action === 'deliver') {
      order.isDelivered = true;
    } else if (req.body.action === 'cancel') {
      order.isCanceled = true;
    }
    await order.save();
    res.send({ message: 'done' });
  } else {
    res.status(404).message('Order not found');
  }
});

orderRouter.get('/queue', async (req, res) => {
  const inProgressOrders = await Order.find(
    {
      inProgress: true,
      isCanceled: false,
    },
    'number',
  );
  const servingOrders = await Order.find(
    { isReady: true, isDelivered: false },
    'number',
  );
  res.send({ inProgressOrders, servingOrders });
});

orderRouter.delete('/:id', async (req, res) => {
  const order = await Order.findByIdAndDelete(req.params.id);
  res.send(order);
});
export default orderRouter;
