import express from 'express';
import { data } from '../data.js';

const categoryRouter = express.Router();
categoryRouter.get('/', (req, res) => {
  res.send(data.categories);
});
export default categoryRouter;
